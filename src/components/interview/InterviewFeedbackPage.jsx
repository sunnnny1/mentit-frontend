import { useEffect, useMemo, useRef, useState } from 'react';
import InterviewSubMenu from './InterviewSubMenu';
import imgBookmark from '../../assets/icons/interview/bookmark-white.svg';
import imgBookmarkFill from '../../assets/icons/interview/bookmark-white-fill.svg';
import imgPencil from '../../assets/icons/interview/pencil.svg';
import imgArticle1 from '../../assets/figma/interview-article-1.png';
import imgArticle2 from '../../assets/figma/interview-article-2.png';

const RADAR_VALUES = [84, 80, 74, 80, 76];

const VOICE_METRICS = [
  { label: '말하기 속도', value: 100, status: '적정', tone: 'good' },
  { label: '말 끊김', value: 82, status: '적정', tone: 'good' },
  { label: '목소리 톤', value: 73, status: '보통', tone: 'mid' },
  { label: '추임새 빈도', value: 46, status: '다소 잦음', tone: 'mid' },
];

const ARTICLES = [
  { title: '면접 볼 때 이것만은 하지마세요!', src: imgArticle1 },
  { title: '면접관이 보는 합격하는 사람의 공통점', src: imgArticle2, object: 'object-bottom' },
];

const ANSWERS = [
  {
    chip: 'Q1 자기소개',
    question: '간단한 자기소개를 부탁드립니다.',
    duration: '1:42',
    transcript: [
      '안녕하세요. 사용자의 행동과 맥락을 이해하고, 그 안에서 더 나은 경험을 만들어가는 UX 디자이너 이윤영입니다.',
      '저는 디자인을 단순히 화면을 예쁘게 만드는 일보다, 사용자가 어떤 상황에서 어떤 불편을 느끼는지 발견하고 이를 해결하는 과정이라고 생각합니다. 그래서 프로젝트를 진행할 때도 제 디자인을 먼저 정하기보다 사용자 리서치와 테스트를 통해 문제를 확인하고, 그 결과를 바탕으로 서비스를 개선하는 과정을 중요하게 생각해왔습니다.',
      '특히 여러 UIUX 프로젝트를 경험하면서 사용자와 비즈니스, 그리고 개발 사이에서 좋은 경험을 만들어내는 디자이너의 역할에 관심을 갖게 되었습니다. 카카오는 일상에서 정말 많은 사람들이 사용하는 서비스를 만들고 있는 만큼, 작은 UX의 차이가 사용자 경험 전체를 바꿀 수 있다고 생각합니다. 저 역시 사용자의 입장에서 끊임없이 고민하고, 더 편리하고 자연스러운 경험을 만들어내는 UX 디자이너로 성장하고 싶습니다. 감사합니다.',
    ],
    goods: [
      {
        title: 'UX 디자이너로서의 관점이 명확하게 드러납니다',
        body: '“디자인을 단순히 화면을 예쁘게 만드는 일보다, 사용자가 어떤 상황에서 어떤 불편을 느끼는지 발견하고 이를 해결하는 과정이라고 생각합니다”라는 문장을 통해 단순히 UI를 만드는 디자이너가 아니라 사용자 문제를 해결하는 UX 디자이너라는 정체성이 잘 드러납니다.',
      },
      {
        title: '카카오와의 연결이 자연스럽습니다',
        body: '“일상에서 정말 많은 사람들이 사용하는 서비스를 만들고 있다”는 카카오의 특성과 “작은 UX의 차이가 사용자 경험 전체를 바꿀 수 있다”는 자신의 UX 관점을 연결했습니다. 단순히 “카카오에서 일하고 싶다”가 아니라 왜 카카오에서 UX를 하고 싶은지를 설명한 점이 좋습니다.',
      },
    ],
    weak: {
      title: '마지막 포부가 다소 일반적입니다',
      body: '“더 편리하고 자연스러운 경험을 만들어내는 UX 디자이너로 성장하고 싶습니다”는 좋은 문장이지만, 카카오에서 어떤 방식으로 기여하고 싶은지가 조금 추상적입니다.',
      extra: '‘내 강점 → 카카오의 서비스 환경 → 내가 기여할 수 있는 부분’의 구조로 마무리하면 더 좋습니다.',
    },
    script: [
      '안녕하세요. 사용자의 불편을 발견하고, 그 문제를 구조화해서 해결하는 UX 디자이너 이윤영입니다.',
      '저는 디자인할 때 제가 만들고 싶은 것을 먼저 정하기보다, 사용자가 실제로 어떤 상황에서 불편을 느끼는지 파악하는 것을 중요하게 생각합니다. 여러 UIUX 프로젝트를 진행하면서 리서치와 사용자 테스트를 통해 문제를 발견하고, 그 결과를 바탕으로 문제를 다시 정의하고 디자인을 개선하는 과정을 반복해왔습니다.',
      '특히 졸업 프로젝트를 진행하면서 처음에 제가 생각했던 문제와 실제 사용자가 느끼는 문제는 다를 수 있다는 것을 많이 경험했습니다. 그래서 하나의 해결책을 빠르게 만드는 것보다, 왜 이 문제가 발생했는지, 다른 방법은 없는지, 어떤 근거로 이 방향을 선택했는지를 끊임없이 고민하는 디자이너가 되려고 노력했습니다.',
      '카카오 역시 많은 사람들이 일상적으로 사용하는 서비스를 만드는 만큼, 작은 불편을 발견하고 이를 자연스럽게 해결하는 UX가 중요하다고 생각합니다. 저의 강점인 사용자 관점에서 문제를 발견하고 논리적으로 해결해 나가는 역량을 바탕으로, 사용자가 미처 인지하지 못했던 불편까지 찾아내고 더 나은 경험으로 연결하는 UX 디자이너가 되고 싶습니다. 감사합니다.',
    ],
  },
  {
    chip: 'Q2 지원 동기',
    question: '왜 저희 회사에 지원하셨나요?',
    duration: '1:28',
    transcript: [
      '카카오의 서비스는 사용자의 일상에 깊이 스며들어 있다는 점이 가장 크게 다가왔습니다. 작은 화면 변화도 수백만 명의 경험에 영향을 줄 수 있는 환경에서, 사용자 관점으로 문제를 풀어보고 싶었습니다.',
      '특히 제가 해온 리서치 기반 개선 경험이 카카오처럼 데이터가 풍부한 조직에서 더 빠르게 검증될 수 있다고 느꼈습니다.',
    ],
    goods: [
      {
        title: '회사의 서비스 특성과 본인 경험을 연결했습니다',
        body: '규모와 영향력을 이유로만 들지 않고, 자신의 리서치 방식이 그 환경에서 어떻게 쓰일지까지 언급한 점이 설득력 있습니다.',
      },
    ],
    weak: {
      title: '지원 동기가 아직 한 단계 추상적입니다',
      body: '카카오 제품 중 어떤 접점에서 어떤 불편을 느꼈는지 구체적인 사례가 빠지면, 동기가 일반적인 지원 문장처럼 들릴 수 있습니다.',
      extra: '최근 카카오 서비스에서 직접 느낀 불편 하나를 골라, 그걸 어떻게 개선하고 싶은지로 동기를 닫아보세요.',
    },
    script: [
      '카카오톡, 다음, 모빌리티처럼 일상 빈도가 높은 제품일수록 작은 UX 결정이 큰 차이를 만든다고 생각합니다. 저는 사용자 테스트를 통해 가설을 빠르게 검증하는 방식으로 일해왔고, 그 방식을 카카오의 데이터와 실험 문화 안에서 더 깊게 쓰고 싶어 지원했습니다.',
    ],
  },
  {
    chip: 'Q3 협업 경험',
    question: '협업 과정에서 갈등을 어떻게 해결했나요?',
    duration: '1:51',
    transcript: [
      '졸업 프로젝트에서 개발 일정과 디자인 완성도를 두고 의견이 갈렸습니다. 저는 우선 사용자 테스트에서 나온 이탈 구간을 공유하고, 어떤 화면이 일정에 꼭 들어가야 하는지 우선순위를 함께 다시 정했습니다.',
      '그 결과 핵심 플로우만 먼저 구현하고, 부가 화면은 다음 스프린트로 미루는 합의를 만들 수 있었습니다.',
    ],
    goods: [
      {
        title: '갈등을 감정 대립이 아니라 우선순위 문제로 재정의했습니다',
        body: '테스트 근거를 가져와 설득한 점이 카카오 면접에서 보는 협업 역량과 잘 맞습니다.',
      },
    ],
    weak: {
      title: '본인의 역할이 조금 더 선명해야 합니다',
      body: '팀이 합의했다는 결과는 나오지만, 본인이 어떤 선택지를 제시하고 어떤 기준으로 설득했는지는 짧게 끝납니다.',
      extra: '갈등 상황 → 내가 제안한 대안 2개 → 선택한 이유 → 결과 순서로 한 번 더 압축해보세요.',
    },
    script: [
      '일정 충돌이 생겼을 때 저는 완성도 대 속도의 대립으로 두지 않고, 사용자 테스트에서 이탈이 난 구간을 기준으로 필수 화면을 다시 나눴습니다. 그 기준으로 핵심 플로우를 먼저 배포했고, 이후 전환율이 개선되며 팀 합의도 유지됐습니다.',
    ],
  },
  {
    chip: 'Q4 실패 경험',
    question: '실패했던 경험과 그 과정에서 배운 점을 말씀해주세요',
    duration: '2:04',
    transcript: [
      '첫 프로토타입에서 제가 생각한 정보 구조가 사용자에게는 오히려 복잡했습니다. 테스트 후 메뉴를 과감히 줄이고, 핵심 과업 하나만 남기는 방향으로 바꿨습니다.',
      '처음엔 실패한 설계처럼 느껴졌지만, 그 경험이 이후 의사결정에서 가설을 더 빨리 버리는 습관이 되었습니다.',
    ],
    goods: [
      {
        title: '실패를 과정으로 설명하고 있습니다',
        body: '결과만 미화하지 않고, 테스트 이후 방향을 바꾼 과정이 드러나 신뢰도가 높습니다.',
      },
    ],
    weak: {
      title: '비즈니스 임팩트가 빠져 있습니다',
      body: '구조가 단순해졌다는 설명은 있지만, 그 변화가 어떤 지표로 이어졌는지는 분명하지 않습니다.',
      extra: '완료율, 소요 시간처럼 숫자 하나라도 붙이면 실패 경험이 성과 스토리로 바뀝니다.',
    },
    script: [
      '첫 설계는 실패에 가까웠습니다. 테스트에서 핵심 과업 완료율이 낮았고, 저는 메뉴를 줄이는 쪽으로 가설을 바꿨습니다. 재테스트 후 완료율이 올랐고, 그 이후로는 첫 안을 정답으로 두지 않는 습관을 갖게 됐습니다.',
    ],
  },
  {
    chip: 'Q5 강점 사례',
    question: '본인의 강점을 구체적인 사례와 함께 말씀해주세요',
    duration: '1:19',
    transcript: [
      '제 강점은 제가 그리고 싶은 화면보다, 사용자가 실제로 어디서 막히는지부터 확인하는 습관입니다. 졸업 프로젝트에서 첫 프로토타입이 테스트에서 잘 안 나왔을 때, 저는 디자인을 더 다듬기보다 과업을 다시 정의하고 핵심 플로우만 남겼습니다.',
      '그 결과 완료율이 올랐고, 이후에도 가설을 빨리 버리는 방식으로 일해왔습니다. 카카오처럼 데이터가 있는 환경에서 이 강점을 더 선명하게 쓸 수 있다고 생각합니다.',
    ],
    goods: [
      {
        title: '강점이 추상적인 성격이 아니라 사례로 설명됩니다',
        body: '“사용자 관점”이라고만 말하지 않고, 테스트 실패 이후 과업을 다시 정의한 구체적인 행동이 드러납니다.',
      },
    ],
    weak: {
      title: '강점이 팀에 어떤 기여로 이어지는지가 짧습니다',
      body: '본인의 습관은 잘 보이지만, 그 강점이 카카오 제품에서 어떤 지표나 협업 방식으로 쓰일지는 한 문장으로 끝납니다.',
      extra: '강점 → 그 강점을 쓴 상황 → 결과 → 입사 후 어디에 쓰겠는지를 한 세트로 말해보세요.',
    },
    script: [
      '제 강점은 첫 안을 정답으로 두지 않고, 사용자 테스트로 가설을 빠르게 수정하는 점입니다. 졸업 프로젝트에서 완료율이 낮았을 때 화면을 더 그리는 대신 과업을 줄였고, 재테스트에서 수치가 올랐습니다. 이 방식으로 카카오 서비스의 이탈 구간을 실험으로 좁혀가고 싶습니다.',
    ],
  },
];

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.18, rootMargin: '0px 0px -12% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView]);

  return [ref, inView];
}

function ScrollReveal({ className = '', children }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Badge({ tone, children }) {
  const styles = {
    keep: 'text-[#009632] bg-[#009632]/10',
    problem: 'text-[#ff4242] bg-[#ff4242]/10',
    improve: 'text-[#569fff] bg-[#569fff]/10',
  };
  return (
    <span className={`shrink-0 px-2 py-1 rounded-lg font-medium text-[13px] leading-[1.4] tracking-[0.26px] ${styles[tone]}`}>
      {children}
    </span>
  );
}

function FeedbackCard({ variant, badge, title, body, extra, children }) {
  const border =
    variant === 'keep'
      ? 'border-[#c5ffd8]'
      : variant === 'problem'
        ? 'border-[#fed5d5]'
        : 'border-[#c4ecfe]';
  return (
    <div className={`w-full border ${border} rounded-2xl p-5 flex flex-col gap-3`}>
      <div className="flex gap-4 items-start">
        {badge}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          {title ? <p className="font-bold text-[15px] leading-[1.6] text-[#121213]">{title}</p> : null}
          {body ? <div className="text-[15px] leading-[1.6] text-[#121213]">{body}</div> : null}
          {children}
        </div>
      </div>
      {extra ? (
        <div className="bg-[#fed5d5] rounded-2xl px-5 py-3">
          <p className="text-[15px] leading-[1.6] text-[#121213] whitespace-pre-wrap">{extra}</p>
        </div>
      ) : null}
    </div>
  );
}

function RadarChart({ progress }) {
  const cx = 110;
  const cy = 110;
  const radius = 100;
  const n = RADAR_VALUES.length;
  const point = (index, scale) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / n;
    return [cx + Math.cos(angle) * radius * scale, cy + Math.sin(angle) * radius * scale];
  };
  const grid = [0.2, 0.4, 0.6, 0.8, 1].map((scale) =>
    Array.from({ length: n }, (_, i) => point(i, scale).join(',')).join(' '),
  );
  const data = RADAR_VALUES.map((value, i) => {
    const vertex = Math.min(1, Math.max(0, progress * n - i));
    const eased = 1 - (1 - vertex) ** 3;
    return point(i, (value / 100) * eased).join(',');
  }).join(' ');

  return (
    <div className="relative mx-auto w-[440px] h-[318px]">
      <p className="absolute left-1/2 top-0 -translate-x-1/2 font-bold text-[15px] leading-[1.2] text-[#121213] whitespace-nowrap">
        직무 전문성
      </p>
      <p className="absolute left-[12px] top-[124px] font-bold text-[15px] leading-[1.2] text-[#121213] whitespace-nowrap">
        성장 가능성
      </p>
      <p className="absolute right-[12px] top-[124px] font-bold text-[15px] leading-[1.2] text-[#121213] whitespace-nowrap">
        문제 해결력
      </p>
      <p className="absolute left-[36px] bottom-[8px] font-bold text-[15px] leading-[1.2] text-[#121213] whitespace-nowrap">
        조직·문화 적합성
      </p>
      <p className="absolute right-[20px] bottom-[8px] font-bold text-[15px] leading-[1.2] text-[#121213] whitespace-nowrap">
        커뮤니케이션 능력
      </p>
      <div className="absolute left-1/2 top-[38px] -translate-x-1/2 w-[240px] h-[240px]">
        <svg viewBox="0 0 220 220" className="size-full overflow-visible">
          {grid.map((points, index) => (
            <polygon
              key={points}
              points={points}
              fill="none"
              stroke={index === grid.length - 1 ? '#c2c7d0' : '#d8dce3'}
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: n }, (_, i) => {
            const [x, y] = point(i, 1);
            return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#c2c7d0" strokeWidth="1" />;
          })}
          <polygon points={data} fill="rgba(112,210,255,0.4)" stroke="#1a75ff" strokeWidth="2" />
        </svg>
        <div className="absolute left-[calc(50%+8px)] top-[2px] h-[118px] flex flex-col justify-between text-[10px] leading-[1.2] text-[#9ca2b1]">
          <span>100</span>
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
        </div>
      </div>
    </div>
  );
}

function VoiceBar({ metric, play, delay }) {
  const fill = metric.tone === 'good' ? 'bg-[#1a75ff]' : 'bg-[#569fff]';
  const text = metric.tone === 'good' ? 'text-[#1a75ff]' : 'text-[#569fff]';
  const chipText = metric.tone === 'good' ? 'text-[12px] tracking-[0.3px] text-[#1a75ff]' : 'text-[10px] text-[#569fff]';
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex gap-1 items-center w-full">
        <p className="flex-1 font-bold text-[15px] leading-[1.45] text-[#121213]">{metric.label}</p>
        <p className={`font-bold text-[15px] leading-[1.45] ${text}`}>{metric.value}%</p>
        <span className={`bg-[#e7f3ff] px-2 py-1 rounded-full ${chipText}`}>{metric.status}</span>
      </div>
      <div className="h-3 w-full rounded-[5px] bg-[#e7f3ff] overflow-hidden">
        <div
          className={`h-full rounded-[5px] ${fill} transition-[width] duration-700 ease-out`}
          style={{ width: play ? `${metric.value}%` : '0%', transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

export default function InterviewFeedbackPage({
  isSubMenuOpen = false,
  onCloseSubMenu,
  onRetryInterview,
  onOpenMentorChat,
  activeMentor = 'Sunny',
  onSelectMentor,
}) {
  const [tab, setTab] = useState('total');
  const [radarProgress, setRadarProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState([false, false]);
  const [radarRef, radarInView] = useInView();
  const [voiceRef, voiceInView] = useInView();
  const answer = ANSWERS[answerIndex];

  useEffect(() => {
    if (!radarInView) return undefined;
    setRadarProgress(0);
    setScore(0);
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 1400);
      setRadarProgress(t);
      setScore(Math.round(80 * t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [radarInView]);

  const summaryText = useMemo(
    () =>
      '전체적으로 UX 프로세스를 체계적으로 설명하며 프로젝트를 논리적으로 전달했습니다. 리서치, 페르소나, 사용자 테스트까지 이어지는 흐름은 안정적이며, 문제를 해결하기 위한 접근 방식이 명확했습니다. 다만 카카오 UX 디자이너 면접에서는 ‘무엇을 만들었는가’보다 ‘왜 그렇게 판단했는가’를 더욱 중요하게 평가합니다. 현재 답변에서는 여러 대안을 비교하여 최종안을 선택한 이유와 비즈니스 관점에서의 의사결정 과정이 다소 부족하게 드러났습니다.',
    [],
  );

  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && (
        <InterviewSubMenu
          onClose={onCloseSubMenu}
          activeMentor={activeMentor}
          onSelectMentor={(mentor) => {
            setTab('total');
            onSelectMentor?.(mentor);
          }}
        />
      )}

      <section className="flex-1 min-w-0 min-h-0 h-full flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="mx-auto w-full max-w-[820px] px-5 pt-16 pb-16 flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <h1 className="font-semibold text-[25px] leading-[1.4] tracking-[-0.5px] text-[#121213]">
                카카오 UX 디자이너 직무 실전 면접
              </h1>
              <img alt="" src={imgPencil} className="size-6 shrink-0" />
            </div>
            <p className="text-[15px] leading-[1.45] text-[#747886]">2026.07.27</p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="relative flex h-[57px] w-full max-w-[779px]">
              <div className="absolute inset-x-0 bottom-0 h-px bg-[#e7eaee]" />
              {[
                { id: 'total', label: '종합 피드백' },
                { id: 'answers', label: '답변별 피드백' },
              ].map((item) => {
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`relative w-[158px] pb-5 pt-3.5 px-5 text-[16px] leading-[1.45] ${
                      active
                        ? 'font-bold text-[#121213] border-b-2 border-[#121213]'
                        : 'font-medium text-[#747886]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {tab === 'answers' ? (
              <div className="flex flex-wrap gap-3">
                {ANSWERS.map((item, index) => {
                  const active = index === answerIndex;
                  return (
                    <button
                      key={item.chip}
                      type="button"
                      onClick={() => setAnswerIndex(index)}
                      className={`px-5 py-2 rounded-lg border text-[15px] leading-[1.45] font-medium ${
                        active
                          ? 'border-[#1a75ff] bg-[rgba(26,117,255,0.05)] text-[#1a75ff]'
                          : 'border-[#e7eaee] text-[#747886]'
                      }`}
                    >
                      {item.chip}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          {tab === 'total' ? (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                  <div className="flex gap-2 items-center">
                    <p className="font-bold text-[32px] leading-[1.4] tracking-[-0.8px] text-[#1a75ff]">{score}점</p>
                    <p className="font-medium text-[22px] leading-[1.4] tracking-[-0.33px] text-[#747886]">/100점</p>
                  </div>
                  <div className="flex flex-col gap-1 w-[247px] text-[15px] leading-[1.5]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#747886]">직전 면접 비교</span>
                      <span className="font-medium text-[#1a75ff]">+5점 (75점)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#747886]">첫 면접 비교</span>
                      <span className="font-medium text-[#1a75ff]">+14점 (66점)</span>
                    </div>
                  </div>
                </div>

                <div ref={radarRef} className="flex flex-col gap-12 items-center">
                  <RadarChart progress={radarProgress} />
                  <p className="w-full text-[15px] leading-[1.6] text-[#121213]">{summaryText}</p>
                </div>
              </div>

              <div className="h-px bg-[#e7eaee]" />

              <div ref={voiceRef} className="flex flex-col gap-5">
                <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">음성 분석</p>
                <div className="flex flex-col gap-5">
                  {VOICE_METRICS.map((metric, index) => (
                    <VoiceBar key={metric.label} metric={metric} play={voiceInView} delay={index * 180} />
                  ))}
                </div>
              </div>

              <div className="h-px bg-[#e7eaee]" />

              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                  <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">강점</p>
                  <ScrollReveal>
                    <FeedbackCard
                      variant="keep"
                      badge={<Badge tone="keep">Keep</Badge>}
                      title="프로젝트 경험을 구체적으로 전달했습니다"
                      body="실제 프로젝트 사례를 활용하여 답변해 신뢰도가 높았어요. 경험을 기반으로 설명한 점이 긍정적으로 평가될 수 있어요."
                    />
                  </ScrollReveal>
                  <ScrollReveal>
                    <FeedbackCard
                      variant="keep"
                      badge={<Badge tone="keep">Keep</Badge>}
                      title="사용자 중심 문제 해결 과정을 명확하게 설명했어요"
                      body="리서치 → 문제 정의 → 아이디어 도출 → 프로토타입 → 사용자 테스트까지 UX 프로세스를 자연스럽게 연결했어요."
                    />
                  </ScrollReveal>
                </div>

                <ScrollReveal className="flex flex-col gap-3">
                  <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">약점</p>
                  <FeedbackCard
                    variant="problem"
                    badge={<Badge tone="problem">Problem</Badge>}
                    title="본인의 의사결정 근거가 부족했습니다"
                    extra={`‘결론 → 문제 상황 → 내가 한 행동 → 선택 이유 → 결과 → 배운 점’\n이 구조를 사용하면 카카오 UX 디자이너 면접에서 중요하게 보는 문제 해결 능력, 논리적 사고, 협업 역량을 효과적으로 전달할 수 있어요.`}
                  >
                    <div className="text-[15px] leading-[1.6] text-[#121213]">
                      <p>현재 답변은 프로젝트 진행 과정을 설명하는 데 집중되어 있으며,</p>
                      <ul className="list-disc pl-[22px] mt-1">
                        <li>왜 해당 방향을 선택했는지</li>
                        <li>다른 대안은 무엇이었는지</li>
                        <li>어떤 기준으로 최종 결정을 내렸는지 에 대한 설명이 부족했어요.</li>
                      </ul>
                    </div>
                  </FeedbackCard>
                </ScrollReveal>

                <ScrollReveal className="flex flex-col gap-3">
                  <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">개선점</p>
                  <FeedbackCard
                    variant="improve"
                    badge={<Badge tone="improve">Improve</Badge>}
                    title="리서치를 인사이트로 압축해보세요"
                    body="인터뷰 내용이 잘 정리돼 있지만 양이 많아요. “이 리서치에서 나온 핵심 발견 3가지”를 한 줄씩 요약해 상단에 배치하면, 바쁜 면접관도 핵심을 놓치지 않아요."
                  />
                </ScrollReveal>
              </div>

              <div className="h-px bg-[#e7eaee]" />

              <ScrollReveal className="flex flex-col gap-5">
                <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">
                  Sunny 멘토의 면접 관련 글
                </p>
                <div className="flex gap-5">
                  {ARTICLES.map((article, index) => (
                    <div key={article.title} className="relative flex-1 min-w-0 aspect-[423/253] rounded-2xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {}}
                        className="absolute inset-0 text-left"
                      >
                        <img
                          alt=""
                          src={article.src}
                          className={`absolute inset-0 size-full object-cover ${article.object ?? ''}`}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-[88px] bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 flex flex-col justify-end gap-0.5">
                          <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-white [text-shadow:0_0_2px_rgba(18,18,19,0.08)]">
                            {article.title}
                          </p>
                          <p className="text-[15px] leading-[1.45] text-white">Sunny 멘토 ・ UX 디자이너</p>
                        </div>
                      </button>
                      <div className="absolute inset-x-0 top-0 h-[52px] bg-gradient-to-b from-black/25 to-transparent flex justify-end px-3 pt-3 pointer-events-none">
                        <button
                          type="button"
                          className="pointer-events-auto size-6"
                          onClick={() => setBookmarked((prev) => prev.map((item, i) => (i === index ? !item : item)))}
                          aria-label="북마크"
                        >
                          <img alt="" src={bookmarked[index] ? imgBookmarkFill : imgBookmark} className="size-6" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          ) : (
            <div key={answer.chip} className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213]">{answer.question}</p>
                  <button
                    type="button"
                    className="shrink-0 flex items-center gap-2 bg-[#f4f6f8] pl-3.5 pr-4 py-[9px] rounded-full"
                  >
                    <span className="font-medium text-[13px] leading-[1.38] tracking-[0.25px] text-[#747886] whitespace-nowrap">
                      답변 음성 듣기 · {answer.duration}
                    </span>
                    <span className="size-[22px] rounded-full bg-[#747886] text-white text-[9px] font-bold flex items-center justify-center">
                      ▶
                    </span>
                  </button>
                </div>
                <div className="text-[15px] leading-[1.6] text-[#121213]">
                  {answer.transcript.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="h-px bg-[#e7eaee]" />

              <div className="flex flex-col gap-3">
                <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">잘한 점</p>
                {answer.goods.map((item) => (
                  <ScrollReveal key={item.title}>
                    <FeedbackCard variant="keep" title={item.title} body={item.body} />
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal className="flex flex-col gap-3">
                <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">아쉬운 점</p>
                <FeedbackCard variant="problem" title={answer.weak.title} body={answer.weak.body} extra={answer.weak.extra} />
              </ScrollReveal>

              <ScrollReveal className="flex flex-col gap-3">
                <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">개선 스크립트 제안</p>
                <FeedbackCard variant="improve">
                  <div>
                    {answer.script.map((paragraph) => (
                      <p key={paragraph.slice(0, 20)}>{paragraph}</p>
                    ))}
                  </div>
                </FeedbackCard>
              </ScrollReveal>
            </div>
          )}

          <div className="flex gap-5">
            <button
              type="button"
              onClick={onRetryInterview}
              className="relative flex-1 flex items-center justify-center px-7 py-3 rounded-xl border border-[#e7eaee] cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:rounded-xl"
            >
              <span className="relative font-medium text-[16px] leading-[1.45] text-[#121213]">다시 면접 보러가기</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenMentorChat?.('Sunny', { mode: 'mentor' })}
              className="relative flex-1 flex items-center justify-center px-7 py-3 rounded-xl border border-[#70d2ff] bg-[#1a75ff] shadow-[inset_0_0_4px_0_#e7f3ff] cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:rounded-xl"
            >
              <span className="relative font-bold text-[16px] leading-[1.45] text-white">멘토와 대화하러 가기</span>
            </button>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
