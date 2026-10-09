// Proxy serverless Vercel : la clé Speechify ne quitte jamais le serveur.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });
  const apiKey = process.env.SPEECHIFY_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Speechify non configuré dans Vercel' });
  try {
    const { path = '/v1/audio/speech', method = 'GET', body } = req.body || {};
    if (!/^\/v1\/(audio\/speech|voices)(\?.*)?$/.test(path)) return res.status(400).json({ error: 'Route Speechify non autorisée' });
    const upstream = await fetch(`https://api.speechify.ai${path}`, {
      method: method === 'GET' ? 'GET' : 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, ...(method !== 'GET' ? { 'Content-Type': 'application/json' } : {}) },
      ...(method !== 'GET' && body ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {})
    });
    const payload = Buffer.from(await upstream.arrayBuffer());
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(upstream.status).send(payload);
  } catch (error) {
    return res.status(502).json({ error: 'Impossible de joindre Speechify' });
  }
}
