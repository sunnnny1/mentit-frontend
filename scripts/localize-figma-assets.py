#!/usr/bin/env python3
"""Download Figma MCP asset URLs into src/assets/figma and rewrite source imports."""

from __future__ import annotations

import re
import urllib.request
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
OUT = SRC / "assets" / "figma"
URL_RE = re.compile(r"https://www\.figma\.com/api/mcp/asset/([0-9a-f-]+)\.(svg|png|webp|jpg)")
SOURCE_EXTS = {".jsx", ".js", ".tsx", ".ts"}


def ident(uuid: str, ext: str) -> str:
    return f"figma_{uuid.replace('-', '_')}_{ext}"


def rel_import(src_file: Path, asset: Path) -> str:
    rel = Path(os_path_rel(src_file.parent, asset))
    return str(rel) if rel.as_posix().startswith(".") else f"./{rel.as_posix()}"


def os_path_rel(start: Path, target: Path) -> str:
    return Path(os_relpath(start, target)).as_posix()


def os_relpath(start: Path, target: Path) -> str:
    import os

    return os.path.relpath(target, start)


def collect_urls() -> dict[str, str]:
    found: dict[str, str] = {}
    for path in SRC.rglob("*"):
        if path.suffix not in SOURCE_EXTS:
            continue
        for match in URL_RE.finditer(path.read_text()):
            found[match.group(0)] = f"{match.group(1)}.{match.group(2)}"
    return found


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 mentit-localize"})
    with urllib.request.urlopen(req, timeout=30) as response:
        dest.write_bytes(response.read())
        ctype = response.headers.get_content_type()
    if dest.stat().st_size < 20:
        raise RuntimeError(f"tiny file {dest} from {url}")
    print(f"ok {dest.name} ({ctype}, {dest.stat().st_size}b)")


def rewrite_file(path: Path) -> bool:
    text = path.read_text()
    matches = list(URL_RE.finditer(text))
    if not matches:
        return False

    seen: dict[str, str] = {}
    imports: list[str] = []
    for match in matches:
        url = match.group(0)
        uuid, ext = match.group(1), match.group(2)
        name = ident(uuid, ext)
        if url in seen:
            continue
        seen[url] = name
        asset = OUT / f"{uuid}.{ext}"
        spec = os_relpath(path.parent, asset)
        if not spec.startswith("."):
            spec = f"./{spec}"
        imports.append(f"import {name} from '{spec}';")

    for url, name in seen.items():
        quoted = f"'{url}'"
        dquoted = f'"{url}"'
        text = text.replace(quoted, name)
        text = text.replace(dquoted, name)
        # leftover unquoted (shouldn't happen)
        text = text.replace(url, name)

    # Insert imports after the last existing import, or at top.
    import_block = "\n".join(imports) + "\n"
    lines = text.splitlines(keepends=True)
    last_import = -1
    for i, line in enumerate(lines):
        if line.startswith("import "):
            last_import = i
    if last_import >= 0:
        lines.insert(last_import + 1, import_block)
        text = "".join(lines)
    else:
        text = import_block + "\n" + text

    path.write_text(text)
    print(f"rewrote {path.relative_to(ROOT)} (+{len(seen)} imports)")
    return True


def main() -> None:
    urls = collect_urls()
    print(f"found {len(urls)} unique figma urls")
    failed = []
    for url, filename in sorted(urls.items(), key=lambda item: item[1]):
        dest = OUT / filename
        if dest.exists() and dest.stat().st_size > 20:
            print(f"skip {filename}")
            continue
        try:
            download(url, dest)
        except Exception as exc:
            failed.append((url, str(exc)))
            print(f"FAIL {filename}: {exc}")
    missing = [name for name in urls.values() if not (OUT / name).exists()]
    if missing:
        raise SystemExit(f"missing local files: {missing}")
    if failed:
        print(f"note: {len(failed)} remote downloads failed; using existing local fallbacks")

    rewritten = 0
    for path in SRC.rglob("*"):
        if path.suffix in SOURCE_EXTS and rewrite_file(path):
            rewritten += 1
    leftover = collect_urls()
    print(f"rewrote {rewritten} files; leftover urls {len(leftover)}")
    if leftover:
        raise SystemExit("some figma urls remain")


if __name__ == "__main__":
    main()
