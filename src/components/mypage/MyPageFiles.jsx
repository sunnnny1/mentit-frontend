const imgChevronDown = 'https://www.figma.com/api/mcp/asset/161084ec-5185-4798-b600-973d45bcc181.svg';

const FILE_SECTIONS = [
  {
    id: 'portfolio',
    title: '포트폴리오',
    files: [
      { id: 'portfolio-1', name: '포폴 수정본.pdf', size: '5.3MB', date: '2026.05.15' },
      { id: 'portfolio-2', name: 'Portfolio_이윤영_2026.pdf', size: '5.6MB', date: '2026.05.13' },
    ],
  },
  {
    id: 'coverletter',
    title: '자기소개서',
    files: [
      { id: 'coverletter-1', name: '자소서_이윤영.pdf', size: '2.1MB', date: '2026.05.11' },
    ],
  },
];

function FileCard({ file }) {
  return (
    <div className="border border-[#e7eaee] rounded-2xl px-4 py-5 flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-2 w-full">
        <p className="font-bold text-[16px] leading-[1.45] text-[#121213]">{file.name}</p>
        <p className="text-[15px] leading-[1.6] text-[#121213]">{file.size}</p>
      </div>
      <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">{file.date}</p>
    </div>
  );
}

function MoreButton() {
  return (
    <button
      type="button"
      className="border border-[#e7eaee] rounded-lg pl-3 pr-4 py-2 flex items-center justify-center gap-1 w-full cursor-pointer"
    >
      <img alt="" src={imgChevronDown} className="size-6" />
      <span className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886]">더보기</span>
    </button>
  );
}

export default function MyPageFiles() {
  return (
    <div className="pt-5 pb-16 w-full flex flex-col gap-10">
      {FILE_SECTIONS.map((section) => (
        <div key={section.id} className="flex flex-col gap-6 w-full">
          <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#0f0f10]">{section.title}</p>
          <div className="flex flex-col gap-2 w-full">
            {section.files.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
            <MoreButton />
          </div>
        </div>
      ))}
    </div>
  );
}
