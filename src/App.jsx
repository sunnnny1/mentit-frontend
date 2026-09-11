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

function HomeMain({ onNavigateToCareerTalk, onOpenCareerTalkDetail, onOpenQnaDetail }) {
  return (
    <main className="flex-1 max-w-[1173px] mx-auto pt-16 pb-16 px-5 flex flex-col gap-16 self-stretch min-h-0 overflow-y-auto">
      <div className="flex gap-5 items-start">
        <Hero />
        <PortfolioCard />
      </div>

      <MentorRecommendations />
      <CareerTalk onNavigateToCareerTalk={onNavigateToCareerTalk} onOpenDetail={onOpenCareerTalkDetail} />
      <PersonalizedPosts onOpenQnaDetail={onOpenQnaDetail} />
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

  const handleNavigate = (next) => {
    setPage(next);
    if (next === 'board') setBoardCategory('all');
    if (next !== 'chat' && next !== 'board') setIsSubMenuOpen(true);
  };

  const handleNavigateToCareerTalk = () => {
    setPage('board');
    setBoardCategory('careertalk');
  };

  const handleOpenCareerTalkDetail = (articleId = 'uha') => {
    setCareerTalkArticleId(articleId);
    setPage('careertalk-detail');
  };

  const handleOpenMentorChat = () => {
    setPage('chat');
    setIsSubMenuOpen(false);
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

  const isBoardDetail = page === 'careertalk-detail' || page === 'qna-detail';

  return (
    <div className="h-dvh max-h-dvh overflow-hidden bg-[#fcfcfc] flex flex-col">
      <Header
        showStreak={page !== 'chat' && page !== 'search' && page !== 'board' && !isBoardDetail}
        onBack={
          page === 'careertalk-detail'
            ? handleBackFromCareerTalkDetail
            : page === 'qna-detail'
              ? handleBackFromQnaDetail
              : undefined
        }
        onSearchClick={() => {
          setPreviousPage((prev) => (page === 'search' ? prev : page));
          setPage('search');
        }}
      />
      <div
        className={`flex items-stretch gap-5 px-5 flex-1 min-h-0 overflow-hidden ${
          page === 'chat' || page === 'search' || page === 'board' || isBoardDetail ? 'pb-5' : 'pb-16'
        }`}
      >
        {page === 'search' ? (
          <SearchPage onClose={() => setPage(previousPage ?? 'home')} />
        ) : (
          <>
            <Sidebar
              activeItem={isBoardDetail ? 'board' : page}
              onNavigate={handleNavigate}
              showChatBarToggle={(page === 'chat' || page === 'board') && !isSubMenuOpen}
              onOpenChatBar={() => setIsSubMenuOpen(true)}
            />
            {page === 'chat' ? (
              <ChatPage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                onNavigateHome={() => handleNavigate('home')}
              />
            ) : page === 'careertalk-detail' ? (
              careerTalkArticleId === 'yoonie' ? (
                <CareerTalkDetailYoonie
                  onBack={handleBackFromCareerTalkDetail}
                  onOpenMentorChat={handleOpenMentorChat}
                />
              ) : (
                <CareerTalkDetail onBack={handleBackFromCareerTalkDetail} />
              )
            ) : page === 'qna-detail' ? (
              qnaArticleId === 'failed' ? (
                <QnaDetailFailedProject onOpenMentorChat={handleOpenMentorChat} />
              ) : (
                <QnaDetailQualQuant onOpenMentorChat={handleOpenMentorChat} />
              )
            ) : page === 'board' ? (
              <BoardPage
                isSubMenuOpen={isSubMenuOpen}
                onCloseSubMenu={() => setIsSubMenuOpen(false)}
                category={boardCategory}
                onCategoryChange={setBoardCategory}
                onNavigateToCareerTalk={handleNavigateToCareerTalk}
                onOpenCareerTalkDetail={handleOpenCareerTalkDetail}
                onOpenQnaDetail={handleOpenQnaDetail}
              />
            ) : (
              <HomeMain
                onNavigateToCareerTalk={handleNavigateToCareerTalk}
                onOpenCareerTalkDetail={handleOpenCareerTalkDetail}
                onOpenQnaDetail={handleOpenQnaDetail}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
