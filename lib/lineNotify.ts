export async function sendLineMessage(to: string, message: string): Promise<boolean> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN
  if (!token) {
    console.log('LINE MOCK', { to, message })
    return true
  }

  try {
    const res = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        messages: [{ type: 'text', text: message }],
      }),
    })

    if (!res.ok) {
      console.error('LINE API error', await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error('LINE send error', err)
    return false
  }
}
