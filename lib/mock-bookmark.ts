export type BookmarkType = 'fabric' | 'order' | 'chat'

export interface Bookmark {
  id: string
  type: BookmarkType
  ref: string
}

export let mockBookmarks: Bookmark[] = [
  { id: 'bm1', type: 'fabric', ref: 'soft-linen' },
  { id: 'bm2', type: 'order', ref: 'ORD-001' },
  { id: 'bm3', type: 'chat', ref: '1' },
]

export function loadBookmarks() {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('mockBookmarks')
    if (raw) mockBookmarks = JSON.parse(raw) as Bookmark[]
  }
}

export function saveBookmarks(list: Bookmark[]) {
  mockBookmarks = list
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockBookmarks', JSON.stringify(list))
  }
}
