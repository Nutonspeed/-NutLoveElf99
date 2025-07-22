import data from '@/mock/store/notes.json'
import { loadFromStorage, saveToStorage } from './persist'

export interface Note {
  id: string
  type: 'order' | 'bill' | 'customer'
  ref: string
  tag: 'important' | 'follow-up' | 'internal'
  message: string
  timestamp: string
}

const KEY = 'mockStore_notes'
let notes: Note[] = loadFromStorage<Note[]>(KEY, data as Note[])

function persist() {
  saveToStorage(KEY, notes)
}

export function listNotes() {
  return notes
}

export function addNote(note: Omit<Note,'id'|'timestamp'>) {
  notes.push({ ...note, id: Date.now().toString(), timestamp: new Date().toISOString() })
  persist()
}
