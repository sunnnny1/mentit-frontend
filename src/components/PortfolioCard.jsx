export default function PortfolioCard() {
  return (
    <div className="relative flex flex-col gap-3 h-[264px] items-center p-5 rounded-[20px] w-[346px] shrink-0 overflow-hidden mt-[107px]">
      <div
        className="absolute inset-0 rounded-[20px]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #569fff 0%, #7ab8ff 50%, #9ed0ff 100%)',
        }}
      />
      <div className="absolute inset-0 rounded-[20px] shadow-[inset_-8px_-8px_30px_0_rgba(0,175,255,0.4),inset_8px_8px_30px_0_rgba(0,174,255,0.4)] pointer-events-none" />

      <div className="relative flex flex-col gap-3 flex-1 w-full text-white [text-shadow:1px_1px_4px_rgba(84,190,255,0.6)]">
        <p className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px]">포트폴리오 보완하기</p>
        <p className="font-medium text-[15px] leading-[1.45]">
          멘토에게 요청했던 포트폴리오 피드백이 도착했어요. 피드백에 따라 포트폴리오를 보완 해볼까요?
        </p>
      </div>

      <button
        type="button"
        className="relative flex items-center justify-center px-7 py-3 rounded-xl border border-[rgba(255,255,255,0.4)] w-full shadow-[inset_4px_4px_12px_0_rgba(255,255,255,0.5)] cursor-pointer"
      >
        <p className="font-bold text-base text-white whitespace-nowrap">Yoonie 멘토 피드백 보러가기</p>
      </button>
    </div>
  );
}
