export const onRequestPost = async (context: {
  request: Request
  env: { BREVO_API_KEY: string }
}) => {
  const { email } = await context.request.json() as { email: string }

  try {
    // 1. Añadir contacto a lista de Brevo
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': context.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [5], // ID de la lista — lo ajustamos después
        updateEnabled: true,
      })
    })

    // 2. Enviar notificación a cuatrouvassl@gmail.com
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': context.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: 'Casa Vèndrell', email: 'info@casavendrell.com' },
        to: [{ email: 'cuatrouvassl@gmail.com' }],
        subject: 'Nueva suscripción al newsletter',
        htmlContent: `<p>Nueva suscripción: <strong>${email}</strong></p>`
      })
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Error processing subscription' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}