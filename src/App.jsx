import { useCallback, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import PortfolioCard from './components/PortfolioCard';
import MentorRecommendations, { normalizeMentorName } from './components/MentorRecommendations';
import CareerTalk from './components/CareerTalk';
import PersonalizedPosts from './components/PersonalizedPosts';
import ChatPage from './components/chat/ChatPage';
import SearchPage from './components/search/SearchPage';
import BoardPage from './components/board/BoardPage';
import CareerTalkDetail from './components/board/CareerTalkDetail';
import CareerTalkDetailYoonie from './components/board/CareerTalkDetailYoonie';
import QnaDetailQualQuant from './components/board/QnaDetailQualQuant';
import QnaDetailFailedProject from './components/board/QnaDetailFailedProject';
import BoardFreeTalkDetail from './components/board/BoardFreeTalkDetail';
import BoardFreeTalkDetailAionue from './components/board/BoardFreeTalkDetailAionue';
import BoardWrite from './components/board/BoardWrite';
import MyPage from './components/mypage/MyPage';
import MyPageInsightDetail from './components/mypage/MyPageInsightDetail';
import MyPageProfileEdit from './components/mypage/MyPageProfileEdit';
import MentitAiPage from './components/mentitai/MentitAiPage';
import MentitAiMentorSearch from './components/mentitai/MentitAiMentorSearch';
import MentitAiCareerPlan from './components/mentitai/MentitAiCareerPlan';
import MentitAiJobRecommend from './components/mentitai/MentitAiJobRecommend';
import MentitAiChat from './components/mentitai/MentitAiChat';
import MentorExplorePage from './components/mentor/MentorExplorePage';
import MentorDetailPage from './components/mentor/MentorDetailPage';
import InterviewPage from './components/interview/InterviewPage';
import InterviewOnboardingPage, { resetInterviewOnboardingDraft } from './components/interview/InterviewOnboardingPage';
import InterviewAnalyzePage from './components/interview/InterviewAnalyzePage';
import InterviewNormalPage from './components/interview/InterviewNormalPage';
import InterviewSessionPage from './components/interview/InterviewSessionPage';
import InterviewFeedbackPage from './components/interview/InterviewFeedbackPage';
import { DEFAULT_INTERVIEW_TITLE } from './components/interview/InterviewSubMenu';

function HomeMain({ onNavigateToCareerTalk, onOpenCareerTalkDetail, onOpenQnaDetail, onOpenFreeTalkDetail, onOpenAgentChat, onOpenMentorDetail, onOpenMentitAI, onOpenInterview }) {
  return (
    <main className="no-scrollbar flex-1 max-w-[1173px] mx-auto pt-16 pb-16 px-5 flex flex-col gap-16 self-stretch min-h-0 overflow-y-auto">
      <div className="flex gap-5 items-start">
        <Hero onOpenMentitAI={onOpenMentitAI} />
        <PortfolioCard onOpenFeedback={() => onOpenAgentChat?.('Yoonie', { tab: 'feedback', feedbackKind: 'portfolio', feedbackView: 'result' })} />
      </div>

      <MentorRecommendations onOpenAgentChat={onOpenAgentChat} onOpenMentorDetail={onOpenMentorDetail} onOpenInterview={onOpenInterview} />
      <CareerTalk onNavigateToCareerTalk={onNavigateToCareerTalk} onOpenDetail={onOpenCareerTalkDetail} />
      <PersonalizedPosts onOpenQnaDetail={onOpenQnaDetail} onOpenFreeTalkDetail={onOpenFreeTalkDetail} />
    </main>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [previousPage, setPreviousPage] = useState(null);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(true);
  const [headerBackTo, setHeaderBackTo] = useState(null);
  const [planSkipReveal, setPlanSkipReveal] = useState(false);
  const [boardCategory, setBoardCategory] = useState('all');
  const [careerTalkArticleId, setCareerTalkArticleId] = useState('uha');
  const [qnaArticleId, setQnaArticleId] = useState('qualquant');
  const [freeTalkArticleId, setFreeTalkArticleId] = useState('gangster');
  const [writeCategory, setWriteCategory] = useState('qna');
  const [insightTab, setInsightTab] = useState('all');
  const [insightSettingsOpen, setInsightSettingsOpen] = useState(false);
  const [myPageSection, setMyPageSection] = useState('account');
  const [activityTab, setActivityTab] = useState('likes');
  const [filesTab, setFilesTab] = useState('portfolio');
  const [accountTab, setAccountTab] = useState('profile');
  const [mentorSearchQuery, setMentorSearchQuery] = useState('멘토 추천');
  const [mentorSearchFromInterview, setMentorSearchFromInterview] = useState(false);
  const [aiChatQuery, setAiChatQuery] = useState('');
  const [aiChatSession, setAiChatSession] = useState(0);
  const [aiRecentConversations, setAiRecentConversations] = useState([]);
  const [chatSkipStart, setChatSkipStart] = useState(false);
  const [chatShowIntro, setChatShowIntro] = useState(false);
  const [chatMentor, setChatMentor] = useState('Yoonie');
  const [chatInitialMode, setChatInitialMode] = useState('agent');
  const [chatInitialTab, setChatInitialTab] = useState('chat');
  const [chatInitialFeedbackKind, setChatInitialFeedbackKind] = useState('portfolio');
  const [chatInitialFeedbackView, setChatInitialFeedbackView] = useState('upload');
  const [chatUnread, setChatUnread] = useState({ Sunny: 0, Yoonie: 0, Teddy: 0, Eunoia: 1 });
  const [mentorDetailId, setMentorDetailId] = useState('yoonie');
  const [mentorDetailTab, setMentorDetailTab] = useState('intro');
  const [mentorDetailBackTo, setMentorDetailBackTo] = useState('mentor');
  const [interviewMentor, setInterviewMentor] = useState('Sunny');
  const [interviewTitle, setInterviewTitle] = useState(DEFAULT_INTERVIEW_TITLE);
  const [interviewSessionStarted, setInterviewSessionStarted] = useState(false);
  const [searchAfterResults, setSearchAfterResults] = useState(false);
  const [searchSession, setSearchSession] = useState(0);

  const handleSelectInterviewMentor = (mentor) => {
    if (mentor !== 'Sunny') return;
    setInterviewMentor(mentor);
    setPage('interview-feedback');
  };

  const markChatRead = useCallback((name) => {
    setChatUnread((prev) => (prev[name] ? { ...prev, [name]: 0 } : prev));
  }, []);

  const handleNavigate = (next, { fromStart = false } = {}) => {
    if (!fromStart) setHeaderBackTo(null);
    setPage(next);
    if (next !== 'mypage') setInsightSettingsOpen(false);
    if (next === 'board') setBoardCategory('all');
    if (next === 'chat') {
      setChatSkipStart(false);
      setChatShowIntro(false);
      setChatMentor('Yoonie');
      setChatInitialMode('agent');
      setChatInitialTab('chat');
      setChatInitialFeedbackKind('portfolio');
      setChatInitialFeedbackView('upload');
      setIsSubMenuOpen(false);
    }
    if (next.startsWith('interview')) {
      setIsSubMenuOpen(false);
    } else if (
      next !== 'chat' &&
      next !== 'board' &&
      next !== 'ai' &&
      next !== 'ai-mentor-search' &&
      next !== 'ai-plan' &&
      next !== 'ai-job' &&
      next !== 'ai-chat'
    ) {
      setIsSubMenuOpen(true);
    }
  };

  const handleNavigateToCareerTalk = () => {
    setPage('board');
    setBoardCategory('careertalk');
  };

  const handleOpenBoard = (category = 'qna') => {
    setPage('board');
    setBoardCategory(category);
    setIsSubMenuOpen(true);
  };

  const handleOpenCareerTalkDetail = (articleId = 'uha') => {
    setCareerTalkArticleId(articleId);
    setPage('careertalk-detail');
  };

  const handleOpenMentorChat = (mentor = 'Yoonie', options = {}) => {
    const name = (typeof mentor === 'string' ? mentor : mentor?.name ?? 'Yoonie').replace(/\s*멘토$/, '');
    const tab = options.tab === 'feedback' ? 'feedback' : 'chat';
    const skipIntro = tab === 'feedback' || options.skipIntro === true || name === 'Sunny';
    setChatMentor(name);
    markChatRead(name);
    setPage('chat');
    setChatSkipStart(true);
    setChatShowIntro(!skipIntro);
    setIsSubMenuOpen(!skipIntro);
    setHeaderBackTo(options.backTo ?? null);
    setChatInitialMode(options.mode ?? (name === 'Sunny' ? 'mentor' : 'agent'));
    setChatInitialTab(tab);
    setChatInitialFeedbackKind(options.feedbackKind === 'resume' ? 'resume' : 'portfolio');
    setChatInitialFeedbackView(options.feedbackView === 'result' || options.feedbackView === 'mentor' ? options.feedbackView : 'upload');
  };

  const handleOpenMentorDetail = (mentorName = 'Yoonie', options = {}) => {
    const name = normalizeMentorName(mentorName);
    if (name !== 'Yoonie' && name !== 'Sunny' && name !== 'Eunoia' && name !== 'Teddy') return;
    setMentorDetailId(name.toLowerCase());
    setMentorDetailTab(options.tab === 'review' || options.tab === 'content' ? options.tab : 'intro');
    setMentorDetailBackTo((prev) => (page === 'mentor-detail' ? prev : page));
    setPage('mentor-detail');
  };

  const handleBackFromMentorDetail = () => {
    const target = mentorDetailBackTo && mentorDetailBackTo !== 'mentor-detail' ? mentorDetailBackTo : 'mentor';
    setMentorDetailBackTo('mentor');
    setPage(target);
  };

  const rememberAiConversation = (item) => {
    setAiRecentConversations((prev) => [item, ...prev.filter((conversation) => conversation.id !== item.id)]);
  };

  const handleOpenMentorSearch = (query = '멘토 추천', { fromInterview = false, fromStart = false, backTo } = {}) => {
    setMentorSearchQuery(query);
    setMentorSearchFromInterview(fromInterview);
    if (!fromInterview) {
      rememberAiConversation({ id: 'mentor-search', title: '멘토 추천' });
    }
    setHeaderBackTo(fromStart ? (backTo ?? 'chat') : null);
    setPage('ai-mentor-search');
  };

  const handleHeaderBack = () => {
    const target = headerBackTo ?? 'home';
    setHeaderBackTo(null);
    if (target === 'chat' || target === 'interview' || target === 'interview-onboarding' || target === 'home') {
      handleNavigate(target);
      return;
    }
    setPage(target);
  };

  const handleOpenPlan = ({ fromHome = false } = {}) => {
    rememberAiConversation({ id: 'career-plan', title: '취업 목표 설정' });
    setPreviousPage((prev) => (page === 'ai-plan' ? prev : page));
    setHeaderBackTo(fromHome ? 'home' : null);
    setPlanSkipReveal(fromHome);
    setPage('ai-plan');
  };

  const handleOpenJobRecommend = () => {
    rememberAiConversation({ id: 'job-recommend', title: '직무 추천' });
    setPage('ai-job');
  };

  const handleOpenAiChat = (query) => {
    setAiChatQuery(query);
    setAiChatSession((prev) => prev + 1);
    setPage('ai-chat');
  };

  const handleSelectAiConversation = (conversation) => {
    if (!conversation) {
      setPage('ai');
      return;
    }
    if (conversation.id === 'mentor-search') {
      setMentorSearchQuery('멘토 추천');
      setMentorSearchFromInterview(false);
      setPage('ai-mentor-search');
      return;
    }
    if (conversation.id === 'career-plan') {
      setPage('ai-plan');
      return;
    }
    if (conversation.id === 'job-recommend') {
      setPage('ai-job');
    }
  };

  const aiSubMenu = {
    recentConversations: aiRecentConversations,
    activeConversationId:
      page === 'ai-mentor-search' && !mentorSearchFromInterview
        ? 'mentor-search'
        : page === 'ai-plan'
          ? 'career-plan'
          : page === 'ai-job'
            ? 'job-recommend'
            : null,
    onSelectConversation: handleSelectAiConversation,
  };

  const handleOpenQnaDetail = (articleId = 'qualquant') => {
    setQnaArticleId(articleId);
    setPage('qna-detail');
  };

  const handleBackFromCareerTalkDetail = () => {
    setPage('board');
    setBoardCategory('careertalk');
  };

  const handleBackFromQnaDetail = () => {
    setPage('board');
    setBoardCategory('qna');
  };

  const handleOpenFreeTalkDetail = (articleId = 'gangster') => {
    setFreeTalkArticleId(articleId);
    setPage('freetalk-detail');
  };

  const handleBackFromFreeTalkDetail = () => {
    setPage('board');
    setBoardCategory('freetalk');
  };

  const handleOpenInsightDetail = (articleId = 'ai-era') => {
    if (articleId !== 'ai-era') return;
    setPage('insight-detail');
  };

  const handleBackFromInsightDetail = () => {
    setPage('mypage');
    setMyPageSection('insight');
    setIsSubMenuOpen(true);
  };

  const handleOpenWrite = (category = 'qna') => {
    setWriteCategory(category);
    setPage('board-write');
  };

  const handleBackFromWrite = () => {
    setPage('board');
    setBoardCategory(writeCategory);
  };

  const handleSubmitWrite = (category) => {
    setPage('board');
    setBoardCategory(category);
  };

  const handleOpenInterviewOnboarding = () => {
    resetInterviewOnboardingDraft();
    setInterviewTitle(DEFAULT_INTERVIEW_TITLE);
    setInterviewSessionStarted(false);
    setPreviousPage((prev) => (page === 'interview-onboarding' ? prev : page));
    setIsSubMenuOpen(false);
    setPage('interview-onboarding');
  };

  const handleOpenInterviewStart = () => {
    setPage('interview');
    setIsSubMenuOpen(true);
  };

  const handleBackFromInterviewOnboarding = () => {
    setPage(previousPage ?? 'mentor');
  };

  const handleOpenMyPage = () => {
    setPage('mypage');
    setMyPageSection('account');
    setAccountTab('profile');
    setActivityTab('likes');
    setInsightTab('all');
    setInsightSettingsOpen(false);
    setIsSubMenuOpen(true);
  };

  const handleOpenMyPageProfile = () => {
    setPage('mypage-profile');
  };

  const handleBackFromMyPageProfile = () => {
    setPage('mypage');
  };

  const isBoardDetail =
    page === 'careertalk-detail' || page === 'qna-detail' || page === 'freetalk-detail' || page === 'board-write';
  const isChatStartScreen = page === 'chat' && !chatSkipStart;
  const sidebarPage = page === 'search' ? (previousPage ?? 'home') : page;
  const sidebarActiveItem = (() => {
    if (
      sidebarPage === 'careertalk-detail' ||
      sidebarPage === 'qna-detail' ||
      sidebarPage === 'freetalk-detail' ||
      sidebarPage === 'board-write'
    ) {
      return 'board';
    }
    if (
      sidebarPage === 'ai-mentor-search' ||
      sidebarPage === 'ai-plan' ||
      sidebarPage === 'ai-job' ||
      sidebarPage === 'ai-chat'
    ) {
      return 'ai';
    }
    if (sidebarPage === 'mentor-detail') return 'mentor';
    if (
      sidebarPage === 'interview-onboarding' ||
      sidebarPage === 'interview-analyze' ||
      sidebarPage === 'interview-normal' ||
      sidebarPage === 'interview-session' ||
      sidebarPage === 'interview-feedback'
    ) {
      return 'interview';
    }
    if (sidebarPage === 'mypage' || sidebarPage === 'mypage-profile' || sidebarPage === 'insight-detail') return null;
    return sidebarPage;
  })();

  return (
    <div className="h-dvh max-h-dvh overflow-hidden bg-[#fcfcfc] flex flex-col">
      <Header
        showStreak={
          page !== 'chat' &&
          page !== 'search' &&
          page !== 'board' &&
          page !== 'mypage' &&
          page !== 'mypage-profile' &&
          page !== 'insight-detail' &&
          page !== 'ai' &&
          page !== 'ai-mentor-search' &&
          page !== 'ai-plan' &&
          page !== 'ai-job' &&
          page !== 'ai-chat' &&
          page !== 'mentor' &&
          page !== 'mentor-detail' &&
          page !== 'interview' &&
          page !== 'interview-onboarding' &&
          page !== 'interview-analyze' &&
          page !== 'interview-normal' &&
          page !== 'interview-session' &&
          page !== 'interview-feedback' &&
          !isBoardDetail
        }
        onBack={
          page === 'careertalk-detail'
            ? handleBackFromCareerTalkDetail
            : page === 'qna-detail'
              ? handleBackFromQnaDetail
              : page === 'freetalk-detail'
                ? handleBackFromFreeTalkDetail
                : page === 'board-write'
                  ? handleBackFromWrite
                  : page === 'mypage-profile'
                    ? handleBackFromMyPageProfile
                    : page === 'insight-detail'
                      ? handleBackFromInsightDetail
                      : page === 'mypage' && insightSettingsOpen
                        ? () => setInsightSettingsOpen(false)
                      : page === 'mentor-detail'
                      ? handleBackFromMentorDetail
                      : (page === 'chat' || page === 'mentor' || page === 'ai-mentor-search' || page === 'ai-plan') &&
                          headerBackTo
                        ? handleHeaderBack
                        : undefined
        }
        onLogoClick={() => handleNavigate('home')}
        onSearchClick={() => {
          setPreviousPage((prev) => (page === 'search' ? prev : page));
          setSearchAfterResults(false);
          setSearchSession((n) => n + 1);
          setPage('search');
        }}
      />
      <div className="flex items-stretch gap-5 px-5 flex-1 min-h-0 overflow-x-visible overflow-y-hidden pb-5">
        {page === 'search' ? (
          <>
            {searchAfterResults ? (
              <Sidebar
                activeItem={sidebarActiveItem}
                onNavigate={handleNavigate}
                onOpenChatBar={() => setIsSubMenuOpen(true)}
                onOpenMyPage={handleOpenMyPage}
              />
            ) : null}
            <SearchPage
              key={searchSession}
              onClose={() => setPage(previousPage ?? 'home')}
              onAfterSearchChange={setSearchAfterResults}
              onOpenAgentChat={handleOpenMentorChat}
              onOpenMentorDetail={handleOpenMentorDetail}
            />
          </>
        ) : (
          <>
            <Sidebar
              activeItem={sidebarActiveItem}
              onNavigate={handleNavigate}
              showChatBarToggle={
                !isChatStartScreen &&
                (page === 'chat' ||
                  page === 'board' ||
                  page === 'ai' ||
                  page === 'ai-mentor-search' ||
                  page === 'ai-plan' ||
                  page === 'ai-job' ||
                  page === 'ai-chat' ||
                  page === 'interview' ||
                  page === 'interview-onboarding' ||
                  page === 'interview-analyze' ||
                  page === 'interview-normal' ||
                  page === 'interview-session' ||
                  page === 'interview-feedback' ||
                  page === 'mypage') &&
                !isSubMenuOpen
              }
              onOpenChatBar={() => setIsSubMenuOpen(true)}
              onOpenMyPage={handleOpenMyPage}
            />
            {page === 'chat' ? (
              <ChatPage
                key={chatSkipStart ? `${chatMentor}-${chatInitialTab}-${chatInitialMode}-${chatShowIntro}` : 'chat-start'}
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                onNavigateHome={() => handleNavigate('home')}
                onOpenMentorDetail={handleOpenMentorDetail}
                onOpenMentorExplore={() => handleNavigate('mentor')}
                onOpenMentorSearch={() => handleOpenMentorSearch()}
                onOpenStartExplore={() => {
                  setHeaderBackTo('chat');
                  handleNavigate('mentor', { fromStart: true });
                }}
                onOpenStartSearch={() => handleOpenMentorSearch('멘토 추천', { fromStart: true })}
                skipStart={chatSkipStart}
                initialShowIntro={chatShowIntro}
                initialMentor={chatMentor}
                initialChatMode={chatInitialMode}
                initialTab={chatInitialTab}
                initialFeedbackKind={chatInitialFeedbackKind}
                initialFeedbackView={chatInitialFeedbackView}
                unreadByMentor={chatUnread}
                onReadMentor={markChatRead}
                onOpenInterviewFeedback={() => {
                  setIsSubMenuOpen(false);
                  setPage('interview-feedback');
                }}
                onOpenInterview={(mentor) => {
                  if (mentor) setInterviewMentor(mentor);
                  handleOpenInterviewOnboarding();
                }}
              />
            ) : page === 'ai' ? (
              <MentitAiPage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                subMenu={aiSubMenu}
                onOpenMentorSearch={handleOpenMentorSearch}
                onOpenPlan={handleOpenPlan}
                onOpenJobRecommend={handleOpenJobRecommend}
                onOpenAiChat={handleOpenAiChat}
              />
            ) : page === 'ai-chat' ? (
              <MentitAiChat
                key={aiChatSession}
                initialQuery={aiChatQuery}
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                subMenu={aiSubMenu}
              />
            ) : page === 'ai-mentor-search' ? (
              <MentitAiMentorSearch
                query={mentorSearchQuery}
                fromInterview={mentorSearchFromInterview}
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                subMenu={aiSubMenu}
                onOpenAgentChat={handleOpenMentorChat}
                onOpenMentorDetail={handleOpenMentorDetail}
                onOpenInterview={handleOpenInterviewOnboarding}
              />
            ) : page === 'ai-plan' ? (
              <MentitAiCareerPlan
                key={planSkipReveal ? 'plan-instant' : 'plan-stream'}
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                subMenu={aiSubMenu}
                onNavigateHome={() => handleNavigate('home')}
                skipReveal={planSkipReveal}
              />
            ) : page === 'ai-job' ? (
              <MentitAiJobRecommend
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                subMenu={aiSubMenu}
                onOpenCareerTalkDetail={handleOpenCareerTalkDetail}
              />
            ) : page === 'interview' ? (
              <InterviewPage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                activeMentor={interviewMentor}
                onSelectMentor={handleSelectInterviewMentor}
                interviewTitle={interviewTitle}
                showRecentInterviews={interviewSessionStarted}
                onFindMentor={handleOpenInterviewStart}
                onOpenMentorExplore={() => {
                  setHeaderBackTo('interview');
                  handleNavigate('mentor', { fromStart: true });
                }}
                onOpenMentorSearch={() =>
                  handleOpenMentorSearch('모의면접에 맞는 멘토 추천해줘', {
                    fromInterview: true,
                    fromStart: true,
                    backTo: 'interview',
                  })
                }
              />
            ) : page === 'interview-onboarding' ? (
              <InterviewOnboardingPage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                activeMentor={interviewMentor}
                onSelectMentor={handleSelectInterviewMentor}
                showRecentInterviews={interviewSessionStarted}
                onFindMentor={handleOpenInterviewStart}
                onBack={handleBackFromInterviewOnboarding}
                onNext={(title) => {
                  const trimmed = title?.trim();
                  setInterviewTitle(trimmed || DEFAULT_INTERVIEW_TITLE);
                  setPage('interview-analyze');
                }}
                onOpenMentorExplore={() => {
                  setHeaderBackTo('interview-onboarding');
                  handleNavigate('mentor', { fromStart: true });
                }}
              />
            ) : page === 'interview-analyze' ? (
              <InterviewAnalyzePage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                activeMentor={interviewMentor}
                onSelectMentor={handleSelectInterviewMentor}
                interviewTitle={interviewTitle}
                showRecentInterviews={interviewSessionStarted}
                onFindMentor={handleOpenInterviewStart}
                onComplete={() => {
                  setInterviewSessionStarted(true);
                  setPage('interview-normal');
                }}
              />
            ) : page === 'interview-normal' ? (
              <InterviewNormalPage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                activeMentor={interviewMentor}
                onSelectMentor={handleSelectInterviewMentor}
                interviewTitle={interviewTitle}
                showRecentInterviews={interviewSessionStarted}
                onFindMentor={handleOpenInterviewStart}
                onStartInterview={() => setPage('interview-session')}
              />
            ) : page === 'interview-session' ? (
              <InterviewSessionPage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                activeMentor={interviewMentor}
                onSelectMentor={handleSelectInterviewMentor}
                interviewTitle={interviewTitle}
                showRecentInterviews={interviewSessionStarted}
                onFindMentor={handleOpenInterviewStart}
                onStopInterview={() => {
                  setIsSubMenuOpen(false);
                  setPage('interview');
                }}
                onCompleteInterview={() => {
                  setInterviewMentor('Sunny');
                  setIsSubMenuOpen(false);
                  setPage('interview-feedback');
                }}
              />
            ) : page === 'interview-feedback' ? (
              <InterviewFeedbackPage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                activeMentor={interviewMentor}
                onSelectMentor={handleSelectInterviewMentor}
                interviewTitle={interviewTitle}
                showRecentInterviews={interviewSessionStarted}
                onFindMentor={handleOpenInterviewStart}
                onRetryInterview={() => setPage('interview-session')}
                onOpenMentorChat={handleOpenMentorChat}
              />
            ) : page === 'mentor' ? (
              <MentorExplorePage
                onOpenAgentChat={handleOpenMentorChat}
                onOpenMentorDetail={handleOpenMentorDetail}
                onOpenInterview={handleOpenInterviewOnboarding}
              />
            ) : page === 'mentor-detail' ? (
              <MentorDetailPage
                mentorId={mentorDetailId}
                initialTab={mentorDetailTab}
                onOpenAgentChat={handleOpenMentorChat}
                onOpenInterview={handleOpenInterviewOnboarding}
                onOpenCareerTalkDetail={handleOpenCareerTalkDetail}
                onOpenQnaDetail={handleOpenQnaDetail}
              />
            ) : page === 'careertalk-detail' ? (
              careerTalkArticleId === 'yoonie' ? (
                <CareerTalkDetailYoonie
                  onBack={handleBackFromCareerTalkDetail}
                  onOpenMentorChat={(mentor, options) =>
                    handleOpenMentorChat(mentor, { ...options, backTo: 'careertalk-detail' })
                  }
                  onOpenMentorDetail={handleOpenMentorDetail}
                />
              ) : (
                <CareerTalkDetail onBack={handleBackFromCareerTalkDetail} />
              )
            ) : page === 'qna-detail' ? (
              qnaArticleId === 'failed' ? (
                <QnaDetailFailedProject
                  onOpenMentorChat={(mentor, options) =>
                    handleOpenMentorChat(mentor, { ...options, backTo: 'qna-detail' })
                  }
                  onOpenMentorDetail={handleOpenMentorDetail}
                />
              ) : (
                <QnaDetailQualQuant
                  onOpenMentorChat={(mentor, options) =>
                    handleOpenMentorChat(mentor, { ...options, backTo: 'qna-detail' })
                  }
                />
              )
            ) : page === 'freetalk-detail' ? (
              freeTalkArticleId === 'aionue' ? <BoardFreeTalkDetailAionue /> : <BoardFreeTalkDetail />
            ) : page === 'board-write' ? (
              <BoardWrite defaultCategory={writeCategory} onSubmit={handleSubmitWrite} />
            ) : page === 'mypage-profile' ? (
              <MyPageProfileEdit onSave={handleBackFromMyPageProfile} />
            ) : page === 'insight-detail' ? (
              <MyPageInsightDetail onPrev={handleBackFromInsightDetail} hasPrev hasNext={false} />
            ) : page === 'mypage' ? (
              <MyPage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                myPageSection={myPageSection}
                onMyPageSectionChange={(section) => {
                  setMyPageSection(section);
                  if (section === 'activity') setActivityTab('likes');
                  if (section === 'files') setFilesTab('portfolio');
                  if (section === 'account') setAccountTab('profile');
                }}
                activityTab={activityTab}
                onActivityTabChange={setActivityTab}
                filesTab={filesTab}
                onFilesTabChange={setFilesTab}
                accountTab={accountTab}
                onAccountTabChange={setAccountTab}
                insightTab={insightTab}
                onInsightTabChange={setInsightTab}
                insightSettingsOpen={insightSettingsOpen}
                onInsightSettingsOpenChange={setInsightSettingsOpen}
                onEditProfile={handleOpenMyPageProfile}
                onOpenMentorDetail={handleOpenMentorDetail}
                onOpenCareerTalkDetail={handleOpenCareerTalkDetail}
                onOpenQnaDetail={handleOpenQnaDetail}
                onOpenFreeTalkDetail={handleOpenFreeTalkDetail}
                onOpenBoard={handleOpenBoard}
                onOpenMentorChat={handleOpenMentorChat}
                onOpenInsightDetail={handleOpenInsightDetail}
              />
            ) : page === 'board' ? (
              <BoardPage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                category={boardCategory}
                onCategoryChange={setBoardCategory}
                onNavigateToCareerTalk={handleNavigateToCareerTalk}
                onOpenCareerTalkDetail={handleOpenCareerTalkDetail}
                onOpenQnaDetail={handleOpenQnaDetail}
                onOpenFreeTalkDetail={handleOpenFreeTalkDetail}
                onOpenWrite={handleOpenWrite}
                onOpenMentorDetail={handleOpenMentorDetail}
              />
            ) : (
              <HomeMain
                onNavigateToCareerTalk={handleNavigateToCareerTalk}
                onOpenCareerTalkDetail={handleOpenCareerTalkDetail}
                onOpenQnaDetail={handleOpenQnaDetail}
                onOpenFreeTalkDetail={handleOpenFreeTalkDetail}
                onOpenAgentChat={handleOpenMentorChat}
                onOpenMentorDetail={handleOpenMentorDetail}
                onOpenMentitAI={() => handleOpenPlan({ fromHome: true })}
                onOpenInterview={handleOpenInterviewOnboarding}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
