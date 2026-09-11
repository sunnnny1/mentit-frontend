import { useEffect, useMemo, useRef, useState } from 'react';

const imgLike = 'https://www.figma.com/api/mcp/asset/d82be445-be8d-44cb-bce0-d3f6a3b977c2.svg';
const imgLikeFill = 'https://www.figma.com/api/mcp/asset/f18f03a8-dbf0-4add-aa12-723afdd968d9.svg';
const imgChevronDown = 'https://www.figma.com/api/mcp/asset/2a8c0fab-ff12-4088-9976-f8cdb0698792.svg';
const imgMoreChevron = 'https://www.figma.com/api/mcp/asset/bb3b8c56-7ee3-4df3-ba7c-8fbd9131aa9f.svg';
const imgPencil = 'https://www.figma.com/api/mcp/asset/3fab267a-3f49-4c73-b247-11cff7f62c3f.svg';

const AVATARS = [
  'https://www.figma.com/api/mcp/asset/6bedc709-49ad-401a-b0ac-7f432efb18bb.png',
  'https://www.figma.com/api/mcp/asset/c5f91b3e-e98b-43bb-8a50-aae4d4f244e1.png',
  'https://www.figma.com/api/mcp/asset/8e62c78b-c357-4570-b1d2-cd4c2e551468.png',
];

const QNA_POSTS = [
  {
    author: 'Coco',
    tag: '프로덕트 디자인',
    title: '정성적, 정량적 데이터를 어떻게 포폴에 녹여야 할까요?',
    body: '안녕하세요. 프로덕트 디자인 직무에서 일하고 싶은 디자이너 취준생입니다. 현재 포폴을 만들고 있는데 가장 어려운 부분이 정성적, 정량적 데이터를 어떻게 넣어야하는지 입니다. 현직에 계신 멘토분들의 조언 부탁드립니다!',
    image: null,
    views: 800,
    likes: 86,
    participants: 47,
    hasDetail: true,
    articleId: 'qualquant',
  },
  {
    author: '000sun',
    tag: '프로덕트 디자인',
    title: '포트폴리오에 실패한 프로젝트도 넣어도 될까요?',
    body: '실패한 프로젝트를 잘 풀어낼지, 아니면 과감하게 빼고 성공한 프로젝트만 넣어서 구성할지 고민입니다. 넣으면 오히려 감점 요소가 될까요? 너무 고민이에요.',
    image: 'https://www.figma.com/api/mcp/asset/4d8e7d48-b6ab-4f91-8b3d-409bf3a4fa86.png',
    views: 1200,
    likes: 60,
    participants: 32,
    hasDetail: true,
    articleId: 'failed',
  },
  {
    author: 'Gangster',
    tag: 'UX 디자인',
    title: '협업 경험 없는 포트폴리오, 어떻게 보완하나요?',
    body: '안녕하세요. UX 디자이너를 준비 중인 취준생입니다. 재학 중에 팀 프로젝트 기회가 많지 않아서 포트폴리오에 있는 프로젝트 대부분이 혼자 진행한 것들이에요. 실무에서는 협업이 정말 중요하다고 들었는데, 이런 경우 포트폴리오에서 어떤 방식으로 보완하면 좋을지 현직에 계신 멘토분들의 조언 부탁드립니다!',
    image: null,
    views: 687,
    likes: 48,
    participants: 29,
  },
  {
    author: 'weareone',
    tag: '프로덕트 디자인',
    title: '디자인 시스템 경험이 꼭 있어야하나요?',
    body: '채용 공고에 디자인 시스템 구축·운영 경험을 우대한다고 적힌 곳이 많은데, 개인 프로젝트에서는 이런 경험을 쌓기가 어려워서 고민이에요. 어떻게 준비하면 좋을까요?',
    image: null,
    views: 542,
    likes: 42,
    participants: 25,
  },
  {
    author: 'pizzzz',
    tag: 'UX 디자인',
    title: '사용성 테스트(UT) 참가자를 구하기 힘든데, 어떻게 하셨나요?',
    body: '학교 프로젝트로 UT를 진행하려고 하는데, 실제 타겟 유저를 구하기가 생각보다 훨씬 어려웠어요. 결국 지인이나 학교 동기 몇 명한테 부탁해서 5명 정도로 진행했는데, 표본이 너무 적고 실제 타겟과도 안 맞아서 이 데이터를 포트폴리오에 그대로 써도 되는지 걱정이 됩니다. 현직에서는 신입 때 이런 제약을 어떻게 극복하셨는지 궁금해요.',
    image: null,
    views: 596,
    likes: 48,
    participants: 22,
  },
  {
    author: 'sooyeon',
    tag: '프로덕트 디자인',
    title: '비전공자가 프로덕트 디자이너로 취업하려면 어떤 걸 준비해야 하나요?',
    body: '디자인 전공이 아니라서 기초부터 독학하고 있는데, 전공자와 비교해서 어떤 부분을 더 채워야 할지 모르겠어요. 부트캠프가 꼭 필요할까요?',
    image: 'https://www.figma.com/api/mcp/asset/b2a8cdbd-ae3f-4c16-8bff-caeb758fbadf.png',
    views: 780,
    likes: 27,
    participants: 20,
  },
  {
    author: 'want_job',
    tag: 'UX 디자인',
    title: '신입 면접에서 그 자리에서 와이어프레임 그려보라고 하면 어떻게 대응하나요?',
    body: '라이브 과제나 화이트보드 테스트가 있다는 얘기를 들었는데, 시간 안에 논리적으로 구조를 짜는 연습을 어떻게 해야 할지 감이 안 잡혀요.',
    image: 'https://www.figma.com/api/mcp/asset/d47118a4-9707-403e-bdc8-88b3a5f6c7b0.png',
    views: 576,
    likes: 39,
    participants: 18,
  },
  {
    author: 'plzzzz',
    tag: 'UX 디자인',
    title: '정보구조(IA)를 짤 때 어떤 기준으로 우선순위를 정하시나요?',
    body: '카드소팅으로 사용자들이 정보를 어떻게 그룹핑하는지까지는 파악했는데, 그 결과를 실제 메뉴 depth와 순서로 옮기는 과정에서 계속 막혀요. 사용 빈도를 기준으로 해야 할지 비즈니스 우선순위를 기준으로 해야 할지 판단이 안 서서 결국 감으로 정하게 되더라고요. 실무에서는 이런 걸 결정할 때 어떤 데이터나 기준을 참고하시는지 궁금합니다.',
    image: null,
    views: 500,
    likes: 37,
    participants: 17,
  },
  {
    author: 'mumumu',
    tag: '프로덕트 디자인',
    title: '개발자와 협업할 때 자주 부딪히는 부분이 뭔가요?',
    body: '디자인 의도가 개발 단계에서 자꾸 달라진다는 얘기를 들었는데, 실무에서는 이런 걸 어떻게 조율하는지 궁금해요.',
    image: 'https://www.figma.com/api/mcp/asset/c574a559-1d5e-467e-abcb-bc9db9c6e29c.png',
    views: 639,
    likes: 26,
    participants: 11,
  },
  {
    author: 'homelove',
    tag: '프로덕트 디자인',
    title: '접근성까지 신경 쓴 포트폴리오, 신입한테도 기대하시나요?',
    body: '최근 접근성이 중요하다는 이야기를 여러 번 들어서 찾아보고는 있는데, 색 대비나 스크린 리더 대응 같은 걸 실제로 프로젝트에 적용해본 적은 없어요. 시간에 쫓기다 보니 우선순위에서 계속 밀리는 부분이기도 하고요. 신입 지원자한테도 이런 접근성 고려 사례를 기대하시는지, 아니면 입사 후에 배워도 괜찮은 영역인지 궁금합니다.',
    image: null,
    views: 500,
    likes: 22,
    participants: 9,
  },
  {
    author: 'luvuuu',
    tag: 'UX 디자인',
    title: 'UX 리서치 경험이 없는데, 포트폴리오에 어떻게 녹여야 하나요?',
    body: '학교 프로젝트에서도 리서치보다 화면 작업 위주로 진행했는데, 리서치 역량을 어떻게 보여줘야 할지 고민이에요.',
    image: null,
    views: 688,
    likes: 19,
    participants: 8,
  },
  {
    author: 'Kiki',
    tag: '프로덕트 디자인',
    title: 'UX 리서치 경험이 없는데, 포트폴리오에 어떻게 녹여야 하나요?',
    body: '주어진 시간 안에 리서치, 디자인, 발표 자료까지 다 준비해야 해서 늘 시간이 부족해요. 단계별로 시간을 어떻게 나누는 게 좋을지 궁금합니다.',
    image: 'https://www.figma.com/api/mcp/asset/bf8a5b4b-bc24-4456-b46e-facc3795a174.png',
    views: 601,
    likes: 13,
    participants: 3,
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
    <div ref={rootRef} className="relative flex-1 min-w-0">
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

function QnaCard({ post, onOpenDetail }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  return (
    <div
      className={`flex flex-col gap-3 items-start justify-center p-5 rounded-2xl w-full ${
        post.hasDetail ? 'cursor-pointer' : ''
      }`}
      onClick={post.hasDetail ? () => onOpenDetail?.(post.articleId) : undefined}
      role={post.hasDetail ? 'button' : undefined}
    >
      <div className="flex gap-5 items-start w-full">
        <div className="flex-1 min-w-0 flex flex-col gap-4 items-start">
          <span className="bg-[#f4f6f8] px-2 py-1 rounded-lg text-[12px] font-medium leading-[1.35] tracking-[0.3px] text-[#747886]">
            {post.tag}
          </span>
          <div className="flex flex-col gap-2 items-start w-full">
            <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] w-full">{post.title}</p>
            <p className="text-[14px] leading-[1.58] tracking-[0.14px] text-[#121213]">{post.body}</p>
          </div>
        </div>
        {post.image && (
          <img alt="" src={post.image} className="shrink-0 w-[220px] h-[123px] object-cover rounded-2xl" />
        )}
      </div>
      <div className="flex gap-2 items-start w-full">
        <div className="flex-1 min-w-0 flex items-center gap-2 h-[22px] text-[14px] whitespace-nowrap">
          <span className="text-[#747886] tracking-[0.14px]">{post.author}</span>
          <span className="text-[#9ca2b1]">·</span>
          <span className="text-[#747886] tracking-[0.14px]">오늘</span>
          <span className="text-[#9ca2b1]">·</span>
          <span className="text-[#747886] tracking-[0.14px]">조회 {post.views.toLocaleString()}</span>
        </div>
        <div className="flex gap-5 items-start shrink-0">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLiked((v) => !v);
              setLikeCount((count) => (liked ? count - 1 : count + 1));
            }}
            className="flex items-center gap-1 cursor-pointer"
            aria-pressed={liked}
          >
            {liked ? (
              <span
                aria-hidden
                className="block size-5"
                style={{
                  WebkitMaskImage: `url("${imgLikeFill}")`,
                  maskImage: `url("${imgLikeFill}")`,
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  backgroundColor: '#DFE4E8',
                }}
              />
            ) : (
              <img alt="" src={imgLike} className="size-5" />
            )}
            <span className="text-[12px] tracking-[0.3px] text-[#747886]">{likeCount}</span>
          </button>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {AVATARS.map((src, index) => (
                <img
                  key={src}
                  alt=""
                  src={src}
                  className={`size-5 rounded-full object-cover border-2 border-white ${index < AVATARS.length - 1 ? '-mr-[7px]' : ''}`}
                />
              ))}
            </div>
            <span className="text-[12px] tracking-[0.3px] text-[#747886]">{post.participants}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BoardQnA({ onOpenDetail }) {
  const [sort, setSort] = useState('popular');
  const [latestPosts, setLatestPosts] = useState(() => shuffle(QNA_POSTS));
  const [expanded, setExpanded] = useState(false);

  const posts = useMemo(() => (sort === 'popular' ? QNA_POSTS : latestPosts), [sort, latestPosts]);
  const visiblePosts = expanded ? posts : posts.slice(0, 3);

  return (
    <div className="max-w-[867px] mx-auto py-16 flex flex-col gap-10">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213]">
          멘토들에게 궁금한 것을 물어보는 게시판이에요
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
                  if (option.key === 'latest') setLatestPosts(shuffle(QNA_POSTS));
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

      <div className="flex gap-10 items-center w-full">
        <JobDropdown />
        <button
          type="button"
          className="shrink-0 border border-[#70d2ff] bg-[#1a75ff] rounded-lg pl-4 pr-5 py-2 flex items-center gap-1 shadow-[inset_0_0_4px_0_#e7f3ff] cursor-pointer"
        >
          <img alt="" src={imgPencil} className="size-5" />
          <span className="font-bold text-[15px] leading-[1.45] text-white whitespace-nowrap">글쓰기</span>
        </button>
      </div>

      <div className="flex flex-col items-center w-full">
        {visiblePosts.map((post, index) => (
          <div key={`${post.author}-${post.title}-${index}`} className="w-full">
            <QnaCard post={post} onOpenDetail={onOpenDetail} />
            {index < visiblePosts.length - 1 && <div className="h-px bg-[#e7eaee] w-full" />}
          </div>
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
  );
}
