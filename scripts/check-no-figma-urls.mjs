#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src');
const FORBIDDEN = /https:\/\/www\.figma\.com\/api\/mcp\/asset\//;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(jsx?|tsx?|css)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const hits = [];
for (const file of await walk(SRC)) {
  const text = await readFile(file, 'utf8');
  if (FORBIDDEN.test(text)) {
    hits.push(path.relative(ROOT, file));
  }
}

if (hits.length) {
  console.error('Figma MCP asset URLs expire (~7 days). Keep files in src/assets and import them.');
  console.error('Offending files:');
  for (const file of hits) console.error(`  ${file}`);
  process.exit(1);
}

console.log('No Figma MCP asset URLs in src.');
