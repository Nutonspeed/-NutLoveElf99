import DashboardCard from '@/components/dashboard/DashboardCard'
import BillSummaryChart from '@/components/dashboard/BillSummaryChart'
import RecentBillsTable from '@/components/dashboard/RecentBillsTable'
import { getDashboardStats } from '@/lib/data/dashboardStats'
import { ENABLE_MOCK_DASHBOARD } from '@/lib/config'

export default async function AdminDashboardPage() {
  const stats = getDashboardStats()

  if (ENABLE_MOCK_DASHBOARD) {
    return <div className="p-4">Mock dashboard disabled</div>
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="ยอดขายเดือนนี้" value={`฿${stats.monthSales.toLocaleString()}`} />
        <DashboardCard title="บิลทั้งหมด" value={stats.totalBills} />
        <DashboardCard title="ชำระแล้ว" value={stats.paidBills} />
        <DashboardCard title="ค้างจ่าย" value={stats.unpaidBills} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <DashboardCard title="ลูกค้าใหม่" value={stats.newCustomers} className="sm:col-span-2" />
        <BillSummaryChart data={stats.chartData} />
      </div>
      <div className="overflow-x-auto">
        <RecentBillsTable bills={stats.recentBills} />
      </div>
    </div>
  )
}
