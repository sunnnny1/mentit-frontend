import { useEffect, useState } from 'react';
import MentitAiSubMenu from './MentitAiSubMenu';
import { MentorCard, MENTORS } from '../MentorRecommendations';

const imgSend = 'https://www.figma.com/api/mcp/asset/7a7706e1-cc35-4e14-9913-48dfd5adcc5c.svg';

const FOLLOW_UP_CHIPS = [
  '멘토들에게 어떤 질문을 하면 좋을까?',
  '각 멘토들의 대화 후 리뷰는 어때?',
  '각 멘토의 장점을 더 구체적으로 알려줘',
];

function detectRole(query) {
  const q = (query || '').toLowerCase();
  if (q.includes('ux') || q.includes('유엑스')) return 'UX 디자이너';
  return '프로덕트 디자이너';
}

function rankMentors(role) {
  const matched = MENTORS.filter((m) => m.role.includes(role));
  const rest = MENTORS.filter((m) => !m.role.includes(role));
  return [...matched, ...rest].slice(0, 3);
}

function mentorHeadingDetail(mentor) {
  const [role, company, years] = mentor.role.split(' · ');
  return `${company} ${role} ${years}`;
}

// AI 답변을 한 블록씩 순차적으로 나타나게 함 (안내 문구 -> 멘토 카드 하나씩 -> 추천 이유)
// - 스트리밍/타이핑처럼 답변을 주는 느낌을 주기 위함. 질문이 바뀌면 처음부터 다시 재생됨.
function useSequentialReveal(steps, resetKey, stepDelay = 380) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    setRevealed(0);
  }, [resetKey]);

  useEffect(() => {
    if (revealed >= steps) return undefined;
    const timer = setTimeout(() => setRevealed((prev) => prev + 1), revealed === 0 ? 200 : stepDelay);
    return () => clearTimeout(timer);
  }, [revealed, steps, stepDelay]);

  return revealed;
}

function RevealBlock({ show, className = '', children }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!show) return undefined;
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [show]);

  return (
    <div
      className={`w-full transition-[opacity,transform] duration-500 ease-out will-change-transform ${
        entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function MentorSearchTextfield({ onSubmitQuery }) {
  const [value, setValue] = useState('');

  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onSubmitQuery(v);
    setValue('');
  };

  return (
    <div className="flex flex-col items-start w-full max-w-[867px]">
      <div className="relative flex items-center w-full rounded-xl border border-[#e7eaee] bg-white/40 backdrop-blur-[6px] shadow-[inset_4px_4px_12px_rgba(255,255,255,0.5)] px-5 py-3 gap-2">
        <div className="relative flex-1 min-w-0 h-6 flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit();
            }}
            placeholder="메세지를 입력해주세요"
            className="w-full bg-transparent text-[15px] leading-[1.6] text-[#121213] placeholder:text-[#9ca2b1] outline-none relative z-[1]"
          />
        </div>
        <button
          type="button"
          onClick={submit}
          className="relative flex items-center justify-center px-5 py-2 rounded-full bg-[#1a75ff] border border-[#70d2ff] shadow-[inset_0_0_4px_rgba(231,243,255,1)] shrink-0 cursor-pointer"
          aria-label="전송"
        >
          <img alt="" src={imgSend} className="size-6" />
        </button>
      </div>
    </div>
  );
}

export default function MentitAiMentorSearch({ query = '멘토 추천', isSubMenuOpen = true, onCloseSubMenu, onOpenAgentChat, onOpenMentorDetail }) {
  const [activeQuery, setActiveQuery] = useState(query);

  useEffect(() => {
    setActiveQuery(query);
  }, [query]);

  const role = detectRole(activeQuery);
  const ranked = rankMentors(role);
  const revealed = useSequentialReveal(ranked.length + 2, activeQuery);

  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && <MentitAiSubMenu onClose={onCloseSubMenu} />}

      <section className="relative flex-1 min-w-0 min-h-0 flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
        <div className="shrink-0 flex items-center px-5 py-6 border-b border-[#e7eaee]">
          <p className="font-bold text-lg tracking-[-0.0036px] text-[#121213]">{role} 멘토 추천</p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center px-5 pt-10 pb-[260px]">
          <div className="flex flex-col gap-10 items-end w-full max-w-[867px]">
            <div className="bg-[#f9fafb] max-w-[513px] p-3 rounded-xl">
              <p className="text-[15px] leading-[1.6] text-[#121213]">{activeQuery}</p>
            </div>

            <RevealBlock show={revealed >= 1} className="flex flex-col gap-5 items-start">
              <p className="text-[15px] leading-[1.6] text-[#121213] whitespace-pre-line">
                {`"${activeQuery}"에 대해 물어보셨네요. ${role} 역할과 가장 잘 맞는 멘토 ${ranked.length}분을 추천해드릴게요.`}
              </p>

              <div className="h-px bg-[#e7eaee] w-full" />
            </RevealBlock>

            <div className="flex flex-col gap-12 items-start w-full">
              {ranked.map((mentor, i) => (
                <RevealBlock key={mentor.name} show={revealed >= i + 2}>
                  <div className="flex flex-col gap-3 items-start w-full">
                    <div className="flex flex-col gap-3 items-start w-full text-[#121213]">
                      <p className="text-[15px] leading-[1.6] w-full">
                        <span className="font-bold">{`${i + 1}순위: ${mentor.name.replace(/\s*멘토$/, '')} 멘토 `}</span>
                        <span>{`(${mentorHeadingDetail(mentor)})`}</span>
                      </p>
                      <p className="text-[15px] leading-[1.6] w-full">
                        {i === 0
                          ? `${role}와(과) 가장 잘 맞는 멘토예요. ${mentor.desc}`
                          : `${mentor.desc} 추가로 참고하면 좋은 멘토예요.`}
                      </p>
                    </div>
                    <MentorCard mentor={mentor} onOpenAgentChat={onOpenAgentChat} onOpenMentorDetail={onOpenMentorDetail} />
                  </div>
                </RevealBlock>
              ))}
            </div>

            <RevealBlock show={revealed >= ranked.length + 2} className="flex flex-col gap-4 items-start">
              <div className="h-px bg-[#e7eaee] w-full" />

              <div className="flex flex-col gap-3 items-start w-full text-[#121213]">
                <p className="font-bold text-[15px] leading-[1.6]">추천 이유:</p>
                <p className="text-[15px] leading-[1.6] whitespace-pre-line">
                  {`윤영님은 지금 포트폴리오 수정 단계예요. 그래서 채용 정보보다는 포트폴리오 피드백을 잘하는 Yoonie 멘토를 먼저 추천했어요.\n포트폴리오가 정리되고 지원 단계로 접어들면 그때는 Eunoia 멘토처럼 실전 채용 정보를 주는 멘토가 더 도움이 될 수 있어요.`}
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-6 items-center px-5 pt-10 pb-6">
          <div className="flex flex-col gap-2 items-end w-full max-w-[867px] self-center">
            {FOLLOW_UP_CHIPS.map((chip) => (
              <div key={chip} className="bg-white border border-[#e7eaee] rounded-lg px-5 py-2">
                <p className="text-[15px] font-medium text-[#747886] whitespace-nowrap">{chip}</p>
              </div>
            ))}
          </div>
          <MentorSearchTextfield onSubmitQuery={setActiveQuery} />
        </div>
      </section>
    </div>
  );
}
