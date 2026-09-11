const imgCollapse = 'https://www.figma.com/api/mcp/asset/52e98eae-8932-4f12-888b-38f3e46a793e.svg';
const imgPin = 'https://www.figma.com/api/mcp/asset/8c5d481c-7337-4561-910a-455ed7cfc8da.svg';

export default function MentitAiSubMenu({ onClose }) {
  return (
    <aside className="bg-white shadow-[0_0_8px_rgba(18,18,19,0.04)] flex flex-col items-start px-5 py-6 rounded-2xl w-[246px] h-full min-h-0 shrink-0 overflow-hidden">
      <div className="flex flex-col gap-10 items-start w-full min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 items-start w-full">
          <button type="button" onClick={onClose} className="size-6 cursor-pointer" aria-label="채팅바 여닫기">
            <img alt="" src={imgCollapse} className="size-6" />
          </button>
          <p className="font-bold text-[15px] leading-[1.6] text-[#121213]">멘팃 AI</p>
        </div>

        <div className="flex flex-col gap-3 items-start w-full">
          <p className="font-medium text-sm tracking-[0.14px] text-[#747886] w-full">고정</p>
          <div className="flex gap-1 items-center w-full">
            <img alt="" src={imgPin} className="size-5" />
            <p className="flex-1 font-medium text-[13px] tracking-[0.26px] text-[#9ca2b1]">드래그해서 고정하기</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-start w-full">
          <p className="font-medium text-sm tracking-[0.14px] text-[#747886]">최근 대화</p>
        </div>
      </div>
    </aside>
  );
}
