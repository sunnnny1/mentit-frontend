const DEFAULT_INTRO_BADGES = ['실무 이야기', '자소서 피드백', '포트폴리오 피드백'];

export default function ChatAgentIntro({
  displayName = 'Yoonie',
  badges = DEFAULT_INTRO_BADGES,
  onStartChat,
  onStartFeedback,
}) {
  return (
    <div className="relative z-[1] flex-1 min-w-0 min-h-0 h-full flex flex-col items-center justify-center bg-white px-5 py-7">
      <div className="flex w-full max-w-[375px] flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-6">
          <p className="w-full text-center font-semibold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213]">
            {displayName} 멘토의 AI 에이전트와 대화해보세요
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-start justify-center gap-2">
              {badges.map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-center rounded-lg bg-[#f4f6f8] px-2 py-1"
                >
                  <p className="text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#747886] whitespace-nowrap">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="w-[375px] max-w-full text-center text-[14px] font-normal leading-[1.58] tracking-[0.14px] text-[#747886]">
              궁금한 점은 실제 멘토의 경험과 의사결정 기준을 바탕으로 학습된 AI 에이전트와 먼저 편하게 이야기해보세요.
              <br />더 자세한 도움이 필요하다면 직접 멘토와 대화할 수도 있어요.
            </p>
          </div>
        </div>
        <div className="flex w-full gap-3 items-start">
          <button
            type="button"
            onClick={onStartChat}
            className="relative flex min-w-px flex-1 items-center justify-center overflow-hidden rounded-xl bg-[rgba(26,117,255,0.1)] px-7 py-3 cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
          >
            <span className="relative font-medium text-[16px] leading-[1.45] text-[#1a75ff] whitespace-nowrap">
              채팅하기
            </span>
          </button>
          <button
            type="button"
            onClick={onStartFeedback}
            className="relative flex min-w-px flex-1 items-center justify-center overflow-hidden rounded-xl bg-[rgba(26,117,255,0.1)] px-7 py-3 cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
          >
            <span className="relative font-medium text-[16px] leading-[1.45] text-[#1a75ff] whitespace-nowrap">
              피드백 받기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
