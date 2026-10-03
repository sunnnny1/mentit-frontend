import { useEffect, useMemo, useRef, useState } from 'react';

import imgChevronDown from '../../assets/figma/f8febec3-4d51-48c7-8360-5b05675e4744.svg';
import imgChevronRight from '../../assets/icons/chevron-right.svg';
import imgBookmarkFill from '../../assets/figma/b20bcd72-0b9e-4707-8bd9-b80aa3f1fae3.svg';
import imgBookmarkOutline from '../../assets/figma/5972d921-320c-4f23-ae3c-9781e5c4d1f1.svg';
import imgCareerYoonie from '../../assets/figma/9f8b2245-96d6-4a5a-b781-47ccca5a60e6.png';
import imgCareerSunny from '../../assets/figma/51ba9a82-9ebd-49ab-b34d-0085621101d1.png';
import imgCareerUha from '../../assets/figma/1fe4470f-d393-4fb9-bfd3-fe093b843f3b.png';
import imgCareerStella from '../../assets/figma/1bd879c7-c846-47ea-9853-45130c711592.png';
import imgCareerDaisy from '../../assets/figma/42e8dda3-b48d-4178-aa56-943f81e0bc58.png';
import imgCareerPeter from '../../assets/figma/444c9d7b-ee5e-436b-b8c4-9cd4b605267e.png';
import imgQnAChart from '../../assets/figma/1b3dbdd6-5f71-4a86-9f8e-a513d2cf4763.png';
import imgWireframe from '../../assets/figma/d47118a4-9707-403e-bdc8-88b3a5f6c7b0.png';
import imgGangsterPost from '../../assets/icons/gangsterImg.png';
import imgBehance from '../../assets/figma/4ca3a1c1-b478-4b2f-82a4-906fb08aa942.png';
import imgKiki from '../../assets/figma/7b7f5ec8-080d-4da2-9a4e-ca50dce927a3.png';
import imgFreeExtra1 from '../../assets/figma/2422592b-dc90-4757-a47c-729af233e3f3.png';
import imgFreeExtra2 from '../../assets/figma/eb30e4b4-fadd-47b1-8bfa-2b0efb88a62d.png';
import imgFreeExtra3 from '../../assets/figma/09c05f5c-4273-4198-a4ed-e9f4c000e9a2.png';

const CAREER_TALKS = [
  {
    id: 'career-yoonie',
    title: 'AI 시대의 프로덕트 디자인 활용 팁',
    subtitle: 'Yoonie 멘토・프로덕트 디자이너',
    image: imgCareerYoonie,
    hasDetail: true,
    articleId: 'yoonie',
  },
  {
    id: 'career-sunny',
    title: '면접 볼 때 이것만은 하지 마세요!',
    subtitle: 'Sunny 멘토・UX 디자이너',
    image: imgCareerSunny,
  },
  {
    id: 'career-uha',
    title: '에이전틱 AI 제품을 만들 때 참고할 점',
    subtitle: 'U.ha 멘토・프로덕트 디자이너',
    image: imgCareerUha,
    hasDetail: true,
    articleId: 'uha',
  },
  {
    id: 'career-stella',
    title: '유저 리서치할 때 주의해야 할 점',
    subtitle: 'Stella 멘토・UX 디자이너',
    image: imgCareerStella,
  },
  {
    id: 'career-daisy',
    title: 'UXUI, 반드시 알아야 할 데이터 읽는 법',
    subtitle: 'Dasiy 멘토・프로덕트 디자이너',
    image: imgCareerDaisy,
  },
  {
    id: 'career-peter',
    title: '인터뷰 스크립트 짜는 법',
    subtitle: 'Peter 멘토・UX 디자이너',
    image: imgCareerPeter,
  },
];

const QNA_POSTS = [
  {
    id: 'qna-failed',
    title: '포트폴리오에 실패한 프로젝트도 넣어도 될까요?',
    body: '실패한 프로젝트를 잘 풀어낼지, 아니면 과감하게 빼고 성공한 프로젝트만 넣어서 구성할지 고민입니다. 넣으면 오히려 감점 요소가 될까요? 너무 고민이에요.',
    bookmarks: 32,
    image: imgQnAChart,
    articleId: 'failed',
    board: 'qna',
  },
  {
    id: 'qna-why-design',
    title: '“왜 이 디자인을 선택했나요?”라는 질문에는 어떻게 답해야 하나요?',
    body: '면접에서 디자인 선택 이유를 설명할 때, 단순히 사용자 니즈와 디자인 의도만 이야기하면 되는지 궁금해요. 여러 디자인안 중 최종안을 선택한 과정이나 그때 고려했던 사용자 경험, 데이터, 비즈니스 목표 등을 함께 설명하는 것이 좋을까요? 실제 면접에서는 어느 정도까지 구체적으로 이야기해야 설득력 있게 전달할 수 있을지도 궁금합니다.',
    bookmarks: 102,
    board: 'qna',
  },
  {
    id: 'qna-a11y',
    title: '접근성까지 신경 쓴 포트폴리오, 신입한테도 기대하시나요?',
    body: '최근 접근성이 중요하다는 이야기를 여러 번 들어서 찾아보고는 있는데, 색 대비나 스크린 리더 대응 같은 걸 실제로 프로젝트에 적용해본 적은 없어요. 시간에 쫓기다 보니 우선순위에서 계속 밀리는 부분이기도 하고요. 신입 지원자한테도 이런 접근성 고려 사례를 기대하시는지, 아니면 입사 후에 배워도 괜찮은 영역인지 궁금합니다.',
    bookmarks: 102,
    board: 'qna',
  },
  {
    id: 'qna-ut',
    title: '사용성 테스트(UT) 참가자를 구하기 힘든데, 어떻게 하셨나요?',
    body: '학교 프로젝트로 UT를 진행하려고 하는데, 실제 타겟 유저를 구하기가 생각보다 훨씬 어려웠어요. 결국 지인이나 학교 동기 몇 명한테 부탁해서 5명 정도로 진행했는데, 표본이 너무 적고 실제 타겟과도 안 맞아서 이 데이터를 포트폴리오에 그대로 써도 되는지 걱정이 됩니다. 현직에서는 신입 때 이런 제약을 어떻게 극복하셨는지 궁금해요.',
    bookmarks: 48,
    board: 'qna',
  },
  {
    id: 'qna-wireframe',
    title: '신입 면접에서 그 자리에서 와이어프레임 그려보라고 하면 어떻게 대응하나요?',
    body: '라이브 과제나 화이트보드 테스트가 있다는 얘기를 들었는데, 시간 안에 논리적으로 구조를 짜는 연습을 어떻게 해야 할지 감이 안 잡혀요.',
    bookmarks: 39,
    image: imgWireframe,
    board: 'qna',
  },
  {
    id: 'qna-system',
    title: '디자인 시스템 경험이 꼭 있어야하나요?',
    body: '채용 공고에 디자인 시스템 구축·운영 경험을 우대한다고 적힌 곳이 많은데, 개인 프로젝트에서는 이런 경험을 쌓기가 어려워서 고민이에요. 어떻게 준비하면 좋을까요?',
    bookmarks: 42,
    board: 'qna',
  },
];

const FREE_POSTS = [
  {
    id: 'free-gangster',
    title: '드디어 1차 서류 통과했어ㅠ',
    body: '서류 통과는 취준하면서 처음인데 여기서 포폴이랑 자소서 피드백 받았었거든? 확실히 도움이 된듯.. 아직 면접 남았지만, 잠시만 이 행복을 즐기려고~ 다들 기 받아가!! 참 나는 Yoonie 멘토한테 포폴이랑 자소서 피드백 받았어!! 모의면접도 여기서 볼 수 있길래 면접도 준비하면서 최종 합격만 노린다...',
    bookmarks: 102,
    image: imgGangsterPost,
    articleId: 'gangster',
    board: 'freetalk',
  },
  {
    id: 'free-routine',
    title: '취준 N개월차, 다들 하루 루틴 어떻게 잡으세요?',
    body: '회사를 안 다니니까 하루가 뭉개지는 느낌이에요. 포폴 작업한다고 앉아있는데 집중은 안 되고 시간만 가고...\n다들 어떻게 하루를 계획하시는지 궁금해요.',
    bookmarks: 102,
    board: 'freetalk',
  },
  {
    id: 'free-behance',
    title: '비핸스에 포폴 올렸는데 보고 피드백 줄 사람?!',
    body: '드디어 포폴 1차 완성해서 비핸스에 올렸어요! 근데 계속 혼자 보다 보니까 뭐가 문제인지도 모르겠고 감이 없어지더라고요.. 편하게 훑어보고 솔직한 의견 주실 분 계시면 댓글 남겨주세요. 저도 다른 분들 포폴 봐드릴게요!',
    bookmarks: 102,
    image: imgBehance,
    board: 'freetalk',
  },
  {
    id: 'free-kiki',
    title: 'UX 리서치 스터디 같이 하실 분 구해요(주1회, 온라인)',
    body: '매주 토요일 오전에 온라인으로 모여서 케이스 스터디 발표하고 서로 피드백 주고받는 스터디 구합니다.\n성실하게 임하지 않는 사람은 신청하지 않았으면 합니다.. 정말 진심으로 열시히 스터디 참여할 사람만 댓글 달아주세요!',
    bookmarks: 32,
    image: imgKiki,
    board: 'freetalk',
  },
  {
    id: 'free-aionue',
    title: '포트폴리오 30번은 갈아엎은 것 같아요,,ㅎ 이게 맞나 싶네요',
    body: '계속 리서치부터 다시 정리하고, 스토리라인 바꾸고, 또 갈아엎고... 벌써 몇 번째인지 모르겠어요. 다른 분들도 포폴 완성까지 이 정도로 오래 걸리셨나요? 저만 유독 느린 건가 싶어서 조금 지치네요...ㅜㅜ',
    bookmarks: 28,
    articleId: 'aionue',
    board: 'freetalk',
  },
  {
    id: 'free-reject',
    title: '서류 탈락만 반복 중인데 포폴을 바꿔야 할까요?',
    body: '완전 부럽다ㅠㅠㅠ 나는 계속 서탈중.. 얼른 포폴 완성해서 피드백 받아봐야겠다.. 축하해~',
    bookmarks: 24,
    image: imgFreeExtra1,
    board: 'freetalk',
  },
  {
    id: 'free-intern',
    title: '멘토 피드백 받고 인턴 합격했어요',
    body: '나도 Yoonie 멘토한테 피드백 받고 인턴 합격했었어~ 뭔가 반갑다ㅎㅎ',
    bookmarks: 21,
    image: imgFreeExtra2,
    board: 'freetalk',
  },
  {
    id: 'free-resume',
    title: '자소서도 같이 피드백 받은 거야?',
    body: '자소서도 같이 피드백 받은 거야? 포폴이랑 같이 보니까 더 도움이 됐는지 궁금해!',
    bookmarks: 18,
    image: imgFreeExtra3,
    board: 'freetalk',
  },
];

function BookmarkIcon({ filled = true, size = 20, color = '#9CA2B1' }) {
  const src = filled ? imgBookmarkFill : imgBookmarkOutline;
  return (
    <span
      aria-hidden
      className="block"
      style={{
        width: size,
        height: size,
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        backgroundColor: color,
      }}
    />
  );
}

function MoreButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-[#e7eaee] rounded-lg pl-3 pr-4 py-2 w-full flex items-center justify-center gap-1 cursor-pointer"
    >
      <img alt="" src={imgChevronDown} className="size-6" />
      <span className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886] whitespace-nowrap">더보기</span>
    </button>
  );
}

function BoardLink({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-0.5 shrink-0 cursor-pointer">
      <span className="font-medium text-[14px] leading-[1.42] tracking-[0.14px] text-[#9ca2b1] whitespace-nowrap">게시판 보러가기</span>
      <img alt="" src={imgChevronRight} className="size-6" />
    </button>
  );
}

function CareerTalkCard({ talk, filled = true, onOpenDetail, onUnbookmark }) {
  return (
    <article
      className={`bg-white border border-[#e7eaee] rounded-2xl pt-1 px-1 pb-4 flex flex-col gap-6 w-full ${
        talk.hasDetail ? 'cursor-pointer' : ''
      }`}
      onClick={talk.hasDetail ? () => onOpenDetail?.(talk.articleId) : undefined}
      role={talk.hasDetail ? 'button' : undefined}
    >
      <div className="relative w-full h-[219px] rounded-xl overflow-hidden shrink-0">
        <img alt="" src={talk.image} className="absolute inset-0 size-full object-cover" />
        <div className="absolute top-0 right-0 p-2.5">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onUnbookmark(talk.id);
            }}
            className="flex items-center justify-center size-6 cursor-pointer"
            aria-label="북마크 취소"
          >
            <BookmarkIcon filled={filled} size={24} color="#FFFFFF" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-3 w-full">
        <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] w-full">{talk.title}</p>
        <p className="font-normal text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886] w-full">{talk.subtitle}</p>
      </div>
    </article>
  );
}

function PostCard({ post, filled = true, onUnbookmark, onOpenBoard }) {
  return (
    <article className="border border-[#e7eaee] rounded-2xl px-4 py-5 flex flex-col gap-5 w-full overflow-hidden">
      <div className="flex gap-5 items-start w-full">
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <p className="font-bold text-[16px] leading-[1.45] text-[#121213]">{post.title}</p>
          <p className="text-[15px] leading-[1.6] text-[#121213] line-clamp-3 whitespace-pre-wrap">{post.body}</p>
        </div>
        {post.image && (
          <img alt="" src={post.image} className="shrink-0 w-[220px] h-[123px] object-cover rounded-2xl" />
        )}
      </div>
      <div className="flex gap-5 items-center w-full">
        <button
          type="button"
          onClick={() => onUnbookmark(post.id)}
          className="flex items-center gap-1 cursor-pointer"
          aria-label="북마크 취소"
        >
          <BookmarkIcon filled={filled} />
          <span className="text-[13px] leading-[1.4] tracking-[0.26px] text-[#121213]">{post.bookmarks}</span>
        </button>
        <div className="flex-1" />
        <BoardLink
          onClick={() =>
            onOpenBoard?.({
              category: post.board,
              articleId: post.articleId,
            })
          }
        />
      </div>
    </article>
  );
}

function BookmarkSection({ title, count, items, preview, expandBy, expanded, onExpand, renderItem }) {
  if (items.length === 0) return null;
  const limit = expanded ? (expandBy ? preview + expandBy : items.length) : preview;
  const visible = items.slice(0, limit);
  const canExpand = !expanded && items.length > preview;

  return (
    <section className="flex flex-col gap-6 items-start w-full">
      <h2 className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213] w-full">
        {title} ({count})
      </h2>
      <div className="flex flex-col gap-5 items-start w-full">
        {renderItem(visible)}
        {canExpand && <MoreButton onClick={onExpand} />}
      </div>
    </section>
  );
}

export default function MyPageBookmark({
  onOpenCareerTalkDetail,
  onOpenQnaDetail,
  onOpenFreeTalkDetail,
  onOpenBoard,
}) {
  const [hidden, setHidden] = useState(() => new Set());
  const [leaving, setLeaving] = useState(() => new Set());
  const leaveTimers = useRef(new Map());
  const [expanded, setExpanded] = useState({ career: false, qna: false, free: false });

  useEffect(() => () => {
    leaveTimers.current.forEach(clearTimeout);
  }, []);

  const unbookmark = (id) => {
    if (leaveTimers.current.has(id)) return;
    setLeaving((prev) => new Set(prev).add(id));
    const timer = setTimeout(() => {
      setHidden((prev) => new Set(prev).add(id));
      setLeaving((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      leaveTimers.current.delete(id);
    }, 450);
    leaveTimers.current.set(id, timer);
  };

  const openBoard = ({ category, articleId } = {}) => {
    if (articleId) {
      if (category === 'freetalk') onOpenFreeTalkDetail?.(articleId);
      else if (category === 'careertalk') onOpenCareerTalkDetail?.(articleId);
      else onOpenQnaDetail?.(articleId);
      return;
    }
    onOpenBoard?.(category ?? 'qna');
  };

  const career = useMemo(() => CAREER_TALKS.filter((item) => !hidden.has(item.id)), [hidden]);
  const qna = useMemo(() => QNA_POSTS.filter((item) => !hidden.has(item.id)), [hidden]);
  const free = useMemo(() => FREE_POSTS.filter((item) => !hidden.has(item.id)), [hidden]);
  const empty = career.length + qna.length + free.length === 0;

  return (
    <div className="pt-10 pb-16 w-full flex flex-col gap-10">
      {empty ? (
        <p className="text-[15px] leading-[1.6] text-[#747886]">북마크한 글이 없어요.</p>
      ) : (
        <>
          <BookmarkSection
            title="커리어토크"
            count={career.length}
            items={career}
            preview={4}
            expandBy={2}
            expanded={expanded.career}
            onExpand={() => setExpanded((prev) => ({ ...prev, career: true }))}
            renderItem={(items) => (
              <div className="grid grid-cols-2 gap-5 w-full">
                {items.map((talk) => (
                  <CareerTalkCard
                    key={talk.id}
                    talk={talk}
                    filled={!leaving.has(talk.id)}
                    onOpenDetail={onOpenCareerTalkDetail}
                    onUnbookmark={unbookmark}
                  />
                ))}
              </div>
            )}
          />
          <BookmarkSection
            title="Q&A"
            count={qna.length}
            items={qna}
            preview={3}
            expanded={expanded.qna}
            onExpand={() => setExpanded((prev) => ({ ...prev, qna: true }))}
            renderItem={(items) =>
              items.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  filled={!leaving.has(post.id)}
                  onUnbookmark={unbookmark}
                  onOpenBoard={openBoard}
                />
              ))
            }
          />
          <BookmarkSection
            title="프리토크"
            count={free.length}
            items={free}
            preview={3}
            expanded={expanded.free}
            onExpand={() => setExpanded((prev) => ({ ...prev, free: true }))}
            renderItem={(items) =>
              items.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  filled={!leaving.has(post.id)}
                  onUnbookmark={unbookmark}
                  onOpenBoard={openBoard}
                />
              ))
            }
          />
        </>
      )}
    </div>
  );
}
