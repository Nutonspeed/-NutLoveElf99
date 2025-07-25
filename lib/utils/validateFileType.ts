export function isPdf(url: string): boolean {
  return /\.pdf(\?.*)?$/.test(url.toLowerCase())
}

export function isImage(url: string): boolean {
  return /\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/.test(url.toLowerCase())
}
