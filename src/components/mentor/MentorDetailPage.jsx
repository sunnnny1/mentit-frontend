import { useState, useRef, useEffect } from 'react';

import imgSunnyAvatar from '../../assets/icons/ellipse-sunny.png';

const imgYoonieAvatar = 'https://www.figma.com/api/mcp/asset/6295d8ad-2523-4444-ad67-afa9c909b74e.png';
const imgKakaoSunny = 'https://www.figma.com/api/mcp/asset/1597f73a-ad68-4de9-b3d2-a991bbd381ae.png';
const imgWanted = 'https://www.figma.com/api/mcp/asset/a873382d-6e6d-435c-8771-5cacb244e020.png';
const imgInfoIconMaster = 'https://www.figma.com/api/mcp/asset/28f4314c-4318-4458-b819-bf1da5cdceb2.svg';
const imgReviewerMumumu = 'https://www.figma.com/api/mcp/asset/e239b3f5-12b3-4681-9f36-892fad5385ea.png';
const imgReviewerKiki = 'https://www.figma.com/api/mcp/asset/a3943117-ae68-4d0a-ba07-b53cbf13a6d9.png';
const imgReviewerCoco = 'https://www.figma.com/api/mcp/asset/c69f52ef-4a44-42a0-ad38-bc4d99cc5aff.png';
const imgSunnyCareerTalk1 = 'https://www.figma.com/api/mcp/asset/5bead996-cc1d-42c1-88a7-1d6e3d408833.png';
const imgSunnyCareerTalk2 = 'https://www.figma.com/api/mcp/asset/05b829b9-5dbc-4852-aa40-7b088ff2bd1a.png';
const imgCarrot = 'https://www.figma.com/api/mcp/asset/6173dd1c-ece3-40d6-9f2d-207c1b37aab8.png';
const imgKakao = 'https://www.figma.com/api/mcp/asset/aacd105e-6ca7-4c89-8003-29bd622d36d1.png';
const imgInfoIcon = 'https://www.figma.com/api/mcp/asset/dec8b4d6-0b3c-4134-8a25-e5349f8a34a2.svg';
const imgAiSummaryIcon = 'https://www.figma.com/api/mcp/asset/36ef78e8-6018-4fe4-b391-6cb5a05aac28.svg';
const imgChevronDown = 'https://www.figma.com/api/mcp/asset/f8febec3-4d51-48c7-8360-5b05675e4744.svg';
const imgReviewerLuvuuu = 'https://www.figma.com/api/mcp/asset/f81418e4-29cb-4475-a83a-eeb1b8d64498.png';
const imgReviewer0sun222 = 'https://www.figma.com/api/mcp/asset/2c19024b-17a0-42cd-86ef-8b687e86e85d.png';
const imgReviewerGangster = 'https://www.figma.com/api/mcp/asset/05e547f0-62a2-4529-8bb7-c0e0ee15ff0f.png';
const imgCareerTalk1 = 'https://www.figma.com/api/mcp/asset/cf4d18f0-b8e2-4926-8732-e374fb76c8dc.png';
const imgCareerTalk2 = 'https://www.figma.com/api/mcp/asset/8fa0c82f-a109-4595-8904-36697277be94.png';
const imgBookmarkIcon = 'https://www.figma.com/api/mcp/asset/e88c6a0f-2d46-4411-bb2a-dbec13f35e62.svg';
const imgLikeIcon = 'https://www.figma.com/api/mcp/asset/dd6271ff-e3ce-4f32-9805-ef894b9a29f0.svg';
const imgChevronRightIcon = 'https://www.figma.com/api/mcp/asset/d551385b-79cd-4290-b3b3-7b250cc4dbd0.svg';

const REVIEWS = [
  {
    id: 'luvuuu',
    name: 'luvuuu',
    avatar: imgReviewerLuvuuu,
    channel: '채팅',
    tags: ['실무 인사이트 공유', '빠른 응답'],
    text: '현직자한테 직접 물어보는 게 이렇게 든든한 거였다니... 취업 카페에서 떠도는 카더라랑은 차원이 달라요. 실무에서 진짜 쓰는 팁들을 아낌없이 풀어주셔서 노트 빼곡히 적었네요. 강추합니다!',
    date: '2026.05.15',
  },
  {
    id: '0sun222',
    name: '0sun222',
    avatar: imgReviewer0sun222,
    channel: '피드백',
    tags: ['포트폴리오 개선', '명확한 피드백'],
    text: 'AI가 80점 준 거 보고 살짝 시무룩했는데, 멘토님이 "카카오는 이 부분을 그렇게 안 본다"고 하시면서 오히려 강점이라고 짚어주셨어요. 숫자에 쫄았던 제가 바보 같을 정도로 ㅋㅋ 사람 멘토가 있는 게 이래서 다른가봐요. 다시 자신감 얻고 갑니다!',
    date: '2026.05.15',
  },
  {
    id: 'gangster',
    name: 'Gangster',
    avatar: imgReviewerGangster,
    channel: '피드백',
    tags: ['자소서 개선', '구체적 조언', '적극적인 소통'],
    text: '"3페이지는 괜찮고, 4페이지만 이렇게 수정해보세요" 하고 필요한 부분을 콕 집어주시는 게 정말 좋았어요. 두루뭉술하게 "더 잘하세요"라고 하는 피드백이 아니라, 어느 부분을 어떻게 고치면 좋을지 바로 이해할 수 있어서 수정 방향을 잡는 데 큰 도움이 됐어요. 마지막에는 잘할 수 있다고 응원까지 해주셔서 자신감을 얻었고, 덕분에 힘내서 지원할 수 있었습니다. 결과적으로 서류에도 합격했어요!! 멘토님께 정말 감사드려요 :)',
    date: '2026.05.15',
  },
];

const CAREER_TALKS = [
  {
    id: 'yoonie',
    image: imgCareerTalk1,
    badge: '프로덕트 디자인',
    title: 'AI 시대의 프로덕트 디자인 활용 팁',
  },
  {
    id: 'ai-survive',
    image: imgCareerTalk2,
    badge: '프로덕트 디자인',
    title: 'AI 시대의 프로덕트 디자이너가 살아남는 법',
  },
];

const QNA_ANSWERS = [
  {
    id: 'failed',
    question: '포트폴리오에 실패한 프로젝트 넣어도 될까요?',
    text: '실패한 프로젝트를 포트폴리오에 포함하는 것 자체는 전혀 문제가 되지 않습니다. 오히려 프로젝트가 기대했던 결과를 얻지 못했더라도, 그 과정에서 어떤 문제를 발견했고 이를 어떻게 분석했으며, 이후 어떤 개선 방향을 도출했는지를 함께 보여준다면 지원자의 문제 해결 능력과 성장 가능성을 효과적으로 전달할 수 있습니다.',
    likes: 127,
  },
  {
    id: 'collab',
    question: '프로덕트 디자이너의 협업능력이 필수일까요?',
    text: '프로덕트 디자이너로써 협업은 불가피합니다. 협업을 잘 하기 위해서는 단연 소통 능력이 중요하다고 생각합니다. 아무래도 모든 회사가 그렇겠지만 특히 제가 재직하고 있는 IT 업계의 경우 이 능력이 중요합니다. 제가 1년차였을 당시에는 경험이 부족하다보니 회의 시간마다 아주 어려움을 겪었던 기억이 있습니다. 결국 중요한 것은...',
    likes: 89,
  },
  {
    id: 'prep',
    question: '프로덕트 디자이너 취업 준비, 무엇부터 시작해야 할까요?',
    text: '가장 먼저 지원하고 싶은 직무와 기업에서 어떤 역량을 중요하게 보는지 파악하는 것부터 추천해요. 그다음 본인의 프로젝트를 직무 역량에 맞춰 정리하고, 단순히 결과물을 보여주기보다 문제를 어떻게 발견하고 해결했는지가 드러나도록 포트폴리오를 다듬어보세요.',
    likes: 85,
  },
];

const TABS = [
  { key: 'intro', label: '멘토 소개' },
  { key: 'review', label: '리뷰' },
  { key: 'content', label: '콘텐츠' },
];

const CAREERS = [
  { logo: imgCarrot, company: '당근', role: '프로덕트 디자이너', period: '2021.01 - 재직중' },
  { logo: imgKakao, company: '카카오', role: '프로덕트 디자이너', period: '2020.01 - 2020.12' },
];

const STEPS = [
  {
    title: '멘토 확인 및 선택',
    desc: "멘토의 정보를 확인하고 원하는 멘토를 선택해 '에이전트와 채팅하기' 버튼을 선택해 주세요.",
  },
  {
    title: 'AI 에이전트 요청',
    desc: '실제 멘토와 대화하기 전, 멘토의 데이터를 학습한 AI 에이전트와 대화를 할 수 있어요. 포트폴리오, 자소서를 피드백 받고싶으면 채팅 내역에서 피드백을 선택해서 진행하거나 에이전트에게 포트폴리오라고 입력하면 해당 페이지로 이동할 수 있어요.',
  },
  {
    title: '실제 멘토와 대화하기',
    desc: "실제 멘토와 대화를 하고싶다면 '멘토와 채팅하기' 버튼을 통해 실제 멘토에게 채팅을 보낼 수 있어요. 채팅을 멘토가 확인한 후 답장해줄거에요.",
  },
];

const SUNNY_REVIEWS = [
  {
    id: 'mumumu',
    name: 'mumumu',
    avatar: imgReviewerMumumu,
    channel: '면접',
    tags: ['실무 인사이트 공유', '빠른 응답'],
    text: '모의면접하면서 제가 놓치고 있던 부분을 하나씩 짚어주셔서 좋았어요. 실제 면접에서 어떻게 말하면 좋을지까지 제안해주셔서 바로 적용할 수 있었습니다.',
    date: '2026.05.15',
  },
  {
    id: 'kiki',
    name: 'kiki',
    avatar: imgReviewerKiki,
    channel: '면접',
    tags: ['취업 방향 설정', '명확한 피드백'],
    text: 'AI 점수만 보고 제 답변이 부족하다고 생각했는데, 멘토님이 직접 들어보시고 오히려 강점으로 가져가면 좋을 부분을 짚어주셨어요.',
    date: '2026.05.15',
  },
  {
    id: 'coco',
    name: 'Coco',
    avatar: imgReviewerCoco,
    channel: '면접',
    tags: ['구체적 조언', '적극적인 소통'],
    text: '혼자 준비할 때는 답변이 괜찮은지 판단하기 어려웠는데, 현직자 관점에서 직접 피드백을 받으니 어떤 부분이 부족한지 바로 이해됐어요. 특히 제가 한 경험을 면접 답변으로 어떻게 연결할지 알려주신 게 가장 도움이 됐습니다. 덕분에 이번에 있는 카카오 실무 면접도 잘 보고 올 수 있을 것 같은 느낌이 듭니다 ㅎㅎ 합격한다면 다 멘토님 덕분이에요!',
    date: '2026.05.15',
  },
];

const SUNNY_CAREER_TALKS = [
  {
    id: 'interview-donts',
    image: imgSunnyCareerTalk1,
    badge: '면접',
    title: '면접 볼 때 이것만은 하지 마세요!',
  },
  {
    id: 'interview-common',
    image: imgSunnyCareerTalk2,
    badge: '면접',
    title: '면접관이 보는 합격하는 사람의 공통점',
  },
];

const SUNNY_QNA_ANSWERS = [
  {
    id: 'ux-interview',
    question: 'UX 디자이너 면접에서 중요한 것은 무엇인가요?',
    text: 'UX 디자이너 면접에서는 결과물 자체보다 왜 그런 문제를 발견했고, 어떤 근거로 해결 방법을 선택했는지를 설명하는 것이 중요하다고 생각합니다. 프로젝트의 결과만 보여주기보다 문제 상황부터 나의 판단과 행동, 그 결과까지 논리적으로 설명하면 문제 해결 과정과 UX 흐름을 잘 설명하면 좋을 것 같아요.',
    likes: 127,
  },
  {
    id: 'why-design',
    question: '“왜 이 디자인을 선택했나요?”라는 질문에는 어떻게 답해야 하나요?',
    text: '“디자인의 취향이 아닌 근거를 이야기하세요.”\n사용자 테스트, 리서치, 데이터, 비즈니스 목표 등 어떤 근거를 바탕으로 결정했는지를 설명하는 것이 중요합니다. 특히 여러 대안 중 왜 최종 방향을 선택했는지까지 설명한다면, 단순히 결과물을 만드는 디자이너가...',
    likes: 89,
  },
  {
    id: 'prep',
    question: '프로덕트 디자이너 취업 준비, 무엇부터 시작해야 할까요?',
    text: '가장 먼저 지원하고 싶은 직무와 기업에서 어떤 역량을 중요하게 보는지 파악하는 것부터 추천해요. 그다음 본인의 프로젝트를 직무 역량에 맞춰 정리하고, 단순히 결과물을 보여주기보다 문제를 어떻게 발견하고 해결했는지가 드러나도록 포트폴리오를 다듬어보세요.',
    likes: 85,
  },
];

const SUNNY_CAREERS = [
  { logo: imgKakaoSunny, company: '카카오', role: 'UX 디자이너', period: '2021.01 - 재직중' },
  { logo: imgWanted, company: '원티드', role: '그래픽 디자이너', period: '2020.01 - 2020.12' },
];

const MENTOR_PAGES = {
  yoonie: {
    id: 'yoonie',
    displayName: 'Yoonie 멘토',
    badge: 'active',
    specialty: 'IT 기업 프로덕트 디자인 포트폴리오 구성 도움',
    portfolioLabel: 'Yoonie 멘토 포트폴리오 사이트',
    linkedinLabel: 'Yoonie 멘토 링크드인',
    bio: 'UX와 프로덕트 디자인 경험을 바탕으로 UX 리서치부터 데이터 분석, 디자인시스템까지 집중적으로 답변해드립니다.\n네이버, 카카오, 당근마켓 등에서 다양한 사람들과 프로젝트를 진행하고 팀을 리딩해왔습니다. 커머스, 커뮤니티, 핀테크, 동영상 등 여러 도메인을 넘나들며 ‘좋은 디자인’을 고민해왔어요. 실제 면접관들이 어떤 시선으로 포트폴리오를 보고 판단하는지, 도메인별로 어떤 특징이 있는지 그 현실적인 관점을 나누고 싶어요.',
    careers: CAREERS,
    reviews: REVIEWS,
    reviewCount: 45,
    aiSummary:
      '멘티들이 가장 많이 꼽은 강점은 "명확한 피드백"이에요. "두루뭉술한 조언이 아니라 바로 고칠 수 있었다"는 후기가 반복적으로 나왔어요. 포폴・자소서 피드백 만족도가 특히 높아요.',
    careerTalks: CAREER_TALKS,
    qnaAnswers: QNA_ANSWERS,
    sidebar: {
      avatar: imgYoonieAvatar,
      roleLine: '프로덕트 디자이너 ・ 당근 ・ 5년차',
      tags: ['프로덕트 디자인', '포트폴리오'],
      followers: '1.2K',
      chats: '60',
      reviews: '45',
      gradient: 'linear-gradient(-1.85deg, rgba(233,186,255,0.25) 1.43%, rgba(251,247,255,0.25) 50%), #ffffff',
      canChat: true,
      canInterview: false,
    },
  },
  sunny: {
    id: 'sunny',
    displayName: 'Sunny 멘토',
    badge: 'master',
    specialty: 'IT 기업 면접 준비 및 이직 준비 도움',
    portfolioLabel: 'Sunny 멘토 포트폴리오 사이트',
    linkedinLabel: 'Sunny 멘토 링크드인',
    bio: '사용자 리서치부터 UX 설계까지 다양한 프로젝트를 경험해왔어요. 디자인 취업을 준비하면서 생기는 고민과 실무에서 필요한 역량에 대해 구체적으로 알려드릴게요.',
    careers: SUNNY_CAREERS,
    reviews: SUNNY_REVIEWS,
    reviewCount: 50,
    aiSummary:
      '특히 모의면접과 멘토 피드백에 대한 만족도가 높아요. 현직자 관점에서 답변의 부족한 부분을 구체적으로 짚어주고, 실제 면접에서 바로 활용할 수 있는 개선 방향과 스크립트를 제공한 점이 가장 도움이 되었다는 의견이 많았어요.',
    careerTalks: SUNNY_CAREER_TALKS,
    qnaAnswers: SUNNY_QNA_ANSWERS,
    sidebar: {
      avatar: imgSunnyAvatar,
      roleLine: 'UX 디자이너 ・ 카카오 ・ 5년차',
      tags: ['UX 디자인', '면접'],
      followers: '4K',
      chats: '30',
      reviews: '50',
      gradient: 'linear-gradient(-1.85deg, rgba(255,181,181,0.25) 1.43%, rgba(255,250,250,0.25) 50%), #ffffff',
      canChat: false,
      canInterview: true,
    },
  },
};

function MentorTypeBadge({ variant = 'active', onClick }) {
  const isMaster = variant === 'master';
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex items-center gap-1 h-7 px-2 py-1 rounded-lg shrink-0 cursor-pointer"
    >
      <div className={`absolute inset-0 opacity-10 rounded-lg ${isMaster ? 'bg-[#e52222]' : 'bg-[#ad36e3]'}`} />
      <img alt="" src={isMaster ? imgInfoIconMaster : imgInfoIcon} className="relative size-3.5" />
      <p className={`relative text-[13px] tracking-[0.26px] whitespace-nowrap ${isMaster ? 'text-[#e52222]' : 'text-[#ad36e3]'}`}>
        {isMaster ? 'Master Mentor' : 'Active Mentor'}
      </p>
    </button>
  );
}

function InfoModal({ variant = 'active', onClose }) {
  const isMaster = variant === 'master';
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5"
      onClick={onClose}
    >
      <div
        className="w-[400px] max-w-full bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-[0_8px_32px_rgba(18,18,19,0.16)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="relative flex items-center gap-1 h-7 px-2 py-1 rounded-lg shrink-0">
            <div className={`absolute inset-0 opacity-10 rounded-lg ${isMaster ? 'bg-[#e52222]' : 'bg-[#ad36e3]'}`} />
            <img alt="" src={isMaster ? imgInfoIconMaster : imgInfoIcon} className="relative size-3.5" />
            <p className={`relative text-[13px] tracking-[0.26px] whitespace-nowrap ${isMaster ? 'text-[#e52222]' : 'text-[#ad36e3]'}`}>
              {isMaster ? 'Master Mentor' : 'Active Mentor'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#747886] text-2xl leading-none cursor-pointer"
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        <p className="text-[15px] leading-[1.6] text-[#121213]">
          {isMaster
            ? '해당 분야의 풍부한 경험과 높은 만족도를 인정받은 멘토예요. 많은 취준생과 대화를 나눴고, 만족도 높은 피드백으로 신뢰를 쌓았어요.'
            : '꾸준히 활동하며 좋은 평가를 받고 있는 멘토예요. 많은 취준생과 대화를 나눴고, 만족도 높은 피드백으로 신뢰를 쌓았어요. 지금 가장 활발하게 멘티를 돕고 있어요.'}
        </p>
        <div className="flex flex-col gap-1.5 pt-4 border-t border-[#e7eaee]">
          <p className="font-bold text-[14px] text-[#121213]">[획득 조건]</p>
          <p className="text-[14px] leading-[1.5] text-[#747886]">누적 대화 30회 이상 · 평점 4.5 이상</p>
          <p className="text-[14px] leading-[1.5] text-[#747886]">최근 30일 응답률 80% 이상</p>
        </div>
      </div>
    </div>
  );
}

function CareerItem({ item }) {
  return (
    <div className="bg-white border border-[#e7eaee] rounded-xl px-5 py-3 w-full">
      <div className="flex gap-3 items-center w-full">
        <div className="relative shrink-0 size-[52px] rounded-[20px] shadow-[0_0_8px_rgba(18,18,19,0.05)] overflow-hidden">
          <img alt="" src={item.logo} className="absolute inset-0 size-full object-cover" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <p className="text-[15px] font-bold leading-[1.45] text-[#121213]">{item.company}</p>
          <p className="text-sm font-medium leading-[1.42] tracking-[0.14px] text-[#121213]">{item.role}</p>
          <p className="text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#747886]">{item.period}</p>
        </div>
      </div>
    </div>
  );
}

function StepItem({ step, number }) {
  return (
    <div className="bg-white border border-[#e7eaee] rounded-xl px-5 py-3 w-full">
      <div className="flex gap-3 items-start w-full">
        <div className="flex flex-col items-center justify-center shrink-0 size-8 rounded bg-[#e7f3ff]">
          <p className="text-sm font-bold tracking-[0.14px] text-[#1a75ff]">{number}</p>
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <p className="text-[15px] font-bold leading-[1.45] text-[#121213]">{step.title}</p>
          <p className="text-sm leading-[1.42] tracking-[0.14px] text-[#747886]">{step.desc}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewTagBadge({ label, accent = false }) {
  return (
    <span
      className={
        accent
          ? 'flex items-center justify-center h-7 px-2 rounded-lg bg-[#1a75ff]/10 text-[12px] font-medium tracking-[0.3px] text-[#1a75ff]'
          : 'flex items-center justify-center h-7 px-2 rounded-lg border border-[#e7eaee] text-[12px] font-medium tracking-[0.3px] text-[#747886]'
      }
    >
      {label}
    </span>
  );
}

function MentorReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) setIsClamped(el.scrollHeight > el.clientHeight + 1);
  }, [review.text]);

  return (
    <div className="border border-[#e7eaee] rounded-2xl px-4 py-5 flex flex-col gap-5 w-full">
      <div className="flex gap-2 items-center">
        <img alt="" src={review.avatar} className="size-8 rounded-full object-cover shrink-0" />
        <p className="font-bold text-sm tracking-[0.14px] text-[#121213]">{review.name}</p>
      </div>
      <div className="flex gap-1 items-start flex-wrap">
        <ReviewTagBadge label={review.channel} accent />
        {review.tags.map((tag) => (
          <ReviewTagBadge key={tag} label={tag} />
        ))}
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 items-start">
          <p ref={textRef} className={`text-[15px] leading-[1.6] text-[#121213] whitespace-pre-wrap ${expanded ? '' : 'line-clamp-3'}`}>
            {review.text}
          </p>
          {!expanded && isClamped && (
            <button type="button" onClick={() => setExpanded(true)} className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886] cursor-pointer">
              더보기
            </button>
          )}
        </div>
        <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">{review.date}</p>
      </div>
    </div>
  );
}

function ContentCareerTalkCard({ image, badge, title, onClick }) {
  const clickable = Boolean(onClick);
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#e7eaee] rounded-2xl pt-1 pb-4 px-1 flex flex-col gap-6 w-[336px] shrink-0${clickable ? ' cursor-pointer' : ''}`}
    >
      <div className="relative h-[219px] w-full rounded-t-2xl overflow-hidden">
        <img alt="" src={image} className="absolute inset-0 size-full object-cover" />
        <div className="absolute top-0 right-0 p-2.5">
          <button
            type="button"
            onClick={(event) => event.stopPropagation()}
            className="flex items-center justify-center size-6 cursor-pointer"
          >
            <img alt="북마크" src={imgBookmarkIcon} className="size-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-3 w-full">
        <span className="flex items-center justify-center h-7 px-2 rounded-lg bg-[#f4f6f8] text-[13px] font-medium tracking-[0.26px] text-[#747886] w-fit">
          {badge}
        </span>
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] w-full whitespace-nowrap overflow-hidden">{title}</p>
      </div>
    </div>
  );
}

function ContentQnaCard({ question, text, likes, onOpenBoard }) {
  return (
    <div className="border border-[#e7eaee] rounded-2xl px-4 py-5 flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-2 items-start w-full">
        <p className="font-bold text-base text-[#121213]">{question}</p>
        <p className="text-[15px] leading-[1.6] text-[#121213] w-full">{text}</p>
      </div>
      <div className="flex gap-5 items-center w-full">
        <div className="flex-1 flex gap-1 items-center min-w-0">
          <img alt="" src={imgLikeIcon} className="size-5" />
          <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#121213]">{likes}</p>
        </div>
        {onOpenBoard ? (
          <button type="button" onClick={onOpenBoard} className="flex gap-0.5 items-center shrink-0 cursor-pointer">
            <p className="text-sm tracking-[0.14px] text-[#9ca2b1]">게시판 보러가기</p>
            <img alt="" src={imgChevronRightIcon} className="size-6" />
          </button>
        ) : (
          <div className="flex gap-0.5 items-center shrink-0">
            <p className="text-sm tracking-[0.14px] text-[#9ca2b1]">게시판 보러가기</p>
            <img alt="" src={imgChevronRightIcon} className="size-6" />
          </div>
        )}
      </div>
    </div>
  );
}

const GLASS_BUTTON =
  'relative flex-1 flex items-center justify-center px-7 py-3 rounded-xl border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.4)] shadow-[inset_4px_4px_12px_0_rgba(255,255,255,0.5)] overflow-hidden cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#747886] after:opacity-0 hover:after:opacity-10';

function ProfileSidebarCard({ profile, onOpenAgentChat, onOpenInterview }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const isMaster = profile.badge === 'master';
  return (
    <div className="w-[335px] shrink-0 sticky top-0 -mt-16 pt-16">
      <div
        className="relative w-full overflow-hidden border-[1.5px] border-white rounded-2xl p-6 flex flex-col gap-5 shadow-[0_0_16px_rgba(18,18,19,0.04),inset_-2px_-2px_2px_rgba(255,255,255,0.3)]"
        style={{ background: profile.gradient }}
      >
        <div className="relative flex gap-2 items-start w-full">
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <img alt={profile.displayName} src={profile.avatar} className="size-[60px] rounded-full object-cover" />
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex gap-2 items-center">
                <p className="font-bold text-lg leading-[1.5] tracking-[-0.0036px] text-[#121213] whitespace-nowrap">{profile.displayName}</p>
                <div className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
                  <div className={`absolute inset-0 opacity-10 rounded-lg ${isMaster ? 'bg-[#e52222]' : 'bg-[#9054ff]'}`} />
                  <p className={`relative text-[10px] tracking-[0.25px] whitespace-nowrap ${isMaster ? 'text-[#e52222]' : 'text-[#9054ff]'}`}>
                    {isMaster ? 'Master Mentor' : 'Active Mentor'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#747886] tracking-[0.14px] whitespace-nowrap">{profile.roleLine}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsFollowing((prev) => !prev)}
            className="relative mt-2 shrink-0 overflow-hidden flex items-center justify-center px-5 py-2 rounded-lg border border-[#e7eaee] bg-white cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#171719] after:opacity-0 hover:after:opacity-10"
          >
            <p className="relative text-[15px] font-medium leading-[1.45] text-[#121213] whitespace-nowrap">
              {isFollowing ? '팔로우 취소' : '팔로우'}
            </p>
          </button>
        </div>

        <div className="relative flex gap-1">
          {profile.tags.map((tag) => (
            <div key={tag} className="flex items-center justify-center px-2 py-1 rounded-lg border border-[#e7eaee]">
              <p className="text-xs font-medium text-[#747886] tracking-[0.3px] whitespace-nowrap">{tag}</p>
            </div>
          ))}
        </div>

        <div className="relative grid grid-cols-3 gap-8 text-center w-full">
          <div className="flex flex-col gap-0.5 items-center">
            <p className="font-bold text-[15px] leading-[1.45] text-[#121213]">{profile.followers}</p>
            <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">팔로워</p>
          </div>
          <div className="flex flex-col gap-0.5 items-center">
            <p className="font-bold text-[15px] leading-[1.45] text-[#121213]">{profile.chats}</p>
            <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">채팅</p>
          </div>
          <div className="flex flex-col gap-0.5 items-center">
            <p className="font-bold text-[15px] leading-[1.45] text-[#121213]">{profile.reviews}</p>
            <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">리뷰</p>
          </div>
        </div>

        <div className="relative w-full h-px bg-[#e7eaee]" />

        <div className="relative flex gap-3 items-start w-full">
          <button type="button" onClick={profile.canChat ? onOpenAgentChat : undefined} className={GLASS_BUTTON}>
            <p className="relative font-bold text-base text-[#121213] whitespace-nowrap">채팅하기</p>
          </button>
          <button type="button" onClick={profile.canInterview ? onOpenInterview : undefined} className={GLASS_BUTTON}>
            <p className="relative font-bold text-base text-[#121213] whitespace-nowrap">면접보기</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MentorDetailPage({
  mentorId = 'yoonie',
  onOpenAgentChat,
  onOpenInterview,
  onOpenCareerTalkDetail,
  onOpenQnaDetail,
}) {
  const mentor = MENTOR_PAGES[mentorId] ?? MENTOR_PAGES.yoonie;
  const [activeTab, setActiveTab] = useState('intro');
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    setActiveTab('intro');
    setShowInfoModal(false);
  }, [mentorId]);

  return (
    <section className="relative flex-1 min-w-0 min-h-0 flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-[1245px] mx-auto px-5 pt-16 pb-16 flex flex-wrap gap-10 items-start">
          <div className="flex-1 min-w-[360px] flex flex-col gap-10">
            <div className="sticky top-0 z-10 bg-white -mt-16 pt-16 flex flex-col w-full pb-2">
              <div className="flex flex-col gap-6 w-full max-w-[730px]">
                <div className="flex gap-3 items-center w-full px-5">
                  <h1 className="font-bold text-[22px] tracking-[-0.33px] text-black whitespace-nowrap">{mentor.displayName}</h1>
                  <MentorTypeBadge variant={mentor.badge} onClick={() => setShowInfoModal(true)} />
                </div>
                <div className="flex gap-5 items-center w-full border-b border-[#e7eaee]">
                  {TABS.map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 flex items-center justify-center pb-5 pt-3.5 cursor-pointer ${
                          isActive ? 'border-b-2 border-[#121213]' : ''
                        }`}
                      >
                        <p className={`text-base whitespace-nowrap ${isActive ? 'font-bold text-[#121213]' : 'font-medium text-[#747886]'}`}>
                          {tab.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10 w-full max-w-[730px] px-5">
            {activeTab === 'intro' ? (
              <>
                <div className="flex flex-col gap-5 w-full">
                  <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-black">대표 멘토링 분야</p>
                  <p className="font-medium text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">
                    {mentor.specialty}
                  </p>
                </div>

                <div className="flex flex-col gap-5 w-full">
                  <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-black">멘토 소개</p>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2">
                      <p className="text-[15px] leading-[1.6] text-[#121213] underline">{mentor.portfolioLabel}</p>
                      <p className="text-[15px] leading-[1.6] text-[#121213] underline">{mentor.linkedinLabel}</p>
                    </div>
                    <p className="text-[15px] leading-[1.6] text-[#121213] whitespace-pre-line">
                      {mentor.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-5 w-full">
                  <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-black">멘토 경력</p>
                  <div className="flex flex-col gap-3 w-full">
                    {mentor.careers.map((item) => (
                      <CareerItem key={item.company} item={item} />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-5 w-full">
                  <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-black">진행 방식</p>
                  <div className="flex flex-col gap-3 w-full">
                    {STEPS.map((step, index) => (
                      <StepItem key={step.title} step={step} number={index + 1} />
                    ))}
                  </div>
                </div>
              </>
            ) : activeTab === 'review' ? (
              <div className="flex flex-col gap-6 w-full">
                <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-black">{`대화 후 리뷰 (${mentor.reviewCount})`}</p>
                <div className="flex flex-col gap-5 items-start bg-[#f9fafb] rounded-2xl px-4 py-5 w-full">
                  <div className="flex gap-2 items-center">
                    <img alt="" src={imgAiSummaryIcon} className="size-5" />
                    <p className="font-bold text-base text-[#121213]">AI 리뷰 요약</p>
                  </div>
                  <p className="text-[15px] leading-[1.6] text-[#121213] w-full">
                    {mentor.aiSummary}
                  </p>
                </div>
                <div className="flex flex-col gap-5 items-start w-full">
                  {mentor.reviews.map((review) => (
                    <MentorReviewCard key={review.id} review={review} />
                  ))}
                  <button
                    type="button"
                    className="flex items-center justify-center gap-1 border border-[#e7eaee] rounded-lg pl-3 pr-4 py-2 w-full cursor-pointer"
                  >
                    <img alt="" src={imgChevronDown} className="size-4" />
                    <p className="text-sm font-medium tracking-[0.14px] text-[#747886]">더보기</p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-10 w-full">
                <div className="flex flex-col gap-6 w-full">
                  <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-black">커리어 토크 (13)</p>
                  <div className="flex flex-col gap-5 items-start w-full">
                    <div className="flex gap-[18px] items-start w-full flex-wrap">
                      {mentor.careerTalks.map((item) => (
                        <ContentCareerTalkCard
                          key={item.id}
                          image={item.image}
                          badge={item.badge}
                          title={item.title}
                          onClick={item.id === 'yoonie' ? () => onOpenCareerTalkDetail?.('yoonie') : undefined}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-1 border border-[#e7eaee] rounded-lg pl-3 pr-4 py-2 w-[690px] max-w-full cursor-pointer"
                    >
                      <img alt="" src={imgChevronDown} className="size-4" />
                      <p className="text-sm font-medium tracking-[0.14px] text-[#747886]">더보기</p>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-6 w-full">
                  <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-black">{'Q&A 답변 (27)'}</p>
                  <div className="flex flex-col gap-5 items-start w-[690px] max-w-full">
                    {mentor.qnaAnswers.map((item) => (
                      <ContentQnaCard
                        key={item.id}
                        question={item.question}
                        text={item.text}
                        likes={item.likes}
                        onOpenBoard={item.id === 'failed' ? () => onOpenQnaDetail?.('failed') : undefined}
                      />
                    ))}
                    <button
                      type="button"
                      className="flex items-center justify-center gap-1 border border-[#e7eaee] rounded-lg pl-3 pr-4 py-2 w-full cursor-pointer"
                    >
                      <img alt="" src={imgChevronDown} className="size-4" />
                      <p className="text-sm font-medium tracking-[0.14px] text-[#747886]">더보기</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>

          <ProfileSidebarCard
            profile={{ ...mentor.sidebar, badge: mentor.badge, displayName: mentor.displayName }}
            onOpenAgentChat={() => onOpenAgentChat?.(mentor.displayName)}
            onOpenInterview={onOpenInterview}
          />
        </div>
      </div>

      {showInfoModal && <InfoModal variant={mentor.badge} onClose={() => setShowInfoModal(false)} />}
    </section>
  );
}
