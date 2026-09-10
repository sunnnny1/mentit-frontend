import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import PortfolioCard from './components/PortfolioCard';
import MentorRecommendations from './components/MentorRecommendations';
import CareerTalk from './components/CareerTalk';
import PersonalizedPosts from './components/PersonalizedPosts';

function App() {
  return (
    <div className="h-screen overflow-hidden bg-[#fcfcfc] flex flex-col">
      <Header />
      <div className="flex items-start gap-5 px-5 pb-16 flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 max-w-[1173px] mx-auto pt-16 pb-16 px-5 flex flex-col gap-16 self-stretch min-h-0 overflow-y-auto">
          <div className="flex gap-5 items-start">
            <Hero />
            <PortfolioCard />
          </div>

          <MentorRecommendations />
          <CareerTalk />
          <PersonalizedPosts />
        </main>
      </div>
    </div>
  );
}

export default App;
