import { useState } from 'react';

const imgAuthor = 'https://www.figma.com/api/mcp/asset/c7402831-81b7-446c-89fc-f0e0fd686c1a.png';
const imgHero = 'https://www.figma.com/api/mcp/asset/0ab11342-5343-485f-aa55-57962e506c24.png';
const imgLike = 'https://www.figma.com/api/mcp/asset/76bc3acd-6bf0-40a9-93be-eb8f1b0df6c8.svg';
const imgLikeFill = 'https://www.figma.com/api/mcp/asset/f18f03a8-dbf0-4add-aa12-723afdd968d9.svg';
const imgBookmarkIcon = 'https://www.figma.com/api/mcp/asset/235a7d1e-f793-4443-8408-af972d7e6de4.svg';
const imgBookmarkFill = 'https://www.figma.com/api/mcp/asset/b20bcd72-0b9e-4707-8bd9-b80aa3f1fae3.svg';
const imgShare = 'https://www.figma.com/api/mcp/asset/df0b1844-a3c6-42cb-a30f-fb7816118fcd.svg';
const img0sun222 = 'https://www.figma.com/api/mcp/asset/5942258a-75fb-4146-b170-3f27653fe5e7.png';
const imgYunn00 = 'https://www.figma.com/api/mcp/asset/f5b4aa93-e341-4152-b5b7-64ae4f6ba70c.png';
const imgArrowReturn = 'https://www.figma.com/api/mcp/asset/4e285a4f-5c05-438e-a9c4-2ebb0c75857e.svg';
const imgLogoMentitCircle = 'https://www.figma.com/api/mcp/asset/eb1b1ddc-6825-4db1-9635-a368cb87e3b6.svg';

const TAGS = ['#프로덕트디자인', '#AI'];

const INITIAL_COMMENTS = [
  {
    author: '0sun222',
    avatar: img0sun222,
    text: '저는 포폴 정리할 때 그냥 예뻐 보이는 거 위주로 뺐다 넣었다 했는데, "이거 왜 있었지"부터 물어보는 습관은 가져본 적이 없네요. 당장 적용해볼게요! 꿀팁 정말 감사합니다 😊',
  },
  {
    author: 'Yunn00',
    avatar: imgYunn00,
    text: '인터뷰 30건 정리하는 시간을 반나절로 줄이셨다는 부분 궁금한데, 혹시 어떤 프롬프트나 툴 쓰시는지 여쭤봐도 될까요?',
    aiSuggestion: true,
  },
];

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

function MentorChatSuggestion({ mentorName, onOpenChat }) {
  return (
    <div className="flex items-center gap-2 pl-5 w-full">
      <img alt="" src={imgArrowReturn} className="size-6 shrink-0" />
      <div className="flex-1 min-w-0 bg-[#f9fafb] rounded-2xl p-4">
        <div className="flex items-center gap-1 w-full">
          <img alt="" src={imgLogoMentitCircle} className="size-7 shrink-0" />
          <p className="flex-1 min-w-0 font-normal text-[15px] leading-[1.6] text-[#121213]">
            {mentorName} 멘토에게 채팅을 요청해 궁금한 점을 물어보세요!
          </p>
          <button
            type="button"
            onClick={onOpenChat}
            className="shrink-0 bg-[#1a75ff] border border-[#70d2ff] rounded-lg px-4 py-2 shadow-[inset_0_0_4px_0_#e7f3ff] cursor-pointer"
          >
            <span className="font-bold text-[14px] tracking-[0.14px] text-white whitespace-nowrap">
              {mentorName} 멘토와 채팅하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function isQuestionLike(text) {
  return text.includes('?');
}

export default function CareerTalkDetailYoonie({ onBack, onOpenMentorChat }) {
  const [draft, setDraft] = useState('');
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const submitComment = () => {
    const text = draft.trim();
    if (!text) return;
    setComments((prev) => [
      { author: 'Yunn00', avatar: imgYunn00, text, aiSuggestion: isQuestionLike(text) },
      ...prev,
    ]);
    setDraft('');
  };

  return (
    <section className="flex-1 min-w-0 min-h-0 rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-y-auto">
      <div className="max-w-[819px] mx-auto py-16 px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-[25px] leading-[1.4] tracking-[-0.5px] text-[#121213]">
              AI 시대의 프로덕트 디자인 활용 팁
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
                <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">Yoonie 멘토</p>
                <div className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
                  <div className="absolute inset-0 bg-[#9054ff] opacity-10 rounded-lg" />
                  <p className="relative text-[10px] tracking-[0.25px] text-[#9054ff] whitespace-nowrap">Active Mentor</p>
                </div>
              </div>
              <p className="text-[14px] tracking-[0.14px] text-[#747886]">프로덕트 디자이너・당근・5년차</p>
            </div>
            <p className="shrink-0 text-[14px] tracking-[0.14px] text-[#747886] whitespace-nowrap">2026년 08월 14일</p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <img alt="" src={imgHero} className="w-full aspect-[779/437] object-cover rounded-2xl" />
          <p className="font-normal text-[15px] leading-[1.6] text-[#121213] whitespace-pre-wrap">
            {`저는 화면을 그리기 전 단계에서 AI를 제일 많이 써요. 최근 당근 홈 피드 개편 때는 사용자 인터뷰 30건을 AI로 먼저 정리해서 반복되는 키워드를 뽑았는데, 예전엔 며칠 걸리던 어피니티 다이어그램 작업이 반나절로 줄었어요.

근데 딱 거기까지예요. "이 키워드 중에 뭘 먼저 풀지"는 AI가 못 정해줘요. 그건 결국 우리 서비스 맥락을 아는 제가 판단해야 하는 부분이더라고요.

예전에 화면을 빠르게 정리해서 그대로 배포까지 간 적이 있는데, 나중에 데이터 보니까 제가 지운 요소 하나가 사실 사용자한테 중요한 신호였던 거예요. AI는 "깔끔해 보이는 안"은 잘 뽑는데, "이게 왜 여기 있었는지"는 몰라요. 그건 우리만 아는 히스토리니까요.`}
          </p>
          <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">
            그래서 요즘은 이렇게 써요.
          </p>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li className="text-[15px] leading-[1.6] text-[#121213]">리서치·인터뷰 정리는 AI한테 맡기고</li>
            <li className="text-[15px] leading-[1.6] text-[#121213]">우선순위 판단은 반드시 직접 하고</li>
            <li className="text-[15px] leading-[1.6] text-[#121213]">화면에서 뭔가 지우기 전엔 "이거 왜 있었지"부터 먼저 확인해요</li>
          </ol>
          <p className="font-normal text-[15px] leading-[1.6] text-[#121213]">
            AI를 답을 주는 도구가 아니라, 판단할 시간을 벌어주는 도구로 쓰는 게 요즘 제 방식이에요.
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
            <div key={`${comment.author}-${index}`} className="flex flex-col gap-2 w-full">
              <CommentCard comment={comment} />
              {comment.aiSuggestion && (
                <MentorChatSuggestion mentorName="Yoonie" onOpenChat={onOpenMentorChat} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
