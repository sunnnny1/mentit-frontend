import { useState } from 'react';

const imgBookmark = 'https://www.figma.com/api/mcp/asset/5dffe2dd-882b-41a3-a099-9e1eff1e1134.svg';
const imgBookmarkFill = 'https://www.figma.com/api/mcp/asset/b20bcd72-0b9e-4707-8bd9-b80aa3f1fae3.svg';

const ARTICLES = {
  all: [
    { id: 'trend-onboarding', badge: '트렌드', tag: '프로덕트 디자인', title: "2026 UI 트렌드, '설명 없는 온보딩'", image: 'https://www.figma.com/api/mcp/asset/21a0f5a3-c3ec-41dc-bcd7-ce32f5e1b6ba.png' },
    { id: 'toss-ui', badge: '기업 블로그', tag: '국내', title: '토스가 삭제한 UI를 다시 살린 이유', image: 'https://www.figma.com/api/mcp/asset/a4c794a3-732a-4f52-88cf-39e6c546a2d3.png' },
    { id: 'ux-trend', badge: '트렌드', tag: 'UX 디자인', title: 'UX 디자인 트렌드', image: 'https://www.figma.com/api/mcp/asset/ad84418c-a2f3-4ea6-b9d7-ea0812218902.png' },
    { id: 'trust-design', badge: '트렌드', tag: '프로덕트 디자인', title: "AI 기능보다 '신뢰 설계'가 더 중요해졌어요", image: 'https://www.figma.com/api/mcp/asset/5f8b1a46-4252-45f5-b8df-815bc2de2e69.png' },
    { id: 'airbnb-loading', badge: '기업 블로그', tag: '해외', title: 'Airbnb가 로딩 화면에 스토리를 넣은 이유', image: 'https://www.figma.com/api/mcp/asset/7b241d29-de88-4509-acf8-a2b240a371aa.png' },
  ],
  trend: [
    { id: 'trend-onboarding', badge: '트렌드', tag: '프로덕트 디자인', title: "2026 UI 트렌드, '설명 없는 온보딩'", image: 'https://www.figma.com/api/mcp/asset/dc166fd0-ff99-46bc-b9c4-10fc0453f381.png' },
    { id: 'ux-trend', badge: '트렌드', tag: 'UX 디자인', title: 'UX 디자인 트렌드', image: 'https://www.figma.com/api/mcp/asset/f92e8283-a733-4f59-843e-0d69bf221545.png' },
    { id: 'trust-design', badge: '트렌드', tag: '프로덕트 디자인', title: "AI 기능보다 '신뢰 설계'가 더 중요해졌어요", image: 'https://www.figma.com/api/mcp/asset/cb9cf806-c550-4b74-a7e0-cbf18dd1400f.png' },
  ],
  blog: [
    { id: 'toss-ui', badge: '기업 블로그', tag: '국내', title: '토스가 삭제한 UI를 다시 살린 이유', image: 'https://www.figma.com/api/mcp/asset/b4609c19-1af0-46a0-a13d-a71a2fde8df7.png' },
    { id: 'airbnb-loading', badge: '기업 블로그', tag: '해외', title: 'Airbnb가 로딩 화면에 스토리를 넣은 이유', image: 'https://www.figma.com/api/mcp/asset/216aed3d-7117-4a60-b650-69e47b54d3e9.png' },
  ],
};

const SAVED_COLLECTIONS = [
  { id: 'all', title: '전체', count: 5, image: 'https://www.figma.com/api/mcp/asset/4cb4121b-042d-4fe8-bc60-466c80a6990d.png' },
  { id: 'toss', title: '토스', count: 1, image: 'https://www.figma.com/api/mcp/asset/fe3477f4-a40f-4476-a4df-8f890d559e3a.png' },
];

function ArticleCard({ article, isBookmarked, onToggleBookmark }) {
  return (
    <article className="bg-white border border-[#e7eaee] rounded-2xl pt-1 px-1 pb-4 flex flex-col gap-6 w-full">
      <div className="relative w-full h-[219px] rounded-xl overflow-hidden shrink-0">
        <img alt="" src={article.image} className="absolute inset-0 size-full object-cover" />
        <div className="absolute top-0 right-0 p-2.5">
          <button
            type="button"
            onClick={() => onToggleBookmark(article.id)}
            className="flex items-center justify-center size-6 cursor-pointer"
            aria-label="북마크"
            aria-pressed={isBookmarked}
          >
            {isBookmarked ? (
              <span
                aria-hidden
                className="block size-6"
                style={{
                  WebkitMaskImage: `url("${imgBookmarkFill}")`,
                  maskImage: `url("${imgBookmarkFill}")`,
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  backgroundColor: '#FFFFFF',
                }}
              />
            ) : (
              <img alt="" src={imgBookmark} className="size-6" />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-3 w-full">
        <div className="flex gap-2 items-center">
          <span className="flex items-center justify-center h-7 px-2 rounded-lg bg-[#1a75ff]/10 text-[13px] font-medium tracking-[0.26px] text-[#1a75ff]">{article.badge}</span>
          <span className="flex items-center justify-center h-7 px-2 rounded-lg bg-[#f4f6f8] text-[13px] font-medium tracking-[0.26px] text-[#747886]">{article.tag}</span>
        </div>
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] w-full">{article.title}</p>
      </div>
    </article>
  );
}

function SavedCard({ collection }) {
  return (
    <article className="bg-white border border-[#e7eaee] rounded-2xl pt-1 px-1 pb-4 flex flex-col gap-6 w-full">
      <div className="relative w-full h-[219px] rounded-xl overflow-hidden shrink-0">
        <img alt="" src={collection.image} className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="flex flex-col gap-1 px-3 w-full">
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] w-full">{collection.title}</p>
        <p className="font-normal text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886] w-full">저장된 인사이트 {collection.count}개</p>
      </div>
    </article>
  );
}

export default function MyPageInsight({ insightTab = 'all' }) {
  const articles = ARTICLES[insightTab] ?? ARTICLES.all;
  const [bookmarkedIds, setBookmarkedIds] = useState(() => new Set());

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="pt-5 w-full">
      {insightTab === 'saved' ? (
        <div className="grid grid-cols-2 gap-[18px]">
          {SAVED_COLLECTIONS.map((collection) => (
            <SavedCard key={collection.id} collection={collection} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-[18px]">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              isBookmarked={bookmarkedIds.has(article.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
}
