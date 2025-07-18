import { resizeAndCompressImage } from './fabric/compress'

export async function prepareProductImage(
  file: File,
  productSlug: string,
  index = 1,
  mimeType: 'image/webp' | 'image/png' = 'image/webp',
): Promise<File> {
  const ext = mimeType === 'image/png' ? 'png' : 'webp'
  const fileName = `product-${productSlug}-${String(index).padStart(2, '0')}.${ext}`
  const blob = await resizeAndCompressImage(file, 1200, 1200, 0.8, mimeType)
  return new File([blob], fileName, { type: blob.type || mimeType })
}
