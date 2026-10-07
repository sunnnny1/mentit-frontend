import { GUMLOOP_BASE, ID_PATTERN, getConfig, readJsonBody, resolveAgent, sendJson } from '../_gumloop.js';

const MAX_MESSAGE_LENGTH = 1000;
// 대화 요약은 대화 전체를 보내므로 더 길게 허용한다.
const MAX_MESSAGE_LENGTH_BY_AGENT = { summary: 4000 };

// POST /api/yoonie/start  { message, interactionId?, agent? } -> { interactionId }
// agent: 'yoonie'(기본, AI Agent 채팅) | 'yoonie-mentor'(멘토 채팅) | 'mentit'(멘팃 AI) | 'summary'(대화 요약)
// Gumloop 에이전트에 메시지를 보내고, 답변은 /api/yoonie/status 로 조회한다.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'method_not_allowed' });
  }

  const body = await readJsonBody(req);
  const agent = resolveAgent(body.agent);
  if (!agent) return sendJson(res, 400, { error: 'unknown_agent' });

  const { apiKey, userId, gummieId, missing } = getConfig(agent);
  if (missing.length) {
    console.error('[yoonie/start] missing env:', missing.join(', '));
    return sendJson(res, 500, { error: 'not_configured' });
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) return sendJson(res, 400, { error: 'empty_message' });
  if (message.length > (MAX_MESSAGE_LENGTH_BY_AGENT[agent] ?? MAX_MESSAGE_LENGTH)) return sendJson(res, 400, { error: 'message_too_long' });

  const interactionId =
    typeof body.interactionId === 'string' && ID_PATTERN.test(body.interactionId) ? body.interactionId : undefined;

  const payload = {
    gummie_id: gummieId,
    user_id: userId,
    message,
    ...(interactionId ? { interaction_id: interactionId } : {}),
  };

  try {
    const upstream = await fetch(`${GUMLOOP_BASE}/start_agent`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!upstream.ok) {
      const detail = (await upstream.text()).slice(0, 300);
      console.error('[yoonie/start] upstream', upstream.status, detail);
      return sendJson(res, 502, { error: 'upstream_error', status: upstream.status });
    }
    const data = await upstream.json();
    if (!data.interaction_id) return sendJson(res, 502, { error: 'bad_upstream_response' });
    return sendJson(res, 200, { interactionId: data.interaction_id });
  } catch (error) {
    console.error('[yoonie/start] request failed', error);
    return sendJson(res, 502, { error: 'upstream_unreachable' });
  }
}
