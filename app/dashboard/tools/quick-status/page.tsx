import DashboardQuickCard from '@/components/dashboard/DashboardQuickCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { orders as ordersMock } from '@/mock/orders'
import { mockBills as billsMock } from '@/mock/bills'
import { fabrics } from '@/mock/fabrics'
import { formatCurrency, formatThaiDate } from '@/lib/utils'

export default function QuickStatusPage() {
  const latestOrder = ordersMock[0]
  const latestBill = billsMock[0]
  const today = new Date().toISOString().slice(0, 10)
  const totalToday = billsMock
    .filter(b => b.status === 'paid' && b.createdAt.slice(0, 10) === today)
    .reduce((s, b) =>
      s + b.items.reduce((n, i) => n + i.price * i.quantity, 0) + b.shipping,
    0)

  const links = [
    { link: '/dashboard/orders', title: 'Orders', icon: '📦', count: ordersMock.length },
    { link: '/dashboard/bill/BILL-001', title: 'Bills', icon: '🧾', count: billsMock.length },
    { link: '/dashboard/fabrics', title: 'Fabrics', icon: '🧵', count: fabrics.length },
  ]

  const noData = ordersMock.length === 0 && billsMock.length === 0

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Quick Status</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {links.map(l => (
          <DashboardQuickCard key={l.link} {...l} />
        ))}
      </div>
      {noData ? (
        <p className="text-center text-muted-foreground">ไม่มีข้อมูลล่าสุด</p>
      ) : (
        <>
          <SectionHeader title="ข้อมูลล่าสุด" />
          <div className="grid gap-4 sm:grid-cols-2">
            {latestOrder && (
              <div className="rounded-md border p-4 space-y-1">
                <h3 className="font-medium">คำสั่งซื้อล่าสุด</h3>
                <p className="text-sm">{latestOrder.id} – {latestOrder.customer}</p>
                <p className="text-sm font-semibold">{formatCurrency(latestOrder.total)}</p>
              </div>
            )}
            {latestBill && (
              <div className="rounded-md border p-4 space-y-1">
                <h3 className="font-medium">บิลล่าสุด</h3>
                <p className="text-sm">{latestBill.id} – {latestBill.customer}</p>
                <p className="text-sm text-muted-foreground">{formatThaiDate(latestBill.createdAt)}</p>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            ยอดขายวันนี้: {formatCurrency(totalToday)}
          </p>
        </>
      )}
    </div>
  )
}
