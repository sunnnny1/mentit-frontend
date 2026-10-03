import { useEffect, useState } from 'react';
import imgLogoSpin from '../../assets/figma/8efc9a98-3066-4866-9c40-c9ccd7f4d0c7.svg';
import imgCheckDone from '../../assets/figma/c643f2a3-c889-49a3-a172-153902530740.svg';
import imgCheckProgress from '../../assets/figma/4e98b0f4-a655-4e26-b066-94a928da7715.svg';
import imgCheckWait from '../../assets/figma/7978d2b2-cf93-4ad6-ba2f-2a81c8a9f41d.svg';

const STEP_MS = 1400;

const PORTFOLIO_STEPS = [
  { done: '포트폴리오 분석 완료', progress: '포트폴리오 분석중..', wait: '포트폴리오 분석중..' },
  { done: '모집 공고 링크 분석 완료', progress: '모집 공고 링크 분석중..', wait: '모집 공고 링크 분석중..' },
  { done: '맞춤 피드백 작성 완료', progress: '맞춤 피드백 작성중..', wait: '맞춤 피드백 작성중..' },
];

const RESUME_STEPS = [
  { done: '자기소개서 분석 완료', progress: '자기소개서 분석중..', wait: '자기소개서 분석중..' },
  { done: '모집 공고 링크 분석 완료', progress: '모집 공고 링크 분석중..', wait: '모집 공고 링크 분석중..' },
  { done: '맞춤 피드백 작성 완료', progress: '맞춤 피드백 작성중..', wait: '맞춤 피드백 작성중..' },
];

export default function ChatFeedbackAnalyze({ documentKind = 'portfolio', onComplete }) {
  const isResume = documentKind === 'resume';
  const steps = isResume ? RESUME_STEPS : PORTFOLIO_STEPS;
  const [completedCount, setCompletedCount] = useState(1);

  useEffect(() => {
    if (completedCount >= steps.length) {
      const doneTimer = setTimeout(() => onComplete?.(), 700);
      return () => clearTimeout(doneTimer);
    }
    const timer = setTimeout(() => setCompletedCount((count) => count + 1), STEP_MS);
    return () => clearTimeout(timer);
  }, [completedCount, onComplete, steps.length]);

  return (
    <div className="flex-1 min-w-0 min-h-0 flex flex-col items-center justify-center px-5">
      <div className="flex w-full max-w-[1133px] flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-3">
          <img alt="" src={imgLogoSpin} className="size-8 shrink-0 animate-spin" />
          <p className="font-medium text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213] whitespace-nowrap">
            {isResume ? '자기소개서 피드백을 작성하고 있어요' : '포트폴리오 피드백을 작성하고 있어요'}
          </p>
        </div>
        <div className="w-full text-center text-[14px] leading-[1.58] tracking-[0.14px] text-[#747886]">
          <p>입력해주신 정보와 멘토의 데이터를 바탕으로 꼼꼼하게 분석하고 있어요</p>
          <p>정보의 양에 따라 최대 3분 정도 소요될 수 있어요</p>
        </div>
        <div className="flex flex-col items-start gap-0.5">
          {steps.map((step, index) => {
            const status = index < completedCount ? 'done' : index === completedCount ? 'progress' : 'wait';
            const icon = status === 'done' ? imgCheckDone : status === 'progress' ? imgCheckProgress : imgCheckWait;
            const color =
              status === 'done' ? 'text-[#121213]' : status === 'progress' ? 'text-[#747886]' : 'text-[#9ca2b1]';
            return (
              <div key={step.done} className="flex w-full items-center gap-1">
                <img alt="" src={icon} className="size-6 shrink-0" />
                <p className={`font-medium text-[13px] leading-[1.4] tracking-[0.26px] whitespace-nowrap ${color}`}>
                  {step[status]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
