import { useEffect, useRef, useState } from 'react';

const imgAvatar = 'https://www.figma.com/api/mcp/asset/9a42d99c-7fd8-4c37-8461-0f74801502b3.png';
const imgChevronDown = 'https://www.figma.com/api/mcp/asset/8fd5a327-77c9-49d8-9a91-348e41bdc898.svg';

const JOB_GROUPS = ['개발', '경영・비즈니스', '마케팅・광고', '디자인', '게임 제작', '미디어'];
const JOB_ROLES = ['그래픽 디자인', '게임 디자인', '프로덕트 디자인', 'UX 디자인', '제품 디자인', '영상・모션 디자인'];

function SectionHeading({ title, subtext, required = false }) {
  return (
    <div className="flex flex-col gap-1 items-start w-full">
      <div className="flex gap-1 items-center">
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">{title}</p>
        {required && <span className="text-[14px] leading-[1.429] tracking-[0.203px] text-[#e52222]">*</span>}
      </div>
      <p className="text-[14px] leading-[1.42] tracking-[0.14px] text-[#9ca2b1] w-full">{subtext}</p>
    </div>
  );
}

function CheckRow({ label, checked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative overflow-hidden flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl bg-white cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:transition-opacity"
    >
      <span className="relative font-normal text-[14px] leading-[1.58] tracking-[0.14px] text-[#121213]">{label}</span>
      <span
        className={`relative size-[18px] rounded-[5px] border-[1.5px] shrink-0 ${
          checked ? 'bg-[#1a75ff] border-[#1a75ff]' : 'border-[#e7eaee] bg-white'
        }`}
      />
    </button>
  );
}

function JobDropdown({ groups, setGroups, roles, setRoles }) {
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

  const triggerLabel =
    roles.length === 0
      ? '희망 직무를 선택해주세요'
      : roles.length === 1
        ? roles[0]
        : `${roles[0]} 외 ${roles.length - 1}개`;

  const toggle = (list, setList, value) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  return (
    <div ref={rootRef} className="relative w-[300px]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative overflow-hidden bg-white border border-[#e7eaee] rounded-xl w-[300px] px-5 py-4 flex items-center gap-2 cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:transition-opacity"
        aria-expanded={open}
      >
        <span className="relative flex-1 text-left font-normal text-[16px] leading-[1.45] text-[#121213]">{triggerLabel}</span>
        <img alt="" src={imgChevronDown} className={`relative size-6 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-20 mt-2 flex gap-1 items-start">
          <div className="bg-white border border-[#e7eaee] rounded-[10px] w-[300px] px-4 py-6 flex flex-col gap-4 shadow-[0_0_8px_rgba(18,18,19,0.04)]">
            <p className="px-3 font-bold text-[16px] leading-[1.45] text-[#121213]">직군</p>
            <div className="flex flex-col gap-2">
              {JOB_GROUPS.map((label) => (
                <CheckRow
                  key={label}
                  label={label}
                  checked={groups.includes(label)}
                  onToggle={() => toggle(groups, setGroups, label)}
                />
              ))}
            </div>
          </div>
          <div className="bg-white border border-[#e7eaee] rounded-[10px] w-[300px] px-4 py-6 flex flex-col gap-4 shadow-[0_0_8px_rgba(18,18,19,0.04)]">
            <p className="px-3 font-bold text-[16px] leading-[1.45] text-[#121213]">직무</p>
            <div className="flex flex-col gap-2">
              {JOB_ROLES.map((label) => (
                <CheckRow
                  key={label}
                  label={label}
                  checked={roles.includes(label)}
                  onToggle={() => toggle(roles, setRoles, label)}
                />
              ))}
            </div>
          </div>
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

function NotificationOption({ title, subtext, checked, onToggle }) {
  return (
    <div className="flex gap-7 items-center w-full">
      <div className="flex flex-1 min-w-0 flex-col gap-1 items-start">
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">{title}</p>
        <p className="flex-1 text-[14px] leading-[1.42] tracking-[0.14px] text-[#9ca2b1] w-full">{subtext}</p>
      </div>
      <Switch checked={checked} onToggle={onToggle} label={title} />
    </div>
  );
}

export default function MyPageProfileEdit({ onSave }) {
  const [nickname, setNickname] = useState('Yunn00');
  const [groups, setGroups] = useState(['디자인']);
  const [roles, setRoles] = useState(['프로덕트 디자인', 'UX 디자인']);
  const [commentAlert, setCommentAlert] = useState(false);
  const [aiAlert, setAiAlert] = useState(true);
  const [mentorAlert, setMentorAlert] = useState(true);

  return (
    <section className="flex-1 min-w-0 min-h-0 rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-y-auto">
      <div className="max-w-[1311px] mx-auto flex gap-[88px] items-start pl-[69px] pr-[89px] pb-16">
        <div className="flex-1 min-w-0 flex flex-col gap-10 pt-16">
          <div className="flex flex-col gap-10 w-full">
            <div className="flex flex-col gap-4 w-full">
              <p className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213]">내 정보</p>
              <div className="h-px bg-[#e7eaee] w-full" />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <SectionHeading title="닉네임" subtext="닉네임은 최대 10자까지 가능해요" />
              <div className="flex items-center w-full bg-white border border-[#e7eaee] rounded-xl px-5 py-4">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value.slice(0, 10))}
                  className="flex-1 text-[15px] leading-[1.6] text-[#121213] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 w-full">
            <div className="flex flex-col gap-4 w-full">
              <p className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213]">프로필</p>
              <div className="h-px bg-[#e7eaee] w-full" />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <SectionHeading title="프로필 설정" subtext="멘팃에서 사용할 프로필을 설정해주세요" />
              <div className="flex flex-col gap-3 items-center w-[157px]">
                <div className="relative size-[60px] shrink-0">
                  <img alt="" className="absolute inset-0 size-full object-cover rounded-full" src={imgAvatar} />
                </div>
                <button type="button" className="border border-[#e7eaee] rounded-xl px-4 py-2 w-full cursor-pointer">
                  <p className="font-medium text-[16px] leading-[1.45] text-[#121213]">프로필 변경</p>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 w-full">
            <div className="flex flex-col gap-4 w-full">
              <p className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213]">직무 설정</p>
              <div className="h-px bg-[#e7eaee] w-full" />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <SectionHeading title="희망 직무" subtext="멘팃에게 제공받을 희망 직무를 선택해주세요" />
              <JobDropdown groups={groups} setGroups={setGroups} roles={roles} setRoles={setRoles} />
            </div>
          </div>

          <div className="flex flex-col gap-10 w-full">
            <div className="flex flex-col gap-4 w-full">
              <p className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213]">알림</p>
              <div className="h-px bg-[#e7eaee] w-full" />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <SectionHeading title="푸시 알림" subtext="알림을 받을 시점과 방법을 결정해요" />
              <NotificationOption
                title="댓글&공유"
                subtext="내가 작성한 게시판 글 공유와 댓글에 대한 푸시 알림을 받아요."
                checked={commentAlert}
                onToggle={() => setCommentAlert((v) => !v)}
              />
              <NotificationOption
                title="AI 에이전트 알림"
                subtext="AI 에이전트의 채팅, 피드백이 오면 푸시 알림을 받아요."
                checked={aiAlert}
                onToggle={() => setAiAlert((v) => !v)}
              />
              <NotificationOption
                title="현직자 알림"
                subtext="현직자의 채팅, 피드백이 오면 푸시 알림을 받아요."
                checked={mentorAlert}
                onToggle={() => setMentorAlert((v) => !v)}
              />
            </div>
          </div>
        </div>

        <div className="w-[335px] shrink-0 sticky top-16 mt-16">
          <div className="bg-white border border-[#f4f6f8] shadow-[0_0_4px_rgba(18,18,19,0.04)] rounded-2xl p-6 flex flex-col gap-5 w-full">
            <div className="flex gap-3 items-center w-full">
              <div className="relative size-[60px] shrink-0">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgAvatar} />
              </div>
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex gap-2 items-center">
                  <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] whitespace-nowrap">이윤영(Yunn00)</p>
                  <span className="flex items-center justify-center px-2 py-1 rounded-lg bg-[#1a75ff]/10 text-[10px] tracking-[0.25px] text-[#1a75ff]">멘티</span>
                </div>
                <div className="flex gap-1 items-start">
                  <span className="flex items-center justify-center px-2 py-1 rounded-md bg-[#f4f6f8] text-[10px] tracking-[0.25px] text-[#747886]">프로덕트 디자인</span>
                  <span className="flex items-center justify-center px-2 py-1 rounded-md bg-[#f4f6f8] text-[10px] tracking-[0.25px] text-[#747886]">UX 디자인</span>
                </div>
              </div>
            </div>
            <div className="h-px bg-[#e7eaee] w-full" />
            <button
              type="button"
              onClick={onSave}
              className="relative overflow-hidden flex items-center justify-center px-7 py-3 rounded-xl w-full cursor-pointer border border-[#70d2ff] bg-[#1a75ff] shadow-[inset_0_0_4px_rgba(231,243,255,1)]"
            >
              <p className="font-bold text-[16px] leading-[1.45] text-white">저장하기</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
