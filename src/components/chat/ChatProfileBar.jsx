export default function ChatProfileBar({
  mode = 'agent',
  displayName = 'Yoonie',
  mentorDisplayName = 'Yoonie (최윤희)',
  role = '프로덕트 디자이너 ・ 당근 ・ 5년차',
  badgeLabel = 'Active Mentor',
  badgeColor = '#9054ff',
  profileAvatar,
  mentorAvatar,
  supportsMentorReview = true,
  onStartMentorChat,
  onStartReview,
  onSubmitReview,
  extraActionLabel,
  onExtraAction,
}) {
  const showActionButton = Boolean(extraActionLabel) || mode !== 'agent' || supportsMentorReview;

  return (
    <div className="flex gap-2.5 items-center p-5 rounded-t-2xl bg-white shrink-0">
      <div className="flex-1 flex gap-3 items-center min-w-0">
        <img
          alt={displayName}
          src={mode === 'agent' ? profileAvatar : mentorAvatar}
          className="size-[60px] rounded-full shrink-0 object-cover"
        />
        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <div className="flex gap-2 items-center">
            <p className="font-bold text-lg tracking-[-0.0036px] text-[#121213] whitespace-nowrap">
              {mode === 'agent' ? `${displayName} (AI Agent)` : mentorDisplayName}
            </p>
            <div className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
              <div className="absolute inset-0 opacity-10 rounded-lg" style={{ backgroundColor: badgeColor }} />
              <p className="relative text-[10px] tracking-[0.25px] whitespace-nowrap" style={{ color: badgeColor }}>
                {badgeLabel}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#747886] tracking-[0.14px] whitespace-nowrap">{role}</p>
        </div>
      </div>
      {showActionButton && extraActionLabel ? (
        <button
          type="button"
          onClick={onExtraAction}
          className="relative flex items-center justify-center px-7 py-3 rounded-xl border border-[#e7eaee] bg-white overflow-hidden cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
        >
          <p className="relative font-medium text-base text-[#121213] whitespace-nowrap">{extraActionLabel}</p>
        </button>
      ) : showActionButton ? (
        <button
          type="button"
          onClick={
            mode === 'agent' ? onStartMentorChat : mode === 'mentor' ? onStartReview : onSubmitReview
          }
          className="relative flex items-center justify-center px-7 py-3 rounded-xl border border-[#70d2ff] bg-[#1a75ff] shadow-[inset_0_0_4px_0_#e7f3ff] overflow-hidden cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#747886] after:opacity-0 hover:after:opacity-10"
        >
          {/* TODO: 실제 리뷰 데이터 서버 제출 로직 연결 (현재는 홈으로 이동만 처리) */}
          <p className="relative font-bold text-base text-white whitespace-nowrap">
            {mode === 'review' ? '리뷰 등록하기' : mode === 'mentor' ? '리뷰 쓰러가기' : '멘토와 채팅하기'}
          </p>
        </button>
      ) : null}
    </div>
  );
}
