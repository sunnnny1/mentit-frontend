import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import PortfolioCard from './components/PortfolioCard';
import MentorRecommendations from './components/MentorRecommendations';
import CareerTalk from './components/CareerTalk';
import PersonalizedPosts from './components/PersonalizedPosts';
import ChatPage from './components/chat/ChatPage';

function HomeMain() {
  return (
    <main className="flex-1 max-w-[1173px] mx-auto pt-16 pb-16 px-5 flex flex-col gap-16 self-stretch min-h-0 overflow-y-auto">
      <div className="flex gap-5 items-start">
        <Hero />
        <PortfolioCard />
      </div>

      <MentorRecommendations />
      <CareerTalk />
      <PersonalizedPosts />
    </main>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(true);

  const handleNavigate = (next) => {
    setPage(next);
    if (next !== 'chat') setIsSubMenuOpen(true);
  };

  return (
    <div className="h-dvh max-h-dvh overflow-hidden bg-[#fcfcfc] flex flex-col">
      <Header showStreak={page !== 'chat'} />
      <div
        className={`flex items-stretch gap-5 px-5 flex-1 min-h-0 overflow-hidden ${
          page === 'chat' ? 'pb-5' : 'pb-16'
        }`}
      >
        <Sidebar
          activeItem={page}
          onNavigate={handleNavigate}
          showChatBarToggle={page === 'chat' && !isSubMenuOpen}
          onOpenChatBar={() => setIsSubMenuOpen(true)}
        />
        {page === 'chat' ? (
          <ChatPage
            isSubMenuOpen={isSubMenuOpen}
            onCloseSubMenu={() => setIsSubMenuOpen(false)}
            onNavigateHome={() => handleNavigate('home')}
          />
        ) : (
          <HomeMain />
        )}
      </div>
    </div>
  );
}

export default App;
