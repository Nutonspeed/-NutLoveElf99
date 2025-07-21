export async function sendSms(to: string, message: string): Promise<boolean> {
  const apiKey = process.env.SMS_API_KEY
  const sender = process.env.SMS_SENDER_ID || 'NutLoveStore'

  if (!apiKey) {
    console.log(`\uD83D\uDCF1 [Mock SMS] from ${sender} to ${to}: ${message}`)
    return true
  }

  try {
    const res = await fetch('https://api.twilio.com/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ to, message, sender }),
    })
    if (!res.ok) {
      console.error('SMS provider error:', await res.text())
      return false
    }
    console.log('SMS sent to', to)
    return true
  } catch (err) {
    console.error('SMS send error:', err)
    return false
  }
}
