const imgPortfolioGraphic = 'https://www.figma.com/api/mcp/asset/756213db-1358-42df-aed8-9bf36757e464.png';

export default function PortfolioCard() {
  return (
    <div className="relative flex flex-col gap-3 h-[264px] items-center pt-7 pb-5 px-5 rounded-2xl w-[346px] shrink-0 overflow-hidden mt-[107px]">
      <div className="absolute inset-0 rounded-2xl bg-[#f7fbff]" />
      <img
        alt=""
        src={imgPortfolioGraphic}
        className="absolute inset-0 size-full max-w-none object-bottom rounded-2xl"
      />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-[#f7fbff] to-[10%] to-[rgba(247,251,255,0)]" />
      <div className="absolute inset-0 rounded-2xl shadow-[inset_-8px_-8px_30px_0_rgba(0,175,255,0.04),inset_8px_8px_30px_0_rgba(0,174,255,0.04)] pointer-events-none" />

      <div className="relative flex-1 w-full">
        <p className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px] bg-gradient-to-r from-[#00388c] to-[#121213] bg-clip-text text-transparent">
          멘토 피드백 보고
          <br />
          포트폴리오 보완하러가기
        </p>
      </div>

      <button
        type="button"
        className="relative flex items-center justify-center px-7 py-3 rounded-xl border border-[rgba(255,255,255,0.7)] w-full shadow-[inset_4px_4px_12px_0_rgba(255,255,255,0.5)] overflow-hidden cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#747886] after:opacity-0 hover:after:opacity-10"
      >
        <p className="relative font-bold text-base text-[#00388c] whitespace-nowrap">Yoonie 멘토 피드백 보러가기</p>
      </button>
    </div>
  );
}
