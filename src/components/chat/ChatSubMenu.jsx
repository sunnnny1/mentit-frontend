import { useState } from 'react';

const imgCollapse = "https://www.figma.com/api/mcp/asset/7593cb7f-18f9-440f-a8bf-fc9df3b74e55.svg";
const imgPin = "https://www.figma.com/api/mcp/asset/59578afb-163a-4f72-b0d6-fb2747b379c9.svg";

const MENTORS = [
  { name: 'Yoonie', unread: 0 },
  { name: 'Sunny', unread: 2 },
  { name: 'Eunoia', unread: 1 },
];

export default function ChatSubMenu({ onClose, activeMentor, onSelectMentor }) {
  const [tab, setTab] = useState('chat');

  return (
    <aside className="bg-white shadow-[0_0_8px_rgba(18,18,19,0.04)] flex flex-col items-start px-5 py-6 rounded-2xl w-[246px] h-full min-h-0 shrink-0 overflow-hidden">
      <div className="flex flex-col gap-10 items-start w-full min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 items-start w-full">
          <button type="button" onClick={onClose} className="size-6 cursor-pointer" aria-label="채팅바 여닫기">
            <img alt="" src={imgCollapse} className="size-6" />
          </button>

          <div className="flex items-center p-0.5 rounded-lg w-full bg-[#f4f6f8]">
            <button
              type="button"
              onClick={() => setTab('chat')}
              className={`flex-1 flex items-center justify-center px-7 py-[6px] rounded-lg text-sm font-medium tracking-[0.14px] cursor-pointer ${
                tab === 'chat' ? 'bg-white text-[#121213] shadow-[0_0_8px_rgba(18,18,19,0.04)]' : 'text-[#9ca2b1]'
              }`}
            >
              채팅
            </button>
            <button
              type="button"
              onClick={() => setTab('feedback')}
              className={`flex-1 flex items-center justify-center px-7 py-[6px] rounded-lg text-sm font-medium tracking-[0.14px] cursor-pointer ${
                tab === 'feedback' ? 'bg-white text-[#121213] shadow-[0_0_8px_rgba(18,18,19,0.04)]' : 'text-[#9ca2b1]'
              }`}
            >
              피드백
            </button>
          </div>
        </div>

        {tab === 'chat' ? (
          <>
            <div className="flex flex-col gap-3 items-start w-full">
              <p className="font-medium text-sm tracking-[0.14px] text-[#747886] w-full">고정</p>
              <div className="flex gap-1 items-center w-full">
                <img alt="" src={imgPin} className="size-5" />
                <p className="flex-1 font-medium text-[13px] tracking-[0.26px] text-[#9ca2b1]">드래그해서 고정하기</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 items-start w-full">
              <p className="font-medium text-sm tracking-[0.14px] text-[#747886]">최근 멘토와의 메세지</p>
              <div className="flex flex-col gap-1 items-start w-full">
                {MENTORS.map((mentor) => {
                  const isActive = activeMentor === mentor.name;
                  return (
                    <button
                      key={mentor.name}
                      type="button"
                      onClick={() => onSelectMentor?.(mentor.name)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl w-full cursor-pointer ${
                        isActive ? 'bg-[#f9fafb]' : 'bg-white'
                      }`}
                    >
                      <span className="flex-1 text-left font-medium text-[15px] leading-[1.45] text-[#121213] truncate">
                        {mentor.name}
                      </span>
                      {mentor.unread > 0 && (
                        <span className="flex items-center justify-center h-7 w-[30px] rounded-[14px] bg-[#f4f6f8] text-[13px] font-medium tracking-[0.26px] text-[#121213]">
                          {mentor.unread}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-[#9ca2b1] tracking-[0.14px]">아직 받은 피드백이 없어요.</p>
        )}
      </div>
    </aside>
  );
}
