const imgYoonie = "https://www.figma.com/api/mcp/asset/38da743c-39e9-4b29-92e2-178f15ebcd3d.png";
const imgEunoia = "https://www.figma.com/api/mcp/asset/92b621eb-70dd-4c6d-a935-09067d86f639.png";
const imgTeddy = "https://www.figma.com/api/mcp/asset/349f7306-9c3b-45ee-b42e-10569d6479a8.png";
const imgPersonPlus = "https://www.figma.com/api/mcp/asset/a212207e-60ef-44e7-81e1-3e03e9fcb6ed.svg";

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

const MENTORS = [
  {
    name: 'Yoonie 멘토',
    badgeLabel: 'Active Mentor',
    color: 'purple',
    role: '프로덕트 디자이너 · 당근 · 5년차',
    tags: ['프로덕트 디자인', '포트폴리오'],
    desc: '프로덕트 디자인 경험을 바탕으로 리서치부터 데이터 분석까지 집중적으로 답변해드립니다.',
    reviews: '45개',
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
    avatar: imgTeddy,
  },
];

function MentorCard({ mentor }) {
  return (
    <div
      className="relative flex flex-col gap-5 items-start p-6 rounded-2xl shrink-0 w-[364px] border-[1.5px] border-white shadow-[0_0_15px_rgba(0,0,0,0.04),inset_20px_20px_40px_rgba(255,255,255,0.9),inset_-20px_-20px_40px_rgba(255,255,255,0.9)]"
      style={{ background: `radial-gradient(circle at 50% 50%, ${CARD_TINT[mentor.color]} 0%, white 70%)` }}
    >
      <div className="flex gap-3 items-center w-full">
        <img alt={mentor.name} src={mentor.avatar} className="size-[60px] rounded-full shrink-0" />
        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <div className="flex gap-2 items-center">
            <p className="font-bold text-lg tracking-[-0.0036px] text-[#121213] whitespace-nowrap">{mentor.name}</p>
            <div className={`relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0`}>
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
        <p className="text-base leading-[1.45] text-[#121213]">{mentor.desc}</p>
      </div>

      <div className="flex gap-2 items-center text-sm text-[#121213] tracking-[0.14px]">
        <p>대화 후 리뷰</p>
        <p className="font-bold">{mentor.reviews}</p>
      </div>

      <div className="w-full h-px bg-[#e7eaee]" />

      <div className="flex gap-3 items-start w-full">
        <button type="button" className="relative flex-1 flex items-center justify-center px-7 py-3 rounded-xl border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.4)] shadow-[inset_4px_4px_12px_0_rgba(255,255,255,0.5)] overflow-hidden cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#747886] after:opacity-0 hover:after:opacity-10">
          <p className="relative font-bold text-base text-[#121213] whitespace-nowrap">에이전트와 채팅하기</p>
        </button>
        <button type="button" className="relative flex items-center justify-center h-[47px] w-16 px-5 py-2 rounded-full border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.4)] shadow-[inset_4px_4px_12px_0_rgba(255,255,255,0.5)] overflow-hidden cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#747886] after:opacity-0 hover:after:opacity-10">
          <img alt="멘토 추가" src={imgPersonPlus} className="size-6" />
        </button>
      </div>
    </div>
  );
}

export default function MentorRecommendations() {
  return (
    <section className="flex flex-col gap-6 items-start w-full">
      <h2 className="font-bold text-[22px] tracking-[-0.33px] text-[#121213]">윤영님에게 추천하는 멘토</h2>
      <div className="flex gap-5 items-start">
        {MENTORS.map((mentor) => (
          <MentorCard key={mentor.name} mentor={mentor} />
        ))}
      </div>
    </section>
  );
}
