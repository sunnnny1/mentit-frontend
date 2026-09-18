import { useEffect, useState } from 'react';
import ChatSubMenu from './ChatSubMenu';
import ChatProfileBar from './ChatProfileBar';
import ChatAgentPanel from './ChatAgentPanel';
import ChatThread from './ChatThread';
import ChatMentorThread, {
  EUNOIA_MENTOR_CONVERSATION,
  SUNNY_MENTOR_CONVERSATION,
  TEDDY_MENTOR_CONVERSATION,
  YOONIE_MENTOR_CONVERSATION,
} from './ChatMentorThread';
import ChatReview from './ChatReview';
import ChatFeedbackUpload from './ChatFeedbackUpload';
import ChatFeedbackResult from './ChatFeedbackResult';
import ChatStartScreen from './ChatStartScreen';
import figma_6a21ef36_23ee_448e_a72f_026bd1b11241_png from '../../assets/figma/6a21ef36-23ee-448e-a72f-026bd1b11241.png';
import figma_1b69a9c3_f6dc_419e_8b7e_4073ed4858c7_png from '../../assets/figma/1b69a9c3-f6dc-419e-8b7e-4073ed4858c7.png';
import figma_5ddbd43f_7583_4a6b_8ddb_cf34b22b4e76_png from '../../assets/figma/5ddbd43f-7583-4a6b-8ddb-cf34b22b4e76.png';
import figma_ea377a0e_1420_4c73_8a4d_c09f50d135a0_png from '../../assets/figma/ea377a0e-1420-4c73-8a4d-c09f50d135a0.png';
import figma_831143ea_bc10_4177_8788_90ed49816699_png from '../../assets/figma/831143ea-bc10-4177-8788-90ed49816699.png';
import figma_ac693826_e769_4723_8f46_5f82fd520909_png from '../../assets/figma/ac693826-e769-4723-8f46-5f82fd520909.png';
import figma_9a8a793a_7f8d_4803_8fe8_a2de07fedc14_png from '../../assets/figma/9a8a793a-7f8d-4803-8fe8-a2de07fedc14.png';
import figma_a7a013d1_ad2d_40e9_87de_7c0ad93dc40d_png from '../../assets/figma/a7a013d1-ad2d-40e9-87de-7c0ad93dc40d.png';
import figma_2f350675_d7a6_4070_8e18_7ede58745826_png from '../../assets/figma/2f350675-d7a6-4070-8e18-7ede58745826.png';
import figma_a1ebb537_e789_47ea_9b0c_b7eb971effd0_png from '../../assets/figma/a1ebb537-e789-47ea-9b0c-b7eb971effd0.png';
import figma_35c6cc1b_033b_4127_abc7_140365b532f4_png from '../../assets/figma/35c6cc1b-033b-4127-abc7-140365b532f4.png';
import figma_52966149_85bf_4f88_9a88_fc1f7f9fabbb_png from '../../assets/figma/52966149-85bf-4f88-9a88-fc1f7f9fabbb.png';
import imgSunnyAvatar from '../../assets/figma/c11cc4d3-aa70-48e8-a183-5d36c9318492.png';
import imgSunnyMentor from '../../assets/figma/sunny-mentor-profile.png';
import imgSunnyCharacter from '../../assets/figma/ceef9e7c-3912-4cc0-ba9c-dbf2d463f3e3.png';

const imgAvatarAgent = figma_6a21ef36_23ee_448e_a72f_026bd1b11241_png;
const imgAvatarMentor = figma_1b69a9c3_f6dc_419e_8b7e_4073ed4858c7_png;
const imgCharacterActive = figma_5ddbd43f_7583_4a6b_8ddb_cf34b22b4e76_png;

const QA_MAP = {
  '저에게 맞는 직무를 어떻게 선택해야할까요?': {
    text: "저도 처음엔 여러 직무 사이에서 고민 많이 했어요. 좋아하는 일보다 '어떤 문제를 풀 때 몰입이 되는지'를 먼저 봐보세요. 예를 들어 사용자 리서치하고 인사이트 뽑는 과정이 재밌다면 UX 리서처/기획 쪽이, 화면을 다듬고 완성도를 높이는 게 즐겁다면 UI/비주얼 디자인 쪽이 더 잘 맞을 확률이 높아요. 직무별 채용공고 3~5개씩 읽어보면서 '이 업무들, 해보고 싶다'는 느낌이 드는 쪽을 골라보는 것도 좋은 방법이에요.",
  },
  '최근 채용 트렌드가 어떻게 되나요?': {
    text: "요즘은 신입이어도 '왜 이렇게 설계했는지' 논리적으로 설명할 수 있는지를 많이 봐요. 포트폴리오 장수보다 의사결정 과정이 드러나는 케이스 스터디를 선호하는 흐름이고, AI 툴 활용 능력도 플러스 요인으로 보는 곳이 늘고 있어요. 다만 회사마다 편차가 커서, 지원하려는 회사의 최근 채용공고 문구나 현직자 인터뷰를 참고하는 게 가장 정확해요.",
  },
  '취준생이 가장 자주 하는 실수는 무엇인가요?': {
    text: "가장 많이 보이는 실수는 포트폴리오에 '결과'만 나열하고 '왜 그 선택을 했는지'가 빠지는 거예요. 그리고 하나의 포트폴리오로 여러 회사에 동일하게 지원하는 경우도 많은데, 회사마다 강조하는 역량이 달라서 최소한 첫 페이지 정도는 지원하는 회사에 맞게 조정하는 걸 추천드려요.",
  },
  '프로덕트 디자이너에 지원하려고 하는데 포트폴리오 몇 장 정도가 적당한가요?': {
    text: 'Yoonie 멘토님의 실제 사례 기반으로 답변드리면, 2020년 당근 지원 당시 포트폴리오는 4개 프로젝트, 총 18장으로 구성하셨어요. 페이지 수보다 "각 프로젝트에서 왜 이 결정을 했는지"가 명확히 보이는가를 더 중요하게 보셨대요.\n\n그리고 채용 검토 경험으로는, 작년 당근 프로덕트 디자이너 신입 채용 당시 평균적으로 3~4개 프로젝트, 15~20장 내외로 구성한 지원자가 다수였다고 하셨어요.',
    citation: 'Yoonie 멘토 실제 지원 이력 1건, 신입 채용 서류 검토 경험 기반',
    ctaText: '포트폴리오 피드백 받으러 가기',
  },
};

const EUNOIA_QA_MAP = {
  '저에게 맞는 직무를 어떻게 선택해야할까요?': {
    text: "토스에서 일하면서 느낀 건, 직무 적합은 '내가 어떤 산출물을 좋아하는지'보다 '어떤 과정에 오래 앉아 있을 수 있는지'로 가른다는 점이에요. 사용자 인터뷰를 듣고 패턴을 정리하는 게 재밌다면 UX 리서치·프로덕트 쪽이, 컴포넌트를 맞춰 가며 시스템을 쌓는 게 즐겁다면 디자인시스템 쪽이 잘 맞을 확률이 높아요. 최근 프로젝트에서 가장 몰입했던 구간을 한 문장으로 적어보면, 방향이 생각보다 빨리 좁혀져요.",
  },
  '최근 채용 트렌드가 어떻게 되나요?': {
    text: "최근 프로덕트 디자인 채용은 비주얼 완성도보다 '문제를 어떻게 정의했는지', 그리고 그 근거를 리서치·데이터로 설명할 수 있는지를 더 많이 봐요. 토스처럼 시스템이 있는 조직일수록 기존 컴포넌트를 이해하고 예외를 설득하는 경험이 플러스가 되고, 포트폴리오에도 디자인시스템과의 관계를 한 장만이라도 넣는 지원자가 늘고 있어요. 회사마다 기대치가 달라서, 지원 회사의 최근 제품 업데이트와 채용 공고를 같이 보는 게 가장 안전해요.",
  },
  '취준생이 가장 자주 하는 실수는 무엇인가요?': {
    text: "가장 자주 보는 실수는 화면만 예쁘게 모아 두고, 리서치에서 얻은 인사이트가 어떤 결정으로 이어졌는지를 안 보여주는 거예요. 프로덕트 디자이너는 '무엇을 그렸는지'보다 '왜 그 플로우를 골랐는지'로 평가받는 경우가 많아요. 그리고 회사 맥락 없이 같은 포트폴리오를 넣는 경우도 많은데, 최소한 첫 프로젝트는 그 회사가 쓰는 제품 언어나 시스템 관점에 맞춰 한 번 다듬어 보시길 권해요.",
  },
  '프로덕트 디자이너에 지원하려고 하는데 포트폴리오 몇 장 정도가 적당한가요?': {
    text: 'Eunoia 멘토님의 실제 사례 기반으로 답변드리면, 2020년 토스 지원 당시 포트폴리오는 4개 프로젝트, 총 18장으로 구성하셨어요. 페이지 수보다 "각 프로젝트에서 왜 이 결정을 했는지"가 명확히 보이는가를 더 중요하게 보셨대요.\n\n그리고 채용 검토 경험으로는, 작년 토스 프로덕트 디자이너 신입 채용 당시 평균적으로 3~4개 프로젝트, 15~20장 내외로 구성한 지원자가 다수였다고 하셨어요.',
    citation: 'Eunoia 멘토 실제 지원 이력 1건, 신입 채용 서류 검토 경험 기반',
    ctaText: '포트폴리오 피드백 받으러 가기',
  },
};

const TEDDY_QA_MAP = {
  '저에게 맞는 직무를 어떻게 선택해야할까요?': {
    text: "프리랜서로 일하면서 더 분명해진 건, 직무는 '어떤 산출물이 예쁜지'보다 '어떤 문제를 오래 붙잡고 있을 수 있는지'로 고른다는 점이에요. 사용자 인터뷰를 듣고 흐름을 정리하는 게 재밌다면 UX 리서치·프로덕트 쪽이, 화면 완성도와 인터랙션을 다듬는 게 즐겁다면 UI 쪽이 잘 맞을 확률이 높아요. 최근 작업에서 시간 가는 줄 몰랐던 구간을 적어보면, 방향이 빨리 좁혀져요.",
  },
  '최근 채용 트렌드가 어떻게 되나요?': {
    text: "UX 채용은 비주얼보다 '문제를 어떻게 정의했는지', 그리고 그 근거를 리서치로 설명할 수 있는지를 더 많이 봐요. 에이전시·프리랜서 경험이든 인하우스든, 포트폴리오에 의사결정 과정이 보이면 플러스가 되고, AI 툴을 실제 업무에 어떻게 썼는지도 묻는 곳이 늘고 있어요. 지원 회사의 최근 제품과 채용 공고를 같이 보는 게 가장 안전해요.",
  },
  '취준생이 가장 자주 하는 실수는 무엇인가요?': {
    text: "가장 자주 보는 실수는 화면만 모아 두고, 리서치 인사이트가 어떤 결정으로 이어졌는지를 안 보여주는 거예요. UX 디자이너는 '무엇을 그렸는지'보다 '왜 그 플로우를 골랐는지'로 평가받는 경우가 많아요. 그리고 회사 맥락 없이 같은 포트폴리오를 넣는 경우도 많은데, 최소한 첫 프로젝트는 그 회사가 다루는 사용자 문제에 맞춰 한 번 다듬어 보시길 권해요.",
  },
  'UX 디자이너에 지원하려고 하는데 포트폴리오 몇 장 정도가 적당한가요?': {
    text: 'Teddy 멘토님의 실제 사례 기반으로 답변드리면, 2020년 당근 지원 당시 포트폴리오는 4개 프로젝트, 총 18장으로 구성하셨어요. 페이지 수보다 "각 프로젝트에서 왜 이 결정을 했는지"가 명확히 보이는가를 더 중요하게 보셨대요.\n\n그리고 채용 검토 경험으로는, 작년 당근 프로덕트 디자이너 신입 채용 당시 평균적으로 3~4개 프로젝트, 15~20장 내외로 구성한 지원자가 다수였다고 하셨어요.',
    citation: 'Teddy 멘토 실제 지원 이력 1건, 신입 채용 서류 검토 경험 기반',
    ctaText: '포트폴리오 피드백 받으러 가기',
  },
};

const DEFAULT_ANSWER = { text: '아직 학습 중이에요. 조금 더 구체적으로 다시 질문해주시겠어요?' };

const MENTOR_CHAT_CONFIG = {
  Yoonie: {
    displayName: 'Yoonie',
    role: '프로덕트 디자이너 ・ 당근 ・ 5년차',
    badgeLabel: 'Active Mentor',
    badgeColor: '#9054ff',
    profileAvatar: imgAvatarAgent,
    mentorAvatar: imgAvatarMentor,
    mentorDisplayName: 'Yoonie (최윤희)',
    agentGreetingIdle: ['안녕하세요! Yoonie 멘토의 AI Agent에요.', '저를 찾아주셔서 감사해요!'],
    characterIdleImg: figma_ea377a0e_1420_4c73_8a4d_c09f50d135a0_png,
    characterActiveImg: imgCharacterActive,
    gradientColor: 'purple',
    threadIntro: 'Yoonie AI 에이전트와 대화가 시작돼요',
    initialGreeting:
      '안녕하세요? 저는 당근에서 프로덕트 디자이너 5년차인 멘토 Yoonie 입니다. 멘토의 경험을 바탕으로, 이윤영님에게 도움을 드릴게요. 궁금한 점을 말해주세요.',
    qaMap: QA_MAP,
    supportsMentorReview: true,
    mentorConversation: YOONIE_MENTOR_CONVERSATION,
    availabilityIntro: '실제 현직자 Yoonie, 최윤희 멘토와 직접 대화할 수 있어요!',
    availabilityDetail: 'Yoonie 멘토는 평일 오후 8시 이후, 주말에 답변이 가능해요.',
  },
  Eunoia: {
    displayName: 'Eunoia',
    role: '프로덕트 디자이너 ・ 토스 ・ 3년차',
    badgeLabel: 'Master Mentor',
    badgeColor: '#e52222',
    profileAvatar: figma_831143ea_bc10_4177_8788_90ed49816699_png,
    mentorAvatar: figma_ac693826_e769_4723_8f46_5f82fd520909_png,
    mentorDisplayName: 'Eunoia (이지희)',
    agentGreetingIdle: ['안녕하세요! Eunoia 멘토의 AI Agent에요.', '저를 찾아주셔서 감사해요!'],
    characterIdleImg: figma_9a8a793a_7f8d_4803_8fe8_a2de07fedc14_png,
    characterActiveImg: figma_a7a013d1_ad2d_40e9_87de_7c0ad93dc40d_png,
    gradientColor: 'red',
    threadIntro: 'Eunoia AI 에이전트와 대화가 시작돼요',
    initialGreeting:
      '안녕하세요? 저는 토스에서 프로덕트 디자이너 3년차인 멘토 Eunoia 입니다. 멘토의 경험을 바탕으로, 이윤영님에게 도움을 드릴게요. 궁금한 점을 말해주세요.',
    qaMap: EUNOIA_QA_MAP,
    supportsMentorReview: true,
    mentorConversation: EUNOIA_MENTOR_CONVERSATION,
    availabilityIntro: '실제 현직자 Eunoia, 이지희 멘토와 직접 대화할 수 있어요!',
    availabilityDetail: 'Eunoia 멘토는 평일 오후 6시 이후, 주말 오전에 답변이 가능해요.',
  },
  Teddy: {
    displayName: 'Teddy',
    role: 'UX 디자이너 ・ 프리랜서 ・ 6년차',
    badgeLabel: 'Rookie Mentor',
    badgeColor: '#008dcf',
    profileAvatar: figma_2f350675_d7a6_4070_8e18_7ede58745826_png,
    mentorAvatar: figma_a1ebb537_e789_47ea_9b0c_b7eb971effd0_png,
    mentorDisplayName: 'Teddy (박태훈)',
    agentGreetingIdle: ['안녕하세요! Teddy 멘토의 AI Agent에요.', '저를 찾아주셔서 감사해요!'],
    characterIdleImg: figma_35c6cc1b_033b_4127_abc7_140365b532f4_png,
    characterActiveImg: figma_52966149_85bf_4f88_9a88_fc1f7f9fabbb_png,
    gradientColor: 'blue',
    threadIntro: 'Teddy AI 에이전트와 대화가 시작돼요',
    initialGreeting:
      '안녕하세요? 저는 프리랜서로 일하고 있는 UX 디자이너 6년차인 멘토 Teddy 입니다. 멘토의 경험을 바탕으로, 이윤영님에게 도움을 드릴게요. 궁금한 점을 말해주세요.',
    qaMap: TEDDY_QA_MAP,
    suggestedChips: [
      '저에게 맞는 직무를 어떻게 선택해야할까요?',
      '최근 채용 트렌드가 어떻게 되나요?',
      '취준생이 가장 자주 하는 실수는 무엇인가요?',
    ],
    supportsMentorReview: true,
    mentorConversation: TEDDY_MENTOR_CONVERSATION,
    availabilityIntro: '실제 현직자 Teddy, 박태훈 멘토와 직접 대화할 수 있어요!',
    availabilityDetail: 'Teddy 멘토는 평일 오후 5시 이후, 주말에 답변이 가능해요.',
  },
  Sunny: {
    displayName: 'Sunny',
    role: 'UX 디자이너 ・ 카카오 ・ 5년차',
    badgeLabel: 'Active Mentor',
    badgeColor: '#9054ff',
    profileAvatar: imgSunnyAvatar,
    mentorAvatar: imgSunnyMentor,
    mentorDisplayName: 'Sunny (엄선희)',
    agentGreetingIdle: ['안녕하세요! Sunny 멘토의 AI Agent에요.', '저를 찾아주셔서 감사해요!'],
    characterIdleImg: imgSunnyCharacter,
    characterActiveImg: imgSunnyCharacter,
    gradientColor: 'blue',
    threadIntro: 'Sunny AI 에이전트와 대화가 시작돼요',
    initialGreeting:
      '안녕하세요? 저는 카카오에서 UX 디자이너 5년차인 멘토 Sunny 입니다. 멘토의 경험을 바탕으로, 이윤영님에게 도움을 드릴게요. 궁금한 점을 말해주세요.',
    qaMap: TEDDY_QA_MAP,
    supportsMentorReview: true,
    mentorConversation: SUNNY_MENTOR_CONVERSATION,
    availabilityIntro: '실제 현직자 Sunny, 엄선희 멘토와 직접 대화할 수 있어요!',
    availabilityDetail: 'Sunny 멘토는 평일 오후 7시 이후, 주말에 답변이 가능해요.',
    agentTabLabel: 'AI Agent 면접 피드백',
    openInterviewFeedback: true,
    feedbackCard: {
      title: '카카오 UX 디자이너 직무 실무 면접',
      subtitle: '모의 면접 AI 피드백 보러가기',
    },
  },
};

export default function ChatPage({
  isSubMenuOpen = true,
  onCloseSubMenu,
  onNavigateHome,
  onOpenMentorExplore,
  onOpenMentorSearch,
  skipStart = false,
  initialMentor = 'Yoonie',
  initialChatMode = 'agent',
  unreadByMentor: unreadByMentorProp,
  onReadMentor,
  onOpenInterviewFeedback,
}) {
  const [started, setStarted] = useState(skipStart);
  const [showAgent, setShowAgent] = useState(true);
  const [chatMode, setChatMode] = useState(initialChatMode); // 'agent' | 'mentor' | 'review'
  const [activeMentor, setActiveMentor] = useState(initialMentor);
  const [messages, setMessages] = useState([]);
  const [isAnswering, setIsAnswering] = useState(false);
  const [subMenuTab, setSubMenuTab] = useState('chat');
  const [feedbackReady, setFeedbackReady] = useState(false);
  const [feedbackView, setFeedbackView] = useState('upload');
  const [feedbackKind, setFeedbackKind] = useState('portfolio');
  const [unreadByMentorLocal, setUnreadByMentorLocal] = useState({ Sunny: 0, Yoonie: 0, Teddy: 0, Eunoia: 1 });
  const unreadByMentor = unreadByMentorProp ?? unreadByMentorLocal;
  const [feedbackUnreadByMentor, setFeedbackUnreadByMentor] = useState({ Yoonie: 0, Sunny: 2 });

  const mentorConfig = MENTOR_CHAT_CONFIG[activeMentor] ?? MENTOR_CHAT_CONFIG.Yoonie;
  const isFeedbackTab = subMenuTab === 'feedback';

  useEffect(() => {
    onReadMentor?.(activeMentor);
    setUnreadByMentorLocal((prev) => {
      if (!prev[activeMentor]) return prev;
      return { ...prev, [activeMentor]: 0 };
    });
  }, [activeMentor, onReadMentor]);

  const handleSelectMentor = (name) => {
    setActiveMentor(name);
    setStarted(true);
    if (subMenuTab === 'feedback') {
      setFeedbackUnreadByMentor((prev) => (prev[name] ? { ...prev, [name]: 0 } : prev));
      return;
    }
    onReadMentor?.(name);
    setUnreadByMentorLocal((prev) => (prev[name] ? { ...prev, [name]: 0 } : prev));
    setChatMode(name === 'Sunny' ? 'mentor' : 'agent');
    setMessages([]);
    setIsAnswering(false);
    setShowAgent(true);
  };

  const handleSelectSubMenuTab = (tab) => {
    setSubMenuTab(tab);
    if (tab !== 'feedback') return;
    setStarted(true);
    if (activeMentor !== 'Yoonie' && activeMentor !== 'Sunny') {
      setActiveMentor('Yoonie');
    }
  };

  const openFeedbackUpload = () => {
    setStarted(true);
    setSubMenuTab('feedback');
    if (activeMentor !== 'Yoonie' && activeMentor !== 'Sunny') {
      setActiveMentor('Yoonie');
    }
  };

  const openAgentFeedback = (kind) => {
    if (kind === 'resume' || kind === 'portfolio') setFeedbackKind(kind);
    setSubMenuTab('feedback');
    setFeedbackView('result');
  };

  const openMentorFromFeedback = () => {
    setSubMenuTab('feedback');
    setFeedbackView('mentor');
  };

  const handleSend = (userText) => {
    const value = userText.trim();
    if (!value) return;
    const qaMap = MENTOR_CHAT_CONFIG[activeMentor]?.qaMap ?? QA_MAP;
    const answer = qaMap[value] ?? DEFAULT_ANSWER;
    setMessages((prev) => [...prev, { role: 'user', text: value }]);
    setIsAnswering(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'mentor', text: answer.text, citation: answer.citation, ctaText: answer.ctaText },
      ]);
      setIsAnswering(false);
    }, 2200);
  };

  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && (
        <ChatSubMenu
          onClose={onCloseSubMenu}
          activeMentor={activeMentor}
          onSelectMentor={handleSelectMentor}
          unreadByMentor={isFeedbackTab ? feedbackUnreadByMentor : unreadByMentor}
          tab={subMenuTab}
          onSelectTab={handleSelectSubMenuTab}
        />
      )}

      {started ? (
        <section className="flex-1 min-w-0 min-h-0 flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
          <ChatProfileBar
            mode={isFeedbackTab ? (feedbackView === 'mentor' ? 'mentor' : 'agent') : chatMode}
            displayName={mentorConfig.displayName}
            mentorDisplayName={mentorConfig.mentorDisplayName}
            role={mentorConfig.role}
            badgeLabel={mentorConfig.badgeLabel}
            badgeColor={mentorConfig.badgeColor}
            profileAvatar={mentorConfig.profileAvatar}
            mentorAvatar={mentorConfig.mentorAvatar}
            supportsMentorReview={!isFeedbackTab && mentorConfig.supportsMentorReview}
            extraActionLabel={
              isFeedbackTab && feedbackView === 'mentor'
                ? '리뷰 쓰러가기'
                : isFeedbackTab && feedbackView === 'result'
                  ? '멘토에게 피드백받기'
                  : isFeedbackTab && feedbackReady
                    ? '에이전트에게 피드백받기'
                    : undefined
            }
            extraActionVariant="primary"
            onExtraAction={
              feedbackView === 'mentor'
                ? () => {
                    setSubMenuTab('chat');
                    setChatMode('review');
                  }
                : feedbackView === 'result'
                  ? openMentorFromFeedback
                  : openAgentFeedback
            }
            onStartMentorChat={() => setChatMode('mentor')}
            onStartReview={() => setChatMode('review')}
            onSubmitReview={onNavigateHome}
          />
          <div className="h-px w-full shrink-0 bg-[#e7eaee]" />
          <div className="flex flex-1 min-h-0 overflow-hidden">
            <div className={`flex flex-1 min-h-0 overflow-hidden ${isFeedbackTab && feedbackView === 'upload' ? '' : 'hidden'}`}>
              <ChatFeedbackUpload
                onReadyChange={setFeedbackReady}
                onFileKindChange={setFeedbackKind}
                onRequestAgentFeedback={openAgentFeedback}
              />
            </div>
            {isFeedbackTab && (feedbackView === 'result' || feedbackView === 'mentor') ? (
              <ChatFeedbackResult
                key={`${feedbackView}-${feedbackKind}`}
                mode={feedbackView === 'mentor' ? 'mentor' : 'agent'}
                documentKind={feedbackKind}
                displayName={mentorConfig.displayName}
                mentorDisplayName={mentorConfig.mentorDisplayName}
                availabilityIntro={mentorConfig.availabilityIntro}
                availabilityDetail={mentorConfig.availabilityDetail}
                mentorAvatar={mentorConfig.mentorAvatar}
                onEditUpload={() => setFeedbackView('upload')}
                onOpenMentor={openMentorFromFeedback}
                onOpenAgent={openAgentFeedback}
              />
            ) : null}
            {isFeedbackTab ? null : chatMode === 'review' ? (
              <ChatReview mentorDisplayName={mentorConfig.mentorDisplayName} />
            ) : chatMode === 'mentor' ? (
              <ChatMentorThread
                onBackToAgent={() => {
                  if (mentorConfig.openInterviewFeedback) {
                    onOpenInterviewFeedback?.();
                    return;
                  }
                  setChatMode('agent');
                }}
                mentorDisplayName={mentorConfig.mentorDisplayName}
                availabilityIntro={mentorConfig.availabilityIntro}
                availabilityDetail={mentorConfig.availabilityDetail}
                conversation={mentorConfig.mentorConversation}
                agentTabLabel={mentorConfig.agentTabLabel}
                feedbackCard={
                  mentorConfig.feedbackCard
                    ? { ...mentorConfig.feedbackCard, onClick: onOpenInterviewFeedback }
                    : undefined
                }
              />
            ) : (
              <>
                {showAgent && (
                  <ChatAgentPanel
                    isSubMenuOpen={isSubMenuOpen}
                    onClose={() => setShowAgent(false)}
                    hasStarted={messages.length > 0}
                    displayName={mentorConfig.displayName}
                    agentGreetingIdle={mentorConfig.agentGreetingIdle}
                    characterIdleImg={mentorConfig.characterIdleImg}
                    characterActiveImg={mentorConfig.characterActiveImg}
                    gradientColor={mentorConfig.gradientColor}
                  />
                )}
                <ChatThread
                  messages={messages}
                  onSend={handleSend}
                  isAnswering={isAnswering}
                  showAgent={showAgent}
                  onShowAgent={() => setShowAgent(true)}
                  displayName={mentorConfig.displayName}
                  threadIntro={mentorConfig.threadIntro}
                  initialGreeting={mentorConfig.initialGreeting}
                  suggestedChips={mentorConfig.suggestedChips}
                  onCtaClick={openFeedbackUpload}
                />
              </>
            )}
          </div>
        </section>
      ) : (
        <ChatStartScreen
          onOpenMentorExplore={onOpenMentorExplore}
          onOpenMentorSearch={onOpenMentorSearch}
        />
      )}
    </div>
  );
}
