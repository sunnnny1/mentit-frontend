import { useEffect, useMemo, useRef, useState } from 'react';

import MentorProfile from '../board/MentorProfile';
import imgTalkYoonie from '../../assets/icons/talkYoonie.png';
import imgTalkUha from '../../assets/icons/talkUha.png';
import imgGangsterPost from '../../assets/icons/gangsterImg.png';
import imgUha from '../../assets/icons/ellipse-uha.png';
import imgYoonie from '../../assets/icons/yoonie.webp';
import imgPeter from '../../assets/icons/ellipse-peter.png';
import imgDaisy from '../../assets/icons/ellipse-daisy.png';
import imgEmma from '../../assets/icons/emma.webp';
import imgEunoia from '../../assets/icons/eunoia.webp';
import imgChevronDown from '../../assets/figma/f8febec3-4d51-48c7-8360-5b05675e4744.svg';
import imgChevronRight from '../../assets/icons/chevron-right.svg';
import imgLikeFill from '../../assets/figma/f18f03a8-dbf0-4add-aa12-723afdd968d9.svg';
import imgLikeOutline from '../../assets/figma/245f4c4c-0050-45ba-a7b5-d68859001b46.svg';
import figma_42e8dda3_b48d_4178_aa56_943f81e0bc58_png from '../../assets/figma/42e8dda3-b48d-4178-aa56-943f81e0bc58.png';
import figma_444c9d7b_ee5e_436b_b8c4_9cd4b605267e_png from '../../assets/figma/444c9d7b-ee5e-436b-b8c4-9cd4b605267e.png';
import figma_64c9f214_aa8c_44ed_91cf_2b4ec4344479_png from '../../assets/figma/64c9f214-aa8c-44ed-91cf-2b4ec4344479.png';
import figma_57ca12d7_4a35_44a5_868b_66cc2ca11698_png from '../../assets/figma/57ca12d7-4a35-44a5-868b-66cc2ca11698.png';
import figma_d47118a4_9707_403e_bdc8_88b3a5f6c7b0_png from '../../assets/figma/d47118a4-9707-403e-bdc8-88b3a5f6c7b0.png';
import figma_4ca3a1c1_b478_4b2f_82a4_906fb08aa942_png from '../../assets/figma/4ca3a1c1-b478-4b2f-82a4-906fb08aa942.png';
import figma_7b7f5ec8_080d_4da2_9a4e_ca50dce927a3_png from '../../assets/figma/7b7f5ec8-080d-4da2-9a4e-ca50dce927a3.png';
import imgFailedProject from '../../assets/icons/personalized-thumb-1.png';

const CROP = { top: '-31.68%', left: '-0.08%', width: '100%', height: '135.41%' };

const BADGE = {
  purple: { bg: 'bg-[#9054ff]', text: 'text-[#9054ff]', label: 'Active Mentor' },
  lightblue: { bg: 'bg-[#008dcf]', text: 'text-[#008dcf]', label: 'Rookie Mentor' },
  red: { bg: 'bg-[#e52222]', text: 'text-[#e52222]', label: 'Master Mentor' },
};

const CAREER_TALKS = [
  { id: 'career-yoonie', title: 'AI 시대의 프로덕트 디자인 활용 팁', mentor: 'Yoonie 멘토', role: '프로덕트 디자이너', src: imgTalkYoonie, hasDetail: true, articleId: 'yoonie' },
  { id: 'career-daisy', title: 'UXUI, 반드시 알아야 할 데이터 읽는 법', mentor: 'Dasiy 멘토', role: '프로덕트 디자이너', src: figma_42e8dda3_b48d_4178_aa56_943f81e0bc58_png, crop: CROP },
  { id: 'career-uha', title: '에이전틱 AI 제품 만들 때 참고할 점', mentor: 'U.ha 멘토', role: '프로덕트 디자이너', src: imgTalkUha, crop: CROP, hasDetail: true, articleId: 'uha' },
  { id: 'career-peter', title: '인터뷰 스크립트 짜는 법', mentor: 'Peter 멘토', role: 'UX 디자이너', src: figma_444c9d7b_ee5e_436b_b8c4_9cd4b605267e_png },
  { id: 'career-sunny', title: '면접 볼 때 이것만은 하지 마세요!', mentor: 'Sunny 멘토', role: 'UX 디자이너', src: figma_64c9f214_aa8c_44ed_91cf_2b4ec4344479_png },
  { id: 'career-emma', title: '화면보다 먼저 봐야 할 것', mentor: 'Emma 멘토', role: '프로덕트 디자이너', src: figma_57ca12d7_4a35_44a5_868b_66cc2ca11698_png },
];

const QNA_POSTS = [
  {
    id: 'qna-ut',
    title: '사용성 테스트(UT) 참가자를 구하기 힘든데, 어떻게 하셨나요?',
    body: '학교 프로젝트로 UT를 진행하려고 하는데, 실제 타겟 유저를 구하기가 생각보다 훨씬 어려웠어요. 결국 지인이나 학교 동기 몇 명한테 부탁해서 5명 정도로 진행했는데, 표본이 너무 적고 실제 타겟과도 안 맞아서 이 데이터를 포트폴리오에 그대로 써도 되는지 걱정이 됩니다. 현직에서는 신입 때 이런 제약을 어떻게 극복하셨는지 궁금해요.',
    likes: 48,
    board: 'qna',
  },
  {
    id: 'qna-wireframe',
    title: '신입 면접에서 그 자리에서 와이어프레임 그려보라고 하면 어떻게 대응하나요?',
    body: '라이브 과제나 화이트보드 테스트가 있다는 얘기를 들었는데, 시간 안에 논리적으로 구조를 짜는 연습을 어떻게 해야 할지 감이 안 잡혀요.',
    likes: 89,
    image: figma_d47118a4_9707_403e_bdc8_88b3a5f6c7b0_png,
    board: 'qna',
  },
  {
    id: 'qna-prep',
    title: '프로덕트 디자이너 취업 준비, 무엇부터 시작해야 할까요?',
    body: '프로덕트 디자이너로 취업을 준비하고 있는데, 포트폴리오나 자소서, 면접 준비 등 해야 할 일이 많아 무엇부터 시작해야 할지 고민이에요. 현재 제 경험과 역량을 먼저 점검하는 것이 좋을지, 목표 기업의 채용 공고를 분석하는 것부터 시작하는 것이 좋을지 궁금합니다. 취업 준비를 어떤 순서로 진행하면 좋을까요?',
    likes: 85,
    board: 'qna',
  },
  {
    id: 'qna-qualquant',
    title: '정성적, 정량적 데이터를 어떻게 포폴에 녹여야 할까요?',
    body: '안녕하세요. 프로덕트 디자인 직무에서 일하고 싶은 디자이너 취준생입니다. 현재 포폴을 만들고 있는데 가장 어려운 부분이 정성적, 정량적 데이터를 어떻게 넣어야하는지 입니다. 현직에 계신 멘토분들의 조언 부탁드립니다!',
    likes: 86,
    articleId: 'qualquant',
    board: 'qna',
  },
  {
    id: 'qna-failed',
    title: '포트폴리오에 실패한 프로젝트도 넣어도 될까요?',
    body: '실패한 프로젝트를 잘 풀어낼지, 아니면 과감하게 빼고 성공한 프로젝트만 넣어서 구성할지 고민입니다. 넣으면 오히려 감점 요소가 될까요? 너무 고민이에요.',
    likes: 60,
    image: imgFailedProject,
    articleId: 'failed',
    board: 'qna',
  },
  {
    id: 'qna-system',
    title: '디자인 시스템 경험이 꼭 있어야하나요?',
    body: '채용 공고에 디자인 시스템 구축·운영 경험을 우대한다고 적힌 곳이 많은데, 개인 프로젝트에서는 이런 경험을 쌓기가 어려워서 고민이에요. 어떻게 준비하면 좋을까요?',
    likes: 42,
    board: 'qna',
  },
];

const MENTOR_ANSWERS = [
  {
    id: 'answer-uha',
    name: 'U.ha',
    avatar: imgUha,
    badge: 'purple',
    role: '프로덕트 디자이너・세일즈포스・2년차',
    question: '정성적, 정량적 데이터를 어떻게 포폴에 녹여야 할까요?',
    text: '저는 정성/정량을 따로 나열하지 않고 항상 짝지어서 써요. "채팅 응답률이 12% 떨어졌다"는 숫자만 있으면 그냥 숫자예요. 근데 그 옆에 인터뷰에서 나온 "이 사람 지금 대화 가능한지 몰라서 다른 사람한테 물어봤어요"라는 말을 같이 붙이면, 그 숫자가 "왜" 떨어졌는지가 설명이 돼요. 숫자 하나마다 그걸 뒷받침하는 발화를 최소 1개씩 짝지어 넣으려고 해요.',
    likes: 127,
    articleId: 'qualquant',
  },
  {
    id: 'answer-yoonie',
    name: 'Yoonie',
    avatar: imgYoonie,
    badge: 'purple',
    role: '프로덕트 디자이너・당근・5년차',
    question: '포트폴리오에 실패한 프로젝트 넣어도 될까요?',
    text: '실패한 프로젝트를 포트폴리오에 포함하는 것 자체는 전혀 문제가 되지 않습니다. 오히려 프로젝트가 기대했던 결과를 얻지 못했더라도, 그 과정에서 어떤 문제를 발견했고 이를 어떻게 분석했으며, 이후 어떤 개선 방향을 도출했는지를 함께 보여준다면 지원자의 문제 해결 능력과 성장 가능성을 효과적으로 전달할 수 있습니다.',
    likes: 127,
    articleId: 'failed',
  },
  {
    id: 'answer-peter',
    name: 'Peter',
    avatar: imgPeter,
    badge: 'red',
    role: 'UX 디자이너・네이버・6년차',
    question: '사용성 테스트(UT) 참가자를 구하기 힘든데, 어떻게 하셨나요?',
    text: '저도 프로젝트 초반에는 UT 참가자를 구하는 게 가장 어려웠어요. 그래서 처음부터 많은 인원을 모집하기보다, 우리 서비스의 핵심 사용자와 가까운 사람을 우선적으로 찾는 것에 집중했어요. 학교 커뮤니티나 지인, 관련 단체 등을 활용했고, 참여 시간이 길지 않다는 점을 명확하게 안내해 부담을 낮췄습니다. 인원이 많지 않더라도 실제 사용자가 어떤 부분에서 막히는지 관찰하는 것만으로도 충분히 의미 있는 인사이트를 얻을 수 있어요.\n\n중요한 건 참가자 수 자체보다 어떤 사용자를 대상으로, 무엇을 검증하려는지 명확하게 정하는 것이에요. 상황에 따라 3~5명 정도의 소규모 UT부터 시작해보는 것도 좋은 방법입니다.',
    likes: 93,
    board: 'qna',
  },
  {
    id: 'answer-emma',
    name: 'Emma',
    avatar: imgEmma,
    badge: 'lightblue',
    role: '프로덕트 디자이너・오늘의 집・1년차',
    question: '정성적, 정량적 데이터를 어떻게 포폴에 녹여야 할까요?',
    text: '저도 처음엔 설문 결과 %만 나열했었는데, 멘토링 받으면서 "그래서 그게 무슨 뜻이야?"라는 질문을 계속 받았어요. 그 뒤로는 정성 데이터(인터뷰 발화)로 먼저 문제를 정의하고, 정량 데이터(설문·로그)로 그 문제가 얼마나 큰 규모인지 검증하는 순서로 배치해요.',
    likes: 86,
    articleId: 'qualquant',
  },
  {
    id: 'answer-daisy',
    name: 'Daisy',
    avatar: imgDaisy,
    badge: 'lightblue',
    role: '프로덕트 디자이너・카카오・1년차',
    question: '포트폴리오에 실패한 프로젝트 넣어도 될까요?',
    text: '저도 초반엔 실패 프로젝트 넣기가 무서워서 뺐었는데, 나중엔 그게 오히려 손해였다는 걸 알았어요. 성공 사례만 있으면 어려운 상황에서 어떻게 판단하는지 확인할 방법이 없거든요. 넣을 땐 실험 가설이 뭐였고 어떤 지표로 실패라고 판단했는지까지 구체적으로 적는 걸 추천해요.',
    likes: 67,
    articleId: 'failed',
  },
  {
    id: 'answer-eunoia',
    name: 'Eunoia',
    avatar: imgEunoia,
    badge: 'red',
    role: '프로덕트 디자이너・토스・3년차',
    question: '포트폴리오에 실패한 프로젝트 넣어도 될까요?',
    text: '저는 신입 포폴을 매년 100개 넘게 봐온 입장에서 말씀드리면, 실패 사례 자체보다 "어떻게 서술했는지"에서 갈려요. 결국 중요한 건 실패를 숨기는 게 아니라, 실패를 통해 어떤 인사이트와 개선 방향을 도출했는지를 보여주는 거예요.',
    likes: 46,
    articleId: 'failed',
  },
];

const FREE_POSTS = [
  {
    id: 'free-routine',
    title: '취준 N개월차, 다들 하루 루틴 어떻게 잡으세요?',
    body: '회사를 안 다니니까 하루가 뭉개지는 느낌이에요. 포폴 작업한다고 앉아있는데 집중은 안 되고 시간만 가고...\n다들 어떻게 하루를 계획하시는지 궁금해요.',
    likes: 28,
    board: 'freetalk',
  },
  {
    id: 'free-gangster',
    title: '드디어 1차 서류 통과했어ㅠ',
    body: '서류 통과는 취준하면서 처음인데 여기서 포폴이랑 자소서 피드백 받았었거든? 확실히 도움이 된듯.. 아직 면접 남았지만, 잠시만 이 행복을 즐기려고~ 다들 기 받아가!! 참 나는 Yoonie 멘토한테 포폴이랑 자소서 피드백 받았어!! 모의면접도 여기서 볼 수 있길래 면접도 준비하면서 최종 합격만 노린다...',
    likes: 102,
    image: imgGangsterPost,
    articleId: 'gangster',
    board: 'freetalk',
  },
  {
    id: 'free-behance',
    title: '비핸스에 포폴 올렸는데 보고 피드백 줄 사람?!',
    body: '드디어 포폴 1차 완성해서 비핸스에 올렸어요! 근데 계속 혼자 보다 보니까 뭐가 문제인지도 모르겠고 감이 없어지더라고요.. 편하게 훑어보고 솔직한 의견 주실 분 계시면 댓글 남겨주세요. 저도 다른 분들 포폴 봐드릴게요!',
    likes: 102,
    image: figma_4ca3a1c1_b478_4b2f_82a4_906fb08aa942_png,
    board: 'freetalk',
  },
  {
    id: 'free-kiki',
    title: 'UX 리서치 스터디 같이 하실 분 구해요(주1회, 온라인)',
    body: '매주 토요일 오전에 온라인으로 모여서 케이스 스터디 발표하고 서로 피드백 주고받는 스터디 구합니다.\n성실하게 임하지 않는 사람은 신청하지 않았으면 합니다.. 정말 진심으로 열시히 스터디 참여할 사람만 댓글 달아주세요!',
    likes: 32,
    image: figma_7b7f5ec8_080d_4da2_9a4e_ca50dce927a3_png,
    board: 'freetalk',
  },
  {
    id: 'free-aionue',
    title: '포트폴리오 30번은 갈아엎은 것 같아요,,ㅎ 이게 맞나 싶네요',
    body: '계속 리서치부터 다시 정리하고, 스토리라인 바꾸고, 또 갈아엎고... 벌써 몇 번째인지 모르겠어요. 다른 분들도 포폴 완성까지 이 정도로 오래 걸리셨나요? 저만 유독 느린 건가 싶어서 조금 지치네요...ㅜㅜ',
    likes: 28,
    articleId: 'aionue',
    board: 'freetalk',
  },
];

function LikeFillIcon({ filled = true }) {
  return (
    <span
      aria-hidden
      className="block size-5"
      style={{
        WebkitMaskImage: `url("${filled ? imgLikeFill : imgLikeOutline}")`,
        maskImage: `url("${filled ? imgLikeFill : imgLikeOutline}")`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        backgroundColor: '#9CA2B1',
      }}
    />
  );
}

function MoreButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-[#e7eaee] rounded-lg pl-3 pr-4 py-2 w-full flex items-center justify-center gap-1 cursor-pointer"
    >
      <img alt="" src={imgChevronDown} className="size-6" />
      <span className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886] whitespace-nowrap">더보기</span>
    </button>
  );
}

function BoardLink({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-0.5 shrink-0 cursor-pointer">
      <span className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#9ca2b1] whitespace-nowrap">게시판 보러가기</span>
      <img alt="" src={imgChevronRight} className="size-6" />
    </button>
  );
}

function CareerTalkCard({ talk, onOpenDetail }) {
  return (
    <div
      className={`relative w-full h-[282px] rounded-2xl overflow-hidden ${talk.hasDetail ? 'cursor-pointer' : ''}`}
      onClick={talk.hasDetail ? () => onOpenDetail?.(talk.articleId) : undefined}
      role={talk.hasDetail ? 'button' : undefined}
    >
      {talk.crop ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
          <img
            alt=""
            src={talk.src}
            className="absolute max-w-none w-full"
            style={{ top: talk.crop.top, left: talk.crop.left, width: talk.crop.width, height: talk.crop.height }}
          />
        </div>
      ) : (
        <img alt="" src={talk.src} className="absolute inset-0 size-full object-cover rounded-2xl" />
      )}
      <div className="absolute bottom-0 left-0 w-full h-[88px] px-4 pb-3 flex flex-col justify-end gap-0.5">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(156, 162, 177, 0.9) 0%, rgba(156, 162, 177, 0.45) 38%, rgba(156, 162, 177, 0.12) 68%, rgba(156, 162, 177, 0) 100%)',
          }}
        />
        <p className="relative font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-white [text-shadow:0_0_2px_rgba(0,0,0,0.08)]">
          {talk.title}
        </p>
        <p className="relative font-normal text-[15px] leading-[1.45] text-white [text-shadow:0_0_2px_rgba(0,0,0,0.08)]">
          {talk.mentor} ・ {talk.role}
        </p>
      </div>
    </div>
  );
}

function PostCard({ post, filled = true, onUnlike, onOpenBoard }) {
  return (
    <article className="border border-[#e7eaee] rounded-2xl px-4 py-5 flex flex-col gap-5 w-full overflow-hidden">
      <div className="flex gap-5 items-start w-full">
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <p className="font-bold text-[16px] leading-[1.45] text-[#121213]">{post.title}</p>
          <p className="text-[15px] leading-[1.6] text-[#121213] line-clamp-3 whitespace-pre-wrap">{post.body}</p>
        </div>
        {post.image && (
          <img alt="" src={post.image} className="shrink-0 w-[220px] h-[123px] object-cover rounded-2xl" />
        )}
      </div>
      <div className="flex gap-5 items-center w-full">
        <button
          type="button"
          onClick={() => onUnlike(post.id)}
          className="flex items-center gap-1 cursor-pointer"
          aria-label="좋아요 취소"
        >
          <LikeFillIcon filled={filled} />
          <span className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#121213]">{post.likes}</span>
        </button>
        <div className="flex-1" />
        <BoardLink
          onClick={() =>
            onOpenBoard?.({
              category: post.board,
              articleId: post.articleId,
            })
          }
        />
      </div>
    </article>
  );
}

function MentorAnswerCard({ answer, filled = true, onUnlike, onOpenBoard, onOpenMentorChat, onOpenMentorDetail }) {
  const badge = BADGE[answer.badge];

  return (
    <article className="border border-[#e7eaee] rounded-2xl px-4 py-5 flex flex-col gap-5 w-full overflow-hidden">
      <div className="flex gap-3 items-center w-full">
        <button
          type="button"
          className="flex-1 min-w-0 flex items-center gap-3 text-left"
          onClick={() => onOpenMentorDetail?.(answer.name)}
        >
          <MentorProfile src={answer.avatar} size="medium" />
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] whitespace-nowrap">
                {answer.name} 멘토
              </p>
              <div className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
                <div className={`absolute inset-0 opacity-10 rounded-lg ${badge.bg}`} />
                <p className={`relative text-[10px] tracking-[0.25px] whitespace-nowrap ${badge.text}`}>{badge.label}</p>
              </div>
            </div>
            <p className="text-[14px] tracking-[0.14px] text-[#747886] whitespace-nowrap">{answer.role}</p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onOpenMentorChat?.(answer.name)}
          className="shrink-0 border border-[#70d2ff] rounded-lg px-5 py-2 bg-[#1a75ff] shadow-[inset_0_0_4px_0_#e7f3ff] cursor-pointer"
        >
          <span className="font-bold text-[15px] leading-[1.45] text-white whitespace-nowrap">멘토와 채팅하기</span>
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-[16px] leading-[1.45] text-[#121213]">{answer.question}</p>
        <p className="text-[15px] leading-[1.6] text-[#121213] line-clamp-3 whitespace-pre-wrap">{answer.text}</p>
      </div>
      <div className="flex gap-5 items-center w-full">
        <button
          type="button"
          onClick={() => onUnlike(answer.id)}
          className="flex items-center gap-1 cursor-pointer"
          aria-label="좋아요 취소"
        >
          <LikeFillIcon filled={filled} />
          <span className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#121213]">{answer.likes}</span>
        </button>
        <div className="flex-1" />
        <BoardLink
          onClick={() =>
            onOpenBoard?.({
              category: answer.board ?? 'qna',
              articleId: answer.articleId,
            })
          }
        />
      </div>
    </article>
  );
}

function LikedSection({ heading, title, count, items, preview, expandBy, expanded, onExpand, renderItem }) {
  if (items.length === 0) return null;
  const limit = expanded ? (expandBy ? preview + expandBy : items.length) : preview;
  const visible = items.slice(0, limit);
  const canExpand = !expanded && items.length > preview;

  return (
    <section className="flex flex-col gap-6 items-start w-full">
      <h2 className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] w-full">
        {heading ?? `${title} (${count})`}
      </h2>
      <div className="flex flex-col gap-5 items-start w-full">
        {renderItem(visible)}
        {canExpand && <MoreButton onClick={onExpand} />}
      </div>
    </section>
  );
}

export default function MyPageLiked({
  onOpenCareerTalkDetail,
  onOpenQnaDetail,
  onOpenFreeTalkDetail,
  onOpenBoard,
  onOpenMentorChat,
  onOpenMentorDetail,
}) {
  const [hidden, setHidden] = useState(() => new Set());
  const [leaving, setLeaving] = useState(() => new Set());
  const leaveTimers = useRef(new Map());
  const [expanded, setExpanded] = useState({ career: false, qna: false, answers: false, free: false });

  useEffect(() => () => {
    leaveTimers.current.forEach(clearTimeout);
  }, []);

  const unlike = (id) => {
    if (leaveTimers.current.has(id)) return;
    setLeaving((prev) => new Set(prev).add(id));
    const timer = setTimeout(() => {
      setHidden((prev) => new Set(prev).add(id));
      setLeaving((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      leaveTimers.current.delete(id);
    }, 450);
    leaveTimers.current.set(id, timer);
  };

  const openBoard = ({ category, articleId } = {}) => {
    if (articleId) {
      if (category === 'freetalk') onOpenFreeTalkDetail?.(articleId);
      else if (category === 'careertalk') onOpenCareerTalkDetail?.(articleId);
      else onOpenQnaDetail?.(articleId);
      return;
    }
    onOpenBoard?.(category ?? 'qna');
  };

  const career = useMemo(() => CAREER_TALKS.filter((item) => !hidden.has(item.id)), [hidden]);
  const qna = useMemo(() => QNA_POSTS.filter((item) => !hidden.has(item.id)), [hidden]);
  const answers = useMemo(() => MENTOR_ANSWERS.filter((item) => !hidden.has(item.id)), [hidden]);
  const free = useMemo(() => FREE_POSTS.filter((item) => !hidden.has(item.id)), [hidden]);

  const empty = career.length + qna.length + answers.length + free.length === 0;

  return (
    <div className="pt-10 pb-16 w-full flex flex-col gap-10">
      {empty ? (
        <p className="text-[15px] leading-[1.6] text-[#747886]">좋아요한 글이 없어요.</p>
      ) : (
        <>
          <LikedSection
            heading="커리어토크 (6)"
            title="커리어토크"
            count={career.length}
            items={career}
            preview={4}
            expandBy={2}
            expanded={expanded.career}
            onExpand={() => setExpanded((prev) => ({ ...prev, career: true }))}
            renderItem={(items) => (
              <div className="grid grid-cols-2 gap-5 w-full">
                {items.map((talk) => (
                  <CareerTalkCard key={talk.id} talk={talk} onOpenDetail={onOpenCareerTalkDetail} />
                ))}
              </div>
            )}
          />
          <LikedSection
            title="Q&A"
            count={qna.length}
            items={qna}
            preview={3}
            expanded={expanded.qna}
            onExpand={() => setExpanded((prev) => ({ ...prev, qna: true }))}
            renderItem={(items) => items.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                filled={!leaving.has(post.id)}
                onUnlike={unlike}
                onOpenBoard={openBoard}
              />
            ))}
          />
          <LikedSection
            title="Q&A 멘토 답변"
            count={answers.length}
            items={answers}
            preview={3}
            expanded={expanded.answers}
            onExpand={() => setExpanded((prev) => ({ ...prev, answers: true }))}
            renderItem={(items) => items.map((answer) => (
              <MentorAnswerCard
                key={answer.id}
                answer={answer}
                filled={!leaving.has(answer.id)}
                onUnlike={unlike}
                onOpenBoard={openBoard}
                onOpenMentorChat={onOpenMentorChat}
                onOpenMentorDetail={onOpenMentorDetail}
              />
            ))}
          />
          <LikedSection
            title="프리토크"
            count={free.length}
            items={free}
            preview={3}
            expanded={expanded.free}
            onExpand={() => setExpanded((prev) => ({ ...prev, free: true }))}
            renderItem={(items) => items.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                filled={!leaving.has(post.id)}
                onUnlike={unlike}
                onOpenBoard={openBoard}
              />
            ))}
          />
        </>
      )}
    </div>
  );
}
