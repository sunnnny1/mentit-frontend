import { useEffect, useState } from 'react';
import MentitAiSubMenu from './MentitAiSubMenu';
import LoadingSymbol from '../chat/LoadingSymbol';
import figma_7a7706e1_cc35_4e14_9913_48dfd5adcc5c_svg from '../../assets/figma/7a7706e1-cc35-4e14-9913-48dfd5adcc5c.svg';
import figma_73476c4a_dc29_4768_b226_165c046e231d_svg from '../../assets/figma/73476c4a-dc29-4768-b226-165c046e231d.svg';

const imgSend = figma_7a7706e1_cc35_4e14_9913_48dfd5adcc5c_svg;
const imgArrowIcon = figma_73476c4a_dc29_4768_b226_165c046e231d_svg;

const FOLLOW_UP_CHIPS = [
  '취업 준비 계획 타임라인을 메인 홈 화면에 반영해줘',
  '조금 더 구체적으로 계획을 설명해줘',
  '조금 더 타이트하게 다시 계획을 세워줘',
];

const TIMELINE = [
  {
    month: 7,
    note: '현재',
    items: [
      { title: '원하는 기업 탐색', desc: '멘팃 AI와 기업 탐색하러 가기', arrow: true },
      { title: '피드백 기반으로 포트폴리오 보완', desc: 'Yoonie 멘토에게 피드백받으러 가기', arrow: true },
      { title: '자기소개서 정리', desc: 'Yoonie 멘토에게 피드백 받으러 가기', arrow: true },
    ],
  },
  {
    month: 8,
    note: null,
    items: [
      { title: '포트폴리오 최종 완성', desc: '지원 전 마지막 점검과 보완을 진행하기', arrow: false },
      { title: 'AI 면접 시뮬레이션', desc: '실전처럼 질문에 답하며 면접을 준비하기', arrow: true },
    ],
  },
  {
    month: 9,
    note: null,
    items: [
      { title: '하반기 지원 시작', desc: '관심 있는 기업에 본격적으로 지원하기', arrow: false },
      { title: '실전 면접 대비', desc: '예상 질문을 바탕으로 답변을 다듬기', arrow: true },
      { title: '지원 현황 관리', desc: '지원 일정과 전형 결과를 체계적으로 관리하기', arrow: false },
    ],
  },
];

// AI 답변을 한 블록씩 순차적으로 나타나게 함 (현황 섹션 -> 타임라인 카드들 ->
// 안내문구 -> 요약카드) - 스트리밍/타이핑처럼 답변을 주는 느낌을 주기 위함.
function useSequentialReveal(steps, resetKey, stepDelay = 380) {
  const [revealed, setRevealed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setRevealed(0);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, [resetKey]);

  useEffect(() => {
    if (isLoading || revealed >= steps) return undefined;
    const timer = setTimeout(() => setRevealed((prev) => prev + 1), revealed === 0 ? 0 : stepDelay);
    return () => clearTimeout(timer);
  }, [isLoading, revealed, steps, stepDelay]);

  return { revealed, isLoading };
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

function PlanTextfield({ onSubmitQuery }) {
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

function ArrowIcon() {
  return <img alt="" src={imgArrowIcon} className="size-6 shrink-0" />;
}

function TimelineButton({ title, desc, arrow }) {
  return (
    <div className="relative flex items-center gap-5 w-full px-7 py-4 rounded-xl bg-[#f4f6f8]">
      <div className="flex-1 min-w-0 flex flex-col gap-1 items-start">
        <p className="text-base font-medium leading-[1.45] text-[#121213]">{title}</p>
        <p className="text-[15px] leading-[1.45] text-[#9ca2b1]">{desc}</p>
      </div>
      {arrow && <ArrowIcon />}
    </div>
  );
}

function TimelineCard({ month, note, items }) {
  return (
    <div className="relative w-full max-w-[513px] flex gap-11 items-start px-5 py-3 rounded-2xl border border-[#f4f6f8] bg-[#fcfcfc] shadow-[inset_-2px_-2px_2px_0px_rgba(255,255,255,0.3)]">
      <div className="flex flex-col gap-3 items-start pt-3 shrink-0 text-[#121213]">
        <div className="flex gap-1 items-start">
          <p className="font-semibold text-[25px] leading-[1.4] tracking-[-0.5px]">{month}</p>
          <div className="flex flex-col justify-center h-7 w-[14px] text-base leading-[1.45]">
            <p>월</p>
          </div>
        </div>
        {note && <p className="text-base leading-[1.45] text-[#747886]">{note}</p>}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1 items-start">
        {items.map((item) => (
          <TimelineButton key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

function StatusRow({ badgeLabel, badgeClassName, label }) {
  return (
    <div className="flex gap-3 items-center">
      <div className={`flex items-center justify-center gap-1 px-2 py-1 ${badgeClassName}`}>
        <p className="text-[10px] leading-[1.35] tracking-[0.25px]">{badgeLabel}</p>
      </div>
      <p className="text-[15px] font-bold leading-[1.45] text-[#121213]">{label}</p>
    </div>
  );
}

export default function MentitAiCareerPlan({ isSubMenuOpen = true, onCloseSubMenu, subMenu, onNavigateHome }) {
  const [activeQuery, setActiveQuery] = useState('취업 목표 설정');
  const { revealed, isLoading } = useSequentialReveal(8, activeQuery);

  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && <MentitAiSubMenu onClose={onCloseSubMenu} {...subMenu} />}

      <section className="relative flex-1 min-w-0 min-h-0 flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
        <div className="shrink-0 flex items-center px-5 py-6 border-b border-[#e7eaee]">
          <p className="font-bold text-lg tracking-[-0.0036px] text-[#121213]">하반기 취업 타임라인 계획 수립</p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center px-5 pt-10 pb-28">
          <div className="flex flex-col gap-10 items-start w-full max-w-[867px]">
            <div className="self-end bg-[#f9fafb] max-w-[513px] p-3 rounded-xl">
              <p className="text-[15px] leading-[1.6] text-[#121213]">{activeQuery}</p>
            </div>

            {isLoading && <LoadingSymbol size={72} className="self-start shrink-0" />}

            <RevealBlock show={revealed >= 1}>
              <p className="text-[15px] leading-[1.6] text-[#121213]">
                네, 윤영님이 지금까지 준비해오신 내용을 통해 하반기 타임라인을 시기별로 짜봤어요
              </p>
            </RevealBlock>

            <RevealBlock show={revealed >= 2} className="flex flex-col gap-4 items-start">
              <div className="h-px bg-[#e7eaee] w-full" />
              <p className="text-[15px] font-medium leading-[1.45] text-[#121213]">윤영님의 취업 준비 현황</p>
              <div className="flex flex-col gap-4 items-start">
                <StatusRow
                  badgeLabel="완료"
                  badgeClassName="bg-[#f4f6f8] rounded-md text-[#747886]"
                  label="직무 탐색, 멘토 2명 대화 "
                />
                <StatusRow
                  badgeLabel="진행 중"
                  badgeClassName="bg-[rgba(26,117,255,0.1)] rounded-lg text-[#1a75ff]"
                  label="포트폴리오 멘토 피드백 반영하여 보완하기"
                />
                <StatusRow
                  badgeLabel="다음 단계"
                  badgeClassName="bg-[rgba(86,159,255,0.1)] rounded-lg text-[#569fff]"
                  label="채용 지원 → AI 면접 시뮬레이션"
                />
              </div>
            </RevealBlock>

            <RevealBlock show={revealed >= 3} className="flex flex-col gap-5 items-start">
              <div className="h-px bg-[#e7eaee] w-full" />
              <p className="text-[15px] leading-[1.6] text-[#121213]">이렇게 시기별로 나눠서 준비하시면 좋을 것 같아요</p>
            </RevealBlock>

            <RevealBlock show={revealed >= 4}>
              <TimelineCard {...TIMELINE[0]} />
            </RevealBlock>

            <RevealBlock show={revealed >= 5}>
              <TimelineCard {...TIMELINE[1]} />
            </RevealBlock>

            <RevealBlock show={revealed >= 6}>
              <TimelineCard {...TIMELINE[2]} />
            </RevealBlock>

            <RevealBlock show={revealed >= 7}>
              <div className="w-full max-w-[513px] text-[15px] leading-[1.6] text-[#121213]">
                <p>회사별 정확한 전형 일정은 아직 확정 전이라 각 기업 공식 채용 페이지에서 다시 확인하는게 좋아요.</p>
                <ul className="list-disc pl-[1.5em] mt-4">
                  <li>
                    <span className="font-bold underline">토스 프로덕트 디자이너 채용</span>
                  </li>
                  <li>
                    <span className="font-bold underline">카카오 프로덕트 디자이너 채용</span>
                  </li>
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock show={revealed >= 8} className="flex flex-col gap-5 items-start w-full">
              <div className="flex flex-col gap-4 items-start w-full">
                <div className="h-px bg-[#e7eaee] w-full" />
                <div className="w-full max-w-[513px] flex flex-col gap-6 items-start p-6 rounded-2xl bg-white border border-[#f4f6f8] shadow-[0_0_8px_rgba(18,18,19,0.04)]">
                  <div className="flex flex-col gap-3 items-start w-full">
                    <p className="text-[15px] font-bold leading-[1.45] text-[#121213] w-full">
                      홈화면에서 매달 해야 할 취업 준비를 확인할 수 있어요
                    </p>
                    <p className="text-[15px] leading-[1.6] text-[#121213]">
                      윤영님의 준비 상황에 맞춰 이번 7월달 우선적으로 진행하면 좋은 활동을 추천해서 홈화면에 띄워드려요.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="relative w-full flex items-center justify-center px-7 py-3 rounded-xl bg-[#1a75ff] border border-[#70d2ff] shadow-[inset_0_0_4px_rgba(231,243,255,1)] cursor-pointer"
                  >
                    <p className="text-base font-bold leading-[1.45] text-white">홈화면에서 확인하기</p>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start">
                {FOLLOW_UP_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className="relative overflow-hidden bg-white border border-[#e7eaee] rounded-lg px-5 py-2 cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:rounded-lg after:transition-opacity"
                  >
                    <p className="relative text-[15px] font-medium text-[#747886] whitespace-nowrap">{chip}</p>
                  </button>
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex flex-col">
          <div className="flex flex-col items-center px-5 pt-5">
          <PlanTextfield onSubmitQuery={setActiveQuery} />
          </div>
          <div className="h-6 w-full bg-white" aria-hidden />
        </div>
      </section>
    </div>
  );
}
