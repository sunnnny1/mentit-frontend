import { useState } from 'react';
import figma_7593cb7f_18f9_440f_a8bf_fc9df3b74e55_svg from '../../assets/figma/7593cb7f-18f9-440f-a8bf-fc9df3b74e55.svg';
import imgPlus from '../../assets/figma/icon-plus.svg';

const imgCollapse = figma_7593cb7f_18f9_440f_a8bf_fc9df3b74e55_svg;

const MENTORS = ['Yoonie', 'Teddy', 'Eunoia', 'Sunny'];
const SUNNY_FEEDBACK_THREAD = { mentor: 'Sunny', badge: '자기소개서', kind: 'resume', unread: 2 };

export default function ChatSubMenu({
  onClose,
  activeMentor,
  onSelectMentor,
  unreadByMentor = {},
  tab = 'chat',
  onSelectTab,
  feedbackKind = 'portfolio',
  onFindMentor,
}) {
  const [localTab, setLocalTab] = useState('chat');
  const activeTab = onSelectTab ? tab : localTab;
  const setTab = (next) => {
    if (onSelectTab) onSelectTab(next);
    else setLocalTab(next);
  };

  return (
    <aside className="relative z-[1] bg-white shadow-[0_0_8px_rgba(18,18,19,0.04)] flex flex-col items-start rounded-2xl w-[246px] h-full min-h-0 shrink-0">
      <div className="flex flex-col gap-10 items-start w-full min-h-0 flex-1 overflow-y-auto px-5 py-8 rounded-2xl">
        <div className="flex flex-col gap-5 items-start w-full">
          <button type="button" onClick={onClose} className="size-5 cursor-pointer" aria-label="채팅바 여닫기">
            <img alt="" src={imgCollapse} className="size-5" />
          </button>

          <div className="flex items-center p-0.5 rounded-lg w-full bg-[#f4f6f8]">
            <button
              type="button"
              onClick={() => setTab('chat')}
              className={`flex-1 flex items-center justify-center px-7 py-2 rounded-lg text-[15px] font-medium leading-[1.45] cursor-pointer ${
                activeTab === 'chat' ? 'bg-white text-[#121213] shadow-[0_0_8px_rgba(18,18,19,0.04)]' : 'text-[#9ca2b1]'
              }`}
            >
              채팅
            </button>
            <button
              type="button"
              onClick={() => setTab('feedback')}
              className={`flex-1 flex items-center justify-center px-7 py-2 rounded-lg text-[15px] font-medium leading-[1.45] cursor-pointer ${
                activeTab === 'feedback' ? 'bg-white text-[#121213] shadow-[0_0_8px_rgba(18,18,19,0.04)]' : 'text-[#9ca2b1]'
              }`}
            >
              피드백
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-start w-full">
          <p className="font-medium text-sm tracking-[0.14px] text-[#747886] w-full">새 대화</p>
          <button
            type="button"
            onClick={onFindMentor}
            className="flex gap-1 items-center w-full cursor-pointer"
          >
            <img alt="" src={imgPlus} className="size-4" />
            <p className="font-normal text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">새 멘토 찾기</p>
          </button>
        </div>

        <div className="flex flex-col gap-3 items-start w-full">
          <p className="font-medium text-sm tracking-[0.14px] text-[#747886]">최근 멘토와의 메세지</p>
          <div className="flex flex-col gap-1 items-start w-full">
            {activeTab === 'feedback'
              ? [
                  ...(activeMentor === 'Teddy' || activeMentor === 'Eunoia'
                    ? [
                        {
                          mentor: activeMentor,
                          badge: feedbackKind === 'resume' ? '자기소개서' : '포트폴리오',
                          kind: feedbackKind === 'resume' ? 'resume' : 'portfolio',
                        },
                      ]
                    : []),
                  {
                    mentor: 'Yoonie',
                    badge: feedbackKind === 'resume' ? '자기소개서' : '포트폴리오',
                    kind: feedbackKind === 'resume' ? 'resume' : 'portfolio',
                  },
                  SUNNY_FEEDBACK_THREAD,
                ].map((thread) => {
                  const isActive = activeMentor === thread.mentor && feedbackKind === thread.kind;
                  const unread = thread.unread ?? unreadByMentor[thread.mentor] ?? 0;
                  return (
                    <button
                      key={`${thread.mentor}-${thread.kind}`}
                      type="button"
                      onClick={() => onSelectMentor?.(thread.mentor, { feedbackKind: thread.kind })}
                      className={`flex items-center gap-2 p-3 rounded-xl w-full cursor-pointer ${
                        isActive ? 'bg-[#f9fafb]' : 'bg-white'
                      }`}
                    >
                      <span
                        className={`font-medium text-[15px] leading-[1.45] shrink-0 ${
                          isActive ? 'text-[#121213]' : 'text-[#747886]'
                        }`}
                      >
                        {thread.mentor}
                      </span>
                      <span className="flex items-center justify-center px-2 py-1 rounded-lg bg-[#f4f6f8] text-[12px] font-medium tracking-[0.3px] text-[#747886] shrink-0">
                        {thread.badge}
                      </span>
                      {unread > 0 && (
                        <span className="ml-auto flex items-center justify-center h-7 w-[30px] rounded-[14px] bg-[#f4f6f8] text-[13px] font-medium tracking-[0.26px] text-[#121213]">
                          {unread}
                        </span>
                      )}
                    </button>
                  );
                })
              : MENTORS.map((mentor) => {
                  const isActive = activeMentor === mentor;
                  const unread = unreadByMentor[mentor] ?? 0;
                  return (
                    <button
                      key={mentor}
                      type="button"
                      onClick={() => onSelectMentor?.(mentor)}
                      className={`flex items-center gap-1 p-3 rounded-xl w-full cursor-pointer ${
                        isActive ? 'bg-[#f9fafb]' : 'bg-white'
                      }`}
                    >
                      <span
                        className={`flex-1 text-left font-medium text-[15px] leading-[1.45] truncate ${
                          isActive ? 'text-[#121213]' : 'text-[#747886]'
                        }`}
                      >
                        {mentor}
                      </span>
                      {unread > 0 && (
                        <span className="flex items-center justify-center h-7 w-[30px] rounded-[14px] bg-[#f4f6f8] text-[13px] font-medium tracking-[0.26px] text-[#121213]">
                          {unread}
                        </span>
                      )}
                    </button>
                  );
                })}
          </div>
        </div>
      </div>
    </aside>
  );
}
