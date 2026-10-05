import { useMemo, useState } from 'react';
import imgBookmark from '../../assets/icons/careertalk-bookmark.svg';
import imgBookmarkFill from '../../assets/icons/careertalk-bookmark-fill.svg';
import imgTalkYoonie from '../../assets/icons/talkYoonie.png';
import imgTalkUha from '../../assets/icons/talkUha.png';
import BoardJobDropdown from './BoardJobDropdown';
import figma_42e8dda3_b48d_4178_aa56_943f81e0bc58_png from '../../assets/figma/42e8dda3-b48d-4178-aa56-943f81e0bc58.webp';
import figma_444c9d7b_ee5e_436b_b8c4_9cd4b605267e_png from '../../assets/figma/444c9d7b-ee5e-436b-b8c4-9cd4b605267e.png';
import figma_64c9f214_aa8c_44ed_91cf_2b4ec4344479_png from '../../assets/figma/64c9f214-aa8c-44ed-91cf-2b4ec4344479.png';
import figma_57ca12d7_4a35_44a5_868b_66cc2ca11698_png from '../../assets/figma/57ca12d7-4a35-44a5-868b-66cc2ca11698.png';
import figma_b1826544_39cf_4bbc_9ecf_5a1e949ead99_png from '../../assets/figma/b1826544-39cf-4bbc-9ecf-5a1e949ead99.png';
import figma_2aaad4a5_40c5_4c8b_83bd_e75572d056d9_png from '../../assets/figma/2aaad4a5-40c5-4c8b-83bd-e75572d056d9.png';
import figma_5889b5a5_5bb9_4b8c_9126_c21a5641ada6_png from '../../assets/figma/5889b5a5-5bb9-4b8c-9126-c21a5641ada6.png';
import figma_c6a69720_80fd_4bc4_ac71_9af6bb352849_png from '../../assets/figma/c6a69720-80fd-4bc4-ac71-9af6bb352849.png';

const CROP = { top: '-31.68%', left: '-0.08%', width: '100%', height: '135.41%' };

const CAREER_TALK_POSTS = [
  {
    title: 'AI 시대의 프로덕트 디자인 활용 팁',
    mentor: 'Yoonie 멘토',
    role: '프로덕트 디자이너',
    src: imgTalkYoonie,
    hasDetail: true,
    articleId: 'yoonie',
  },
  {
    title: 'UXUI, 반드시 알아야 할 데이터 읽는 법',
    mentor: 'Dasiy 멘토',
    role: '프로덕트 디자이너',
    src: figma_42e8dda3_b48d_4178_aa56_943f81e0bc58_png,
    crop: CROP,
  },
  {
    title: '에이전틱 AI 제품 만들 때 참고할 점',
    mentor: 'U.ha 멘토',
    role: '프로덕트 디자이너',
    src: imgTalkUha,
    hasDetail: true,
    articleId: 'uha',
  },
  {
    title: '인터뷰 스크립트 짜는 법',
    mentor: 'Peter 멘토',
    role: 'UX 디자이너',
    src: figma_444c9d7b_ee5e_436b_b8c4_9cd4b605267e_png,
  },
  {
    title: '면접 볼 때 이것만은 하지 마세요!',
    mentor: 'Sunny 멘토',
    role: 'UX 디자이너',
    src: figma_64c9f214_aa8c_44ed_91cf_2b4ec4344479_png,
  },
  {
    title: '화면보다 먼저 봐야 할 것',
    mentor: 'Emma 멘토',
    role: '프로덕트 디자이너',
    src: figma_57ca12d7_4a35_44a5_868b_66cc2ca11698_png,
  },
  {
    title: '비대면으로 UT하는 툴 소개해드려요',
    mentor: 'Andrew 멘토',
    role: '프로덕트 디자이너',
    src: figma_b1826544_39cf_4bbc_9ecf_5a1e949ead99_png,
  },
  {
    title: '숫자보다 맥락이 먼저예요',
    mentor: 'Rora 멘토',
    role: 'UX 디자이너',
    src: figma_2aaad4a5_40c5_4c8b_83bd_e75572d056d9_png,
  },
  {
    title: '유저 리서치할 때 주의해야 할 점',
    mentor: 'Stella 멘토',
    role: 'UX 디자이너',
    src: figma_5889b5a5_5bb9_4b8c_9126_c21a5641ada6_png,
  },
  {
    title: '제 판단 기준은 이거예요',
    mentor: 'Jack 멘토',
    role: 'UX 디자이너',
    src: figma_c6a69720_80fd_4bc4_ac71_9af6bb352849_png,
  },
];

function shuffle(list) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function CareerTalkCard({ talk, onOpenDetail }) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div
      className={`relative w-full h-[282px] rounded-2xl overflow-hidden ${talk.hasDetail ? 'cursor-pointer' : ''}`}
      onClick={talk.hasDetail ? () => onOpenDetail?.(talk.articleId) : undefined}
      role={talk.hasDetail ? 'button' : undefined}
    >
      {talk.crop ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
          <img
            alt=""
            src={talk.src}
            className="absolute max-w-none w-full"
            style={{
              top: talk.crop.top,
              left: talk.crop.left,
              width: talk.crop.width,
              height: talk.crop.height,
            }}
          />
        </div>
      ) : (
        <img alt="" src={talk.src} className="absolute inset-0 size-full object-cover rounded-2xl" />
      )}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setBookmarked((v) => !v);
        }}
        className="absolute top-3 right-3 size-6 overflow-hidden cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:transition-opacity"
        aria-label="북마크"
        aria-pressed={bookmarked}
      >
        {bookmarked ? (
          <span
            aria-hidden
            className="relative block size-6"
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
          <span
              aria-hidden
              className="relative block size-6"
              style={{
                WebkitMaskImage: `url("${imgBookmark}")`,
                maskImage: `url("${imgBookmark}")`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                backgroundColor: '#ffffff',
              }}
            />
        )}
      </button>
      <div className="absolute bottom-0 left-0 w-full h-[140px] px-4 pb-3 flex flex-col justify-end gap-0.5">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(156, 162, 177, 0.9) 0%, rgba(156, 162, 177, 0.45) 38%, rgba(156, 162, 177, 0.12) 68%, rgba(156, 162, 177, 0) 100%)',
          }}
        />
        <p className="relative font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-white [text-shadow:0_0_2px_rgba(0,0,0,0.08)]">{talk.title}</p>
        <p className="relative font-normal text-[15px] leading-[1.45] text-white [text-shadow:0_0_2px_rgba(0,0,0,0.08)]">
          {talk.mentor} ・ {talk.role}
        </p>
      </div>
    </div>
  );
}

export default function BoardCareerTalk({ onOpenDetail }) {
  const [sort, setSort] = useState('popular');
  const [latestPosts, setLatestPosts] = useState(() => shuffle(CAREER_TALK_POSTS));

  const posts = useMemo(
    () => (sort === 'popular' ? CAREER_TALK_POSTS : latestPosts),
    [sort, latestPosts],
  );

  return (
    <div className="w-full max-w-[867px] mx-auto h-full min-h-0 pt-16 pb-16 flex flex-col">
      <div className="relative z-20 shrink-0 flex flex-col gap-10 bg-white pb-6">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213]">
          멘토들이 발행하는 커리어 이야기에요
        </h2>
        <div className="bg-[#f4f6f8] p-0.5 rounded-lg flex items-center">
          {[
            { key: 'popular', label: '인기순' },
            { key: 'latest', label: '최신순' },
          ].map((option) => {
            const isActive = sort === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => {
                  if (option.key === 'latest') setLatestPosts(shuffle(CAREER_TALK_POSTS));
                  setSort(option.key);
                }}
                className={`px-7 py-1 rounded-lg font-medium text-[13px] leading-[1.4] tracking-[0.26px] cursor-pointer ${
                  isActive ? 'bg-white shadow-[0_0_8px_rgba(18,18,19,0.04)] text-[#121213]' : 'text-[#9ca2b1]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <BoardJobDropdown className="relative w-full" />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
      <div className="grid grid-cols-2 gap-5 w-full">
        {posts.map((talk) => (
          <CareerTalkCard key={talk.title} talk={talk} onOpenDetail={onOpenDetail} />
        ))}
      </div>
      </div>
    </div>
  );
}
