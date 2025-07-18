"use client"
import Link from 'next/link'

interface DashboardQuickCardProps {
  title: string
  icon: React.ReactNode
  link: string
  count?: number | null
}

export default function DashboardQuickCard({ title, icon, link, count }: DashboardQuickCardProps) {
  return (
    <Link
      href={link}
      className="group block rounded-md border p-4 transition-transform hover:scale-105 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <span className="font-medium">{title}</span>
        </div>
        <span className="text-lg font-semibold">{count ?? '-'}</span>
      </div>
    </Link>
  )
}
