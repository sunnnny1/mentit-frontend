import { useEffect, useRef, useState } from 'react';
import imgShare from '../../assets/icons/chat/share-ios.svg';
import imgLink from '../../assets/icons/chat/link.svg';
import imgCheck from '../../assets/icons/chat/check.svg';

const MOCK_FILES = {
  portfolio: { name: 'Portfolio_이윤영_2026', sizeLabel: '5.3MB' },
  resume: { name: '자소서_이윤영_2026', sizeLabel: '2.1MB' },
};

const MOCK_JDS = [
  { url: 'http://toss.com/job', title: '토스 채용', summary: '1. 토스 프로덕트 디자이너 JD가 불러와졌어요' },
  { url: 'http://kakao.com/job', title: '카카오 채용', summary: '2. 카카오 UX 디자이너 JD가 불러와졌어요' },
  { url: 'http://naver.com/job', title: '네이버 채용', summary: '3. 네이버 채용 JD가 불러와졌어요' },
];

function formatFileSize(bytes) {
  if (!bytes) return '0MB';
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function CircleCheck({ checked }) {
  return (
    <span
      className={`flex size-[18px] items-center justify-center rounded-full border-[1.5px] ${
        checked ? 'border-[#1a75ff] bg-[#1a75ff]' : 'border-[#e7eaee] bg-white'
      }`}
    >
      {checked ? <img alt="" src={imgCheck} className="size-4" /> : null}
    </span>
  );
}

function SectionHeading({ title, required, subtext }) {
  return (
    <div className="flex flex-col gap-1 items-start w-full">
      <div className="flex gap-1 items-center">
        <p className="font-bold text-lg leading-[1.5] tracking-[-0.0036px] text-[#121213]">{title}</p>
        {required ? <span className="font-medium text-sm leading-[1.429] tracking-[0.203px] text-[#e52222]">*</span> : null}
      </div>
      <p className="text-sm leading-[1.42] tracking-[0.14px] text-[#9ca2b1]">{subtext}</p>
    </div>
  );
}

export default function ChatFeedbackUpload({ onReadyChange, onRequestAgentFeedback, onFileKindChange }) {
  const fileInputRef = useRef(null);
  const [fileKind, setFileKind] = useState('portfolio');
  const [file, setFile] = useState(null);
  const [jdMode, setJdMode] = useState('url');
  const [jdItems, setJdItems] = useState([]);
  const [jdDirect, setJdDirect] = useState('');
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    onReadyChange?.(Boolean(file));
  }, [file, onReadyChange]);

  const setUploadedFile = (next) => {
    setFile(next);
    onReadyChange?.(Boolean(next));
  };

  const applyFile = (nativeFile) => {
    if (!nativeFile) {
      setUploadedFile(MOCK_FILES[fileKind] ?? MOCK_FILES.portfolio);
      return;
    }
    setUploadedFile({
      name: nativeFile.name.replace(/\.[^.]+$/, ''),
      sizeLabel: formatFileSize(nativeFile.size),
    });
  };

  const addJd = (item) => {
    setJdItems((prev) => {
      if (prev.length >= 3) return prev;
      if (prev.some((row) => row.url === item.url)) return prev;
      return [...prev, item];
    });
  };

  const handleAddJdClick = () => {
    const next = MOCK_JDS[jdItems.length];
    if (next) addJd(next);
  };

  const handleJdPaste = (event) => {
    const text = event.clipboardData?.getData('text')?.trim();
    if (!text) return;
    event.preventDefault();
    const match = MOCK_JDS.find((item) => text.includes(item.url.replace('http://', ''))) ?? {
      url: text,
      title: '모집공고',
      summary: `${jdItems.length + 1}. JD가 불러와졌어요`,
    };
    addJd(match);
  };

  const kindLabel = fileKind === 'resume' ? '자기소개서' : '포트폴리오';

  return (
    <div className="flex-1 min-w-0 min-h-0 overflow-y-auto">
      <div className="flex justify-center px-5 py-16">
        <div className="flex w-full max-w-[867px] flex-col gap-16 items-start">
          <section className="flex w-full flex-col gap-5 items-start">
            <SectionHeading
              title="파일 업로드"
              required
              subtext="포트폴리오 혹은 자기소개서 파일을 업로드 해주세요"
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setFileKind('portfolio');
                  onFileKindChange?.('portfolio');
                  if (file && Object.values(MOCK_FILES).some((item) => item.name === file.name)) {
                    setUploadedFile(MOCK_FILES.portfolio);
                  }
                }}
                className="flex items-center gap-1 cursor-pointer"
              >
                <span className="text-sm tracking-[0.14px] text-[#121213]">포트폴리오</span>
                <CircleCheck checked={fileKind === 'portfolio'} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setFileKind('resume');
                  onFileKindChange?.('resume');
                  if (file && Object.values(MOCK_FILES).some((item) => item.name === file.name)) {
                    setUploadedFile(MOCK_FILES.resume);
                  }
                }}
                className="flex items-center gap-1 cursor-pointer"
              >
                <span className="text-sm tracking-[0.14px] text-[#121213]">자기소개서</span>
                <CircleCheck checked={fileKind === 'resume'} />
              </button>
            </div>
            {file ? (
              <div className="flex w-full flex-col gap-5 items-start overflow-hidden rounded-2xl border border-[#e7eaee] px-4 py-5">
                <div className="flex w-full flex-col gap-2 items-start">
                  <p className="font-bold text-base leading-[1.45] text-[#121213]">{file.name}</p>
                  <p className="text-[15px] leading-[1.6] text-[#121213]">{file.sizeLabel}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUploadedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886] underline cursor-pointer"
                >
                  다시 업로드하기
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => applyFile()}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragOver(false);
                  applyFile(event.dataTransfer.files?.[0]);
                }}
                className={`flex w-full flex-col gap-2 items-center justify-center rounded-2xl border px-4 py-5 cursor-pointer ${
                  dragOver ? 'border-[#1a75ff] bg-[#f7fbff]' : 'border-[#e7eaee] bg-white'
                }`}
              >
                <img alt="" src={imgShare} className="size-5" />
                <p className="w-full text-center text-[15px] leading-[1.6] text-[#9ca2b1]">
                  클릭하여 파일을 선택하거나 드래그 해주세요
                </p>
                <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#9ca2b1]">PDF, PPT, DOCX (최대 20MB)</p>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.ppt,.pptx,.doc,.docx"
              className="hidden"
              onChange={(event) => applyFile(event.target.files?.[0])}
            />
          </section>

          <section className="flex w-full flex-col gap-5 items-start">
            <SectionHeading title="모집공고(JD) 입력" subtext="지원하고자 하는 회사의 모집공고를 입력해주세요 (선택)" />
            <div className="flex items-center rounded-lg bg-[#f4f6f8] p-0.5">
              <button
                type="button"
                onClick={() => setJdMode('url')}
                className={`flex w-[91px] items-center justify-center px-7 py-1 rounded-lg text-[13px] font-medium tracking-[0.26px] cursor-pointer ${
                  jdMode === 'url' ? 'bg-white text-[#121213] shadow-[0_0_8px_rgba(18,18,19,0.04)]' : 'text-[#9ca2b1]'
                }`}
              >
                URL
              </button>
              <button
                type="button"
                onClick={() => setJdMode('direct')}
                className={`flex items-center justify-center px-7 py-1 rounded-lg text-[13px] font-medium tracking-[0.26px] cursor-pointer ${
                  jdMode === 'direct' ? 'bg-white text-[#121213] shadow-[0_0_8px_rgba(18,18,19,0.04)]' : 'text-[#9ca2b1]'
                }`}
              >
                직접입력
              </button>
            </div>
            {jdMode === 'direct' ? (
              <textarea
                value={jdDirect}
                onChange={(event) => setJdDirect(event.target.value)}
                placeholder="모집공고 내용을 붙여넣어 주세요"
                className="min-h-[132px] w-full resize-none rounded-2xl border border-[#e7eaee] px-4 py-5 text-[15px] leading-[1.6] text-[#121213] outline-none placeholder:text-[#9ca2b1]"
              />
            ) : (
              <div className="flex w-full flex-col gap-2 items-start">
                {jdItems.map((item) => (
                  <div
                    key={item.url}
                    className="flex w-full flex-col gap-2 items-start overflow-hidden rounded-2xl border border-[#e7eaee] px-4 py-5"
                  >
                    <p className="font-bold text-base leading-[1.45] text-[#121213]">{item.url}</p>
                    <p className="text-[15px] leading-[1.6] text-[#121213]">{item.title}</p>
                  </div>
                ))}
                {jdItems.length < 3 ? (
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={handleAddJdClick}
                    onPaste={handleJdPaste}
                    className="flex w-full flex-col gap-2 items-center justify-center rounded-2xl border border-[#e7eaee] px-4 py-5 cursor-pointer outline-none"
                  >
                    <img alt="" src={imgLink} className="size-5" />
                    <p className="w-full text-center text-[15px] leading-[1.6] text-[#9ca2b1]">URL을 붙여주세요</p>
                    <p className="text-sm leading-[1.42] tracking-[0.14px] text-[#9ca2b1]">최대 3개</p>
                  </div>
                ) : null}
              </div>
            )}
          </section>

          {file ? (
            <section className="flex w-full flex-col gap-5 items-start">
              <p className="font-bold text-lg leading-[1.5] tracking-[-0.0036px] text-[#121213]">
                피드백을 위한 파일이 모두 업로드됐어요
              </p>
              <div className="flex w-full max-w-[511px] flex-col gap-6 items-start rounded-2xl border border-[#f4f6f8] bg-white p-6 shadow-[0_0_15px_rgba(18,18,19,0.04)]">
                <div className="flex w-full flex-col gap-3 items-start">
                  <p className="font-bold text-[15px] leading-[1.45] text-[#121213]">
                    AI 에이전트가 이 직무에 맞춰 {kindLabel}를 분석할게요
                  </p>
                  {jdItems.length > 0 ? (
                    <div className="w-full text-[15px] leading-[1.6] text-[#121213]">
                      {jdItems.map((item) => (
                        <p key={item.url}>{item.summary}</p>
                      ))}
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => onRequestAgentFeedback?.(fileKind)}
                  className="relative flex w-full items-center justify-center rounded-xl border border-[#70d2ff] bg-[#1a75ff] px-7 py-3 shadow-[inset_0_0_4px_0_#e7f3ff] overflow-hidden cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#747886] after:opacity-0 hover:after:opacity-10"
                >
                  <span className="relative font-bold text-base text-white whitespace-nowrap">에이전트에게 피드백받기</span>
                </button>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
