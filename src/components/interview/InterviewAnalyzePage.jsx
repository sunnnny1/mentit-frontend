import { useEffect, useState } from 'react';
import ChatProfileBar from '../chat/ChatProfileBar';
import InterviewSubMenu from './InterviewSubMenu';
import figma_c11cc4d3_aa70_48e8_a183_5d36c9318492_png from '../../assets/figma/c11cc4d3-aa70-48e8-a183-5d36c9318492.png';
import figma_8efc9a98_3066_4866_9c40_c9ccd7f4d0c7_svg from '../../assets/figma/8efc9a98-3066-4866-9c40-c9ccd7f4d0c7.svg';
import figma_c643f2a3_c889_49a3_a172_153902530740_svg from '../../assets/figma/c643f2a3-c889-49a3-a172-153902530740.svg';
import figma_4e98b0f4_a655_4e26_b066_94a928da7715_svg from '../../assets/figma/4e98b0f4-a655-4e26-b066-94a928da7715.svg';
import figma_7978d2b2_cf93_4ad6_ba2f_2a81c8a9f41d_svg from '../../assets/figma/7978d2b2-cf93-4ad6-ba2f-2a81c8a9f41d.svg';

const imgSunny = figma_c11cc4d3_aa70_48e8_a183_5d36c9318492_png;
const imgLogoSpin = figma_8efc9a98_3066_4866_9c40_c9ccd7f4d0c7_svg;
const imgCheckDone = figma_c643f2a3_c889_49a3_a172_153902530740_svg;
const imgCheckProgress = figma_4e98b0f4_a655_4e26_b066_94a928da7715_svg;
const imgCheckWait = figma_7978d2b2_cf93_4ad6_ba2f_2a81c8a9f41d_svg;

const ANALYZE_STEPS = [
  { done: '포트폴리오 분석 완료', progress: '포트폴리오 분석중..', wait: '포트폴리오 분석 대기중..' },
  { done: '모집 공고 링크 분석 완료', progress: '모집 공고 링크 분석중..', wait: '모집 공고 링크 대기중..' },
  { done: '면접 질문 생성 분석 완료', progress: '면접 질문 생성 분석중..', wait: '면접 질문 생성 대기중..' },
];

const STEP_MS = 1400;

export default function InterviewAnalyzePage({
  onComplete,
  isSubMenuOpen = false,
  onCloseSubMenu,
  activeMentor = 'Sunny',
  onSelectMentor,
}) {
  const [completedCount, setCompletedCount] = useState(1);

  useEffect(() => {
    if (completedCount >= ANALYZE_STEPS.length) {
      const doneTimer = setTimeout(() => onComplete?.(), 700);
      return () => clearTimeout(doneTimer);
    }
    const timer = setTimeout(() => setCompletedCount((count) => count + 1), STEP_MS);
    return () => clearTimeout(timer);
  }, [completedCount, onComplete]);

  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && (
        <InterviewSubMenu onClose={onCloseSubMenu} activeMentor={activeMentor} onSelectMentor={onSelectMentor} />
      )}
    <section className="flex-1 min-w-0 min-h-0 h-full flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
      <div className="border-b border-[#e7eaee]">
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

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-5">
        <div className="flex flex-col gap-4 items-center w-full max-w-[1133px]">
          <div className="flex flex-col gap-3 items-center">
            <img alt="" src={imgLogoSpin} className="size-8 shrink-0 animate-spin" />
            <p className="font-medium text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213] whitespace-nowrap">
              윤영님에게 맞는 면접 질문을 만드는 중이에요
            </p>
          </div>
          <div className="text-center text-[14px] leading-[1.58] tracking-[0.14px] text-[#747886] w-full">
            <p>입력해주신 정보를 바탕으로 윤영님에게 맞는 면접 질문을 준비하고 있어요.</p>
            <p>정보의 양에 따라 최대 3분 정도 소요될 수 있어요.</p>
          </div>
          <div className="flex flex-col gap-0.5 items-start">
            {ANALYZE_STEPS.map((step, index) => {
              const status =
                index < completedCount ? 'done' : index === completedCount ? 'progress' : 'wait';
              const label = step[status];
              const icon = status === 'done' ? imgCheckDone : status === 'progress' ? imgCheckProgress : imgCheckWait;
              const color =
                status === 'done' ? 'text-[#121213]' : status === 'progress' ? 'text-[#747886]' : 'text-[#9ca2b1]';
              return (
                <div key={step.done} className="flex gap-1 items-center w-full">
                  <img alt="" src={icon} className="size-6 shrink-0" />
                  <p className={`font-medium text-[13px] leading-[1.4] tracking-[0.26px] whitespace-nowrap ${color}`}>
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
