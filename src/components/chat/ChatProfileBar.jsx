const imgAvatarAgent = "https://www.figma.com/api/mcp/asset/6a21ef36-23ee-448e-a72f-026bd1b11241.png";
const imgAvatarMentor = "https://www.figma.com/api/mcp/asset/1b69a9c3-f6dc-419e-8b7e-4073ed4858c7.png";

export default function ChatProfileBar({ mode = 'agent', onStartMentorChat, onStartReview }) {
  return (
    <div className="flex gap-2.5 items-center p-5 rounded-t-2xl bg-white shrink-0">
      <div className="flex-1 flex gap-3 items-center min-w-0">
        <img
          alt="Yoonie"
          src={mode === 'agent' ? imgAvatarAgent : imgAvatarMentor}
          className="size-[60px] rounded-full shrink-0 object-cover"
        />
        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <div className="flex gap-2 items-center">
            <p className="font-bold text-lg tracking-[-0.0036px] text-[#121213] whitespace-nowrap">
              {mode === 'agent' ? 'Yoonie (AI Agent)' : 'Yoonie (최윤희)'}
            </p>
            <div className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
              <div className="absolute inset-0 bg-[#9054ff] opacity-10 rounded-lg" />
              <p className="relative text-[10px] tracking-[0.25px] text-[#9054ff] whitespace-nowrap">Active Mentor</p>
            </div>
          </div>
          <p className="text-sm text-[#747886] tracking-[0.14px] whitespace-nowrap">프로덕트 디자이너 ・ 당근 ・ 5년차</p>
        </div>
      </div>
      <button
        type="button"
        onClick={
          mode === 'agent' ? onStartMentorChat : mode === 'mentor' ? onStartReview : undefined
        }
        className="relative flex items-center justify-center px-7 py-3 rounded-xl border border-[#70d2ff] bg-[#1a75ff] shadow-[inset_0_0_4px_0_#e7f3ff] overflow-hidden cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#747886] after:opacity-0 hover:after:opacity-10"
      >
        {/* TODO: 리뷰 제출 로직 연결 */}
        <p className="relative font-bold text-base text-white whitespace-nowrap">
          {mode === 'review' ? '리뷰 등록하기' : mode === 'mentor' ? '리뷰 쓰러가기' : '멘토와 채팅하기'}
        </p>
      </button>
    </div>
  );
}
