import figma_52e98eae_8932_4f12_888b_38f3e46a793e_svg from '../../assets/figma/52e98eae-8932-4f12-888b-38f3e46a793e.svg';
import imgPlus from '../../assets/figma/icon-plus.svg';

const imgCollapse = figma_52e98eae_8932_4f12_888b_38f3e46a793e_svg;

export default function MentitAiSubMenu({
  onClose,
  recentConversations = [],
  activeConversationId = null,
  onSelectConversation,
}) {
  return (
    <aside className="bg-white shadow-[0_0_8px_rgba(18,18,19,0.04)] flex flex-col items-start px-5 py-8 rounded-2xl w-[246px] h-full min-h-0 shrink-0 overflow-hidden">
      <div className="flex flex-col gap-10 items-start w-full min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-5 items-start w-full">
          <button type="button" onClick={onClose} className="size-5 cursor-pointer" aria-label="채팅바 여닫기">
            <img alt="" src={imgCollapse} className="size-5" />
          </button>
          <p className="font-bold text-[15px] leading-[1.6] text-[#121213]">멘팃 AI</p>
        </div>

        <div className="flex flex-col gap-3 items-start w-full">
          <p className="font-medium text-sm tracking-[0.14px] text-[#747886] w-full">새 대화</p>
          <button
            type="button"
            onClick={() => onSelectConversation?.(null)}
            className="flex gap-1 items-center w-full cursor-pointer"
          >
            <img alt="" src={imgPlus} className="size-4" />
            <p className="font-normal text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">새 대화 시작</p>
          </button>
        </div>

        <div className="flex flex-col gap-3 items-start w-full">
          <p className="font-medium text-sm tracking-[0.14px] text-[#747886]">최근 대화</p>
          {recentConversations.length > 0 && (
            <div className="flex flex-col gap-1 items-start w-full">
              {recentConversations.map((conversation) => {
                const isActive = activeConversationId === conversation.id;
                return (
                  <button
                    key={conversation.id}
                    type="button"
                    onClick={() => onSelectConversation?.(conversation)}
                    className={`flex items-center gap-1 p-3 rounded-xl w-full cursor-pointer ${
                      isActive ? 'bg-[#f9fafb]' : 'bg-white'
                    }`}
                  >
                    <span
                      className={`flex-1 text-left font-medium text-[15px] leading-[1.45] truncate ${
                        isActive ? 'text-[#121213]' : 'text-[#747886]'
                      }`}
                    >
                      {conversation.title}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
