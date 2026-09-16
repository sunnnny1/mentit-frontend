import { useState } from 'react';

import imgThumnail from '../assets/icons/talk-thumb-1.webp';
import imgThumnail1 from '../assets/icons/talk-thumb-2.webp';
import imgBookmark from '../assets/icons/careertalk-bookmark.svg';
import imgBookmarkFill from '../assets/icons/careertalk-bookmark-fill.svg';
import imgChevronRight from '../assets/icons/chevron-right.svg';

const TALKS = [
  { title: 'AI 시대의 프로덕트 디자인 활용 팁', mentor: 'Yoonie 멘토', role: '프로덕트 디자이너', thumbnail: imgThumnail, hasDetail: true, articleId: 'yoonie' },
  { title: '에이전틱 AI 제품 만들 때 참고할 점', mentor: 'U.ha 멘토', role: '프로덕트 디자이너', thumbnail: imgThumnail1, hasDetail: true, articleId: 'uha' },
];

function TalkCard({ talk, onOpenDetail }) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div
      className={`relative h-[309px] w-[550px] rounded-2xl overflow-hidden shrink-0 ${talk.hasDetail ? 'cursor-pointer' : ''}`}
      onClick={talk.hasDetail ? () => onOpenDetail?.(talk.articleId) : undefined}
      role={talk.hasDetail ? 'button' : undefined}
    >
      <img src={talk.thumbnail} alt={talk.title} className="absolute inset-0 size-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-[52px] bg-gradient-to-b from-black/10 to-transparent flex items-center justify-end px-3">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setBookmarked((v) => !v);
          }}
          className="relative flex items-center justify-center size-6 overflow-hidden cursor-pointer"
          aria-pressed={bookmarked}
        >
          {bookmarked ? (
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
                backgroundColor: '#ffffff',
              }}
            />
          ) : (
            <img alt="북마크" src={imgBookmark} className="size-6" />
          )}
        </button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[140px] px-4 pb-4 flex flex-col justify-end gap-0.5">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(156, 162, 177, 0.9) 0%, rgba(156, 162, 177, 0.45) 38%, rgba(156, 162, 177, 0.12) 68%, rgba(156, 162, 177, 0) 100%)',
          }}
        />
        <p className="relative font-bold text-lg leading-[1.5] tracking-[-0.0036px] text-white [text-shadow:0_0_2px_rgba(0,0,0,0.08)]">{talk.title}</p>
        <div className="relative flex gap-0.5 items-center text-[15px] leading-[1.45] text-white [text-shadow:0_0_2px_rgba(0,0,0,0.08)]">
          <span>{talk.mentor}</span>
          <span>・</span>
          <span>{talk.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function CareerTalk({ onNavigateToCareerTalk, onOpenDetail }) {
  return (
    <section className="flex flex-col gap-6 items-start w-full">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-bold text-[22px] tracking-[-0.33px] text-[#121213]">멘토들의 커리어 토크</h2>
        <button
          type="button"
          onClick={onNavigateToCareerTalk}
          className="flex gap-0.5 items-center font-medium text-sm text-[#9ca2b1] tracking-[0.14px] cursor-pointer"
        >
          <span>전체보기</span>
          <img alt="" src={imgChevronRight} className="size-6" />
        </button>
      </div>
      <div className="flex gap-5 items-center">
        {TALKS.map((talk) => (
          <TalkCard key={talk.title} talk={talk} onOpenDetail={onOpenDetail} />
        ))}
      </div>
    </section>
  );
}
