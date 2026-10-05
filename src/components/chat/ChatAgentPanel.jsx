import { useEffect, useRef, useState } from 'react';
import MentorCircleGradient from './MentorCircleGradient';

// <img> mounts of the same animated webp/gif URL share playback progress, so a replay would
// pick up mid-animation. Each play gets its own blob: URL from a prefetched copy instead,
// which always starts from the first frame without downloading the file again.
const clipBlobs = new Map();

function prefetchClip(src) {
  if (!src || clipBlobs.has(src)) return;
  clipBlobs.set(src, null);
  fetch(src)
    .then((res) => res.blob())
    .then((blob) => clipBlobs.set(src, blob))
    .catch(() => clipBlobs.delete(src));
}

function freshClipUrl(src) {
  const blob = clipBlobs.get(src);
  return blob ? URL.createObjectURL(blob) : `${src}?play=${Date.now()}`;
}

function pickFirstClip(questionCount, blinkSrc) {
  if (questionCount <= 1 || !blinkSrc) return 'thinking';
  return Math.random() < 0.5 ? 'thinking' : 'blink';
}

function AnswerClipAvatar({
  questionCount,
  isAnswering,
  thinkingSrc,
  thinkingMs,
  blinkSrc,
  placeholderSrc,
  alt,
  className,
  style,
}) {
  const makeClip = (kind) => ({ kind, url: freshClipUrl(kind === 'thinking' ? thinkingSrc : blinkSrc) });
  // The newest clip is stacked on top of the previous one, which stays visible until the new
  // one has decoded, so a clip switch never shows the empty background in between.
  const [clips, setClips] = useState(() => [makeClip(pickFirstClip(questionCount, blinkSrc))]);
  const [placeholderVisible, setPlaceholderVisible] = useState(Boolean(placeholderSrc));
  const [shownQuestion, setShownQuestion] = useState(questionCount);
  const isAnsweringRef = useRef(isAnswering);
  const timerRef = useRef(null);

  if (questionCount !== shownQuestion) {
    const next = makeClip(pickFirstClip(questionCount, blinkSrc));
    setShownQuestion(questionCount);
    setClips((prev) => [...prev, next]);
  }

  useEffect(() => {
    isAnsweringRef.current = isAnswering;
  }, [isAnswering]);

  useEffect(() => () => window.clearTimeout(timerRef.current), [questionCount]);

  const handleLoad = (clip) => {
    if (clip.url.startsWith('blob:')) URL.revokeObjectURL(clip.url);
    window.setTimeout(() => {
      setPlaceholderVisible(false);
      setClips((prev) => (prev.includes(clip) ? prev.slice(prev.indexOf(clip)) : prev));
    }, 120);
    window.clearTimeout(timerRef.current);
    if (clip.kind !== 'thinking' || !blinkSrc) return;
    timerRef.current = window.setTimeout(() => {
      if (!isAnsweringRef.current) return;
      const next = makeClip('blink');
      setClips((prev) => [...prev, next]);
    }, thinkingMs);
  };

  return (
    <>
      {placeholderVisible ? <img alt="" aria-hidden src={placeholderSrc} className={className} style={style} /> : null}
      {clips.map((clip) => (
        <img
          key={clip.url}
          alt={alt}
          src={clip.url}
          data-clip={clip.kind}
          onLoad={() => handleLoad(clip)}
          className={className}
          style={style}
        />
      ))}
    </>
  );
}

export default function ChatAgentPanel({
  isSubMenuOpen = true,
  hasStarted = false,
  isAnswering = false,
  questionCount = 0,
  displayName = 'Yoonie',
  agentGreetingIdle = ['안녕하세요! Yoonie 멘토의 AI Agent에요.', '저를 찾아주셔서 감사해요!'],
  characterIdleImg,
  characterActiveImg,
  characterIntroImg,
  characterThinkingImg,
  characterThinkingMs = 0,
  characterBlinkImg,
  characterIdleWidth = 380,
  characterActiveWidth = 380,
  gradientColor = 'purple',
  introMode = false,
}) {
  const threadCharacterWidth = hasStarted ? characterActiveWidth : characterIdleWidth;
  const useAnswerClips = !introMode && Boolean(characterThinkingImg) && questionCount > 0;

  useEffect(() => {
    if (introMode) return;
    prefetchClip(characterThinkingImg);
    prefetchClip(characterBlinkImg);
  }, [introMode, characterThinkingImg, characterBlinkImg]);

  const threadImgClassName =
    'absolute left-1/2 top-[32px] h-auto -translate-x-1/2 object-contain object-top [mask-image:linear-gradient(to_bottom,black_78%,rgba(0,0,0,0.4)_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_78%,rgba(0,0,0,0.4)_92%,transparent_100%)]';

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
        {useAnswerClips ? (
          <AnswerClipAvatar
            key={`${displayName}-answer`}
            questionCount={questionCount}
            isAnswering={isAnswering}
            thinkingSrc={characterThinkingImg}
            thinkingMs={characterThinkingMs}
            blinkSrc={characterBlinkImg}
            placeholderSrc={characterIdleImg}
            alt={displayName}
            className={threadImgClassName}
            style={{ width: `min(${threadCharacterWidth}px, 88%)` }}
          />
        ) : (
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
                : threadImgClassName
            }
            style={!introMode ? { width: `min(${threadCharacterWidth}px, 88%)` } : undefined}
          />
        )}
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
