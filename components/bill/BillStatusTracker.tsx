"use client"

const steps = ['waiting', 'cutting', 'sewing', 'packing', 'shipped'] as const
const labels: Record<(typeof steps)[number], string> = {
  waiting: 'รอยืนยัน',
  cutting: 'รอตัด',
  sewing: 'เย็บ',
  packing: 'แพ็ค',
  shipped: 'จัดส่งแล้ว',
}

export default function BillStatusTracker({ status }: { status: string }) {
  const current = steps.indexOf(status as any)
  return (
    <div className="flex justify-between text-sm">
      {steps.map((s, i) => (
        <div key={s} className="flex-1 text-center">
          <span
            className={`px-2 py-1 rounded ${i <= current ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            {labels[s]}
          </span>
        </div>
      ))}
    </div>
  )
}
