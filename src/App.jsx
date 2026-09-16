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
import BoardWrite from './components/board/BoardWrite';
import MyPage from './components/mypage/MyPage';
import MyPageProfileEdit from './components/mypage/MyPageProfileEdit';
import MentitAiPage from './components/mentitai/MentitAiPage';
import MentitAiMentorSearch from './components/mentitai/MentitAiMentorSearch';
import MentitAiCareerPlan from './components/mentitai/MentitAiCareerPlan';
import MentitAiJobRecommend from './components/mentitai/MentitAiJobRecommend';
import MentorExplorePage from './components/mentor/MentorExplorePage';
import MentorDetailPage from './components/mentor/MentorDetailPage';
import InterviewPage from './components/interview/InterviewPage';
import InterviewOnboardingPage from './components/interview/InterviewOnboardingPage';
import InterviewAnalyzePage from './components/interview/InterviewAnalyzePage';
import InterviewNormalPage from './components/interview/InterviewNormalPage';
import InterviewSessionPage from './components/interview/InterviewSessionPage';

function HomeMain({ onNavigateToCareerTalk, onOpenCareerTalkDetail, onOpenQnaDetail, onOpenFreeTalkDetail, onOpenAgentChat, onOpenMentorDetail, onOpenMentitAI }) {
  return (
    <main className="no-scrollbar flex-1 max-w-[1173px] mx-auto pt-16 pb-16 px-5 flex flex-col gap-16 self-stretch min-h-0 overflow-y-auto">
      <div className="flex gap-5 items-start">
        <Hero onOpenMentitAI={onOpenMentitAI} />
        <PortfolioCard />
      </div>

      <MentorRecommendations onOpenAgentChat={onOpenAgentChat} onOpenMentorDetail={onOpenMentorDetail} />
      <CareerTalk onNavigateToCareerTalk={onNavigateToCareerTalk} onOpenDetail={onOpenCareerTalkDetail} />
      <PersonalizedPosts onOpenQnaDetail={onOpenQnaDetail} onOpenFreeTalkDetail={onOpenFreeTalkDetail} />
    </main>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [previousPage, setPreviousPage] = useState(null);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(true);
  const [boardCategory, setBoardCategory] = useState('all');
  const [careerTalkArticleId, setCareerTalkArticleId] = useState('uha');
  const [qnaArticleId, setQnaArticleId] = useState('qualquant');
  const [writeCategory, setWriteCategory] = useState('qna');
  const [insightTab, setInsightTab] = useState('all');
  const [myPageTab, setMyPageTab] = useState('insight');
  const [mentorSearchQuery, setMentorSearchQuery] = useState('멘토 추천');
  const [mentorSearchFromInterview, setMentorSearchFromInterview] = useState(false);
  const [aiRecentConversations, setAiRecentConversations] = useState([]);
  const [chatSkipStart, setChatSkipStart] = useState(false);
  const [chatMentor, setChatMentor] = useState('Yoonie');
  const [chatUnread, setChatUnread] = useState({ Yoonie: 0, Teddy: 0, Eunoia: 1 });
  const [mentorDetailId, setMentorDetailId] = useState('yoonie');

  const markChatRead = useCallback((name) => {
    setChatUnread((prev) => (prev[name] ? { ...prev, [name]: 0 } : prev));
  }, []);

  const handleNavigate = (next) => {
    setPage(next);
    if (next === 'board') setBoardCategory('all');
    if (next === 'chat') {
      setChatSkipStart(false);
      setChatMentor('Yoonie');
    }
    if (
      next !== 'chat' &&
      next !== 'board' &&
      next !== 'ai' &&
      next !== 'ai-mentor-search' &&
      next !== 'ai-plan' &&
      next !== 'ai-job'
    )
      setIsSubMenuOpen(true);
  };

  const handleNavigateToCareerTalk = () => {
    setPage('board');
    setBoardCategory('careertalk');
  };

  const handleOpenCareerTalkDetail = (articleId = 'uha') => {
    setCareerTalkArticleId(articleId);
    setPage('careertalk-detail');
  };

  const handleOpenMentorChat = (mentor = 'Yoonie') => {
    const name = (typeof mentor === 'string' ? mentor : mentor?.name ?? 'Yoonie').replace(/\s*멘토$/, '');
    setChatMentor(name);
    markChatRead(name);
    setPage('chat');
    setIsSubMenuOpen(false);
    setChatSkipStart(true);
  };

  const handleOpenMentorDetail = (mentorName = 'Yoonie') => {
    const name = normalizeMentorName(mentorName);
    if (name !== 'Yoonie' && name !== 'Sunny') return;
    setMentorDetailId(name.toLowerCase());
    setPage('mentor-detail');
  };

  const handleBackFromMentorDetail = () => {
    setPage('mentor');
  };

  const rememberAiConversation = (item) => {
    setAiRecentConversations((prev) => [item, ...prev.filter((conversation) => conversation.id !== item.id)]);
  };

  const handleOpenMentorSearch = (query = '멘토 추천', { fromInterview = false } = {}) => {
    setMentorSearchQuery(query);
    setMentorSearchFromInterview(fromInterview);
    if (!fromInterview) {
      rememberAiConversation({ id: 'mentor-search', title: '멘토 추천' });
    }
    setPage('ai-mentor-search');
  };

  const handleOpenPlan = () => {
    rememberAiConversation({ id: 'career-plan', title: '취업 목표 설정' });
    setPage('ai-plan');
  };

  const handleOpenJobRecommend = () => {
    rememberAiConversation({ id: 'job-recommend', title: '직무 추천' });
    setPage('ai-job');
  };

  const handleSelectAiConversation = (conversation) => {
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

  const handleOpenFreeTalkDetail = () => {
    setPage('freetalk-detail');
  };

  const handleBackFromFreeTalkDetail = () => {
    setPage('board');
    setBoardCategory('freetalk');
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
    setPreviousPage((prev) => (page === 'interview-onboarding' ? prev : page));
    setPage('interview-onboarding');
  };

  const handleBackFromInterviewOnboarding = () => {
    setPage(previousPage ?? 'mentor');
  };

  const handleOpenMyPage = () => {
    setPage('mypage');
    setMyPageTab('insight');
    setInsightTab('all');
  };

  const handleOpenMyPageProfile = () => {
    setPage('mypage-profile');
  };

  const handleBackFromMyPageProfile = () => {
    setPage('mypage');
  };

  const isBoardDetail =
    page === 'careertalk-detail' || page === 'qna-detail' || page === 'freetalk-detail' || page === 'board-write';

  return (
    <div className="h-dvh max-h-dvh overflow-hidden bg-[#fcfcfc] flex flex-col">
      <Header
        showStreak={
          page !== 'chat' &&
          page !== 'search' &&
          page !== 'board' &&
          page !== 'mypage' &&
          page !== 'mypage-profile' &&
          page !== 'ai' &&
          page !== 'ai-mentor-search' &&
          page !== 'ai-plan' &&
          page !== 'ai-job' &&
          page !== 'mentor' &&
          page !== 'mentor-detail' &&
          page !== 'interview' &&
          page !== 'interview-onboarding' &&
          page !== 'interview-analyze' &&
          page !== 'interview-normal' &&
          page !== 'interview-session' &&
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
                    : page === 'mentor-detail'
                      ? handleBackFromMentorDetail
                      : undefined
        }
        onLogoClick={() => handleNavigate('home')}
        onSearchClick={() => {
          setPreviousPage((prev) => (page === 'search' ? prev : page));
          setPage('search');
        }}
      />
      <div className="flex items-stretch gap-5 px-5 flex-1 min-h-0 overflow-hidden pb-5">
        {page === 'search' ? (
          <SearchPage onClose={() => setPage(previousPage ?? 'home')} onOpenAgentChat={handleOpenMentorChat} onOpenMentorDetail={handleOpenMentorDetail} />
        ) : (
          <>
            <Sidebar
              activeItem={
                isBoardDetail
                  ? 'board'
                  : page === 'ai-mentor-search' || page === 'ai-plan' || page === 'ai-job'
                    ? 'ai'
                    : page === 'mentor-detail'
                      ? 'mentor'
                      : page === 'interview-onboarding' ||
                          page === 'interview-analyze' ||
                          page === 'interview-normal' ||
                          page === 'interview-session'
                        ? 'interview'
                        : page
              }
              onNavigate={handleNavigate}
              showChatBarToggle={
                (page === 'chat' ||
                  page === 'board' ||
                  page === 'ai' ||
                  page === 'ai-mentor-search' ||
                  page === 'ai-plan' ||
                  page === 'ai-job' ||
                  page === 'interview-normal' ||
                  page === 'interview-session') &&
                !isSubMenuOpen
              }
              onOpenChatBar={() => setIsSubMenuOpen(true)}
              onOpenMyPage={handleOpenMyPage}
            />
            {page === 'chat' ? (
              <ChatPage
                key={chatMentor}
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                onNavigateHome={() => handleNavigate('home')}
                onOpenMentorExplore={() => handleNavigate('mentor')}
                onOpenMentorSearch={() => handleOpenMentorSearch()}
                skipStart={chatSkipStart}
                initialMentor={chatMentor}
                unreadByMentor={chatUnread}
                onReadMentor={markChatRead}
              />
            ) : page === 'ai' ? (
              <MentitAiPage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                subMenu={aiSubMenu}
                onOpenMentorSearch={handleOpenMentorSearch}
                onOpenPlan={handleOpenPlan}
                onOpenJobRecommend={handleOpenJobRecommend}
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
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                subMenu={aiSubMenu}
                onNavigateHome={() => handleNavigate('home')}
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
                onOpenMentorExplore={() => handleNavigate('mentor')}
                onOpenMentorSearch={() =>
                  handleOpenMentorSearch('모의면접에 맞는 멘토 추천해줘', { fromInterview: true })
                }
              />
            ) : page === 'interview-onboarding' ? (
              <InterviewOnboardingPage
                onBack={handleBackFromInterviewOnboarding}
                onNext={() => setPage('interview-analyze')}
                onOpenMentorDetail={handleOpenMentorDetail}
              />
            ) : page === 'interview-analyze' ? (
              <InterviewAnalyzePage
                onComplete={() => {
                  setIsSubMenuOpen(false);
                  setPage('interview-normal');
                }}
              />
            ) : page === 'interview-normal' ? (
              <InterviewNormalPage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                onStartInterview={() => {
                  setIsSubMenuOpen(false);
                  setPage('interview-session');
                }}
              />
            ) : page === 'interview-session' ? (
              <InterviewSessionPage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                onStopInterview={() => {
                  setIsSubMenuOpen(false);
                  setPage('interview');
                }}
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
                onOpenAgentChat={handleOpenMentorChat}
                onOpenInterview={handleOpenInterviewOnboarding}
                onOpenCareerTalkDetail={handleOpenCareerTalkDetail}
                onOpenQnaDetail={handleOpenQnaDetail}
              />
            ) : page === 'careertalk-detail' ? (
              careerTalkArticleId === 'yoonie' ? (
                <CareerTalkDetailYoonie
                  onBack={handleBackFromCareerTalkDetail}
                  onOpenMentorChat={handleOpenMentorChat}
                  onOpenMentorDetail={handleOpenMentorDetail}
                />
              ) : (
                <CareerTalkDetail onBack={handleBackFromCareerTalkDetail} />
              )
            ) : page === 'qna-detail' ? (
              qnaArticleId === 'failed' ? (
                <QnaDetailFailedProject onOpenMentorChat={handleOpenMentorChat} onOpenMentorDetail={handleOpenMentorDetail} />
              ) : (
                <QnaDetailQualQuant onOpenMentorChat={handleOpenMentorChat} />
              )
            ) : page === 'freetalk-detail' ? (
              <BoardFreeTalkDetail />
            ) : page === 'board-write' ? (
              <BoardWrite defaultCategory={writeCategory} onSubmit={handleSubmitWrite} />
            ) : page === 'mypage-profile' ? (
              <MyPageProfileEdit onSave={handleBackFromMyPageProfile} />
            ) : page === 'mypage' ? (
              <MyPage
                myPageTab={myPageTab}
                onMyPageTabChange={setMyPageTab}
                insightTab={insightTab}
                onInsightTabChange={setInsightTab}
                onEditProfile={handleOpenMyPageProfile}
                onOpenMentorDetail={handleOpenMentorDetail}
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
                onOpenMentitAI={() => handleNavigate('ai')}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
