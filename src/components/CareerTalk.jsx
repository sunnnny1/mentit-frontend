const imgThumnail = "https://www.figma.com/api/mcp/asset/2c384b3f-18ac-4e23-adf9-fefb737f38a1.png";
const imgThumnail1 = "https://www.figma.com/api/mcp/asset/67b8c5e1-5198-4378-a990-2e4336f4ae6e.png";
const imgBookmark = "https://www.figma.com/api/mcp/asset/630f9793-e98b-4bb0-8109-42b89b92f70d.svg";
const imgChevronRight = "https://www.figma.com/api/mcp/asset/b6c75f15-29da-4258-98b0-26b9a2b2dd15.svg";

const TALKS = [
  { title: 'AI 시대의 프로덕트 디자인 활용 팁', mentor: 'Yoonie 멘토', role: '프로덕트 디자이너', thumbnail: imgThumnail },
  { title: '에이전틱 AI 제품 만들 때 참고할 점', mentor: 'U.ha 멘토', role: '프로덕트 디자이너', thumbnail: imgThumnail1 },
];

function TalkCard({ talk }) {
  return (
    <div className="relative h-[309px] w-[550px] rounded-2xl overflow-hidden shrink-0">
      <img src={talk.thumbnail} alt={talk.title} className="absolute inset-0 size-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-[52px] bg-gradient-to-b from-black/10 to-transparent flex items-center justify-end px-3">
        <button type="button" className="relative flex items-center justify-center size-6 overflow-hidden cursor-pointer">
          <img alt="북마크" src={imgBookmark} className="size-6" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 w-full px-4 pb-4 pt-10 bg-gradient-to-t from-black/60 to-transparent flex flex-col gap-0.5">
        <p className="font-bold text-lg text-white [text-shadow:0_0_2px_rgba(0,0,0,0.3)]">{talk.title}</p>
        <div className="flex gap-1 items-center text-[15px] text-white">
          <span>{talk.mentor}</span>
          <span>・</span>
          <span>{talk.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function CareerTalk() {
  return (
    <section className="flex flex-col gap-6 items-start w-full">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-bold text-[22px] tracking-[-0.33px] text-[#121213]">멘토들의 커리어 토크</h2>
        <button type="button" className="flex gap-0.5 items-center font-medium text-sm text-[#9ca2b1] tracking-[0.14px] cursor-pointer">
          <span>전체보기</span>
          <img alt="" src={imgChevronRight} className="size-6" />
        </button>
      </div>
      <div className="flex gap-5 items-center">
        {TALKS.map((talk) => (
          <TalkCard key={talk.title} talk={talk} />
        ))}
      </div>
    </section>
  );
}
