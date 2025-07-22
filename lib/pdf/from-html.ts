import 'server-only'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import type { ReactElement } from 'react'

export async function componentToPDF(element: ReactElement) {
  const { renderToStaticMarkup } = await import('react-dom/server')
  const html = renderToStaticMarkup(element)
  const doc = await PDFDocument.create()
  const page = doc.addPage()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const { width, height } = page.getSize()
  const fontSize = 12
  const textWidth = font.widthOfTextAtSize(html, fontSize)
  const textHeight = fontSize
  page.drawText(html, {
    x: 50,
    y: height - 50 - textHeight,
    size: fontSize,
    font,
    color: undefined,
    maxWidth: width - 100,
  })
  const bytes = await doc.save()
  return new Blob([bytes], { type: 'application/pdf' })
}
