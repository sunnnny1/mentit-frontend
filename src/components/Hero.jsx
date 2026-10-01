import imgChevronRight from '../assets/icons/chevron-right.svg';
import imgTicksWeek1 from '../assets/figma/home-ticks-week1.svg';
import imgTicksWeekMid from '../assets/figma/home-ticks-week-mid.svg';
import imgTicksWeek4 from '../assets/figma/home-ticks-week4.svg';

function ChevronLink({ text, onClick }) {
  return (
    <button type="button" onClick={onClick} className="flex gap-0.5 items-center shrink-0 cursor-pointer">
      <p className="font-medium text-sm tracking-[0.14px] text-[#9ca2b1] whitespace-nowrap">{text}</p>
      <img alt="" src={imgChevronRight} className="size-6" />
    </button>
  );
}

function ActivityBadge({ label }) {
  return (
    <div className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
      <div className="absolute inset-0 bg-[#1a75ff] opacity-10 rounded-lg" />
      <p className="relative font-medium text-xs tracking-[0.3px] text-[#1a75ff] whitespace-nowrap leading-[1.35]">{label}</p>
    </div>
  );
}

const ACTIVITY_CARDS = [
  { count: '40번', label: '앱 내 활동' },
  { count: '27번', label: '채팅' },
  { count: '12번', label: '피드백' },
  { count: '4번', label: '면접 준비' },
];

export default function Hero({ onOpenMentitAI } = {}) {
  return (
    <section className="flex flex-col gap-16 items-start w-full">
      <h1 className="font-bold text-[32px] leading-[1.4] tracking-[-0.8px] bg-gradient-to-r from-[#00388c] to-[#121213] bg-clip-text text-transparent whitespace-nowrap">
        윤영님, 오늘도 멘팃과 한 걸음 내디뎌볼까요?
      </h1>

      <div className="flex w-full flex-col gap-10 items-start">
        <div className="grid grid-cols-4 gap-x-20 w-full">
          {ACTIVITY_CARDS.map((card) => (
            <div key={card.label} className="flex gap-3 items-start shrink-0">
              <p className="font-semibold text-[28px] tracking-[-0.7px] text-[#121213] whitespace-nowrap">{card.count}</p>
              <ActivityBadge label={card.label} />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 items-start px-1 w-full max-w-[769px]">
          <div className="flex gap-7 items-end w-full">
            <div className="flex-1 flex items-center justify-between min-w-0">
              <div className="flex flex-col gap-1 justify-center">
                <p className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213] whitespace-nowrap">이번달 목표</p>
                <p className="font-medium text-base leading-[1.45] text-[#747886] whitespace-nowrap">공고에 적합한 서류 지원 준비하기</p>
              </div>
            </div>
            <ChevronLink text="멘팃 AI와 다시 계획하기" onClick={onOpenMentitAI} />
          </div>

          <div className="relative w-full">
            <div className="flex gap-[19px] items-center pt-[27px]">
              <div className="flex w-[240px] shrink-0 flex-col gap-2 items-center">
                <p className="h-[18px] w-full text-center text-xs font-medium leading-[1.35] tracking-[0.3px] text-[#747886]">1주차</p>
                <img alt="" src={imgTicksWeek1} className="block shrink-0" />
                <p className="w-[216px] text-center text-xs font-medium leading-[1.35] tracking-[0.3px] text-[#9ca2b1]">기업 탐색</p>
              </div>
              <div className="flex w-[240px] shrink-0 flex-col items-center">
                <img alt="" src={imgTicksWeekMid} className="block shrink-0" />
              </div>
              <div className="flex w-[241px] shrink-0 flex-col gap-2 items-center">
                <p className="h-[18px] w-full text-center text-xs font-medium leading-[1.35] tracking-[0.3px] text-[#747886]">4주차</p>
                <img alt="" src={imgTicksWeek4} className="block shrink-0" />
                <p className="w-[216px] text-center text-xs font-medium leading-[1.35] tracking-[0.3px] text-[#121213]">자기소개서 보완</p>
              </div>
            </div>

            <div className="absolute left-1/2 top-0 z-10 flex w-[243px] -translate-x-1/2 flex-col items-center gap-2">
              <p className="h-[18px] w-full text-center text-xs font-medium leading-[1.35] tracking-[0.3px] text-[#121213]">2-3주차 (현재)</p>
              <div className="flex w-full items-center gap-1.5 bg-[#fcfcfc]">
                <div className="h-6 w-px shrink-0 bg-[#121213]" />
                <div className="flex h-[74px] flex-1 min-w-0 flex-col items-center justify-center gap-1 rounded-[40px] bg-white px-5 py-3 shadow-[0_0_10px_rgba(0,0,0,0.04),inset_-2px_-2px_2px_0_rgba(255,255,255,0.3)]">
                  <p className="text-base font-bold leading-[1.45] text-[#121213] whitespace-nowrap">포트폴리오 보완</p>
                  <p className="text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#747886] whitespace-nowrap">
                    Yoonie 멘토에게 피드백 받는 중
                  </p>
                </div>
                <div className="h-6 w-px shrink-0 bg-[#121213]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
