import { useEffect, useState } from 'react';
import MentitAiSubMenu from './MentitAiSubMenu';

const imgSend = 'https://www.figma.com/api/mcp/asset/2dda7b37-f0bb-4b8e-8d9f-ac9709f93b08.svg';
const imgThumbnail1 = 'https://www.figma.com/api/mcp/asset/3c061cdb-9bff-4932-8051-491c144e577c.png';
const imgThumbnail2 = 'https://www.figma.com/api/mcp/asset/12220f1e-7e9e-4e8e-88c1-29e19fa7e1ba.png';
const imgBookmark = 'https://www.figma.com/api/mcp/asset/7dd4dd90-1310-4e13-b127-08d8a397f76a.svg';

const SUGGESTED_QUESTIONS = [
  '프로덕트 디자이너의 포트폴리오는 몇 장이 좋을까요?',
  'UX 디자이너랑 PM 중에 뭐가 저한테 더 잘 맞을까요?',
  '직무를 바꾸고 싶을 땐 어떻게 접근해야 하나요?',
];

const FOLLOW_UP_CHIPS = [
  '프로덕트 디자이너 멘토의 아티클을 조금 더 추천해줘',
  '프로덕트 디자이너의 일하는 방식을 더 구체적으로 설명해줘',
  '현직자 멘토와 대화할 때 어떤 질문을 해야할까?',
];

const SECTIONS = [
  {
    title: '1. 어떤 순간에 몰입했는지 떠올려보세요',
    desc: '지금까지 해온 프로젝트나 과제 중에서, 시간 가는 줄 모르고 몰입했던 순간이 언제였는지 생각해보세요. 문제를 "발견"할 때 재밌었는지, "설계"할 때 재밌었는지, 아니면 "실행하고 검증"할 때 재밌었는지에 따라 어울리는 직무가 달라져요.',
  },
  {
    title: '2. 현직자들의 데이터를 보면, 이런 패턴이 있어요',
    desc: '멘팃에 있는 현직자 분들의 이야기를 보면, 직무를 잘 선택한 사람들은 대부분 "일하는 방식"을 먼저 봤어요. 예를 들어 UX 디자이너는 리서치와 반복 개선을 좋아하는 사람이, PM은 여러 사람을 조율하며 우선순위를 정하는 걸 좋아하는 사람이 오래 버티는 경향이 있었어요.',
  },
  {
    title: '3. 직접 대화하면서 확인해보는 게 제일 빨라요',
    desc: '아무리 고민해도 직접 경험해본 사람 이야기를 들어보는 것만큼 명확해지지 않아요. 관심 있는 직무의 현직자 멘토와 짧게라도 대화해보시면, "아, 이게 나랑 맞다/안 맞다"가 꽤 빨리 느껴지실 거예요.',
  },
  {
    title: '윤영님께 질문 하나 드릴게요.',
    desc: '최근 진행하신 프로젝트에서, 가장 뿌듯했던 순간은 어떤 작업을 하고 있을 때였나요? 그 답을 들으면 제가 더 구체적으로 방향을 좁혀드릴 수 있을 것 같아요.',
  },
];

const ARTICLES = [
  {
    image: imgThumbnail1,
    title: 'AI 시대의 프로덕트 디자인 활용 팁',
    mentor: 'Yoonie 멘토',
    role: '프로덕트 디자이너',
    articleId: 'yoonie',
  },
  {
    image: imgThumbnail2,
    title: '인터뷰 스크립트 짜는 법',
    mentor: 'Peter 멘토',
    role: 'UX 디자이너',
  },
];

function useRotatingText(items, { displayTime = 1700, transitionTime = 220 } = {}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setVisible(false), displayTime);
    return () => clearTimeout(hideTimer);
  }, [index, displayTime]);

  useEffect(() => {
    if (visible) return undefined;
    const nextTimer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
      setVisible(true);
    }, transitionTime);
    return () => clearTimeout(nextTimer);
  }, [visible, items.length, transitionTime]);

  return { text: items[index], visible };
}

// AI 답변을 한 블록씩 순차적으로 나타나게 함 (안내 문구 -> 기준 섹션들 -> 아티클 추천)
// - 스트리밍/타이핑처럼 답변을 주는 느낌을 주기 위함.
function useSequentialReveal(steps, stepDelay = 380) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= steps) return undefined;
    const timer = setTimeout(() => setRevealed((prev) => prev + 1), revealed === 0 ? 200 : stepDelay);
    return () => clearTimeout(timer);
  }, [revealed, steps, stepDelay]);

  return revealed;
}

function RevealBlock({ show, className = '', children }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!show) return undefined;
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [show]);

  return (
    <div
      className={`w-full transition-[opacity,transform] duration-500 ease-out will-change-transform ${
        entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function JobTextfield({ onSubmitQuery }) {
  const [value, setValue] = useState('');
  const { text, visible } = useRotatingText(SUGGESTED_QUESTIONS);

  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onSubmitQuery(v);
    setValue('');
  };

  return (
    <div className="flex flex-col items-start w-full max-w-[867px]">
      <div className="relative flex items-center w-full rounded-xl border border-[#e7eaee] bg-white/40 backdrop-blur-[6px] shadow-[inset_4px_4px_12px_rgba(255,255,255,0.5)] px-5 py-3 gap-2">
        <div className="relative flex-1 min-w-0 h-6 flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit();
            }}
            className="w-full bg-transparent text-[15px] leading-[1.6] text-[#121213] outline-none relative z-[1]"
          />
          {value === '' && (
            <span
              className={`pointer-events-none absolute left-0 text-[15px] leading-[1.6] text-[#9ca2b1] whitespace-nowrap transition-all duration-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
              }`}
            >
              {text}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={submit}
          className="relative flex items-center justify-center px-5 py-2 rounded-full bg-[#1a75ff] border border-[#70d2ff] shadow-[inset_0_0_4px_rgba(231,243,255,1)] shrink-0 cursor-pointer"
          aria-label="전송"
        >
          <img alt="" src={imgSend} className="size-6" />
        </button>
      </div>
    </div>
  );
}

function ArticleCard({ image, title, mentor, role, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative flex-1 min-w-0 h-[282px] rounded-2xl overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}
    >
      <img alt="" src={image} className="absolute inset-0 size-full object-cover pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[52px] bg-gradient-to-b from-black/15 to-transparent flex items-start justify-end px-3 pt-3">
        <button
          type="button"
          aria-label="북마크"
          onClick={(e) => e.stopPropagation()}
          className="cursor-pointer"
        >
          <img alt="" src={imgBookmark} className="size-6" />
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 pt-8 pb-3 px-4 bg-gradient-to-t from-black/55 to-transparent flex flex-col gap-0.5">
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-white [text-shadow:0_0_2px_rgba(18,18,19,0.08)]">
          {title}
        </p>
        <div className="flex gap-1 items-center text-[15px] leading-[1.45] text-white [text-shadow:0_0_2px_rgba(18,18,19,0.08)] whitespace-nowrap">
          <p>{mentor}</p>
          <p>・</p>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function MentitAiJobRecommend({ isSubMenuOpen = true, onCloseSubMenu, onOpenCareerTalkDetail }) {
  const revealed = useSequentialReveal(6);
  const [activeQuery, setActiveQuery] = useState('직무 추천');

  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && <MentitAiSubMenu onClose={onCloseSubMenu} />}

      <section className="relative flex-1 min-w-0 min-h-0 flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
        <div className="shrink-0 flex items-center px-5 py-6 border-b border-[#e7eaee]">
          <p className="font-bold text-lg tracking-[-0.0036px] text-[#121213]">직무 선택 고민</p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center px-5 pt-10 pb-[260px]">
          <div className="flex flex-col gap-10 items-start w-full max-w-[867px]">
            <div className="self-end bg-[#f9fafb] max-w-[513px] p-3 rounded-xl">
              <p className="text-[15px] leading-[1.6] text-[#121213]">{activeQuery}</p>
            </div>

            <RevealBlock show={revealed >= 1}>
              <p className="text-[15px] leading-[1.6] text-[#121213]">
                네, 윤영님이 지금 이 고민을 하고 계신다는 것 자체가 이미 좋은 신호예요. 직무 선택은 "정답"을 찾는 게
                아니라, 나에게 맞는 걸 좁혀가는 과정이거든요. 몇 가지 기준으로 함께 정리해볼게요.
              </p>
            </RevealBlock>

            <RevealBlock show={revealed >= 2} className="flex flex-col gap-5 items-start">
              <div className="h-px bg-[#e7eaee] w-full" />
              <div className="flex flex-col gap-3 items-start w-full text-[#121213]">
                <p className="text-[15px] font-bold leading-[1.6]">{SECTIONS[0].title}</p>
                <p className="text-[15px] leading-[1.6]">{SECTIONS[0].desc}</p>
              </div>
            </RevealBlock>

            <RevealBlock show={revealed >= 3} className="flex flex-col gap-3 items-start text-[#121213]">
              <p className="text-[15px] font-bold leading-[1.6]">{SECTIONS[1].title}</p>
              <p className="text-[15px] leading-[1.6]">{SECTIONS[1].desc}</p>
            </RevealBlock>

            <RevealBlock show={revealed >= 4} className="flex flex-col gap-3 items-start text-[#121213]">
              <p className="text-[15px] font-bold leading-[1.6]">{SECTIONS[2].title}</p>
              <p className="text-[15px] leading-[1.6]">{SECTIONS[2].desc}</p>
            </RevealBlock>

            <RevealBlock show={revealed >= 5} className="flex flex-col gap-3 items-start text-[#121213]">
              <p className="text-[15px] font-bold leading-[1.6]">{SECTIONS[3].title}</p>
              <p className="text-[15px] leading-[1.6]">{SECTIONS[3].desc}</p>
            </RevealBlock>

            <RevealBlock show={revealed >= 6} className="flex flex-col gap-5 items-start">
              <div className="h-px bg-[#e7eaee] w-full" />
              <p className="text-[15px] leading-[1.6] text-[#121213]">윤영님이 관심있게 볼 아티클을 추천해드릴게요.</p>
              <div className="flex gap-5 items-center w-full">
                {ARTICLES.map((article) => (
                  <ArticleCard
                    key={article.title}
                    {...article}
                    onClick={article.articleId ? () => onOpenCareerTalkDetail?.(article.articleId) : undefined}
                  />
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-6 items-center px-5 pt-10 pb-6">
          <div className="flex flex-col gap-2 items-end w-full max-w-[867px] self-center">
            {FOLLOW_UP_CHIPS.map((chip) => (
              <div key={chip} className="bg-white border border-[#e7eaee] rounded-lg px-5 py-2">
                <p className="text-[15px] font-medium text-[#747886] whitespace-nowrap">{chip}</p>
              </div>
            ))}
          </div>
          <JobTextfield onSubmitQuery={setActiveQuery} />
        </div>
      </section>
    </div>
  );
}
