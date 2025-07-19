import { loadFromStorage, saveToStorage } from './persist'
import type { Review } from '@/types/review'

const KEY = 'mockStore_reviews'

let reviews: Review[] = loadFromStorage<Review[]>(KEY, [])

function persist() {
  saveToStorage(KEY, reviews)
}

export function getReviews() {
  return reviews
}

export function addReview(review: Review): boolean {
  if (reviews.some(r => r.orderId === review.orderId)) return false
  reviews.push(review)
  persist()
  return true
}

export function toggleHide(orderId: string) {
  const r = reviews.find(rv => rv.orderId === orderId)
  if (r) {
    r.hidden = !r.hidden
    persist()
  }
}

export function resetReviews() {
  reviews = []
  persist()
}
