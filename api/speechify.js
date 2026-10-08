// Endpoint serverless compatible Vercel/Netlify-style runtimes.
// La clé est fournie uniquement par SPEECHIFY_API_KEY côté serveur.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });
  const apiKey = process.env.SPEECHIFY_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Speechify non configuré' });
  try {
    const { text, voiceId = process.env.SPEECHIFY_VOICE_ID || 'henry' } = req.body || {};
    if (typeof text !== 'string' || text.trim().length < 1 || text.length > 5000) {
      return res.status(400).json({ error: 'Le texte doit contenir entre 1 et 5000 caractères' });
    }
    const upstream = await fetch('https://api.sws.speechify.com/v1/audio/speech', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: text.trim(), voice_id: voiceId, audio_format: 'mp3' })
    });
    if (!upstream.ok) return res.status(upstream.status).json({ error: 'Speechify a refusé la génération audio' });
    const audio = Buffer.from(await upstream.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(audio);
  } catch (error) {
    return res.status(500).json({ error: 'Erreur de génération audio' });
  }
}
