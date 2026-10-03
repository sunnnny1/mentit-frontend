import { useState } from 'react';
import MyPageInsight from './MyPageInsight';
import MyPageInsightSettings, { DEFAULT_INSIGHT_SETTINGS, insightScheduleCopy } from './MyPageInsightSettings';
import MyPageReview from './MyPageReview';
import MyPageFiles from './MyPageFiles';
import MyPageBookmark from './MyPageBookmark';
import MyPageLiked from './MyPageLiked';
import MyPageAccount from './MyPageAccount';
import MyPageSubMenu from './MyPageSubMenu';
import figma_76cede70_2675_456a_b41a_05e1bad4057d_svg from '../../assets/figma/76cede70-2675-456a-b41a-05e1bad4057d.svg';

const imgSetting = figma_76cede70_2675_456a_b41a_05e1bad4057d_svg;

const ACTIVITY_TABS = [
  { key: 'likes', label: '좋아요한 글' },
  { key: 'bookmark', label: '북마크한 글' },
  { key: 'review', label: '리뷰 내역' },
];

const FILE_TABS = [
  { key: 'portfolio', label: '포트폴리오' },
  { key: 'resume', label: '자기소개서' },
];

const ACCOUNT_TABS = [
  { key: 'profile', label: '프로필 설정' },
  { key: 'notification', label: '알림 설정' },
];

const INSIGHT_CHIPS = [
  { key: 'all', label: '전체' },
  { key: 'trend', label: '트렌드' },
  { key: 'blog', label: '기업 블로그' },
  { key: 'saved', label: '저장된 인사이트' },
];

function sectionTabs(section) {
  if (section === 'files') return FILE_TABS;
  if (section === 'account') return ACCOUNT_TABS;
  return ACTIVITY_TABS;
}

export default function MyPage({
  isSubMenuOpen = true,
  onCloseSubMenu,
  myPageSection = 'activity',
  onMyPageSectionChange,
  activityTab = 'likes',
  onActivityTabChange,
  filesTab = 'portfolio',
  onFilesTabChange,
  accountTab = 'profile',
  onAccountTabChange,
  insightTab,
  onInsightTabChange,
  insightSettingsOpen = false,
  onInsightSettingsOpenChange,
  onEditProfile,
  onOpenMentorDetail,
  onOpenCareerTalkDetail,
  onOpenQnaDetail,
  onOpenFreeTalkDetail,
  onOpenBoard,
  onOpenMentorChat,
  onOpenInsightDetail,
}) {
  const [insightSettings, setInsightSettings] = useState(DEFAULT_INSIGHT_SETTINGS);

  const closeSettings = () => onInsightSettingsOpenChange?.(false);

  const changeSection = (section) => {
    closeSettings();
    onMyPageSectionChange?.(section);
  };

  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && !insightSettingsOpen && (
        <MyPageSubMenu onClose={onCloseSubMenu} activeCategory={myPageSection} onCategoryChange={changeSection} />
      )}
      <section className="flex-1 min-w-0 min-h-0 rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden flex flex-col">
        {(myPageSection === 'activity' || myPageSection === 'files' || myPageSection === 'account') && (
          <div className="shrink-0 bg-white z-10 px-5 pt-16">
            <div className="relative mx-auto flex h-[64px] w-full max-w-[907px] items-stretch">
              <div className="absolute inset-x-0 bottom-0 h-px bg-[#e7eaee]" />
              {sectionTabs(myPageSection).map((tab) => {
                const isActive =
                  myPageSection === 'files'
                    ? filesTab === tab.key
                    : myPageSection === 'account'
                      ? accountTab === tab.key
                      : activityTab === tab.key;
                const onSelect =
                  myPageSection === 'files'
                    ? onFilesTabChange
                    : myPageSection === 'account'
                      ? onAccountTabChange
                      : onActivityTabChange;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => onSelect?.(tab.key)}
                    className={`relative flex flex-1 items-center justify-center pt-3.5 pb-5 cursor-pointer ${
                      isActive ? 'border-b-2 border-[#121213]' : ''
                    }`}
                  >
                    <p
                      className={`leading-[1.45] whitespace-nowrap ${
                        myPageSection === 'activity' ? 'text-[18px]' : 'text-[16px]'
                      } ${isActive ? 'font-bold text-[#121213]' : 'font-medium text-[#747886]'}`}
                    >
                      {tab.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {myPageSection === 'insight' && !insightSettingsOpen && (
          <div className="shrink-0 bg-white z-10 px-5 pt-16 pb-2 flex flex-col">
            <div className="max-w-[907px] mx-auto flex flex-col gap-6 w-full">
              <div className="flex gap-6 items-center w-full">
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">인사이트</p>
                  <p className="text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886]">
                    {insightScheduleCopy(insightSettings)}
                  </p>
                </div>
                <button type="button" onClick={() => onInsightSettingsOpenChange?.(true)} className="size-6 shrink-0 cursor-pointer" aria-label="인사이트 설정">
                  <img alt="" src={imgSetting} className="size-6" />
                </button>
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
            </div>
          </div>
        )}

        {myPageSection === 'insight' && insightSettingsOpen && (
          <div className="shrink-0 bg-white z-10 px-5 pt-16 pb-2">
            <div className="max-w-[907px] mx-auto w-full">
              <p className="font-bold text-[22px] leading-[1.4] tracking-[-0.33px] text-[#121213]">인사이트 설정</p>
            </div>
          </div>
        )}

        <div className="flex-1 min-h-0 overflow-y-auto px-5">
          <div className="max-w-[907px] mx-auto w-full">
            {myPageSection === 'account' ? (
              <MyPageAccount tab={accountTab} />
            ) : myPageSection === 'insight' && insightSettingsOpen ? (
              <MyPageInsightSettings
                initialSettings={insightSettings}
                onCancel={closeSettings}
                onSave={(next) => {
                  setInsightSettings(next);
                  closeSettings();
                }}
              />
            ) : myPageSection === 'insight' ? (
              <MyPageInsight insightTab={insightTab} onOpenDetail={onOpenInsightDetail} />
            ) : myPageSection === 'files' ? (
              <MyPageFiles tab={filesTab} />
            ) : activityTab === 'likes' ? (
              <MyPageLiked
                onOpenCareerTalkDetail={onOpenCareerTalkDetail}
                onOpenQnaDetail={onOpenQnaDetail}
                onOpenFreeTalkDetail={onOpenFreeTalkDetail}
                onOpenBoard={onOpenBoard}
                onOpenMentorChat={onOpenMentorChat}
                onOpenMentorDetail={onOpenMentorDetail}
              />
            ) : activityTab === 'bookmark' ? (
              <MyPageBookmark
                onOpenCareerTalkDetail={onOpenCareerTalkDetail}
                onOpenQnaDetail={onOpenQnaDetail}
                onOpenFreeTalkDetail={onOpenFreeTalkDetail}
                onOpenBoard={onOpenBoard}
              />
            ) : (
              <MyPageReview onOpenMentorDetail={onOpenMentorDetail} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
