export async function resizeAndCompressImage(
  file: File,
  width = 1200,
  height = 1200,
  quality = 0.8,
  mimeType = 'image/jpeg'
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

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), mimeType, quality)
  )
  if (!blob) throw new Error('Failed to convert image')

  return blob
}

export async function prepareFabricImage(
  file: File,
  collectionSlug: string,
  index = 1
): Promise<File> {
  const fileName = `fabric-${collectionSlug}-${String(index).padStart(2, '0')}.jpg`
  const blob = await resizeAndCompressImage(file)
  return new File([blob], fileName, { type: blob.type || 'image/jpeg' })
}
