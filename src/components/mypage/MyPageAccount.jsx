import { useRef, useState } from 'react';
import BoardJobDropdown from '../board/BoardJobDropdown';
import imgAvatarDefault from '../../assets/figma/92eaa1fc-4224-491d-bfc9-1424fcc7641d.png';

function SectionHeading({ title, subtext }) {
  return (
    <div className="flex flex-col gap-1 items-start w-full">
      <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">{title}</p>
      <p className="text-[14px] leading-[1.42] tracking-[0.14px] text-[#9ca2b1] w-full">{subtext}</p>
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
        <p className="font-bold text-[16px] leading-[1.45] text-[#121213]">{title}</p>
        <p className="text-[14px] leading-[1.42] tracking-[0.14px] text-[#9ca2b1] w-full">{subtext}</p>
      </div>
      <Switch checked={checked} onToggle={onToggle} label={title} />
    </div>
  );
}

function ProfileSettings() {
  const fileInputRef = useRef(null);
  const [nickname, setNickname] = useState('Yunn00');
  const [avatarSrc, setAvatarSrc] = useState(imgAvatarDefault);

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-6 w-full">
        <SectionHeading title="닉네임" subtext="닉네임은 최대 10자까지 가능해요" />
        <div className="flex items-center w-full bg-white border border-[#e7eaee] rounded-xl px-5 py-4">
          <input
            type="text"
            value={nickname}
            onChange={(event) => setNickname(event.target.value.slice(0, 10))}
            className="flex-1 min-h-6 text-[15px] leading-[1.6] text-[#121213] outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <SectionHeading title="프로필 설정" subtext="멘팃에서 사용할 프로필을 설정해주세요" />
        <div className="flex flex-col gap-3 items-center w-[157px]">
          <div className="relative size-[60px] shrink-0 overflow-hidden rounded-full">
            <img alt="" className="absolute inset-0 size-full object-cover" src={avatarSrc} />
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative overflow-hidden border border-[#e7eaee] rounded-xl px-4 py-2 w-full cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
          >
            <p className="relative font-medium text-[16px] leading-[1.45] text-[#121213]">프로필 변경</p>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) setAvatarSrc(URL.createObjectURL(file));
              event.target.value = '';
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <SectionHeading title="희망 직무" subtext="멘팃에게 제공받을 희망 직무를 선택해주세요" />
        <BoardJobDropdown
          className="relative w-[300px]"
          initialGroup="디자인"
          initialRoles={['프로덕트 디자인', 'UX 디자인']}
        />
      </div>
    </div>
  );
}

function NotificationSettings() {
  const [commentAlert, setCommentAlert] = useState(false);
  const [aiAlert, setAiAlert] = useState(true);
  const [mentorAlert, setMentorAlert] = useState(true);

  return (
    <div className="flex flex-col gap-6 w-full">
      <SectionHeading title="푸시 알림" subtext="알림을 받을 시점과 방법을 결정해요" />
      <NotificationOption
        title="댓글&공유"
        subtext="내가 작성한 게시판 글 공유와 댓글에 대한 푸시 알림을 받아요."
        checked={commentAlert}
        onToggle={() => setCommentAlert((value) => !value)}
      />
      <NotificationOption
        title="AI 에이전트 알림"
        subtext="AI 에이전트의 채팅, 피드백이 오면 푸시 알림을 받아요."
        checked={aiAlert}
        onToggle={() => setAiAlert((value) => !value)}
      />
      <NotificationOption
        title="현직자 알림"
        subtext="현직자의 채팅, 피드백이 오면 푸시 알림을 받아요."
        checked={mentorAlert}
        onToggle={() => setMentorAlert((value) => !value)}
      />
    </div>
  );
}

export default function MyPageAccount({ tab = 'profile' }) {
  return <div className="pt-10 pb-16 w-full">{tab === 'notification' ? <NotificationSettings /> : <ProfileSettings />}</div>;
}
