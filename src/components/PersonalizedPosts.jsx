const imgImageVideo = "https://www.figma.com/api/mcp/asset/e82bd9e8-08d4-4798-b06f-ce816dc0dd6c.png";
const imgImageVideo1 = "https://www.figma.com/api/mcp/asset/0627f450-3efc-453b-96ee-04fa5dd74cd0.png";
const imgEllipse25 = "https://www.figma.com/api/mcp/asset/95a15191-36f1-4923-9783-3462991e5088.png";
const imgEllipse26 = "https://www.figma.com/api/mcp/asset/cf47df2f-bf88-4c33-b6f9-eeae2da1b5af.png";
const imgEllipse27 = "https://www.figma.com/api/mcp/asset/968f4175-467a-4e89-9a7d-80848790f180.png";
const imgLike = "https://www.figma.com/api/mcp/asset/456cdd73-2b36-4510-beb7-ac459c28583e.svg";
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
  },
];

const AVATARS = [imgEllipse26, imgEllipse27, imgEllipse25];

function PostCard({ post }) {
  return (
    <div className="flex flex-col gap-3 items-start justify-center p-5 rounded-2xl w-full bg-white shadow-[0_0_8px_rgba(18,18,19,0.04)]">
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
          <div className="flex gap-1 items-center">
            <img alt="" src={imgLike} className="size-5" />
            <span className="text-xs font-medium tracking-[0.3px]">{post.likes}</span>
          </div>
          {post.rightMeta.type === 'profiles' ? (
            <div className="flex gap-1 items-center">
              <div className="flex items-center">
                {AVATARS.map((src, i) => (
                  <img key={src} src={src} alt="" className={`size-5 rounded-full border border-white ${i > 0 ? '-ml-1.5' : ''}`} />
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

export default function PersonalizedPosts() {
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
          <PostCard key={post.title} post={post} />
        ))}
      </div>
    </section>
  );
}
