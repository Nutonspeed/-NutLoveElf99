export function downloadPDF() {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
