import MentorCircleGradient from './MentorCircleGradient';

export default function ChatAgentPanel({
  isSubMenuOpen = true,
  hasStarted = false,
  displayName = 'Yoonie',
  agentGreetingIdle = ['안녕하세요! Yoonie 멘토의 AI Agent에요.', '저를 찾아주셔서 감사해요!'],
  characterIdleImg,
  characterActiveImg,
  characterIntroImg,
  characterIdleWidth = 380,
  characterActiveWidth = 380,
  gradientColor = 'purple',
  introMode = false,
}) {
  const threadCharacterWidth = hasStarted ? characterActiveWidth : characterIdleWidth;
  return (
    <div
      className={`relative flex flex-col h-full min-h-0 shrink-0 overflow-hidden border-r border-[#e7eaee] ${
        isSubMenuOpen ? 'w-[533px] max-w-[50%]' : 'w-[710px] max-w-[60%]'
      }`}
    >
      {!introMode ? (
        <MentorCircleGradient
          isSubMenuOpen={isSubMenuOpen}
          gradientColor={gradientColor}
          className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            isSubMenuOpen ? 'top-[46%] size-[340px]' : 'top-[calc(50%-40px)] size-[400px]'
          }`}
        />
      ) : null}

      {!introMode ? (
        <div className="relative z-10 h-[116px] shrink-0 flex items-center justify-center px-5">
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
      ) : null}

      <div className="relative z-[1] flex-1 min-h-0 overflow-hidden pointer-events-none">
        <img
          key={introMode ? `${displayName}-intro` : `${displayName}-agent`}
          alt={displayName}
          src={
            introMode
              ? characterIntroImg || characterIdleImg
              : hasStarted
                ? characterActiveImg
                : characterIdleImg
          }
          className={
            introMode
              ? 'absolute left-1/2 top-[83px] w-[min(450px,84%)] h-auto -translate-x-1/2 object-contain object-top [mask-image:linear-gradient(to_bottom,black_72%,rgba(0,0,0,0.4)_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_72%,rgba(0,0,0,0.4)_88%,transparent_100%)]'
              : 'absolute left-1/2 top-[32px] h-auto -translate-x-1/2 object-contain object-top [mask-image:linear-gradient(to_bottom,black_78%,rgba(0,0,0,0.4)_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_78%,rgba(0,0,0,0.4)_92%,transparent_100%)]'
          }
          style={!introMode ? { width: `min(${threadCharacterWidth}px, 88%)` } : undefined}
        />
        <div
          className={`absolute bottom-0 left-0 z-[2] w-full ${
            introMode
              ? 'h-[18%] bg-gradient-to-b from-transparent from-0% via-white/50 via-[40%] to-white to-[90%]'
              : 'h-[200px] bg-gradient-to-b from-transparent to-white'
          }`}
        />
      </div>
    </div>
  );
}
