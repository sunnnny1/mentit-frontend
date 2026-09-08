import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import PortfolioCard from './components/PortfolioCard';

function App() {
  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Header />
      <div className="flex items-start gap-5 px-5 pb-16">
        <Sidebar />
        <main className="flex-1 max-w-[1173px] mx-auto py-8">
          <div className="flex gap-5 items-start">
            <Hero />
            <PortfolioCard />
          </div>

          {/* TODO: 멘토 추천 / 멘토 커리어토크 / 맞춤 게시물 섹션 - 다음 단계에서 구현 */}
        </main>
      </div>
    </div>
  );
}

export default App;
