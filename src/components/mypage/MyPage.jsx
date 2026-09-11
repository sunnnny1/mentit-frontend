import MyPageInsight from './MyPageInsight';
import MyPageReview from './MyPageReview';
import MyPageFiles from './MyPageFiles';
import MyPageBookmark from './MyPageBookmark';

const imgAvatar = 'https://www.figma.com/api/mcp/asset/92eaa1fc-4224-491d-bfc9-1424fcc7641d.png';
const imgSetting = 'https://www.figma.com/api/mcp/asset/76cede70-2675-456a-b41a-05e1bad4057d.svg';

const TOP_TABS = [
  { key: 'insight', label: '인사이트' },
  { key: 'review', label: '리뷰 내역' },
  { key: 'files', label: '내 파일' },
  { key: 'bookmark', label: '북마크' },
];

const INSIGHT_CHIPS = [
  { key: 'all', label: '전체' },
  { key: 'trend', label: '트렌드' },
  { key: 'blog', label: '기업 블로그' },
  { key: 'saved', label: '저장된 인사이트' },
];

export default function MyPage({ myPageTab = 'insight', onMyPageTabChange, insightTab, onInsightTabChange, onEditProfile }) {
  return (
    <section className="flex-1 min-w-0 min-h-0 rounded-2xl bg-white shadow-[0_0_8px_rgba(18,18,19,0.04)] overflow-y-auto">
      <div className="max-w-[1311px] mx-auto flex gap-[88px] items-start pl-[69px] pr-[89px] pb-16">
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex flex-col gap-5 pt-16 pb-5 w-full sticky top-0 bg-white z-10">
            <div className="flex gap-5 h-[57px] items-center w-full">
              {TOP_TABS.map((tab) => {
                const isActive = myPageTab === tab.key;
                return (
                  <div
                    key={tab.key}
                    role="button"
                    tabIndex={0}
                    onClick={() => onMyPageTabChange?.(tab.key)}
                    className={`flex items-center justify-center w-[157.5px] shrink-0 pt-[14px] pb-5 cursor-pointer ${
                      isActive ? 'border-b-2 border-[#121213]' : ''
                    }`}
                  >
                    <p className={`text-[16px] leading-[1.45] whitespace-nowrap ${isActive ? 'font-bold text-[#121213]' : 'font-medium text-[#747886]'}`}>
                      {tab.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {myPageTab === 'insight' && (
              <>
                <div className="flex gap-12 items-center w-full">
                  <p className="flex-1 text-[15px] leading-[1.6] text-[#121213]">
                    월/수/금 오후 2시에 국내외 기업 UX 사례, 프로덕트 디자인 트렌드 인사이트를 보내드려요!
                  </p>
                  <img alt="설정" src={imgSetting} className="size-6 shrink-0" />
                </div>
                <div className="flex gap-2 items-start w-full">
                  {INSIGHT_CHIPS.map((chip) => {
                    const isActive = insightTab === chip.key;
                    return (
                      <button
                        key={chip.key}
                        type="button"
                        onClick={() => onInsightTabChange?.(chip.key)}
                        className={`flex items-center justify-center px-5 py-2 rounded-lg border cursor-pointer ${
                          isActive ? 'bg-[#1a75ff]/5 border-[#1a75ff]' : 'bg-white border-[#e7eaee]'
                        }`}
                      >
                        <p className={`text-[15px] font-medium leading-[1.45] whitespace-nowrap ${isActive ? 'text-[#1a75ff]' : 'text-[#747886]'}`}>
                          {chip.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="w-full">
            {myPageTab === 'review' ? (
              <MyPageReview />
            ) : myPageTab === 'files' ? (
              <MyPageFiles />
            ) : myPageTab === 'bookmark' ? (
              <MyPageBookmark />
            ) : (
              <MyPageInsight insightTab={insightTab} />
            )}
          </div>
        </div>

        <div className="w-[335px] shrink-0 sticky top-16 mt-16">
          <div className="bg-white border border-[#f4f6f8] shadow-[0_0_4px_rgba(18,18,19,0.04)] rounded-2xl p-6 flex flex-col gap-5 w-full">
            <div className="flex gap-3 items-center w-full">
              <div className="relative size-[60px] shrink-0">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgAvatar} />
              </div>
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex gap-2 items-center">
                  <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] whitespace-nowrap">이윤영(Yunn00)</p>
                  <span className="flex items-center justify-center px-2 py-1 rounded-lg bg-[#1a75ff]/10 text-[10px] tracking-[0.25px] text-[#1a75ff]">멘티</span>
                </div>
                <div className="flex gap-1 items-start">
                  <span className="flex items-center justify-center px-2 py-1 rounded-md bg-[#f4f6f8] text-[10px] tracking-[0.25px] text-[#747886]">프로덕트 디자인</span>
                  <span className="flex items-center justify-center px-2 py-1 rounded-md bg-[#f4f6f8] text-[10px] tracking-[0.25px] text-[#747886]">UX 디자인</span>
                </div>
              </div>
            </div>
            <div className="h-px bg-[#e7eaee] w-full" />
            <button type="button" onClick={onEditProfile} className="border border-[#e7eaee] rounded-xl px-7 py-3 w-full cursor-pointer">
              <p className="font-medium text-[16px] leading-[1.45] text-[#121213]">프로필 수정하기</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
