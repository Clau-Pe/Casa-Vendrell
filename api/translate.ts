import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { text, targetLang } = req.body

  const langName = targetLang === 'ca' ? 'catalan' 
    : targetLang === 'en' ? 'english' 
    : 'french'

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Translate this text to ${langName}. Reply ONLY with the translation, no explanations or quotes. Context: wine description for a restaurant menu in Barcelona. Text: ${text}`
        }]
      })
    })

    const data = await response.json()
    res.status(200).json({ translation: data.content[0].text.trim() })
  } catch (err) {
    res.status(500).json({ error: 'Translation error' })
  }
}