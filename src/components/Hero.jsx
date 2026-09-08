const imgChevronRight = "https://www.figma.com/api/mcp/asset/7b97a683-09d8-496a-8c97-4fe4aeb0759f.svg";
const imgActivitiesIconRow = "https://www.figma.com/api/mcp/asset/4f12ce7a-f471-4e1e-9573-87309fff7ab5.svg";
const imgSupportActivities = "https://www.figma.com/api/mcp/asset/ddc91c6f-1c7c-4218-a8ed-be3f45f55183.svg";
const imgApplicationIcons = "https://www.figma.com/api/mcp/asset/79a01f35-62db-4a40-8491-7b4dd06cc2c0.svg";

function ChevronLink({ text }) {
  return (
    <button type="button" className="flex gap-0.5 items-center shrink-0 cursor-pointer">
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

export default function Hero() {
  return (
    <section className="flex flex-col gap-16 items-start w-full">
      <h1 className="font-bold text-[32px] leading-[1.4] tracking-[-0.8px] bg-gradient-to-r from-[#00388c] to-[#121213] bg-clip-text text-transparent whitespace-nowrap">
        윤영님, 오늘도 멘팃과 한 걸음 내디뎌볼까요?
      </h1>

      <div className="grid grid-cols-4 gap-x-20 w-full">
        {ACTIVITY_CARDS.map((card) => (
          <div key={card.label} className="flex gap-3 items-start shrink-0">
            <p className="font-semibold text-[28px] tracking-[-0.7px] text-[#121213] whitespace-nowrap">{card.count}</p>
            <ActivityBadge label={card.label} />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-7 items-start px-1 w-full max-w-[769px]">
        <div className="flex gap-7 items-end w-full">
          <div className="flex-1 flex items-center justify-between min-w-0">
            <div className="flex flex-col gap-1 justify-center">
              <p className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213] whitespace-nowrap">이번주 목표</p>
              <p className="font-medium text-base leading-[1.45] text-[#747886] whitespace-nowrap">카카오 프로덕트 디자이너 지원까지 D-7</p>
            </div>
          </div>
          <ChevronLink text="멘팃 AI와 다시 계획하기" />
        </div>

        <div className="relative h-[55px] w-full rounded-full shadow-[0_0_30px_rgba(0,0,0,0.04)]">
          <div className="absolute inset-0 bg-[rgba(222,250,255,0.4)] rounded-full" />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_-10px_-10px_10px_0_rgba(255,255,255,0.9),inset_10px_10px_10px_0_rgba(255,255,255,0.9)] pointer-events-none" />
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-5">
            <div className="flex flex-col items-center gap-0">
              <img alt="" src={imgActivitiesIconRow} className="w-[232px] h-[22px]" />
              <p className="text-[13px] font-medium tracking-[0.26px] text-[#747886] text-center whitespace-nowrap">기업 탐색</p>
            </div>
            <img alt="" src={imgSupportActivities} className="w-[220px] h-[22px]" />
            <div className="flex flex-col items-center gap-0">
              <img alt="" src={imgApplicationIcons} className="w-[232px] h-[22px]" />
              <p className="text-[13px] font-medium tracking-[0.26px] text-[#747886] text-center whitespace-nowrap">서류 지원</p>
            </div>
          </div>
          <div className="absolute left-[265px] top-1/2 -translate-y-1/2 flex flex-col gap-1 items-center justify-center px-5 py-3 rounded-[40px] w-[237px] bg-[rgba(255,255,255,0.7)] shadow-[inset_-2px_-2px_2px_0_rgba(255,255,255,0.3)]">
            <p className="font-bold text-base text-[#121213] whitespace-nowrap">포트폴리오 보완</p>
            <p className="text-[13px] font-medium tracking-[0.26px] text-[#747886] whitespace-nowrap">Yoonie 멘토에게 피드백 받는중</p>
          </div>
        </div>
      </div>
    </section>
  );
}
