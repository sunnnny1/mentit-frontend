import { useState } from 'react';
import figma_ba571657_cca6_48a5_aa58_467ac1e324d3_svg from '../../assets/figma/ba571657-cca6-48a5-aa58-467ac1e324d3.svg';
import figma_c11cc4d3_aa70_48e8_a183_5d36c9318492_png from '../../assets/figma/c11cc4d3-aa70-48e8-a183-5d36c9318492.png';
import figma_fd315a38_e73e_406e_bdc3_ef0d1231ce5a_svg from '../../assets/figma/fd315a38-e73e-406e-bdc3-ef0d1231ce5a.svg';
import figma_20870255_5069_4a4b_963f_7d5e3d603d2d_svg from '../../assets/figma/20870255-5069-4a4b-963f-7d5e3d603d2d.svg';
import figma_746b5a21_af12_4144_9847_16f8b457e3c6_svg from '../../assets/figma/746b5a21-af12-4144-9847-16f8b457e3c6.svg';

const imgLogoCircle = figma_ba571657_cca6_48a5_aa58_467ac1e324d3_svg;
const imgSunny = figma_c11cc4d3_aa70_48e8_a183_5d36c9318492_png;
const imgChevronDown = figma_fd315a38_e73e_406e_bdc3_ef0d1231ce5a_svg;
const imgChevronUp = figma_20870255_5069_4a4b_963f_7d5e3d603d2d_svg;
const imgCheck = figma_746b5a21_af12_4144_9847_16f8b457e3c6_svg;

const INTERVIEW_TYPES = ['실무 면접', '임원 면접', 'PT 면접', '직무 기술 면접', '컬쳐핏 면접'];

function FieldLabel({ children }) {
  return (
    <div className="flex gap-1 items-center w-full">
      <p className="font-medium text-base leading-[1.45] text-[#121213] whitespace-nowrap">{children}</p>
      <p className="font-medium text-[14px] leading-[1.429] tracking-[0.203px] text-[#e52222]">*</p>
    </div>
  );
}

function TextField({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-[#e7eaee] rounded-xl px-5 py-4 text-[15px] leading-[1.6] text-[#121213] placeholder:text-[#9ca2b1] outline-none"
      />
    </div>
  );
}

function InterviewTypeDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 items-start w-[334px]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative w-full bg-white border border-[#e7eaee] rounded-xl px-5 py-4 flex items-center gap-2 overflow-hidden cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
      >
        <p className={`relative flex-1 text-left text-base leading-[1.45] whitespace-nowrap ${value ? 'text-[#121213]' : 'text-[#9ca2b1]'}`}>
          {value || '면접 유형'}
        </p>
        <img alt="" src={open ? imgChevronUp : imgChevronDown} className="relative size-6 shrink-0" />
      </button>

      {open && (
        <div className="w-full bg-white border border-[#e7eaee] rounded-[10px] px-4 py-6 flex flex-col gap-2">
          {INTERVIEW_TYPES.map((type) => {
            const selected = value === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => {
                  onChange(type);
                  setOpen(false);
                }}
                className={`relative w-full flex items-center gap-2 px-4 py-3 rounded-xl overflow-hidden cursor-pointer ${
                  selected ? 'bg-[#f9fafb]' : 'bg-white'
                } after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10`}
              >
                <p className="relative flex-1 text-left text-[14px] leading-[1.58] tracking-[0.14px] text-[#121213] whitespace-nowrap">
                  {type}
                </p>
                <span
                  className={`relative flex items-center justify-center size-[18px] rounded-[5px] border-[1.5px] shrink-0 ${
                    selected ? 'bg-[#1a75ff] border-[#1a75ff]' : 'border-[#e7eaee] bg-white'
                  }`}
                >
                  {selected && <img alt="" src={imgCheck} className="size-4" />}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SunnyMentorPick({ onOpenMentorDetail }) {
  return (
    <div
      role="button"
      onClick={() => onOpenMentorDetail?.('Sunny')}
      className="relative flex items-center gap-3 p-6 rounded-2xl shrink-0 w-[364px] border-[1.5px] border-white shadow-[0_0_15px_rgba(0,0,0,0.04),inset_20px_20px_40px_rgba(255,255,255,0.9),inset_-20px_-20px_40px_rgba(255,255,255,0.9)] cursor-pointer"
      style={{ background: 'radial-gradient(circle at 50% 50%, rgba(254,213,213,0.4) 0%, white 70%)' }}
    >
      <img alt="Sunny 멘토" src={imgSunny} className="size-[60px] rounded-full shrink-0 object-cover" />
      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <div className="flex gap-2 items-center">
          <p className="font-bold text-lg leading-[1.5] tracking-[-0.0036px] text-[#121213] whitespace-nowrap">Sunny 멘토</p>
          <div className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
            <div className="absolute inset-0 opacity-10 rounded-lg bg-[#e52222]" />
            <p className="relative text-[10px] tracking-[0.25px] text-[#e52222] whitespace-nowrap">Master Mentor</p>
          </div>
        </div>
        <div className="flex gap-1 text-sm text-[#747886] tracking-[0.14px] whitespace-nowrap">
          <p>UX 디자인</p>
          <p>・</p>
          <p>카카오</p>
          <p>・</p>
          <p>5년차</p>
        </div>
      </div>
    </div>
  );
}

export default function InterviewOnboardingPage({ onBack, onNext, onOpenMentorDetail }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [jobLink, setJobLink] = useState('');

  return (
    <section className="flex-1 min-w-0 min-h-0 h-full flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center px-5 py-10">
        <div className="flex flex-col gap-16 items-start w-full max-w-[814px]">
          <div className="flex flex-col gap-4 items-center w-full">
            <div className="flex gap-2 items-center justify-center">
              <img alt="" src={imgLogoCircle} className="size-9 shrink-0" />
              <p className="font-medium text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213] whitespace-nowrap">
                모의 면접 정보를 입력해주세요
              </p>
            </div>
            <div className="text-center text-[14px] leading-[1.58] tracking-[0.14px] text-[#121213] w-full">
              <p>이곳에서 멘토의 AI 에이전트와 면접 연습을 하고 피드백을 받아볼 수 있어요.</p>
              <p>원하는 멘토를 찾아 모의면접을 시작해보세요!</p>
            </div>
          </div>

          <div className="flex flex-col gap-7 items-start w-full">
            <div className="flex flex-col gap-2 items-start w-full">
              <FieldLabel>모의 면접 이름</FieldLabel>
              <TextField value={name} onChange={setName} placeholder="모의 면접 이름을 입력해주세요" />
            </div>

            <div className="flex flex-col gap-2 items-start w-full">
              <FieldLabel>면접 유형</FieldLabel>
              <InterviewTypeDropdown value={type} onChange={setType} />
            </div>

            <div className="flex flex-col gap-2 items-start w-full">
              <FieldLabel>함께할 AI 멘토</FieldLabel>
              <SunnyMentorPick onOpenMentorDetail={onOpenMentorDetail} />
            </div>

            <div className="flex flex-col gap-2 items-start w-full">
              <FieldLabel>모집 공고 링크</FieldLabel>
              <TextField value={jobLink} onChange={setJobLink} placeholder="링크를 복사해주세요" />
            </div>

            <div className="flex gap-5 items-start w-full">
              <button
                type="button"
                onClick={onBack}
                className="relative flex-1 flex items-center justify-center px-7 py-3 rounded-xl border border-[#e7eaee] bg-white cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:rounded-xl"
              >
                <p className="relative font-medium text-base text-[#121213] whitespace-nowrap">이전</p>
              </button>
              <button
                type="button"
                onClick={onNext}
                className="relative flex-1 flex items-center justify-center px-7 py-3 rounded-xl border border-[#70d2ff] bg-[#1a75ff] shadow-[inset_0_0_4px_#e7f3ff] cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:rounded-xl"
              >
                <p className="relative font-bold text-base text-white whitespace-nowrap">다음</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
