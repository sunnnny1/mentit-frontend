import { useState } from 'react';

import imgAvatarButton from '../assets/icons/avatar.webp';
import imgHome from '../assets/icons/home-inactive.svg';
import imgHomeActive from '../assets/icons/home-active.svg';
import imgChat from '../assets/icons/chat-inactive.svg';
import imgChatActive from '../assets/icons/chat-active.svg';
import imgAi from '../assets/icons/ai-inactive.svg';
import imgPersonPlus from '../assets/icons/person-plus-inactive.svg';
import imgPersonPlusActive from '../assets/icons/person-plus-active.svg';
import imgBoard from '../assets/icons/board-inactive.svg';
import imgBoardActive from '../assets/icons/board-active.svg';
import figma_10bfebe3_d119_45c2_a259_535f73774024_svg from '../assets/figma/10bfebe3-d119-45c2-a259-535f73774024.svg';
import figma_5e2a8321_3b01_4485_9e12_0c84b24bb548_svg from '../assets/figma/5e2a8321-3b01-4485-9e12-0c84b24bb548.svg';
const imgChevronDoubleRight = figma_10bfebe3_d119_45c2_a259_535f73774024_svg;
const imgLineHorizontal = figma_5e2a8321_3b01_4485_9e12_0c84b24bb548_svg;

const NAV_ITEMS = [
  { key: 'home', label: '홈', icon: imgHome, iconActive: imgHomeActive },
  { key: 'chat', label: '채팅', icon: imgChat, iconActive: imgChatActive },
  { key: 'interview', label: '면접', icon: null, iconActive: null },
  { key: 'ai', label: '멘팃 AI', icon: imgAi, iconActive: imgAi },
  { key: 'mentor', label: '멘토 탐색', icon: imgPersonPlus, iconActive: imgPersonPlusActive },
  { key: 'board', label: '게시판', icon: imgBoard, iconActive: imgBoardActive },
];

export default function Sidebar({ activeItem, onNavigate, showChatBarToggle = false, onOpenChatBar, onOpenMyPage }) {
  const [internalActive, setInternalActive] = useState('home');
  const active =
    NAV_ITEMS.find((item) => item.key === activeItem || item.label === activeItem)?.key ??
    (activeItem == null ? internalActive : null);

  return (
    <nav
      className={`relative z-10 self-stretch h-full min-h-0 bg-white border border-white shadow-[0_0_8px_rgba(18,18,19,0.04)] flex flex-col items-center justify-between pb-6 px-2 rounded-2xl w-[69px] shrink-0 overflow-hidden ${
        showChatBarToggle ? 'pt-6' : 'pt-16'
      }`}
    >
      <div className="flex flex-col items-center">
        {showChatBarToggle && (
          <div className="flex flex-col items-center w-[60px] h-[100px] shrink-0">
            <button
              type="button"
              onClick={onOpenChatBar}
              className="flex items-center justify-center size-10 rounded-lg cursor-pointer"
              aria-label="채팅바 열기"
            >
              <img alt="" src={imgChevronDoubleRight} className="size-6" />
            </button>
            <div className="flex items-center justify-center w-[60px] h-[60px]">
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
                    <div className="absolute inset-0">
                      <svg
                        aria-hidden="true"
                        className="block size-full overflow-visible"
                        viewBox="0 0 17 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 4.5C12 2.567 10.433 1 8.5 1C6.567 1 5 2.567 5 4.5V11C5 12.933 6.567 14.5 8.5 14.5C10.433 14.5 12 12.933 12 11V4.5Z"
                          fill={isActive ? '#1A75FF' : 'none'}
                          stroke={isActive ? '#1A75FF' : '#747886'}
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 10.5C1 14.642 4.358 18 8.5 18M8.5 18C12.642 18 16 14.642 16 10.5M8.5 18V21"
                          stroke={isActive ? '#1A75FF' : '#747886'}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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
