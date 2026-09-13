import { useRef, useState } from 'react';
import { MentorCard } from '../MentorRecommendations';

const imgClose = 'https://www.figma.com/api/mcp/asset/584cd8e0-692e-40dd-b281-c786a976a2df.svg';
const imgSearchIcon = 'https://www.figma.com/api/mcp/asset/6200caeb-f035-496f-8a18-17217b41b83a.svg';

const POPULAR_SEARCHES = [
  'Master Mentor',
  '토스',
  '면접',
  '포트폴리오',
  'Sunny',
  '해외 취업',
];

// "Master Mentor" 검색 결과에 노출되는 멘토 카드 데이터 (Figma: After Search_MasterMentor)
const imgJohn = 'https://www.figma.com/api/mcp/asset/c58f2eb9-fc3f-4dc2-9304-c812c269ce4a.png';
const imgSunny = 'https://www.figma.com/api/mcp/asset/4fc2875a-b944-432f-a353-27f4477fb297.png';
const imgKevin = 'https://www.figma.com/api/mcp/asset/62f18348-a922-4f06-9f91-0f572c9bb895.png';
const imgDave = 'https://www.figma.com/api/mcp/asset/d1e33ab9-4908-499b-85a9-5f3fdb6101fa.png';
const imgEunoia = 'https://www.figma.com/api/mcp/asset/7dcce8ce-03aa-4c20-becc-5efdd47b9e72.png';
const imgEthan = 'https://www.figma.com/api/mcp/asset/8f5af816-6ac2-429a-a38a-4940495a7fcf.png';

const SEARCH_RESULT_MENTORS = [
  {
    name: 'John',
    badgeLabel: 'Master Mentor',
    color: 'red',
    role: '백엔드 개발자 · 토스 · 15년차',
    tags: ['개발', '면접', '포트폴리오'],
    desc: '15년간의 개발 경험으로 탄탄한 실무 역량과 개발자 커리어를 알려드려요.',
    reviews: '72개',
    avatar: imgJohn,
  },
  {
    name: 'Sunny',
    badgeLabel: 'Master Mentor',
    color: 'red',
    role: 'UX 디자이너 · 카카오 · 5년차',
    tags: ['UX 디자인', '면접'],
    desc: 'UX 디자이너의 실무 능력부터 면접까지 취업에 관한 내용들을 집중적으로 알려드립니다.',
    reviews: '60개',
    avatar: imgSunny,
  },
  {
    name: 'Kevin',
    badgeLabel: 'Master Mentor',
    color: 'red',
    role: '게임 아티스트 · 엔씨소프트 · 6년차',
    tags: ['게임 제작', '자소서', '실무'],
    desc: '게임의 분위기부터 팀의 방향까지, 아트 디렉팅의 핵심을 짚어드려요.',
    reviews: '58개',
    avatar: imgKevin,
  },
  {
    name: 'Dave',
    badgeLabel: 'Master Mentor',
    color: 'red',
    role: '프론트 개발자 · 우아한 형제들 · 8년차',
    tags: ['프론트 개발', '면접'],
    desc: '코딩부터 협업까지, 현업에서 진짜 필요한 이야기를 들려드릴게요.',
    reviews: '53개',
    avatar: imgDave,
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
    name: 'Ethan',
    badgeLabel: 'Master Mentor',
    color: 'red',
    role: '광고 기획자 · 제일기획 · 7년차',
    tags: ['광고 기획', '자소서', '면접'],
    desc: '아이디어를 ‘팔리는 기획’으로 만드는 과정을 함께 살펴봐요.',
    reviews: '61개',
    avatar: imgEthan,
  },
];

// "Master Mentor" 검색 결과의 콘텐츠 카드 데이터
const imgContentThumb1 = 'https://www.figma.com/api/mcp/asset/28f97689-f273-48d2-b046-9792727055bf.png';
const imgContentThumb2 = 'https://www.figma.com/api/mcp/asset/9087b259-e5a2-4b62-b6e6-e333ba2eb510.png';
const imgContentThumb3 = 'https://www.figma.com/api/mcp/asset/a5f3d68d-868f-4a62-be6e-28148e379581.png';
const imgContentThumb4 = 'https://www.figma.com/api/mcp/asset/71d4380a-a1a2-451f-8ee3-2b42796b5869.png';
const imgBookmark = 'https://www.figma.com/api/mcp/asset/d16cf0e4-c85b-4e5d-8149-8760204fc052.svg';
const imgBookmarkFill = 'https://www.figma.com/api/mcp/asset/b20bcd72-0b9e-4707-8bd9-b80aa3f1fae3.svg';

const SEARCH_RESULT_CONTENTS = [
  { title: '면접 볼 때 이것만은 하지마세요!', mentor: 'Sunny 멘토', role: 'UX 디자이너', thumbnail: imgContentThumb1 },
  { title: '면접관이 보는 합격하는 사람의 공통점', mentor: 'Sunny 멘토', role: 'UX 디자이너', thumbnail: imgContentThumb2 },
  { title: '비대면으로 UT하는 툴 소개드려요', mentor: 'Andrew 멘토', role: '프로덕트 디자이너', thumbnail: imgContentThumb3 },
  { title: '백엔드 개발자 면접에서 가장 많이 나오는 질문', mentor: 'John 멘토', role: '백엔드 개발자', thumbnail: imgContentThumb4 },
];

function SearchResultContentCard({ content }) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="relative h-[312px] w-full rounded-2xl overflow-hidden shrink-0">
      <img src={content.thumbnail} alt={content.title} className="absolute inset-0 size-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-[52px] bg-gradient-to-b from-black/10 to-transparent flex items-center justify-end px-3">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setBookmarked((v) => !v);
          }}
          className="relative flex items-center justify-center size-6 overflow-hidden cursor-pointer"
          aria-pressed={bookmarked}
        >
          {bookmarked ? (
            <span
              aria-hidden
              className="block size-6"
              style={{
                WebkitMaskImage: `url("${imgBookmarkFill}")`,
                maskImage: `url("${imgBookmarkFill}")`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                backgroundColor: '#ffffff',
              }}
            />
          ) : (
            <img alt="북마크" src={imgBookmark} className="size-6" />
          )}
        </button>
      </div>
      <div className="absolute bottom-0 left-0 w-full px-4 pb-4 pt-10 bg-gradient-to-t from-black/60 to-transparent flex flex-col gap-0.5">
        <p className="font-bold text-lg text-white [text-shadow:0_0_2px_rgba(0,0,0,0.3)]">{content.title}</p>
        <div className="flex gap-1 items-center text-[15px] text-white">
          <span>{content.mentor}</span>
          <span>・</span>
          <span>{content.role}</span>
        </div>
      </div>
    </div>
  );
}

function ShowMoreButton() {
  return (
    <div className="flex items-center justify-center w-full">
      <button
        type="button"
        className="flex items-center justify-center w-full max-w-[423px] py-3 rounded-xl border border-[#e7eaee] cursor-pointer"
      >
        <p className="font-bold text-base text-[#121213]">더보기</p>
      </button>
    </div>
  );
}

export default function SearchPage({ onClose, onOpenAgentChat }) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [activeTab, setActiveTab] = useState('mentor');

  const mentorSectionRef = useRef(null);
  const contentSectionRef = useRef(null);

  const normalizeQuery = (value) => value.replace(/\s+/g, '').toLowerCase();
  const hasResults = submittedQuery !== '';
  const isMasterMentorResult = hasResults && normalizeQuery(submittedQuery) === 'mastermentor';

  const submitQuery = (raw) => {
    const value = raw.trim();
    if (!value) return;
    setRecentSearches((prev) => [value, ...prev.filter((item) => item !== value)]);
    setSubmittedQuery(value);
    setActiveTab('mentor');
    setQuery(value);
  };

  const scrollToTab = (tab) => {
    setActiveTab(tab);
    const target = tab === 'content' ? contentSectionRef.current : mentorSectionRef.current;
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex-1 min-w-0 min-h-0 h-full bg-white rounded-2xl shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-y-auto flex flex-col items-center">
      {/* 검색 필드 + 카테고리 탭: 스크롤해도 상단에 고정 */}
      <div className="sticky top-0 z-20 w-full bg-white flex flex-col items-center pt-16 pb-6 gap-5">
        <div className="flex flex-col gap-5 items-end w-[731px] max-w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center size-6 cursor-pointer"
            aria-label="검색 닫기"
          >
            <img alt="" src={imgClose} className="size-6" />
          </button>

          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              submitQuery(query);
            }}
          >
            <div className="border-[1.5px] border-[#e7eaee] rounded-2xl h-16 px-6 flex items-center gap-3 bg-white">
              <img alt="" src={imgSearchIcon} className="size-6 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    submitQuery(query);
                  }
                }}
                placeholder="검색어를 입력하세요.."
                className="flex-1 min-w-0 text-[15px] leading-[1.6] text-[#121213] placeholder:text-[#9ca2b1] outline-none bg-transparent"
              />
            </div>
          </form>
        </div>

        {hasResults && isMasterMentorResult && (
          <div className="relative flex gap-5 items-center w-[1133px] max-w-full">
            <div className="absolute inset-x-0 bottom-0 h-px bg-[#e7eaee]" />
            <button
              type="button"
              onClick={() => scrollToTab('mentor')}
              className={`relative flex items-center justify-center px-5 pt-3.5 pb-5 cursor-pointer border-b-2 ${
                activeTab === 'mentor' ? 'border-[#121213]' : 'border-transparent'
              }`}
            >
              <p
                className={`text-base whitespace-nowrap ${
                  activeTab === 'mentor' ? 'font-bold text-[#121213]' : 'font-medium text-[#747886]'
                }`}
              >
                멘토 28
              </p>
            </button>
            <button
              type="button"
              onClick={() => scrollToTab('content')}
              className={`relative flex items-center justify-center px-5 pt-3.5 pb-5 cursor-pointer border-b-2 ${
                activeTab === 'content' ? 'border-[#121213]' : 'border-transparent'
              }`}
            >
              <p
                className={`text-base whitespace-nowrap ${
                  activeTab === 'content' ? 'font-bold text-[#121213]' : 'font-medium text-[#747886]'
                }`}
              >
                콘텐츠 74
              </p>
            </button>
          </div>
        )}
      </div>

      {/* 스크롤되는 본문 영역 */}
      <div className="w-full flex flex-col items-center gap-12 pb-16">
        {!hasResults && recentSearches.length > 0 && (
          <section className="flex flex-col gap-7 w-[731px] max-w-full">
            <div className="flex items-center gap-3 w-full">
              <p className="font-bold text-[16px] leading-[1.45] text-[#121213]">최근 검색어</p>
              <div className="flex-1" />
              <button
                type="button"
                onClick={() => setRecentSearches([])}
                className="font-normal text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886] cursor-pointer"
              >
                전체 삭제
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => submitQuery(term)}
                  className="relative overflow-hidden border border-[#e7eaee] rounded-lg px-4 py-2 text-[14px] leading-[1.42] tracking-[0.14px] font-medium text-[#121213] whitespace-nowrap cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:rounded-lg after:transition-opacity"
                >
                  <span className="relative">{term}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {!hasResults && (
          <section className="flex flex-col gap-7 w-[731px] max-w-full">
            <p className="font-bold text-[16px] leading-[1.45] text-[#121213]">이번주 인기 검색어</p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-5">
              {POPULAR_SEARCHES.map((term, index) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => submitQuery(term)}
                  className="flex items-center gap-3 font-medium text-[15px] leading-[1.45] text-[#121213] text-left cursor-pointer"
                >
                  <span>{index + 1}</span>
                  <span>{term}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {hasResults && !isMasterMentorResult && (
          <div className="flex flex-col items-center gap-3 w-[731px] max-w-full py-10 text-center">
            <p className="font-bold text-[16px] leading-[1.45] text-[#121213]">'{submittedQuery}'에 대한 검색 결과가 없습니다</p>
            <p className="text-[14px] leading-[1.42] text-[#9ca2b1]">다른 검색어로 다시 시도해보세요.</p>
          </div>
        )}

        {hasResults && isMasterMentorResult && (
          <div className="flex flex-col gap-12 w-[1133px] max-w-full">
            <div ref={mentorSectionRef} className="flex flex-col gap-10 w-full scroll-mt-[220px]">
              <p className="font-bold text-[22px] tracking-[-0.33px] text-[#121213]">멘토</p>
              <div className="flex flex-wrap gap-5">
                {SEARCH_RESULT_MENTORS.map((mentor) => (
                  <MentorCard key={mentor.name} mentor={mentor} onOpenAgentChat={onOpenAgentChat} clampDescription />
                ))}
              </div>
              <ShowMoreButton />
            </div>

            <div ref={contentSectionRef} className="flex flex-col gap-10 w-full scroll-mt-[220px]">
              <p className="font-bold text-[22px] tracking-[-0.33px] text-[#121213]">콘텐츠</p>
              <div className="grid grid-cols-2 gap-5">
                {SEARCH_RESULT_CONTENTS.map((content) => (
                  <SearchResultContentCard key={content.title} content={content} />
                ))}
              </div>
              <ShowMoreButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
