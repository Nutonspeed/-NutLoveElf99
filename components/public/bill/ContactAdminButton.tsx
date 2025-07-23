'use client'
export default function ContactAdminButton({ billId }: { billId: string }) {
  const link = `https://line.me/ti/p/~sofacover?text=Bill%20${billId}`
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-green-500 text-white rounded"
    >
      ติดต่อแอดมิน
    </a>
  )
}
