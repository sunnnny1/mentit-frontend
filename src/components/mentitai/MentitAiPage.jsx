import { useEffect, useState } from 'react';
import MentitAiSubMenu from './MentitAiSubMenu';

const imgLogo = 'https://www.figma.com/api/mcp/asset/556c2fd1-803d-47a2-b220-548b7e2b8deb.svg';
const imgBackground = 'https://www.figma.com/api/mcp/asset/e9d9e8a2-cf74-4646-ab4c-cfe3b1059510.svg';
const imgSend = 'https://www.figma.com/api/mcp/asset/7a7706e1-cc35-4e14-9913-48dfd5adcc5c.svg';

const SUGGESTED_QUESTIONS = [
  '프로덕트 디자이너의 포트폴리오는 몇 장이 좋을까요?',
  'PM이 실무에서 쓰는 툴은 어떤게 있나요?',
  '프로덕트 디자이너는 실무에서 어떻게 일하나요?',
  '개발자와 어떻게 소통하나요?',
];

const QUICK_ACTIONS = [
  ['멘토 추천', '취업 목표 설정', '기업 추천'],
  ['면접', '포트폴리오', '자기소개서', '프로젝트'],
];

function useRotatingText(items, { displayTime = 2200, transitionTime = 300 } = {}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setVisible(false), displayTime);
    return () => clearTimeout(hideTimer);
  }, [index, displayTime]);

  useEffect(() => {
    if (visible) return undefined;
    const nextTimer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
      setVisible(true);
    }, transitionTime);
    return () => clearTimeout(nextTimer);
  }, [visible, items.length, transitionTime]);

  return { text: items[index], visible };
}

function MentitAiTextfield() {
  const [value, setValue] = useState('');
  const { text, visible } = useRotatingText(SUGGESTED_QUESTIONS, { displayTime: 1700, transitionTime: 220 });

  return (
    <div className="flex flex-col items-start w-full px-5">
      <div className="relative flex items-center w-full rounded-xl border border-[#e7eaee] bg-white/70 shadow-[inset_4px_4px_12px_rgba(255,255,255,0.5)] px-5 py-3 gap-2">
        <div className="relative flex-1 min-w-0 h-6 flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-transparent text-[15px] leading-[1.6] text-[#121213] outline-none relative z-[1]"
          />
          {value === '' && (
            <span
              className={`pointer-events-none absolute left-0 text-[15px] leading-[1.6] text-[#9ca2b1] whitespace-nowrap transition-all duration-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
              }`}
            >
              {text}
            </span>
          )}
        </div>
        <button
          type="button"
          className="flex items-center justify-center size-10 rounded-full bg-[#1a75ff] border border-[#70d2ff] shadow-[inset_0_0_4px_rgba(231,243,255,1)] shrink-0 cursor-pointer"
          aria-label="전송"
        >
          <img alt="" src={imgSend} className="size-6" />
        </button>
      </div>
    </div>
  );
}

function QuickActionButton({ label }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center px-3 py-1.5 rounded-lg border border-[#e7eaee] cursor-pointer"
    >
      <p className="text-[13px] font-normal tracking-[0.26px] text-[#121213] whitespace-nowrap">{label}</p>
    </button>
  );
}

export default function MentitAiPage({ isSubMenuOpen = true, onCloseSubMenu }) {
  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && <MentitAiSubMenu onClose={onCloseSubMenu} />}

      <section className="relative flex-1 min-w-0 min-h-0 flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
        <img
          alt=""
          src={imgBackground}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-110 blur-2xl"
        />

        <div className="relative flex-1 min-h-0 flex flex-col items-center justify-center gap-10 px-5 py-10 overflow-y-auto">
          <div className="flex flex-col gap-4 items-center w-full max-w-[827px]">
            <div className="flex flex-col gap-2 items-center">
              <img alt="" src={imgLogo} className="size-9" />
              <p className="font-medium text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213] text-center whitespace-nowrap">
                멘팃 AI가 취업 준비를 함께 도와드릴게요
              </p>
            </div>
            <p className="text-[14px] leading-[1.58] tracking-[0.14px] text-[#747886] text-center w-full">
              커리어에 대해 무엇이든지 물어보세요 현직자의 데이터를 기반으로 답변을 해드릴게요
            </p>
          </div>

          <div className="flex flex-col gap-10 items-center w-full max-w-[827px]">
            <MentitAiTextfield />

            <div className="flex flex-col gap-2 items-center px-5">
              {QUICK_ACTIONS.map((row, i) => (
                <div key={i} className="flex gap-2 items-center justify-center">
                  {row.map((label) => (
                    <QuickActionButton key={label} label={label} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
