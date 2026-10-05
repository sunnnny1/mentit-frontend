import { GUMLOOP_BASE, ID_PATTERN, getConfig, sendJson } from '../_gumloop.js';

// GET /api/yoonie/status?id=<interactionId> -> { state, response?, errorMessage? }
// state: pending | completed | failed
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, { error: 'method_not_allowed' });
  }

  const { apiKey, userId, missing } = getConfig();
  if (missing.length) {
    console.error('[yoonie/status] missing env:', missing.join(', '));
    return sendJson(res, 500, { error: 'not_configured' });
  }

  const id = new URL(req.url, 'http://localhost').searchParams.get('id') ?? '';
  if (!ID_PATTERN.test(id)) return sendJson(res, 400, { error: 'invalid_id' });

  try {
    const upstream = await fetch(
      `${GUMLOOP_BASE}/agent_status/${encodeURIComponent(id)}?user_id=${encodeURIComponent(userId)}`,
      { headers: { Authorization: `Bearer ${apiKey}` } },
    );
    if (!upstream.ok) {
      const detail = (await upstream.text()).slice(0, 300);
      console.error('[yoonie/status] upstream', upstream.status, detail);
      return sendJson(res, 502, { error: 'upstream_error', status: upstream.status });
    }
    const data = await upstream.json();
    if (data.state === 'COMPLETED') {
      return sendJson(res, 200, { state: 'completed', response: data.response ?? '' });
    }
    if (data.state === 'FAILED' || data.state === 'APPROVAL_REQUIRED') {
      return sendJson(res, 200, { state: 'failed', errorMessage: data.error_message ?? data.state });
    }
    return sendJson(res, 200, { state: 'pending' });
  } catch (error) {
    console.error('[yoonie/status] request failed', error);
    return sendJson(res, 502, { error: 'upstream_unreachable' });
  }
}
