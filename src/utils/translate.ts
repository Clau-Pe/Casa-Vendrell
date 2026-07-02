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

  // Llama a la función serverless de Vercel
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, targetLang })
  })

  const data = await response.json()
  return data.translation
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