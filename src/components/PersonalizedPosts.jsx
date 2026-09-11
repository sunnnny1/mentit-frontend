import { useState } from 'react';

const imgImageVideo = "https://www.figma.com/api/mcp/asset/e82bd9e8-08d4-4798-b06f-ce816dc0dd6c.png";
const imgImageVideo1 = "https://www.figma.com/api/mcp/asset/0627f450-3efc-453b-96ee-04fa5dd74cd0.png";
const imgLike = "https://www.figma.com/api/mcp/asset/456cdd73-2b36-4510-beb7-ac459c28583e.svg";
const imgLikeFill = 'https://www.figma.com/api/mcp/asset/f18f03a8-dbf0-4add-aa12-723afdd968d9.svg';
const imgComment = "https://www.figma.com/api/mcp/asset/13581474-4f36-46b1-9063-f3cfc8970ec3.svg";
const imgChevronRight = "https://www.figma.com/api/mcp/asset/b6c75f15-29da-4258-98b0-26b9a2b2dd15.svg";

const TAG_STYLES = {
  primary: 'text-[#1a75ff] bg-[#1a75ff]/10',
  neutral: 'text-[#747886] bg-[#f4f6f8]',
};

const POSTS = [
  {
    tags: [{ label: 'Q&A', kind: 'primary' }, { label: '프로덕트 디자인', kind: 'neutral' }],
    title: '정성적, 정량적 데이터를 어떻게 포폴에 녹여야 할까요?',
    body: '안녕하세요. 프로덕트 디자인 직무에서 일하고 싶은 디자이너 취준생입니다. 현재 포폴을 만들고 있는데 가장 어려운 부분이 정성적, 정량적 데이터를 어떻게 넣어야하는지 입니다. 현직에 계신 멘토분들의 조언 부탁드립니다!',
    author: 'Coco',
    views: '조회 800',
    likes: 86,
    rightMeta: { type: 'profiles', count: 47 },
    hasDetail: true,
    articleId: 'qualquant',
    mentors: [
      {
        name: 'U.ha',
        src: 'https://www.figma.com/api/mcp/asset/82f8645a-bff2-40bb-b2ce-b4adeff510e0.png',
        crop: { top: '-4.69%', left: '-1.28%', width: '170.94%', height: '136.83%' },
      },
      { name: 'Peter', src: 'https://www.figma.com/api/mcp/asset/238a7985-f398-4c1b-8060-3d42ae43ec7b.png' },
      { name: 'Emma', src: 'https://www.figma.com/api/mcp/asset/600e8ec2-767a-4acf-96bf-ca759446cdf4.png' },
    ],
  },
  {
    tags: [{ label: 'Q&A', kind: 'primary' }, { label: '프로덕트 디자인', kind: 'neutral' }],
    title: '포트폴리오에 실패한 프로젝트도 넣어도 될까요?',
    body: '실패한 프로젝트를 잘 풀어낼지, 아니면 과감하게 빼고 성공한 프로젝트만 넣어서 구성할지 고민입니다. 넣으면 오히려 감점 요소가 될까요? 너무 고민이에요.',
    author: '000sun',
    views: '조회 1,200',
    likes: 60,
    image: imgImageVideo,
    rightMeta: { type: 'profiles', count: 32 },
    hasDetail: true,
    articleId: 'failed',
    mentors: [
      { name: 'Yoonie', src: 'https://www.figma.com/api/mcp/asset/38da743c-39e9-4b29-92e2-178f15ebcd3d.png' },
      {
        name: 'Daisy',
        src: 'https://www.figma.com/api/mcp/asset/4e59b148-9a7e-4e39-be3e-0cf935da5817.png',
        crop: { top: '-5.94%', left: '-0.02%', width: '171.11%', height: '136.97%' },
      },
      { name: 'Eunoia', src: 'https://www.figma.com/api/mcp/asset/92b621eb-70dd-4c6d-a935-09067d86f639.png' },
    ],
  },
  {
    tags: [{ label: '프리토크', kind: 'primary' }, { label: '프로덕트 디자인', kind: 'neutral' }],
    title: '드디어 1차 서류 통과했어ㅠ',
    body: '서류 통과는 취준하면서 처음인데 여기서 포폴이랑 자소서 피드백 받았었거든? 확실히 도움이 된듯.. 아직 면접 남았지만, 잠시만 이 행복을 즐기려고~ 다들 기 받아가!! 참 나는 Yoonie 멘토한테 포폴이랑 자소서 피드백 받았어!! 모의면접도 여기서 볼 수 있길래 면접도 준비하면서 최종 합격만 노린다...',
    author: 'Gangster',
    views: '조회 1,123',
    likes: 102,
    image: imgImageVideo1,
    rightMeta: { type: 'comments', count: 12 },
    hasDetail: true,
    articleId: 'gangster',
  },
];


function PostCard({ post, onOpenDetail }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  return (
    <div
      className={`flex flex-col gap-3 items-start justify-center p-5 rounded-2xl w-full bg-white shadow-[0_0_8px_rgba(18,18,19,0.04)] ${
        post.hasDetail ? 'cursor-pointer' : ''
      }`}
      onClick={post.hasDetail ? () => onOpenDetail?.(post.articleId) : undefined}
      role={post.hasDetail ? 'button' : undefined}
    >
      <div className="flex gap-5 items-start w-full">
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex gap-1 items-center">
            {post.tags.map((tag) => (
              <span key={tag.label} className={`flex items-center justify-center px-2 py-1 rounded-lg text-xs font-medium tracking-[0.3px] whitespace-nowrap ${TAG_STYLES[tag.kind]}`}>
                {tag.label}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="font-bold text-lg leading-[1.5] tracking-[-0.0036px] text-[#121213]">{post.title}</p>
            <p className="text-sm leading-[1.58] tracking-[0.14px] text-[#121213] line-clamp-2">{post.body}</p>
          </div>
        </div>
        {post.image && (
          <img src={post.image} alt="" className="h-[123px] w-[220px] rounded-lg object-cover shrink-0" />
        )}
      </div>
      <div className="flex gap-2 items-center w-full text-sm text-[#747886] tracking-[0.14px]">
        <div className="flex-1 flex gap-2 items-center whitespace-nowrap">
          <span>{post.author}</span>
          <span className="text-[#9ca2b1]">・</span>
          <span>오늘</span>
          <span className="text-[#9ca2b1]">・</span>
          <span>{post.views}</span>
        </div>
        <div className="flex gap-5 items-center shrink-0">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLiked((v) => !v);
              setLikeCount((count) => (liked ? count - 1 : count + 1));
            }}
            className="flex gap-1 items-center cursor-pointer"
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
            <span className="text-xs font-medium tracking-[0.3px]">{likeCount}</span>
          </button>
          {post.rightMeta.type === 'profiles' ? (
            <div className="flex gap-1 items-center">
              <div className="flex items-center">
                {(post.mentors ?? []).map((mentor, i) => (
                  <div
                    key={mentor.name}
                    className={`relative size-5 rounded-full overflow-hidden border border-white bg-white shrink-0 ${i > 0 ? '-ml-1.5' : ''}`}
                  >
                    {mentor.crop ? (
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
                    ) : (
                      <img alt="" src={mentor.src} className="absolute inset-0 size-full object-cover" />
                    )}
                  </div>
                ))}
              </div>
              <span className="text-xs font-medium tracking-[0.3px]">{post.rightMeta.count}</span>
            </div>
          ) : (
            <div className="flex gap-1 items-center">
              <img alt="" src={imgComment} className="size-5" />
              <span className="text-xs tracking-[0.3px]">{post.rightMeta.count}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PersonalizedPosts({ onOpenQnaDetail, onOpenFreeTalkDetail }) {
  return (
    <section className="flex flex-col gap-6 items-start w-full pb-10">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-bold text-[22px] tracking-[-0.33px] text-[#121213]">맞춤 게시글</h2>
        <button type="button" className="flex gap-0.5 items-center font-medium text-sm text-[#9ca2b1] tracking-[0.14px] cursor-pointer">
          <span>전체보기</span>
          <img alt="" src={imgChevronRight} className="size-6" />
        </button>
      </div>
      <div className="flex flex-col gap-5 items-center w-full">
        {POSTS.map((post) => (
          <PostCard
            key={post.title}
            post={post}
            onOpenDetail={post.articleId === 'gangster' ? onOpenFreeTalkDetail : onOpenQnaDetail}
          />
        ))}
      </div>
    </section>
  );
}
