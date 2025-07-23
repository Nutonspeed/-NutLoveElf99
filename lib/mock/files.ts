export interface StoredFile {
  id: string
  name: string
  type: 'slip' | 'id' | 'attachment'
  user: string
  orderId?: string
  url?: string
  status?: 'pending' | 'reviewed'
  date: string
}

export let storedFiles: StoredFile[] = []
const STORAGE_KEY = 'storedFiles'

export function loadStoredFiles() {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) storedFiles = JSON.parse(raw)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedFiles))
  }
}

export function addStoredFile(data: Omit<StoredFile, 'id' | 'date' | 'status'> & {status?: 'pending' | 'reviewed'}) {
  const record: StoredFile = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    status: data.status ?? 'pending',
    ...data,
  }
  storedFiles.push(record)
  save()
  return record
}

export function markReviewed(id: string) {
  const f = storedFiles.find((x) => x.id === id)
  if (f) {
    f.status = 'reviewed'
    save()
  }
}

export function getFiles() {
  return storedFiles
}

export function getFilesByOrder(orderId: string, type?: string) {
  return storedFiles.filter(
    (f) => f.orderId === orderId && (!type || f.type === type),
  )
}
