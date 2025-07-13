import { mockReviewImages } from './mock-review-images'
import { mockProducts } from './mock-products'
import { mockClaims } from './mock-claims'

export interface MediaItem {
  id: string
  url: string
  source: string
}

export function getMedia(): MediaItem[] {
  const claimImages = mockClaims.map(c => ({ id: c.id, url: c.image, source: 'claim' }))
  const reviewImages = mockReviewImages.map((r, idx) => ({ id: 'review-' + idx, url: r.url, source: 'review' }))
  const productImages = mockProducts.flatMap(p => p.images.map((url, idx) => ({ id: `${p.id}-${idx}`, url, source: 'product' })))
  return [...claimImages, ...reviewImages, ...productImages]
}
