import { useCallback, useEffect, useRef, useState } from 'react';
import LoadingSymbol from '../chat/LoadingSymbol';
import { askYoonie } from '../../lib/yoonieAgent';

const ERROR_TEXT = '지금은 답변을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.';

// 답변 문단 폭(510px)에서 15px 본문이 약 3줄 들어가는 글자 수.
const PARAGRAPH_MAX_CHARS = 100;

// 긴 문단을 문장 경계에서만 잘라 약 3줄 이하 문단으로 묶는다. 목록 항목은 그대로 둔다.
function splitIntoParagraphs(text) {
  return text.split(/\n{2,}/).flatMap((paragraph) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return [];
    if (trimmed.length <= PARAGRAPH_MAX_CHARS || /^(•|\d+\.)\s/.test(trimmed)) return [trimmed];
    const sentences = trimmed.split(/(?<=[.!?。…])\s+/);
    const groups = [];
    for (const sentence of sentences) {
      const last = groups.length - 1;
      if (last >= 0 && groups[last].length + 1 + sentence.length <= PARAGRAPH_MAX_CHARS) {
        groups[last] = `${groups[last]} ${sentence}`;
      } else {
        groups.push(sentence);
      }
    }
    return groups;
  });
}

// 멘팃 AI 에이전트('mentit')와 이어서 대화하는 훅.
// screen: 사용자가 보고 있는 고정 화면 이름. 메시지 맨 앞에 "[화면: ...]"으로 붙여 에이전트가 맥락을 알게 한다.
export function useMentitAiThread(screen) {
  const [thread, setThread] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const interactionIdRef = useRef(null);
  const busyRef = useRef(false);
  const abortRef = useRef(null);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      // StrictMode의 가짜 언마운트에서 요청이 끊기지 않도록 한 틱 뒤에 실제 언마운트일 때만 중단한다.
      setTimeout(() => {
        if (!aliveRef.current) abortRef.current?.abort();
      }, 0);
    };
  }, []);

  const ask = useCallback(
    async (text) => {
      const question = String(text ?? '').trim();
      if (!question || busyRef.current) return;
      busyRef.current = true;
      const controller = new AbortController();
      abortRef.current = controller;
      setThread((prev) => [...prev, { role: 'user', text: question }]);
      setIsLoading(true);
      try {
        const message = screen ? `[화면: ${screen}] ${question}` : question;
        const { text: reply, interactionId } = await askYoonie(message, {
          interactionId: interactionIdRef.current,
          signal: controller.signal,
          agent: 'mentit',
        });
        interactionIdRef.current = interactionId;
        if (aliveRef.current) setThread((prev) => [...prev, { role: 'ai', text: reply }]);
      } catch (error) {
        if (error?.name !== 'AbortError' && aliveRef.current) {
          setThread((prev) => [...prev, { role: 'ai', text: ERROR_TEXT }]);
        }
      } finally {
        busyRef.current = false;
        if (aliveRef.current) setIsLoading(false);
      }
    },
    [screen],
  );

  return { thread, isLoading, ask };
}

// 후속 질문과 에이전트 답변을 고정 화면 아래에 이어서 보여준다.
export function MentitAiThreadView({ thread, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (thread.length === 0 && !isLoading) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [thread, isLoading]);

  if (thread.length === 0 && !isLoading) return null;

  return (
    <div className="flex flex-col gap-10 items-start w-full">
      {thread.map((item, index) =>
        item.role === 'user' ? (
          <div key={index} className="self-end bg-[#f9fafb] max-w-[513px] p-3 rounded-xl">
            <p className="text-[15px] leading-[1.6] text-[#121213] whitespace-pre-line">{item.text}</p>
          </div>
        ) : (
          <div key={index} className="flex flex-col gap-4 items-start w-full max-w-[510px] text-[#121213]">
            {splitIntoParagraphs(item.text).map((paragraph, i) => (
              <p key={i} className="text-[15px] leading-[1.6] break-keep break-words">
                {paragraph}
              </p>
            ))}
          </div>
        ),
      )}
      {isLoading && <LoadingSymbol size={72} className="self-start shrink-0" />}
      <div ref={bottomRef} className="scroll-mb-32" aria-hidden />
    </div>
  );
}

// 답변 끝에 붙는 후속 질문 칩.
export function MentitAiChips({ chips, onSelect }) {
  return (
    <div className="flex flex-col gap-2 items-start">
      {chips.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => onSelect(chip)}
          className="relative overflow-hidden bg-white border border-[#e7eaee] rounded-lg px-5 py-2 cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:rounded-lg after:transition-opacity"
        >
          <p className="relative text-[15px] font-medium text-[#747886] whitespace-nowrap">{chip}</p>
        </button>
      ))}
    </div>
  );
}
