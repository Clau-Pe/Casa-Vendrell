interface Env {}

export const onRequestPost: PagesFunction = async (context) => {
  const body = await context.request.json() as { text: string, targetLang: string }
  const { text, targetLang } = body

  const langName = targetLang === 'ca' ? 'catalan'
    : targetLang === 'en' ? 'english'
    : 'french'

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': (context.env as { ANTHROPIC_API_KEY: string }).ANTHROPIC_API_KEY,
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

    const data = await response.json() as { content: { text: string }[] }
    return new Response(JSON.stringify({ translation: data.content[0].text.trim() }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Translation error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}