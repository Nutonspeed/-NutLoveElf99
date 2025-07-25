import DashboardStats from '@/components/admin/DashboardStats'
import RecentBillsTable from '@/components/admin/RecentBillsTable'
import type { AdminBill } from '@/mock/bills'
import { getBills } from '@/core/mock/bill'
import { getCustomers } from '@/core/mock/customer'

function billTotal(b: AdminBill) {
  return b.items.reduce((s, i) => s + i.price * i.quantity, 0) + b.shipping
}

export default function AdminDashboardPage() {
  const bills = getBills()
  const customers = getCustomers()
  const todayStr = new Date().toDateString()

  const todaySales = bills
    .filter(b => new Date(b.createdAt).toDateString() === todayStr && b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + billTotal(b), 0)
  const totalBills = bills.length
  const newCustomers = customers.filter(c => new Date(c.createdAt).toDateString() === todayStr).length
  const recentBills = [...bills].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0,5)

  return (
    <div className="space-y-6 p-4 md:p-6">
      <DashboardStats todaySales={todaySales} totalBills={totalBills} newCustomers={newCustomers} />
      <div className="overflow-x-auto">
        <RecentBillsTable bills={recentBills} />
      </div>
    </div>
  )
}
