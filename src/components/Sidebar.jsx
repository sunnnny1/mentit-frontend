import { useState } from 'react';

const imgAvatarButton = 'https://www.figma.com/api/mcp/asset/ce94f98e-38a8-43b6-b4b5-cc5fb802e9dc.png';
const imgHome = 'https://www.figma.com/api/mcp/asset/d59476d5-d0bd-4315-a1be-77017219ba57.svg';
const imgHomeActive = 'https://www.figma.com/api/mcp/asset/85fdb3d9-a2e1-4425-9f9b-ba9a93513e79.svg';
const imgChat = 'https://www.figma.com/api/mcp/asset/07f8ee83-82fc-4ee5-ac19-fecb78c2f970.svg';
const imgChatActive = 'https://www.figma.com/api/mcp/asset/6e0646a3-3bfd-4216-98cc-9cc9269a9b83.svg';
const imgVoiceGroup = 'https://www.figma.com/api/mcp/asset/5cd38bc8-209f-4e9d-9e62-13a1390574b3.svg';
const imgAi = 'https://www.figma.com/api/mcp/asset/0f84d59b-23fa-4e0a-ad8e-09bd0fcc1ac6.svg';
const imgPersonPlus = 'https://www.figma.com/api/mcp/asset/e283ddd9-1555-49de-832f-514c6c9f3622.svg';
const imgBoard = 'https://www.figma.com/api/mcp/asset/5297977c-5ef6-4c2a-917d-01299de61789.svg';
const imgBoardActive = 'https://www.figma.com/api/mcp/asset/7f33ef6b-dabb-4a00-9462-4f74c66be344.svg';
const imgChevronDoubleRight = 'https://www.figma.com/api/mcp/asset/10bfebe3-d119-45c2-a259-535f73774024.svg';
const imgLineHorizontal = 'https://www.figma.com/api/mcp/asset/5e2a8321-3b01-4485-9e12-0c84b24bb548.svg';

const NAV_ITEMS = [
  { key: 'home', label: '홈', icon: imgHome, iconActive: imgHomeActive },
  { key: 'chat', label: '채팅', icon: imgChat, iconActive: imgChatActive },
  { key: 'interview', label: '면접', icon: imgVoiceGroup, iconActive: imgVoiceGroup },
  { key: 'ai', label: '멘팃 AI', icon: imgAi, iconActive: imgAi },
  { key: 'mentor', label: '멘토 탐색', icon: imgPersonPlus, iconActive: imgPersonPlus },
  { key: 'board', label: '게시판', icon: imgBoard, iconActive: imgBoardActive },
];

export default function Sidebar({ activeItem, onNavigate, showChatBarToggle = false, onOpenChatBar, onOpenMyPage }) {
  const [internalActive, setInternalActive] = useState('home');
  const active =
    NAV_ITEMS.find((item) => item.key === activeItem || item.label === activeItem)?.key ??
    (activeItem == null ? internalActive : null);

  return (
    <nav
      className={`sticky top-0 z-10 self-stretch h-full min-h-0 bg-white border border-white shadow-[0_0_8px_rgba(18,18,19,0.04)] flex flex-col items-center justify-between pb-6 px-2 rounded-2xl w-[69px] shrink-0 overflow-hidden ${
        showChatBarToggle ? 'pt-6' : 'pt-16'
      }`}
    >
      <div className="flex flex-col items-center">
        {showChatBarToggle && (
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={onOpenChatBar}
              className="flex items-center justify-center size-10 rounded-lg cursor-pointer"
              aria-label="채팅바 열기"
            >
              <img alt="" src={imgChevronDoubleRight} className="size-6" />
            </button>
            <div className="flex items-center justify-center size-[60px]">
              <img alt="" src={imgLineHorizontal} className="w-9 h-6" />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-7 items-center">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setInternalActive(item.key);
                  onNavigate?.(item.key);
                }}
                className="flex flex-col gap-1 items-center justify-center p-2 rounded-lg size-[60px] cursor-pointer"
              >
                {item.key === 'interview' ? (
                  <div className="overflow-clip relative shrink-0 size-6">
                    <div className="absolute inset-[8.33%_18.75%]">
                      <div className="absolute inset-[-5%_-6.67%]">
                        <img alt="" className="block max-w-none size-full" src={item.icon} />
                      </div>
                    </div>
                  </div>
                ) : item.key === 'ai' && isActive ? (
                  <svg
                    aria-hidden="true"
                    className="size-6 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.09018 11.4253C2.58598 11.5898 2.58598 12.4102 3.09018 12.5747C7.51154 14.0167 9.98329 16.4885 11.4253 20.9098C11.5898 21.414 12.4102 21.414 12.5747 20.9098C14.0167 16.4885 16.4885 14.0167 20.9098 12.5747C21.414 12.4102 21.414 11.5898 20.9098 11.4253C16.4885 9.98329 14.0167 7.51154 12.5747 3.09018C12.4102 2.58598 11.5898 2.58598 11.4253 3.09018C9.98329 7.51154 7.51154 9.98329 3.09018 11.4253Z"
                      fill="#1a75ff"
                      stroke="#1a75ff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <img alt="" src={isActive ? item.iconActive : item.icon} className="size-6 shrink-0" />
                )}
                <p
                  className={`text-sm font-medium tracking-[0.14px] whitespace-nowrap ${
                    isActive ? 'text-[#1a75ff] font-bold' : 'text-[#747886]'
                  }`}
                >
                  {item.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <button type="button" onClick={onOpenMyPage} className="relative rounded-full overflow-hidden size-[47px] shrink-0 cursor-pointer">
        <img alt="프로필" src={imgAvatarButton} className="absolute inset-0 size-full object-cover" />
      </button>
    </nav>
  );
}
