const imgLogo = "https://www.figma.com/api/mcp/asset/04ad0798-9c3a-4941-8c08-22c0fbf30157.svg";
const imgDot = "https://www.figma.com/api/mcp/asset/2f97f4aa-c538-48c2-8aa1-2069ecb2ecee.svg";
const imgFootprint = "https://www.figma.com/api/mcp/asset/01c89bc6-ce88-4f15-8a01-5633d142d5c4.svg";
const imgSearch = "https://www.figma.com/api/mcp/asset/a5bb8d32-e53b-463d-b2ed-6040d61e92cb.svg";
const imgBell = "https://www.figma.com/api/mcp/asset/c86ae723-d4d2-430f-86af-352a9d7de33d.svg";

export default function Header({ showStreak = true, onSearchClick }) {
  return (
    <header className="sticky top-0 z-20 shrink-0 bg-[#fcfcfc] flex items-center justify-between pb-3 pl-9 pr-5 pt-4 w-full">
      <div className="flex items-center gap-2 h-[39px] p-0.5">
        <img alt="Mentit" src={imgLogo} className="size-[35px]" />
      </div>

      <div className="flex items-center justify-end gap-7">
        {showStreak && (
          <div className="relative flex items-center gap-7 h-[41px] pb-[10px] pl-[15px] pr-[26px] pt-[11px] rounded-full bg-[#f7feff] shadow-[0_0_10px_rgba(0,0,0,0.04),inset_-8px_-8px_10px_rgba(255,255,255,0.9),inset_8px_8px_10px_rgba(255,255,255,0.9)]">
            <div className="flex items-center gap-1 font-medium text-sm tracking-[0.14px] whitespace-nowrap">
              <p className="text-[#1a75ff]">23일째</p>
              <p className="text-[#121213]">연속 성장하는중</p>
            </div>
            <div className="relative w-[224px] h-5">
              <img alt="" src={imgDot} className="absolute inset-0 w-full h-full object-contain" />
              <img alt="" src={imgFootprint} className="absolute left-0 top-0 w-[95px] h-5" />
            </div>
          </div>
        )}

        <div className="flex items-center gap-5">
          <button type="button" onClick={onSearchClick} className="flex items-center justify-center size-6 cursor-pointer">
            <img alt="검색" src={imgSearch} className="size-6" />
          </button>
          <button type="button" className="flex items-center justify-center size-6 cursor-pointer">
            <img alt="알림" src={imgBell} className="size-6" />
          </button>
          <div className="flex items-center justify-center px-2 py-[5px] rounded-lg border border-[#e7eaee]">
            <p className="text-[13px] font-medium tracking-[0.26px] text-[#747886] whitespace-nowrap">멘토 서비스</p>
          </div>
        </div>
      </div>
    </header>
  );
}
