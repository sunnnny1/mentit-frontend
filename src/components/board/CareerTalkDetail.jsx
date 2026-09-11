import { useState } from 'react';

const imgAuthor = 'https://www.figma.com/api/mcp/asset/c0901e52-de24-4d64-9c05-4e48c5440ecc.png';
const imgHero = 'https://www.figma.com/api/mcp/asset/78785f76-4d8e-442f-97b3-23290681f675.png';
const imgGalleryA1 = 'https://www.figma.com/api/mcp/asset/f9ed70ea-f840-4f0a-81b3-0908033f3ffe.png';
const imgGalleryA2 = 'https://www.figma.com/api/mcp/asset/96f8fdaa-7fc0-4da1-882b-19fa0295e593.png';
const imgGalleryB1 = 'https://www.figma.com/api/mcp/asset/71c981da-3d20-44d3-9150-480efcdf0fd0.png';
const imgGalleryB2 = 'https://www.figma.com/api/mcp/asset/61d8e3ea-6af2-4cb7-ac22-744103f36096.png';
const imgLike = 'https://www.figma.com/api/mcp/asset/76bc3acd-6bf0-40a9-93be-eb8f1b0df6c8.svg';
const imgLikeFill = 'https://www.figma.com/api/mcp/asset/f18f03a8-dbf0-4add-aa12-723afdd968d9.svg';
const imgBookmarkIcon = 'https://www.figma.com/api/mcp/asset/235a7d1e-f793-4443-8408-af972d7e6de4.svg';
const imgBookmarkFill = 'https://www.figma.com/api/mcp/asset/b20bcd72-0b9e-4707-8bd9-b80aa3f1fae3.svg';
const imgShare = 'https://www.figma.com/api/mcp/asset/df0b1844-a3c6-42cb-a30f-fb7816118fcd.svg';
const imgYunn00 = 'https://www.figma.com/api/mcp/asset/4c967de1-d376-423c-9acd-a3b320cf6b0a.png';
const imgGangster = 'https://www.figma.com/api/mcp/asset/d54b4a22-6c3b-430c-8d46-49125c613340.png';
const imgAionue = 'https://www.figma.com/api/mcp/asset/557944c2-92e4-406f-acd0-a37db77fc91b.png';
const imgCoco = 'https://www.figma.com/api/mcp/asset/c7e52710-ca86-4094-906d-8474e2528a2f.png';

const TAGS = ['#프로덕트디자인', '#AI_Agent', '#해외'];

const PRINCIPLES = [
  {
    title: '근거를 보여줄 것',
    body: '사용자는 결과가 맞는지 스스로 판단할 수 없는 경우가 많아요. Agentforce에서도 에이전트가 CRM 데이터를 요약할 때, 그냥 요약문만 던지지 않고 "이 인사이트는 고객 티켓 3건 근거"처럼 출처를 같이 보여줘요. 이것만으로도 검증 부담이 줄고 신뢰가 올라가더라고요.',
  },
  {
    title: '애매하면 사람에게 넘길 것',
    body: 'AI가 모든 걸 끝까지 처리하려고 하면, 확신 없는 답도 자신 있게 내놓게 되고 한 번이라도 틀리면 그 뒤로는 모든 답을 의심받아요. 저희 팀에서는 금액이나 계약 조건처럼 되돌릴 수 없는 값은 꼭 사람 확인을 거치도록 설계 원칙을 정해뒀어요.',
  },
  {
    title: '개입할 수 있는 문을 열어둘 것',
    body: '사용자가 언제든 "이건 내가 직접 할게"라고 끼어들 수 있어야, 애초에 일을 맡기는 것 자체에 대한 심리적 부담이 줄어요. 자동화 흐름 중간에 일시정지 버튼을 항상 노출하는 게 저희 팀의 기본 원칙 중 하나예요.',
  },
];

const INITIAL_COMMENTS = [
  {
    author: 'Ganster',
    avatar: imgGangster,
    text: '꿀팁 공유 정말 감사합니다!! 참고해서 포트폴리오와 자소서에 적용해봐야겠네요!',
  },
  {
    author: 'AIONUE',
    avatar: imgAionue,
    text: '완전 공감돼요. 저도 여기서 AI 에이전트한테 질문했다가 애매한 건 억지로 답 안 하고 바로 멘토님한테 연결해줘서 오히려 더 믿음이 갔던 기억이 나요. 그게 이런 원칙 때문이었군요!!',
  },
  {
    author: 'Coco',
    avatar: imgCoco,
    text: '해외 사례도 알 수 있어서 너무 유익한 것 같아요! 공유 감사합니다!',
  },
];

function ImagePair({ sources }) {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      {sources.map((src) => (
        <img key={src} alt="" src={src} className="w-full aspect-square object-cover rounded-2xl" />
      ))}
    </div>
  );
}

function CommentCard({ comment }) {
  return (
    <article className="bg-[#f9fafb] rounded-2xl p-4 flex flex-col gap-3 w-full">
      <div className="flex items-center gap-2">
        <img alt="" src={comment.avatar} className="size-8 rounded-full object-cover shrink-0" />
        <p className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#121213]">{comment.author}</p>
      </div>
      <p className="font-normal text-[15px] leading-[1.6] text-[#121213]">{comment.text}</p>
    </article>
  );
}

export default function CareerTalkDetail() {
  const [draft, setDraft] = useState('');
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const submitComment = () => {
    const text = draft.trim();
    if (!text) return;
    setComments((prev) => [{ author: 'Yunn00', avatar: imgYunn00, text }, ...prev]);
    setDraft('');
  };

  return (
    <section className="flex-1 min-w-0 min-h-0 rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-y-auto">
      <div className="max-w-[819px] mx-auto py-16 px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-[25px] leading-[1.4] tracking-[-0.5px] text-[#121213]">
              에이전틱 AI 제품을 만들 때 참고할 점
            </h1>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#f4f6f8] px-2 py-1 rounded-lg text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#747886]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 w-full">
            <img alt="" src={imgAuthor} className="size-[42px] rounded-full object-cover shrink-0" />
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">U.ha 멘토</p>
                <div className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
                  <div className="absolute inset-0 bg-[#9054ff] opacity-10 rounded-lg" />
                  <p className="relative text-[10px] tracking-[0.25px] text-[#9054ff] whitespace-nowrap">Active Mentor</p>
                </div>
              </div>
              <p className="text-[14px] tracking-[0.14px] text-[#747886]">프로덕트 디자이너・세일즈포스・2년차</p>
            </div>
            <p className="shrink-0 text-[14px] tracking-[0.14px] text-[#747886] whitespace-nowrap">2026년 08월 14일</p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <img alt="" src={imgHero} className="w-full aspect-[779/437] object-cover rounded-2xl" />
          <p className="font-normal text-[15px] leading-[1.6] text-[#121213]">
            세일즈포스에서 Agentforce 같은 에이전틱 AI 제품을 디자인하면서 계속 느끼는 게 있어요. 샌프란시스코 팀들도 크게
            다르지 않더라고요. 새 기능을 논의할 때 다들 &quot;에이전트가 이 작업을 완벽하게 해냈을 때&quot; 화면만 그려요.
            데모에서도 항상 성공 케이스만 보여주고요. 근데 실제로 사용자가 이 제품을 계속 쓸지 말지는 그 순간이 아니라,
            에이전트가 애매하거나 틀렸을 때 결정되더라고요. 저희 팀에서 계속 붙잡고 있는 원칙 세 가지를 정리해봤어요.
          </p>
          <ImagePair sources={[imgGalleryA1, imgGalleryA2]} />
          <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">
            요즘 제가 계속 붙잡고 있는 원칙 세 가지를 정리해봤어요.
          </p>
          <ol className="list-decimal pl-5 flex flex-col gap-5">
            {PRINCIPLES.map((item) => (
              <li key={item.title} className="text-[15px] leading-[1.6] text-[#121213]">
                <p className="font-bold">{item.title}</p>
                <p className="font-normal mt-1">{item.body}</p>
              </li>
            ))}
          </ol>
          <ImagePair sources={[imgGalleryB1, imgGalleryB2]} />
          <p className="font-normal text-[15px] leading-[1.6] text-[#121213] whitespace-pre-wrap">
            {`샌프란시스코든 한국이든, 결국 에이전틱 AI 디자인은 "AI가 얼마나 똑똑한가"보다 "AI가 모를 때 얼마나 정직한가"를 설계하는 일에 더 가깝다고 느껴요.\n\n그리고 이 세 가지, 여러분 포트폴리오에도 그대로 적용돼요.\n모든 걸 다 아는 척하기보다 뭘 모르고 어떻게 검증했는지 솔직하게 보여주는 사람이 결국 더 신뢰받더라고요.`}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setLiked((v) => !v)}
            className="flex items-center gap-1 cursor-pointer"
            aria-pressed={liked}
          >
            {liked ? (
              <span
                aria-hidden
                className="block size-6"
                style={{
                  WebkitMaskImage: `url("${imgLikeFill}")`,
                  maskImage: `url("${imgLikeFill}")`,
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  backgroundColor: '#9CA2B1',
                }}
              />
            ) : (
              <img alt="좋아요" src={imgLike} className="size-6" />
            )}
            <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">{liked ? 103 : 102}</span>
          </button>
          <button
            type="button"
            onClick={() => setBookmarked((v) => !v)}
            className="flex items-center gap-1 cursor-pointer"
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
                  backgroundColor: '#9CA2B1',
                }}
              />
            ) : (
              <img alt="북마크" src={imgBookmarkIcon} className="size-6" />
            )}
            <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">{bookmarked ? 88 : 87}</span>
          </button>
          <div className="flex items-center gap-1">
            <img alt="공유" src={imgShare} className="size-6" />
            <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">24</span>
          </div>
        </div>

        <div className="h-px bg-[#e7eaee] w-full" />

        <div className="flex flex-col gap-10 w-full">
          <p className="font-medium text-[16px] leading-[1.45] text-[#121213]">댓글 {comments.length}개</p>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center gap-2">
              <img alt="" src={imgYunn00} className="size-8 rounded-full object-cover" />
              <p className="font-medium text-[15px] leading-[1.45] text-[#121213]">Yunn00</p>
            </div>
            <div className="border border-[#e7eaee] rounded-xl px-5 py-3 flex flex-col gap-3 min-h-[140px]">
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value.slice(0, 2000))}
                placeholder="댓글을 입력해주세요"
                className="flex-1 min-h-[72px] w-full resize-none outline-none font-normal text-[15px] leading-[1.6] text-[#121213] placeholder:text-[#9ca2b1]"
              />
              <div className="flex items-center justify-end gap-4">
                <p className="flex-1 text-[12px] tracking-[0.3px] text-[#747886]">
                  {draft.length}
                  /2000
                </p>
                <button
                  type="button"
                  onClick={submitComment}
                  className="font-bold text-[16px] leading-[1.45] text-[#1a75ff] cursor-pointer"
                >
                  댓글 남기기
                </button>
              </div>
            </div>
            <p className="text-[12px] tracking-[0.3px] text-[#9ca2b1]">댓글을 등록하면 수정이나 삭제할 수 없어요</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          {comments.map((comment, index) => (
            <CommentCard key={`${comment.author}-${index}`} comment={comment} />
          ))}
        </div>
      </div>
    </section>
  );
}
