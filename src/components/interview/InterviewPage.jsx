import ChatStartScreen from '../chat/ChatStartScreen';

export default function InterviewPage({ onOpenMentorExplore, onOpenMentorSearch }) {
  return (
    <ChatStartScreen
      greeting="윤영님, 모의면접을 시작해볼까요?"
      onOpenMentorExplore={onOpenMentorExplore}
      onOpenMentorSearch={onOpenMentorSearch}
    />
  );
}
