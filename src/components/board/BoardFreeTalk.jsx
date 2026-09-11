import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

const imgLike = 'https://www.figma.com/api/mcp/asset/456cdd73-2b36-4510-beb7-ac459c28583e.svg';
const imgLikeFill = 'https://www.figma.com/api/mcp/asset/f18f03a8-dbf0-4add-aa12-723afdd968d9.svg';
const imgComment = 'https://www.figma.com/api/mcp/asset/13581474-4f36-46b1-9063-f3cfc8970ec3.svg';
const imgChevronDown = 'https://www.figma.com/api/mcp/asset/800d0303-c40c-40a5-9c0a-cb6149f79de6.svg';
const imgPencil = 'https://www.figma.com/api/mcp/asset/3fab267a-3f49-4c73-b247-11cff7f62c3f.svg';

const JOB_GROUPS = ['개발', '경영・비즈니스', '마케팅・광고', '디자인', '게임 제작', '미디어'];
const JOB_ROLES = ['그래픽 디자인', '게임 디자인', '프로덕트 디자인', 'UX 디자인', '제품 디자인', '영상・모션 디자인'];

const FREE_POSTS = [
  {
    author: 'Gangster',
    category: '프로덕트 디자인 외 1개',
    avatar: 'https://www.figma.com/api/mcp/asset/1c30df87-166c-4504-9d79-fdc847db4580.png',
    title: '드디어 1차 서류 통과했어ㅠ',
    body: '서류 통과는 취준하면서 처음인데 여기서 포폴이랑 자소서 피드백 받았었거든? 확실히 도움이 된듯..\n아직 면접 남았지만, 잠시만 이 행복을 즐기려고~ 다들 기 받아가!!',
    images: ['https://www.figma.com/api/mcp/asset/92b7d4f4-ca13-4e94-8eb4-2852eed4914a.png'],
    likes: 102,
    comments: 12,
    hasDetail: true,
    articleId: 'gangster',
  },
  {
    author: 'Kiki',
    category: 'UX 디자인 외 2개',
    avatar: 'https://www.figma.com/api/mcp/asset/2ea9a27f-5291-434e-b6b2-6efba4b60d83.png',
    title: 'UX 리서치 스터디 같이 하실 분 구해요(주1회, 온라인)',
    body: '매주 토요일 오전에 온라인으로 모여서 케이스 스터디 발표하고 서로 피드백 주고받는 스터디 구합니다.\n성실하게 임하지 않는 사람은 신청하지 않았으면 합니다.. 정말 진심으로 열시히 스터디 참여할 사람만 댓글 달아주세요!',
    images: ['https://www.figma.com/api/mcp/asset/7b7f5ec8-080d-4da2-9a4e-ca50dce927a3.png'],
    likes: 32,
    comments: 8,
  },
  {
    author: 'AIONUE',
    category: '프로덕트 디자인 외 1개',
    avatar: 'https://www.figma.com/api/mcp/asset/ae0254da-7dbe-4fba-a40f-5de9d3411a7d.png',
    title: '포트폴리오 30번은 갈아엎은 것 같아요,,ㅎ 이게 맞나 싶네요',
    body: '계속 리서치부터 다시 정리하고, 스토리라인 바꾸고, 또 갈아엎고... 벌써 몇 번째인지 모르겠어요. 다른 분들도 포폴 완성까지 이 정도로 오래 걸리셨나요? 저만 유독 느린 건가 싶어서 조금 지치네요...ㅜㅜ',
    images: [],
    likes: 28,
    comments: 21,
  },
  {
    author: 'Coco',
    category: 'UX 디자인',
    avatar: 'https://www.figma.com/api/mcp/asset/6367f8b8-e22f-4a6b-bb56-b837f2db16c8.png',
    title: '취준 N개월차, 다들 하루 루틴 어떻게 잡으세요?',
    body: '회사를 안 다니니까 하루가 뭉개지는 느낌이에요. 포폴 작업한다고 앉아있는데 집중은 안 되고 시간만 가고...\n다들 어떻게 하루를 계획하시는지 궁금해요.',
    images: [],
    likes: 28,
    comments: 21,
  },
  {
    author: 'Happy',
    category: 'UX 디자인 외 2개',
    avatar: 'https://www.figma.com/api/mcp/asset/40e4efca-bd57-4c0f-94fc-d6e900361d34.png',
    title: '비핸스에 포폴 올렸는데 보고 피드백 줄 사람?!',
    body: '드디어 포폴 1차 완성해서 비핸스에 올렸어요! 근데 계속 혼자 보다 보니까 뭐가 문제인지도 모르겠고 감이 없어지더라고요.. 편하게 훑어보고 솔직한 의견 주실 분 계시면 댓글 남겨주세요. 저도 다른 분들 포폴 봐드릴게요!',
    images: [
      'https://www.figma.com/api/mcp/asset/4ca3a1c1-b478-4b2f-82a4-906fb08aa942.png',
      'https://www.figma.com/api/mcp/asset/2422592b-dc90-4757-a47c-729af233e3f3.png',
      'https://www.figma.com/api/mcp/asset/eb30e4b4-fadd-47b1-8bfa-2b0efb88a62d.png',
      'https://www.figma.com/api/mcp/asset/09c05f5c-4273-4198-a4ed-e9f4c000e9a2.png',
      'https://www.figma.com/api/mcp/asset/d065ab99-5a90-4b4a-8be3-db8b22c1efc9.png',
    ],
    likes: 32,
    comments: 8,
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

function CheckRow({ label, checked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative overflow-hidden flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl bg-white cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:transition-opacity"
    >
      <span className="font-normal text-[14px] leading-[1.58] tracking-[0.14px] text-[#121213]">{label}</span>
      <span
        className={`size-[18px] rounded-[5px] border-[1.5px] border-[#e7eaee] shrink-0 ${checked ? 'bg-[#1a75ff] border-[#1a75ff]' : 'bg-white'}`}
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

function FreeTalkPost({ post, onOpenDetail }) {
  const hasGallery = post.images.length > 1;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  return (
    <article
      className={`py-5 flex flex-col gap-4 ${post.hasDetail ? 'cursor-pointer' : ''}`}
      onClick={post.hasDetail ? () => onOpenDetail?.(post.articleId) : undefined}
      role={post.hasDetail ? 'button' : undefined}
    >
      <div className="flex gap-3 items-start">
        <img alt="" src={post.avatar} className="size-[42px] rounded-full object-cover shrink-0" />
        <div className="flex flex-col items-start">
          <p className="font-medium text-[16px] leading-[1.45] text-[#121213]">{post.author}</p>
          <p className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886]">{post.category}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">{post.title}</p>
        <p className="font-normal text-[15px] leading-[1.6] text-[#121213] whitespace-pre-wrap">{post.body}</p>
      </div>
      {hasGallery ? (
        <div className="flex gap-2 w-full">
          <img alt="" src={post.images[0]} className="w-1/2 aspect-square object-cover rounded-2xl" />
          <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-2">
            {post.images.slice(1, 5).map((src, index) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-2xl">
                <img alt="" src={src} className="absolute inset-0 h-full w-full object-cover" />
                {index === 3 && (
                  <div className="absolute inset-0 bg-[rgba(18,18,19,0.4)] flex items-center justify-center">
                    <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-white">+20</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        post.images[0] && (
          <img alt="" src={post.images[0]} className="w-full aspect-[246/138] object-cover rounded-2xl" />
        )
      )}
      <div className="flex items-center gap-5">
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
          <img alt="" src={imgComment} className="size-5" />
          <span className="text-[12px] tracking-[0.3px] text-[#747886]">{post.comments}</span>
        </div>
      </div>
    </article>
  );
}

export default function BoardFreeTalk({ onOpenDetail, onOpenWrite }) {
  const [sort, setSort] = useState('popular');
  const [latestPosts, setLatestPosts] = useState(() => shuffle(FREE_POSTS));

  const posts = useMemo(() => (sort === 'latest' ? latestPosts : FREE_POSTS), [sort, latestPosts]);

  return (
    <div className="max-w-[867px] mx-auto py-16 flex flex-col gap-10">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213]">
          멘티들만의 자유로운 공간이에요
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
                  if (option.key === 'latest') setLatestPosts(shuffle(FREE_POSTS));
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
          onClick={() => onOpenWrite?.('freetalk')}
          className="shrink-0 border border-[#70d2ff] bg-[#1a75ff] rounded-lg pl-4 pr-5 py-2 flex items-center gap-1 shadow-[inset_0_0_4px_0_#e7f3ff] cursor-pointer"
        >
          <img alt="" src={imgPencil} className="size-5" />
          <span className="font-bold text-[15px] leading-[1.45] text-white whitespace-nowrap">글쓰기</span>
        </button>
      </div>

      <div className="flex flex-col w-full gap-5">
        {posts.map((post, index) => (
          <Fragment key={post.title}>
            <FreeTalkPost post={post} onOpenDetail={onOpenDetail} />
            {index < posts.length - 1 && <div className="h-px bg-[#e7eaee] w-full" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
