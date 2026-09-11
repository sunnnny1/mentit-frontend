import { useEffect, useRef, useState } from 'react';
import BoardSubMenu from './BoardSubMenu';
import BoardCareerTalk from './BoardCareerTalk';
import BoardQnA from './BoardQnA';

const imgChevronRight = 'https://www.figma.com/api/mcp/asset/a7492a83-b25e-4d60-be05-b7c4b627db4a.svg';
const imgBookmark = 'https://www.figma.com/api/mcp/asset/4ac74a74-c74e-4012-9e9d-4270d3c5690e.svg';
const imgBookmarkFill = 'https://www.figma.com/api/mcp/asset/b20bcd72-0b9e-4707-8bd9-b80aa3f1fae3.svg';
const imgLike = 'https://www.figma.com/api/mcp/asset/d82be445-be8d-44cb-bce0-d3f6a3b977c2.svg';
const imgLikeFill = 'https://www.figma.com/api/mcp/asset/f18f03a8-dbf0-4add-aa12-723afdd968d9.svg';
const imgComment = 'https://www.figma.com/api/mcp/asset/a7002a5b-eba5-4e8e-9759-748d8f41bbb7.svg';

const ACTIVE_MENTORS = [
  {
    name: 'U.ha',
    src: 'https://www.figma.com/api/mcp/asset/82f8645a-bff2-40bb-b2ce-b4adeff510e0.png',
    crop: { top: '-4.69%', left: '-1.28%', width: '170.94%', height: '136.83%' },
  },
  {
    // 홈 화면(MentorRecommendations.jsx)에서 이미 쓰고 있는 것과 동일한 이미지 재사용
    name: 'Yoonie',
    src: 'https://www.figma.com/api/mcp/asset/38da743c-39e9-4b29-92e2-178f15ebcd3d.png',
  },
  {
    name: 'Eric',
    src: 'https://www.figma.com/api/mcp/asset/a0d39193-fabc-410b-8ee7-5cd5300c34bf.png',
    crop: { top: '-1.18%', left: '-2.04%', width: '182%', height: '145.69%' },
  },
  {
    name: 'Daisy',
    src: 'https://www.figma.com/api/mcp/asset/4e59b148-9a7e-4e39-be3e-0cf935da5817.png',
    crop: { top: '-5.94%', left: '-0.02%', width: '171.11%', height: '136.97%' },
  },
  {
    // 홈 화면(MentorRecommendations.jsx)에서 이미 쓰고 있는 것과 동일한 이미지 재사용
    name: 'Eunoia',
    src: 'https://www.figma.com/api/mcp/asset/92b621eb-70dd-4c6d-a935-09067d86f639.png',
  },
  {
    // 홈 화면(MentorRecommendations.jsx)에서 이미 쓰고 있는 것과 동일한 이미지 재사용
    name: 'Teddy',
    src: 'https://www.figma.com/api/mcp/asset/349f7306-9c3b-45ee-b42e-10569d6479a8.png',
  },
  {
    name: 'Sunny',
    src: 'https://www.figma.com/api/mcp/asset/f523aa62-cb7a-4452-92f8-9126d2a5de89.png',
    crop: { top: '-5.92%', left: '-1.73%', width: '175.37%', height: '140.34%' },
  },
];

const QUOTE_AVATARS = [
  'https://www.figma.com/api/mcp/asset/a607593a-ef5c-40ce-8e47-def8d1ef1747.png',
  'https://www.figma.com/api/mcp/asset/9cd95563-ed6c-4d3d-89b3-045d6c31fac2.png',
  'https://www.figma.com/api/mcp/asset/a8e8d68f-de7f-4256-af8a-419b9a7ead34.png',
];

const POPULAR_QNA = [
  { title: '포트폴리오에 실패한 프로젝트도 넣어도 될까요?', author: '000Sun', date: '오늘', views: '조회 1,200', hasDetail: true, articleId: 'failed' },
  { title: '정성적, 정량적 데이터를 어떻게 포폴에 녹여야 할까요?', author: 'Coco', date: '오늘', views: '조회 800', hasDetail: true, articleId: 'qualquant' },
  { title: '협업 경험 없는 포폴 어떻게 보완해야하나요?', author: 'Gangster', date: '오늘', views: '조회 687' },
];

const CAREER_TALKS = [
  {
    title: 'AI 시대의 프로덕트 디자인 활용 팁',
    mentor: 'Yoonie 멘토',
    role: '프로덕트 디자이너',
    thumbnail: 'https://www.figma.com/api/mcp/asset/1b743c22-63bf-4fed-a834-3cd5ad99e76a.png',
    hasDetail: true,
    articleId: 'yoonie',
  },
  {
    title: '에이전틱 AI 제품 만들 때 참고할 점',
    mentor: 'U.ha 멘토',
    role: '프로덕트 디자이너',
    thumbnail: 'https://www.figma.com/api/mcp/asset/0446e01f-6d28-4cf1-9a60-2de08c22b3da.png',
    hasDetail: true,
    articleId: 'uha',
  },
];

const FREE_POSTS = [
  {
    author: 'Gangster',
    category: '프로덕트 디자인 외 1',
    avatar: 'https://www.figma.com/api/mcp/asset/f7e3c16b-976c-4fb1-b4a1-480ad2324ba4.png',
    title: '드디어 1차 서류 통과했어ㅠ',
    body: '서류 통과는 취준하면서 처음인데 여기서 포폴이랑 자소서 피드백 받았었거든? 확실히 도움이 된듯..\n아직 면접 남았지만, 잠시만 이 행복을 즐기려고~ 다들 기 받아가!!',
    images: ['https://www.figma.com/api/mcp/asset/eab8745c-25ce-4b5a-8eb7-39c1e63f92c0.png'],
    likes: 102,
    comments: 12,
  },
  {
    author: 'Happy',
    category: 'UX 디자인 외 2개',
    avatar: 'https://www.figma.com/api/mcp/asset/9a11811f-f3d2-4e28-bb43-b18c4ca28c09.png',
    title: '비핸스에 포폴 올렸는데 보고 피드백 줄 사람?!',
    body: '드디어 포폴 1차 완성해서 비핸스에 올렸어요! 근데 계속 혼자 보다 보니까 뭐가 문제인지도 모르겠고 감이 없어지더라고요.. 편하게 훑어보고 솔직한 의견 주실 분 계시면 댓글 남겨주세요. 저도 다른 분들 포폴 봐드릴게요!',
    images: [
      'https://www.figma.com/api/mcp/asset/351bbd39-3bb3-44f5-b47c-4e99a9d7fd96.png',
      'https://www.figma.com/api/mcp/asset/3999f190-a737-47ed-9b38-92d0c376561c.png',
      'https://www.figma.com/api/mcp/asset/dc687cae-ed7c-41e1-882c-5a570399efd6.png',
      'https://www.figma.com/api/mcp/asset/4f65498c-145b-472c-84de-7a8289dbdc6b.png',
      'https://www.figma.com/api/mcp/asset/89422302-a889-4f8f-9d44-425ee5f51551.png',
    ],
    likes: 32,
    comments: 8,
  },
];

function SectionHeading({ title, onViewAll }) {
  return (
    <div className="flex items-center gap-[18px] w-full">
      <h2 className="flex-1 font-bold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213]">{title}</h2>
      <button
        type="button"
        onClick={onViewAll}
        className="flex items-center gap-0.5 font-medium text-[14px] text-[#9ca2b1] tracking-[0.14px] cursor-pointer"
      >
        <span>전체보기</span>
        <img alt="" src={imgChevronRight} className="size-6" />
      </button>
    </div>
  );
}

function QuoteCard({ post, onOpenDetail }) {
  return (
    <div
      className={`flex-1 min-w-0 border border-[#e7eaee] rounded-2xl p-5 flex flex-col gap-5 ${
        post.hasDetail ? 'cursor-pointer' : ''
      }`}
      onClick={post.hasDetail ? () => onOpenDetail?.(post.articleId) : undefined}
      role={post.hasDetail ? 'button' : undefined}
    >
      <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">{post.title}</p>
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 min-w-0 flex items-center text-[14px] text-[#747886] tracking-[0.14px] whitespace-nowrap">
          <span>{post.author}</span>
          <span className="text-[#9ca2b1] px-2">·</span>
          <span>{post.date}</span>
          <span className="text-[#9ca2b1] px-2">·</span>
          <span>{post.views}</span>
        </div>
        <div className="flex items-center shrink-0">
          {QUOTE_AVATARS.map((src, index) => (
            <img
              key={src}
              alt=""
              src={src}
              className={`size-5 rounded-full object-cover border-2 border-white ${index < QUOTE_AVATARS.length - 1 ? '-mr-[7px]' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CareerTalkCard({ talk, onOpenDetail }) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div
      className={`relative flex-1 min-w-0 aspect-[423/282] rounded-2xl overflow-hidden ${talk.hasDetail ? 'cursor-pointer' : ''}`}
      onClick={talk.hasDetail ? () => onOpenDetail?.(talk.articleId) : undefined}
      role={talk.hasDetail ? 'button' : undefined}
    >
      <img alt="" src={talk.thumbnail} className="absolute inset-0 h-full w-full object-cover rounded-2xl" />
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

function FreeTalkPost({ post }) {
  const hasGallery = post.images.length > 1;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  return (
    <article className="py-5 flex flex-col gap-4">
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
          onClick={() => {
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

export default function BoardPage({
  isSubMenuOpen = true,
  onCloseSubMenu,
  category = 'all',
  onCategoryChange,
  onNavigateToCareerTalk,
  onOpenCareerTalkDetail,
  onOpenQnaDetail,
}) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [category]);

  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && (
        <BoardSubMenu onClose={onCloseSubMenu} activeCategory={category} onCategoryChange={onCategoryChange} />
      )}
      <section ref={scrollRef} className="flex-1 min-w-0 min-h-0 rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-y-auto">
        {category === 'careertalk' ? (
          <BoardCareerTalk onOpenDetail={onOpenCareerTalkDetail} />
        ) : category === 'qna' ? (
          <BoardQnA onOpenDetail={onOpenQnaDetail} />
        ) : (
        <div className="max-w-[867px] mx-auto py-16 flex flex-col gap-16">
          <section className="flex flex-col gap-6 items-start w-full">
            <h2 className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213]">이번주 활동량 높은 멘토</h2>
            <div className="flex gap-8 items-start overflow-x-auto w-full">
              {ACTIVE_MENTORS.map((mentor) => (
                <div key={mentor.name} className="flex flex-col gap-1 items-center shrink-0">
                  {mentor.crop ? (
                    <div className="size-16 rounded-full overflow-hidden relative bg-white shrink-0">
                      <img
                        alt=""
                        src={mentor.src}
                        className="absolute max-w-none pointer-events-none"
                        style={{
                          top: mentor.crop.top,
                          left: mentor.crop.left,
                          width: mentor.crop.width,
                          height: mentor.crop.height,
                        }}
                      />
                    </div>
                  ) : (
                    <img alt="" src={mentor.src} className="size-16 rounded-full object-cover" />
                  )}
                  <p className="font-normal text-[14px] tracking-[0.14px] text-[#121213] whitespace-nowrap">{mentor.name}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-6 items-start w-full">
            <SectionHeading title="프로덕트 디자인 관련 인기 Q&A" onViewAll={() => onCategoryChange?.('qna')} />
            <div className="flex gap-4 items-start w-full">
              {POPULAR_QNA.map((post) => (
                <QuoteCard key={post.title} post={post} onOpenDetail={onOpenQnaDetail} />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-6 items-start w-full">
            <SectionHeading title="멘토들의 커리어 토크" onViewAll={onNavigateToCareerTalk} />
            <div className="flex gap-5 items-stretch w-full">
              {CAREER_TALKS.map((talk) => (
                <CareerTalkCard key={talk.title} talk={talk} onOpenDetail={onOpenCareerTalkDetail} />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-5 items-start w-full">
            <SectionHeading title="멘티들의 자유로운 토크" />
            <div className="flex flex-col w-full">
              {FREE_POSTS.map((post, index) => (
                <div key={post.title}>
                  <FreeTalkPost post={post} />
                  {index < FREE_POSTS.length - 1 && <div className="h-px bg-[#e7eaee] w-full" />}
                </div>
              ))}
            </div>
          </section>
        </div>
        )}
      </section>
    </div>
  );
}
