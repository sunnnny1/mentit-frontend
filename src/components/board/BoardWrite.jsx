import { useEffect, useRef, useState } from 'react';

const imgChevronDown = 'https://www.figma.com/api/mcp/asset/b129180e-e058-43e6-80e8-4aa7162f3570.svg';
const imgListCategory = 'https://www.figma.com/api/mcp/asset/3c64cca8-5611-4b4a-9ed8-f4a43d92ddf3.svg';
const imgImage = 'https://www.figma.com/api/mcp/asset/7c54bad3-27c9-4285-8311-918364e2a324.svg';
const imgAttachment = 'https://www.figma.com/api/mcp/asset/942a09e5-0de3-4322-a67a-39e140acb294.svg';
const imgBold = 'https://www.figma.com/api/mcp/asset/ad3a5fbe-9bf3-42d0-9dd6-8225f7e61db2.svg';
const imgClose = 'https://www.figma.com/api/mcp/asset/0b3389d3-30a4-4251-ac1f-7ed826233b31.svg';

const BOARD_OPTIONS = [
  { key: 'qna', label: 'Q&A' },
  { key: 'freetalk', label: '프리토크' },
];

const DEFAULT_TAGS = {
  qna: ['프로덕트디자인', 'Q&A'],
  freetalk: ['프로덕트디자인', '프리토크', '취준'],
};

function BoardDropdown({ category, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const currentLabel = BOARD_OPTIONS.find((option) => option.key === category)?.label ?? 'Q&A';

  return (
    <div ref={rootRef} className="relative w-[246px] shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-white border border-[#e7eaee] rounded-xl px-5 py-4 flex items-center gap-2 cursor-pointer"
        aria-expanded={open}
      >
        <span className="flex-1 text-left text-[16px] leading-[1.45] text-[#121213]">{currentLabel}</span>
        <img alt="" src={imgChevronDown} className={`size-6 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-20 mt-2 w-full bg-white border border-[#e7eaee] rounded-[10px] p-4 flex flex-col gap-2 shadow-[0_0_8px_rgba(18,18,19,0.04)]">
          {BOARD_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => {
                onChange(option.key);
                setOpen(false);
              }}
              className="text-left px-4 py-3 rounded-xl text-[14px] leading-[1.58] tracking-[0.14px] text-[#121213] hover:bg-[#f4f6f8] cursor-pointer"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BoardWrite({ defaultCategory = 'qna', onSubmit }) {
  const [category, setCategory] = useState(defaultCategory);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(DEFAULT_TAGS[defaultCategory] ?? DEFAULT_TAGS.qna);

  const handleCategoryChange = (next) => {
    setCategory(next);
    setTags(DEFAULT_TAGS[next] ?? DEFAULT_TAGS.qna);
  };

  const removeTag = (tag) => setTags((prev) => prev.filter((t) => t !== tag));

  const handleSubmit = () => {
    onSubmit?.(category);
  };

  return (
    <section className="flex-1 min-w-0 min-h-0 rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-y-auto">
      <div className="max-w-[819px] mx-auto py-16 px-5 flex flex-col gap-10">
        <div className="flex items-end gap-12 w-full">
          <BoardDropdown category={category} onChange={handleCategoryChange} />
          <div className="flex-1 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="border border-[#70d2ff] bg-[#1a75ff] rounded-lg px-5 py-2 shadow-[inset_0_0_4px_0_#e7f3ff] cursor-pointer"
            >
              <span className="font-bold text-[15px] leading-[1.45] text-white whitespace-nowrap">등록하기</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="제목을 입력해주세요"
            className="w-full border border-[#e7eaee] rounded-xl px-5 py-3 text-[15px] leading-[1.6] text-[#121213] placeholder:text-[#9ca2b1] outline-none"
          />

          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center gap-3">
              <img alt="" src={imgListCategory} className="size-6" />
              <img alt="" src={imgImage} className="size-6" />
              <img alt="" src={imgAttachment} className="size-6" />
              <img alt="" src={imgBold} className="size-6" />
            </div>
            <div className="border border-[#e7eaee] rounded-xl px-5 py-3 flex flex-col justify-between gap-3 w-full min-h-[413px]">
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value.slice(0, 2000))}
                placeholder="내용을 입력해주세요"
                className="flex-1 w-full resize-none text-[15px] leading-[1.6] text-[#121213] placeholder:text-[#9ca2b1] outline-none bg-transparent"
              />
              <div className="flex items-center w-full">
                <span className="text-[12px] tracking-[0.3px] text-[#747886]">{content.length}/2000</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <p className="text-[16px] leading-[1.5] tracking-[0.0912px] text-[#171719]">태그</p>
            <div className="flex flex-wrap gap-3 items-center">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#f4f6f8] pl-4 pr-3 py-2 rounded-lg flex items-center gap-2 shrink-0"
                >
                  <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213] whitespace-nowrap">#{tag}</span>
                  <button type="button" onClick={() => removeTag(tag)} className="cursor-pointer">
                    <img alt="" src={imgClose} className="size-6" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                className="border border-[#e7eaee] h-10 px-4 py-2 rounded-lg cursor-pointer"
              >
                <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213] whitespace-nowrap">태그추가</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
