import { useEffect, useRef, useState } from 'react';

const imgAuthor = 'https://www.figma.com/api/mcp/asset/58c822c4-0089-480d-acd2-73c7af5fc500.png';
const imgPostImage = 'https://www.figma.com/api/mcp/asset/50dda127-74a2-4f2f-926a-9716da2a3f6d.png';
const imgLikeOutline = 'https://www.figma.com/api/mcp/asset/f620f4c6-4526-4ddb-aa32-c770b2445ecc.svg';
const imgLikeFill = 'https://www.figma.com/api/mcp/asset/f18f03a8-dbf0-4add-aa12-723afdd968d9.svg';
const imgBookmarkOutline = 'https://www.figma.com/api/mcp/asset/489aff29-3b43-4635-80cf-b1adf4150db5.svg';
const imgBookmarkFill = 'https://www.figma.com/api/mcp/asset/b20bcd72-0b9e-4707-8bd9-b80aa3f1fae3.svg';
const imgShare = 'https://www.figma.com/api/mcp/asset/31df88cc-773e-48e7-b925-81defe4a651c.svg';
const imgSmallLike = 'https://www.figma.com/api/mcp/asset/d82be445-be8d-44cb-bce0-d3f6a3b977c2.svg';
const imgMoreChevron = 'https://www.figma.com/api/mcp/asset/bb3b8c56-7ee3-4df3-ba7c-8fbd9131aa9f.svg';

const imgYoonie = 'https://www.figma.com/api/mcp/asset/38da743c-39e9-4b29-92e2-178f15ebcd3d.png';
const imgDaisy = 'https://www.figma.com/api/mcp/asset/4e59b148-9a7e-4e39-be3e-0cf935da5817.png';
const imgEunoia = 'https://www.figma.com/api/mcp/asset/92b621eb-70dd-4c6d-a935-09067d86f639.png';
const imgUha = 'https://www.figma.com/api/mcp/asset/82f8645a-bff2-40bb-b2ce-b4adeff510e0.png';
const imgEric = 'https://www.figma.com/api/mcp/asset/a0d39193-fabc-410b-8ee7-5cd5300c34bf.png';
const imgTeddy = 'https://www.figma.com/api/mcp/asset/349f7306-9c3b-45ee-b42e-10569d6479a8.png';
const imgSunny = 'https://www.figma.com/api/mcp/asset/f523aa62-cb7a-4452-92f8-9126d2a5de89.png';

const CROP_UHA = { top: '-4.69%', left: '-1.28%', width: '170.94%', height: '136.83%' };
const CROP_ERIC = { top: '-1.18%', left: '-2.04%', width: '182%', height: '145.69%' };
const CROP_DAISY = { top: '-5.94%', left: '-0.02%', width: '171.11%', height: '136.97%' };
const CROP_SUNNY = { top: '-5.92%', left: '-1.73%', width: '175.37%', height: '140.34%' };

const BADGE = {
  purple: { bg: 'bg-[#9054ff]', text: 'text-[#9054ff]', label: 'Active Mentor' },
  lightblue: { bg: 'bg-[#008dcf]', text: 'text-[#008dcf]', label: 'Rookie Mentor' },
  red: { bg: 'bg-[#e52222]', text: 'text-[#e52222]', label: 'Master Mentor' },
};

// Figma에 실제로 디자인되어 있던 답변 3개 (그대로)
const INITIAL_ANSWERS = [
  {
    id: 'yoonie',
    name: 'Yoonie',
    avatar: imgYoonie,
    badge: 'purple',
    role: '프로덕트 디자이너・당근・5년차',
    text: '실패한 프로젝트를 포트폴리오에 포함하는 것 자체는 전혀 문제가 되지 않습니다. 오히려 프로젝트가 기대했던 결과를 얻지 못했더라도, 그 과정에서 어떤 문제를 발견했고 이를 어떻게 분석했으며, 이후 어떤 개선 방향을 도출했는지를 함께 보여준다면 지원자의 문제 해결 능력과 성장 가능성을 효과적으로 전달할 수 있습니다.',
    likes: 127,
    canChat: true,
  },
  {
    id: 'daisy',
    name: 'Daisy',
    avatar: imgDaisy,
    crop: CROP_DAISY,
    badge: 'lightblue',
    role: '프로덕트 디자이너・카카오・1년차',
    text: '저도 초반엔 실패 프로젝트 넣기가 무서워서 뺐었는데, 나중엔 그게 오히려 손해였다는 걸 알았어요. 성공 사례만 있으면 어려운 상황에서 어떻게 판단하는지 확인할 방법이 없거든요. 넣을 땐 실험 가설이 뭐였고 어떤 지표로 실패라고 판단했는지까지 구체적으로 적는 걸 추천해요.',
    likes: 67,
    canChat: false,
  },
  {
    id: 'eunoia',
    name: 'Eunoia',
    avatar: imgEunoia,
    badge: 'red',
    role: '프로덕트 디자이너・토스・3년차',
    text: '저는 신입 포폴을 매년 100개 넘게 봐온 입장에서 말씀드리면, 실패 사례 자체보다 "어떻게 서술했는지"에서 갈려요. "잘 안 됐지만 배웠어요"로 끝나는 포폴이 대부분인데, 수치나 사용자 반응까지 구체적으로 붙여서 왜 실패했는지, 어떤 문제를 발견했는지, 그걸 어떻게 개선했는지 설명한 지원자는 진짜 소수였고, 그 소수가 항상 서류를 통과했어요. 결국 중요한 건 실패를 숨기는 게 아니라, 실패를 통해 어떤 인사이트와 개선 방향을 도출했는지를 보여주는 거예요.',
    likes: 46,
    canChat: false,
  },
];

// 더보기 클릭 시 추가로 나오는 답변 4개 (Figma엔 없어서 다른 멘토 프로필로 임의 작성)
const MORE_ANSWERS = [
  {
    id: 'uha',
    name: 'U.ha',
    avatar: imgUha,
    crop: CROP_UHA,
    badge: 'purple',
    role: '프로덕트 디자이너・세일즈포스・2년차',
    text: '실패 프로젝트를 뺄지 고민된다면, 그 프로젝트가 "왜 실패라고 판단했는지"를 먼저 정리해보세요. 목표 대비 결과가 안 나온 거라면 그 목표 설정 과정 자체도 좋은 이야깃거리가 돼요. 저는 오히려 성공 사례만 있는 포폴보다 실패를 통해 배운 게 명확한 포폴에 더 신뢰가 가더라고요.',
    likes: 58,
    canChat: false,
  },
  {
    id: 'eric',
    name: 'Eric',
    avatar: imgEric,
    crop: CROP_ERIC,
    badge: 'lightblue',
    role: '콘텐츠 마케터・올리브영・2년차',
    text: '면접관 입장에서 말씀드리면, 실패 프로젝트를 뺀 포폴은 오히려 "이 사람이 어려운 상황을 겪어본 적이 없나?"라는 의문이 들어요. 결과보다 과정에서의 의사결정을 중요하게 보기 때문에, 실패했더라도 그 안에서 어떤 트레이드오프를 고민했는지 보여주시면 충분히 플러스 요인이 될 수 있어요.',
    likes: 41,
    canChat: false,
  },
  {
    id: 'teddy',
    name: 'Teddy',
    avatar: imgTeddy,
    badge: 'lightblue',
    role: 'UX 디자이너・프리랜서・6년차',
    text: '저는 실패 프로젝트를 뺄지 말지보다 "몇 개까지 넣을지"를 더 고민하라고 말씀드려요. 성공 사례 없이 실패만 나열되면 역량 자체가 의심받을 수 있거든요. 전체 프로젝트 중 1~2개 정도, 성공 사례들 사이에 배치해서 균형을 맞추는 걸 추천해요.',
    likes: 33,
    canChat: false,
  },
  {
    id: 'sunny',
    name: 'Sunny',
    avatar: imgSunny,
    crop: CROP_SUNNY,
    badge: 'red',
    role: 'UX 디자이너・카카오・5년차',
    text: '저도 연차 낮을 때 실패 프로젝트를 뺐다가 오히려 "왜 성공한 것만 있냐"는 질문을 받았어요. 지금은 실패 사례를 넣되 마지막 문장을 꼭 "그래서 다음엔 이렇게 검증했다"로 끝내요. 실패 자체보다 그 다음 행동이 있었는지를 더 중요하게 보시는 것 같아요.',
    likes: 29,
    canChat: false,
  },
];

function MentorAnswerCard({ answer, onOpenMentorChat }) {
  const badge = BADGE[answer.badge];
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) setIsClamped(el.scrollHeight > el.clientHeight + 1);
  }, [answer.text]);

  return (
    <div className="border border-[#e7eaee] rounded-2xl p-5 flex flex-col gap-5 w-full">
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 min-w-0 flex items-center gap-3">
          {answer.crop ? (
            <div className="size-[42px] rounded-full overflow-hidden relative bg-white shrink-0">
              <img
                alt=""
                src={answer.avatar}
                className="absolute max-w-none pointer-events-none"
                style={{ top: answer.crop.top, left: answer.crop.left, width: answer.crop.width, height: answer.crop.height }}
              />
            </div>
          ) : (
            <img alt="" src={answer.avatar} className="size-[42px] rounded-full object-cover shrink-0" />
          )}
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] whitespace-nowrap">
                {answer.name} 멘토
              </p>
              <div className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
                <div className={`absolute inset-0 opacity-10 rounded-lg ${badge.bg}`} />
                <p className={`relative text-[10px] tracking-[0.25px] whitespace-nowrap ${badge.text}`}>{badge.label}</p>
              </div>
            </div>
            <p className="text-[14px] tracking-[0.14px] text-[#747886] whitespace-nowrap">{answer.role}</p>
          </div>
        </div>
        {answer.canChat ? (
          <button
            type="button"
            onClick={onOpenMentorChat}
            className="shrink-0 border border-[#70d2ff] rounded-lg px-5 py-2 bg-[#1a75ff] shadow-[inset_0_0_4px_0_#e7f3ff] cursor-pointer"
          >
            <span className="font-bold text-[15px] leading-[1.45] text-white whitespace-nowrap">멘토와 채팅하기</span>
          </button>
        ) : (
          <div className="shrink-0 border border-[#70d2ff] rounded-lg px-5 py-2 bg-[#1a75ff] shadow-[inset_0_0_4px_0_#e7f3ff]">
            <span className="font-bold text-[15px] leading-[1.45] text-white whitespace-nowrap">멘토와 채팅하기</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 items-start">
          <p
            ref={textRef}
            className={`text-[15px] leading-[1.6] text-[#121213] whitespace-pre-wrap ${expanded ? '' : 'line-clamp-3'}`}
          >
            {answer.text}
          </p>
          {!expanded && isClamped && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="text-[14px] font-medium leading-[1.42] text-[#9ca2b1] cursor-pointer"
            >
              더보기
            </button>
          )}
        </div>
        <div className="flex items-center gap-1">
          <img alt="" src={imgSmallLike} className="size-5" />
          <span className="text-[13px] tracking-[0.26px] text-[#121213]">{answer.likes}</span>
        </div>
      </div>
    </div>
  );
}

export default function QnaDetailFailedProject({ onOpenMentorChat }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="flex-1 min-w-0 min-h-0 rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-y-auto">
      <div className="max-w-[819px] mx-auto py-16 px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-[25px] leading-[1.4] tracking-[-0.5px] text-[#121213]">
            포트폴리오에 실패한 프로젝트 넣어도 될까요?
          </h1>
          <div className="flex flex-wrap gap-2">
            {['#프로덕트디자인', '#Q&A', '#포폴'].map((tag) => (
              <span
                key={tag}
                className="bg-[#f4f6f8] px-2 py-1 rounded-lg text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#747886]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-10 w-full">
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <img alt="" src={imgAuthor} className="size-[42px] rounded-full object-cover shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">000sun</p>
              <p className="text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886]">프로덕트 디자인</p>
            </div>
          </div>
          <p className="shrink-0 text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886] whitespace-nowrap">
            2026년 08월 14일
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <p className="text-[15px] leading-[1.6] text-[#121213]">
            실패한 프로젝트를 잘 풀어낼지, 아니면 과감하게 빼고 성공한 프로젝트만 넣어서 구성할지 고민입니다. 넣으면 오히려 감점 요소가 될까요? 너무 고민이에요.
          </p>
          <img alt="" src={imgPostImage} className="w-full aspect-[779/437] object-cover rounded-2xl" />
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
              <img alt="좋아요" src={imgLikeOutline} className="size-6" />
            )}
            <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">{liked ? 61 : 60}</span>
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
              <img alt="북마크" src={imgBookmarkOutline} className="size-6" />
            )}
            <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">{bookmarked ? 33 : 32}</span>
          </button>
          <div className="flex items-center gap-1">
            <img alt="공유" src={imgShare} className="size-6" />
            <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">4</span>
          </div>
        </div>

        <div className="h-px bg-[#e7eaee] w-full" />

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <p className="text-[16px] leading-[1.45] font-medium text-[#121213]">댓글 32개</p>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">
                이 질문에 답한 멘토들
              </p>
              <p className="text-[14px] leading-[1.42] tracking-[0.14px] text-[#9ca2b1]">
                추천을 많이 받은 멘토부터 보여드려요
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            {INITIAL_ANSWERS.map((answer) => (
              <MentorAnswerCard key={answer.id} answer={answer} onOpenMentorChat={onOpenMentorChat} />
            ))}
            {showMore &&
              MORE_ANSWERS.map((answer) => (
                <MentorAnswerCard key={answer.id} answer={answer} onOpenMentorChat={onOpenMentorChat} />
              ))}
            {!showMore && (
              <button
                type="button"
                onClick={() => setShowMore(true)}
                className="w-full border border-[#e7eaee] rounded-lg py-2 px-4 flex items-center justify-center gap-1 font-medium text-[14px] text-[#747886] cursor-pointer"
              >
                <img alt="" src={imgMoreChevron} className="size-6" />
                <span>더보기</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
