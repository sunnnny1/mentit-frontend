// AI Agent(유니 AI) 대화를 요약 에이전트('summary')에 보내 멘토 채팅 첫 화면의 요약 카드 내용을 만든다.
import { askYoonie } from './yoonieAgent';

export const EMPTY_SUMMARY_TEXT = '요약할 내용이 없어요. 멘토에게 궁금한 점을 바로 질문해주세요!';
export const EMPTY_SUMMARY = { empty: true, headline: '', bullets: [] };

const SUMMARY_TIMEOUT_MS = 45000;
const MAX_TRANSCRIPT_CHARS = 3500;
const MAX_TURN_CHARS = 400;
const BULLET = /^[•\-*]\s*/;

// 화면에 쌓인 대화(messages)를 "사용자: ... / AI Agent: ..." 텍스트로 만든다. 최근 대화를 우선한다.
export function buildTranscript(messages) {
  const lines = [];
  for (const message of messages ?? []) {
    const text = String(message?.text ?? '').replace(/\s+/g, ' ').trim();
    if (!text) continue;
    if (message.role === 'user') lines.push(`사용자: ${text.slice(0, MAX_TURN_CHARS)}`);
    else if (message.role === 'mentor') lines.push(`AI Agent: ${text.slice(0, MAX_TURN_CHARS)}`);
  }
  if (!lines.some((line) => line.startsWith('사용자:'))) return '';
  const picked = [];
  let total = 0;
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    if (total + lines[i].length > MAX_TRANSCRIPT_CHARS && picked.length > 0) break;
    picked.unshift(lines[i]);
    total += lines[i].length + 1;
  }
  return picked.join('\n');
}

// 에이전트 답변("첫 줄 요약 + - 항목 + 마지막 안내 줄")을 { headline, bullets }로 나눈다.
// 예전 지시문이 붙이던 "멘토와의 연결을..." 안내 줄은 카드에 보이지 않도록 지운다.
export function parseSummary(raw) {
  const text = String(raw ?? '');
  if (/\[\[\s*NONE\s*\]\]/i.test(text) || text.includes('요약할 내용이 없어요')) return EMPTY_SUMMARY;
  // 마지막 안내 줄이 직전 항목과 한 문단으로 붙어 오는 경우가 있어, 줄을 버리지 않고 문구만 지운다.
  const paragraphs = text
    .split(/\n{2,}/)
    .map((part) => part.replace(/(멘토와의 연결을\s*)?잠시만 기다려주세요\.*/g, '').trim())
    .filter(Boolean);
  const bullets = paragraphs
    .filter((part) => BULLET.test(part))
    .map((part) => part.replace(BULLET, '').trim())
    .filter(Boolean)
    .slice(0, 3);
  const headline = paragraphs.find((part) => !BULLET.test(part)) ?? '';
  if (!headline && bullets.length === 0) return EMPTY_SUMMARY;
  return { empty: false, headline, bullets };
}

async function runSummary(transcript) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUMMARY_TIMEOUT_MS);
  try {
    const { text } = await askYoonie(transcript, { agent: 'summary', signal: controller.signal });
    return parseSummary(text);
  } finally {
    clearTimeout(timer);
  }
}

// 같은 대화는 한 번만 요약한다. (탭을 오가며 화면이 다시 열려도 재요청하지 않는다.)
const cache = new Map();

export function peekSummary(transcript) {
  return cache.get(transcript)?.result ?? null;
}

export function requestSummary(transcript) {
  let entry = cache.get(transcript);
  if (!entry) {
    entry = { result: null, promise: null };
    entry.promise = runSummary(transcript)
      .catch((error) => {
        console.error('[chat summary] failed', error);
        cache.delete(transcript); // 실패는 저장하지 않아 다음에 다시 시도할 수 있게 한다.
        return EMPTY_SUMMARY;
      })
      .then((result) => {
        entry.result = result;
        return result;
      });
    cache.set(transcript, entry);
  }
  return entry;
}
