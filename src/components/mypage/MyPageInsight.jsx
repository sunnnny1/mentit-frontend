import { useState } from 'react';
import figma_5dffe2dd_882b_41a3_a099_9e1eff1e1134_svg from '../../assets/figma/5dffe2dd-882b-41a3-a099-9e1eff1e1134.svg';
import figma_b20bcd72_0b9e_4707_8bd9_b80aa3f1fae3_svg from '../../assets/figma/b20bcd72-0b9e-4707-8bd9-b80aa3f1fae3.svg';
import imgAiEra from '../../assets/figma/7d27cb31-182d-4209-b678-b9f8492fab4a.png';
import imgTossUi from '../../assets/figma/0f6c2341-f009-423a-8e44-71281f9a2bd5.png';
import imgUxTrend from '../../assets/figma/aa9a2268-6031-4d30-85cc-7020ec250cc8.webp';
import imgTrustDesign from '../../assets/figma/6ed80823-64b9-42a4-bfa4-f87c0dacda77.png';
import imgAirbnb from '../../assets/figma/731994e7-5322-42d0-ab63-df82abb2174e.png';

const imgBookmark = figma_5dffe2dd_882b_41a3_a099_9e1eff1e1134_svg;
const imgBookmarkFill = figma_b20bcd72_0b9e_4707_8bd9_b80aa3f1fae3_svg;

const ALL_ARTICLES = [
  {
    id: 'ai-era',
    badge: '트렌드',
    tag: '프로덕트 디자인',
    title: 'AI가 디자인을 대신하는 시대, 프로덕트 디자이너에게 더 중요해진 것',
    image: imgAiEra,
  },
  {
    id: 'toss-ui',
    badge: '기업 블로그',
    tag: '국내',
    title: '토스가 삭제한 UI를 다시 살린 이유',
    image: imgTossUi,
  },
  {
    id: 'ux-trend',
    badge: '트렌드',
    tag: 'UX 디자인',
    title: 'UX 디자인 트렌드',
    image: imgUxTrend,
  },
  {
    id: 'trust-design',
    badge: '트렌드',
    tag: '프로덕트 디자인',
    title: "AI 기능보다 '신뢰 설계'가 더 중요해졌어요",
    image: imgTrustDesign,
  },
  {
    id: 'airbnb-loading',
    badge: '기업 블로그',
    tag: '해외',
    title: 'Airbnb가 로딩 화면에 스토리를 넣은 이유',
    image: imgAirbnb,
  },
];

const DEFAULT_BOOKMARKS = [];

function articlesForTab(tab) {
  if (tab === 'trend') return ALL_ARTICLES.filter((article) => article.badge === '트렌드');
  if (tab === 'blog') return ALL_ARTICLES.filter((article) => article.badge === '기업 블로그');
  return ALL_ARTICLES;
}

function ArticleCard({ article, isBookmarked, onToggleBookmark, onOpenDetail }) {
  return (
    <article
      className={`bg-white border border-[#e7eaee] rounded-2xl pt-1 px-1 pb-4 flex flex-col gap-6 w-full h-full ${
        onOpenDetail ? 'cursor-pointer' : ''
      }`}
      onClick={onOpenDetail}
    >
      <div className="relative w-full aspect-[415/233] rounded-[12px] overflow-hidden shrink-0">
        <img alt="" src={article.image} className="absolute inset-0 size-full object-cover" />
        <div className="absolute top-0 right-0 p-2.5">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggleBookmark(article.id);
            }}
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
      <div className="flex flex-col gap-3 px-3 w-full flex-1">
        <div className="flex gap-2 items-center">
          <span className="flex items-center justify-center h-7 px-2 rounded-lg bg-[#1a75ff]/10 text-[13px] font-medium tracking-[0.26px] text-[#1a75ff]">
            {article.badge}
          </span>
          <span className="flex items-center justify-center h-7 px-2 rounded-lg bg-[#f4f6f8] text-[13px] font-medium tracking-[0.26px] text-[#747886]">
            {article.tag}
          </span>
        </div>
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] w-full line-clamp-2 break-words">
          {article.title}
        </p>
      </div>
    </article>
  );
}

function SavedCard({ collection }) {
  return (
    <article className="bg-white border border-[#e7eaee] rounded-2xl pt-1 px-1 pb-4 flex flex-col gap-6 w-full h-full">
      <div className="relative w-full aspect-[415/233] rounded-[12px] overflow-hidden shrink-0">
        <img alt="" src={collection.image} className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="flex flex-col gap-1 px-3 w-full">
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] w-full line-clamp-2">
          {collection.title}
        </p>
        <p className="font-normal text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886] w-full">
          저장된 인사이트 {collection.count}개
        </p>
      </div>
    </article>
  );
}

export default function MyPageInsight({ insightTab = 'all', onOpenDetail }) {
  const articles = articlesForTab(insightTab);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => new Set(DEFAULT_BOOKMARKS));
  const savedCollections = [
    { id: 'all', title: '전체', count: ALL_ARTICLES.length, image: imgAiEra },
    { id: 'toss', title: '토스', count: 1, image: imgTossUi },
  ];

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="pt-5 pb-16 w-full">
      {insightTab === 'saved' ? (
        <div className="grid grid-cols-2 gap-5 items-stretch">
          {savedCollections.map((collection) => (
            <SavedCard key={collection.id} collection={collection} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 items-stretch">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              isBookmarked={bookmarkedIds.has(article.id)}
              onToggleBookmark={toggleBookmark}
              onOpenDetail={article.id === 'ai-era' ? () => onOpenDetail?.(article.id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
