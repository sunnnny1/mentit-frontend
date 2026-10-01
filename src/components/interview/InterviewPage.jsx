import ChatStartScreen from '../chat/ChatStartScreen';
import InterviewSubMenu from './InterviewSubMenu';

export default function InterviewPage({
  onOpenMentorExplore,
  onOpenMentorSearch,
  isSubMenuOpen = false,
  onCloseSubMenu,
  activeMentor = 'Sunny',
  onSelectMentor,
  interviewTitle,
  showRecentInterviews = false,
  onFindMentor,
}) {
  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && (
        <InterviewSubMenu
          onClose={onCloseSubMenu}
          activeMentor={activeMentor}
          onSelectMentor={onSelectMentor}
          onFindMentor={onFindMentor}
          interviewTitle={interviewTitle}
          showRecentInterviews={showRecentInterviews}
        />
      )}
      <ChatStartScreen
        greeting="윤영님, 모의 면접을 시작해볼까요?"
        description={
          <>
            이곳에서 멘토의 AI 에이전트와 면접 연습을 하고 피드백을 받아볼 수 있어요.
            <br />
            원하는 멘토를 찾아 모의 면접을 시작해보세요!
          </>
        }
        onOpenMentorExplore={onOpenMentorExplore}
        onOpenMentorSearch={onOpenMentorSearch}
      />
    </div>
  );
}
