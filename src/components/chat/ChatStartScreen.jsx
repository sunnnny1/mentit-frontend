import figma_cca1b162_9b6b_4353_9e9a_311e84863eb1_svg from '../../assets/figma/cca1b162-9b6b-4353-9e9a-311e84863eb1.svg';
import figma_38789304_3ec8_46e0_a0c1_d358fc10868f_svg from '../../assets/figma/38789304-3ec8-46e0-a0c1-d358fc10868f.svg';
import imgAiStar from '../../assets/icons/ai-active.svg';

const imgLogoCircle = figma_cca1b162_9b6b_4353_9e9a_311e84863eb1_svg;
const imgPersonPlus = figma_38789304_3ec8_46e0_a0c1_d358fc10868f_svg;

function StartCard({ icon, title, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-fit bg-white border border-[#e7eaee] rounded-xl px-5 py-4 flex flex-col gap-4 items-start justify-center text-left cursor-pointer overflow-hidden after:pointer-events-none after:absolute after:inset-[-1px] after:bg-[#121213] after:opacity-0 hover:after:opacity-10"
    >
      <img alt="" src={icon} className="relative size-6" />
      <div className="relative flex flex-col gap-1 items-start">
        <p className="font-medium text-[16px] leading-[1.45] text-[#121213] whitespace-nowrap">{title}</p>
        <p className="font-normal text-[15px] leading-[1.45] text-[#9ca2b1] whitespace-nowrap">{subtitle}</p>
      </div>
    </button>
  );
}

export default function ChatStartScreen({
  onOpenMentorExplore,
  onOpenMentorSearch,
  greeting = '윤영님, 멘토와 대화를 시작해볼까요?',
  description = (
    <>
      이곳에서 멘토와 대화를 나누고, 포트폴리오와 자소서에 대한 피드백을 받을 수 있어요.
      <br />
      원하는 멘토를 찾아 대화를 시작해보세요!
    </>
  ),
}) {
  return (
    <section className="flex-1 min-w-0 min-h-0 h-full flex flex-col items-center justify-center rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] px-5">
      <div className="flex flex-col gap-10 items-center justify-center w-full">
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex flex-col items-center px-5 w-full">
            <div className="flex gap-2 items-center">
              <img alt="" src={imgLogoCircle} className="size-9 shrink-0" />
              <p className="font-medium text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213] whitespace-nowrap">
                {greeting}
              </p>
            </div>
          </div>
          <p className="w-full text-center text-[14px] leading-[1.58] tracking-[0.14px] text-[#121213]">
            {description}
          </p>
        </div>
        <div className="flex gap-5 items-start justify-center w-full">
          <StartCard
            icon={imgPersonPlus}
            title="멘토 탐색"
            subtitle="멘토 탐색 페이지에서 멘토 찾아보기"
            onClick={onOpenMentorExplore}
          />
          <StartCard
            icon={imgAiStar}
            title="멘토 추천"
            subtitle="Mentit AI 에게 멘토 추천 받아보기"
            onClick={onOpenMentorSearch}
          />
        </div>
      </div>
    </section>
  );
}
