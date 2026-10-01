import figma_52e98eae_8932_4f12_888b_38f3e46a793e_svg from '../../assets/figma/52e98eae-8932-4f12-888b-38f3e46a793e.svg';
import imgPlus from '../../assets/figma/icon-plus.svg';

const imgCollapse = figma_52e98eae_8932_4f12_888b_38f3e46a793e_svg;

export const DEFAULT_INTERVIEW_TITLE = '카카오 UX 디자이너 직무 실전 면접';

const THREADS = [{ name: 'Sunny', disabled: false }];

export default function InterviewSubMenu({
  onClose,
  activeMentor = 'Sunny',
  onSelectMentor,
  onFindMentor,
  interviewTitle,
  showRecentInterviews = false,
}) {
  const sunnyTitle = interviewTitle?.trim() || DEFAULT_INTERVIEW_TITLE;

  return (
    <aside className="relative z-[1] bg-white shadow-[0_0_8px_rgba(18,18,19,0.04)] flex flex-col items-start rounded-2xl w-[246px] h-full min-h-0 shrink-0">
      <div className="flex flex-col gap-10 items-start w-full min-h-0 flex-1 overflow-y-auto px-5 py-8 rounded-2xl">
        <div className="flex flex-col gap-5 items-start w-full">
          <button type="button" onClick={onClose} className="size-5 cursor-pointer" aria-label="채팅바 여닫기">
            <img alt="" src={imgCollapse} className="size-5" />
          </button>
          <p className="font-bold text-[15px] leading-[1.6] text-[#121213]">면접</p>
        </div>

        <div className="flex flex-col gap-3 items-start w-full">
          <p className="font-medium text-sm tracking-[0.14px] text-[#747886] w-full">새 면접</p>
          <button type="button" onClick={onFindMentor} className="flex gap-1 items-center w-full min-w-0 cursor-pointer">
            <img alt="" src={imgPlus} className="size-4 shrink-0" />
            <p className="min-w-0 flex-1 font-normal text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886] truncate text-left">
              새 멘토 찾기
            </p>
          </button>
        </div>

        <div className="flex flex-col gap-3 items-start w-full min-w-0">
          <p className="font-medium text-sm tracking-[0.14px] text-[#747886]">최근 면접 피드백</p>
          {showRecentInterviews && (
            <div className="flex flex-col gap-1 items-start w-full min-w-0">
              {THREADS.map((thread) => {
                const title = thread.title ?? sunnyTitle;
                const isActive = !thread.disabled && activeMentor === thread.name;
                const content = (
                  <>
                    <span
                      className={`block w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-left font-medium text-[15px] leading-[1.45] ${
                        isActive ? 'text-[#121213]' : 'text-[#747886]'
                      }`}
                    >
                      {title}
                    </span>
                    <span className="block w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-left text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">
                      {thread.name}
                    </span>
                  </>
                );

                if (thread.disabled) {
                  return (
                    <div
                      key={thread.name}
                      className="flex flex-col gap-1 items-start min-w-0 overflow-hidden p-3 rounded-xl w-full bg-white"
                      aria-disabled="true"
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <button
                    key={thread.name}
                    type="button"
                    onClick={() => onSelectMentor?.(thread.name)}
                    className={`flex flex-col gap-1 items-start min-w-0 overflow-hidden p-3 rounded-xl w-full cursor-pointer ${
                      isActive ? 'bg-[#f9fafb]' : 'bg-white'
                    }`}
                  >
                    {content}
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
