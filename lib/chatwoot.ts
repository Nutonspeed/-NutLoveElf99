let url = process.env.NEXT_PUBLIC_CHATWOOT_URL

try {
  if (!url || url === 'mock-mode') {
    url = 'http://localhost:3000/chatwoot'
  }
} catch (err) {
  console.warn('Chatwoot URL missing, using mock fallback', err)
  url = 'http://localhost:3000/chatwoot'
}

export const chatwootUrl = url
