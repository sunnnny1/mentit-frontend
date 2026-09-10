import { useState } from 'react';

const imgSend = 'https://www.figma.com/api/mcp/asset/70a5b9f2-c5bb-45a9-9836-1ccc8ad917e2.svg';
const imgSegmentControl = 'https://www.figma.com/api/mcp/asset/41fe867f-d67f-44f6-9936-91fa6bda6e6d.png';

const MENTOR_CONVERSATION = [
  {
    role: 'user',
    texts: [
      '안녕하세요! 프로덕트 디자이너에 지원 희망하는 이윤영입니다. AI 에이전트랑 얘기하다가 궁금한 게 더 생겨서 연락드렸습니다!',
    ],
  },
  {
    role: 'mentor',
    texts: ['안녕하세요~ 반가워요ㅎㅎ \nAI 에이전트 대화 요약 봤어요. 질문 해주셔도 됩니다.'],
  },
  {
    role: 'user',
    texts: [
      '아직 취준생이지만, 프로덕트 디자이너로 취업하게 된다면 실무에서 정확히 어떤 일을 하는지, 어떤 점이 가장 예상과 달랐는지 궁금합니다.',
    ],
  },
  {
    role: 'mentor',
    texts: [
      '실무는 크게 세 가지예요. 기획팀이 던진 문제를 화면으로 풀어내는 것, 개발팀이랑 붙어서 실제 구현 가능한 선까지 다듬는 것, 배포하고 나서 데이터 보고 다시 고치는 것. 근데 막상 화면 그리는 시간은 생각보다 적고, 회의랑 논의하는 시간이 훨씬 많아요.',
      '가장 예상과 달랐던 건, 취준생 때는 "좋은 디자인 = 심사에서 좋은 평가받는 디자인"이라고 생각했는데, 입사하고 나니까 "좋은 디자인 = 숫자로 증명되는 디자인"이더라고요.',
      '작년에 당근 채팅 목록 화면을 개편했는데, 제 눈엔 훨씬 깔끔했거든요. 근데 배포 일주일 후 데이터 보니까 특정 사용자군 채팅 응답률이 떨어졌어요. 알고 보니 제가 정리한다고 없앤 요소 하나가 사실 "이 사람 지금 답장 가능"이라는 신호였더라고요. 결국 다시 살려서 재배포했어요.',
      '그때 느낀 게, 실무에서는 "예쁘다/논리적이다"보다 "이 결정이 숫자로 어떤 결과를 냈는지 설명할 수 있는가"가 진짜 평가 기준이라는 거예요. 포폴 만들 때 그 감각을 미리 연습해두면 훨씬 도움될 거예요.',
    ],
  },
  {
    role: 'user',
    texts: [
      '헉! 경험 공유 너무 감사합니다! \n저는 그냥 깔끔하면 좋은 디자인이라고만 생각했는데, 그 안에 사용자한테 필요한 정보가 숨어있을 수 있다는 건 전혀 생각 못 했어요..',
      '그럼 그런 요소는 디자인하실 때 어떻게 미리 캐치하세요? "이건 없애도 되는 건지 아닌지" 판단하는 기준 같은 게 따로 있으세요?',
    ],
  },
  {
    role: 'mentor',
    texts: [
      '좋은 질문이네요! 음.. 뭔가 대단한 기준이라기보다는, 그 사건 이후로 생긴 습관에 가깝긴한데.. 화면 정리할 때 요소 하나를 지우기 전에, 그게 "언제, 왜 생겼는지"부터 찾아봐요. 기획 문서든 이전 리서치든 히스토리를 안 보고 판단하면 이전처럼 실수하게 되더라고요.',
      '그리고 확신이 안 서는 요소는 바로 빼지 않고 로그부터 봐요. "이 요소를 실제로 누르거나 보는 사용자가 얼마나 되는지" 먼저 확인하고, 사용률이 낮아도 특정 유저군한테 유독 중요한 요소는 아닌지 나눠서 보는거죠.',
    ],
  },
  {
    role: 'user',
    texts: [
      '완전 실용적이네요!! "왜 있었지" "누가 얼마나 쓰지" 이 두 가지면 저도 포폴 만들 때 뭘 넣고 뺄지 헷갈릴 때 바로 써볼 수 있을 것 같아요. ',
      '자세한 설명 정말 감사합니다! 덕분에 프로덕트 디자이너 직무에 더 열정이 생긴 것 같습니다. 추후 궁금한게 생긴다면 또 질문해도 괜찮을까요??',
    ],
  },
  {
    role: 'mentor',
    texts: ['그럼요, 언제든 편하게 물어보세요 :) 취준 화이팅해요~'],
  },
];

export default function ChatMentorThread({ onBackToAgent }) {
  const [draft, setDraft] = useState('');

  return (
    <div className="relative z-[1] flex-1 min-w-0 min-h-0 h-full flex flex-col bg-white">
      <div className="shrink-0 flex justify-start px-5 py-5">
        <div className="flex items-center p-0.5 rounded-lg bg-[#f4f6f8]">
          <button
            type="button"
            onClick={onBackToAgent}
            className="flex items-center justify-center px-7 py-1 rounded-lg text-[13px] leading-[1.4] font-medium tracking-[0.26px] cursor-pointer text-[#9ca2b1]"
          >
            AI Agent 채팅
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-7 py-1 rounded-lg text-[13px] leading-[1.4] font-medium tracking-[0.26px] bg-white text-[#121213] shadow-[0_0_8px_rgba(18,18,19,0.04)]"
          >
            멘토 채팅
          </button>
        </div>
      </div>

      <div className="relative shrink-0 px-6 py-7">
        <img alt="" src={imgSegmentControl} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <div className="relative flex flex-col gap-1 items-center justify-center text-center w-full">
          <p className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#121213] w-full">
            실제 현직자 Yoonie, 최윤희 멘토와 직접 대화할 수 있어요!
          </p>
          <p className="font-normal text-[12px] leading-[1.35] tracking-[0.3px] text-[#747886] w-full">
            Yoonie 멘토는 평일 오후 8시 이후, 주말에 답변이 가능해요.
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-4 flex flex-col gap-10 max-w-[957px] mx-auto w-full">
        {MENTOR_CONVERSATION.map((group, index) => {
          if (group.role === 'user') {
            return (
              <div key={index} className="flex flex-col gap-2.5 items-end w-full">
                {group.texts.map((text) => (
                  <div key={text} className="bg-[#f9fafb] rounded-[12px] p-[12px] max-w-[513px]">
                    <p className="font-normal text-[15px] leading-[1.6] text-[#121213] whitespace-pre-wrap">{text}</p>
                  </div>
                ))}
              </div>
            );
          }

          return (
            <div key={index} className="flex flex-col gap-4 items-start w-full max-w-[513px]">
              {group.texts.map((text, textIndex) => (
                <div key={text} className="flex flex-col gap-2 items-start w-full">
                  {textIndex === 0 && (
                    <p className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#121213]">
                      Yoonie (최윤희)
                    </p>
                  )}
                  <div className="bg-[#f7fbff] rounded-[12px] p-[12px] max-w-[513px] w-full">
                    <p className="font-normal text-[15px] leading-[1.6] text-[#121213] whitespace-pre-wrap">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <form
        className="px-5 py-4 shrink-0"
        onSubmit={(e) => {
          e.preventDefault();
          setDraft('');
        }}
      >
        <div className="relative flex items-center gap-2 px-5 py-3 rounded-xl border border-[#e7eaee] bg-[rgba(255,255,255,0.7)] shadow-[inset_4px_4px_12px_0_rgba(255,255,255,0.5)] max-w-[957px] mx-auto w-full">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="메세지를 입력하세요"
            className="flex-1 min-w-0 bg-transparent outline-none text-[15px] leading-[1.6] text-[#121213] placeholder:text-[#9ca2b1]"
          />
          <button
            type="submit"
            className="relative flex items-center justify-center px-5 py-2 rounded-full border border-[#70d2ff] bg-[#1a75ff] overflow-hidden shrink-0 cursor-pointer shadow-[inset_0_0_4px_0_#e7f3ff]"
            aria-label="전송"
          >
            <img alt="" src={imgSend} className="relative size-6" />
          </button>
        </div>
      </form>
    </div>
  );
}
