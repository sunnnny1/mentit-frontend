// 브라우저 -> (우리 서버 /api/yoonie/*) -> Gumloop 에이전트 호출 클라이언트.
// Gumloop은 스트리밍이 없어서 start 후 status를 폴링해 답변을 받는다.

const FIRST_POLL_DELAY_MS = 1000;
const POLL_INTERVAL_MS = 1500;
const TIMEOUT_MS = 120000;

export class AgentError extends Error {
  constructor(code, message) {
    super(message ?? code);
    this.name = 'AgentError';
    this.code = code;
  }
}

export function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }
    const id = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    function onAbort() {
      clearTimeout(id);
      reject(new DOMException('Aborted', 'AbortError'));
    }
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

async function startInteraction(message, interactionId, signal, agent) {
  const response = await fetch('/api/yoonie/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, interactionId: interactionId ?? undefined, agent }),
    signal,
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new AgentError(data.error ?? 'start_failed', `start failed (${response.status})`);
  }
  const data = await response.json();
  return data.interactionId;
}

// 마크다운 기호를 걷어내고 \n\n 단위 문단으로 정리한다. (ChatThread가 \n\n 으로 말풍선을 나눈다)
export function formatAgentReply(raw) {
  const text = String(raw ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[(\d+)\]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n\s*[-*•]\s+/g, '\n\n• ')
    .replace(/\n\s*(\d+)\.\s+/g, '\n\n$1. ')
    .trim();
  return text
    .split(/\n{2,}/)
    .map((part) => part.replace(/\n/g, ' ').replace(/[ \t]{2,}/g, ' ').trim())
    .filter(Boolean)
    .join('\n\n');
}

// agent: 'yoonie'(AI Agent 채팅, 기본) | 'yoonie-mentor'(멘토 채팅) | 'mentit'(멘팃 AI) | 'summary'(대화 요약) | 'eunoia'(Eunoia AI Agent 채팅) | 'eunoia-mentor'(Eunoia 멘토 채팅)
export async function askYoonie(message, { interactionId = null, signal, agent = 'yoonie' } = {}) {
  let currentId;
  try {
    currentId = await startInteraction(message, interactionId, signal, agent);
  } catch (error) {
    // 이어가려던 대화가 거절되면(이전 응답이 아직 진행 중이거나 만료) 새 대화로 한 번 다시 시도한다.
    if (interactionId && error instanceof AgentError && error.code === 'upstream_error') {
      currentId = await startInteraction(message, null, signal, agent);
    } else {
      throw error;
    }
  }

  const deadline = Date.now() + TIMEOUT_MS;
  let attempt = 0;
  while (Date.now() < deadline) {
    await sleep(attempt === 0 ? FIRST_POLL_DELAY_MS : POLL_INTERVAL_MS, signal);
    attempt += 1;
    const response = await fetch(`/api/yoonie/status?id=${encodeURIComponent(currentId)}`, { signal });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new AgentError(data.error ?? 'status_failed', `status failed (${response.status})`);
    }
    const data = await response.json();
    if (data.state === 'completed') {
      const text = formatAgentReply(data.response);
      if (!text) throw new AgentError('empty_response');
      return { text, interactionId: currentId };
    }
    if (data.state === 'failed') throw new AgentError('agent_failed', data.errorMessage);
  }
  throw new AgentError('timeout');
}
