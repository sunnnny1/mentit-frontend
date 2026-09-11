import { useState } from 'react';

const imgPostImage = 'https://www.figma.com/api/mcp/asset/92b7d4f4-ca13-4e94-8eb4-2852eed4914a.png';
const imgLikeOutline = 'https://www.figma.com/api/mcp/asset/4f65e1a1-f7c6-4209-9aa8-6879d1fa3e3e.svg';
const imgLikeFill = 'https://www.figma.com/api/mcp/asset/f18f03a8-dbf0-4add-aa12-723afdd968d9.svg';
const imgBookmarkOutline = 'https://www.figma.com/api/mcp/asset/5972d921-320c-4f23-ae3c-9781e5c4d1f1.svg';
const imgBookmarkFill = 'https://www.figma.com/api/mcp/asset/b20bcd72-0b9e-4707-8bd9-b80aa3f1fae3.svg';
const imgShare = 'https://www.figma.com/api/mcp/asset/be913caa-33e4-4e4d-aa6a-2c39664f727d.svg';
const imgArrowReturn = 'https://www.figma.com/api/mcp/asset/17f9d712-2e3f-40ca-b059-cb541a5f2605.svg';

const imgMe = 'https://www.figma.com/api/mcp/asset/15f95135-06d0-42d1-acb7-c25ec37f0c79.png';
const imgGangsterSmall = 'https://www.figma.com/api/mcp/asset/7ee59a20-181b-4c78-a9dc-7529e2280caa.png';
const imgLuvuuu = 'https://www.figma.com/api/mcp/asset/8e56f4c4-d886-4676-8da7-c3f559d26e0b.png';
const imgAionue = 'https://www.figma.com/api/mcp/asset/8224da2a-a826-4578-a312-1fa0ae3a0040.png';
const imgHappy = 'https://www.figma.com/api/mcp/asset/d8a681b6-8c6d-4d08-80c4-bf1397223b5e.png';
const imgCoco = 'https://www.figma.com/api/mcp/asset/4f5d61de-2a6f-48f7-aad0-3c057b7b0bf4.png';
const imgMumumu = 'https://www.figma.com/api/mcp/asset/1c874779-782f-4eb9-96cd-63540102866d.png';

const TAGS = ['#프로덕트디자인', '#프리토크', '#취준'];

const COMMENTS = [
  { id: 'luvuuu', name: 'luvuuu', avatar: imgLuvuuu, text: '헐! 진짜 축하해!!! 꼭 면접까지 합격하길!!!!', reply: false },
  { id: 'aionue', name: 'AIONUE', avatar: imgAionue, text: '혹시 어떤 멘토분께 피드백 받았는지 알 수 있을까??', reply: false },
  { id: 'happy', name: 'happy', avatar: imgHappy, text: '나도 궁금해!!', reply: true },
  {
    id: 'gangster-reply',
    name: 'Gangster',
    avatar: imgGangsterSmall,
    text: 'Yoonie 멘토분께 받았어!! UX 리서치부터 데이터 분석, 디자인 시스템까지 집중적으로 답변해주셔서 특히 좋았던 것 같아!! 완전 추천해!',
    reply: true,
    writer: true,
  },
  { id: 'coco', name: 'Coco', avatar: imgCoco, text: '완전 부럽다ㅠㅠㅠ 나는 계속 서탈중.. 얼른 포폴 완성해서 피드백 받아봐야겠다.. 축하해~', reply: false },
  { id: 'mumumu', name: 'mumumu', avatar: imgMumumu, text: '나도 Yoonie 멘토한테 피드백 받고 인턴 합격했었어~ 뭔가 반갑다ㅎㅎ', reply: false },
];

export default function BoardFreeTalkDetail() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comments, setComments] = useState(COMMENTS);
  const [draft, setDraft] = useState('');
  const commentCount = 12 + (comments.length - COMMENTS.length);

  const handleSubmitComment = () => {
    const text = draft.trim();
    if (!text) return;
    setComments((prev) => [{ id: `me-${Date.now()}`, name: 'Yunn00', avatar: imgMe, text, reply: false }, ...prev]);
    setDraft('');
  };

  return (
    <section className="flex-1 min-w-0 min-h-0 rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-y-auto">
      <div className="max-w-[819px] mx-auto py-16 px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-[25px] leading-[1.4] tracking-[-0.5px] text-[#121213]">
            드디어 1차 서류 통과했어ㅠ
          </h1>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="bg-[#f4f6f8] px-2 py-1 rounded-lg text-[13px] font-medium leading-[1.4] tracking-[0.26px] text-[#747886]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-10 w-full">
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <img alt="" src={imgGangsterSmall} className="size-[42px] rounded-full object-cover shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">Gangster</p>
              <p className="text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886]">프로덕트 디자인 외 1개</p>
            </div>
          </div>
          <p className="shrink-0 text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886] whitespace-nowrap">
            2026년 08월 14일
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-10">
            <img alt="" src={imgPostImage} className="w-full aspect-[246/138] object-cover rounded-2xl" />
            <p className="text-[15px] leading-[1.6] text-[#121213] whitespace-pre-wrap">
              {'서류 통과는 취준하면서 처음인데 여기서 포폴이랑 자소서 피드백 받았었거든? 확실히 도움이 된듯..\n아직 면접 남았지만, 잠시만 이 행복을 즐기려고~ 다들 기 받아가!!'}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              className="flex items-center gap-1 cursor-pointer"
              aria-pressed={liked}
            >
              {liked ? (
                <span
                  aria-hidden
                  className="block size-6"
                  style={{
                    WebkitMaskImage: `url("${imgLikeFill}")`,
                    maskImage: `url("${imgLikeFill}")`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    backgroundColor: '#9CA2B1',
                  }}
                />
              ) : (
                <img alt="좋아요" src={imgLikeOutline} className="size-6" />
              )}
              <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">{liked ? 103 : 102}</span>
            </button>
            <button
              type="button"
              onClick={() => setBookmarked((v) => !v)}
              className="flex items-center gap-1 cursor-pointer"
              aria-pressed={bookmarked}
            >
              {bookmarked ? (
                <span
                  aria-hidden
                  className="block size-6"
                  style={{
                    WebkitMaskImage: `url("${imgBookmarkFill}")`,
                    maskImage: `url("${imgBookmarkFill}")`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    backgroundColor: '#9CA2B1',
                  }}
                />
              ) : (
                <img alt="북마크" src={imgBookmarkOutline} className="size-6" />
              )}
              <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">{bookmarked ? 88 : 87}</span>
            </button>
            <div className="flex items-center gap-1">
              <img alt="공유" src={imgShare} className="size-6" />
              <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">24</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-[#e7eaee] w-full" />

        <div className="flex flex-col gap-10 w-full">
          <p className="text-[16px] leading-[1.45] font-medium text-[#121213]">댓글 {commentCount}개</p>

          <div className="flex flex-col gap-3 w-full min-h-[200px]">
            <div className="flex items-center gap-2">
              <img alt="" src={imgMe} className="size-8 rounded-full object-cover shrink-0" />
              <p className="text-[15px] leading-[1.45] text-[#121213]">Yunn00</p>
            </div>
            <div className="flex-1 border border-[#e7eaee] rounded-xl px-5 py-3 flex flex-col justify-between gap-3 w-full">
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value.slice(0, 2000))}
                placeholder="댓글을 입력해주세요"
                rows={2}
                className="flex-1 w-full resize-none text-[15px] leading-[1.6] text-[#121213] placeholder:text-[#9ca2b1] outline-none bg-transparent"
              />
              <div className="flex items-center justify-between w-full">
                <span className="text-[12px] tracking-[0.3px] text-[#747886]">{draft.length}/2000</span>
                <button
                  type="button"
                  onClick={handleSubmitComment}
                  disabled={!draft.trim()}
                  className={`font-bold text-[16px] leading-[1.45] cursor-pointer ${
                    draft.trim() ? 'text-[#1a75ff]' : 'text-[#9ca2b1] cursor-not-allowed'
                  }`}
                >
                  댓글 남기기
                </button>
              </div>
            </div>
            <p className="text-[12px] tracking-[0.3px] text-[#9ca2b1]">댓글을 등록하면 수정이나 삭제할 수 없어요</p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            {comments.map((comment) => (
              <div key={comment.id} className={comment.reply ? 'flex items-start gap-2 pl-5' : 'w-full'}>
                {comment.reply && <img alt="" src={imgArrowReturn} className="size-6 shrink-0" />}
                <div className="bg-[#f9fafb] rounded-2xl p-4 w-full flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <img alt="" src={comment.avatar} className="size-8 rounded-full object-cover shrink-0" />
                    <p className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">{comment.name}</p>
                    {comment.writer && (
                      <span className="relative flex items-center justify-center px-2 py-1 rounded-lg shrink-0">
                        <span className="absolute inset-0 bg-[#747886] opacity-10 rounded-lg" />
                        <span className="relative text-[10px] tracking-[0.25px] text-[#747886]">글쓴이</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[15px] leading-[1.6] text-[#121213] whitespace-pre-wrap">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
