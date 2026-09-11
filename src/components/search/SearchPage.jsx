import { useState } from 'react';

const imgClose = 'https://www.figma.com/api/mcp/asset/584cd8e0-692e-40dd-b281-c786a976a2df.svg';
const imgSearchIcon = 'https://www.figma.com/api/mcp/asset/6200caeb-f035-496f-8a18-17217b41b83a.svg';

const POPULAR_SEARCHES = [
  'Master Mentor',
  '토스',
  '면접',
  '포트폴리오',
  'Sunny',
  '해외 취업',
];

export default function SearchPage({ onClose }) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const submitQuery = (raw) => {
    const value = raw.trim();
    if (!value) return;
    setRecentSearches((prev) => [value, ...prev.filter((item) => item !== value)]);
    setQuery('');
  };

  return (
    <div className="flex-1 min-w-0 min-h-0 h-full bg-white rounded-2xl shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-y-auto flex flex-col items-center">
      <div className="w-[731px] max-w-full py-16 flex flex-col gap-12">
        <div className="flex flex-col gap-5 items-end w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center size-6 cursor-pointer"
            aria-label="검색 닫기"
          >
            <img alt="" src={imgClose} className="size-6" />
          </button>

          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              submitQuery(query);
            }}
          >
            <div className="border-[1.5px] border-[#e7eaee] rounded-2xl h-16 px-6 flex items-center gap-3 bg-white">
              <img alt="" src={imgSearchIcon} className="size-6 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    submitQuery(query);
                  }
                }}
                placeholder="검색어를 입력하세요.."
                className="flex-1 min-w-0 text-[15px] leading-[1.6] text-[#121213] placeholder:text-[#9ca2b1] outline-none bg-transparent"
              />
            </div>
          </form>
        </div>

        {recentSearches.length > 0 && (
          <section className="flex flex-col gap-7 w-full">
            <div className="flex items-center gap-3 w-full">
              <p className="font-bold text-[16px] leading-[1.45] text-[#121213]">최근 검색어</p>
              <div className="flex-1" />
              <button
                type="button"
                onClick={() => setRecentSearches([])}
                className="font-normal text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886] cursor-pointer"
              >
                전체 삭제
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="relative overflow-hidden border border-[#e7eaee] rounded-lg px-4 py-2 text-[14px] leading-[1.42] tracking-[0.14px] font-medium text-[#121213] whitespace-nowrap cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:rounded-lg after:transition-opacity"
                >
                  <span className="relative">{term}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="flex flex-col gap-7 w-full">
          <p className="font-bold text-[16px] leading-[1.45] text-[#121213]">이번주 인기 검색어</p>
          <div className="grid grid-cols-2 gap-x-5 gap-y-5">
            {POPULAR_SEARCHES.map((term, index) => (
              <div key={term} className="flex items-center gap-3 font-medium text-[15px] leading-[1.45] text-[#121213]">
                <span>{index + 1}</span>
                <span>{term}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
