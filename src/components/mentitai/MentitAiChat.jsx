import { useEffect, useRef, useState } from 'react';
import MentitAiSubMenu from './MentitAiSubMenu';
import { MentitAiThreadView, useMentitAiThread } from './MentitAiThread';
import figma_7a7706e1_cc35_4e14_9913_48dfd5adcc5c_svg from '../../assets/figma/7a7706e1-cc35-4e14-9913-48dfd5adcc5c.svg';

const imgSend = figma_7a7706e1_cc35_4e14_9913_48dfd5adcc5c_svg;

function ChatTextfield({ onSubmit, disabled }) {
  const [value, setValue] = useState('');

  const submit = () => {
    const v = value.trim();
    if (!v || disabled) return;
    onSubmit(v);
    setValue('');
  };

  return (
    <div className="flex flex-col items-start w-full max-w-[867px]">
      <div className="relative flex items-center w-full rounded-xl border border-[#e7eaee] bg-white/40 backdrop-blur-[6px] shadow-[inset_4px_4px_12px_rgba(255,255,255,0.5)] px-5 py-3 gap-2">
        <div className="relative flex-1 min-w-0 h-6 flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) submit();
            }}
            placeholder="메세지를 입력해주세요"
            className="w-full bg-transparent text-[15px] leading-[1.6] text-[#121213] placeholder:text-[#9ca2b1] outline-none relative z-[1]"
          />
        </div>
        <button
          type="button"
          onClick={submit}
          className="relative flex items-center justify-center px-5 py-2 rounded-full bg-[#1a75ff] border border-[#70d2ff] shadow-[inset_0_0_4px_rgba(231,243,255,1)] shrink-0 cursor-pointer"
          aria-label="전송"
        >
          <img alt="" src={imgSend} className="size-6" />
        </button>
      </div>
    </div>
  );
}

// 멘팃 AI 홈에서 자유롭게 입력한 질문에 에이전트가 답하는 화면.
export default function MentitAiChat({ initialQuery, isSubMenuOpen = true, onCloseSubMenu, subMenu }) {
  const { thread, isLoading, ask } = useMentitAiThread(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current || !initialQuery) return;
    startedRef.current = true;
    ask(initialQuery);
  }, [initialQuery, ask]);

  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && <MentitAiSubMenu onClose={onCloseSubMenu} {...subMenu} />}

      <section className="relative flex-1 min-w-0 min-h-0 flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
        <div className="shrink-0 flex items-center px-5 py-6 border-b border-[#e7eaee]">
          <p className="font-bold text-lg tracking-[-0.0036px] text-[#121213]">멘팃 AI</p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center px-5 pt-10 pb-28">
          <div className="flex flex-col gap-10 items-start w-full max-w-[867px] break-keep">
            <MentitAiThreadView thread={thread} isLoading={isLoading} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex flex-col">
          <div className="flex flex-col items-center px-5 pt-5">
            <ChatTextfield onSubmit={ask} disabled={isLoading} />
          </div>
          <div className="h-6 w-full bg-white" aria-hidden />
        </div>
      </section>
    </div>
  );
}
