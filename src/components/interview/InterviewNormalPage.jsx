import ChatProfileBar from '../chat/ChatProfileBar';
import InterviewSubMenu from './InterviewSubMenu';

const imgSunny = 'https://www.figma.com/api/mcp/asset/c11cc4d3-aa70-48e8-a183-5d36c9318492.png';
const imgCharacter = 'https://www.figma.com/api/mcp/asset/ceef9e7c-3912-4cc0-ba9c-dbf2d463f3e3.png';

export default function InterviewNormalPage({ isSubMenuOpen = false, onCloseSubMenu }) {
  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && <InterviewSubMenu onClose={onCloseSubMenu} activeMentor="Sunny" />}

      <section className="flex-1 min-w-0 min-h-0 h-full flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
        <div className="border-b border-transparent">
          <ChatProfileBar
            mode="agent"
            displayName="Sunny"
            role="UX 디자이너 ・ 카카오 ・ 5년차"
            badgeLabel="Master Mentor"
            badgeColor="#e52222"
            profileAvatar={imgSunny}
            supportsMentorReview={false}
          />
        </div>

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div
            className={`relative shrink-0 h-full overflow-hidden border-r border-[#e7eaee] ${
              isSubMenuOpen ? 'w-[533px] max-w-[50%]' : 'w-[710px] max-w-[60%]'
            }`}
          >
            <img
              alt="Sunny"
              src={imgCharacter}
              className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2"
              style={{
                WebkitMaskImage:
                  'linear-gradient(180deg, #000 0%, #000 58%, rgba(0,0,0,0.55) 78%, transparent 100%)',
                maskImage:
                  'linear-gradient(180deg, #000 0%, #000 58%, rgba(0,0,0,0.55) 78%, transparent 100%)',
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[46%]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 28%, rgba(255,255,255,0.62) 62%, rgba(255,255,255,0.92) 84%, #ffffff 100%)',
              }}
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col items-center justify-center px-5 py-7">
            <div className="flex flex-col gap-10 items-center w-full max-w-[463px]">
              <div className="flex flex-col gap-4 items-center text-center w-full">
                <p className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213] w-full">
                  카카오 UX 디자이너 직무 실전 면접
                </p>
                <div className="text-[14px] leading-[1.58] tracking-[0.14px] text-[#747886] w-full">
                  <p>Sunny 멘토의 AI 에이전트와 모의 면접이 시작됩니다.</p>
                  <p>기록된 답변 내용을 바탕으로 피드백을 제공합니다.</p>
                  <p>예상 소요 시간은 20분이며, 면접 시간이 답변에 따라 변동될 수 있습니다.</p>
                </div>
              </div>
              <button
                type="button"
                className="relative flex items-center justify-center px-7 py-3 rounded-xl border border-[#70d2ff] bg-[#1a75ff] shadow-[inset_0_0_4px_0_#e7f3ff] overflow-hidden cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
              >
                <span className="relative font-bold text-base leading-[1.45] text-white whitespace-nowrap">
                  모의면접 시작하기
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
