import MentorProfile from '../board/MentorProfile';
import imgYoonie from '../../assets/icons/yoonie.webp';
import imgEunoia from '../../assets/icons/eunoia.webp';
import imgTeddy from '../../assets/icons/teddy.webp';
import imgSunny from '../../assets/icons/ellipse-sunny.png';

const FOLLOWED_MENTORS = [
  { name: 'Yoonie', avatar: imgYoonie },
  { name: 'Eunoia', avatar: imgEunoia },
  { name: 'Teddy', avatar: imgTeddy },
  { name: 'Sunny', avatar: imgSunny },
];

const YOONIE_TEXT =
  '처음에는 AI가 해주는 피드백이라 얼마나 도움이 될까 싶었는데, 생각보다 훨씬 구체적이라 놀랐어요. 실제 멘토님의 경험과 데이터를 기반으로 해서 그런지 방향성을 잡는 데 도움이 많이 됐습니다. 단순히 좋다/아쉽다 수준이 아니라 어떤 부분을 왜 수정해야 하는지 자세하게 설명해 주셔서 좋았어요. 덕분에 포트폴리오를 보완하는 과정에서 많은 도움을 받았습니다. 취업 준비하면서 혼자 고민이 많았는데, 누군가와 이야기하면서 방향을 점검해 볼 수 있다는 점이 가장 좋았던 것 같아요. 포트폴리오나 취업 준비 때문에 고민 중이라면 한 번 받아보시는 것도 추천드립니다.';

const CHAT_TEXT =
  '취업 준비를 하면서 혼자 고민하는 시간이 많았는데, 채팅을 통해 궁금한 점을 바로 질문하고 피드백을 받을 수 있어서 정말 유용했습니다. 특히 현직자 관점에서 조언을 받을 수 있다는 점이 가장 좋았고, 덕분에 포트폴리오를 수정하거나 방향을 잡을 때 많은 도움을 받았어요. 취업 준비 과정에서 누군가와 꾸준히 소통할 수 있다는 것만으로도 큰 힘이 됐습니다.';

const FEEDBACK_TEXT =
  '포트폴리오와 자기소개서를 보면서 어디를 보완해야 하는지 막막했는데, 피드백이 꽤 구체적이라 바로 수정에 들어갈 수 있었어요. 단순히 잘했다/아쉽다로 끝나지 않고, 왜 그렇게 보이는지랑 다음 액션까지 짚어주셔서 방향이 분명해졌습니다. 혼자 고치다 보면 놓치는 부분을 현직자 시선으로 잡아준 점이 가장 도움이 됐어요.';

const INTERVIEW_TEXT =
  '실제 면접에서 어떤 질문을 받을지, 답을 어디까지 준비해야 할지 감이 없었는데 모의 면접이 큰 도움이 됐습니다. 답변을 늘어놓는 것보다 경험을 어떤 구조로 말해야 하는지 잡아주셔서, 이후 면접 준비 방식이 달라졌어요. 긴장되는 상황에서도 핵심만 말하는 연습을 해볼 수 있어서 좋았습니다.';

const REVIEWS = [
  {
    id: 'yoonie-1',
    mentorName: 'Yoonie',
    mentorTier: 'Active',
    avatar: imgYoonie,
    channel: '채팅',
    tags: ['실무 인사이트 공유', '구체적인 조언', '쉬운 이해'],
    text: YOONIE_TEXT,
    date: '2026.05.06',
  },
  {
    id: 'eunoia-1',
    mentorName: 'Eunoia',
    mentorTier: 'Master',
    avatar: imgEunoia,
    channel: '피드백',
    tags: ['빠른 응답', '친근한 소통'],
    text: FEEDBACK_TEXT,
    date: '2026.04.18',
  },
  {
    id: 'sunny-1',
    mentorName: 'Sunny',
    mentorTier: 'Master',
    avatar: imgSunny,
    channel: '면접',
    tags: ['개선 방향 조언', '명확한 설명'],
    text: INTERVIEW_TEXT,
    date: '2026.04.11',
  },
  {
    id: 'teddy-1',
    mentorName: 'Teddy',
    mentorTier: 'Rookie',
    avatar: imgTeddy,
    channel: '채팅',
    tags: ['친절한 피드백', '포트폴리오 조언'],
    text: CHAT_TEXT,
    date: '2026.04.05',
  },
  {
    id: 'yoonie-2',
    mentorName: 'Yoonie',
    mentorTier: 'Active',
    avatar: imgYoonie,
    channel: '피드백',
    tags: ['구체적인 조언', '쉬운 이해'],
    text: FEEDBACK_TEXT,
    date: '2026.03.28',
  },
  {
    id: 'eunoia-2',
    mentorName: 'Eunoia',
    mentorTier: 'Master',
    avatar: imgEunoia,
    channel: '면접',
    tags: ['빠른 응답', '명확한 설명'],
    text: INTERVIEW_TEXT,
    date: '2026.03.20',
  },
  {
    id: 'sunny-2',
    mentorName: 'Sunny',
    mentorTier: 'Master',
    avatar: imgSunny,
    channel: '피드백',
    tags: ['개선 방향 조언', '친근한 소통'],
    text: FEEDBACK_TEXT,
    date: '2026.03.12',
  },
  {
    id: 'teddy-2',
    mentorName: 'Teddy',
    mentorTier: 'Rookie',
    avatar: imgTeddy,
    channel: '채팅',
    tags: ['실무 인사이트 공유'],
    text: CHAT_TEXT,
    date: '2026.03.02',
  },
];

function badgeClass(tier) {
  if (tier === 'Master') return 'bg-[#e52222]/10 text-[#e52222]';
  if (tier === 'Rookie') return 'bg-[#008dcf]/10 text-[#008dcf]';
  return 'bg-[#9054ff]/10 text-[#9054ff]';
}

function badgeLabel(tier) {
  if (tier === 'Master') return 'Master Mentor';
  if (tier === 'Rookie') return 'Rookie Mentor';
  return 'Active Mentor';
}

function ReviewCard({ review, onOpenMentorDetail }) {
  const canOpenDetail =
    review.mentorName === 'Yoonie' ||
    review.mentorName === 'Sunny' ||
    review.mentorName === 'Eunoia' ||
    review.mentorName === 'Teddy';

  return (
    <article className="border border-[#e7eaee] rounded-2xl px-4 py-5 flex flex-col gap-5 w-full">
      <div
        className={`flex gap-2 items-center${canOpenDetail ? ' cursor-pointer' : ''}`}
        onClick={canOpenDetail ? () => onOpenMentorDetail?.(review.mentorName) : undefined}
      >
        <MentorProfile src={review.avatar} size="small" />
        <p className="font-bold text-[14px] leading-[1.42] tracking-[0.14px] text-[#121213] whitespace-nowrap">
          {review.mentorName} 멘토
        </p>
        <span className={`flex items-center justify-center px-2 py-1 rounded-lg text-[10px] tracking-[0.25px] ${badgeClass(review.mentorTier)}`}>
          {badgeLabel(review.mentorTier)}
        </span>
      </div>
      <div className="flex gap-1 items-start flex-wrap">
        <span className="flex items-center justify-center h-7 px-2 rounded-lg bg-[#1a75ff]/10 text-[12px] font-medium tracking-[0.3px] text-[#1a75ff]">
          {review.channel}
        </span>
        {review.tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center justify-center h-7 px-2 rounded-lg border border-[#e7eaee] text-[12px] font-medium tracking-[0.3px] text-[#747886]"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-4 w-full">
        <p className="text-[15px] leading-[1.6] text-[#121213] whitespace-pre-wrap">{review.text}</p>
        <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">{review.date}</p>
      </div>
    </article>
  );
}

export default function MyPageReview({ onOpenMentorDetail }) {
  return (
    <div className="flex flex-col gap-[54px] pt-10 pb-16 w-full">
      <section className="flex flex-col gap-6 items-start w-full">
        <p className="font-bold text-lg leading-[1.5] tracking-[-0.0036px] text-[#121213]">윤영님이 팔로우한 멘토</p>
        <div className="flex gap-8 items-start">
          {FOLLOWED_MENTORS.map((mentor) => (
            <button
              key={mentor.name}
              type="button"
              onClick={() => onOpenMentorDetail?.(mentor.name)}
              className="flex flex-col items-center gap-2 shrink-0 w-16 cursor-pointer"
            >
              <MentorProfile src={mentor.avatar} size={64} />
              <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">{mentor.name}</p>
            </button>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-6 items-start w-full">
        <p className="font-bold text-lg leading-[1.5] tracking-[-0.0036px] text-[#121213]">리뷰 내역 ({REVIEWS.length})</p>
        <div className="flex flex-col gap-5 w-full">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} onOpenMentorDetail={onOpenMentorDetail} />
          ))}
        </div>
      </section>
    </div>
  );
}
