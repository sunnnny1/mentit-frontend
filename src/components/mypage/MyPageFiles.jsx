import { useRef, useState } from 'react';
import imgShare from '../../assets/icons/chat/share-ios.svg';

const INITIAL_FILES = {
  portfolio: [
    { id: 'portfolio-1', name: '포폴 수정본.pdf', size: '5.3MB', date: '2026.05.15' },
    { id: 'portfolio-2', name: 'Portfolio_이윤영_2026.pdf', size: '5.6MB', date: '2026.05.13' },
  ],
  resume: [{ id: 'resume-1', name: '자소서_이윤영.pdf', size: '2.1MB', date: '2026.05.11' }],
};

function formatFileSize(bytes) {
  if (!bytes) return '0MB';
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function formatDate(value = new Date()) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function FileCard({ file, onDelete }) {
  return (
    <div className="border border-[#e7eaee] rounded-2xl px-4 py-5 flex flex-col gap-5 w-full overflow-hidden">
      <div className="flex flex-col gap-2 w-full min-w-0">
        <p className="font-bold text-[16px] leading-[1.45] text-[#121213] whitespace-nowrap overflow-hidden text-ellipsis">{file.name}</p>
        <p className="text-[15px] leading-[1.6] text-[#121213] overflow-hidden text-ellipsis">{file.size}</p>
      </div>
      <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#747886]">{file.date}</p>
      <button
        type="button"
        onClick={() => onDelete(file.id)}
        className="self-start font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#9ca2b1] underline cursor-pointer"
      >
        삭제하기
      </button>
    </div>
  );
}

export default function MyPageFiles({ tab = 'portfolio' }) {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [filesByTab, setFilesByTab] = useState(INITIAL_FILES);

  const title = tab === 'resume' ? '자기소개서' : '포트폴리오';
  const files = filesByTab[tab] ?? [];

  const addFile = (nativeFile) => {
    const next = nativeFile
      ? {
          id: `${tab}-${Date.now()}`,
          name: nativeFile.name,
          size: formatFileSize(nativeFile.size),
          date: formatDate(),
        }
      : {
          id: `${tab}-${Date.now()}`,
          name: tab === 'resume' ? '자소서_이윤영_2026.pdf' : 'Portfolio_이윤영_2026.pdf',
          size: tab === 'resume' ? '2.1MB' : '5.3MB',
          date: formatDate(),
        };
    setFilesByTab((prev) => ({
      ...prev,
      [tab]: [next, ...(prev[tab] ?? [])],
    }));
  };

  const deleteFile = (id) => {
    setFilesByTab((prev) => ({
      ...prev,
      [tab]: (prev[tab] ?? []).filter((file) => file.id !== id),
    }));
  };

  return (
    <div className="pt-10 pb-16 w-full">
      <div className="flex flex-col gap-6 w-full">
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#0f0f10]">{title}</p>
        <div className="flex flex-col gap-2 w-full">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragOver(false);
              const dropped = event.dataTransfer.files?.[0];
              if (dropped) addFile(dropped);
            }}
            className={`flex w-full flex-col gap-2 items-center justify-center overflow-hidden rounded-2xl border px-4 py-5 cursor-pointer ${
              dragOver ? 'border-[#1a75ff] bg-[#f7fbff]' : 'border-[#e7eaee] bg-white'
            }`}
          >
            <img alt="" src={imgShare} className="size-5" />
            <p className="w-full text-center text-[15px] leading-[1.6] text-[#9ca2b1] overflow-hidden text-ellipsis">
              클릭하여 파일을 선택하거나 드래그 해주세요
            </p>
            <p className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#9ca2b1]">PDF, PPT, DOCX (최대 20MB)</p>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.ppt,.pptx,.doc,.docx"
            className="hidden"
            onChange={(event) => {
              const picked = event.target.files?.[0];
              if (picked) addFile(picked);
              event.target.value = '';
            }}
          />
          {files.map((file) => (
            <FileCard key={file.id} file={file} onDelete={deleteFile} />
          ))}
        </div>
      </div>
    </div>
  );
}
