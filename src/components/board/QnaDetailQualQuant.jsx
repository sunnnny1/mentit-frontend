import { useState } from 'react';

const imgAuthor = 'https://www.figma.com/api/mcp/asset/b4ad48a6-02b1-4721-a66a-4a0f340df722.png';
const imgLikeOutline = 'https://www.figma.com/api/mcp/asset/245f4c4c-0050-45ba-a7b5-d68859001b46.svg';
const imgLikeFill = 'https://www.figma.com/api/mcp/asset/f18f03a8-dbf0-4add-aa12-723afdd968d9.svg';
const imgBookmarkOutline = 'https://www.figma.com/api/mcp/asset/df765ee2-056e-4c6e-9c71-962cc09f1dc5.svg';
const imgBookmarkFill = 'https://www.figma.com/api/mcp/asset/b20bcd72-0b9e-4707-8bd9-b80aa3f1fae3.svg';
const imgShare = 'https://www.figma.com/api/mcp/asset/027bc329-49a1-4a70-9a34-5bb6dcae417c.svg';
const imgSmallLike = 'https://www.figma.com/api/mcp/asset/d82be445-be8d-44cb-bce0-d3f6a3b977c2.svg';
const imgMoreChevron = 'https://www.figma.com/api/mcp/asset/bb3b8c56-7ee3-4df3-ba7c-8fbd9131aa9f.svg';

const imgUha = 'https://www.figma.com/api/mcp/asset/82f8645a-bff2-40bb-b2ce-b4adeff510e0.png';
const imgPeter = 'https://www.figma.com/api/mcp/asset/238a7985-f398-4c1b-8060-3d42ae43ec7b.png';
const imgEmma = 'https://www.figma.com/api/mcp/asset/600e8ec2-767a-4acf-96bf-ca759446cdf4.png';
const imgDaisy = 'https://www.figma.com/api/mcp/asset/4e59b148-9a7e-4e39-be3e-0cf935da5817.png';
const imgEunoia = 'https://www.figma.com/api/mcp/asset/92b621eb-70dd-4c6d-a935-09067d86f639.png';
const imgTeddy = 'https://www.figma.com/api/mcp/asset/349f7306-9c3b-45ee-b42e-10569d6479a8.png';

const CROP_UHA = { top: '-4.69%', left: '-1.28%', width: '170.94%', height: '136.83%' };
const CROP_DAISY = { top: '-5.94%', left: '-0.02%', width: '171.11%', height: '136.97%' };

const BADGE = {
  purple: { bg: 'bg-[#9054ff]', text: 'text-[#9054ff]', label: 'Active Mentor' },
  lightblue: { bg: 'bg-[#008dcf]', text: 'text-[#008dcf]', label: 'Rookie Mentor' },
  red: { bg: 'bg-[#e52222]', text: 'text-[#e52222]', label: 'Master Mentor' },
};

// Figma에 실제로 디자인되어 있던 답변 3개 (그대로)
const INITIAL_ANSWERS = [
  {
    id: 'uha',
    name: 'U.ha',
    avatar: imgUha,
    crop: CROP_UHA,
    badge: 'purple',
    role: '프로덕트 디자이너・세일즈포스・2년차',
    text: '저는 정성/정량을 따로 나열하지 않고 항상 짝지어서 써요. "채팅 응답률이 12% 떨어졌다"는 숫자만 있으면 그냥 숫자예요. 근데 그 옆에 인터뷰에서 나온 "이 사람 지금 대화 가능한지 몰라서 다른 사람한테 물어봤어요"라는 말을 같이 붙이면, 그 숫자가 "왜" 떨어졌는지가 설명이 돼요. 숫자 하나마다 그걸 뒷받침하는 발화를 최소 1개씩 짝지어 넣으려고 해요.',
    likes: 127,
    canChat: false,
  },
  {
    id: 'peter',
    name: 'Peter',
    avatar: imgPeter,
    badge: 'red',
    role: 'UX 디자이너・네이버・6년차',
    text: '포폴 100개 넘게 보면서 느낀 건데, 정량 데이터를 "장식용"으로 쓰는 분들이 진짜 많아요. "만족도 4.2/5" 같은 숫자만 크게 박아놓고 그다음 설명이 없어요. 저는 항상 이 숫자가 왜 의미 있는지, 그리고 이 숫자 때문에 뭘 바꿨는지까지 적혀 있는지를 봐요. 숫자 자체보다 그걸 어떻게 해석했는지가 진짜 실력이 드러나는 부분이에요.',
    likes: 109,
    canChat: false,
  },
  {
    id: 'emma',
    name: 'Emma',
    avatar: imgEmma,
    badge: 'lightblue',
    role: '프로덕트 디자이너・오늘의 집・1년차',
    text: '저도 처음엔 설문 결과 %만 나열했었는데, 멘토링 받으면서 "그래서 그게 무슨 뜻이야?"라는 질문을 계속 받았어요. 그 뒤로는 정성 데이터(인터뷰 발화)로 먼저 문제를 정의하고, 정량 데이터(설문·로그)로 그 문제가 얼마나 큰 규모인지 검증하는 순서로 배치해요. "이런 것 같아요(정성) → 실제로 몇 %가 그렇더라고요(정량)" 구조로 가면 훨씬 논리적으로 읽혀요.',
    likes: 86,
    canChat: false,
  },
];

// 더보기 클릭 시 추가로 나오는 답변 3개 (Figma엔 없어서 다른 멘토 프로필로 임의 작성)
const MORE_ANSWERS = [
  {
    id: 'daisy',
    name: 'Daisy',
    avatar: imgDaisy,
    crop: CROP_DAISY,
    badge: 'lightblue',
    role: '프로덕트 디자이너・카카오・1년차',
    text: '저는 정량 데이터를 못 구했을 땐 억지로 숫자를 만들지 않고, 제가 직접 관찰하거나 소규모로 테스트한 결과라도 구체적으로 적어요. "5명한테 보여줬더니 3명이 여기서 멈칫했다"도 충분히 정량적인 근거가 돼요. 완벽한 데이터셋이 없다고 정성 경험만 나열하지 말고, 규모가 작아도 숫자로 표현하려는 시도 자체를 보여주는 게 중요해요.',
    likes: 52,
    canChat: false,
  },
  {
    id: 'eunoia',
    name: 'Eunoia',
    avatar: imgEunoia,
    badge: 'red',
    role: '프로덕트 디자이너・토스・3년차',
    text: '면접에서 정성/정량 데이터에 대해 꼭 물어보는데, 숫자를 못 외워서 얼버무리는 분들이 많아요. 포폴에 넣은 수치는 그 자리에서 바로 설명할 수 있을 정도로 본인이 직접 계산하거나 뽑아본 데이터여야 해요. 어디서 가져온 숫자인지, 어떻게 구했는지까지 스스로 설명 가능한 데이터만 포폴에 넣으시길 추천해요.',
    likes: 44,
    canChat: false,
  },
  {
    id: 'teddy',
    name: 'Teddy',
    avatar: imgTeddy,
    badge: 'lightblue',
    role: 'UX 디자이너・프리랜서・6년차',
    text: '프리랜서로 일하다 보니 정량 데이터 자체를 못 받는 프로젝트가 많았는데, 그럴 땐 정성 데이터를 표나 타임라인 형태로 시각화해서 "정량적으로 보이게" 정리했어요. 데이터의 형태(숫자)가 아니라 근거의 구조가 명확한지가 더 중요하더라고요.',
    likes: 31,
    canChat: false,
  },
];

function MentorAnswerCard({ answer, onOpenMentorChat }) {
  const badge = BADGE[answer.badge];
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
        <p className="text-[15px] leading-[1.6] text-[#121213] whitespace-pre-wrap">{answer.text}</p>
        <div className="flex items-center gap-1">
          <img alt="" src={imgSmallLike} className="size-5" />
          <span className="text-[13px] tracking-[0.26px] text-[#121213]">{answer.likes}</span>
        </div>
      </div>
    </div>
  );
}

export default function QnaDetailQualQuant({ onOpenMentorChat }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="flex-1 min-w-0 min-h-0 rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-y-auto">
      <div className="max-w-[819px] mx-auto py-16 px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-[25px] leading-[1.4] tracking-[-0.5px] text-[#121213]">
            정성적, 정량적 데이터를 어떻게 포폴에 녹여야 할까요?
          </h1>
          <div className="flex flex-wrap gap-2">
            {['#프로덕트디자인', '#Q&A', '#데이터'].map((tag) => (
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
              <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">coco</p>
              <p className="text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886]">프로덕트 디자인</p>
            </div>
          </div>
          <p className="shrink-0 text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886] whitespace-nowrap">
            2026년 08월 14일
          </p>
        </div>

        <p className="text-[15px] leading-[1.6] text-[#121213]">
          안녕하세요. 프로덕트 디자인 직무에서 일하고 싶은 디자이너 취준생입니다. 현재 포폴을 만들고 있는데 가장 어려운 부분이 정성적, 정량적 데이터를 어떻게 넣어야하는지 입니다. 현직에 계신 멘토분들의 조언 부탁드립니다!
        </p>

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
            <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">{liked ? 87 : 86}</span>
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
            <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">{bookmarked ? 14 : 13}</span>
          </button>
          <div className="flex items-center gap-1">
            <img alt="공유" src={imgShare} className="size-6" />
            <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">10</span>
          </div>
        </div>

        <div className="h-px bg-[#e7eaee] w-full" />

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <p className="text-[16px] leading-[1.45] font-medium text-[#121213]">댓글 47개</p>
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
