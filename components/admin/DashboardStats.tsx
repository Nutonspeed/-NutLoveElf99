import DashboardCard from '@/components/dashboard/DashboardCard'
import { formatCurrency } from '@/lib/utils/format'

interface DashboardStatsProps {
  todaySales: number
  totalBills: number
  newCustomers: number
}

export default function DashboardStats({ todaySales, totalBills, newCustomers }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <DashboardCard title="ยอดขายวันนี้" value={formatCurrency(todaySales)} />
      <DashboardCard title="บิลทั้งหมด" value={totalBills} />
      <DashboardCard title="ลูกค้าใหม่" value={newCustomers} />
    </div>
  )
}
