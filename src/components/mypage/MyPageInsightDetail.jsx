import imgHero from '../../assets/figma/bb78de56-a639-4db9-b0e3-696dc3994c33.png';
import imgChevronLeft from '../../assets/figma/c25d4b68-8802-4c60-8fb6-a6c20b14fba3.svg';
import imgChevronRight from '../../assets/icons/chevron-right.svg';

const REFERENCES = [
  { label: 'Figma - 2026 AI Report', href: 'https://www.figma.com/ko-kr/blog/2026-ai-report/' },
  { label: 'Figma - State of the Designer 2026', href: 'https://www.figma.com/ko-kr/blog/state-of-the-designer-2026/' },
];

export default function MyPageInsightDetail({ onPrev, hasPrev = true, hasNext = false, onNext }) {
  return (
    <section className="flex-1 min-w-0 min-h-0 rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-y-auto">
      <div className="max-w-[819px] mx-auto py-16 px-5 flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-10 items-center w-full">
          <div className="flex flex-col gap-6 items-start w-full">
            <h1 className="font-semibold text-[25px] leading-[1.4] tracking-[-0.5px] text-[#121213] w-full">
              AI가 디자인을 대신하는 시대, 프로덕트 디자이너에게 더 중요해진 것
            </h1>
            <div className="flex gap-6 items-center w-full">
              <div className="flex flex-1 gap-2 items-center min-w-0">
                <span className="bg-[#f4f6f8] px-2 py-1 rounded-lg text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#747886]">
                  트렌드
                </span>
                <span className="bg-[#f4f6f8] px-2 py-1 rounded-lg text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#747886]">
                  프로덕트 디자인
                </span>
              </div>
              <p className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886] whitespace-nowrap">
                2026년 08월 14일
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-10 items-start w-full">
            <div className="flex flex-col gap-3 items-start w-full">
              <div className="relative w-full aspect-[779/437] overflow-hidden rounded-2xl">
                <img alt="" src={imgHero} className="absolute inset-0 size-full object-cover" />
              </div>
              <p className="text-[13px] font-normal leading-[1.4] tracking-[0.26px] text-[#9ca2b1]">
                이미지 출처: Figma - State of the Designer 2026
              </p>
            </div>

            <div className="flex flex-col gap-6 w-full text-[15px] font-normal leading-[1.6] text-[#121213]">
              <p>
                AI를 활용하면 화면 구성부터 UX 라이팅, 프로토타입까지 이전보다 훨씬 빠르게 만들 수 있습니다. 그렇다면 AI가
                디자인을 대신하는 시대에 프로덕트 디자이너에게 필요한 역량은 무엇일까요?
              </p>
              <p>
                최근 프로덕트 디자인에서는 AI를 활용해 디자인 결과물을 빠르게 만들어내는 것뿐만 아니라, 어떤 문제를 해결할
                것인지 정의하고 그 해결 방향을 판단하는 역할이 더욱 중요해지고 있습니다.
              </p>
              <p>
                Figma의 2026 AI Report에 따르면 응답자의 90%가 AI 시대에도 디자인이 이전보다 중요하거나 동일하게 중요하다고
                답했습니다. AI가 디자인 과정의 일부를 자동화하면서 디자이너의 역할이 사라지는 것이 아니라, 오히려 반복적인
                작업에서 벗어나 문제 정의, 의사결정, 사용자 이해와 같은 영역에 더 집중할 수 있게 될 가능성을 보여줍니다.
              </p>
              <p>
                예를 들어 AI에게 “회원가입 화면을 만들어줘”라고 요청하면 여러 가지 화면을 빠르게 만들어낼 수 있습니다. 하지만
                어떤 정보가 정말 필요한지, 회원가입 과정에서 사용자가 이탈하는 이유는 무엇인지, 가입 전환율과 사용자 경험
                사이에서 어떤 선택을 해야 하는지는 AI가 단순히 화면을 생성한다고 해결되는 문제가 아닙니다.
              </p>
              <p>
                프로덕트 디자이너는 이러한 과정에서 다양한 선택지를 비교하고 사용자 니즈와 비즈니스 목표, 기술적 제약을 함께
                고려해 하나의 방향을 결정해야 합니다. 그래서 앞으로의 포트폴리오에서도 단순히 완성된 UI를 보여주는 것만으로는
                부족할 수 있습니다.
              </p>
              <div>
                <p>“왜 이 문제를 선택했는지”</p>
                <p>“어떤 근거를 바탕으로 디자인 방향을 정했는지”</p>
                <p>“여러 대안 중 왜 이 디자인을 선택했는지”</p>
                <p>“그 결과 사용자와 서비스에 어떤 변화가 있었는지”</p>
                <p>처럼 디자인 과정에서의 판단과 근거를 보여주는 것이 중요합니다.</p>
              </div>
              <div>
                <p>
                  AI가 더 빠르게 결과물을 만들어낼수록 디자이너의 경쟁력은 결과물을 만드는 속도만으로 결정되기 어렵습니다.
                  오히려 좋은 문제를 발견하고, 복잡한 상황 속에서 적절한 해결 방향을 선택하며, 그 선택을 논리적으로 설명하는
                  능력이 더욱 중요해질 수 있습니다.
                </p>
                <p>
                  결국 AI 시대의 프로덕트 디자이너에게 필요한 것은 AI와 경쟁하는 능력이 아니라, AI를 활용하면서도 디자인의
                  방향을 스스로 판단할 수 있는 능력입니다.
                </p>
              </div>
              <p>
                지금 포트폴리오를 준비하고 있다면, 완성된 화면을 한 장 더 추가하기보다 내가 왜 이 디자인을 선택했는지 설명할
                수 있는 근거가 충분한지부터 확인해보세요.
              </p>
            </div>

            <div className="flex flex-col gap-3 items-start w-full max-w-[512px]">
              <p className="font-bold text-[15px] leading-[1.6] text-[#121213]">레퍼런스</p>
              <ul className="list-disc pl-[1.35em] flex flex-col gap-2 w-full">
                {REFERENCES.map((item) => (
                  <li key={item.href} className="text-[15px] font-medium leading-[1.45] text-[#121213]">
                    <a href={item.href} target="_blank" rel="noreferrer" className="underline">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[#e7eaee] h-px w-full" />

        <div className="flex gap-5 items-start w-full">
          <button
            type="button"
            onClick={hasPrev ? onPrev : undefined}
            disabled={!hasPrev}
            className={`flex flex-1 gap-0.5 items-center min-w-0 ${hasPrev ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <img alt="" src={imgChevronLeft} className="size-6" />
            <span className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#9ca2b1] whitespace-nowrap">
              이전 글
            </span>
          </button>
          <button
            type="button"
            onClick={hasNext ? onNext : undefined}
            disabled={!hasNext}
            className={`flex flex-1 gap-0.5 items-center justify-end min-w-0 ${hasNext ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <span
              className={`font-medium text-[14px] leading-[1.42] tracking-[0.14px] whitespace-nowrap ${
                hasNext ? 'text-[#9ca2b1]' : 'text-[#cad1d6]'
              }`}
            >
              다음 글
            </span>
            <img alt="" src={imgChevronRight} className="size-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
