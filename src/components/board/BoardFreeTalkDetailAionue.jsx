import { useState } from 'react';

import img0sun222 from '../../assets/figma/5942258a-75fb-4146-b170-3f27653fe5e7.png';
import figma_4f65e1a1_f7c6_4209_9aa8_6879d1fa3e3e_svg from '../../assets/figma/4f65e1a1-f7c6-4209-9aa8-6879d1fa3e3e.svg';
import figma_f18f03a8_dbf0_4add_aa12_723afdd968d9_svg from '../../assets/figma/f18f03a8-dbf0-4add-aa12-723afdd968d9.svg';
import figma_5972d921_320c_4f23_ae3c_9781e5c4d1f1_svg from '../../assets/figma/5972d921-320c-4f23-ae3c-9781e5c4d1f1.svg';
import figma_b20bcd72_0b9e_4707_8bd9_b80aa3f1fae3_svg from '../../assets/figma/b20bcd72-0b9e-4707-8bd9-b80aa3f1fae3.svg';
import figma_be913caa_33e4_4e4d_aa6a_2c39664f727d_svg from '../../assets/figma/be913caa-33e4-4e4d-aa6a-2c39664f727d.svg';
import figma_17f9d712_2e3f_40ca_b059_cb541a5f2605_svg from '../../assets/figma/17f9d712-2e3f-40ca-b059-cb541a5f2605.svg';
import figma_15f95135_06d0_42d1_acb7_c25ec37f0c79_png from '../../assets/figma/15f95135-06d0-42d1-acb7-c25ec37f0c79.png';
import figma_ae0254da_7dbe_4fba_a40f_5de9d3411a7d_png from '../../assets/figma/ae0254da-7dbe-4fba-a40f-5de9d3411a7d.png';
import figma_7ee59a20_181b_4c78_a9dc_7529e2280caa_png from '../../assets/figma/7ee59a20-181b-4c78-a9dc-7529e2280caa.png';
import figma_d8a681b6_8c6d_4d08_80c4_bf1397223b5e_png from '../../assets/figma/d8a681b6-8c6d-4d08-80c4-bf1397223b5e.png';
import figma_1c874779_782f_4eb9_96cd_63540102866d_png from '../../assets/figma/1c874779-782f-4eb9-96cd-63540102866d.png';
import figma_6367f8b8_e22f_4a6b_bb56_b837f2db16c8_png from '../../assets/figma/6367f8b8-e22f-4a6b-bb56-b837f2db16c8.png';
import figma_2ea9a27f_5291_434e_b6b2_6efba4b60d83_png from '../../assets/figma/2ea9a27f-5291-434e-b6b2-6efba4b60d83.png';

const imgLikeOutline = figma_4f65e1a1_f7c6_4209_9aa8_6879d1fa3e3e_svg;
const imgLikeFill = figma_f18f03a8_dbf0_4add_aa12_723afdd968d9_svg;
const imgBookmarkOutline = figma_5972d921_320c_4f23_ae3c_9781e5c4d1f1_svg;
const imgBookmarkFill = figma_b20bcd72_0b9e_4707_8bd9_b80aa3f1fae3_svg;
const imgShare = figma_be913caa_33e4_4e4d_aa6a_2c39664f727d_svg;
const imgArrowReturn = figma_17f9d712_2e3f_40ca_b059_cb541a5f2605_svg;

const imgMe = figma_15f95135_06d0_42d1_acb7_c25ec37f0c79_png;
const imgAionue = figma_ae0254da_7dbe_4fba_a40f_5de9d3411a7d_png;
const imgGangster = figma_7ee59a20_181b_4c78_a9dc_7529e2280caa_png;
const imgHappy = figma_d8a681b6_8c6d_4d08_80c4_bf1397223b5e_png;
const imgMumumu = figma_1c874779_782f_4eb9_96cd_63540102866d_png;
const imgCoco = figma_6367f8b8_e22f_4a6b_bb56_b837f2db16c8_png;
const imgKiki = figma_2ea9a27f_5291_434e_b6b2_6efba4b60d83_png;

const TAGS = ['#프로덕트디자인', '#프리토크', '#포트폴리오'];

const COMMENTS = [
  {
    id: '0sun222',
    name: '0Sun222',
    avatar: img0sun222,
    text: '헐 진짜 공감해요ㅠㅠ 저도 계속 고치다 보니까 끝이 없는 느낌이더라구요… 힘내세요!! 🙌',
    reply: false,
  },
  {
    id: 'aionue',
    name: 'AIONUE',
    avatar: imgAionue,
    text: '혹시 다른 분들은 포트폴리오 완성하는 데 얼마나 걸리셨나요?? 저만 이렇게 오래 걸리는 건가 싶어서 궁금해요ㅠㅠ',
    reply: false,
    writer: true,
  },
  {
    id: 'happy',
    name: 'happy',
    avatar: imgHappy,
    text: '나도 진짜 궁금해!! 나도 계속 수정만 하고 있는 중이라 언제 끝날지 모르겠어ㅋㅋ',
    reply: true,
  },
  {
    id: 'gangster',
    name: 'Gangster',
    avatar: imgGangster,
    text: '저도 Yoonie 멘토님한테 포트폴리오 피드백 받고 나서 수정할 부분이 훨씬 명확해졌어요! 혼자 계속 고민하는 것보다 한 번 피드백 받아보는 것도 괜찮은 것 같아요ㅎㅎ',
    reply: false,
  },
  {
    id: 'mumumu',
    name: 'mumumu',
    avatar: imgMumumu,
    text: '저도 Yoonie 멘토님한테 포폴 피드백 받았는데 제가 강조하고 싶었던 부분이 실제로는 잘 안 보인다고 해서 많이 수정했어요. 확실히 제3자한테 한번 보여주는 게 좋은 것 같아요.',
    reply: true,
  },
  {
    id: 'coco',
    name: 'coco',
    avatar: imgCoco,
    text: '저는 처음부터 완벽하게 만들려고 하니까 너무 오래 걸렸어요ㅠㅠ 일단 지원할 수 있는 수준까지 만들고 계속 수정하는 게 낫더라구요.',
    reply: false,
  },
  {
    id: 'kiki',
    name: 'kiki',
    avatar: imgKiki,
    text: '저만 오래 걸리는 줄 알았는데 다들 비슷하군요🥹',
    reply: false,
  },
];

function MaskIcon({ src, className = 'size-6' }) {
  return (
    <span
      aria-hidden
      className={`block ${className}`}
      style={{
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        backgroundColor: '#9CA2B1',
      }}
    />
  );
}

export default function BoardFreeTalkDetailAionue() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comments, setComments] = useState(COMMENTS);
  const [draft, setDraft] = useState('');
  const commentCount = comments.length;

  const handleSubmitComment = () => {
    const text = draft.trim();
    if (!text) return;
    setComments((prev) => [{ id: `me-${Date.now()}`, name: 'Yunn00', avatar: imgMe, text, reply: false }, ...prev]);
    setDraft('');
  };

  return (
    <section className="flex-1 min-w-0 min-h-0 rounded-2xl bg-white shadow-[0_0_16px_rgba(18,18,19,0.04)] overflow-y-auto">
      <div className="max-w-[819px] mx-auto py-16 px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-[25px] leading-[1.4] tracking-[-0.5px] text-[#121213]">
              포트폴리오 30번은 갈아엎은 것 같아요,,ㅎ 이게 맞나 싶네요
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
              <img alt="" src={imgAionue} className="size-[42px] rounded-full object-cover shrink-0" />
              <div className="flex flex-col gap-1">
                <p className="font-bold text-[18px] leading-[1.5] tracking-[-0.0036px] text-[#121213]">AIONUE</p>
                <p className="text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886]">프로덕트 디자인 외 1개</p>
              </div>
            </div>
            <p className="shrink-0 text-[14px] leading-[1.42] tracking-[0.14px] text-[#747886] whitespace-nowrap">
              2026년 08월 14일
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-16">
          <p className="text-[15px] leading-[1.6] text-[#121213]">
            계속 리서치부터 다시 정리하고, 스토리라인 바꾸고, 또 갈아엎고... 벌써 몇 번째인지 모르겠어요. 다른 분들도 포폴 완성까지 이 정도로 오래 걸리셨나요? 저만 유독 느린 건가 싶어서 조금 지치네요...ㅜㅜ
          </p>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              className="flex items-center gap-1 cursor-pointer"
              aria-pressed={liked}
            >
              <MaskIcon src={liked ? imgLikeFill : imgLikeOutline} />
              <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">{liked ? 29 : 28}</span>
            </button>
            <button
              type="button"
              onClick={() => setBookmarked((v) => !v)}
              className="flex items-center gap-1 cursor-pointer"
              aria-pressed={bookmarked}
            >
              {bookmarked ? <MaskIcon src={imgBookmarkFill} /> : <img alt="북마크" src={imgBookmarkOutline} className="size-6" />}
              <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">{bookmarked ? 22 : 21}</span>
            </button>
            <div className="flex items-center gap-1">
              <img alt="공유" src={imgShare} className="size-6" />
              <span className="font-medium text-[14px] tracking-[0.14px] text-[#121213]">0</span>
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
                  className={`font-semibold text-[16px] leading-[1.45] ${
                    draft.trim() ? 'text-[#1a75ff] cursor-pointer' : 'text-[#9ca2b1] cursor-not-allowed'
                  }`}
                >
                  댓글 남기기
                </button>
              </div>
            </div>
            <p className="text-[13px] tracking-[0.26px] text-[#9ca2b1]">댓글을 등록하면 수정이나 삭제할 수 없어요</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
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
