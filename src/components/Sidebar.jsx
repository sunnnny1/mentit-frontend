import { useState } from 'react';

const imgAvatarButton = "https://www.figma.com/api/mcp/asset/ce94f98e-38a8-43b6-b4b5-cc5fb802e9dc.png";
const imgHome = "https://www.figma.com/api/mcp/asset/11bac20c-95ce-4b99-b9c7-5f5844fb3fbf.svg";
const imgChat = "https://www.figma.com/api/mcp/asset/91913f2d-1ca0-44c3-ad2c-d8d21f81012f.svg";
const imgVoice = "https://www.figma.com/api/mcp/asset/08312f9a-f275-4027-b4e6-e5758abea082.svg";
const imgAi = "https://www.figma.com/api/mcp/asset/252942b0-28a4-427b-8ff4-b959fec4808c.svg";
const imgPersonPlus = "https://www.figma.com/api/mcp/asset/e6c8ffe9-75d2-46d0-b480-d00c46fac72c.svg";
const imgBoard = "https://www.figma.com/api/mcp/asset/858eb728-be60-42a4-bc1f-62c7a12eb732.svg";

const NAV_ITEMS = [
  { key: 'home', label: '홈', icon: imgHome },
  { key: 'chat', label: '채팅', icon: imgChat },
  { key: 'interview', label: '면접', icon: imgVoice },
  { key: 'ai', label: '멘팃 AI', icon: imgAi },
  { key: 'mentor', label: '멘토 탐색', icon: imgPersonPlus },
  { key: 'board', label: '게시판', icon: imgBoard },
];

export default function Sidebar() {
  const [active, setActive] = useState('home');

  return (
    <nav className="sticky top-0 z-10 bg-white border border-white shadow-[0_0_8px_rgba(18,18,19,0.04)] flex flex-col items-center gap-5 pb-6 pt-16 px-2 rounded-2xl w-[69px] shrink-0">
      <div className="flex flex-col gap-7 items-center">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(item.key)}
              className={`flex flex-col gap-1 items-center justify-center p-2 rounded-lg size-[60px] cursor-pointer ${isActive ? 'bg-white' : ''}`}
            >
              <img alt="" src={item.icon} className="size-6" style={isActive ? { filter: 'invert(35%) sepia(97%) saturate(2000%) hue-rotate(203deg)' } : undefined} />
              <p className={`text-sm font-medium tracking-[0.14px] whitespace-nowrap ${isActive ? 'text-[#1a75ff] font-bold' : 'text-[#747886]'}`}>
                {item.label}
              </p>
            </button>
          );
        })}
      </div>

      <button type="button" className="relative rounded-full overflow-hidden size-[47px] shrink-0 cursor-pointer">
        <img alt="프로필" src={imgAvatarButton} className="absolute inset-0 size-full object-cover" />
      </button>
    </nav>
  );
}
