import { useState } from 'react';
import ChatSubMenu from './ChatSubMenu';
import ChatProfileBar from './ChatProfileBar';
import ChatAgentPanel from './ChatAgentPanel';
import ChatThread from './ChatThread';
import ChatMentorThread from './ChatMentorThread';
import ChatReview from './ChatReview';

const QA_MAP = {
  '저에게 맞는 직무를 어떻게 선택해야할까요?': {
    text: "저도 처음엔 여러 직무 사이에서 고민 많이 했어요. 좋아하는 일보다 '어떤 문제를 풀 때 몰입이 되는지'를 먼저 봐보세요. 예를 들어 사용자 리서치하고 인사이트 뽑는 과정이 재밌다면 UX 리서처/기획 쪽이, 화면을 다듬고 완성도를 높이는 게 즐겁다면 UI/비주얼 디자인 쪽이 더 잘 맞을 확률이 높아요. 직무별 채용공고 3~5개씩 읽어보면서 '이 업무들, 해보고 싶다'는 느낌이 드는 쪽을 골라보는 것도 좋은 방법이에요.",
  },
  '최근 채용 트렌드가 어떻게 되나요?': {
    text: "요즘은 신입이어도 '왜 이렇게 설계했는지' 논리적으로 설명할 수 있는지를 많이 봐요. 포트폴리오 장수보다 의사결정 과정이 드러나는 케이스 스터디를 선호하는 흐름이고, AI 툴 활용 능력도 플러스 요인으로 보는 곳이 늘고 있어요. 다만 회사마다 편차가 커서, 지원하려는 회사의 최근 채용공고 문구나 현직자 인터뷰를 참고하는 게 가장 정확해요.",
  },
  '취준생이 가장 자주 하는 실수는 무엇인가요?': {
    text: "가장 많이 보이는 실수는 포트폴리오에 '결과'만 나열하고 '왜 그 선택을 했는지'가 빠지는 거예요. 그리고 하나의 포트폴리오로 여러 회사에 동일하게 지원하는 경우도 많은데, 회사마다 강조하는 역량이 달라서 최소한 첫 페이지 정도는 지원하는 회사에 맞게 조정하는 걸 추천드려요.",
  },
  '프로덕트 디자이너에 지원하려고 하는데 포트폴리오 몇 장 정도가 적당한가요?': {
    text: 'Yoonie 멘토님의 실제 사례 기반으로 답변드리면, 2020년 당근 지원 당시 포트폴리오는 4개 프로젝트, 총 18장으로 구성하셨어요. 페이지 수보다 "각 프로젝트에서 왜 이 결정을 했는지"가 명확히 보이는가를 더 중요하게 보셨대요.\n\n그리고 채용 검토 경험으로는, 작년 당근 프로덕트 디자이너 신입 채용 당시 평균적으로 3~4개 프로젝트, 15~20장 내외로 구성한 지원자가 다수였다고 하셨어요.',
    citation: 'Yoonie 멘토 실제 지원 이력 1건, 신입 채용 서류 검토 경험 기반',
    ctaText: '포트폴리오 피드백 받으러 가기',
  },
};

const DEFAULT_ANSWER = { text: '아직 학습 중이에요. 조금 더 구체적으로 다시 질문해주시겠어요?' };

export default function ChatPage({ isSubMenuOpen = true, onCloseSubMenu, onNavigateHome }) {
  const [showAgent, setShowAgent] = useState(true);
  const [chatMode, setChatMode] = useState('agent'); // 'agent' | 'mentor' | 'review'
  const [activeMentor, setActiveMentor] = useState('Yoonie');
  const [messages, setMessages] = useState([]);

  const handleSend = (userText) => {
    const value = userText.trim();
    if (!value) return;
    const answer = QA_MAP[value] ?? DEFAULT_ANSWER;
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: value },
      { role: 'mentor', text: answer.text, citation: answer.citation, ctaText: answer.ctaText },
    ]);
  };

  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && (
        <ChatSubMenu
          onClose={onCloseSubMenu}
          activeMentor={activeMentor}
          onSelectMentor={setActiveMentor}
        />
      )}

      <section className="flex-1 min-w-0 min-h-0 flex flex-col rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-hidden">
        <ChatProfileBar
          mode={chatMode}
          onStartMentorChat={() => setChatMode('mentor')}
          onStartReview={() => setChatMode('review')}
          onSubmitReview={onNavigateHome}
        />
        <div className="h-px w-full shrink-0 bg-[#e7eaee]" />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {chatMode === 'review' ? (
            <ChatReview />
          ) : chatMode === 'mentor' ? (
            <ChatMentorThread onBackToAgent={() => setChatMode('agent')} />
          ) : (
            <>
              {showAgent && (
                <ChatAgentPanel
                  isSubMenuOpen={isSubMenuOpen}
                  onClose={() => setShowAgent(false)}
                  hasStarted={messages.length > 0}
                />
              )}
              <ChatThread
                messages={messages}
                onSend={handleSend}
                showAgent={showAgent}
                onShowAgent={() => setShowAgent(true)}
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
