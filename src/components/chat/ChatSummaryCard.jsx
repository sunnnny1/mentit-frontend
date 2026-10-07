import { useEffect, useMemo, useState } from 'react';
import { EMPTY_SUMMARY, EMPTY_SUMMARY_TEXT, buildTranscript, peekSummary, requestSummary } from '../../lib/chatSummary';

// result: null(요약 중) | { empty, headline, bullets }
export function useChatSummary(messages, enabled) {
  const transcript = useMemo(() => buildTranscript(messages), [messages]);
  const [result, setResult] = useState(() => {
    if (!enabled) return null;
    return transcript ? peekSummary(transcript) : EMPTY_SUMMARY;
  });

  useEffect(() => {
    if (!enabled) return undefined;
    if (!transcript) {
      setResult(EMPTY_SUMMARY);
      return undefined;
    }
    const entry = requestSummary(transcript);
    if (entry.result) {
      setResult(entry.result);
      return undefined;
    }
    setResult(null);
    let alive = true;
    entry.promise.then((value) => {
      if (alive) setResult(value);
    });
    return () => {
      alive = false;
    };
  }, [enabled, transcript]);

  return enabled ? result : null;
}

export default function ChatSummaryCard({ result }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  if (!result) {
    return (
      <div className="flex items-center justify-center w-full h-[60px] rounded-2xl bg-[#f9fafb] px-6" role="status">
        <p
          className={`mentit-loading-text font-normal text-[14px] leading-[1.58] tracking-[0.14px] text-center ${
            isPlaying ? 'is-playing' : ''
          }`}
        >
          AI Agent와 했던 대화를 요약하고 있어요! 잠시만 기다려주세요..
        </p>
      </div>
    );
  }

  if (result.empty) {
    return (
      <div className="flex items-center justify-center w-full min-h-[60px] rounded-2xl bg-[#f9fafb] px-6 py-4">
        <p className="font-normal text-[14px] leading-[1.58] tracking-[0.14px] text-[#747886] text-center">
          {EMPTY_SUMMARY_TEXT}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full rounded-2xl bg-[#f9fafb] p-6">
      <p className="font-normal text-[14px] leading-[1.58] tracking-[0.14px] text-[#747886]">AI Agent 대화 요약</p>
      <div className="flex flex-col gap-1 text-[15px] leading-[1.6] text-[#121213]">
        {result.headline ? <p>{result.headline}</p> : null}
        {result.bullets.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {result.bullets.map((bullet, index) => (
              <li key={index} className="flex gap-2 pl-3">
                <span aria-hidden>•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
