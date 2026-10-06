// Gumloop API 공용 헬퍼. 파일명이 _ 로 시작하므로 Vercel이 별도 함수로 배포하지 않는다.
// API 키는 서버(환경변수)에만 두고, 브라우저 코드에는 절대 넣지 않는다.

export const GUMLOOP_BASE = process.env.GUMLOOP_API_BASE || 'https://api.gumloop.com/api/v1';

// 에이전트 이름 -> 에이전트 ID를 담은 환경변수 이름.
// 'yoonie'        : 유니 AI Agent 채팅 (GUMLOOP_GUMMIE_ID)
// 'yoonie-mentor' : 유니 멘토(최윤희) 멘토 채팅 (GUMLOOP_GUMMIE_ID_YOONIE_MENTOR)
// 'mentit'        : 멘팃 AI 화면 (GUMLOOP_GUMMIE_ID_MENTIT)
export const AGENT_ENV = {
  yoonie: 'GUMLOOP_GUMMIE_ID',
  'yoonie-mentor': 'GUMLOOP_GUMMIE_ID_YOONIE_MENTOR',
  mentit: 'GUMLOOP_GUMMIE_ID_MENTIT',
};

export function resolveAgent(name) {
  if (name === undefined || name === null || name === '') return 'yoonie';
  return typeof name === 'string' && Object.hasOwn(AGENT_ENV, name) ? name : null;
}

export function getConfig(agent = 'yoonie') {
  const apiKey = process.env.GUMLOOP_API_KEY;
  const userId = process.env.GUMLOOP_USER_ID;
  const gummieEnvName = AGENT_ENV[agent];
  const gummieId = gummieEnvName ? process.env[gummieEnvName] : undefined;
  const missing = [
    ['GUMLOOP_API_KEY', apiKey],
    ['GUMLOOP_USER_ID', userId],
    [gummieEnvName ?? 'GUMLOOP_GUMMIE_ID', gummieId],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);
  return { apiKey, userId, gummieId, missing };
}

export async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return {};
  }
}

export function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

// interaction_id 형식 검증 (URL/요청에 그대로 쓰이므로 영문·숫자·_- 만 허용)
export const ID_PATTERN = /^[A-Za-z0-9_-]{6,80}$/;
