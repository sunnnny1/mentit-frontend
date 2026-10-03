import { useEffect, useRef, useState } from 'react';
import imgChevronDown from '../../assets/figma/b129180e-e058-43e6-80e8-4aa7162f3570.svg';
import imgClose from '../../assets/figma/bb0a6938-7df7-4883-a64c-f1e6d81ec1a5.svg';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const TOPICS = ['UX 사례', '트렌드', '기업 블로그', 'AI 디자인 툴'];
const COUNT_OPTIONS = [1, 2, 3, 4, 5];
const TIME_OPTIONS = [
  '오전 8:00',
  '오전 9:00',
  '오전 10:00',
  '오전 11:00',
  '오후 12:00',
  '오후 1:00',
  '오후 2:00',
  '오후 3:00',
  '오후 4:00',
  '오후 5:00',
  '오후 6:00',
  '오후 7:00',
  '오후 8:00',
  '오후 9:00',
];

export const DEFAULT_INSIGHT_SETTINGS = {
  days: ['월', '수', '금'],
  time: '오후 2:00',
  count: 1,
  topics: ['트렌드', '기업 블로그'],
  companies: ['토스', '카카오', '당근'],
  push: true,
  email: true,
};

export function insightScheduleCopy(settings) {
  const days = DAYS.filter((day) => settings.days.includes(day));
  if (days.length === 0) return '인사이트를 받을 요일과 시간을 설정해주세요';
  const timeLabel = settings.time.replace(':00', '시');
  return `${days.join('/')} ${timeLabel}에 국내외 기업 UX 사례, 프로덕트 디자인 트렌드 인사이트를 보내드려요!`;
}

function SectionHeading({ title, subtext }) {
  return (
    <div className="flex flex-col gap-1 items-start w-full">
      <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">{title}</p>
      <p className="text-[14px] leading-[1.42] tracking-[0.14px] text-[#9ca2b1] w-full">{subtext}</p>
    </div>
  );
}

function FieldLabel({ children }) {
  return <p className="font-medium text-[16px] leading-[1.45] text-[#121213]">{children}</p>;
}

function ChipButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden flex items-center justify-center px-7 py-3 rounded-xl border cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 ${
        active ? 'bg-[#1a75ff]/10 border-[#1a75ff]' : 'bg-white border-[#e7eaee]'
      }`}
    >
      <p className={`relative font-medium text-[16px] leading-[1.45] whitespace-nowrap ${active ? 'text-[#1a75ff]' : 'text-[#747886]'}`}>
        {label}
      </p>
    </button>
  );
}

function SelectDropdown({ value, options, onChange, formatOption = (option) => option }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative w-[300px]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="relative overflow-hidden w-full bg-white border border-[#e7eaee] rounded-xl px-5 py-3 flex items-center gap-2 cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
        aria-expanded={open}
      >
        <span className="relative flex-1 text-left text-[15px] leading-[1.45] text-[#121213]">{formatOption(value)}</span>
        <img alt="" src={imgChevronDown} className={`relative size-6 shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-20 mt-2 w-full max-h-[240px] overflow-y-auto bg-white border border-[#e7eaee] rounded-[10px] p-2 shadow-[0_0_8px_rgba(18,18,19,0.04)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-[14px] leading-[1.58] tracking-[0.14px] cursor-pointer ${
                option === value ? 'bg-[#f4f6f8] text-[#121213]' : 'text-[#121213] hover:bg-[#f4f6f8]'
              }`}
            >
              {formatOption(option)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Switch({ checked, onToggle, label }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={label}
      className={`flex items-center h-6 w-[39px] shrink-0 rounded-full p-[3px] cursor-pointer transition-colors ${
        checked ? 'bg-[#1a75ff] justify-end' : 'bg-[#dfe4e8] justify-start'
      }`}
    >
      <span className="size-[18px] rounded-full bg-white shrink-0" />
    </button>
  );
}

function cloneSettings(settings) {
  return {
    ...settings,
    days: [...settings.days],
    topics: [...settings.topics],
    companies: [...settings.companies],
  };
}

export default function MyPageInsightSettings({ initialSettings = DEFAULT_INSIGHT_SETTINGS, onCancel, onSave }) {
  const [draft, setDraft] = useState(() => cloneSettings(initialSettings));
  const [addingCompany, setAddingCompany] = useState(false);
  const [companyInput, setCompanyInput] = useState('');
  const companyInputRef = useRef(null);

  useEffect(() => {
    if (addingCompany) companyInputRef.current?.focus();
  }, [addingCompany]);

  const toggleIn = (key, value) => {
    setDraft((current) => {
      const list = current[key];
      return {
        ...current,
        [key]: list.includes(value) ? list.filter((item) => item !== value) : [...list, value],
      };
    });
  };

  const addCompany = () => {
    const name = companyInput.trim();
    if (name && !draft.companies.includes(name)) {
      setDraft((current) => ({ ...current, companies: [...current.companies, name] }));
    }
    setCompanyInput('');
    setAddingCompany(false);
  };

  return (
    <div className="flex flex-col gap-16 w-full pt-10 pb-16">
      <div className="flex flex-col gap-6 w-full">
        <SectionHeading title="받는 주기" subtext="인사이트를 받을 요일과 시간을 선택해주세요" />
        <div className="flex flex-col gap-2 w-full">
          <FieldLabel>요일</FieldLabel>
          <div className="flex gap-3 items-start flex-wrap">
            {DAYS.map((day) => (
              <ChipButton key={day} label={day} active={draft.days.includes(day)} onClick={() => toggleIn('days', day)} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <FieldLabel>시간</FieldLabel>
          <SelectDropdown value={draft.time} options={TIME_OPTIONS} onChange={(time) => setDraft((current) => ({ ...current, time }))} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <FieldLabel>한번에 받을 인사이트 글 갯수</FieldLabel>
          <SelectDropdown
            value={draft.count}
            options={COUNT_OPTIONS}
            formatOption={(count) => `${count}개`}
            onChange={(count) => setDraft((current) => ({ ...current, count: Math.min(5, Math.max(1, count)) }))}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <SectionHeading title="관심 주제" subtext="받고 싶은 인사이트 주제를 골라주세요" />
        <div className="flex gap-3 items-start flex-wrap">
          {TOPICS.map((topic) => (
            <ChipButton key={topic} label={topic} active={draft.topics.includes(topic)} onClick={() => toggleIn('topics', topic)} />
          ))}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <FieldLabel>관심 기업</FieldLabel>
          <div className="flex gap-3 items-start flex-wrap">
            {draft.companies.map((company) => (
              <div key={company} className="flex items-center gap-2 bg-[#f4f6f8] rounded-lg pl-4 pr-3 py-2">
                <p className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#121213]">{company}</p>
                <button
                  type="button"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      companies: current.companies.filter((item) => item !== company),
                    }))
                  }
                  className="flex items-center justify-center size-6 cursor-pointer"
                  aria-label={`${company} 삭제`}
                >
                  <img alt="" src={imgClose} className="size-6" />
                </button>
              </div>
            ))}
            {addingCompany ? (
              <input
                ref={companyInputRef}
                value={companyInput}
                onChange={(event) => setCompanyInput(event.target.value)}
                onBlur={addCompany}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    addCompany();
                  }
                  if (event.key === 'Escape') {
                    setCompanyInput('');
                    setAddingCompany(false);
                  }
                }}
                placeholder="기업명"
                className="h-10 w-[120px] border border-[#e7eaee] rounded-lg px-4 text-[14px] leading-[1.42] tracking-[0.14px] text-[#121213] outline-none"
              />
            ) : (
              <button
                type="button"
                onClick={() => setAddingCompany(true)}
                className="relative overflow-hidden h-10 flex items-center justify-center px-4 rounded-lg border border-[#e7eaee] cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
              >
                <p className="relative font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#121213]">기업 추가</p>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <SectionHeading title="알림 방식" subtext="인사이트 알림을 받을 시점과 방법을 결정해요" />
        <div className="flex gap-7 items-center w-full">
          <div className="flex flex-1 min-w-0 flex-col gap-1">
            <p className="font-bold text-[16px] leading-[1.45] text-[#121213]">앱 푸시 알림</p>
            <p className="text-[14px] leading-[1.42] tracking-[0.14px] text-[#9ca2b1]">새 인사이트가 오면 알림을 보내드려요</p>
          </div>
          <Switch checked={draft.push} onToggle={() => setDraft((current) => ({ ...current, push: !current.push }))} label="앱 푸시 알림" />
        </div>
        <div className="flex gap-7 items-center w-full">
          <div className="flex flex-1 min-w-0 flex-col gap-1">
            <p className="font-bold text-[16px] leading-[1.45] text-[#121213]">이메일로 받기</p>
            <p className="text-[14px] leading-[1.42] tracking-[0.14px] text-[#9ca2b1]">Yunn00@gmail.com으로 함께 보내드려요</p>
          </div>
          <Switch checked={draft.email} onToggle={() => setDraft((current) => ({ ...current, email: !current.email }))} label="이메일로 받기" />
        </div>
      </div>

      <div className="flex gap-5 items-start w-full">
        <button
          type="button"
          onClick={onCancel}
          className="relative overflow-hidden flex-1 flex items-center justify-center px-7 py-3 rounded-xl border border-[#e7eaee] cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
        >
          <p className="relative font-medium text-[16px] leading-[1.45] text-[#121213]">취소</p>
        </button>
        <button
          type="button"
          onClick={() => onSave?.(cloneSettings(draft))}
          className="relative overflow-hidden flex-1 flex items-center justify-center px-7 py-3 rounded-xl border border-[#70d2ff] bg-[#1a75ff] shadow-[inset_0_0_4px_#e7f3ff] cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
        >
          <p className="relative font-bold text-[16px] leading-[1.45] text-white">저장</p>
        </button>
      </div>
    </div>
  );
}
