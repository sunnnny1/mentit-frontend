import { useEffect, useMemo, useRef, useState } from 'react';

const imgBookmark = 'https://www.figma.com/api/mcp/asset/4ac74a74-c74e-4012-9e9d-4270d3c5690e.svg';
const imgBookmarkFill = 'https://www.figma.com/api/mcp/asset/b20bcd72-0b9e-4707-8bd9-b80aa3f1fae3.svg';
const imgChevronDown = 'https://www.figma.com/api/mcp/asset/2a8c0fab-ff12-4088-9976-f8cdb0698792.svg';
const imgMoreChevron = 'https://www.figma.com/api/mcp/asset/bb3b8c56-7ee3-4df3-ba7c-8fbd9131aa9f.svg';

const CROP = { top: '-31.68%', left: '-0.08%', width: '100%', height: '135.41%' };

const CAREER_TALK_POSTS = [
  {
    title: 'AI 시대의 프로덕트 디자인 활용 팁',
    mentor: 'Yoonie 멘토',
    role: '프로덕트 디자이너',
    src: 'https://www.figma.com/api/mcp/asset/f6bbfcc4-7f95-4233-82a0-9c56cf516c69.png',
    hasDetail: true,
    articleId: 'yoonie',
  },
  {
    title: 'UXUI, 반드시 알아야 할 데이터 읽는 법',
    mentor: 'Dasiy 멘토',
    role: '프로덕트 디자이너',
    src: 'https://www.figma.com/api/mcp/asset/42e8dda3-b48d-4178-aa56-943f81e0bc58.png',
    crop: CROP,
  },
  {
    title: '에이전틱 AI 제품 만들 때 참고할 점',
    mentor: 'U.ha 멘토',
    role: '프로덕트 디자이너',
    src: 'https://www.figma.com/api/mcp/asset/1852c258-39ea-4fc0-840c-4e7df6c56d59.png',
    crop: CROP,
    hasDetail: true,
    articleId: 'uha',
  },
  {
    title: '인터뷰 스크립트 짜는 법',
    mentor: 'Peter 멘토',
    role: 'UX 디자이너',
    src: 'https://www.figma.com/api/mcp/asset/444c9d7b-ee5e-436b-b8c4-9cd4b605267e.png',
  },
  {
    title: '면접 볼 때 이것만은 하지 마세요!',
    mentor: 'Sunny 멘토',
    role: 'UX 디자이너',
    src: 'https://www.figma.com/api/mcp/asset/64c9f214-aa8c-44ed-91cf-2b4ec4344479.png',
  },
  {
    title: '화면보다 먼저 봐야 할 것',
    mentor: 'Emma 멘토',
    role: '프로덕트 디자이너',
    src: 'https://www.figma.com/api/mcp/asset/57ca12d7-4a35-44a5-868b-66cc2ca11698.png',
  },
  {
    title: '비대면으로 UT하는 툴 소개해드려요',
    mentor: 'Andrew 멘토',
    role: '프로덕트 디자이너',
    src: 'https://www.figma.com/api/mcp/asset/b1826544-39cf-4bbc-9ecf-5a1e949ead99.png',
  },
  {
    title: '숫자보다 맥락이 먼저예요',
    mentor: 'Rora 멘토',
    role: 'UX 디자이너',
    src: 'https://www.figma.com/api/mcp/asset/2aaad4a5-40c5-4c8b-83bd-e75572d056d9.png',
  },
  {
    title: '유저 리서치할 때 주의해야 할 점',
    mentor: 'Stella 멘토',
    role: 'UX 디자이너',
    src: 'https://www.figma.com/api/mcp/asset/5889b5a5-5bb9-4b8c-9126-c21a5641ada6.png',
  },
  {
    title: '제 판단 기준은 이거예요',
    mentor: 'Jack 멘토',
    role: 'UX 디자이너',
    src: 'https://www.figma.com/api/mcp/asset/c6a69720-80fd-4bc4-ac71-9af6bb352849.png',
  },
];

const JOB_GROUPS = ['개발', '경영・비즈니스', '마케팅・광고', '디자인', '게임 제작', '미디어'];
const JOB_ROLES = ['그래픽 디자인', '게임 디자인', '프로덕트 디자인', 'UX 디자인', '제품 디자인', '영상・모션 디자인'];

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
          <img alt="" src={imgBookmark} className="relative size-6" />
        )}
      </button>
      <div className="absolute bottom-0 left-0 w-full px-4 pb-3 pt-10 bg-gradient-to-t from-black/60 to-transparent flex flex-col gap-0.5">
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-white">{talk.title}</p>
        <p className="font-normal text-[15px] leading-[1.45] text-white">
          {talk.mentor} ・ {talk.role}
        </p>
      </div>
    </div>
  );
}

function CheckRow({ label, checked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative overflow-hidden flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl bg-white cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:transition-opacity"
    >
      <span className="relative font-normal text-[14px] leading-[1.58] tracking-[0.14px] text-[#121213]">{label}</span>
      <span
        className={`relative size-[18px] rounded-[5px] border-[1.5px] shrink-0 ${
          checked ? 'bg-[#1a75ff] border-[#1a75ff]' : 'border-[#e7eaee] bg-white'
        }`}
      />
    </button>
  );
}

function JobDropdown() {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState(['디자인']);
  const [roles, setRoles] = useState(['프로덕트 디자인', 'UX 디자인']);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const triggerLabel =
    roles.length === 0
      ? '직군/직무 선택'
      : roles.length === 1
        ? roles[0]
        : `${roles[0]} 외 ${roles.length - 1}개`;

  const toggle = (list, setList, value) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative overflow-hidden bg-white border border-[#e7eaee] rounded-xl w-[300px] px-5 py-4 flex items-center gap-2 cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:transition-opacity"
        aria-expanded={open}
      >
        <span className="relative flex-1 text-left font-normal text-[16px] leading-[1.45] text-[#121213]">{triggerLabel}</span>
        <img alt="" src={imgChevronDown} className={`relative size-6 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-20 mt-2 flex gap-1 items-start">
          <div className="bg-white border border-[#e7eaee] rounded-[10px] w-[300px] px-4 py-6 flex flex-col gap-4 shadow-[0_0_8px_rgba(18,18,19,0.04)]">
            <p className="px-3 font-bold text-[16px] leading-[1.45] text-[#121213]">직군</p>
            <div className="flex flex-col gap-2">
              {JOB_GROUPS.map((label) => (
                <CheckRow
                  key={label}
                  label={label}
                  checked={groups.includes(label)}
                  onToggle={() => toggle(groups, setGroups, label)}
                />
              ))}
            </div>
          </div>
          <div className="bg-white border border-[#e7eaee] rounded-[10px] w-[300px] px-4 py-6 flex flex-col gap-4 shadow-[0_0_8px_rgba(18,18,19,0.04)]">
            <p className="px-3 font-bold text-[16px] leading-[1.45] text-[#121213]">직무</p>
            <div className="flex flex-col gap-2">
              {JOB_ROLES.map((label) => (
                <CheckRow
                  key={label}
                  label={label}
                  checked={roles.includes(label)}
                  onToggle={() => toggle(roles, setRoles, label)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BoardCareerTalk({ onOpenDetail }) {
  const [sort, setSort] = useState('popular');
  const [latestPosts, setLatestPosts] = useState(() => shuffle(CAREER_TALK_POSTS));
  const [expanded, setExpanded] = useState(false);

  const posts = useMemo(
    () => (sort === 'popular' ? CAREER_TALK_POSTS : latestPosts),
    [sort, latestPosts],
  );
  const visiblePosts = expanded ? posts : posts.slice(0, 4);

  return (
    <div className="max-w-[867px] mx-auto py-16 flex flex-col gap-10">
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

      <JobDropdown />

      <div className="flex flex-col gap-5 items-center w-full">
        <div className="grid grid-cols-2 gap-5 w-full">
          {visiblePosts.map((talk) => (
            <CareerTalkCard key={talk.title} talk={talk} onOpenDetail={onOpenDetail} />
          ))}
        </div>
        {!expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="w-full border border-[#e7eaee] rounded-lg py-2 px-4 flex items-center justify-center gap-1 font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886] cursor-pointer"
          >
            <img alt="" src={imgMoreChevron} className="size-6" />
            <span>더보기</span>
          </button>
        )}
      </div>
    </div>
  );
}
