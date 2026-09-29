import imgPortfolioBg from '../assets/figma/portfolio-card-bg.png';

export default function PortfolioCard({ onOpenFeedback }) {
  return (
    <div className="relative flex w-[346px] shrink-0 flex-col items-start pb-4 mt-[97px]">
      <div className="relative flex h-[262px] w-full flex-col items-center gap-3 overflow-hidden rounded-2xl px-5 pb-5 pt-7">
        <img
          alt=""
          src={imgPortfolioBg}
          className="pointer-events-none absolute inset-0 h-full w-full rounded-2xl object-cover"
        />

        <div className="relative flex h-[157px] w-full flex-col items-start gap-2">
          <p className="w-full bg-gradient-to-r from-[#00388c] to-[#121213] bg-clip-text text-[22px] font-bold leading-[1.4] tracking-[-0.33px] text-transparent">
            포트폴리오 보완하기
          </p>
          <p className="w-full text-sm font-normal leading-[1.58] tracking-[0.14px] text-[#121213]">
            Yoonie 멘토에게 요청했던
            <br />
            포트폴리오 피드백이 도착했어요
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenFeedback}
          className="relative z-10 flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/70 bg-white/55 px-7 py-3 cursor-pointer"
        >
          <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_4px_4px_12px_0_rgba(255,255,255,0.4)]" />
          <p className="relative text-base font-bold leading-[1.45] text-[#00388c] whitespace-nowrap">Yoonie 멘토 피드백 보러가기</p>
        </button>
      </div>
    </div>
  );
}
