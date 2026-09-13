import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import PortfolioCard from './components/PortfolioCard';
import MentorRecommendations from './components/MentorRecommendations';
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
  const [chatSkipStart, setChatSkipStart] = useState(false);
  const [chatMentor, setChatMentor] = useState('Yoonie');

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
    setPage('chat');
    setIsSubMenuOpen(false);
    setChatSkipStart(true);
  };

  const handleOpenMentorDetail = (mentorName = 'Yoonie') => {
    if (mentorName !== 'Yoonie' && mentorName !== 'Yoonie 멘토') return;
    setPage('mentor-detail');
  };

  const handleBackFromMentorDetail = () => {
    setPage('mentor');
  };

  const handleOpenMentorSearch = (query = '멘토 추천') => {
    setMentorSearchQuery(query);
    setPage('ai-mentor-search');
  };

  const handleOpenPlan = () => {
    setPage('ai-plan');
  };

  const handleOpenJobRecommend = () => {
    setPage('ai-job');
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
        onSearchClick={() => {
          setPreviousPage((prev) => (page === 'search' ? prev : page));
          setPage('search');
        }}
      />
      <div className="flex items-stretch gap-5 px-5 flex-1 min-h-0 overflow-hidden pb-5">
        {page === 'search' ? (
          <SearchPage onClose={() => setPage(previousPage ?? 'home')} onOpenAgentChat={handleOpenMentorChat} />
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
                      : page
              }
              onNavigate={handleNavigate}
              showChatBarToggle={
                (page === 'chat' ||
                  page === 'board' ||
                  page === 'ai' ||
                  page === 'ai-mentor-search' ||
                  page === 'ai-plan' ||
                  page === 'ai-job') &&
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
              />
            ) : page === 'ai' ? (
              <MentitAiPage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                onOpenMentorSearch={handleOpenMentorSearch}
                onOpenPlan={handleOpenPlan}
                onOpenJobRecommend={handleOpenJobRecommend}
              />
            ) : page === 'ai-mentor-search' ? (
              <MentitAiMentorSearch
                query={mentorSearchQuery}
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                onOpenAgentChat={handleOpenMentorChat}
                onOpenMentorDetail={handleOpenMentorDetail}
              />
            ) : page === 'ai-plan' ? (
              <MentitAiCareerPlan
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                onNavigateHome={() => handleNavigate('home')}
              />
            ) : page === 'ai-job' ? (
              <MentitAiJobRecommend
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                onOpenCareerTalkDetail={handleOpenCareerTalkDetail}
              />
            ) : page === 'mentor' ? (
              <MentorExplorePage onOpenAgentChat={handleOpenMentorChat} onOpenMentorDetail={handleOpenMentorDetail} />
            ) : page === 'mentor-detail' ? (
              <MentorDetailPage
                onOpenAgentChat={handleOpenMentorChat}
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
