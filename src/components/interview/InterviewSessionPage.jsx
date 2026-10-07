import { useEffect, useRef, useState } from 'react';
import ChatProfileBar from '../chat/ChatProfileBar';
import InterviewSubMenu from './InterviewSubMenu';
import imgSunny from '../../assets/icons/ellipse-sunny.png';
import imgGlow from '../../assets/icons/interview/glow.svg';
import imgPauseBg from '../../assets/icons/interview/pause-bg.svg';
import imgNextBg from '../../assets/icons/interview/next-bg.svg';
import imgPauseIcon from '../../assets/icons/interview/pause-icon.svg';
import imgPlayIcon from '../../assets/icons/interview/play-icon.svg';
import imgNextIcon from '../../assets/icons/interview/next-icon.svg';
import imgCharacterQ1 from '../../assets/icons/interview/sunny-q1.webp';
import imgCharacterQ2 from '../../assets/icons/interview/sunny-q2.webp';
import imgSunnyQ1Poster from '../../assets/icons/interview/sunny-q1-poster.webp';
import imgSunnyQ1Talk from '../../assets/icons/interview/sunny-q1-talk.webp';
import imgSunnyNormal from '../../assets/icons/interview/sunny-normal.webp';
import sunnyQ1Voice from '../../assets/audio/sunny-q1.mp3';

// talk: 질문을 말하는 애니메이션(1회 재생) + voice 음성을 동시에 재생하고, 끝나면 idle 애니메이션을 다음 질문 전까지 반복한다.
// talkMs: 음성 재생이 막혔을 때 talk 애니메이션 길이만큼 기다렸다가 idle로 넘어가기 위한 값.
const QUESTIONS = [
  {
    text: '간단한 자기소개를 부탁드립니다',
    character: imgSunnyQ1Poster,
    talk: imgSunnyQ1Talk,
    talkMs: 4960,
    voice: sunnyQ1Voice,
    idle: imgSunnyNormal,
    crop: 'clip',
  },
  { text: '왜 저희 회사에 지원하셨나요?', character: imgCharacterQ2, crop: 'q2' },
  { text: '협업 과정에서 갈등을 어떻게 해결했나요?', character: imgCharacterQ1, crop: 'q1' },
  { text: '실패했던 경험과 그 과정에서 배운 점을 말씀해주세요', character: imgCharacterQ1, crop: 'q1' },
  { text: '본인의 강점을 구체적인 사례와 함께 말씀해주세요', character: imgCharacterQ1, crop: 'q1' },
];

const WAVE_BARS = [
  10, 16, 22, 14, 10, 8, 14, 22, 16, 10, 8, 14, 20, 14, 10, 16, 24, 18, 12, 10, 16, 24, 32, 22, 14, 10, 16, 24, 18, 12, 10, 16,
  22, 14, 10, 8, 14, 22, 16, 10, 8, 12, 16, 12,
];

const STAGE_H = 840;
const GRADIENT_TOP = 536;
const GRADIENT_H = 300;
const VOICE_TAB_H = 106;
const COUNTDOWN_START_MS = 500;
const COUNTDOWN_STEP_MS = 1200;
const TALK_ECHO_GUARD_MS = 700;
const AVATAR_BOTTOM_GRADIENT =
  'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0.94) 88%, #ffffff 100%)';
const CHARACTER_FADE_MASK =
  'linear-gradient(180deg, #000 0%, #000 42%, rgba(0,0,0,0.55) 68%, rgba(0,0,0,0.15) 86%, transparent 100%)';

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function StopInterviewModal({ onContinue, onStop }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5" onClick={onContinue}>
      <div
        className="w-[400px] max-w-full bg-white rounded-2xl p-6 flex flex-col gap-6 shadow-[0_8px_32px_rgba(18,18,19,0.16)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-2">
          <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">면접을 중지할까요?</p>
          <p className="text-[15px] leading-[1.6] text-[#747886]">
            지금 중지하면 진행 중인 모의면접이 종료되고 데이터는 삭제됩니다.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onContinue}
            className="relative flex-1 flex items-center justify-center px-5 py-3 rounded-xl border border-[#e7eaee] bg-white cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
          >
            <span className="relative font-medium text-[15px] text-[#121213]">계속하기</span>
          </button>
          <button
            type="button"
            onClick={onStop}
            className="relative flex-1 flex items-center justify-center px-5 py-3 rounded-xl border border-[#70d2ff] bg-[#1a75ff] shadow-[inset_0_0_4px_0_#e7f3ff] cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
          >
            <span className="relative font-bold text-[15px] text-white">중지하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InterviewSessionPage({
  isSubMenuOpen = false,
  onCloseSubMenu,
  onStopInterview,
  onCompleteInterview,
  activeMentor = 'Sunny',
  onSelectMentor,
  interviewTitle,
  showRecentInterviews = false,
  onFindMentor,
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const audioContextRef = useRef(null);
  const pausedRef = useRef(false);
  const awaitingRef = useRef(false);
  const barElsRef = useRef([]);
  const barEnergyRef = useRef(WAVE_BARS.map(() => 0));
  const stageRef = useRef(null);
  const [showStopModal, setShowStopModal] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [awaitingAnswer, setAwaitingAnswer] = useState(() => Boolean(QUESTIONS[0].talk));
  // clip: null(정지 이미지) | { phase: 'talk', url } | { phase: 'idle' }
  const [clip, setClip] = useState(null);
  const [talkAssets, setTalkAssets] = useState(null);
  const speakingRef = useRef(Boolean(QUESTIONS[0].talk));
  const voiceRef = useRef(null);
  const talkAudioRef = useRef(null);
  const micMutedUntilRef = useRef(0);
  const voiceStartedRef = useRef(null);
  const [elapsed, setElapsed] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);
  const [stageScale, setStageScale] = useState(1);
  const [countdown, setCountdown] = useState(null);
  const [isCountingDown, setIsCountingDown] = useState(true);
  const countdownRef = useRef(true);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    awaitingRef.current = awaitingAnswer;
  }, [awaitingAnswer]);

  useEffect(() => {
    countdownRef.current = isCountingDown;
  }, [isCountingDown]);

  const question = QUESTIONS[questionIndex];
  const talkFailed = !isCountingDown && talkAssets?.index === questionIndex && !talkAssets.blob;
  const activeClip = clip ?? (talkFailed ? { phase: 'idle' } : null);
  const isSpeaking = Boolean(question.talk) && activeClip?.phase !== 'idle';

  useEffect(() => {
    speakingRef.current = isSpeaking;
  }, [isSpeaking]);

  // talk 애니메이션은 매번 첫 프레임부터 재생되도록 blob으로 받아두고, 음성도 미리 버퍼링해 둔다.
  useEffect(() => {
    const current = QUESTIONS[questionIndex];
    if (!current.talk) return undefined;
    let cancelled = false;
    const audio = new Audio(current.voice);
    audio.preload = 'auto';
    const audioReady = new Promise((resolve) => {
      audio.addEventListener('canplaythrough', resolve, { once: true });
      audio.addEventListener('error', resolve, { once: true });
    });
    audio.load();
    new Image().src = current.idle;
    Promise.all([
      fetch(current.talk)
        .then((response) => response.blob())
        .catch(() => null),
      audioReady,
    ]).then(([blob]) => {
      if (cancelled) return;
      talkAudioRef.current = audio;
      setTalkAssets({ index: questionIndex, blob });
    });
    return () => {
      cancelled = true;
      audio.pause();
    };
  }, [questionIndex]);

  useEffect(() => {
    if (isCountingDown || talkAssets?.index !== questionIndex || !talkAssets.blob) return undefined;
    const url = URL.createObjectURL(talkAssets.blob);
    setClip({ phase: 'talk', url });
    return () => URL.revokeObjectURL(url);
  }, [isCountingDown, questionIndex, talkAssets]);

  useEffect(() => () => voiceRef.current?.pause(), []);

  const startVoice = (url) => {
    const audio = talkAudioRef.current;
    if (voiceStartedRef.current === url || !audio) return;
    voiceStartedRef.current = url;
    voiceRef.current = audio;
    let done = false;
    const finish = () => {
      if (done || voiceRef.current !== audio) return;
      done = true;
      // 스피커로 나간 질문 음성의 끝자락이 마이크에 잡혀 녹음이 바로 시작되지 않도록 잠깐 무시한다.
      micMutedUntilRef.current = performance.now() + TALK_ECHO_GUARD_MS;
      setClip({ phase: 'idle' });
    };
    audio.addEventListener('ended', finish, { once: true });
    audio.currentTime = 0;
    audio.play().catch(() => window.setTimeout(finish, question.talkMs));
  };

  useEffect(() => {
    setIsCountingDown(true);
    countdownRef.current = true;
    const timers = [
      window.setTimeout(() => setCountdown(3), COUNTDOWN_START_MS),
      window.setTimeout(() => setCountdown(2), COUNTDOWN_START_MS + COUNTDOWN_STEP_MS),
      window.setTimeout(() => setCountdown(1), COUNTDOWN_START_MS + COUNTDOWN_STEP_MS * 2),
      window.setTimeout(() => {
        setCountdown(null);
        setIsCountingDown(false);
        countdownRef.current = false;
      }, COUNTDOWN_START_MS + COUNTDOWN_STEP_MS * 3),
    ];
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const updateScale = () => {
      setStageScale(Math.min(1, stage.clientHeight / 840));
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let rafId;
    let analyser;

    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: true,
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
        setCameraReady(true);

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.35;
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        const freq = new Uint8Array(analyser.frequencyBinCount);
        const wave = new Uint8Array(analyser.fftSize);
        const barCount = WAVE_BARS.length;

        const tick = () => {
          if (audioContext.state === 'suspended') {
            audioContext.resume().catch(() => {});
          }
          analyser.getByteFrequencyData(freq);
          analyser.getByteTimeDomainData(wave);

          const slice = Math.floor(wave.length / barCount);
          const energies = barEnergyRef.current;
          let peak = 0;

          for (let i = 0; i < barCount; i += 1) {
            let timeSum = 0;
            const start = i * slice;
            for (let j = 0; j < slice; j += 1) {
              const value = (wave[start + j] - 128) / 128;
              timeSum += value * value;
            }
            const timeEnergy = Math.min(1, Math.sqrt(timeSum / slice) * 6);

            const bin = 3 + ((i * 5) % 42);
            const neighbor = 3 + ((i * 5 + 2) % 42);
            const freqEnergy = Math.min(1, ((freq[bin] + freq[neighbor]) / 2 / 255) * 1.35);
            const live = Math.max(timeEnergy, freqEnergy);
            peak = Math.max(peak, live);

            const target = pausedRef.current || awaitingRef.current || countdownRef.current ? 0 : live;
            energies[i] += (target - energies[i]) * 0.38;

            const bar = barElsRef.current[i];
            if (bar) {
              const mix = Math.min(1, energies[i] * 1.7);
              const liveHeight = 6 + energies[i] * 26;
              const height = WAVE_BARS[i] * (1 - mix) + liveHeight * mix;
              bar.style.height = `${Math.max(4, height)}px`;
              bar.style.opacity = pausedRef.current ? '0.45' : '1';
            }
          }

          if (
            awaitingRef.current &&
            !speakingRef.current &&
            !countdownRef.current &&
            performance.now() >= micMutedUntilRef.current &&
            peak > 0.16
          ) {
            awaitingRef.current = false;
            setAwaitingAnswer(false);
          }

          rafId = requestAnimationFrame(tick);
        };
        tick();
      } catch {
        setCameraReady(false);
      }
    };

    startMedia();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      audioContextRef.current?.close();
      audioContextRef.current = null;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (paused || awaitingAnswer || isCountingDown) return undefined;
    const timer = setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [paused, awaitingAnswer, isCountingDown]);

  const resumeAudio = () => {
    audioContextRef.current?.resume().catch(() => {});
  };

  const handleNext = () => {
    if (isCountingDown) return;
    if (questionIndex >= QUESTIONS.length - 1) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      onCompleteInterview?.();
      return;
    }
    resumeAudio();
    voiceRef.current?.pause();
    voiceRef.current = null;
    speakingRef.current = Boolean(QUESTIONS[questionIndex + 1].talk);
    setClip(null);
    setQuestionIndex((index) => index + 1);
    setAwaitingAnswer(true);
    setElapsed(0);
    setPaused(false);
  };

  const handleStop = () => {
    voiceRef.current?.pause();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    onStopInterview?.();
  };

  const characterSrc =
    activeClip?.phase === 'talk'
      ? activeClip.url
      : activeClip?.phase === 'idle' && question.idle
        ? question.idle
        : question.character;

  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && (
        <InterviewSubMenu
          onClose={onCloseSubMenu}
          activeMentor={activeMentor}
          onSelectMentor={onSelectMentor}
          interviewTitle={interviewTitle}
          showRecentInterviews={showRecentInterviews}
          onFindMentor={onFindMentor}
        />
      )}

      <section className="relative flex-1 min-w-0 min-h-0 h-full flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
        <div className="border-b border-[#e7eaee]">
          <ChatProfileBar
            mode="agent"
            displayName="Sunny"
            role="UX 디자이너 ・ 카카오 ・ 5년차"
            badgeLabel="Master Mentor"
            badgeColor="#e52222"
            profileAvatar={imgSunny}
            supportsMentorReview={false}
            extraActionLabel="면접 중지하기"
            onExtraAction={() => setShowStopModal(true)}
          />
        </div>

        <div className="relative flex-1 min-h-0" onClick={resumeAudio}>
          <div className="absolute top-5 right-5 z-20 w-[300px] h-[168px] rounded-2xl overflow-hidden bg-[#00e400] shadow-[0_0_8px_rgba(18,18,19,0.04)]">
            <video
              ref={videoRef}
              muted
              playsInline
              autoPlay
              className={`size-full object-cover scale-x-[-1] ${cameraReady ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-center pt-7 px-5 pointer-events-none z-20">
            <div className="flex flex-col gap-3 items-center w-full max-w-[641px]">
              <div className="flex gap-1.5 items-center h-2">
                {QUESTIONS.map((_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 rounded-full ${
                      index === questionIndex ? 'w-5 bg-[#1a75ff]' : 'w-1.5 bg-[#dfe4e8]'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[15px] leading-[1.45] text-[#747886]">{`${questionIndex + 1}/${QUESTIONS.length}`}</p>
              <p className="font-semibold text-[25px] leading-[1.4] tracking-[-0.5px] text-[#121213] text-center">
                {question.text}
              </p>
            </div>
          </div>

          <div ref={stageRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-x-0 bottom-0 h-[840px] origin-bottom"
              style={{ transform: `scale(${stageScale})` }}
            >
              <img
                alt=""
                src={imgGlow}
                className="absolute left-1/2 top-[68px] size-[800px] -translate-x-1/2"
              />
              <div
                className="absolute left-1/2 top-[172px] z-[1] h-[668px] w-[491px] -translate-x-1/2"
                style={{
                  WebkitMaskImage: CHARACTER_FADE_MASK,
                  maskImage: CHARACTER_FADE_MASK,
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                }}
              >
                {question.crop === 'clip' ? (
                  <img
                    alt="Sunny"
                    src={characterSrc}
                    onLoad={activeClip?.phase === 'talk' ? () => startVoice(activeClip.url) : undefined}
                    className="absolute left-1/2 top-0 h-[662px] w-auto max-w-none -translate-x-1/2"
                  />
                ) : question.crop === 'q1' ? (
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      alt="Sunny"
                      src={question.character}
                      className="absolute h-[112.87%] left-[-45.94%] max-w-none top-[-9.64%] w-[191.87%]"
                    />
                  </div>
                ) : (
                  <img
                    alt="Sunny"
                    src={question.character}
                    className="absolute inset-0 size-full max-w-none object-cover"
                  />
                )}
              </div>
              <div
                aria-hidden
                className="absolute inset-x-0 z-[2] rounded-b-2xl"
                style={{
                  top: GRADIENT_TOP,
                  height: GRADIENT_H,
                  background: AVATAR_BOTTOM_GRADIENT,
                }}
              />
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-center"
            style={{ bottom: VOICE_TAB_H }}
            aria-hidden={!isCountingDown}
          >
            {countdown != null && (
              <p key={countdown} className="font-medium text-[120px] leading-[1.4] text-white">
                {countdown}
              </p>
            )}
          </div>

          <div
            className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center px-5 py-4"
            style={{ height: VOICE_TAB_H }}
          >
            <div className="flex gap-20 items-center w-full max-w-[640px]">
              <button
                type="button"
                onClick={() => {
                  if (isCountingDown || isSpeaking) return;
                  resumeAudio();
                  setPaused((value) => !value);
                }}
                className="relative size-[60px] shrink-0 cursor-pointer"
                aria-label={paused ? '녹음 재개' : '일시정지'}
              >
                <img alt="" src={imgPauseBg} className="absolute inset-0 size-full" />
                <img
                  alt=""
                  src={paused ? imgPlayIcon : imgPauseIcon}
                  className="absolute left-[30%] right-[30%] top-[18px] h-6 w-[40%] object-contain"
                />
              </button>

              <div className="flex-1 min-w-0 flex flex-col gap-3 items-center">
                <p className="text-[15px] leading-[1.45] text-[#747886] whitespace-nowrap">
                  {isCountingDown
                    ? `준비중 ・ ${formatTime(elapsed)}`
                    : `${paused ? '일시정지' : awaitingAnswer ? '답변 대기중' : '답변 녹음중'} ・ ${formatTime(elapsed)}`}
                </p>
                <div className="flex items-center justify-center h-8 w-full" aria-hidden>
                  {WAVE_BARS.map((height, index) => (
                    <span
                      key={index}
                      ref={(node) => {
                        barElsRef.current[index] = node;
                      }}
                      className="shrink-0 rounded-full bg-[#9CA2B1]"
                      style={{
                        width: '2px',
                        height: `${height}px`,
                        marginLeft: index === 0 ? 0 : '3px',
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="relative size-[60px] shrink-0 cursor-pointer"
                aria-label={questionIndex >= QUESTIONS.length - 1 ? '면접 종료' : '다음 질문'}
              >
                <img alt="" src={imgNextBg} className="absolute inset-0 size-full" />
                <img alt="" src={imgNextIcon} className="absolute left-[30%] right-[30%] top-[18px] h-6 w-[40%] object-contain" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {showStopModal && <StopInterviewModal onContinue={() => setShowStopModal(false)} onStop={handleStop} />}
    </div>
  );
}
