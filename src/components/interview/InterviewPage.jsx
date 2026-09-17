import ChatStartScreen from '../chat/ChatStartScreen';
import InterviewSubMenu from './InterviewSubMenu';

export default function InterviewPage({
  onOpenMentorExplore,
  onOpenMentorSearch,
  isSubMenuOpen = false,
  onCloseSubMenu,
  activeMentor = 'Sunny',
  onSelectMentor,
}) {
  return (
    <div className="flex items-stretch gap-5 flex-1 min-h-0 h-full w-full overflow-hidden">
      {isSubMenuOpen && (
        <InterviewSubMenu onClose={onCloseSubMenu} activeMentor={activeMentor} onSelectMentor={onSelectMentor} />
      )}
      <ChatStartScreen
        greeting="윤영님, 모의면접을 시작해볼까요?"
        onOpenMentorExplore={onOpenMentorExplore}
        onOpenMentorSearch={onOpenMentorSearch}
      />
    </div>
  );
}
