import { useState } from 'react';
import figma_c5e0db78_1e3c_4f7a_b950_19e91fffe9aa_svg from '../../assets/figma/c5e0db78-1e3c-4f7a-b950-19e91fffe9aa.svg';
import figma_b20bcd72_0b9e_4707_8bd9_b80aa3f1fae3_svg from '../../assets/figma/b20bcd72-0b9e-4707-8bd9-b80aa3f1fae3.svg';
import figma_9f8b2245_96d6_4a5a_b781_47ccca5a60e6_png from '../../assets/figma/9f8b2245-96d6-4a5a-b781-47ccca5a60e6.png';
import figma_51ba9a82_9ebd_49ab_b34d_0085621101d1_png from '../../assets/figma/51ba9a82-9ebd-49ab-b34d-0085621101d1.png';
import figma_1fe4470f_d393_4fb9_bfd3_fe093b843f3b_png from '../../assets/figma/1fe4470f-d393-4fb9-bfd3-fe093b843f3b.png';
import figma_1bd879c7_c846_47ea_9853_45130c711592_png from '../../assets/figma/1bd879c7-c846-47ea-9853-45130c711592.png';

const imgIconNormalBookmark = figma_c5e0db78_1e3c_4f7a_b950_19e91fffe9aa_svg;
const imgIconNormalBookmarkFill = figma_b20bcd72_0b9e_4707_8bd9_b80aa3f1fae3_svg;

const BOOKMARKED_ARTICLES = [
  { id: 'ai-product-design-tips', title: 'AI 시대의 프로덕트 디자인 활용 팁', subtitle: 'Yoonie 멘토・프로덕트 디자이너', image: figma_9f8b2245_96d6_4a5a_b781_47ccca5a60e6_png },
  { id: 'interview-donts', title: '면접 볼 때 이것만은 하지 마세요!', subtitle: 'Sunny 멘토・UX 디자이너', image: figma_51ba9a82_9ebd_49ab_b34d_0085621101d1_png },
  { id: 'agentic-ai-product', title: '에이전틱 AI 제품을 만들 때 참고할 점', subtitle: 'U.ha 멘토・프로덕트 디자이너', image: figma_1fe4470f_d393_4fb9_bfd3_fe093b843f3b_png },
  { id: 'user-research-cautions', title: '유저 리서치할 때 주의해야 할 점', subtitle: 'Stella 멘토・UX 디자이너', image: figma_1bd879c7_c846_47ea_9853_45130c711592_png },
];

function BookmarkCard({ article, isBookmarked, onToggleBookmark }) {
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
                  WebkitMaskImage: `url("${imgIconNormalBookmarkFill}")`,
                  maskImage: `url("${imgIconNormalBookmarkFill}")`,
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
              <img alt="" src={imgIconNormalBookmark} className="size-6" />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-3 w-full">
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] w-full">{article.title}</p>
        <p className="font-normal text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886] w-full">{article.subtitle}</p>
      </div>
    </article>
  );
}

export default function MyPageBookmark() {
  const [bookmarkedIds, setBookmarkedIds] = useState(
    () => new Set(BOOKMARKED_ARTICLES.map((a) => a.id))
  );

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
      <div className="grid grid-cols-2 gap-[18px]">
        {BOOKMARKED_ARTICLES.map((article) => (
          <BookmarkCard
            key={article.id}
            article={article}
            isBookmarked={bookmarkedIds.has(article.id)}
            onToggleBookmark={toggleBookmark}
          />
        ))}
      </div>
    </div>
  );
}
