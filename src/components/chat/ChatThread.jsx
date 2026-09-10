import { useState } from 'react';

const imgSend = 'https://www.figma.com/api/mcp/asset/70a5b9f2-c5bb-45a9-9836-1ccc8ad917e2.svg';
const imgSegmentControl = 'https://www.figma.com/api/mcp/asset/41fe867f-d67f-44f6-9936-91fa6bda6e6d.png';
const imgLogoMentitLogoCircle = 'https://www.figma.com/api/mcp/asset/04ad0798-9c3a-4941-8c08-22c0fbf30157.svg';

const SUGGESTED_CHIPS = [
  '저에게 맞는 직무를 어떻게 선택해야할까요?',
  '최근 채용 트렌드가 어떻게 되나요?',
  '취준생이 가장 자주 하는 실수는 무엇인가요?',
];

export default function ChatThread({ messages = [], onSend, showAgent = true, onShowAgent }) {
  const [draft, setDraft] = useState('');

  const submit = (text) => {
    const value = text.trim();
    if (!value) return;
    onSend?.(value);
    setDraft('');
  };

  return (
    <div className={`relative z-[1] flex-1 min-w-0 min-h-0 h-full flex flex-col bg-white ${showAgent ? 'rounded-br-2xl' : ''}`}>
      <div className="relative shrink-0 px-6 py-7">
        <img alt="" src={imgSegmentControl} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <div className="relative flex flex-col gap-1 items-center justify-center text-center w-full">
          <p className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#121213] w-full">
            Yoonie AI 에이전트와 대화가 시작돼요
          </p>
          <p className="font-normal text-[12px] leading-[1.35] tracking-[0.3px] text-[#747886] w-full">
            실제 멘토의 경험과 의사결정 기준을 바탕으로 학습된 AI 에이전트예요.
            <br />
            실제 멘토의 의견과는 일부 차이가 있을 수 있어요.
          </p>
          {!showAgent && (
            <button
              type="button"
              onClick={onShowAgent}
              className="relative overflow-hidden mt-4 w-[301px] flex items-center justify-center border border-[#e7eaee] rounded-[8px] px-4 py-2 after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:rounded-[8px] after:transition-opacity"
            >
              <span className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886]">
                AI Avatar 보기
              </span>
            </button>
          )}
        </div>
      </div>

      <div
        className={`flex-1 min-h-0 overflow-y-auto px-6 pb-4 flex flex-col gap-10 ${
          showAgent ? '' : 'max-w-[957px] mx-auto w-full'
        }`}
      >
        <div className="flex flex-col gap-2 items-start max-w-[513px] w-full">
          <p className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#121213]">
            Yoonie (AI Agent)
          </p>
          <div className="bg-[#f7fbff] rounded-[12px] p-[12px] max-w-[513px] w-full">
            <p className="font-normal text-[15px] leading-[1.6] text-[#121213]">
              안녕하세요? 저는 당근에서 프로덕트 디자이너 5년차인 멘토 Yoonie 입니다.{' '}
              <br />
              멘토의 경험을 바탕으로, 이윤영님에게 도움을 드릴게요. 궁금한 점을{' '}
              <br />
              말해주세요.
            </p>
          </div>
        </div>

        {messages.map((msg, index) => {
          if (msg.role === 'user') {
            return (
              <div key={index} className="flex flex-col items-end w-full">
                <div className="bg-[#f9fafb] rounded-[12px] p-[12px] max-w-[513px]">
                  <p className="font-normal text-[15px] leading-[1.6] text-[#121213]">{msg.text}</p>
                </div>
              </div>
            );
          }

          const parts = msg.text.split('\n\n');
          return (
            <div key={index} className="flex flex-col gap-1 items-start w-full max-w-[552px]">
              <div className="flex flex-col gap-4 items-start w-full max-w-[513px]">
                <div className="flex flex-col gap-2 items-start w-full">
                  <p className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#121213]">
                    Yoonie (AI Agent)
                  </p>
                  <div className="bg-[#f7fbff] rounded-[12px] p-[12px] max-w-[513px] w-full">
                    <p className="font-normal text-[15px] leading-[1.6] text-[#121213]">{parts[0]}</p>
                  </div>
                </div>
                {parts.slice(1).map((part) => (
                  <div key={part} className="flex flex-col gap-4 items-start w-full">
                    <div className="flex flex-col gap-2 items-start w-full">
                      <div className="bg-[#f7fbff] rounded-[12px] p-[12px] max-w-[513px] w-full">
                        <p className="font-normal text-[15px] leading-[1.6] text-[#121213]">{part}</p>
                      </div>
                      {msg.citation && (
                        <p className="font-normal text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">
                          {msg.citation}
                        </p>
                      )}
                    </div>
                    {msg.ctaText && (
                      <button
                        type="button"
                        className="bg-[rgba(26,117,255,0.05)] border-[0.5px] border-[#1a75ff] rounded-[8px] px-[16px] py-[8px] w-full flex items-center justify-center"
                      >
                        <span className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#1a75ff]">
                          {msg.ctaText}
                        </span>
                      </button>
                    )}
                  </div>
                ))}
                {parts.length === 1 && (
                  <>
                    {msg.citation && (
                      <p className="font-normal text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">
                        {msg.citation}
                      </p>
                    )}
                    {msg.ctaText && (
                      <button
                        type="button"
                        className="bg-[rgba(26,117,255,0.05)] border-[0.5px] border-[#1a75ff] rounded-[8px] px-[16px] py-[8px] w-full flex items-center justify-center"
                      >
                        <span className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#1a75ff]">
                          {msg.ctaText}
                        </span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}

        {messages.length > 0 && <img alt="" src={imgLogoMentitLogoCircle} className="size-[36px] shrink-0" />}
      </div>

      <div className="shrink-0">
        {messages.length === 0 && (
          <div
            className={`flex flex-col gap-2 items-end px-5 pt-5 ${
              showAgent ? '' : 'max-w-[957px] mx-auto w-full'
            }`}
          >
            {SUGGESTED_CHIPS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => submit(q)}
                className="relative overflow-hidden border-[0.5px] border-[#e7eaee] rounded-[8px] px-5 py-2 text-[15px] leading-[1.45] font-medium text-[#121213] whitespace-nowrap after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:rounded-[8px] after:transition-opacity"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <form
          className="px-5 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            submit(draft);
          }}
        >
          <div
            className={`relative flex items-center gap-2 px-5 py-3 rounded-xl border border-[#e7eaee] bg-[rgba(255,255,255,0.7)] shadow-[inset_4px_4px_12px_0_rgba(255,255,255,0.5)] ${
              showAgent ? '' : 'max-w-[957px] mx-auto w-full'
            }`}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="메세지를 입력하세요"
              className="flex-1 min-w-0 bg-transparent outline-none text-[15px] leading-[1.6] text-[#121213] placeholder:text-[#9ca2b1]"
            />
            <button
              type="submit"
              className="relative flex items-center justify-center px-5 py-2 rounded-full border border-[#70d2ff] bg-[#1a75ff] overflow-hidden shrink-0 cursor-pointer shadow-[inset_0_0_4px_0_#e7f3ff]"
              aria-label="전송"
            >
              <img alt="" src={imgSend} className="relative size-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
