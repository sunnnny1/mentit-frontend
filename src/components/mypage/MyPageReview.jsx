import { useEffect, useRef, useState } from 'react';

const REVIEWS = [
  {
    id: 'yoonie-1',
    mentorName: 'Yoonie',
    mentorTier: 'Active',
    avatar: 'https://www.figma.com/api/mcp/asset/8e752842-45bb-44bc-8911-186c0175df9e.png',
    channel: '채팅',
    tags: ['실무 인사이트 공유', '구체적인 조언', '쉬운 이해'],
    text: "처음에는 AI가 해주는 피드백이라 얼마나 도움이 될까 싶었는데, 생각보다 훨씬 구체적이라 놀랐어요. 실제 멘토님의 경험과 데이터를 기반으로 해서 그런지 방향성을 잡는 데 도움이 많이 됐습니다. 단순히 좋다/아쉽다 수준이 아니라 어떤 부분을 왜 수정해야 하는지 자세하게 설명해 주셔서 좋았어요. 덕분에 포트폴리오를 보완하는 과정에서 많은 도움을 받았습니다. 취업 준비하면서 혼자 고민이 많았는데, 누군가와 이야기하면서 방향을 점검해 볼 수 있다는 점이 가장 좋았던 것 같아요. 포트폴리오나 취업 준비 때문에 고민 중이라면 한 번 받아보시는 것도 추천드립니다.",
    date: '2026.05.06',
  },
  {
    id: 'eunoia-1',
    mentorName: 'Eunoia',
    mentorTier: 'Master',
    avatar: 'https://www.figma.com/api/mcp/asset/af24e4ff-b2a2-4621-b815-f8bfb6ad056a.png',
    channel: '채팅',
    tags: ['빠른 응답', '친근한 소통'],
    text: "취업 준비를 하면서 혼자 고민하는 시간이 많았는데, 채팅을 통해 궁금한 점을 바로 질문하고 피드백을 받을 수 있어서 정말 유용했습니다. 특히 현직자 관점에서 조언을 받을 수 있다는 점이 가장 좋았고, 덕분에 포트폴리오를 수정하거나 방향을 잡을 때 많은 도움을 받았어요. 취업 준비 과정에서 누군가와 꾸준히 소통할 수 있다는 것만으로도 큰 힘이 됐습니다.",
    date: '2026.04.18',
  },
  {
    id: 'sunny-1',
    mentorName: 'Sunny',
    mentorTier: 'Master',
    avatar: 'https://www.figma.com/api/mcp/asset/7223e6f8-a2dd-4968-9808-31d569f49693.png',
    channel: '면접',
    tags: ['개선 방향 조언', '명확한 설명'],
    text: "취업 준비를 하면서 혼자 고민하는 시간이 많았는데, 채팅을 통해 궁금한 점을 바로 질문하고 피드백을 받을 수 있어서 정말 유용했습니다. 특히 현직자 관점에서 조언을 받을 수 있다는 점이 가장 좋았고, 덕분에 포트폴리오를 수정하거나 방향을 잡을 때 많은 도움을 받았어요. 취업 준비 과정에서 누군가와 꾸준히 소통할 수 있다는 것만으로도 큰 힘이 됐습니다.",
    date: '2026.04.11',
  },
];

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) setIsClamped(el.scrollHeight > el.clientHeight + 1);
  }, [review.text]);

  const isMaster = review.mentorTier === 'Master';

  return (
    <article className="border border-[#e7eaee] rounded-2xl px-4 py-5 flex flex-col gap-5 w-full">
      <div className="flex gap-2 items-center">
        <div className="relative size-9 shrink-0">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={review.avatar} />
        </div>
        <p className="font-bold text-[14px] leading-[1.42] tracking-[0.14px] text-[#121213] whitespace-nowrap">{review.mentorName} 멘토</p>
        <span className={`flex items-center justify-center px-2 py-1 rounded-lg text-[10px] tracking-[0.25px] ${isMaster ? 'bg-[#e52222]/10 text-[#e52222]' : 'bg-[#9054ff]/10 text-[#9054ff]'}`}>
          {isMaster ? 'Master Mentor' : 'Active Mentor'}
        </span>
      </div>
      <div className="flex gap-1 items-start flex-wrap">
        <span className="flex items-center justify-center h-7 px-2 rounded-lg border border-transparent bg-[#1a75ff]/10 text-[12px] font-medium tracking-[0.3px] text-[#1a75ff]">{review.channel}</span>
        {review.tags.map((tag) => (
          <span key={tag} className="flex items-center justify-center h-7 px-2 rounded-lg border border-[#e7eaee] text-[12px] font-medium tracking-[0.3px] text-[#747886]">{tag}</span>
        ))}
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 items-start">
          <p ref={textRef} className={`text-[15px] leading-[1.6] text-[#121213] whitespace-pre-wrap ${expanded ? '' : 'line-clamp-3'}`}>
            {review.text}
          </p>
          {!expanded && isClamped && (
            <button type="button" onClick={() => setExpanded(true)} className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886] cursor-pointer">
              더보기
            </button>
          )}
        </div>
        <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">{review.date}</p>
      </div>
    </article>
  );
}

export default function MyPageReview() {
  return (
    <div className="flex flex-col gap-5 pt-10 pb-16 w-full">
      {REVIEWS.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
      <button type="button" className="border border-[#e7eaee] rounded-lg py-2 w-full text-[14px] font-medium tracking-[0.14px] text-[#747886]">
        더보기
      </button>
    </div>
  );
}
