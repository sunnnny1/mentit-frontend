import imgLogo from '../assets/icons/header-logo.svg';
import imgDot from '../assets/icons/header-dot.svg';
import imgFootprint from '../assets/icons/header-footprint.svg';
import imgSearch from '../assets/icons/header-search.svg';
import imgBell from '../assets/icons/header-bell.svg';
import figma_c25d4b68_8802_4c60_8fb6_a6c20b14fba3_svg from '../assets/figma/c25d4b68-8802-4c60-8fb6-a6c20b14fba3.svg';
const imgChevronLeft = figma_c25d4b68_8802_4c60_8fb6_a6c20b14fba3_svg;

export default function Header({ showStreak = true, onSearchClick, onBack, onLogoClick }) {
  return (
    <header className="sticky top-0 z-20 shrink-0 h-16 bg-[#fcfcfc] flex items-center justify-between pl-9 pr-5 w-full">
      <div className="flex items-center gap-[37px] h-[39px] p-0.5">
        <button
          type="button"
          onClick={onLogoClick}
          className="size-[35px] cursor-pointer shrink-0"
          aria-label="홈으로 이동"
        >
          <img alt="" src={imgLogo} className="size-[35px]" />
        </button>
        {onBack && (
          <button type="button" onClick={onBack} className="size-6 cursor-pointer">
            <img alt="뒤로가기" src={imgChevronLeft} className="size-6" />
          </button>
        )}
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
