import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import imgJobPreview from '../../assets/figma/feedback-job-preview.png';
import imgResumePreview from '../../assets/figma/feedback-resume-preview.png';
import imgPage1 from '../../assets/figma/feedback-page-1.png';
import imgPage2 from '../../assets/figma/feedback-page-2.png';
import imgPage3 from '../../assets/figma/feedback-page-3.png';
import imgPage4 from '../../assets/figma/feedback-page-4.png';
import imgPage5 from '../../assets/figma/feedback-page-5.png';
import imgPage6 from '../../assets/figma/feedback-page-6.png';
import imgSend from '../../assets/figma/70a5b9f2-c5bb-45a9-9836-1ccc8ad917e2.svg';
import imgMenteeAvatar from '../../assets/figma/f5b4aa93-e341-4152-b5b7-64ae4f6ba70c.png';
import imgMentorAvatar from '../../assets/figma/1b69a9c3-f6dc-419e-8b7e-4073ed4858c7.png';

const RADAR_AXES = [
  { label: '직무 적합도', value: 88 },
  { label: '전달력', value: 90 },
  { label: '사고력', value: 79 },
  { label: '문제 해결력', value: 90 },
  { label: '성과', value: 70 },
];

export const BAR_METRICS = [
  { label: '문제 해결력', value: 90, tone: 'good' },
  { label: '전달력', value: 90, tone: 'good' },
  { label: '직무 적합도', value: 88, tone: 'good' },
  { label: '사고력', value: 79, tone: 'mid' },
  { label: '성과', value: 70, tone: 'mid' },
];

const RESUME_RADAR_AXES = [
  { label: '직무 적합도', value: 88 },
  { label: '전달력', value: 90 },
  { label: '사고력', value: 80 },
  { label: '문제 해결력', value: 90 },
  { label: '성과', value: 70 },
];

const RESUME_BAR_METRICS = [
  { label: '문제 해결력', value: 90, tone: 'good' },
  { label: '전달력', value: 90, tone: 'good' },
  { label: '직무 적합도', value: 88, tone: 'good' },
  { label: '사고력', value: 80, tone: 'mid' },
  { label: '성과', value: 70, tone: 'mid' },
];

const PORTFOLIO_COPY = {
  preview: imgJobPreview,
  previewClass: 'h-[123px] w-[220px]',
  previewAlt: '포트폴리오 미리보기',
  agentIntro: (name) => `${name} AI 에이전트의 포트폴리오 피드백이 시작돼요`,
  generating: (name) => `${name} 멘토의 포트폴리오 데이터 기반 답변 생성...`,
  editAgent: '포트폴리오 수정 후 에이전트에게 피드백받기',
  editMentor: '포트폴리오 수정 후 멘토에게 피드백 받기',
  score: 80,
  radar: RADAR_AXES,
  bars: BAR_METRICS,
  summary: [
    '그래프 점수를 기준으로 보면 문제 해결력과 전달력·완성도는 강점, 반면 직무 적합도와 논리·근거는 조금 더 보완할 여지가 있는 것으로 보여요. 아래처럼 수정하면 자연스럽습니다. 리서치부터 페르소나, UT까지 전반적인 UX 프로세스를 충실하게 수행한 점이 잘 보여요. 특히 문제를 정의하고 해결안을 도출하는 과정과 최종 결과물을 전달하는 완성도가 강점입니다.',
    '다만 현재 포트폴리오는 프로세스와 결과는 잘 정리되어 있지만, 각 과정에서 왜 이런 판단을 내렸는지에 대한 디자이너만의 논리와 근거가 조금 더 드러나면 좋을 것 같아요. 단순히 리서치 결과를 보여주는 것에서 나아가, 그 인사이트를 바탕으로 어떤 기준으로 우선순위를 정했고 왜 이 방향의 디자인 솔루션을 선택했는지 보여준다면 프로덕트 디자이너로서의 직무 적합도도 더욱 높게 전달될 수 있습니다.',
  ],
  strengths: [
    {
      title: '2회 반복 UT로 개선 사이클을 보여줬어요',
      body: '1차 UT → 인사이트 도출 → 개선 → 2차 UT 구조는 올바른 프로덕트 디자인 과정을 이해하고 있음을 보여줘요.',
    },
    {
      title: '리서치 흐름이 탄탄해요',
      body: '페르소나·유저 인터뷰 기반 문제 정의가 설득력 있어요. 이 강점은 유지하세요.',
    },
  ],
  weakness: {
    title: '“왜 이 디자인인가?"가 없어요',
    body: '리서치 → 솔루션으로 바로 점프해요. 토스/당근 면접관이 가장 많이 묻는 질문은 "왜 이 UI를 선택했나요?"입니다. AR 길찾기를 왜 선택했는지, 숏폼 UI를 왜 가져왔는지, 게이미피케이션을 왜 넣었는지에 대한 디자인 근거가 없어요.',
    extra: '각 핵심 화면마다 "대안 A vs 대안 B를 검토했고, X 이유로 B를 선택했다" 섹션 1-2개씩 추가하세요.',
  },
  improve: {
    title: '리서치를 인사이트로 압축해보세요',
    body: '인터뷰 내용이 잘 정리돼 있지만 양이 많아요. "이 리서치에서 나온 핵심 발견 3가지"를 한 줄씩 요약해 상단에 배치하면, 바쁜 면접관도 핵심을 놓치지 않아요.',
  },
};

const RESUME_COPY = {
  preview: imgResumePreview,
  previewClass: 'h-[180px] w-[120px]',
  previewAlt: '자기소개서 미리보기',
  agentIntro: (name) => `${name} AI 에이전트의 자기소개서 피드백이 시작돼요`,
  generating: (name) => `${name} 멘토의 자기소개서 데이터 기반 답변 생성...`,
  editAgent: '자기소개서 수정 후 에이전트에게 피드백받기',
  editMentor: '자기소개서 수정 후 멘토에게 피드백 받기',
  score: 82,
  radar: RESUME_RADAR_AXES,
  bars: RESUME_BAR_METRICS,
  summary: [
    '전체적인 흐름은 자연스럽고 ‘사용자 중심의 문제 해결’이라는 프로덕트 디자이너의 방향성이 잘 드러나요. 성장과정부터 지원동기, 역량, 입사 후 포부까지 일관된 메시지를 유지하고 있다는 점이 강점입니다.',
    '다만 전반적으로 ‘사용자를 이해한다’, ‘문제를 해결한다’, ‘성장하고 싶다’와 같은 표현이 많아 실제 어떤 경험을 통해 이런 역량을 갖추었는지가 충분히 드러나지 않아요. 특히 다른 지원자와 비교했을 때 윤영님만의 경험이나 결과를 보여주는 구체적인 사례가 추가되면 자소서의 설득력이 훨씬 높아질 것 같아요.',
  ],
  strengths: [
    {
      title: '프로덕트 디자이너라는 목표가 명확해요',
      body: '성장과정 → 지원동기 → 직무 경험 → 입사 후 포부까지 전체 내용이 ‘사용자 중심의 프로덕트 디자이너’라는 방향으로 연결되어 있어요. 자소서 전체에서 직무 방향성이 흔들리지 않는 점은 유지해주세요.',
    },
    {
      title: '사용자 중심의 관점이 잘 드러나요',
      body: '단순히 디자인 결과물을 만드는 사람이 아니라 사용자의 행동과 니즈를 이해하고 문제를 해결하려는 관점이 일관되게 나타나요.',
    },
  ],
  weakness: {
    title: '“왜 그렇게 생각했는지”를 보여주는 경험이 부족해요',
    body: '“사용자의 니즈를 깊이 이해하고 문제를 해결하고 싶습니다.”, “사용자 경험을 더욱 풍부하게 만들고 싶습니다.” 처럼 방향성은 명확하지만, 실제로 어떤 경험을 통해 이런 생각을 하게 되었는지가 부족해요.',
    extra: '실제 프로젝트 하나를 골라 문제 발견 → 행동 → 결과가 드러나는 사례를 추가해보세요.',
  },
  improve: {
    title: '추상적인 표현을 구체적인 경험으로 바꿔보세요',
    body: '현재는 ‘사용자 중심’, ‘문제 해결’, ‘성장’ 등의 키워드가 반복적으로 등장해요.\n예를 들어 “사용자의 니즈를 이해했습니다”에서 끝내기보다 “사용자 인터뷰에서 ○○ 문제를 발견했고, 이를 해결하기 위해 △△ 방식으로 서비스를 개선했습니다.” 처럼 작성하면 실제 역량이 훨씬 선명하게 보여요.',
  },
};

const RESUME_SECTIONS = [
  {
    id: 'basic',
    label: '기본 정보',
    badge: 'Improve',
    quote:
      '이윤영\n숙명여자대학교 시각영상디자인과\n희망 직무 프로덕트 디자이너',
    title: '직무가 한눈에 들어오게 한 줄만 더해보세요',
    body: '이름·전공·희망 직무는 잘 정리돼 있어요. 다만 채용 담당자가 3초 안에 가져갈 한 줄(예: 사용자 리서치 기반 앱을 기획·디자인한 지원자)이 있으면 첫인상이 더 분명해져요.',
    extra: '기본 정보 하단에 대표 프로젝트 1개와 핵심 역량 키워드 3개를 한 줄로 붙여보세요.',
  },
  {
    id: 'project',
    label: '프로젝트 경험',
    badge: 'Problem',
    quote:
      '생활 속 스마트앱 만들기\n개인 프로젝트 | 앱 기획 및 UI/UX 디자인\n일상 속 불편함을 해결하는 생활 밀착형 앱 기획\n사용자 리서치 및 페르소나 설정, 와이어프레임 제작\nFigma를 활용한 UI 디자인 및 프로토타입 제작\n\n멘팃 (Mentit) – 커리어 멘토링 플랫폼\n팀 프로젝트 | 서비스 기획 및 UI/UX 디자인\n취업 준비생과 현직자를 연결하는 멘토링 플랫폼 기획\n사용자 조사 및 서비스 설계, 인터페이스와 사용자 경험 디자인\nFigma, Adobe Illustrator를 활용한 디자인 시스템 구축',
    title: '프로젝트에서 ‘무엇을 했는지’는 보이지만, ‘어떤 결과를 만들었는지’가 부족해요',
    body: '생활 속 스마트앱 만들기, 멘팃 등 다양한 프로젝트를 경험했다는 점은 잘 보여요. 다만 현재는 리서치, 기획, UI/UX 디자인 등 수행한 업무를 나열하는 방식이라 실제 프로덕트 디자이너로서 어떤 문제를 해결할 수 있는지는 조금 약하게 전달돼요.\n특히 프로젝트마다 문제 발견 → 나의 역할 → 해결 과정 → 결과가 연결되면 훨씬 설득력 있어요. 예를 들어 멘팃에서 “사용자 조사 및 서비스 설계”라고만 적기보다, 취업 준비생의 어떤 문제를 발견했고 이를 어떤 기능이나 UX로 해결했는지를 보여주는 것이 좋아요.',
    extra:
      '프로젝트 개수보다 대표 프로젝트의 깊이를 보여주세요. 현재처럼 여러 프로젝트를 짧게 소개하기보다, 멘팃처럼 직무와 직접적으로 연결되는 프로젝트를 중심으로 구체적인 역할과 결과를 한 줄씩 추가하면 프로덕트 디자이너로서의 역량이 더 선명하게 드러나요.',
  },
  {
    id: 'growth',
    label: '성장 과정',
    badge: 'Improve',
    quote: '디자인을 배우며 사용자를 관찰하는 습관이 생겼고, 작은 불편도 서비스로 풀어보고 싶다는 마음이 커졌어요.',
    title: '성장이 ‘태도’에서 끝나지 않게, 계기를 구체화하세요',
    body: '사용자를 관찰하고 불편을 해결하려는 방향은 좋아요. 다만 그 태도가 생긴 장면(수업, 동아리, 실패 경험)이 한 줄이라도 있으면 설득력이 올라가요.',
    extra: '성장 과정 문단 끝에 “그래서 지금은 ○○를 더 잘하게 됐다”는 현재 역량 한 줄을 붙여보세요.',
  },
  {
    id: 'motive',
    label: '지원 동기',
    badge: 'Keep',
    quote: '토스·카카오처럼 복잡한 문제를 단순하게 만드는 프로덕트에 기여하고 싶습니다.',
    title: '회사와 직무를 연결한 동기는 잘 보여요',
    body: '지원 회사가 다루는 문제와 본인 관심이 한 방향으로 이어져 있어요. 이 톤은 유지하되, 그 회사에만 해당하는 제품 한 개를 언급하면 더 날카로워져요.',
    extra: '',
  },
  {
    id: 'skill',
    label: '직무 경험 및 역량',
    badge: 'Improve',
    quote: '사용자 리서치, 페르소나, 와이어프레임, UI 디자인과 프로토타이핑을 수행했습니다.',
    title: '스킬 나열보다, 그 스킬로 푼 문제를 보여주세요',
    body: '리서치부터 프로토타입까지 프로세스 경험은 충분히 드러나요. 카카오처럼 여러 이해관계자가 있는 환경에서는, 그 스킬을 어디에 썼는지가 더 중요해요.',
    extra: '역량 문장을 “리서치를 했다”가 아니라 “○○ 사용자 그룹의 니즈를 비교해 △△ 기능을 우선했다”로 바꿔보세요.',
  },
  {
    id: 'personality',
    label: '성격의 장단점',
    badge: 'Improve',
    quote: '경청하는 편이고, 의견을 맞추는 과정에서 시간이 오래 걸리기도 합니다.',
    title: '장단점을 협업 장면과 묶어보세요',
    body: '경청·조율은 프로덕트 디자이너에게 강점이에요. 단점이 추상적이면 면접에서 되묻기 쉬우니, 실제 팀 프로젝트에서 어떻게 보완했는지를 한 줄 넣으세요.',
    extra: '장점-단점-보완 행동을 각 한 문장으로 짝지어 보세요.',
  },
  {
    id: 'ambition',
    label: '입사 후 포부',
    badge: 'Improve',
    quote: '입사 후 사용자 중심의 프로덕트를 만들며 성장하고 싶습니다.',
    title: '포부를 입사 1년 차 업무로 내려보세요',
    body: '성장하고 싶다는 마음은 분명해요. 다만 입사 후 하고 싶은 일이 일반적이라, 해당 팀의 제품과 맞닿은 목표 한 가지가 있으면 더 신뢰가 가요.',
    extra: '“첫 해에는 ○○ 플로우의 전환을 개선하고 싶다”처럼 관찰 가능한 목표로 바꿔보세요.',
  },
];

const STROKE = {
  Keep: 'border-[#c5ffd8]',
  Problem: 'border-[#fed5d5]',
  Improve: 'border-[#c4ecfe]',
};

const PAGES = [
  { id: 1, label: '1P', thumb: imgPage1, preview: imgPage1 },
  { id: 2, label: '2P', thumb: imgPage6, preview: imgPage6 },
  { id: 3, label: '3P', thumb: imgPage3, preview: imgPage3 },
  { id: 4, label: '4P', thumb: imgPage4, preview: imgPage4 },
  { id: 5, label: '5P', thumb: imgPage5, preview: imgPage5 },
  { id: 6, label: '6P', thumb: imgPage2, preview: imgPage2 },
];

const PAGE_NOTES = {
  1: {
    badge: 'Improve',
    title: '인트로화면의 맥락 파악',
    body: '첫 화면에서 프로젝트명, 한 줄 설명, 기간, 역할, 팀 구성이 보여서 채용 담당자가 빠르게 맥락을 이해하기 좋아요. 다만 지금은 "무엇을 했는가"(역할·기여도)까지는 잘 보여요. 여기에 "왜 이 프로젝트였는가" 한 줄을 더하면 완성도가 올라가요. 채용 담당자는 인트로 3초 안에 "이 사람이 왜 이 문제에 뛰어들었는지"를 궁금해하거든요.',
    extra:
      'Implementation Level의 퍼센트(UX 리서치 80% 등)는 좋지만, 이 숫자가 "무엇을 기준으로 한 기여도인지" 짧은 각주가 있으면 신뢰도가 올라가요.\n한 줄 설명을 "결과 중심"으로 바꿔보세요. 현재 "맛집 탐색·주문 여정을 모바일로 단축한 프로젝트"에서 "주문 여정을 40% 단축한 프로젝트"처럼 임팩트가 보이면 첫인상이 강해져요.',
  },
  2: {
    badge: 'Improve',
    title: '오버뷰 한 줄을 결과 중심으로',
    body: '프로젝트 한 줄 요약이 길어서 3초 안에 임팩트가 안 들어와요. 성과 1·2는 방향은 좋은데 숫자가 약해요.',
    extra: '첫 문장을 "주문 여정 40% 단축"처럼 결과 중심으로 줄이고, 성과에 UT 전후 수치를 넣으세요.',
  },
  3: {
    badge: 'Problem',
    title: '가설이 인사이트 나열에 머물러 있어요',
    body: '리서치에서 발견한 3가지 문제가 카드로 잘 정리돼 있어요. 다만 각 가설이 다음 솔루션 선택으로 어떻게 이어지는지가 약해요.',
    extra: '가설 카드 하단에 "그래서 어떤 기능을 버렸는지/골랐는지"를 한 줄로 붙여 의사결정이 보이게 하세요.',
  },
  4: {
    badge: 'Improve',
    title: '솔루션 선택의 근거가 필요해요',
    body: '문제-솔루션 매핑 구조는 좋아요. 다만 "왜 이 UI·이 기능인가"가 빠져 면접에서 가장 먼저 질문받을 구간이에요.',
    extra: '대안 A vs B를 검토했고 X 이유로 B를 선택했다는 문장을 1-2줄 추가하세요.',
  },
  5: {
    badge: 'Improve',
    title: '전략 프레임을 비즈니스 지표와 연결하세요',
    body: 'WHY·WHO·WHAT·HOW 구조는 명확해요. 여기에 리텐션·전환 같은 성과 지표가 붙으면 직무 적합도가 올라가요.',
    extra: 'WHAT/HOW 옆에 전환율이나 재방문 변화를 한 줄로 적어 임팩트를 드러내세요.',
  },
  6: {
    badge: 'Keep',
    title: '리서치 흐름이 한눈에 보여요',
    body: '페르소나와 인터뷰가 한 페이지에 정리되어 담당자가 문제 정의를 빠르게 따라갈 수 있어요.',
    extra: '사용자 그룹을 한 유형으로만 두지 말고, 카카오형 복합 서비스에 맞춰 이해관계자 관점을 한 줄 추가해보세요.',
  },
};

export function GlassPanel({ className = '', contentClassName = '', children }) {
  return (
    <div
      className={`relative rounded-2xl bg-white shadow-[inset_4px_4px_12px_rgba(255,255,255,0.5),0_0_16px_rgba(18,18,19,0.04)] ${className}`}
    >
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

function useInView(rootRef) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { root: rootRef?.current ?? null, threshold: 0.16, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootRef]);

  return [ref, inView];
}

function ScrollReveal({ rootRef, onShow, className = '', children }) {
  const [ref, inView] = useInView(rootRef);

  useEffect(() => {
    if (inView) onShow?.(ref.current);
  }, [inView, onShow, ref]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function RadarChart({ axes = RADAR_AXES }) {
  const cx = 110;
  const cy = 110;
  const radius = 100;
  const n = axes.length;
  const point = (index, scale) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / n;
    return [cx + Math.cos(angle) * radius * scale, cy + Math.sin(angle) * radius * scale];
  };
  const grid = [0.2, 0.4, 0.6, 0.8, 1].map((scale) =>
    Array.from({ length: n }, (_, i) => point(i, scale).join(',')).join(' '),
  );
  const data = axes.map((axis, i) => point(i, axis.value / 100).join(',')).join(' ');

  return (
    <div className="relative mx-auto h-[301px] w-[320px] shrink-0">
      <p className="absolute left-1/2 top-0 -translate-x-1/2 font-bold text-[15px] leading-[1.45] text-[#121213] whitespace-nowrap">
        직무 적합도
      </p>
      <p className="absolute left-0 top-[119px] font-bold text-[15px] leading-[1.45] text-[#121213] whitespace-nowrap">성과</p>
      <p className="absolute right-0 top-[119px] font-bold text-[15px] leading-[1.45] text-[#121213] whitespace-nowrap">전달력</p>
      <p className="absolute left-[46px] bottom-0 font-bold text-[15px] leading-[1.45] text-[#121213] whitespace-nowrap">
        문제 해결력
      </p>
      <p className="absolute right-[39px] bottom-0 font-bold text-[15px] leading-[1.45] text-[#121213] whitespace-nowrap">
        사고력
      </p>
      <div className="absolute left-[38px] top-[47px] size-[220px]">
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
        <div className="absolute left-[calc(50%+8px)] top-[2px] flex h-[107px] flex-col justify-between text-[10px] leading-[1.5] text-[#747886]">
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

export function Badge({ tone, children }) {
  const styles = {
    keep: 'text-[#009632] bg-[#009632]/10',
    problem: 'text-[#ff4242] bg-[#ff4242]/10',
    improve: 'text-[#569fff] bg-[#569fff]/10',
  };
  return (
    <span className={`inline-flex w-fit self-start items-center justify-center px-2 py-1 rounded-lg font-medium text-[13px] leading-[1.4] tracking-[0.26px] ${styles[tone]}`}>
      {children}
    </span>
  );
}

export function FeedbackCard({ variant, badge, title, body, extra }) {
  const border =
    variant === 'keep' ? 'border-[#c5ffd8]' : variant === 'problem' ? 'border-[#fed5d5]' : 'border-[#c4ecfe]';
  return (
    <div className={`flex w-full flex-col gap-3 rounded-2xl border p-5 ${border}`}>
      <div className="flex items-start gap-4">
        {badge}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="font-bold text-[15px] leading-[1.6] text-[#121213]">{title}</p>
          <p className="whitespace-pre-wrap text-[15px] leading-[1.6] text-[#121213]">{body}</p>
        </div>
      </div>
      {extra ? (
        <div className="w-full rounded-2xl bg-[#fed5d5] px-5 py-3">
          <p className="text-[15px] leading-[1.6] text-[#121213]">{extra}</p>
        </div>
      ) : null}
    </div>
  );
}

function Appear({ onShown, className = '', children }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!on) return undefined;
    onShown?.(ref.current);
    return undefined;
  }, [on, onShown]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${on ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'} ${className}`}
    >
      {children}
    </div>
  );
}

function elbowFromSpine(spineX, y0, yEnd, xEnd, radius) {
  const goingUp = yEnd < y0;
  const gap = Math.abs(yEnd - y0);
  const r = Math.min(radius, gap / 2, Math.max(8, xEnd - spineX));
  const yCorner = goingUp ? yEnd + r : yEnd - r;
  return `M ${spineX} ${y0} L ${spineX} ${yCorner} Q ${spineX} ${yEnd} ${spineX + r} ${yEnd} H ${xEnd}`;
}

function BranchLines({ box, on, fork }) {
  const markerId = useId().replace(/:/g, '');
  if (!box.destX || box.destX <= box.srcX) return null;
  const radius = 18;
  const x0 = box.srcX;
  const xEnd = box.destX;
  const visibleArm = Math.max(56, (xEnd - x0 - radius) / 2);
  const spineX = x0 + visibleArm;
  const stem = `M ${x0} ${box.srcY} H ${spineX}`;
  const up = elbowFromSpine(spineX, box.srcY, box.destY, xEnd, radius);
  const down = fork ? elbowFromSpine(spineX, box.srcY, box.posY, xEnd, radius) : '';
  const dash = {
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: on ? 0 : 1,
    style: { transition: 'stroke-dashoffset 800ms ease-out' },
  };
  const stroke = {
    fill: 'none',
    stroke: '#c5c9d1',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 z-[2] overflow-visible"
      width={box.rowW || '100%'}
      height={box.rowH || '100%'}
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="5"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M1.5 1.5 L8.5 5 L1.5 8.5" fill="none" stroke="#c5c9d1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <path d={stem} {...stroke} {...dash} />
      <path d={up} markerEnd={`url(#${markerId})`} {...stroke} {...dash} />
      {fork ? <path d={down} markerEnd={`url(#${markerId})`} {...stroke} {...dash} /> : null}
    </svg>
  );
}

function DetailSection({ page, onSelectPage }) {
  const note = PAGE_NOTES[page];
  const selected = PAGES.find((item) => item.id === page) ?? PAGES[0];
  const badgeTone = note.badge === 'Keep' ? 'keep' : note.badge === 'Problem' ? 'problem' : 'improve';
  const thumbListRef = useRef(null);
  const activeThumbRef = useRef(null);

  useEffect(() => {
    const list = thumbListRef.current;
    const thumb = activeThumbRef.current;
    if (!list || !thumb) return;
    const listBox = list.getBoundingClientRect();
    const thumbBox = thumb.getBoundingClientRect();
    if (thumbBox.top < listBox.top || thumbBox.bottom > listBox.bottom) {
      list.scrollTop += thumbBox.top - listBox.top - 12;
    }
  }, [page]);

  return (
    <GlassPanel className="w-[1091px] max-w-[1091px] px-6 py-7" contentClassName="flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">상세 피드백</p>
        <p className="text-sm leading-[1.42] tracking-[0.14px] text-[#9ca2b1]">페이지를 클릭하면 상세피드백이 보여요</p>
      </div>
      <div className="flex flex-wrap items-start gap-10">
        <div ref={thumbListRef} className="flex max-h-[520px] w-[220px] shrink-0 flex-col gap-5 overflow-y-auto">
          {PAGES.map((item) => {
            const active = item.id === page;
            const tone = PAGE_NOTES[item.id].badge;
            return (
              <button
                key={item.id}
                ref={active ? activeThumbRef : undefined}
                type="button"
                onClick={() => onSelectPage(item.id)}
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <span
                  className={`block h-[123px] w-[220px] overflow-hidden rounded-2xl border ${STROKE[tone]} ${
                    active ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <img
                    alt={`${item.label} 미리보기`}
                    src={item.thumb}
                    width={220}
                    height={123}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="text-[12px] leading-[1.35] tracking-[0.3px] text-[#747886]">{item.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex min-w-[280px] flex-1 flex-col gap-5">
          <div className={`h-[437px] w-[779px] max-w-full overflow-hidden rounded-2xl border ${STROKE[note.badge]}`}>
            <img
              alt={`${selected.label} 상세`}
              src={selected.preview}
              width={779}
              height={437}
              className="size-full object-cover opacity-100"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Badge tone={badgeTone}>{note.badge}</Badge>
            <p className="font-bold text-[15px] leading-[1.6] text-[#121213]">{note.title}</p>
            <p className="text-[15px] leading-[1.6] text-[#121213]">{note.body}</p>
            <div className="w-full rounded-xl bg-[#e7f3ff] px-3 py-4">
              <p className="whitespace-pre-wrap text-[15px] leading-[1.6] text-[#121213]">{note.extra}</p>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function ResumeDetailSection({ sectionId, onSelectSection }) {
  const selected = RESUME_SECTIONS.find((item) => item.id === sectionId) ?? RESUME_SECTIONS[1];
  const badgeTone = selected.badge === 'Keep' ? 'keep' : selected.badge === 'Problem' ? 'problem' : 'improve';
  const extraBg = selected.badge === 'Problem' ? 'bg-[#fed5d5]' : 'bg-[#e7f3ff]';

  return (
    <GlassPanel className="w-[1091px] max-w-[1091px] px-6 py-7" contentClassName="flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">상세 피드백</p>
        <p className="text-sm leading-[1.42] tracking-[0.14px] text-[#9ca2b1]">제목을 클릭하면 상세피드백이 보여요</p>
      </div>
      <div className="flex items-start gap-10">
        <div className="flex w-[220px] shrink-0 flex-col gap-5">
          {RESUME_SECTIONS.map((item) => {
            const active = item.id === selected.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSection(item.id)}
                className={`w-full text-left text-[18px] leading-[1.5] tracking-[-0.0036px] cursor-pointer ${
                  active ? 'font-bold text-[#121213]' : 'font-medium text-[#9ca2b1]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className={`rounded-xl border px-3 py-4 ${STROKE[selected.badge]}`}>
            <p className="whitespace-pre-wrap text-[15px] leading-[1.6] text-[#121213]">{selected.quote}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Badge tone={badgeTone}>{selected.badge}</Badge>
            <p className="font-bold text-[15px] leading-[1.6] text-[#121213]">{selected.title}</p>
            <p className="whitespace-pre-wrap text-[15px] leading-[1.6] text-[#121213]">{selected.body}</p>
            {selected.extra ? (
              <div className={`w-full rounded-xl px-3 py-4 ${extraBg}`}>
                <p className="whitespace-pre-wrap text-[15px] leading-[1.6] text-[#121213]">{selected.extra}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function PositioningRow({ title, percent, width, body, items, onJump }) {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2 text-base font-bold leading-[1.45]">
          <p className="text-[#121213]">{title}</p>
          <p className="text-[#1a75ff]">{percent}%</p>
        </div>
        <div className="relative h-3 w-full rounded-[5px] bg-[#dfe4e8]">
          <div
            className="absolute inset-y-0 left-0 rounded-[5px] bg-gradient-to-r from-[#70d2ff] to-[#1a75ff] shadow-[inset_-2px_-2px_2px_rgba(255,255,255,0.3)]"
            style={{ width }}
          />
        </div>
        <p className="text-[15px] leading-[1.6] text-[#121213]">{body}</p>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-2.5 rounded-xl bg-[#f4f6f8] p-3">
            <span className="shrink-0 rounded-lg bg-[#747886]/10 px-2 py-1 text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#747886]">
              {item.label}
            </span>
            <p className="min-w-0 flex-1 whitespace-pre-wrap text-[15px] leading-[1.6] text-[#121213]">{item.text}</p>
            <button
              type="button"
              onClick={() => onJump(item.page)}
              className="shrink-0 rounded-lg border border-[#1a75ff] bg-[rgba(26,117,255,0.05)] px-4 py-2 text-sm font-medium leading-[1.42] tracking-[0.14px] text-[#1a75ff] cursor-pointer"
            >
              {item.cta ?? `${item.label} 피드백 →`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PositioningSection({ onJump, documentKind = 'portfolio' }) {
  const isResume = documentKind === 'resume';

  return (
    <GlassPanel className="w-[1091px] max-w-[1091px] px-6 py-7" contentClassName="flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">모집공고 기반 포지셔닝</p>
        <p className="text-sm leading-[1.42] tracking-[0.14px] text-[#9ca2b1]">
          윤영님이 선택한 공고를 기준으로, 현재 적합도와 합격을 위해 보완할 부분을 알려드려요.
        </p>
      </div>
      <div className="flex w-full flex-col gap-7">
        {isResume ? (
          <>
            <PositioningRow
              title="토스 프로덕트 디자이너"
              percent={82}
              width="82%"
              body="현재 자소서는 사용자 중심의 문제 해결과 성장 과정을 잘 보여주고 있어요. 다만 실제 프로덕트를 설계하고 개선한 경험이 구체적으로 드러나지 않아, 직무 역량을 충분히 보여주기에는 아쉬움이 있어요."
              items={[
                {
                  label: '프로젝트 경험',
                  page: 'project',
                  cta: '피드백 →',
                  text: "UI 설계 과정에서 ‘왜 이 UI를 선택했는지'에 대한 의사결정 근거를 한두 줄 추가하면 설득력이 더 높아져요.",
                },
              ]}
              onJump={onJump}
            />
            <div className="h-px w-full bg-[#e7eaee]" />
            <PositioningRow
              title="카카오 프로덕트 디자이너"
              percent={76}
              width="76%"
              body="자소서 전반에서 사용자 경험과 문제 해결에 대한 관심은 잘 드러나요. 다만 다양한 사용자와 이해관계자를 고려한 서비스 설계 경험이 구체적으로 보이지 않아, 복합적인 프로덕트를 다루는 역량은 상대적으로 부족해요."
              items={[
                {
                  label: '직무 경험 및 역량',
                  page: 'skill',
                  cta: '피드백 →',
                  text: '리서치 과정에서 다양한 사용자 그룹의 관점을 비교한 내용을 추가하고,\nUT 결과를 리텐션, 전환율 같은 비즈니스 지표와 연결해 설명해보세요.',
                },
              ]}
              onJump={onJump}
            />
          </>
        ) : (
          <>
            <PositioningRow
              title="토스 프로덕트 디자이너"
              percent={75}
              width="75%"
              body="현재 포트폴리오로는 서류 통과가 쉽지 않아요. 비즈프로필은 사장님(B2B)과 유저(B2C)를 동시에 고려해야 하는 복잡한 서비스인데, 두 프로젝트 모두 단일 사용자 타겟이에요. 리서치 방법론은 인정받을 수 있지만 비즈니스 임팩트 사고가 빠져 있는 게 결정적 약점이에요."
              items={[{ label: '4P', page: 4, text: 'UI 설계에 "왜 이 UI인가" 의사결정 근거 1~2줄 추가' }]}
              onJump={onJump}
            />
            <div className="h-px w-full bg-[#e7eaee]" />
            <PositioningRow
              title="카카오 프로덕트 디자이너"
              percent={55}
              width="55%"
              body="두 프로젝트 모두 단일 사용자 타겟을 중심으로 설계된 경험이에요. 카카오의 프로덕트 디자이너는 B2B·B2C를 비롯해 다양한 사용자와 이해관계자를 고려한 복합적인 서비스 경험을 설계하는 역량도 중요해요. 다양한 사용자 관점과 비즈니스 요구사항을 함께 고려한 프로젝트 경험을 보여주면 더욱 강점이 될 수 있어요."
              items={[
                { label: '6P', page: 6, text: '리서치에 다양한 사용자 그룹 관점 추가' },
                { label: '5P', page: 5, text: 'UT 결과에 비즈니스 지표 변화(리텐션·전환) 연결' },
              ]}
              onJump={onJump}
            />
          </>
        )}
      </div>
    </GlassPanel>
  );
}

function MentorThread({ comments, mentorName, mentorAvatar, menteeAvatar, onSubmit }) {
  const [draft, setDraft] = useState('');
  const hasComments = comments.length > 0;

  return (
    <div className="relative flex w-full flex-col gap-10">
      {hasComments ? (
        <div className="flex flex-col gap-10">
          <p className="text-base font-bold leading-[1.45] text-[#121213]">댓글 {comments.length}개</p>
          <div className="flex flex-col gap-7">
            {comments.map((item) => {
              const isMentor = item.role === 'mentor';
              return (
                <div key={item.id} className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      alt=""
                      src={isMentor ? mentorAvatar : menteeAvatar}
                      className={`shrink-0 rounded-full object-cover ${isMentor ? 'size-9' : 'size-8'}`}
                    />
                    <div className="flex min-w-0 items-center gap-2">
                      <p className="shrink-0 text-[15px] font-bold leading-[1.6] text-[#121213]">
                        {isMentor ? mentorName : '이윤영'}
                      </p>
                      <p className="text-sm font-medium leading-[1.42] tracking-[0.14px] text-[#9ca2b1]">
                        {isMentor ? '멘토' : '멘티'}
                      </p>
                    </div>
                  </div>
                  <p className="text-[15px] leading-[1.6] text-[#121213]">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      <form
        className="relative flex w-full items-center gap-2 rounded-xl bg-white px-5 py-3"
        onSubmit={(event) => {
          event.preventDefault();
          const value = draft.trim();
          if (!value) return;
          onSubmit?.(value);
          setDraft('');
        }}
      >
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="멘토에게 질문하기"
          className="min-w-0 flex-1 bg-transparent text-[15px] leading-[1.6] text-[#121213] outline-none placeholder:text-[#9ca2b1]"
        />
        <button
          type="submit"
          aria-label="전송"
          className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#70d2ff] bg-[#1a75ff] px-5 py-2 shadow-[inset_0_0_4px_#e7f3ff] cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#747886] after:opacity-0 hover:after:opacity-10"
        >
          <img alt="" src={imgSend} className="relative size-6" />
        </button>
      </form>
    </div>
  );
}

function MentorComment({ name, title, children, thread }) {
  const firstName = name.split(' ')[0];

  return (
    <div className="flex w-[812px] flex-col gap-1">
      <p className="text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#ad36e3]">{name}</p>
      <div className="relative flex w-full flex-col gap-10 overflow-hidden rounded-2xl border-[1.5px] border-[#f4f6f8] px-6 py-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.4) 20%, #fbf7ff 100%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_-8px_-8px_60px_rgba(242,214,255,0.4),inset_8px_8px_60px_rgba(242,214,255,0.4)]"
        />
        <div className="relative flex flex-col gap-1">
          <p className="text-lg font-bold leading-[1.5] tracking-[-0.0036px] text-[#121213]">{title}</p>
          <p className="text-sm leading-[1.42] tracking-[0.14px] text-[#9ca2b1]">
            {firstName} 멘토가 추가적으로 피드백한 내용이에요
          </p>
        </div>
        <div className="relative w-full">{children}</div>
        {thread ? (
          <>
            {thread.comments.length > 0 ? <div className="relative h-px w-full bg-[#e7eaee]" /> : null}
            <MentorThread
              comments={thread.comments}
              mentorName={name}
              mentorAvatar={thread.mentorAvatar}
              menteeAvatar={thread.menteeAvatar}
              onSubmit={thread.onSubmit}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

const MENTOR_REPLIES = [
  '좋은 질문이에요. 수치를 아예 빼기보다, UT에서 나온 걸 근거로 삼으면 돼요. 예를 들어 "1차 UT에서 주문 완료까지 평균 5단계였는데, 개선 후 2차 UT에서 3단계로 줄었다"처럼요. 이건 실측이라 면접에서 물어봐도 답할 수 있어요. 학교 프로젝트라도 UT를 돌렸으면 그게 곧 데이터예요.',
  '맞아요, 인트로엔 "주문 여정을 5단계에서 3단계로 단축" 정도만 한 줄로 넣고, 자세한 측정 방법이랑 UT 데이터는 뒤 UT 결과 페이지에서 풀어주세요. 인트로는 "결과가 있다"는 걸 3초 안에 보여주는 곳이고, 근거는 뒤에서 증명하는 거예요. 이 구조면 복잡해 보이지 않으면서 신뢰도 챙길 수 있어요.',
  '그 포인트는 면접에서도 자주 나와요. 한 줄로 임팩트를 보여주고, 다음 장에서 측정 방법·샘플 수·전후 비교를 적어두면 설득력이 훨씬 올라가요. 더 궁금한 장면 있으면 이어서 물어보세요.',
];

const RESUME_MENTOR_REPLIES = [
  '맞아요. “리서치를 했다”에서 끝내지 말고, 그 리서치에서 어떤 문제를 발견했는지 한 문장만 더 넣으면 깊이가 바로 살아나요. 면접에서도 그 문장을 기준으로 질문을 이어가거든요.',
  '대표 프로젝트 하나만 골라서 문제 → 나의 역할 → 해결 → 결과를 네 줄로 적어보세요. 개수를 늘리기보다 그 네 줄이 선명하게 보이는 게 토스·카카오 둘 다에서 먹혀요.',
  '사용자 반응이나 전환처럼 숫자로 증명할 수 있으면 꼭 붙이세요. 숫자가 없어도 “몇 명에게 무엇을 물어 어떤 결정을 바꿨다” 정도면 충분해요. 더 궁금한 문장 있으면 이어서 물어보세요.',
];

function replyForMenteeCount(count, replies = MENTOR_REPLIES) {
  return replies[Math.min(count, replies.length - 1)];
}

function appendMentorChat(setComments, text, replies = MENTOR_REPLIES) {
  const menteeId = `mentee-${Date.now()}`;
  const mentorId = `mentor-${menteeId}`;
  let menteeCount = 0;
  setComments((prev) => {
    if (prev.some((item) => item.id === menteeId)) return prev;
    menteeCount = prev.filter((item) => item.role === 'mentee').length;
    return [...prev, { id: menteeId, role: 'mentee', text }];
  });
  window.setTimeout(() => {
    setComments((current) => {
      if (current.some((item) => item.id === mentorId)) return current;
      return [...current, { id: mentorId, role: 'mentor', text: replyForMenteeCount(menteeCount, replies) }];
    });
  }, 700);
}

export default function ChatFeedbackResult({
  mode = 'agent',
  documentKind = 'portfolio',
  displayName = 'Yoonie',
  mentorDisplayName = 'Yoonie (최윤희)',
  availabilityIntro,
  availabilityDetail,
  mentorAvatar = imgMentorAvatar,
  menteeAvatar = imgMenteeAvatar,
  onEditUpload,
  onOpenMentor: _onOpenMentor,
  onOpenAgent,
}) {
  const scrollRef = useRef(null);
  const timelineRef = useRef(null);
  const lineOriginRef = useRef(null);
  const rowRef = useRef(null);
  const strengthRef = useRef(null);
  const sideRef = useRef(null);
  const detailRef = useRef(null);
  const positioningRef = useRef(null);
  const mentorPageRef = useRef(null);
  const isMentor = mode === 'mentor';
  const isResume = documentKind === 'resume';
  const copy = isResume ? RESUME_COPY : PORTFOLIO_COPY;
  const mentorReplies = isResume ? RESUME_MENTOR_REPLIES : MENTOR_REPLIES;
  const [originTop, setOriginTop] = useState(0);
  const [lineH, setLineH] = useState(56);
  const [showDetail, setShowDetail] = useState(isMentor);
  const [showPositioning, setShowPositioning] = useState(isMentor);
  const [branchOn, setBranchOn] = useState(false);
  const [branchBox, setBranchBox] = useState({
    srcX: 0,
    srcY: 0,
    destX: 0,
    destY: 0,
    posX: 0,
    posY: 0,
    forkX: 0,
  });
  const [page, setPage] = useState(1);
  const [resumeSection, setResumeSection] = useState('project');
  const pendingScroll = useRef(null);
  const [jumpTick, setJumpTick] = useState(0);
  const [pageComments, setPageComments] = useState([]);
  const [positioningComments, setPositioningComments] = useState([]);
  const panelOpen = showDetail || showPositioning;

  useEffect(() => {
    if (!panelOpen) setBranchOn(false);
  }, [panelOpen]);

  useEffect(() => {
    if (!isMentor) return;
    pendingScroll.current = 'mentor';
    setJumpTick((n) => n + 1);
  }, [isMentor]);

  useLayoutEffect(() => {
    const origin = lineOriginRef.current;
    if (!origin) return;
    setOriginTop(origin.offsetTop);
    setLineH(origin.nextElementSibling?.offsetHeight ?? 56);
  }, []);

  useLayoutEffect(() => {
    if (!panelOpen) return undefined;
    const measure = () => {
      const row = rowRef.current;
      const src = strengthRef.current;
      const side = sideRef.current;
      const detail = detailRef.current;
      const pos = positioningRef.current;
      if (!row || !src || !side) return;
      const r = row.getBoundingClientRect();
      const s = src.getBoundingClientRect();
      const d = side.getBoundingClientRect();
      const detailBox = detail?.getBoundingClientRect();
      const posBox = pos?.getBoundingClientRect();
      const srcX = s.right - r.left;
      const destX = d.left - r.left;
      const destY = detailBox
        ? detailBox.top + detailBox.height * 0.45 - r.top
        : s.top + s.height * 0.2 - r.top;
      const posY = posBox
        ? posBox.top + posBox.height * 0.45 - r.top
        : s.bottom - s.height * 0.15 - r.top;
      const forkY = (destY + posY) / 2;
      const cardTop = s.top - r.top + 16;
      const cardBottom = s.bottom - r.top - 16;
      const srcY = Math.min(cardBottom, Math.max(cardTop, forkY));
      const next = {
        srcX,
        srcY,
        destX,
        destY,
        posX: destX,
        posY,
        rowW: row.offsetWidth,
        rowH: row.offsetHeight,
      };
      setBranchBox((prev) =>
        prev.srcX === next.srcX &&
        prev.srcY === next.srcY &&
        prev.destX === next.destX &&
        prev.destY === next.destY &&
        prev.posY === next.posY &&
        prev.rowW === next.rowW &&
        prev.rowH === next.rowH
          ? prev
          : next,
      );
    };
    const id = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    [rowRef, sideRef, detailRef, positioningRef, strengthRef].forEach((item) => {
      if (item.current) observer.observe(item.current);
    });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(id);
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [panelOpen, showDetail, showPositioning, page, resumeSection, pageComments, positioningComments]);

  const growLine = (el) => {
    const origin = lineOriginRef.current;
    if (!el || !origin) return;
    const next = el.getBoundingClientRect().bottom - origin.getBoundingClientRect().top;
    setLineH((prev) => Math.max(prev, next));
  };

  const scrollToNode = (node) => {
    const root = scrollRef.current;
    if (!root || !node) return;
    const rootRect = root.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const sticky = root.querySelector('section.sticky');
    const offset = (sticky?.getBoundingClientRect().height ?? 0) + 8;
    root.scrollTo({
      top: root.scrollTop + (nodeRect.top - rootRect.top) - offset,
      left: Math.max(0, root.scrollLeft + (nodeRect.left - rootRect.left) - 24),
      behavior: 'smooth',
    });
  };

  const selectDetail = (nextPage) => {
    if (nextPage == null) return;
    if (typeof nextPage === 'string') setResumeSection(nextPage);
    else setPage(nextPage);
  };

  const openSide = (focus = 'detail', nextPage) => {
    selectDetail(nextPage);
    const alreadyOpen = showDetail && showPositioning;
    if (!alreadyOpen) setBranchOn(false);
    setShowDetail(true);
    setShowPositioning(true);
    pendingScroll.current = focus;
    setJumpTick((n) => n + 1);
  };

  const openDetail = (nextPage) => openSide('detail', nextPage);
  const openPositioning = () => openSide('positioning');

  const jumpToPage = (nextPage) => {
    setShowDetail(true);
    setShowPositioning(true);
    selectDetail(nextPage);
    pendingScroll.current = 'detail';
    setJumpTick((n) => n + 1);
  };

  useEffect(() => {
    if (!jumpTick) return undefined;
    const target = pendingScroll.current;
    if (!target) return undefined;
    const timer = window.setTimeout(() => {
      const node =
        target === 'positioning'
          ? positioningRef.current
          : target === 'mentor'
            ? mentorPageRef.current
            : detailRef.current;
      pendingScroll.current = null;
      scrollToNode(node);
    }, target === 'mentor' ? 750 : 80);
    return () => window.clearTimeout(timer);
  }, [jumpTick, page, resumeSection, showDetail, showPositioning]);

  return (
    <div
      ref={scrollRef}
      className="relative min-h-0 flex-1 overflow-auto [container-type:inline-size] bg-[radial-gradient(#e7eaee_1.5px,transparent_1.5px)] bg-[size:24px_24px]"
    >
      {isMentor ? (
        <div className="sticky left-0 z-20 w-[100cqi] bg-white px-5 py-5">
          <div className="inline-flex items-center rounded-lg bg-[#f4f6f8] p-0.5">
            <button
              type="button"
              onClick={onOpenAgent}
              className="flex items-center justify-center rounded-lg px-7 py-1 text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#9ca2b1] cursor-pointer"
            >
              AI 에이전트 피드백
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-lg bg-white px-7 py-1 text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#121213] shadow-[0_0_8px_rgba(18,18,19,0.04)]"
            >
              멘토 피드백
            </button>
          </div>
        </div>
      ) : null}
      <section className="sticky left-0 z-10 w-[100cqi] bg-white shadow-[inset_20px_20px_40px_rgba(255,255,255,0.9),inset_-20px_0_40px_rgba(255,255,255,0.25)]">
        <div className="mx-auto flex w-full max-w-[1042px] flex-col items-center gap-4 px-10 py-7">
          <div className="flex min-h-10 w-full flex-col items-center justify-center gap-1 text-center">
            <p className="w-full text-sm font-medium leading-[1.42] tracking-[0.14px] text-[#121213]">
              {isMentor
                ? availabilityIntro || `실제 현직자 ${mentorDisplayName} 멘토와 직접 대화할 수 있어요!`
                : copy.agentIntro(displayName)}
            </p>
            <p className="w-full text-[12px] leading-[1.35] tracking-[0.3px] text-[#747886]">
              {isMentor
                ? availabilityDetail || `${displayName} 멘토는 평일 오후 8시 이후, 주말에 답변이 가능해요.`
                : '실제 멘토의 경험과 의사결정 기준을 바탕으로 학습된 AI 에이전트예요. 실제 멘토의 의견과는 일부 차이가 있을 수 있어요.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <button
              type="button"
              onClick={onEditUpload}
              className="relative overflow-hidden rounded-lg bg-white px-4 py-2 shadow-[0_0_16px_rgba(18,18,19,0.04)] cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
            >
              <span className="relative text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#121213]">
                {copy.editAgent}
              </span>
            </button>
            {isMentor ? (
              <button
                type="button"
                onClick={onEditUpload}
                className="relative overflow-hidden rounded-lg bg-white px-4 py-2 shadow-[0_0_16px_rgba(18,18,19,0.04)] cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
              >
                <span className="relative text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#121213]">
                  {copy.editMentor}
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <div
        ref={timelineRef}
        className={`relative pb-16 pt-8 ${
          panelOpen
            ? 'w-max px-[max(40px,calc((100cqi-1000px)/2))]'
            : 'mx-auto w-full max-w-[1042px] px-10'
        }`}
      >
        <div className={`relative ${panelOpen ? 'w-max' : 'mx-auto w-full'}`}>
            <div
              className="pointer-events-none absolute z-0 w-[1.5px] -translate-x-1/2 bg-[#e7eaee] transition-[height] duration-700 ease-out"
              style={{ left: panelOpen ? 500 : '50%', top: originTop, height: lineH }}
            />

            <div className={`relative z-[1] flex flex-col items-center gap-2 ${panelOpen ? 'w-[1000px] max-w-[1000px]' : 'w-full'}`}>
              <img
                alt={copy.previewAlt}
                src={copy.preview}
                className={`${copy.previewClass} object-cover drop-shadow-[0_0_8px_rgba(18,18,19,0.04)]`}
              />
              <GlassPanel className="w-[298px] px-3 py-3" contentClassName="flex flex-col items-start gap-2.5">
                <p className="w-full font-bold text-[15px] leading-[1.6] text-[#121213]">희망 기업 모집 공고</p>
                <p className="w-full text-[15px] leading-[1.6] text-[#121213]">
                  토스 프로덕트 디자이너 (http://toss.com/job)
                  <br />
                  카카오 UX 디자이너 (http://kakao.com/job)
                </p>
              </GlassPanel>
            </div>

            <div ref={lineOriginRef} className="relative z-[1] h-0 w-full" />
            <div className={`relative z-[1] mt-7 flex h-[42px] items-center justify-center ${panelOpen ? 'w-[1000px]' : 'w-full'}`}>
            <div className="flex h-[42px] items-center rounded-full bg-white px-5 py-3 shadow-[0_0_16px_rgba(18,18,19,0.04)]">
              <p className="text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#9ca2b1]">
                {copy.generating(displayName)}
              </p>
            </div>
            </div>

            <div ref={rowRef} className="relative z-[1] mt-[25px] flex items-start">
          {panelOpen ? <BranchLines box={branchBox} on={branchOn} fork={showPositioning} /> : null}
          <div className={`flex shrink-0 flex-col gap-5 ${panelOpen ? 'w-[1000px] max-w-[1000px]' : 'w-full'}`}>
          <ScrollReveal rootRef={scrollRef} onShow={growLine}>
            <GlassPanel className="w-full px-6 py-7" contentClassName="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <p className="text-[15px] font-medium leading-[1.45] text-[#747886]">종합 피드백</p>
                <div className="flex items-center gap-2">
                  <p className="text-[32px] font-bold leading-[1.4] tracking-[-0.8px] text-[#1a75ff]">{copy.score}점</p>
                  <p className="text-[22px] font-medium leading-[1.4] tracking-[-0.33px] text-[#747886]">/100점</p>
                </div>
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex flex-wrap items-center gap-10 xl:gap-20">
                  <RadarChart axes={copy.radar} />
                  <div className="flex min-w-[280px] flex-1 flex-col gap-5">
                    {copy.bars.map((metric) => {
                      const fill = metric.tone === 'good' ? 'bg-[#1a75ff]' : 'bg-[#569fff]';
                      const text = metric.tone === 'good' ? 'text-[#1a75ff]' : 'text-[#569fff]';
                      return (
                        <div key={metric.label} className="flex w-full flex-col gap-1">
                          <div className="flex w-full items-center gap-1">
                            <p className="flex-1 font-bold text-[15px] leading-[1.45] text-[#121213]">{metric.label}</p>
                            <p className={`shrink-0 font-bold text-[15px] leading-[1.45] ${text}`}>{metric.value}%</p>
                          </div>
                          <div className="relative h-3 w-full overflow-hidden rounded-[5px] bg-[#e7f3ff]">
                            <div className={`absolute inset-y-0 left-0 rounded-[5px] ${fill}`} style={{ width: `${metric.value}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="text-[15px] leading-[1.6] text-[#121213]">
                  {copy.summary.map((paragraph, index) => (
                    <p key={paragraph.slice(0, 24)} className={index === 0 ? undefined : 'mt-0'}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </ScrollReveal>

          <ScrollReveal rootRef={scrollRef} onShow={growLine}>
            <div ref={strengthRef}>
            <GlassPanel className="w-full px-6 py-7" contentClassName="flex flex-col gap-7">
              <div className="flex w-full flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <p className="font-bold text-[15px] leading-[1.45] text-[#121213]">강점</p>
                  {copy.strengths.map((item) => (
                    <FeedbackCard
                      key={item.title}
                      variant="keep"
                      badge={<Badge tone="keep">Keep</Badge>}
                      title={item.title}
                      body={item.body}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-bold text-[15px] leading-[1.45] text-[#121213]">약점</p>
                  <FeedbackCard
                    variant="problem"
                    badge={<Badge tone="problem">Problem</Badge>}
                    title={copy.weakness.title}
                    body={copy.weakness.body}
                    extra={copy.weakness.extra}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-bold text-[15px] leading-[1.45] text-[#121213]">개선점</p>
                  <FeedbackCard
                    variant="improve"
                    badge={<Badge tone="improve">Improve</Badge>}
                    title={copy.improve.title}
                    body={copy.improve.body}
                  />
                </div>
              </div>
              <div className="flex w-full gap-5">
                <button
                  type="button"
                  onClick={() => openDetail()}
                  className={`relative flex min-w-px flex-1 items-center justify-center overflow-hidden rounded-lg border px-5 py-2 cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 ${
                    showDetail ? 'border-[#1a75ff] bg-[#f4f8ff]' : 'border-[#e7eaee] bg-white'
                  }`}
                >
                  <span className="relative text-[15px] font-medium leading-[1.45] text-[#121213]">상세 피드백 받으러 가기</span>
                </button>
                <button
                  type="button"
                  onClick={openPositioning}
                  className={`relative flex min-w-px flex-1 items-center justify-center overflow-hidden rounded-lg border px-5 py-2 cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 ${
                    showPositioning ? 'border-[#1a75ff] bg-[#f4f8ff]' : 'border-[#e7eaee] bg-white'
                  }`}
                >
                  <span className="relative text-[15px] font-medium leading-[1.45] text-[#121213]">모집 공고 기반 포지셔닝 보기</span>
                </button>
              </div>
            </GlassPanel>
            </div>
          </ScrollReveal>
          </div>

          {panelOpen ? (
            <>
              <div className="w-[max(9rem,calc((100cqi-1000px)/2))] shrink-0 self-stretch" />
              <div
                ref={sideRef}
                className={
                  isMentor
                    ? 'grid shrink-0 grid-cols-[1091px_812px] items-start gap-x-9 gap-y-5'
                    : 'flex w-[1091px] shrink-0 flex-col gap-5'
                }
              >
                {showDetail ? (
                  <Appear className="flex flex-col" onShown={() => setBranchOn(true)}>
                    <div ref={detailRef} className="scroll-mt-8">
                      {documentKind === 'resume' ? (
                        <ResumeDetailSection sectionId={resumeSection} onSelectSection={setResumeSection} />
                      ) : (
                        <DetailSection page={page} onSelectPage={setPage} />
                      )}
                    </div>
                  </Appear>
                ) : isMentor ? (
                  <div />
                ) : null}
                {isMentor && showDetail ? (
                  <Appear className="flex flex-col">
                    <div ref={mentorPageRef}>
                      <MentorComment
                        name={mentorDisplayName}
                        title={isResume ? '상세 피드백' : '페이지별 피드백'}
                        thread={{
                          comments: pageComments,
                          mentorAvatar,
                          menteeAvatar,
                          onSubmit: (text) => appendMentorChat(setPageComments, text, mentorReplies),
                        }}
                      >
                        {isResume ? (
                          <div className="flex flex-col gap-3">
                            <p className="text-sm font-medium leading-[1.42] tracking-[0.14px] text-[#747886]">
                              {RESUME_SECTIONS.find((item) => item.id === resumeSection)?.label ?? '프로젝트 경험'}
                            </p>
                            <div className="flex flex-col text-[15px] leading-[1.6] text-[#121213]">
                              <p>
                                프로젝트 경험이 다양하고, 사용자 조사부터 서비스 기획·UX/UI 디자인까지 프로덕트 디자인의
                                전반적인 과정을 경험한 점이 좋아요. 특히 단순히 화면을 디자인하는 데 그치지 않고 리서치와
                                프로토타이핑까지 직접 진행했다는 점에서 실무에 대한 관심과 경험이 잘 드러나요.
                              </p>
                              <p>
                                다만 현재는 여러 프로젝트에서 무엇을 담당했는지를 나열하는 방식에 가까워서, 윤영님이 어떤
                                문제를 발견하고 어떻게 해결했는지는 조금 흐릿하게 보여요. 프로젝트마다 핵심 문제와 본인의
                                역할, 그 결과를 한두 문장씩 구체적으로 추가하면 경험의 깊이가 훨씬 잘 전달될 것 같아요.
                              </p>
                              <p>
                                프로젝트를 많이 보여주기보다, 대표 프로젝트에서 ‘문제 → 해결 → 결과’가 보이도록
                                작성해보세요. 특히 수치나 사용자 반응처럼 결과를 증명할 수 있는 내용이 있다면 함께 제시하는
                                것을 추천해요.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3">
                            <p className="text-sm font-medium leading-[1.42] tracking-[0.14px] text-[#747886]">1P</p>
                            <p className="whitespace-pre-wrap text-[15px] leading-[1.6] text-[#121213]">
                              ‘한 줄 설명을 결과 중심으로 바꾸라' 에이전트 조언은 100% 맞아요. 다만 '40% 단축' 같은 수치를 쓸
                              땐 반드시 어떻게 측정했는지 근거가 뒤 페이지에 있어야 해요. 면접에서 “그 40%는 어떻게 나온
                              숫자예요?” 라고 물었을 때 답 못하면 오히려 마이너스거든요. 수치를 쓸 거면 UT 결과 페이지랑 꼭
                              연결하세요.
                            </p>
                          </div>
                        )}
                      </MentorComment>
                    </div>
                  </Appear>
                ) : null}
                {showPositioning ? (
                  <Appear className="flex flex-col" onShown={() => setBranchOn(true)}>
                    <div ref={positioningRef}>
                      <PositioningSection documentKind={documentKind} onJump={jumpToPage} />
                    </div>
                  </Appear>
                ) : isMentor ? (
                  <div />
                ) : null}
                {isMentor && showPositioning ? (
                  <Appear className="flex flex-col">
                    <MentorComment
                      name={mentorDisplayName}
                      title="모집공고 기반 포지셔닝"
                      thread={{
                        comments: positioningComments,
                        mentorAvatar,
                        menteeAvatar,
                        onSubmit: (text) => appendMentorChat(setPositioningComments, text, mentorReplies),
                      }}
                    >
                      {isResume ? (
                        <div className="flex flex-col gap-7">
                          <div className="flex flex-col gap-2">
                            <p className="text-base font-bold leading-[1.45] text-[#121213]">토스 프로덕트 디자이너</p>
                            <p className="text-[15px] leading-[1.6] text-[#121213]">
                              전체적인 방향은 잘 맞아요. 사용자 문제를 발견하고 더 나은 경험을 만들고 싶다는 이야기가 자소서
                              전체에서 일관되게 보여요. 다만 토스는 단순히 “사용자를 생각하는 디자이너”보다 그 생각을 실제
                              문제 해결과 결과로 연결한 경험을 중요하게 봐요. 프로젝트에서 어떤 문제를 발견했고, 왜 그렇게
                              해결했는지 한두 문장만 더 들어가도 지금보다 훨씬 설득력 있어질 것 같아요.
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="text-base font-bold leading-[1.45] text-[#121213]">카카오 프로덕트 디자이너</p>
                            <p className="text-[15px] leading-[1.6] text-[#121213]">
                              사용자 중심으로 생각하고 UX/UI 전반을 경험했다는 점은 좋아요. 다만 지금 자소서만 보면 윤영님이
                              어떤 상황에서 어떤 판단을 내리는 디자이너인지가 조금 흐릿해요. 카카오처럼 다양한 서비스와
                              사용자를 다루는 환경을 생각한다면, 프로젝트에서 여러 요구사항을 비교하고 본인만의 기준으로
                              디자인 방향을 결정했던 경험을 보여주면 좋아요.
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="text-base font-bold leading-[1.45] text-[#121213]">결론</p>
                            <p className="text-[15px] leading-[1.6] text-[#121213]">
                              두 공고 모두 기본적인 방향은 잘 맞아요. 지금 자소서에서 가장 아쉬운 건 경험의 ‘깊이’예요.
                              프로젝트를 더 많이 추가할 필요는 없어요. 이미 적어둔 경험 중 하나를 골라서 “왜 이 문제를
                              발견했고, 왜 이렇게 해결했는지”를 조금만 더 보여주세요. 그게 윤영님만의 강점으로 연결될 수
                              있어요.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-7">
                          <div className="flex flex-col gap-2">
                            <p className="text-base font-bold leading-[1.45] text-[#121213]">토스 프로덕트 디자이너</p>
                            <p className="text-[15px] leading-[1.6] text-[#121213]">
                              에이전트가 매긴 75%는 얼추 맞아요. 근데 토스는 숫자보다 “이 사람이 비즈니스를 이해하나”를 훨씬
                              세게 봐요. KKINI에 '외국인 관광객 시장 규모가 이만큼이고, 이 기능이 매출/리텐션에 이렇게
                              기여한다' 같은 문장 하나만 넣어도 체감 적합도는 75%보다 훨씬 올라가요.
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="text-base font-bold leading-[1.45] text-[#121213]">카카오 프로덕트 디자이너</p>
                            <p className="text-[15px] leading-[1.6] text-[#121213]">
                              카카오 55%는 좀 낮게 잡힌 것 같아요. AI는 'B2B/B2C 동시 고려 경험이 없어서' 낮게 봤는데, 카카오
                              프로덕트 디자이너는 오히려 C 서비스 깊이를 더 중요하게 봐요. KKINI처럼 단일 타겟이라도 그
                              타겟의 문제를 깊게 판 게 보이면 카카오에선 강점이 돼요. 55%라는 숫자에 너무 위축되지 마세요.
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="text-base font-bold leading-[1.45] text-[#121213]">결론</p>
                            <p className="text-[15px] leading-[1.6] text-[#121213]">
                              비즈니스 임팩트 사고가 빠져 있다'는 AI 지적은 두 회사 다 맞아요. 이건 KKINI만의 문제가 아니라
                              신입 포폴 대부분의 약점이에요. 해결법은 간단해요. 각 프로젝트 마지막에 '그래서 이게 비즈니스에
                              어떤 의미였나' 한 장만 추가하세요. 이거 하나로 다른 지원자랑 확 차별화돼요.
                            </p>
                          </div>
                        </div>
                      )}
                    </MentorComment>
                  </Appear>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
        </div>
      </div>
    </div>
  );
}
