export async function readJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(path)
    if (!res.ok) throw new Error('fetch failed')
    return (await res.json()) as T
  } catch {
    return fallback
  }
}

export async function writeJson<T>(path: string, data: T): Promise<void> {
  await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
