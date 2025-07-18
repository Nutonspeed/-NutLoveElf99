"use client"
import Link from 'next/link'

export default function DashboardQuickCard({
  title,
  icon,
  link,
}: {
  title: string
  icon: React.ReactNode
  link: string
}) {
  return (
    <Link
      href={link}
      className="flex items-center gap-2 rounded border p-4 hover:bg-gray-50"
    >
      <span>{icon}</span>
      <span className="font-medium">{title}</span>
    </Link>
  )
}
