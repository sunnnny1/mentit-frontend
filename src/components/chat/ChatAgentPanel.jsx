import MentorCircleGradient from './MentorCircleGradient';

const imgClose = 'https://www.figma.com/api/mcp/asset/343a242e-14ba-427b-a8e0-6227d163ad87.svg';

export default function ChatAgentPanel({
  onClose,
  isSubMenuOpen = true,
  hasStarted = false,
  displayName = 'Yoonie',
  agentGreetingIdle = ['안녕하세요! Yoonie 멘토의 AI Agent에요.', '저를 찾아주셔서 감사해요!'],
  characterIdleImg,
  characterActiveImg,
  gradientColor = 'purple',
}) {
  return (
    <div
      className={`relative flex flex-col h-full min-h-0 shrink-0 overflow-hidden border-r border-[#e7eaee] ${
        isSubMenuOpen ? 'w-[533px] max-w-[50%]' : 'w-[710px] max-w-[60%]'
      }`}
    >
      <MentorCircleGradient
        isSubMenuOpen={isSubMenuOpen}
        gradientColor={gradientColor}
        className="absolute left-1/2 top-[46%] size-[340px] -translate-x-1/2 -translate-y-1/2"
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
              {agentGreetingIdle[0]}
              <br />
              {agentGreetingIdle[1]}
            </>
          )}
        </p>
      </div>

      <div className="relative z-[1] flex-1 min-h-0 overflow-hidden pointer-events-none">
        <img
          alt={displayName}
          src={hasStarted ? characterActiveImg : characterIdleImg}
          className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2"
        />
        <div className="absolute bottom-0 left-0 z-[2] w-full h-[150px] bg-gradient-to-b from-transparent to-white" />
      </div>
    </div>
  );
}
