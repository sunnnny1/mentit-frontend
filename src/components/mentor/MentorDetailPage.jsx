import { useState, useRef, useEffect } from 'react';

import imgSunnyAvatar from '../../assets/icons/ellipse-sunny.png';
import imgEunoiaPortrait from '../../assets/icons/eunoia.webp';
import imgTeddyPortrait from '../../assets/icons/teddy.webp';
import figma_6295d8ad_2523_4444_ad67_afa9c909b74e_png from '../../assets/figma/6295d8ad-2523-4444-ad67-afa9c909b74e.png';
import figma_1597f73a_ad68_4de9_b3d2_a991bbd381ae_png from '../../assets/figma/1597f73a-ad68-4de9-b3d2-a991bbd381ae.png';
import figma_a873382d_6e6d_435c_8771_5cacb244e020_png from '../../assets/figma/a873382d-6e6d-435c-8771-5cacb244e020.png';
import figma_28f4314c_4318_4458_b819_bf1da5cdceb2_svg from '../../assets/figma/28f4314c-4318-4458-b819-bf1da5cdceb2.svg';
import figma_a3943117_ae68_4d0a_ba07_b53cbf13a6d9_png from '../../assets/figma/a3943117-ae68-4d0a-ba07-b53cbf13a6d9.png';
import figma_c69f52ef_4a44_42a0_ad38_bc4d99cc5aff_png from '../../assets/figma/c69f52ef-4a44-42a0-ad38-bc4d99cc5aff.png';
import figma_5bead996_cc1d_42c1_88a7_1d6e3d408833_png from '../../assets/figma/5bead996-cc1d-42c1-88a7-1d6e3d408833.png';
import figma_05b829b9_5dbc_4852_aa40_7b088ff2bd1a_png from '../../assets/figma/05b829b9-5dbc-4852-aa40-7b088ff2bd1a.png';
import figma_039f8b06_82da_4b77_9a6a_042e51362c46_png from '../../assets/figma/039f8b06-82da-4b77-9a6a-042e51362c46.png';
import figma_6173dd1c_ece3_40d6_9f2d_207c1b37aab8_png from '../../assets/figma/6173dd1c-ece3-40d6-9f2d-207c1b37aab8.png';
import figma_aacd105e_6ca7_4c89_8003_29bd622d36d1_png from '../../assets/figma/aacd105e-6ca7-4c89-8003-29bd622d36d1.png';
import figma_dec8b4d6_0b3c_4134_8a25_e5349f8a34a2_svg from '../../assets/figma/dec8b4d6-0b3c-4134-8a25-e5349f8a34a2.svg';
import figma_36ef78e8_6018_4fe4_b391_6cb5a05aac28_svg from '../../assets/figma/36ef78e8-6018-4fe4-b391-6cb5a05aac28.svg';
import figma_f8febec3_4d51_48c7_8360_5b05675e4744_svg from '../../assets/figma/f8febec3-4d51-48c7-8360-5b05675e4744.svg';
import figma_15f95135_06d0_42d1_acb7_c25ec37f0c79_png from '../../assets/figma/15f95135-06d0-42d1-acb7-c25ec37f0c79.png';
import figma_2c19024b_17a0_42cd_86ef_8b687e86e85d_png from '../../assets/figma/2c19024b-17a0-42cd-86ef-8b687e86e85d.png';
import figma_05e547f0_62a2_4529_8bb7_c0e0ee15ff0f_png from '../../assets/figma/05e547f0-62a2-4529-8bb7-c0e0ee15ff0f.png';
import figma_cf4d18f0_b8e2_4926_8732_e374fb76c8dc_png from '../../assets/figma/cf4d18f0-b8e2-4926-8732-e374fb76c8dc.png';
import figma_8fa0c82f_a109_4595_8904_36697277be94_png from '../../assets/figma/8fa0c82f-a109-4595-8904-36697277be94.png';
import figma_6d5cd07c_2ddd_4c57_98af_927fa538b7f5_png from '../../assets/figma/6d5cd07c-2ddd-4c57-98af-927fa538b7f5.png';
import figma_2fc68703_cdff_4ad9_a305_07efea8b04ad_png from '../../assets/figma/2fc68703-cdff-4ad9-a305-07efea8b04ad.png';
import figma_67cb6a0b_4038_40f8_974c_84299e01f393_png from '../../assets/figma/67cb6a0b-4038-40f8-974c-84299e01f393.png';
import figma_ea712bf0_78b1_4c4b_a9ee_413162148fd0_png from '../../assets/figma/ea712bf0-78b1-4c4b-a9ee-413162148fd0.png';
import figma_a0b555b6_3445_4d8b_85c1_d4456715b9e1_png from '../../assets/figma/a0b555b6-3445-4d8b-85c1-d4456715b9e1.png';
import figma_a7e2724c_5740_4456_9c06_790b8f299180_svg from '../../assets/figma/a7e2724c-5740-4456-9c06-790b8f299180.svg';
import figma_e88c6a0f_2d46_4411_bb2a_dbec13f35e62_svg from '../../assets/figma/e88c6a0f-2d46-4411-bb2a-dbec13f35e62.svg';
import figma_dd6271ff_e3ce_4f32_9805_ef894b9a29f0_svg from '../../assets/figma/dd6271ff-e3ce-4f32-9805-ef894b9a29f0.svg';
import figma_d551385b_79cd_4290_b3b3_7b250cc4dbd0_svg from '../../assets/figma/d551385b-79cd-4290-b3b3-7b250cc4dbd0.svg';
import figma_5972d921_320c_4f23_ae3c_9781e5c4d1f1_svg from '../../assets/figma/5972d921-320c-4f23-ae3c-9781e5c4d1f1.svg';

const imgYoonieAvatar = figma_6295d8ad_2523_4444_ad67_afa9c909b74e_png;
const imgTeddyAvatar = imgTeddyPortrait;
const imgTossLogo = figma_039f8b06_82da_4b77_9a6a_042e51362c46_png;
const imgSamsungLogo = figma_67cb6a0b_4038_40f8_974c_84299e01f393_png;
const imgKakaoSunny = figma_1597f73a_ad68_4de9_b3d2_a991bbd381ae_png;
const imgWanted = figma_a873382d_6e6d_435c_8771_5cacb244e020_png;
const imgInfoIconMaster = figma_28f4314c_4318_4458_b819_bf1da5cdceb2_svg;
const imgReviewerKiki = figma_a3943117_ae68_4d0a_ba07_b53cbf13a6d9_png;
const imgReviewerCoco = figma_c69f52ef_4a44_42a0_ad38_bc4d99cc5aff_png;
const imgSunnyCareerTalk1 = figma_5bead996_cc1d_42c1_88a7_1d6e3d408833_png;
const imgSunnyCareerTalk2 = figma_05b829b9_5dbc_4852_aa40_7b088ff2bd1a_png;
const imgCarrot = figma_6173dd1c_ece3_40d6_9f2d_207c1b37aab8_png;
const imgKakao = figma_aacd105e_6ca7_4c89_8003_29bd622d36d1_png;
const imgInfoIcon = figma_dec8b4d6_0b3c_4134_8a25_e5349f8a34a2_svg;
const imgAiSummaryIcon = figma_36ef78e8_6018_4fe4_b391_6cb5a05aac28_svg;
const imgChevronDown = figma_f8febec3_4d51_48c7_8360_5b05675e4744_svg;
const imgReviewerYunn00 = figma_15f95135_06d0_42d1_acb7_c25ec37f0c79_png;
const imgReviewer0sun222 = figma_2c19024b_17a0_42cd_86ef_8b687e86e85d_png;
const imgReviewerGangster = figma_05e547f0_62a2_4529_8bb7_c0e0ee15ff0f_png;
const imgCareerTalk1 = figma_cf4d18f0_b8e2_4926_8732_e374fb76c8dc_png;
const imgCareerTalk2 = figma_8fa0c82f_a109_4595_8904_36697277be94_png;
const imgEunoiaCareerTalk1 = figma_6d5cd07c_2ddd_4c57_98af_927fa538b7f5_png;
const imgEunoiaCareerTalk2 = figma_2fc68703_cdff_4ad9_a305_07efea8b04ad_png;
const imgTeddyCareerTalk1 = figma_ea712bf0_78b1_4c4b_a9ee_413162148fd0_png;
const imgTeddyCareerTalk2 = figma_a0b555b6_3445_4d8b_85c1_d4456715b9e1_png;
const imgInfoIconRookie = figma_a7e2724c_5740_4456_9c06_790b8f299180_svg;
const imgBookmarkIcon = figma_e88c6a0f_2d46_4411_bb2a_dbec13f35e62_svg;
const imgBookmarkOutline = figma_5972d921_320c_4f23_ae3c_9781e5c4d1f1_svg;
const imgLikeIcon = figma_dd6271ff_e3ce_4f32_9805_ef894b9a29f0_svg;
const imgChevronRightIcon = figma_d551385b_79cd_4290_b3b3_7b250cc4dbd0_svg;

const REVIEWS = [
  {
    id: 'yunn00',
    name: 'Yunn00',
    avatar: imgReviewerYunn00,
    mine: true,
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
    tags: ['자기소개서 개선', '구체적 조언', '적극적인 소통'],
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
    bookmarks: 102,
  },
  {
    id: 'collab',
    question: '프로덕트 디자이너의 협업능력이 필수일까요?',
    text: '프로덕트 디자이너로써 협업은 불가피합니다. 협업을 잘 하기 위해서는 단연 소통 능력이 중요하다고 생각합니다. 아무래도 모든 회사가 그렇겠지만 특히 제가 재직하고 있는 IT 업계의 경우 이 능력이 중요합니다. 제가 1년차였을 당시에는 경험이 부족하다보니 회의 시간마다 아주 어려움을 겪었던 기억이 있습니다. 결국 중요한 것은...',
    likes: 89,
    bookmarks: 90,
  },
  {
    id: 'prep',
    question: '프로덕트 디자이너 취업 준비, 무엇부터 시작해야 할까요?',
    text: '가장 먼저 지원하고 싶은 직무와 기업에서 어떤 역량을 중요하게 보는지 파악하는 것부터 추천해요. 그다음 본인의 프로젝트를 직무 역량에 맞춰 정리하고, 단순히 결과물을 보여주기보다 문제를 어떻게 발견하고 해결했는지가 드러나도록 포트폴리오를 다듬어보세요.',
    likes: 85,
    bookmarks: 87,
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
    desc: "멘토의 정보를 확인하고 원하는 멘토를 선택해 '멘토링 받기' '모의 면접하기' 버튼을 선택해 주세요.",
  },
  {
    title: 'AI 에이전트 요청',
    desc: "실제 멘토의 데이터를 학습한 AI 에이전트와 먼저 대화해볼 수 있어요.\n포트폴리오·자소서 피드백이나 면접 연습이 필요하면 '피드백'/'면접'을 선택하거나 채팅으로 입력해보세요.",
  },
  {
    title: '실제 멘토와 대화하기',
    desc: "실제 멘토와 대화를 하고싶다면 '멘토와 채팅하기' 버튼을 통해 실제 멘토에게 채팅을 보낼 수 있어요.\n채팅을 멘토가 확인한 후 답장해줄거에요.",
  },
];

const SUNNY_REVIEWS = [
  {
    id: 'yunn00',
    name: 'Yunn00',
    avatar: imgReviewerYunn00,
    mine: true,
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

const EUNOIA_CAREER_TALKS = [
  {
    id: 'portfolio-tips',
    image: imgEunoiaCareerTalk1,
    badge: '포트폴리오',
    title: '프로덕트 디자이너의 포트폴리오 꿀팁',
  },
  {
    id: 'resume-tips',
    image: imgEunoiaCareerTalk2,
    badge: '자기소개서',
    title: '눈길을 끄는 자소서 작성법',
  },
];

const SUNNY_QNA_ANSWERS = [
  {
    id: 'ux-interview',
    question: 'UX 디자이너 면접에서 중요한 것은 무엇인가요?',
    text: 'UX 디자이너 면접에서는 결과물 자체보다 왜 그런 문제를 발견했고, 어떤 근거로 해결 방법을 선택했는지를 설명하는 것이 중요하다고 생각합니다. 프로젝트의 결과만 보여주기보다 문제 상황부터 나의 판단과 행동, 그 결과까지 논리적으로 설명하면 문제 해결 과정과 UX 흐름을 잘 설명하면 좋을 것 같아요.',
    likes: 127,
    bookmarks: 99,
  },
  {
    id: 'why-design',
    question: '“왜 이 디자인을 선택했나요?”라는 질문에는 어떻게 답해야 하나요?',
    text: '“디자인의 취향이 아닌 근거를 이야기하세요.”\n사용자 테스트, 리서치, 데이터, 비즈니스 목표 등 어떤 근거를 바탕으로 결정했는지를 설명하는 것이 중요합니다. 특히 여러 대안 중 왜 최종 방향을 선택했는지까지 설명한다면, 단순히 결과물을 만드는 디자이너가...',
    likes: 89,
    bookmarks: 71,
  },
  {
    id: 'prep',
    question: '프로덕트 디자이너 취업 준비, 무엇부터 시작해야 할까요?',
    text: '가장 먼저 지원하고 싶은 직무와 기업에서 어떤 역량을 중요하게 보는지 파악하는 것부터 추천해요. 그다음 본인의 프로젝트를 직무 역량에 맞춰 정리하고, 단순히 결과물을 보여주기보다 문제를 어떻게 발견하고 해결했는지가 드러나도록 포트폴리오를 다듬어보세요.',
    likes: 85,
    bookmarks: 63,
  },
];

const SUNNY_CAREERS = [
  { logo: imgKakaoSunny, company: '카카오', role: 'UX 디자이너', period: '2021.01 - 재직중' },
  { logo: imgWanted, company: '원티드', role: '그래픽 디자이너', period: '2020.01 - 2020.12' },
];

const EUNOIA_CAREERS = [
  { logo: imgTossLogo, company: '토스', role: '프로덕트 디자이너', period: '2024.01 - 재직중' },
  { logo: imgKakao, company: '카카오', role: 'UX 디자이너', period: '2020.01 - 2023.12', logoFit: 'contain' },
];

const TEDDY_CAREERS = [
  { logo: imgSamsungLogo, company: '삼성', role: 'UX 디자이너', period: '2020.01 - 2022.12', logoFit: 'contain' },
];

const TEDDY_CAREER_TALKS = [
  {
    id: 'interview-strengths',
    image: imgTeddyCareerTalk1,
    badge: '포트폴리오',
    title: '면접에서 내 장점을 어필하는 법',
  },
  {
    id: 'freelancer-process',
    image: imgTeddyCareerTalk2,
    badge: '자기소개서',
    title: '프리랜서의 작업 과정 공개합니다',
  },
];

const EUNOIA_QNA_ANSWERS = [
  {
    id: 'failed',
    question: '포트폴리오에 실패한 프로젝트 넣어도 될까요?',
    text: '저는 신입 포폴을 매년 100개 넘게 봐온 입장에서 말씀드리면, 실패 사례 자체보다 "어떻게 서술했는지"에서 갈려요. "잘 안 됐지만 배웠어요"로 끝나는 포폴이 대부분인데, 수치나 사용자 반응까지 구체적으로 붙여서 왜 실패했는지, 어떤 문제를 발견했는지, 그걸 어떻게 개선했는지 설명한 지원자는 진짜 소수였고, 그 소수가 항상 서류를 통과했어요. 결국 중요한 건 실패를 숨기는 게 아니라, 실패를 통해 어떤 인사이트와 개선 방향을 도출했는지를 보여주는 거예요.',
    likes: 46,
    bookmarks: 87,
  },
  {
    id: 'collab',
    question: '프로덕트 디자이너의 협업능력이 필수일까요?',
    text: '네, 저는 오히려 실무에서 디자인 실력보다 더 중요하게 느껴질 때가 많아요. 예전에 홈 피드 개편할 때 제 의견이 맞다고 생각해서 끝까지 밀어붙인 적이 있는데, 결국 개발 일정이 밀리고 PM이랑 신뢰도 많이 깎였어요. 그 뒤로는 "제 생각엔 이게 맞아요"보다 "이 데이터 보면 이럴 수도 있을 것 같아요"처럼 근거를 붙여 설득하는 습관을 들였고, 그러고 나서야 협업이 훨씬 수월해지더라고요. 포트폴리오에도 실력만큼 "이견이 있을 때 어떻게 조율했는지"를 꼭 보여주시는 걸 추천해요.',
    likes: 41,
    bookmarks: 63,
  },
  {
    id: 'nonmajor',
    question: '비전공자가 프로덕트 디자이너로 취업하려면 어떤 걸 준비해야 하나요?',
    text: '포폴 100개 넘게 보면서 느낀 건데, 비전공자인지 아닌지는 사실 전혀 안 중요해요. 오히려 비전공 출신 지원자 중 합격한 분들을 보면 공통점이 있더라고요. 전공 지식 대신 "왜 이 문제를 풀고 싶었는지"에 대한 본인만의 동기가 유난히 뚜렷했어요. 디자인 이론은 부트캠프나 독학으로도 충분히 따라잡을 수 있지만, 그 동기와 문제의식은 억지로 만들어지지 않거든요. 전공을 보완하려 애쓰기보다, 본인이 왜 이 일을 하고 싶은지부터 명확히 정리해두는 걸 추천해요.',
    likes: 38,
    bookmarks: 59,
  },
];

const TEDDY_QNA_ANSWERS = [
  {
    id: 'no-collab',
    question: '협업 경험 없는 포트폴리오, 어떻게 보완하나요?',
    text: '저도 학생 때 팀플 기회가 많이 없어서 비슷한 고민했어요. 근데 면접관 입장에서 보면, "협업 경험이 있다 없다"보다 "이견이 생겼을 때 어떻게 할지 알고 있는가"를 더 궁금해하더라고요. 그래서 저는 혼자 한 프로젝트라도, 중간에 교수님이나 친구한테 피드백 받고 생각이 바뀐 지점을 일부러 남겨뒀어요. "처음엔 이렇게 생각했는데, 이 피드백 듣고 이렇게 바꿨다"는 흐름 하나만 있어도 다른 의견을 받아들이는 방식을 보여줄 수 있거든요. 꼭 팀 프로젝트가 아니어도 그 흐름 자체를 보여주는 게 중요해요.',
    likes: 127,
    bookmarks: 82,
  },
  {
    id: 'no-research',
    question: 'UX 리서치 경험이 없는데, 포트폴리오에 어떻게 녹여야 하나요?',
    text: '저도 학생 때는 번듯한 리서치 방법론을 써본 적이 없었어요. 그땐 그냥 주변 사람 5명한테 "이거 쓰면서 뭐가 불편했어?"라고 물어본 게 다였거든요. 근데 중요한 건 규모가 아니라, 그 대답을 듣고 제가 뭘 다르게 판단했는지였어요. 예를 들어 "한 명이 어디를 눌러야 할지 몰라서 뒤로 갔다"고 하면, 그걸 "그래서 버튼 위치를 이렇게 바꿨다"로 연결하는 거죠. 정식 방법론보다, 아주 작은 관찰이라도 그게 실제 결정으로 이어지는 흐름을 보여주는 게 훨씬 설득력 있어요.',
    likes: 89,
    bookmarks: 67,
  },
  {
    id: 'ia',
    question: '정보구조(IA)를 짤 때 어떤 기준으로 우선순위를 정하시나요?',
    text: '저는 카드소팅 결과를 그대로 메뉴에 옮기지 않아요. 예전에 한 서비스 설계할 때 사용자들은 "자주 쓰는 기능"을 상단에 두길 원했는데, 그대로 따랐다가 정작 비즈니스적으로 중요한 기능이 묻혀서 전환율이 떨어진 적이 있어요. 그 뒤로는 사용 빈도와 비즈니스 임팩트를 각각 점수로 매겨서, 둘 다 높은 것부터 우선순위를 정하는 방식으로 바꿨어요. 사용자가 원하는 것과 비즈니스에 중요한 것, 이 두 축을 따로 떼어놓고 비교해보는 게 핵심이에요.',
    likes: 85,
    bookmarks: 53,
  },
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
      '멘티들이 가장 많이 꼽은 강점은 "명확한 피드백"이에요. "두루뭉술한 조언이 아니라 바로 고칠 수 있었다"는 후기가 반복적으로 나왔어요. 포폴·자소서 피드백 만족도가 특히 높아요.',
    careerTalks: CAREER_TALKS,
    qnaAnswers: QNA_ANSWERS,
    sidebar: {
      avatar: imgYoonieAvatar,
      roleLine: '프로덕트 디자이너 ・ 당근 ・ 5년차',
      tags: ['포트폴리오', '자기소개서'],
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
      tags: ['면접', '자소서'],
      followers: '4K',
      chats: '30',
      reviews: '50',
      gradient: 'linear-gradient(-1.85deg, rgba(255,181,181,0.25) 1.43%, rgba(255,250,250,0.25) 50%), #ffffff',
      canChat: false,
      canInterview: true,
    },
  },
  eunoia: {
    id: 'eunoia',
    displayName: 'Eunoia 멘토',
    badge: 'master',
    specialty: 'IT 기업 포트폴리오 구성 및 자기소개서 작성 준비 도움',
    portfolioLabel: 'Eunoia 멘토 포트폴리오 사이트',
    linkedinLabel: 'Eunoia 멘토 링크드인',
    bio: 'UX와 프로덕트 디자인 경험을 바탕으로 UX 리서치부터 데이터 분석, 디자인시스템까지 집중적으로 답변해드립니다.\n네이버, 카카오, 당근마켓 등에서 다양한 사람들과 프로젝트를 진행하고 팀을 리딩해왔습니다. 커머스, 커뮤니티, 핀테크, 동영상 등 여러 도메인을 넘나들며 ‘좋은 디자인’을 고민해왔어요. 실제 면접관들이 어떤 시선으로 포트폴리오를 보고 판단하는지, 도메인별로 어떤 특징이 있는지 그 현실적인 관점을 나누고 싶어요.',
    careers: EUNOIA_CAREERS,
    reviews: REVIEWS,
    reviewCount: 64,
    aiSummary:
      '멘티들이 가장 많이 꼽은 강점은 "실전 채용 관점의 피드백"이에요. 토스에서 실제로 서류를 어떻게 보는지 구체적으로 짚어준다는 후기가 많아요.',
    careerTalks: EUNOIA_CAREER_TALKS,
    careerTalkCount: 9,
    qnaAnswers: EUNOIA_QNA_ANSWERS,
    qnaCount: 37,
    sidebar: {
      avatar: imgEunoiaPortrait,
      roleLine: '프로덕트 디자이너 ・ 토스 ・ 3년차',
      tags: ['포트폴리오', '자기소개서'],
      followers: '5.1K',
      chats: '47',
      reviews: '64',
      gradient: 'linear-gradient(-1.85deg, rgba(255,181,181,0.25) 1.43%, rgba(255,250,250,0.25) 50%), #ffffff',
      canChat: true,
      canInterview: true,
    },
  },
  teddy: {
    id: 'teddy',
    displayName: 'Teddy 멘토',
    badge: 'rookie',
    specialty: 'IT 기업 면접 준비 및 이직 준비 도움',
    portfolioLabel: 'Teddy 멘토 포트폴리오 사이트',
    linkedinLabel: 'Teddy 멘토 링크드인',
    bio: '사용자 리서치부터 UX 설계까지 다양한 프로젝트를 경험해왔어요. 디자인 취업을 준비하면서 생기는 고민과 실무에서 필요한 역량에 대해 구체적으로 알려드릴게요.',
    careers: TEDDY_CAREERS,
    reviews: REVIEWS,
    reviewCount: 23,
    aiSummary:
      '현실적인 취업 전략과 실무 이야기에서 만족도가 높아요. 프리랜서 경험을 바탕으로 직무 선택과 포트폴리오 방향을 잡아준다는 후기가 많아요.',
    careerTalks: TEDDY_CAREER_TALKS,
    careerTalkCount: 5,
    qnaAnswers: TEDDY_QNA_ANSWERS,
    qnaCount: 13,
    sidebar: {
      avatar: imgTeddyAvatar,
      roleLine: 'UX 디자이너 ・ 프리랜서 ・ 6년차',
      tags: ['포트폴리오', '면접'],
      followers: '2.8K',
      chats: '30',
      reviews: '23',
      gradient: 'linear-gradient(-1.85deg, rgba(186,228,255,0.25) 1.43%, rgba(247,251,255,0.25) 50%), #ffffff',
      canChat: true,
      canInterview: true,
    },
  },
};

const MENTOR_BADGE_STYLES = {
  master: {
    label: 'Master Mentor',
    bg: 'bg-[#e52222]',
    text: 'text-[#e52222]',
    icon: imgInfoIconMaster,
  },
  active: {
    label: 'Active Mentor',
    bg: 'bg-[#ad36e3]',
    text: 'text-[#ad36e3]',
    icon: imgInfoIcon,
  },
  rookie: {
    label: 'Rookie Mentor',
    bg: 'bg-[#008dcf]',
    text: 'text-[#008dcf]',
    icon: imgInfoIconRookie,
  },
};

function MentorTypeBadge({ variant = 'active', onClick }) {
  const badge = MENTOR_BADGE_STYLES[variant] ?? MENTOR_BADGE_STYLES.active;
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex items-center gap-1 h-7 px-2 py-1 rounded-lg shrink-0 cursor-pointer"
    >
      <div className={`absolute inset-0 opacity-10 rounded-lg ${badge.bg}`} />
      <img alt="" src={badge.icon} className="relative size-3.5" />
      <p className={`relative text-[13px] tracking-[0.26px] whitespace-nowrap ${badge.text}`}>
        {badge.label}
      </p>
    </button>
  );
}

function InfoModal({ variant = 'active', onClose }) {
  const badge = MENTOR_BADGE_STYLES[variant] ?? MENTOR_BADGE_STYLES.active;
  const copy =
    variant === 'master'
      ? {
          description:
            '해당 분야의 풍부한 경험과 높은 만족도를 인정받은 멘토예요. 많은 취준생과 대화를 나눴고, 만족도 높은 피드백으로 신뢰를 쌓았어요.',
          conditions: [
            'Active Mentor 자격을 6개월 이상 유지',
            '누적 대화 80회 이상 · 평점 4.8 이상',
            '리뷰 50개 이상 · 최근 30일 응답률 90% 이상',
          ],
        }
      : variant === 'rookie'
        ? {
            description:
              '멘토 활동을 시작하는 단계예요. 실무 경험을 바탕으로 취준생을 돕고 있어요.',
            conditions: [
              '멘토로 등록하면 부여되는 기본 레벨이에요',
              '누적 대화 30회 이상 · 평점 4.5 이상이 되면 Active Mentor로 올라가요',
            ],
          }
        : {
            description:
              '꾸준히 활동하며 좋은 평가를 받고 있는 멘토예요. 많은 취준생과 대화를 나눴고, 만족도 높은 피드백으로 신뢰를 쌓았어요. 지금 가장 활발하게 멘티를 돕고 있어요.',
            conditions: ['누적 대화 30회 이상 · 평점 4.5 이상', '최근 30일 응답률 80% 이상'],
          };
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
            <div className={`absolute inset-0 opacity-10 rounded-lg ${badge.bg}`} />
            <img alt="" src={badge.icon} className="relative size-3.5" />
            <p className={`relative text-[13px] tracking-[0.26px] whitespace-nowrap ${badge.text}`}>
              {badge.label}
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
        <p className="text-[15px] leading-[1.6] text-[#121213]">{copy.description}</p>
        <div className="flex flex-col gap-1.5 pt-4 border-t border-[#e7eaee]">
          <p className="font-bold text-[14px] text-[#121213]">[획득 조건]</p>
          {copy.conditions.map((line) => (
            <p key={line} className="text-[14px] leading-[1.5] text-[#747886]">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function CareerItem({ item }) {
  return (
    <div className="bg-white border border-[#e7eaee] rounded-xl px-5 py-3 w-full">
      <div className="flex gap-3 items-center w-full">
        <div className="relative shrink-0 size-[52px] rounded-[20px] bg-white shadow-[0_0_8px_rgba(18,18,19,0.05)] overflow-hidden">
          <img
            alt=""
            src={item.logo}
            className={`absolute inset-0 size-full ${item.logoFit === 'contain' ? 'object-contain p-1.5' : 'object-cover'}`}
          />
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
          <p className="text-sm leading-[1.42] tracking-[0.14px] text-[#747886] whitespace-pre-line">{step.desc}</p>
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
        {review.mine && (
          <span className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
            <span className="absolute inset-0 bg-[#747886] opacity-10 rounded-lg" />
            <span className="relative text-[10px] tracking-[0.25px] text-[#747886]">내가 쓴 글</span>
          </span>
        )}
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
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] w-full whitespace-nowrap">{title}</p>
      </div>
    </div>
  );
}

function ContentQnaCard({ question, text, likes, bookmarks, onOpenBoard }) {
  return (
    <div className="border border-[#e7eaee] rounded-2xl px-4 py-5 flex flex-col gap-5 w-full overflow-hidden">
      <div className="flex flex-col gap-2 items-start w-full">
        <p className="font-bold text-base leading-[1.45] text-[#121213]">{question}</p>
        <p className="text-[15px] leading-[1.6] text-[#121213] w-full line-clamp-3">{text}</p>
      </div>
      <div className="flex gap-5 items-center w-full">
        <div className="flex-1 flex gap-3 items-center min-w-0">
          <div className="flex gap-1 items-center">
            <img alt="" src={imgLikeIcon} className="size-5" />
            <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#121213]">{likes}</p>
          </div>
          {bookmarks != null && (
            <div className="flex gap-1 items-center">
              <img alt="" src={imgBookmarkOutline} className="size-5" />
              <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#121213]">{bookmarks}</p>
            </div>
          )}
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
  const sidebarBadge =
    profile.badge === 'master'
      ? { bg: 'bg-[#e52222]', text: 'text-[#e52222]', label: 'Master Mentor' }
      : profile.badge === 'rookie'
        ? { bg: 'bg-[#008dcf]', text: 'text-[#008dcf]', label: 'Rookie Mentor' }
        : { bg: 'bg-[#9054ff]', text: 'text-[#9054ff]', label: 'Active Mentor' };
  return (
    <div className="w-[335px] shrink-0 sticky top-0 -mt-16 pt-16">
      <div
        className="relative w-full overflow-hidden rounded-2xl p-6 flex flex-col gap-5 shadow-[0_0_16px_rgba(18,18,19,0.04),inset_-2px_-2px_2px_rgba(255,255,255,0.3)]"
        style={{ background: profile.gradient }}
      >
        <div className="relative flex gap-2 items-start w-full">
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <img alt={profile.displayName} src={profile.avatar} className="size-[60px] rounded-full object-cover" />
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex gap-2 items-center">
                <p className="font-bold text-lg leading-[1.5] tracking-[-0.0036px] text-[#121213] whitespace-nowrap">{profile.displayName}</p>
                <div className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
                  <div className={`absolute inset-0 opacity-10 rounded-lg ${sidebarBadge.bg}`} />
                  <p className={`relative text-[10px] tracking-[0.25px] whitespace-nowrap ${sidebarBadge.text}`}>
                    {sidebarBadge.label}
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
            <p className="relative font-bold text-base text-[#121213] whitespace-nowrap">멘토링 받기</p>
          </button>
          <button type="button" onClick={profile.canInterview ? onOpenInterview : undefined} className={GLASS_BUTTON}>
            <p className="relative font-bold text-base text-[#121213] whitespace-nowrap">모의 면접하기</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MentorDetailPage({
  mentorId = 'yoonie',
  initialTab = 'intro',
  onOpenAgentChat,
  onOpenInterview,
  onOpenCareerTalkDetail,
  onOpenQnaDetail,
}) {
  const mentor = MENTOR_PAGES[mentorId] ?? MENTOR_PAGES.yoonie;
  const resolvedInitialTab = initialTab === 'review' || initialTab === 'content' ? initialTab : 'intro';
  const [activeTab, setActiveTab] = useState(resolvedInitialTab);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    setActiveTab(resolvedInitialTab);
    setShowInfoModal(false);
  }, [mentorId, resolvedInitialTab]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [activeTab, mentorId]);

  return (
    <section className="relative flex-1 min-w-0 min-h-0 flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
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
                  <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-black">
                    커리어 토크 ({mentor.careerTalkCount ?? 13})
                  </p>
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
                  <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-black">
                    {`Q&A 답변 (${mentor.qnaCount ?? 27})`}
                  </p>
                  <div className="flex flex-col gap-5 items-start w-[690px] max-w-full">
                    {mentor.qnaAnswers.map((item) => (
                      <ContentQnaCard
                        key={item.id}
                        question={item.question}
                        text={item.text}
                        likes={item.likes}
                        bookmarks={item.bookmarks}
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
