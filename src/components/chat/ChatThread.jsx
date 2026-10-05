import { useCallback, useEffect, useRef, useState } from 'react';
import LoadingSymbol from './LoadingSymbol';
import {
  ChatInputField,
  MentionableBubble,
  MentionComposerQuote,
  MentionQuote,
  useComposerInset,
} from './ChatMention';

const SUGGESTED_CHIPS = [
  '저에게 맞는 직무를 어떻게 선택해야할까요?',
  '최근 채용 트렌드가 어떻게 되나요?',
  '취준생이 가장 자주 하는 실수는 무엇인가요?',
];

function bubbleMaxClass(isSubMenuOpen) {
  return isSubMenuOpen ? 'max-w-[398px]' : 'max-w-[488px]';
}

function CtaButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full flex items-center justify-center overflow-hidden bg-[rgba(26,117,255,0.05)] border-[0.5px] border-[#1a75ff] rounded-[8px] px-4 py-2 cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#747886] after:opacity-0 hover:after:opacity-10"
    >
      <span className="relative font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#1a75ff]">{label}</span>
    </button>
  );
}

function AnsweringIndicator() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex items-center gap-2 shrink-0 mt-10">
      {/* The gif has wide padding: at 72px its symbol matches the 36px logo slot, and the slot
          clips the rest so the padding doesn't cover the first characters of the text. */}
      <div className="relative size-9 shrink-0 overflow-hidden">
        <LoadingSymbol
          size={72}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          onLoad={() => setIsPlaying(true)}
        />
      </div>
      <p
        className={`mentit-loading-text font-normal text-[13px] leading-[1.4] tracking-[0.26px] whitespace-nowrap ${
          isPlaying ? 'is-playing' : ''
        }`}
      >
        멘토의 데이터에서 답변을 찾고 있어요! 최대 10초 정도 걸려요...
      </p>
    </div>
  );
}

function MentorReply({
  parts,
  agentName,
  maxWidthClass,
  citation,
  ctaText,
  onCtaClick,
  onMention,
  onReveal,
  className = '',
}) {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    setVisibleCount(1);
    onReveal?.();
    if (parts.length <= 1) return undefined;
    let shown = 1;
    const id = window.setInterval(() => {
      shown += 1;
      setVisibleCount(shown);
      onReveal?.();
      if (shown >= parts.length) window.clearInterval(id);
    }, 480);
    return () => window.clearInterval(id);
  }, [parts.length, parts[0], onReveal]);

  const showMeta = visibleCount >= parts.length;

  useEffect(() => {
    if (showMeta) onReveal?.();
  }, [showMeta, onReveal]);

  return (
    <div className={`flex flex-col gap-1 items-start w-full ${className}`}>
      <div className="flex flex-col gap-4 items-start w-fit">
        <div className="flex flex-col gap-1 items-start w-fit">
        {parts.slice(0, visibleCount).map((part, partIndex) => (
          <div key={`${partIndex}-${part.slice(0, 24)}`} className="mentit-bubble-in flex flex-col gap-2 items-start w-fit">
            {partIndex === 0 ? (
              <p className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#121213]">{agentName}</p>
            ) : null}
            <MentionableBubble
              maxWidthClass={maxWidthClass}
              className="bg-[#f7fbff]"
              mentionLabel="이 답변 언급하기"
              onMention={() => onMention(part)}
            >
              <p className="font-normal text-[15px] leading-[1.6] text-[#121213]">{part}</p>
            </MentionableBubble>
          </div>
        ))}
        </div>
        {showMeta && (citation || ctaText) ? (
          <div className="mentit-bubble-in flex flex-col gap-4 items-start w-full">
            {citation ? (
              <p className="font-normal text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">{citation}</p>
            ) : null}
            {ctaText ? (
              <div className="w-full pr-7">
                <CtaButton label={ctaText} onClick={onCtaClick} />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function ChatThread({
  messages = [],
  onSend,
  displayName = 'Yoonie',
  initialGreeting = '저는 당근에서 프로덕트 디자이너 5년차인 Yoonie 멘토의 AI Agent예요. 멘토의 경험을 바탕으로, 이윤영님에게 도움을 드릴게요. 궁금한 점을 말해주세요.',
  suggestedChips = SUGGESTED_CHIPS,
  isAnswering = false,
  onCtaClick,
  agentTabLabel = 'AI Agent 채팅',
  onSwitchMentorChat,
  isSubMenuOpen = true,
}) {
  const [draft, setDraft] = useState('');
  const [quoting, setQuoting] = useState(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const composerRef = useRef(null);
  const composerInset = useComposerInset(composerRef, listRef);
  const maxWidthClass = bubbleMaxClass(isSubMenuOpen);
  const agentName = `${displayName} (AI Agent)`;

  const scrollToEnd = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      });
    });
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages, isAnswering, quoting, scrollToEnd]);

  const submit = (text) => {
    const value = text.trim();
    if (!value) return;
    onSend?.(value, quoting);
    setDraft('');
    setQuoting(null);
    if (inputRef.current) inputRef.current.style.height = '24px';
  };

  const mention = (text, name = agentName) => {
    setQuoting({ name, text });
  };

  useEffect(() => {
    if (quoting) inputRef.current?.focus();
  }, [quoting]);

  return (
    <div className="relative z-[1] flex-1 min-w-0 min-h-0 h-full flex flex-col bg-white rounded-br-2xl">
      <div className="relative shrink-0 px-6 py-5">
        <div className="flex items-center p-0.5 rounded-lg bg-[#f4f6f8] w-fit h-[30px]">
          <button
            type="button"
            className="flex items-center justify-center px-7 py-1 rounded-lg text-[13px] leading-[1.4] font-medium tracking-[0.26px] bg-white text-[#121213] shadow-[0_0_8px_rgba(18,18,19,0.04)]"
          >
            {agentTabLabel}
          </button>
          <button
            type="button"
            onClick={onSwitchMentorChat}
            className="flex items-center justify-center px-7 py-1 rounded-lg text-[13px] leading-[1.4] font-medium tracking-[0.26px] cursor-pointer text-[#9ca2b1]"
          >
            멘토 채팅
          </button>
        </div>
      </div>

      <div
        ref={listRef}
        className="flex-1 min-h-0 overflow-y-auto px-6 pr-9 pt-7 pb-32 flex flex-col"
        style={composerInset ? { paddingBottom: composerInset + 24 } : undefined}
      >
        <div className="flex flex-col gap-3 items-start w-full">
          <div className="flex flex-col gap-2 items-start w-fit">
            <p className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#121213]">{agentName}</p>
            <MentionableBubble
              maxWidthClass={maxWidthClass}
              className="bg-[#f7fbff]"
              mentionLabel="이 답변 언급하기"
              onMention={() => mention(initialGreeting)}
            >
              <p className="font-normal text-[15px] leading-[1.6] text-[#121213]">{initialGreeting}</p>
            </MentionableBubble>
          </div>
          {messages.length === 0 && !isAnswering && (
            <div className="flex flex-col gap-2 items-start">
              {suggestedChips.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => submit(q)}
                  className="relative overflow-hidden border border-[#e7eaee] rounded-[8px] px-4 py-2 text-[14px] leading-[1.42] tracking-[0.14px] font-medium text-[#747886] whitespace-nowrap after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:rounded-[8px] after:transition-opacity"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {messages.map((msg, index) => {
          const prevRole = index === 0 ? 'assistant' : messages[index - 1].role;
          const stacked = msg.role === prevRole;
          const spacingClass = stacked ? 'mt-1' : 'mt-10';

          if (msg.role === 'user') {
            return (
              <div key={index} className={`flex flex-col items-end gap-1.5 w-full ${spacingClass}`}>
                {msg.replyTo ? (
                  <div className="w-fit max-w-[360px]">
                    <MentionQuote name={msg.replyTo.name} text={msg.replyTo.text} />
                  </div>
                ) : null}
                <div className={`bg-[#f9fafb] rounded-[12px] p-[12px] w-fit ${maxWidthClass}`}>
                  <p className="font-normal text-[15px] leading-[1.6] text-[#121213]">{msg.text}</p>
                </div>
              </div>
            );
          }

          const parts = msg.text.split('\n\n');
          return (
            <MentorReply
              key={index}
              parts={parts}
              agentName={agentName}
              maxWidthClass={maxWidthClass}
              citation={msg.citation}
              ctaText={msg.ctaText}
              onCtaClick={() => onCtaClick?.(msg.ctaKind)}
              onMention={mention}
              onReveal={scrollToEnd}
              className={spacingClass}
            />
          );
        })}

        {isAnswering && <AnsweringIndicator />}
      </div>

      <div ref={composerRef} className="absolute bottom-0 left-0 right-0 flex flex-col">
        <div className="flex flex-col px-5 pt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(draft);
            }}
          >
            {quoting ? (
              <MentionComposerQuote name={quoting.name} text={quoting.text} onCancel={() => setQuoting(null)} />
            ) : null}
            <ChatInputField
              inputRef={inputRef}
              value={draft}
              onChange={setDraft}
              onSubmit={() => submit(draft)}
              placeholder={quoting ? '언급한 답변에 대해 질문하세요' : '메세지를 입력하세요'}
            />
          </form>
        </div>
        <div className="h-4 w-full bg-white" aria-hidden />
      </div>
    </div>
  );
}
