export async function exportPdf(element: HTMLElement, filename: string) {
  const html2pdf = (await import('html2pdf.js')).default
  return html2pdf().from(element).set({ margin: 0, filename }).save()
}
