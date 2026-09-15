import { useState } from 'react';

const imgYoonie = "https://www.figma.com/api/mcp/asset/38da743c-39e9-4b29-92e2-178f15ebcd3d.png";
const imgEunoia = "https://www.figma.com/api/mcp/asset/92b621eb-70dd-4c6d-a935-09067d86f639.png";
const imgTeddy = "https://www.figma.com/api/mcp/asset/349f7306-9c3b-45ee-b42e-10569d6479a8.png";
const imgPersonPlus = "https://www.figma.com/api/mcp/asset/a212207e-60ef-44e7-81e1-3e03e9fcb6ed.svg";
// 팔로우 취소(마이너스) 상태: 사람 아이콘 모양을 완전히 동일하게 유지하기 위해
// (직접 그린 아이콘을 쓰지 않고) 기존 person-plus 이미지를 그대로 재사용하고,
// CSS mask(evenodd로 구멍을 뚫는 방식)로 "+"의 세로선 부분(위/아래 2군데)만
// 잘라내어 "-"처럼 보이게 함. 좌표는 실제 아이콘을 캔버스에 그려 0.25 단위로
// 픽셀 스캔해서 구한 값(24x24 기준: 세로선 x=18~20.8, 가로선 밴드 y=10.5~12.3).
const PERSON_MINUS_MASK_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' fill='white' d='M0,0H24V24H0Z M18,7.5H20.8V10.5H18Z M18,12.3H20.8V15.5H18Z'/%3E%3C/svg%3E\")";
const PERSON_MINUS_MASK_STYLE = {
  maskImage: PERSON_MINUS_MASK_URL,
  WebkitMaskImage: PERSON_MINUS_MASK_URL,
  maskSize: '100% 100%',
  WebkitMaskSize: '100% 100%',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
};

const BADGE_STYLES = {
  purple: 'text-[#9054ff] bg-[#9054ff]',
  red: 'text-[#e52222] bg-[#e52222]',
  lightblue: 'text-[#008dcf] bg-[#008dcf]',
};

const CARD_TINT = {
  purple: 'rgba(242,214,255,0.4)',
  red: 'rgba(254,213,213,0.4)',
  lightblue: 'rgba(196,236,254,0.4)',
};

const CARD_GRADIENT = {
  purple: 'linear-gradient(-1.85deg, rgba(233,186,255,0.25) 1.43%, rgba(251,247,255,0.25) 50%), #ffffff',
  red: 'linear-gradient(-1.85deg, rgba(255,181,181,0.25) 1.43%, rgba(255,250,250,0.25) 50%), #ffffff',
  lightblue: 'linear-gradient(-1.85deg, rgba(181,226,255,0.25) 1.43%, rgba(247,252,255,0.25) 50%), #ffffff',
};

const GLASS_BUTTON =
  'relative flex-1 flex items-center justify-center px-7 py-3 rounded-xl border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.4)] shadow-[inset_4px_4px_12px_0_rgba(255,255,255,0.5)] overflow-hidden cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#747886] after:opacity-0 hover:after:opacity-10';

export const MENTORS = [
  {
    name: 'Yoonie 멘토',
    badgeLabel: 'Active Mentor',
    color: 'purple',
    role: '프로덕트 디자이너 · 당근 · 5년차',
    tags: ['프로덕트 디자인', '포트폴리오'],
    desc: '프로덕트 디자인 경험을 바탕으로 리서치부터 데이터 분석까지 집중적으로 답변해드립니다.',
    reviews: '45개',
    followers: '1.2K',
    chats: '60',
    reviewCount: '45',
    avatar: imgYoonie,
  },
  {
    name: 'Eunoia',
    badgeLabel: 'Master Mentor',
    color: 'red',
    role: '프로덕트 디자이너 · 토스 · 3년차',
    tags: ['프로덕트 디자인', '포트폴리오'],
    desc: '다양한 디지털 서비스의 UX를 설계하며 사용자 문제를 해결하는 프로덕트 디자이너입니다.',
    reviews: '50개',
    followers: '1.8K',
    chats: '74',
    reviewCount: '50',
    avatar: imgEunoia,
  },
  {
    name: 'Teddy',
    badgeLabel: 'Rookie Mentor',
    color: 'lightblue',
    role: 'UX 디자이너 · 프리랜서 · 6년차',
    tags: ['UX 디자인', '포트폴리오'],
    desc: '4년의 인하우스 UX 디자이너 경험을 바탕으로 현재 프리랜서로 일하고 있습니다.',
    reviews: '5개',
    followers: '120',
    chats: '12',
    reviewCount: '5',
    avatar: imgTeddy,
  },
];

function canOpenAgentChat(name) {
  return name === 'Yoonie 멘토' || name === 'Yoonie' || name === 'Eunoia' || name === 'Teddy';
}

function canOpenInterview(name) {
  return name === 'Sunny' || name === 'Sunny 멘토';
}

export function MentorCard({ mentor, onOpenAgentChat, onOpenMentorDetail, onOpenInterview, clampDescription = false, variant = 'home' }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const isYoonie = mentor.name === 'Yoonie 멘토' || mentor.name === 'Yoonie';
  const displayName = mentor.name.endsWith('멘토') ? mentor.name : `${mentor.name} 멘토`;

  if (variant === 'profile') {
    return (
      <div
        className="relative flex flex-col gap-5 items-start p-6 rounded-2xl shrink-0 w-[364px] overflow-hidden border-[1.5px] border-white shadow-[0_0_16px_rgba(18,18,19,0.04),inset_-2px_-2px_2px_rgba(255,255,255,0.3)]"
        style={{ background: CARD_GRADIENT[mentor.color] ?? CARD_GRADIENT.purple }}
      >
        <div className="relative flex gap-2 items-start w-full">
          <div
            className={`flex-1 min-w-0 flex flex-col gap-3${isYoonie ? ' cursor-pointer' : ''}`}
            onClick={isYoonie ? () => onOpenMentorDetail?.(mentor.name) : undefined}
          >
            <img alt={displayName} src={mentor.avatar} className="size-[60px] rounded-full shrink-0 object-cover" />
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex gap-2 items-center">
                <p className="font-bold text-lg leading-[1.5] tracking-[-0.0036px] text-[#121213] whitespace-nowrap">{displayName}</p>
                <div className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
                  <div className={`absolute inset-0 opacity-10 rounded-lg ${BADGE_STYLES[mentor.color].split(' ')[1]}`} />
                  <p className={`relative text-[10px] tracking-[0.25px] whitespace-nowrap ${BADGE_STYLES[mentor.color].split(' ')[0]}`}>{mentor.badgeLabel}</p>
                </div>
              </div>
              <p className="text-sm text-[#747886] tracking-[0.14px] whitespace-nowrap">{mentor.role}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setIsFollowing((prev) => !prev);
            }}
            className="relative mt-2 shrink-0 overflow-hidden flex items-center justify-center px-5 py-2 rounded-lg border border-[#e7eaee] bg-white cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#171719] after:opacity-0 hover:after:opacity-10"
          >
            <p className="relative text-[15px] font-medium leading-[1.45] text-[#121213] whitespace-nowrap">
              {isFollowing ? '팔로우 취소' : '팔로우'}
            </p>
          </button>
        </div>

        <div className="relative flex gap-1">
          {mentor.tags.map((tag) => (
            <div key={tag} className="flex items-center justify-center px-2 py-1 rounded-lg border border-[#e7eaee]">
              <p className="text-xs font-medium text-[#747886] tracking-[0.3px] whitespace-nowrap">{tag}</p>
            </div>
          ))}
        </div>

        <div className="relative grid grid-cols-3 gap-8 text-center w-full">
          <div className="flex flex-col gap-0.5 items-center">
            <p className="font-bold text-[15px] leading-[1.45] text-[#121213]">{mentor.followers ?? '—'}</p>
            <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">팔로워</p>
          </div>
          <div className="flex flex-col gap-0.5 items-center">
            <p className="font-bold text-[15px] leading-[1.45] text-[#121213]">{mentor.chats ?? '—'}</p>
            <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">채팅</p>
          </div>
          <div className="flex flex-col gap-0.5 items-center">
            <p className="font-bold text-[15px] leading-[1.45] text-[#121213]">{mentor.reviewCount ?? mentor.reviews?.replace('개', '') ?? '—'}</p>
            <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">리뷰</p>
          </div>
        </div>

        <div className="relative w-full h-px bg-[#e7eaee]" />

        <div className="relative flex gap-3 items-start w-full">
          <button
            type="button"
            onClick={canOpenAgentChat(mentor.name) ? () => onOpenAgentChat?.(mentor) : undefined}
            className={GLASS_BUTTON}
          >
            <p className="relative font-bold text-base text-[#121213] whitespace-nowrap">채팅하기</p>
          </button>
          <button
            type="button"
            onClick={canOpenInterview(mentor.name) ? () => onOpenInterview?.(mentor) : undefined}
            className={GLASS_BUTTON}
          >
            <p className="relative font-bold text-base text-[#121213] whitespace-nowrap">면접보기</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex flex-col gap-5 items-start p-6 rounded-2xl shrink-0 w-[364px] border-[1.5px] border-white shadow-[0_0_15px_rgba(0,0,0,0.04),inset_20px_20px_40px_rgba(255,255,255,0.9),inset_-20px_-20px_40px_rgba(255,255,255,0.9)]"
      style={{ background: `radial-gradient(circle at 50% 50%, ${CARD_TINT[mentor.color]} 0%, white 70%)` }}
    >
      <div
        className={`flex gap-3 items-center w-full${isYoonie ? ' cursor-pointer' : ''}`}
        onClick={isYoonie ? () => onOpenMentorDetail?.(mentor.name) : undefined}
      >
        <img alt={mentor.name} src={mentor.avatar} className="size-[60px] rounded-full shrink-0" />
        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <div className="flex gap-2 items-center">
            <p className="font-bold text-lg tracking-[-0.0036px] text-[#121213] whitespace-nowrap">{mentor.name}</p>
            <div className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
              <div className={`absolute inset-0 opacity-10 rounded-lg ${BADGE_STYLES[mentor.color].split(' ')[1]}`} />
              <p className={`relative text-[10px] tracking-[0.25px] whitespace-nowrap ${BADGE_STYLES[mentor.color].split(' ')[0]}`}>{mentor.badgeLabel}</p>
            </div>
          </div>
          <p className="text-sm text-[#747886] tracking-[0.14px] whitespace-nowrap">{mentor.role}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-1">
          {mentor.tags.map((tag) => (
            <div key={tag} className="flex items-center justify-center px-2 py-1 rounded-lg border border-[#e7eaee]">
              <p className="text-xs font-medium text-[#747886] tracking-[0.3px] whitespace-nowrap">{tag}</p>
            </div>
          ))}
        </div>
        <p className={`text-base leading-[1.45] text-[#121213]${clampDescription ? ' line-clamp-2' : ''}`}>{mentor.desc}</p>
      </div>

      <div className="flex gap-2 items-center text-sm text-[#121213] tracking-[0.14px]">
        <p>대화 후 리뷰</p>
        <p className="font-bold">{mentor.reviews}</p>
      </div>

      <div className="w-full h-px bg-[#e7eaee]" />

      <div className="flex gap-3 items-start w-full">
        <button
          type="button"
          onClick={canOpenAgentChat(mentor.name) ? () => onOpenAgentChat?.(mentor) : undefined}
          className="relative flex-1 flex items-center justify-center px-7 py-3 rounded-xl border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.4)] shadow-[inset_4px_4px_12px_0_rgba(255,255,255,0.5)] overflow-hidden cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#747886] after:opacity-0 hover:after:opacity-10"
        >
          <p className="relative font-bold text-base text-[#121213] whitespace-nowrap">에이전트와 채팅하기</p>
        </button>
        <button
          type="button"
          onClick={() => setIsFollowing((prev) => !prev)}
          className="relative flex items-center justify-center h-[47px] w-16 px-5 py-2 rounded-full border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.4)] shadow-[inset_4px_4px_12px_0_rgba(255,255,255,0.5)] overflow-hidden cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#747886] after:opacity-0 hover:after:opacity-10"
        >
          {isFollowing ? (
            <img alt="멘토 팔로우 취소" src={imgPersonPlus} className="size-6" style={PERSON_MINUS_MASK_STYLE} />
          ) : (
            <img alt="멘토 추가" src={imgPersonPlus} className="size-6" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function MentorRecommendations({ onOpenAgentChat, onOpenMentorDetail }) {
  return (
    <section className="flex flex-col gap-6 items-start w-full">
      <h2 className="font-bold text-[22px] tracking-[-0.33px] text-[#121213]">윤영님에게 추천하는 멘토</h2>
      <div className="flex gap-5 items-start">
        {MENTORS.map((mentor) => (
          <MentorCard key={mentor.name} mentor={mentor} onOpenAgentChat={onOpenAgentChat} onOpenMentorDetail={onOpenMentorDetail} />
        ))}
      </div>
    </section>
  );
}
