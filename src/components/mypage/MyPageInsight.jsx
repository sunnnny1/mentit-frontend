import { useState } from 'react';
import figma_5dffe2dd_882b_41a3_a099_9e1eff1e1134_svg from '../../assets/figma/5dffe2dd-882b-41a3-a099-9e1eff1e1134.svg';
import figma_b20bcd72_0b9e_4707_8bd9_b80aa3f1fae3_svg from '../../assets/figma/b20bcd72-0b9e-4707-8bd9-b80aa3f1fae3.svg';
import figma_21a0f5a3_c3ec_41dc_bcd7_ce32f5e1b6ba_png from '../../assets/figma/21a0f5a3-c3ec-41dc-bcd7-ce32f5e1b6ba.png';
import figma_a4c794a3_732a_4f52_88cf_39e6c546a2d3_png from '../../assets/figma/a4c794a3-732a-4f52-88cf-39e6c546a2d3.png';
import figma_ad84418c_a2f3_4ea6_b9d7_ea0812218902_png from '../../assets/figma/ad84418c-a2f3-4ea6-b9d7-ea0812218902.png';
import figma_5f8b1a46_4252_45f5_b8df_815bc2de2e69_png from '../../assets/figma/5f8b1a46-4252-45f5-b8df-815bc2de2e69.png';
import figma_7b241d29_de88_4509_acf8_a2b240a371aa_png from '../../assets/figma/7b241d29-de88-4509-acf8-a2b240a371aa.png';
import figma_dc166fd0_ff99_46bc_b9c4_10fc0453f381_png from '../../assets/figma/dc166fd0-ff99-46bc-b9c4-10fc0453f381.png';
import figma_f92e8283_a733_4f59_843e_0d69bf221545_png from '../../assets/figma/f92e8283-a733-4f59-843e-0d69bf221545.png';
import figma_cb9cf806_c550_4b74_a7e0_cbf18dd1400f_png from '../../assets/figma/cb9cf806-c550-4b74-a7e0-cbf18dd1400f.png';
import figma_b4609c19_1af0_46a0_a13d_a71a2fde8df7_png from '../../assets/figma/b4609c19-1af0-46a0-a13d-a71a2fde8df7.png';
import figma_216aed3d_7117_4a60_b650_69e47b54d3e9_png from '../../assets/figma/216aed3d-7117-4a60-b650-69e47b54d3e9.png';
import figma_4cb4121b_042d_4fe8_bc60_466c80a6990d_png from '../../assets/figma/4cb4121b-042d-4fe8-bc60-466c80a6990d.png';
import figma_fe3477f4_a40f_4476_a4df_8f890d559e3a_png from '../../assets/figma/fe3477f4-a40f-4476-a4df-8f890d559e3a.png';

const imgBookmark = figma_5dffe2dd_882b_41a3_a099_9e1eff1e1134_svg;
const imgBookmarkFill = figma_b20bcd72_0b9e_4707_8bd9_b80aa3f1fae3_svg;

const ARTICLES = {
  all: [
    { id: 'trend-onboarding', badge: '트렌드', tag: '프로덕트 디자인', title: "2026 UI 트렌드, '설명 없는 온보딩'", image: figma_21a0f5a3_c3ec_41dc_bcd7_ce32f5e1b6ba_png },
    { id: 'toss-ui', badge: '기업 블로그', tag: '국내', title: '토스가 삭제한 UI를 다시 살린 이유', image: figma_a4c794a3_732a_4f52_88cf_39e6c546a2d3_png },
    { id: 'ux-trend', badge: '트렌드', tag: 'UX 디자인', title: 'UX 디자인 트렌드', image: figma_ad84418c_a2f3_4ea6_b9d7_ea0812218902_png },
    { id: 'trust-design', badge: '트렌드', tag: '프로덕트 디자인', title: "AI 기능보다 '신뢰 설계'가 더 중요해졌어요", image: figma_5f8b1a46_4252_45f5_b8df_815bc2de2e69_png },
    { id: 'airbnb-loading', badge: '기업 블로그', tag: '해외', title: 'Airbnb가 로딩 화면에 스토리를 넣은 이유', image: figma_7b241d29_de88_4509_acf8_a2b240a371aa_png },
  ],
  trend: [
    { id: 'trend-onboarding', badge: '트렌드', tag: '프로덕트 디자인', title: "2026 UI 트렌드, '설명 없는 온보딩'", image: figma_dc166fd0_ff99_46bc_b9c4_10fc0453f381_png },
    { id: 'ux-trend', badge: '트렌드', tag: 'UX 디자인', title: 'UX 디자인 트렌드', image: figma_f92e8283_a733_4f59_843e_0d69bf221545_png },
    { id: 'trust-design', badge: '트렌드', tag: '프로덕트 디자인', title: "AI 기능보다 '신뢰 설계'가 더 중요해졌어요", image: figma_cb9cf806_c550_4b74_a7e0_cbf18dd1400f_png },
  ],
  blog: [
    { id: 'toss-ui', badge: '기업 블로그', tag: '국내', title: '토스가 삭제한 UI를 다시 살린 이유', image: figma_b4609c19_1af0_46a0_a13d_a71a2fde8df7_png },
    { id: 'airbnb-loading', badge: '기업 블로그', tag: '해외', title: 'Airbnb가 로딩 화면에 스토리를 넣은 이유', image: figma_216aed3d_7117_4a60_b650_69e47b54d3e9_png },
  ],
};

const SAVED_COLLECTIONS = [
  { id: 'all', title: '전체', count: 5, image: figma_4cb4121b_042d_4fe8_bc60_466c80a6990d_png },
  { id: 'toss', title: '토스', count: 1, image: figma_fe3477f4_a40f_4476_a4df_8f890d559e3a_png },
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
