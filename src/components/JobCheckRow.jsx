export default function JobCheckRow({ label, checked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative overflow-hidden flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:transition-opacity ${
        checked ? 'bg-[#f4f6f8]' : 'bg-white'
      }`}
    >
      <span className="relative font-normal text-[14px] leading-[1.58] tracking-[0.14px] text-[#121213]">{label}</span>
      <span
        className={`relative flex items-center justify-center size-[18px] rounded-[5px] border-[1.5px] shrink-0 ${
          checked ? 'bg-[#1a75ff] border-[#1a75ff]' : 'border-[#e7eaee] bg-white'
        }`}
      >
        {checked ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M2.4 6.15 4.9 8.65 9.6 3.4"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
    </button>
  );
}
