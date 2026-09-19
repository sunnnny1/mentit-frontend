import { useState } from 'react';
import { MentorCard, MENTORS, canOpenMentorDetail } from '../MentorRecommendations';
import figma_2cd6c863_1cd7_4771_ac46_5a3145e7a3bd_svg from '../../assets/figma/2cd6c863-1cd7-4771-ac46-5a3145e7a3bd.svg';
import figma_c11cc4d3_aa70_48e8_a183_5d36c9318492_png from '../../assets/figma/c11cc4d3-aa70-48e8-a183-5d36c9318492.png';
import figma_889e12d0_3bdf_4637_8c97_d0923f23f39a_png from '../../assets/figma/889e12d0-3bdf-4637-8c97-d0923f23f39a.png';
import figma_a4391ae5_9399_440b_b50f_ed055caf1bd5_png from '../../assets/figma/a4391ae5-9399-440b-b50f-ed055caf1bd5.png';
import figma_d2b25e22_c9b9_4ed9_a965_8edf00e04a06_png from '../../assets/figma/d2b25e22-c9b9-4ed9-a965-8edf00e04a06.png';
import figma_0027d3ad_0884_4dd4_b826_8c373661d6a0_png from '../../assets/figma/0027d3ad-0884-4dd4-b826-8c373661d6a0.png';
import figma_702451ae_d398_4195_88d0_a3144f308aed_png from '../../assets/figma/702451ae-d398-4195-88d0-a3144f308aed.png';
import figma_ce9cf759_4e46_4841_a9d4_c3a589debe98_png from '../../assets/figma/ce9cf759-4e46-4841-a9d4-c3a589debe98.png';
import figma_63412269_5593_4246_9dc1_78aeeb8ffc90_png from '../../assets/figma/63412269-5593-4246-9dc1-78aeeb8ffc90.png';
import figma_04fa8627_b9b3_4bd3_8a83_45cf09ec93e1_png from '../../assets/figma/04fa8627-b9b3-4bd3-8a83-45cf09ec93e1.png';
import figma_891e5969_f705_49f9_b541_e0a9ced5d9c5_png from '../../assets/figma/891e5969-f705-49f9-b541-e0a9ced5d9c5.png';
import figma_9fa6e4ab_92fc_4142_bc61_49f4a5729cc5_png from '../../assets/figma/9fa6e4ab-92fc-4142-bc61-49f4a5729cc5.png';
import figma_994b40d1_7f80_48b8_97d9_30facc2c64c7_png from '../../assets/figma/994b40d1-7f80-48b8-97d9-30facc2c64c7.png';
import figma_ebd7e5b2_25f6_4629_8981_bb07e590af94_png from '../../assets/figma/ebd7e5b2-25f6-4629-8981-bb07e590af94.png';
import figma_4a1f2afc_1958_4d12_b6f7_146feb5d6680_png from '../../assets/figma/4a1f2afc-1958-4d12-b6f7-146feb5d6680.png';
import figma_c8a2fd1d_e6d2_402d_a8b7_ef3ba0357ff5_png from '../../assets/figma/c8a2fd1d-e6d2-402d-a8b7-ef3ba0357ff5.png';
import figma_bc010e8a_3235_4549_9a2e_6d6fd2896081_png from '../../assets/figma/bc010e8a-3235-4549-9a2e-6d6fd2896081.png';
import figma_48ddf2e7_e9c4_4c9f_ac50_f8b2c091b5f8_png from '../../assets/figma/48ddf2e7-e9c4-4c9f-ac50-f8b2c091b5f8.png';
import figma_f1ab70e5_5273_41c2_a876_de37bd2f1338_png from '../../assets/figma/f1ab70e5-5273-41c2-a876-de37bd2f1338.png';
import figma_24d1ab30_b042_4027_8067_8c6e69b2a333_png from '../../assets/figma/24d1ab30-b042-4027-8067-8c6e69b2a333.png';
import figma_d00ff179_8980_414e_a00c_cf67da236c77_png from '../../assets/figma/d00ff179-8980-414e-a00c-cf67da236c77.png';
import figma_85807738_de8f_4537_ba06_ce37527305ef_svg from '../../assets/figma/85807738-de8f-4537-ba06-ce37527305ef.svg';
import figma_ecd06d7a_3987_4a50_935e_6abc74533904_png from '../../assets/figma/ecd06d7a-3987-4a50-935e-6abc74533904.png';
import figma_7d5991cc_7062_463f_b47a_1d150853d120_png from '../../assets/figma/7d5991cc-7062-463f-b47a-1d150853d120.png';
import figma_f82f1cfa_dea6_4239_976d_9f5b52171c51_png from '../../assets/figma/f82f1cfa-dea6-4239-976d-9f5b52171c51.png';
import figma_039f8b06_82da_4b77_9a6a_042e51362c46_png from '../../assets/figma/039f8b06-82da-4b77-9a6a-042e51362c46.png';
import figma_7ff3f091_cfeb_499c_9d4b_fd475c9847a8_png from '../../assets/figma/7ff3f091-cfeb-499c-9d4b-fd475c9847a8.png';
import figma_813f1c7e_ab66_418e_8128_76911d7de0a4_png from '../../assets/figma/813f1c7e-ab66-418e-8128-76911d7de0a4.png';
import figma_17717de1_6c7c_4369_95ee_e47803037f45_png from '../../assets/figma/17717de1-6c7c-4369-95ee-e47803037f45.png';
import figma_e00d04b7_ffc0_408c_8869_9297608b629d_png from '../../assets/figma/e00d04b7-ffc0-408c-8869-9297608b629d.png';
import figma_63c2ae38_071d_4aae_adbe_f26e73f8a1d2_png from '../../assets/figma/63c2ae38-071d-4aae-adbe-f26e73f8a1d2.png';
import figma_c59ac278_0a75_488d_8100_f52b6bfa1887_png from '../../assets/figma/c59ac278-0a75-488d-8100-f52b6bfa1887.png';
import figma_831fafef_da90_4dbe_8be9_2f5d291c96eb_png from '../../assets/figma/831fafef-da90-4dbe-8be9-2f5d291c96eb.png';
import figma_7f9d0e9a_01ef_4ab1_94e5_19535618607a_png from '../../assets/figma/7f9d0e9a-01ef-4ab1-94e5-19535618607a.png';
import figma_991e8dcf_b317_4ca0_8946_3ef8c88e2a66_png from '../../assets/figma/991e8dcf-b317-4ca0-8946-3ef8c88e2a66.png';
import figma_5d09087d_c5c2_41e8_a465_62b914a71eb1_png from '../../assets/figma/5d09087d-c5c2-41e8-a465-62b914a71eb1.png';
import figma_1160ca8b_4113_47df_ae4d_9f8e45ab2796_png from '../../assets/figma/1160ca8b-4113-47df-ae4d-9f8e45ab2796.png';
import figma_b4d8ae34_a8bf_40d3_873a_43b1ab9884a9_png from '../../assets/figma/b4d8ae34-a8bf-40d3-873a-43b1ab9884a9.png';
import figma_28a26f9e_6d90_48a2_85f1_232509dab99c_png from '../../assets/figma/28a26f9e-6d90-48a2-85f1-232509dab99c.png';
import figma_e590e497_53fe_4bde_b6a8_48492163514d_png from '../../assets/figma/e590e497-53fe-4bde-b6a8-48492163514d.png';
import figma_6adeaa25_4f79_4919_a1f8_3185504e7fdc_png from '../../assets/figma/6adeaa25-4f79-4919-a1f8-3185504e7fdc.png';
import figma_53c5da2c_7ad7_4f8e_9a0e_be32f2b574ff_png from '../../assets/figma/53c5da2c-7ad7-4f8e-9a0e-be32f2b574ff.png';
import figma_36930575_fea6_43b3_a721_f196b02e97d2_png from '../../assets/figma/36930575-fea6-43b3-a721-f196b02e97d2.png';
import figma_2df10676_84aa_4f2c_9851_d5ebc9383443_png from '../../assets/figma/2df10676-84aa-4f2c-9851-d5ebc9383443.png';
import figma_7b8a8ac9_34d4_45d9_9aea_d7f88ce9faa5_png from '../../assets/figma/7b8a8ac9-34d4-45d9-9aea-d7f88ce9faa5.png';
import figma_114fa380_8e4d_49dc_bd97_e6f002e0a4fa_png from '../../assets/figma/114fa380-8e4d-49dc-bd97-e6f002e0a4fa.png';
import figma_e4b104ef_e951_4729_b657_e9b50681fc14_png from '../../assets/figma/e4b104ef-e951-4729-b657-e9b50681fc14.png';
import figma_1aa6a07d_5674_4396_beca_63fb1474ff35_png from '../../assets/figma/1aa6a07d-5674-4396-beca-63fb1474ff35.png';
import figma_05c4fe86_47af_4729_805a_c9412cc2bb8c_png from '../../assets/figma/05c4fe86-47af-4729-805a-c9412cc2bb8c.png';
import figma_e8f82ca2_0509_4f04_8e39_695db9f3d504_png from '../../assets/figma/e8f82ca2-0509-4f04-8e39-695db9f3d504.png';
import figma_94f16f8c_2d65_4259_99d3_a8ccd8519347_png from '../../assets/figma/94f16f8c-2d65-4259-99d3-a8ccd8519347.png';
import figma_796d84eb_0aad_4c09_95f5_2df519075e9a_png from '../../assets/figma/796d84eb-0aad-4c09-95f5-2df519075e9a.png';
import figma_be469299_e057_48b8_92cb_9d274ef5e703_png from '../../assets/figma/be469299-e057-48b8-92cb-9d274ef5e703.png';
import figma_749ddc9e_acaa_40f8_87b9_98616330af40_png from '../../assets/figma/749ddc9e-acaa-40f8-87b9-98616330af40.png';
import figma_fff4c8e0_5d66_4e01_b8ba_37199f047658_png from '../../assets/figma/fff4c8e0-5d66-4e01-b8ba-37199f047658.png';
import figma_41ad2c7f_dc92_4ca8_aa08_55ce5cdc5674_png from '../../assets/figma/41ad2c7f-dc92-4ca8-aa08-55ce5cdc5674.png';
import figma_4289b856_adb0_4782_8692_a20c22a74721_png from '../../assets/figma/4289b856-adb0-4782-8692-a20c22a74721.png';
import figma_643d4525_e739_416d_9583_1c7656963807_png from '../../assets/figma/643d4525-e739-416d-9583-1c7656963807.png';
import figma_0b99f2dc_1bfa_4202_8741_a817a06b55be_png from '../../assets/figma/0b99f2dc-1bfa-4202-8741-a817a06b55be.png';
import figma_d515d176_4643_40a5_88bc_5665d1a5b48f_png from '../../assets/figma/d515d176-4643-40a5-88bc-5665d1a5b48f.png';

const imgChevronRight = figma_2cd6c863_1cd7_4771_ac46_5a3145e7a3bd_svg;

// 상단 추천 멘토 카드용 아바타 (Figma 원본)
const imgSunny = figma_c11cc4d3_aa70_48e8_a183_5d36c9318492_png;
const imgDaisy = figma_889e12d0_3bdf_4637_8c97_d0923f23f39a_png;
const imgUha = figma_a4391ae5_9399_440b_b50f_ed055caf1bd5_png;

// 홈/멘팃AI에서 쓰는 기존 MENTORS(Yoonie, Eunoia, Teddy)에 Sunny/Daisy/U.ha를 더해 상단 추천 6명 구성
const FEATURED_MENTORS = [
  ...MENTORS,
  {
    name: 'Sunny',
    badgeLabel: 'Master Mentor',
    color: 'red',
    role: 'UX 디자이너 · 카카오 · 5년차',
    tags: ['UX 디자인', '면접'],
    desc: '사용자 리서치부터 UX 설계까지 다양한 프로젝트를 경험해왔어요. 디자인 취업을 준비하면서 생기는 고민과 실무에서 필요한 역량에 대해 구체적으로 알려드릴게요.',
    reviews: '60개',
    followers: '2.1K',
    chats: '90',
    reviewCount: '60',
    avatar: imgSunny,
  },
  {
    name: 'Daisy',
    badgeLabel: 'Rookie Mentor',
    color: 'lightblue',
    role: '프로덕트 디자이너 · 카카오 · 1년차',
    tags: ['프로덕트 디자인', '포트폴리오'],
    desc: '취준했던 경험을 바탕으로 가장 가까이서 대기업 프로덕트 디자이너에 대한 내용을 알려드립니다.',
    reviews: '8개',
    followers: '340',
    chats: '15',
    reviewCount: '8',
    avatar: imgDaisy,
  },
  {
    name: 'U.ha 멘토',
    badgeLabel: 'Active Mentor',
    color: 'purple',
    role: '프로덕트 디자이너 · 세일즈포스 · 3년차',
    tags: ['프로덕트 디자인', '포트폴리오'],
    desc: '해외 디자이너의 A to Z 까지 포트폴리오, 면접, 실무에 관한 내용을 알려드립니다.',
    reviews: '30개',
    followers: '890',
    chats: '42',
    reviewCount: '30',
    avatar: imgUha,
  },
];

const REVIEWS = [
  {
    quote: '평소 궁금했던 점을 논리적으로 잘 설명해주셔서 유익한 인사이트를 많이 얻을 수 있었습니다! 정말 감사합니다.',
    reviewer: 'leeyoung',
    mentorName: 'Yoonie',
    mentorInfo: '프로덕트 디자이너・당근・5년차',
  },
  {
    quote: '최근에 취업 관련 고민이 많던 시기였는데 멘토님의 다정하고 섬세한 포트폴리오 피드백을 받고 자신감을 가지게 되었습니다.',
    reviewer: 'cheih',
    mentorName: 'Eunoia',
    mentorInfo: '프로덕트 디자이너・토스・3년차',
  },
  {
    quote: '데이터 분석가가 되기 위해 여러 곳을 지원했지만 항상 면접에서 탈락하곤 했습니다. 하지만 멘토분의 조언을 통해 도움을 많이 받았습니다.',
    reviewer: 'POPO',
    mentorName: 'Andrew',
    mentorInfo: '데이터 분석가・무신사・7년차',
  },
];

const CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: 'business', label: '경영・비즈니스' },
  { key: 'design', label: '디자인' },
  { key: 'dev', label: '개발' },
  { key: 'marketing', label: '광고・마케팅' },
  { key: 'data', label: '데이터' },
  { key: 'game', label: '게임제작' },
];

const MENTOR_DIRECTORY = [
  { name: 'Rucas', category: 'business', badge: 'Rookie', tags: ['프로덕트 매니저', '이직', '면접'], desc: '삼성 모바일 서비스에서 제품 기획과 프로젝트 관리를 담당하고 있습니다. PM 커리어, 서비스 기획, 이직과 면접 준비에 대한 이야기를 나눠드려요.', role: 'PM', years: '3년차', avatar: figma_d2b25e22_c9b9_4ed9_a965_8edf00e04a06_png, logo: figma_0027d3ad_0884_4dd4_b826_8c373661d6a0_png, logoType: 'whiteplain' },
  { name: 'Mia', category: 'business', badge: 'Rookie', tags: ['프로덕트 매니저', '자소서', '면접'], desc: '사용자와 비즈니스 사이의 균형을 고민하며 서비스를 만들어왔어요. PM 취업 준비부터 실제 업무에서 마주하는 고민까지 현실적인 이야기를 나눠드릴게요.', role: 'PM', years: '5년차', avatar: figma_702451ae_d398_4195_88d0_a3144f308aed_png, logo: figma_ce9cf759_4e46_4841_a9d4_c3a589debe98_png, logoType: 'whiteplain' },
  { name: 'Emily', category: 'business', badge: 'Active', tags: ['사업개발', '면접', '실무'], desc: '파트너십을 만들고 새로운 사업 기회를 발굴하는 일을 하고 있어요. 사업개발 직무의 실제 업무와 커리어를 준비하는 방법을 함께 이야기해드릴게요.', role: '사업개발 매니저', years: '7년차', avatar: figma_63412269_5593_4246_9dc1_78aeeb8ffc90_png, logo: figma_04fa8627_b9b3_4bd3_8a83_45cf09ec93e1_png, logoType: 'whitecrop', logoCrop: { h: '74.27%', w: '134.62%', left: '-20.06%', top: '12.86%' } },
  { name: 'Ryan', category: 'business', badge: 'Active', tags: ['UX 디자인', '포트폴리오'], desc: '서비스의 문제를 발견하고 사용자에게 더 나은 경험을 만드는 일을 하고 있어요. UX 디자인을 처음 시작하는 분들도 이해하기 쉽게 실무에서 얻은 경험을 나눠드릴게요.', role: 'UX 디자이너', years: '6년차', avatar: figma_891e5969_f705_49f9_b541_e0a9ced5d9c5_png, logo: figma_9fa6e4ab_92fc_4142_bc61_49f4a5729cc5_png, logoType: 'whiteplain' },

  { name: 'Emma', category: 'design', badge: 'Rookie', tags: ['프로덕트 디자인', '면접', '포트폴리오'], desc: '사용자의 문제를 발견하고 더 나은 경험으로 해결하는 과정을 좋아해요. 포트폴리오부터 실무 디자인까지, 주니어 디자이너의 성장 방법을 함께 고민해드릴게요.', role: '프로덕트 디자이너', years: '1년차', avatar: figma_994b40d1_7f80_48b8_97d9_30facc2c64c7_png, logo: figma_ebd7e5b2_25f6_4629_8981_bb07e590af94_png, logoType: 'plain' },
  { name: 'U.ha', category: 'design', badge: 'Active', tags: ['프로덕트 디자인', '포트폴리오'], desc: '서비스의 작은 불편을 발견하고 더 나은 경험으로 개선하는 일을 하고 있어요. 디자인 취업부터 실무에서 필요한 역량까지 편하게 질문해주세요.', role: '프로덕트 디자이너', years: '2년차', avatar: figma_4a1f2afc_1958_4d12_b6f7_146feb5d6680_png, logo: figma_c8a2fd1d_e6d2_402d_a8b7_ef3ba0357ff5_png, logoType: 'whitecrop', logoCrop: { h: '84.62%', w: '94.54%', left: '4.02%', top: '7.69%' } },
  { name: 'Daisy', category: 'design', badge: 'Rookie', tags: ['프로덕트 디자인', '포트폴리오', '자소서'], desc: '사용자 경험과 서비스 목표를 함께 고민하며 디자인하고 있어요. 포트폴리오를 준비하는 방법부터 실제 프로젝트에서의 디자인 과정까지 알려드릴게요.', role: '프로덕트 디자이너', years: '1년차', avatar: figma_bc010e8a_3235_4549_9a2e_6d6fd2896081_png, logo: figma_48ddf2e7_e9c4_4c9f_ac50_f8b2c091b5f8_png, logoType: 'plain' },
  { name: 'Stella', category: 'design', badge: 'Rookie', tags: ['UX 디자인', '포트폴리오', '면접'], desc: '사용자 관점에서 문제를 정의하고 더 좋은 경험을 설계하는 일을 하고 있어요. UX 디자인 역량을 쌓는 방법과 포트폴리오에 대한 고민을 함께 풀어드릴게요.', role: 'UX 디자이너', years: '2년차', avatar: figma_f1ab70e5_5273_41c2_a876_de37bd2f1338_png, logo: figma_24d1ab30_b042_4027_8067_8c6e69b2a333_png, logoType: 'whiteplain' },
  { name: 'Teddy', category: 'design', badge: 'Rookie', tags: ['UX 디자인', '프리랜서', '실무'], desc: '다양한 프로젝트를 경험하며 사용자 중심의 서비스를 설계해왔어요. UX 디자이너로 취업하기 위해 준비하면 좋은 것들과 실무 노하우를 현실적으로 알려드릴게요.', role: 'UX 디자이너', years: '6년차', avatar: figma_d00ff179_8980_414e_a00c_cf67da236c77_png, logo: figma_85807738_de8f_4537_ba06_ce37527305ef_svg, logoType: 'special' },
  { name: 'Peter', category: 'design', badge: 'Active', tags: ['UX 디자인', '포트폴리오'], desc: 'UX 리서치 팁부터 AI활용 방안까지 꼼꼼하게 피드백해드려요. 특히, 실제 프로젝트를 기반으로 다양한 경험을 나눠드립니다.', role: 'UX 디자이너', years: '6년차', avatar: figma_ecd06d7a_3987_4a50_935e_6abc74533904_png, logo: figma_7d5991cc_7062_463f_b47a_1d150853d120_png, logoType: 'whiteplain' },
  { name: 'Eunoia', category: 'design', badge: 'Master', tags: ['프로덕트 디자인', '포트폴리오'], desc: '다양한 디지털 서비스의 UX를 설계하며 사용자 문제를 해결하는 프로덕트 디자이너입니다. UX 리서치부터 디자인 시스템, 실무 포트폴리오까지 도와드려요.', role: '프로덕트 디자이너', years: '3년차', avatar: figma_f82f1cfa_dea6_4239_976d_9f5b52171c51_png, logo: figma_039f8b06_82da_4b77_9a6a_042e51362c46_png, logoType: 'crop', logoCrop: { h: '100.46%', w: '146.81%', left: '-24.75%', top: '0.3%' } },
  { name: 'Sunny', category: 'design', badge: 'Master', tags: ['UX 디자인', '면접'], desc: '사용자 리서치부터 UX 설계까지 다양한 프로젝트를 경험해왔어요. 디자인 취업을 준비하면서 생기는 고민과 실무에서 필요한 역량에 대해 구체적으로 알려드릴게요.', role: 'UX 디자이너', years: '5년차', avatar: figma_7ff3f091_cfeb_499c_9d4b_fd475c9847a8_png, logo: figma_813f1c7e_ab66_418e_8128_76911d7de0a4_png, logoType: 'plain' },
  { name: 'Yoonie', category: 'design', badge: 'Active', tags: ['프로덕트 디자인', '포트폴리오'], desc: 'UX와 프로덕트 디자인 경험을 바탕으로 UX 리서치부터 데이터 분석, 디자인시스템까지 집중적으로 답변해드립니다.', role: '프로덕트 디자이너', years: '5년차', avatar: figma_17717de1_6c7c_4369_95ee_e47803037f45_png, logo: figma_e00d04b7_ffc0_408c_8869_9297608b629d_png, logoType: 'plain' },

  { name: 'John', category: 'dev', badge: 'Master', tags: ['개발', '면접', '포트폴리오'], desc: '서비스의 안정적인 구조와 기능을 만드는 백엔드 개발자로 일하고 있습니다. 개발자 취업 준비부터 기술 면접, 실무 프로젝트에 대한 고민을 함께 나눠드려요.', role: '백엔드 개발자', years: '15년차', avatar: figma_63c2ae38_071d_4aae_adbe_f26e73f8a1d2_png, logo: figma_c59ac278_0a75_488d_8100_f52b6bfa1887_png, logoType: 'crop', logoCrop: { h: '100.46%', w: '146.81%', left: '-24.75%', top: '0.3%' } },
  { name: 'Dave', category: 'dev', badge: 'Master', tags: ['프론트 개발', '면접'], desc: '사용자가 직접 만나는 화면을 코드로 구현하는 일을 하고 있어요. 프론트엔드 개발을 준비하면서 알아두면 좋은 기술과 실무 경험을 함께 공유할게요.', role: '프론트 개발자', years: '8년차', avatar: figma_831fafef_da90_4dbe_8be9_2f5d291c96eb_png, logo: figma_7f9d0e9a_01ef_4ab1_94e5_19535618607a_png, logoType: 'whiteplain' },
  { name: 'Chloe', category: 'dev', badge: 'Active', tags: ['개발', '면접', '이직'], desc: '디자인을 실제 서비스로 구현하고 사용자에게 전달하는 과정에 관심이 많아요. 프론트엔드 입문부터 취업 준비와 실무 적응까지 함께 고민해드릴게요.', role: '프론트엔드 개발자', years: '4년차', avatar: figma_991e8dcf_b317_4ca0_8946_3ef8c88e2a66_png, logo: figma_5d09087d_c5c2_41e8_a465_62b914a71eb1_png, logoType: 'whiteplain' },
  { name: 'Hannah', category: 'dev', badge: 'Rookie', tags: ['개발', '면접', '이직'], desc: '서비스의 안정적인 구조와 데이터를 관리하는 백엔드 개발을 하고 있어요. 개발을 처음 접하는 분들도 쉽게 이해할 수 있도록 기초부터 실무까지 차근차근 알려드릴게요.', role: '백엔드 개발자', years: '2년차', avatar: figma_1160ca8b_4113_47df_ae4d_9f8e45ab2796_png, logo: figma_b4d8ae34_a8bf_40d3_873a_43b1ab9884a9_png, logoType: 'whiteplain' },

  { name: 'Eric', category: 'marketing', badge: 'Rookie', tags: ['마케팅', '기획', '면접'], desc: '브랜드와 고객을 연결하는 콘텐츠를 기획하고 운영하고 있습니다. 콘텐츠 마케팅 실무부터 포트폴리오, 마케터 취업 준비까지 함께 고민해드려요.', role: '콘텐츠 마케터', years: '3년차', avatar: figma_28a26f9e_6d90_48a2_85f1_232509dab99c_png, logo: figma_e590e497_53fe_4bde_b6a8_48492163514d_png, logoType: 'plain' },
  { name: 'Olivia', category: 'marketing', badge: 'Active', tags: ['마케팅', '포트폴리오', '실무'], desc: '데이터를 바탕으로 광고 성과를 분석하고 더 나은 결과를 만들어가는 일을 하고 있어요. 퍼포먼스 마케팅에 필요한 역량과 실무에서 활용하는 방법을 쉽게 알려드릴게요.', role: '퍼포먼스 마케터', years: '4년차', avatar: figma_6adeaa25_4f79_4919_a1f8_3185504e7fdc_png, logo: figma_53c5da2c_7ad7_4f8e_9a0e_be32f2b574ff_png, logoType: 'whiteplain' },
  { name: 'Ethan', category: 'marketing', badge: 'Master', tags: ['광고 기획', '자소서', '면접'], desc: '좋은 아이디어를 브랜드의 메시지로 만들고 사람들에게 전달하는 일을 해왔어요. 광고기획 직무를 준비하면서 알아두면 좋은 것들과 포트폴리오 방향을 함께 이야기해드릴게요.', role: '광고 기획자', years: '7년차', avatar: figma_36930575_fea6_43b3_a721_f196b02e97d2_png, logo: figma_2df10676_84aa_4f2c_9851_d5ebc9383443_png, logoType: 'whitecrop', logoCrop: { h: '75.95%', w: '88.46%', left: '5.77%', top: '12.02%' } },
  { name: 'Jessica', category: 'marketing', badge: 'Rookie', tags: ['광고 기획', '면접', '기획'], desc: '소비자의 마음을 움직이는 아이디어를 고민하며 다양한 광고 프로젝트를 경험했어요. 광고기획 직무가 궁금하거나 취업을 준비하고 있다면 현실적인 경험을 나눠드릴게요.', role: '광고 기획자', years: '2년차', avatar: figma_7b8a8ac9_34d4_45d9_9aea_d7f88ce9faa5_png, logo: figma_114fa380_8e4d_49dc_bd97_e6f002e0a4fa_png, logoType: 'whiteplain' },
  { name: 'James', category: 'marketing', badge: 'Active', tags: ['마케팅', '포트폴리오'], desc: '클라이언트와 다양한 팀 사이에서 프로젝트를 조율하고 이끌어가는 일을 하고 있어요. AE의 실제 업무부터 커뮤니케이션 역량과 취업 준비 과정까지 알려드릴게요.', role: '마케팅AE', years: '5년차', avatar: figma_e4b104ef_e951_4729_b657_e9b50681fc14_png, logo: figma_1aa6a07d_5674_4396_beca_63fb1474ff35_png, logoType: 'whitecrop', logoCrop: { h: '90.13%', w: '90.13%', left: '4.43%', top: '4.1%' } },

  { name: 'Sophia', category: 'data', badge: 'Active', tags: ['데이터', '포트폴리오'], desc: '데이터에서 사용자와 서비스의 흐름을 발견하고, 이를 바탕으로 더 나은 의사결정을 돕고 있습니다. 데이터 직무와 분석 역량, 커리어 준비를 함께 이야기해요.', role: '데이터 분석가', years: '3년차', avatar: figma_05c4fe86_47af_4729_805a_c9412cc2bb8c_png, logo: figma_e8f82ca2_0509_4f04_8e39_695db9f3d504_png, logoType: 'plain' },
  { name: 'Andrew', category: 'data', badge: 'Master', tags: ['데이터 분석', '포트폴리오', '면접'], desc: '데이터를 통해 비즈니스 문제를 이해하고 더 나은 의사결정을 돕는 일을 하고 있어요. 분석가에게 필요한 사고방식과 실무에서 데이터를 활용하는 방법을 알려드릴게요.', role: '데이터 분석가', years: '7년차', avatar: figma_94f16f8c_2d65_4259_99d3_a8ccd8519347_png, logo: figma_796d84eb_0aad_4c09_95f5_2df519075e9a_png, logoType: 'whiteplain' },
  { name: 'Alex', category: 'data', badge: 'Rookie', tags: ['데이터 분석', '포트폴리오'], desc: '데이터를 기반으로 문제를 정의하고 해결책을 찾아가는 일을 하고 있어요. 데이터 분석 직무를 준비하면서 궁금했던 실무 이야기와 커리어 방향을 편하게 물어보세요.', role: '데이터 분석가', years: '5년차', avatar: figma_be469299_e057_48b8_92cb_9d274ef5e703_png, logo: figma_749ddc9e_acaa_40f8_87b9_98616330af40_png, logoType: 'whitecrop', logoCrop: { h: '89.89%', w: '89.89%', left: '5.4%', top: '4.76%' } },

  { name: 'Tony', category: 'game', badge: 'Rookie', tags: ['게임 그래픽', '면접', '실무'], desc: '게임 속 캐릭터와 다양한 그래픽 요소를 만드는 일을 하고 있어요. 게임 그래픽 직무를 준비하는 데 필요한 역량부터 실제 제작 과정까지 실무 경험을 공유할게요.', role: '게임 그래픽', years: '2년차', avatar: figma_fff4c8e0_5d66_4e01_b8ba_37199f047658_png, logo: figma_41ad2c7f_dc92_4ca8_aa08_55ce5cdc5674_png, logoType: 'whiteplain' },
  { name: 'Kevin', category: 'game', badge: 'Master', tags: ['게임 제작', '자소서', '실무'], desc: '게임의 전체적인 아트 방향을 고민하고 팀의 결과물을 만들어가는 일을 하고 있어요. 게임 아트 직무에 필요한 역량과 커리어를 쌓아가는 방법을 함께 이야기해드릴게요.', role: '게임 아티스트', years: '6년차', avatar: figma_4289b856_adb0_4782_8692_a20c22a74721_png, logo: figma_643d4525_e739_416d_9583_1c7656963807_png, logoType: 'whitecrop', logoCrop: { h: '69.23%', w: '102.87%', left: '-1.43%', top: '15.38%' } },
  { name: 'Sarah', category: 'game', badge: 'Active', tags: ['게임 기획', '포트폴리오', '실무'], desc: '게임의 재미와 플레이 경험을 설계하고 다양한 콘텐츠를 기획하는 일을 하고 있어요. 게임 기획자가 실제로 어떤 일을 하는지, 취업을 위해 무엇을 준비하면 좋은지 알려드릴게요.', role: '게임 기획자', years: '3년차', avatar: figma_0b99f2dc_1bfa_4202_8741_a817a06b55be_png, logo: figma_d515d176_4643_40a5_88bc_5665d1a5b48f_png, logoType: 'whitecrop', logoCrop: { h: '80.77%', w: '72.53%', left: '13.74%', top: '9.62%' } },
];

const BADGE_META = {
  Active: { label: 'Active Mentor', color: '#9054ff' },
  Master: { label: 'Master Mentor', color: '#e52222' },
  Rookie: { label: 'Rookie Mentor', color: '#008dcf' },
};

function MentorBadgePill({ badge }) {
  const meta = BADGE_META[badge];
  return (
    <div className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
      <div className="absolute inset-0 opacity-10 rounded-lg" style={{ backgroundColor: meta.color }} />
      <p className="relative text-[10px] tracking-[0.25px] whitespace-nowrap" style={{ color: meta.color }}>
        {meta.label}
      </p>
    </div>
  );
}

function ReviewCard({ review, rotate, onOpenMentorDetail }) {
  const [isHovered, setIsHovered] = useState(false);
  const canOpenDetail = canOpenMentorDetail(review.mentorName);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={canOpenDetail ? () => onOpenMentorDetail?.(review.mentorName) : undefined}
      className={`flex-1 min-w-0 flex flex-col gap-4 items-start px-5 py-4 rounded-xl border border-[#f4f6f8] bg-[#f7fbff] shadow-[0_0_4px_rgba(18,18,19,0.04)] origin-center transition-transform duration-300 ease-out${canOpenDetail ? ' cursor-pointer' : ''}`}
      style={{ transform: `rotate(${isHovered ? -rotate : rotate}deg)` }}
    >
      <p className="text-[15px] leading-[1.6] text-[#121213] line-clamp-2">{review.quote}</p>
      <p className="text-sm text-[#121213] tracking-[0.14px]">{review.reviewer}님의 후기</p>
      <div className="w-full h-px bg-[#e7eaee]" />
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <p className="font-bold text-base text-[#121213]">{review.mentorName}</p>
          <p className="text-sm text-[#747886] tracking-[0.14px]">{review.mentorInfo}</p>
        </div>
        <img alt="" src={imgChevronRight} className="size-6 shrink-0" />
      </div>
    </div>
  );
}

// 멘토 카드의 기업 로고 (Figma 원본 애셋 그대로 사용, 로고별로 크롭/배경 처리가 달라서 타입으로 분기)
function CompanyLogo({ src, type = 'plain', crop }) {
  if (type === 'special') {
    return (
      <div className="relative shrink-0 size-[52px] rounded-[20px] shadow-[0_0_8px_rgba(18,18,19,0.05)] bg-white overflow-hidden">
        <img alt="" src={src} className="absolute inset-0 m-auto w-[46%] h-[46%] object-contain" />
      </div>
    );
  }

  return (
    <div className="relative shrink-0 size-[52px] rounded-[20px] shadow-[0_0_8px_rgba(18,18,19,0.05)] overflow-hidden">
      {type !== 'plain' && <div className="absolute inset-0 bg-white" />}
      {type === 'whitecrop' || type === 'crop' ? (
        <img
          alt=""
          src={src}
          className="absolute max-w-none object-cover"
          style={{ height: crop.h, width: crop.w, left: crop.left, top: crop.top }}
        />
      ) : (
        <img alt="" src={src} className="absolute inset-0 size-full object-cover" />
      )}
    </div>
  );
}

function DirectoryMentorCard({ mentor, onOpenMentorDetail }) {
  const canOpenDetail = canOpenMentorDetail(mentor.name);
  return (
    <div className="flex flex-col gap-4 items-start p-6 rounded-2xl border border-[#f4f6f8] bg-white shadow-[0_0_8px_rgba(18,18,19,0.04)] w-[364px] shrink-0">
      <div
        className={`flex gap-3 items-center w-full${canOpenDetail ? ' cursor-pointer' : ''}`}
        onClick={canOpenDetail ? () => onOpenMentorDetail?.(mentor.name) : undefined}
      >
        <img alt={mentor.name} src={mentor.avatar} className="size-[60px] rounded-full shrink-0 object-cover" />
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <p className="font-bold text-lg tracking-[-0.0036px] text-[#121213] whitespace-nowrap">{mentor.name} 멘토</p>
          <MentorBadgePill badge={mentor.badge} />
        </div>
        <img alt="" src={imgChevronRight} className="size-6 shrink-0" />
      </div>

      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-1 flex-wrap">
          {mentor.tags.map((tag) => (
            <div key={tag} className="flex items-center justify-center px-2 py-1 rounded-md bg-[#f4f6f8]">
              <p className="text-[10px] text-[#747886] tracking-[0.25px] whitespace-nowrap">{tag}</p>
            </div>
          ))}
        </div>
        <p className="text-[15px] leading-[1.6] text-[#121213] line-clamp-2">{mentor.desc}</p>
      </div>

      <div className="w-full h-px bg-[#e7eaee]" />

      <div className="flex gap-2 items-center w-full">
        <CompanyLogo src={mentor.logo} type={mentor.logoType} crop={mentor.logoCrop} />
        <div className="flex flex-col gap-1 text-sm text-[#747886] tracking-[0.14px]">
          <p>{mentor.role}</p>
          <p>{mentor.years}</p>
        </div>
      </div>
    </div>
  );
}

export default function MentorExplorePage({ onOpenAgentChat, onOpenMentorDetail, onOpenInterview }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredMentors =
    activeCategory === 'all' ? MENTOR_DIRECTORY : MENTOR_DIRECTORY.filter((mentor) => mentor.category === activeCategory);

  return (
    <section className="relative flex-1 min-w-0 min-h-0 flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center px-5 pb-16">
        <div className="w-[1133px] max-w-full flex flex-col gap-16 pt-16">
          <section className="flex flex-col gap-8 items-start w-full">
            <h2 className="font-bold text-[22px] tracking-[-0.33px] text-[#121213]">희망 직무의 추천 멘토와 대화를 시작해보세요</h2>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-5 items-start w-full">
                {FEATURED_MENTORS.slice(0, 3).map((mentor) => (
                  <MentorCard key={mentor.name} mentor={mentor} onOpenAgentChat={onOpenAgentChat} onOpenMentorDetail={onOpenMentorDetail} onOpenInterview={onOpenInterview} variant="profile" />
                ))}
              </div>
              <div className="flex gap-5 items-start w-full">
                {FEATURED_MENTORS.slice(3, 6).map((mentor) => (
                  <MentorCard key={mentor.name} mentor={mentor} onOpenAgentChat={onOpenAgentChat} onOpenMentorDetail={onOpenMentorDetail} onOpenInterview={onOpenInterview} variant="profile" />
                ))}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-8 items-start w-full">
            <h2 className="font-bold text-[22px] tracking-[-0.33px] text-[#121213]">후기로 알아보는 현직자 멘토</h2>
            <div className="flex gap-4 items-start w-full overflow-visible px-1 pt-3 pb-8">
              <ReviewCard review={REVIEWS[0]} rotate={-2.79} onOpenMentorDetail={onOpenMentorDetail} />
              <ReviewCard review={REVIEWS[1]} rotate={2.43} onOpenMentorDetail={onOpenMentorDetail} />
              <ReviewCard review={REVIEWS[2]} rotate={-3.79} onOpenMentorDetail={onOpenMentorDetail} />
            </div>
          </section>

          <section className="relative isolate flex flex-col w-full">
            <div className="sticky top-0 z-30 -mx-5 px-5 bg-white pt-16 -mt-16 pb-8 flex flex-col gap-6 isolate">
              <h2 className="font-bold text-[22px] tracking-[-0.33px] text-[#121213]">멘토 카테고리</h2>
              <div className="flex items-center w-full border-b border-[#e7eaee]">
                {CATEGORIES.map((category) => {
                  const isActive = activeCategory === category.key;
                  const count =
                    category.key === 'all'
                      ? MENTOR_DIRECTORY.length
                      : MENTOR_DIRECTORY.filter((mentor) => mentor.category === category.key).length;
                  return (
                    <button
                      key={category.key}
                      type="button"
                      onClick={() => setActiveCategory(category.key)}
                      className={`flex-1 flex items-center justify-center px-5 pt-3.5 pb-5 cursor-pointer ${
                        isActive ? 'border-b-2 border-[#121213]' : ''
                      }`}
                    >
                      <p
                        className={`text-base whitespace-nowrap ${
                          isActive ? 'font-bold text-[#121213]' : 'font-medium text-[#747886]'
                        }`}
                      >
                        {category.label} {count}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative z-0 flex flex-wrap gap-5 w-full">
              {filteredMentors.map((mentor) => (
                <DirectoryMentorCard key={mentor.name} mentor={mentor} onOpenMentorDetail={onOpenMentorDetail} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
