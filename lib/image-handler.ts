export async function resizeAndCompressImage(
  file: File,
  width = 1200,
  height = 1200,
  quality = 0.8,
  mimeType: 'image/webp' | 'image/png' = 'image/webp'
): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas not supported')

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)

  const ratio = Math.max(width / bitmap.width, height / bitmap.height)
  const newWidth = bitmap.width * ratio
  const newHeight = bitmap.height * ratio
  const x = (width - newWidth) / 2
  const y = (height - newHeight) / 2
  ctx.drawImage(bitmap, x, y, newWidth, newHeight)

  let currentQuality = quality
  let blob: Blob | null = null

  do {
    blob = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b), mimeType, currentQuality)
    )
    if (!blob) throw new Error('Failed to convert image')
    if (mimeType === 'image/png') break
    if (blob.size <= 300 * 1024) break
    currentQuality = Math.max(0.1, currentQuality - 0.05)
  } while (currentQuality > 0.1 && blob.size > 300 * 1024)

  return blob
}

export async function prepareFabricImage(
  file: File,
  collectionSlug: string,
  index = 1,
  mimeType: 'image/webp' | 'image/png' = 'image/webp'
): Promise<File> {
  const ext = mimeType === 'image/png' ? 'png' : 'webp'
  const fileName = `fabric-${collectionSlug}-${String(index).padStart(2, '0')}.${ext}`
  const blob = await resizeAndCompressImage(file, 1200, 1200, 0.8, mimeType)
  return new File([blob], fileName, { type: blob.type || mimeType })
}

export async function prepareProductImage(
  file: File,
  productSlug: string,
  index = 1,
  mimeType: 'image/webp' | 'image/png' = 'image/webp'
): Promise<File> {
  const ext = mimeType === 'image/png' ? 'png' : 'webp'
  const fileName = `product-${productSlug}-${String(index).padStart(2, '0')}.${ext}`
  const blob = await resizeAndCompressImage(file, 1200, 1200, 0.8, mimeType)
  return new File([blob], fileName, { type: blob.type || mimeType })
}
