// MODO SIMULADO — sin API key
// Cuando quieras activar Claude real, cambia simulatedMode a false
const simulatedMode = false

export async function translateText(
  text: string,
  targetLang: 'ca' | 'en' | 'fr'
): Promise<string> {
  if (!text) return ''

  if (simulatedMode) {
    await new Promise(r => setTimeout(r, 300))
    return `[${targetLang.toUpperCase()}] ${text}`
  }

  // Claude real — activar cuando tengas API key
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `Traduce este texto al ${targetLang === 'ca' ? 'catalán' : targetLang === 'en' ? 'inglés' : 'francés'}. 
        Responde SOLO con la traducción, sin explicaciones ni comillas.
        Contexto: es una descripción de vino para una carta de restaurante en Barcelona.
        Texto: ${text}`
      }]
    })
  })

  const data = await response.json()
  return data.content[0].text.trim()
}

export async function translateProduct(product: {
  name_es: string
  description_es: string | null
}) {
  const langs: ('ca' | 'en' | 'fr')[] = ['ca', 'en', 'fr']
  const results: Record<string, string | null> = {}

  for (const lang of langs) {
    // El nombre NO se traduce — es un nombre comercial
    results[`name_${lang}`] = product.name_es
    // Solo se traduce la descripción
    results[`description_${lang}`] = product.description_es
      ? await translateText(product.description_es, lang)
      : null
  }

  return results
}