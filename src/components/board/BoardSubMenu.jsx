const imgCollapse = 'https://www.figma.com/api/mcp/asset/7593cb7f-18f9-440f-a8bf-fc9df3b74e55.svg';

const CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: 'qna', label: 'Q&A' },
  { key: 'freetalk', label: '프리토크' },
  { key: 'careertalk', label: '커리어토크' },
];

export default function BoardSubMenu({ onClose, activeCategory, onCategoryChange }) {
  return (
    <aside className="bg-white shadow-[0_0_8px_rgba(18,18,19,0.04)] flex flex-col items-start px-5 py-6 rounded-2xl w-[246px] h-full min-h-0 shrink-0 overflow-hidden">
      <div className="flex flex-col gap-10 items-start w-full min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 items-start w-full">
          <button type="button" onClick={onClose} className="size-6 cursor-pointer" aria-label="채팅바 여닫기">
            <img alt="" src={imgCollapse} className="size-6" />
          </button>
          <p className="font-bold text-[15px] leading-[1.6] text-[#121213]">게시판</p>
        </div>

        <div className="flex flex-col gap-3 items-start w-full">
          <p className="font-medium text-[14px] tracking-[0.14px] text-[#747886] w-full">카테고리</p>
          <div className="flex flex-col gap-1 items-start w-full">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.key;
              return (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => onCategoryChange?.(category.key)}
                  className={`relative overflow-hidden flex items-center p-3 rounded-xl w-full cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:rounded-xl after:transition-opacity ${
                    isActive ? 'bg-[#f9fafb]' : 'bg-white'
                  }`}
                >
                  <span className="relative font-medium text-[15px] leading-[1.45] text-[#121213]">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
