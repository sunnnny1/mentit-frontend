import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import imgArrowReturn from '../../assets/figma/17f9d712-2e3f-40ca-b059-cb541a5f2605.svg';
import imgMentionReply from '../../assets/figma/2f29faf6-83cf-4170-8d7b-8d2ec303a92c.svg';
import imgSend from '../../assets/figma/70a5b9f2-c5bb-45a9-9836-1ccc8ad917e2.svg';

export function ChatInputField({ inputRef, value, onChange, onSubmit, placeholder }) {
  return (
    <div className="relative flex items-center gap-2 px-5 py-3 rounded-xl w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl border border-[#e7eaee] bg-[rgba(255,255,255,0.4)] backdrop-blur-[6px] shadow-[inset_4px_4px_12px_0_rgba(255,255,255,0.5)]"
      />
      <div className="relative flex flex-1 min-w-0">
        <textarea
          ref={inputRef}
          value={value}
          rows={1}
          aria-label={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
            e.target.style.height = '24px';
            e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`;
          }}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
          className="w-full h-6 max-h-24 py-0 resize-none bg-transparent outline-none text-[15px] leading-6 text-[#121213]"
        />
        {/* Native textarea placeholders get partially repainted in Chrome right after the
            value is cleared (only the old text's width shows), so draw it as a real node. */}
        {value === '' ? (
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 max-w-full truncate text-[15px] leading-6 text-[#9ca2b1]"
          >
            {placeholder}
          </span>
        ) : null}
      </div>
      <button
        type="submit"
        className="relative flex items-center justify-center px-5 py-2 rounded-full border border-[#70d2ff] bg-[#1a75ff] overflow-hidden shrink-0 cursor-pointer shadow-[inset_0_0_4px_0_#e7f3ff]"
        aria-label="전송"
      >
        <img alt="" src={imgSend} className="relative size-6" />
      </button>
    </div>
  );
}

export function MentionQuote({ name, text }) {
  return (
    <div className="flex items-start gap-2 min-w-0 w-full">
      <img alt="" src={imgArrowReturn} className="size-6 shrink-0 mt-0.5" />
      <div className="min-w-0 flex-1 border-l-2 border-[#e7eaee] pl-2 py-0.5">
        <p className="font-medium text-[12px] leading-[1.35] tracking-[0.3px] text-[#747886]">{name}</p>
        <p className="font-normal text-[13px] leading-[1.4] tracking-[0.26px] text-[#9ca2b1] line-clamp-2">{text}</p>
      </div>
    </div>
  );
}

export function MentionComposerQuote({ name, text, onCancel }) {
  return (
    <div className="mb-1 flex w-full items-start gap-2 rounded-2xl bg-[#f9fafb] px-5 py-4">
      <img alt="" src={imgArrowReturn} className="shrink-0 max-w-none" />
      <div className="w-px self-stretch bg-[#e7eaee]" />
      <div className="min-w-0 flex-1 flex flex-col gap-2 text-[#747886]">
        <p className="font-normal text-[13px] leading-[1.4] tracking-[0.26px]">{name}</p>
        <p className="font-light text-[13px] leading-[1.5] tracking-[0.26px] line-clamp-2">{text}</p>
      </div>
      <button
        type="button"
        aria-label="언급 취소"
        onClick={onCancel}
        className="shrink-0 size-6 flex items-center justify-center text-[16px] leading-none text-[#9ca2b1] cursor-pointer"
      >
        ×
      </button>
    </div>
  );
}

export function MentionableBubble({
  maxWidthClass = '',
  className = '',
  style,
  children,
  onMention,
  mentionLabel = '이 답변 언급하기',
}) {
  return (
    <div className="relative flex items-end w-fit max-w-full pr-7 group/bubble">
      <div className={`rounded-[12px] p-[12px] w-fit ${maxWidthClass} ${className}`} style={style}>
        {children}
      </div>
      {onMention ? (
        <button
          type="button"
          aria-label={mentionLabel}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onMention();
          }}
          className="absolute right-0 bottom-0 z-20 flex size-6 items-center justify-center rounded-lg bg-[#f4f6f8] p-1 cursor-pointer opacity-0 transition-opacity group-hover/bubble:opacity-100 hover:opacity-100 focus-visible:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-[#747886] after:opacity-0 hover:after:opacity-10 before:absolute before:-inset-3 before:content-['']"
        >
          <img alt="" src={imgMentionReply} className="relative z-[1] pointer-events-none max-w-none" />
        </button>
      ) : null}
    </div>
  );
}

// The composer floats over the list, so the list needs bottom padding that tracks the
// composer's height (quote card, multi-line input) or the last messages end up hidden.
export function useComposerInset(composerRef, listRef) {
  const [inset, setInset] = useState(0);
  const prevInsetRef = useRef(0);

  useEffect(() => {
    const el = composerRef.current;
    if (!el) return undefined;
    const update = () => setInset(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [composerRef]);

  useLayoutEffect(() => {
    const prev = prevInsetRef.current;
    prevInsetRef.current = inset;
    const list = listRef.current;
    if (!list || prev === 0 || inset <= prev) return;
    list.scrollTop += inset - prev;
  }, [inset, listRef]);

  return inset;
}
