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

  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang })
    })

    if (!response.ok) {
      console.warn('API translate no disponible en local — usando simulado')
      return `[${targetLang.toUpperCase()}] ${text}`
    }

    const data = await response.json()
    return data.translation
  } catch {
    return `[${targetLang.toUpperCase()}] ${text}`
  }
}

export async function translateProduct(product: {
  name_es: string
  description_es: string | null
}) {
  const langs: ('ca' | 'en' | 'fr')[] = ['ca', 'en', 'fr']
  const results: Record<string, string | null> = {}

  for (const lang of langs) {
    results[`name_${lang}`] = product.name_es
    results[`description_${lang}`] = product.description_es
      ? await translateText(product.description_es, lang)
      : null
  }

  return results
}