'use client'

export default function CopyLinkButton() {
  const handle = () => {
    navigator.clipboard.writeText(window.location.href)
  }
  return (
    <button onClick={handle} className="border px-3 py-1 text-sm">
      คัดลอกลิงก์
    </button>
  )
}
