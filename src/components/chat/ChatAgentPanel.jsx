import MentorCircleGradient from './MentorCircleGradient';

const imgCharacterIdle = 'https://www.figma.com/api/mcp/asset/1a5aab05-79bc-4e3e-8038-7b41065ccbe3.png';
const imgCharacterActive = 'https://www.figma.com/api/mcp/asset/5ddbd43f-7583-4a6b-8ddb-cf34b22b4e76.png';
const imgClose = 'https://www.figma.com/api/mcp/asset/343a242e-14ba-427b-a8e0-6227d163ad87.svg';

export default function ChatAgentPanel({ onClose, isSubMenuOpen = true, hasStarted = false }) {
  return (
    <div
      className={`relative flex flex-col h-full min-h-0 shrink-0 overflow-visible border-r border-[#e7eaee] ${
        isSubMenuOpen ? 'w-[533px] max-w-[50%]' : 'w-[710px] max-w-[60%]'
      }`}
    >
      <MentorCircleGradient
        isSubMenuOpen={isSubMenuOpen}
        className={
          isSubMenuOpen
            ? 'absolute left-[90px] size-[340px] top-[250px]'
            : 'absolute left-[156px] size-[400px] top-[218px]'
        }
      />

      <div className="relative z-10 flex items-center justify-end px-6 py-4 h-[62px] shrink-0">
        <button type="button" onClick={onClose} className="size-6 cursor-pointer" aria-label="캐릭터 패널 닫기">
          <img alt="" src={imgClose} className="size-6" />
        </button>
      </div>

      <div className="relative z-10 px-5 py-4 shrink-0">
        <p className="text-sm leading-[1.58] tracking-[0.14px] text-[#747886] text-center">
          {hasStarted ? (
            <>
              멘토의 데이터를 찾아서 답변드릴게요.
              <br />
              잠시만 기다려주세요.
            </>
          ) : (
            <>
              안녕하세요! Yoonie 멘토의 AI Agent에요.
              <br />
              저를 찾아주셔서 감사해요!
            </>
          )}
        </p>
      </div>

      <div className="relative z-[1] flex-1 min-h-0 overflow-hidden pointer-events-none">
        <img
          alt="Yoonie"
          src={hasStarted ? imgCharacterActive : imgCharacterIdle}
          className="absolute inset-0 h-full w-full object-contain object-bottom"
        />
        <div className="absolute bottom-0 left-0 z-[2] w-full h-[150px] bg-gradient-to-b from-transparent to-white" />
      </div>
    </div>
  );
}
