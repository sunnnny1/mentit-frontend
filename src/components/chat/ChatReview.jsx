import { useState } from 'react';

const imgSegmentControl = 'https://www.figma.com/api/mcp/asset/41fe867f-d67f-44f6-9936-91fa6bda6e6d.png';

const REVIEW_GROUPS = [
  {
    label: '멘토링 내용',
    options: ['포트폴리오 개선', '자소서 개선', '취업 전략', '직무 분석', '방향성 설정', '커리어 설계', '실전 대비'],
  },
  {
    label: '멘토링 방식',
    options: ['실무 인사이트 공유', '명확한 피드백', '구체적인 조언', '개선 방향 조언', '커리어 가이드', '객관적인 시선'],
  },
  {
    label: '소통 방식',
    options: ['명확한 설명', '쉬운 이해', '적극적인 소통', '빠른 응답', '친근한 소통'],
  },
];

const INITIAL_SELECTED = ['포트폴리오 개선', '실무 인사이트 공유', '명확한 설명'];
const MAX_SELECTIONS = 4;
const MAX_COMMENT_LENGTH = 2000;

export default function ChatReview() {
  const [selectedOptions, setSelectedOptions] = useState(INITIAL_SELECTED);
  const [comment, setComment] = useState('');

  const toggleOption = (option) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      }
      if (prev.length >= MAX_SELECTIONS) return prev;
      return [...prev, option];
    });
  };

  return (
    <div className="relative z-[1] flex-1 min-w-0 min-h-0 h-full flex flex-col bg-white overflow-hidden">
      <div className="relative shrink-0 px-6 py-7">
        <img alt="" src={imgSegmentControl} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <div className="relative flex flex-col gap-1 items-center justify-center text-center w-full">
          <p className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#121213] w-full">
            Yoonie (최윤희) 멘토와의 채팅 어떠셨나요?
          </p>
          <p className="font-normal text-[12px] leading-[1.35] tracking-[0.3px] text-[#747886] w-full">
            솔직한 리뷰가 다른 취준생에게 큰 도움이 될 수 있어요
            <br />
            리뷰는 닉네임으로 공개돼요
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-16">
        <div className="max-w-[867px] mx-auto w-full flex flex-col gap-[64px]">
          <section className="flex flex-col gap-6 items-start w-full">
            <div className="flex flex-col gap-1 items-start w-full">
              <div className="flex gap-1 items-center">
                <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">어떤 점이 좋았나요?</p>
                <span className="font-medium text-[14px] leading-[1.429] tracking-[0.203px] text-[#e52222]">*</span>
              </div>
              <p className="font-normal text-[14px] leading-[1.42] tracking-[0.14px] text-[#9ca2b1]">
                최대 4개까지 선택할 수 있어요
              </p>
            </div>

            <div className="flex flex-col gap-5 items-start w-full">
              {REVIEW_GROUPS.map((group) => (
                <div key={group.label} className="flex flex-col gap-3 items-start w-full">
                  <p className="font-medium text-[16px] leading-[1.45] text-[#121213]">{group.label}</p>
                  <div className="flex flex-wrap gap-2 items-start">
                    {group.options.map((option) => {
                      const isSelected = selectedOptions.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleOption(option)}
                          className={`relative overflow-hidden px-5 py-2 rounded-[8px] text-[15px] font-medium leading-[1.45] whitespace-nowrap border cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#747886] after:opacity-0 hover:after:opacity-10 after:transition-opacity after:rounded-[8px] ${
                            isSelected
                              ? 'border-[#1a75ff] bg-[rgba(26,117,255,0.05)] text-[#1a75ff]'
                              : 'border-[#e7eaee] text-[#747886] bg-white'
                          }`}
                        >
                          <span className="relative">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-3 items-start w-full">
            <div className="flex flex-col gap-1 items-start w-full">
              <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">추가 코멘트</p>
              <p className="font-normal text-[14px] leading-[1.42] tracking-[0.14px] text-[#9ca2b1]">
                멘토에게 정성스러운 코멘트를 남겨주세요(선택)
              </p>
            </div>
            <div className="relative w-full">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT_LENGTH))}
                maxLength={MAX_COMMENT_LENGTH}
                placeholder="남긴 코멘트는 추후에 수정하거나 삭제할 수 없어요"
                className="w-full min-h-[140px] resize-none border border-[#e7eaee] rounded-[12px] bg-white px-5 py-3 pb-8 text-[15px] leading-[1.6] text-[#121213] placeholder:text-[#9ca2b1] outline-none"
              />
              <p className="absolute right-5 bottom-3 font-normal text-[12px] leading-[1.35] tracking-[0.3px] text-[#747886]">
                {comment.length}/{MAX_COMMENT_LENGTH}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
