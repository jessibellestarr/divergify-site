// Netlify Function: Takota chat via OpenAI
// Expects POST JSON: { message: string, history?: [{role, content}] }
// Returns JSON: { reply, model, usage? }

const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || '*';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

exports.handler = async (event) => {
  try {
    // CORS preflight
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: ''
      };
    }

    if (event.httpMethod !== 'POST') {
      return json(405, { error: 'Method not allowed' });
    }

    if (!OPENAI_API_KEY) {
      return json(500, { error: 'Server not configured. Missing OPENAI_API_KEY.' });
    }

    let payload;
    try {
      payload = JSON.parse(event.body || '{}');
    } catch (e) {
      return json(400, { error: 'Invalid JSON' });
    }

    const userMessage = (payload && payload.message ? String(payload.message) : '').trim();
    const history = Array.isArray(payload?.history) ? payload.history : [];

    if (!userMessage) {
      return json(400, { error: 'Missing message' });
    }

    const messages = [
      {
        role: 'system',
        content: (
          'You are Takota, Divergify\'s friendly, concise assistant. '\
          + 'Tone: supportive, practical, playful but not cutesy. '\
          + 'Prefer short, actionable suggestions. '\
          + 'Brand colors (context only): Deep Blue #00466C, Lime #8BC34A. '
        )
      },
      ...history.filter(m => m && m.role && m.content),
      { role: 'user', content: userMessage }
    ];

    const body = {
      model: MODEL,
      messages,
      temperature: 0.6,
      max_tokens: 400
    };

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data?.error?.message || `OpenAI error ${res.status}`;
      return json(502, { error: msg });
    }

    const choice = data.choices && data.choices[0];
    const reply = choice?.message?.content || '';
    return json(200, {
      reply,
      model: data.model || MODEL,
      usage: data.usage || undefined
    });
  } catch (err) {
    return json(500, { error: 'Server error' });
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
}

function json(statusCode, obj) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders() },
    body: JSON.stringify(obj)
  };
}

