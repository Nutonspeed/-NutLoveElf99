export function triggerPrint() {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
