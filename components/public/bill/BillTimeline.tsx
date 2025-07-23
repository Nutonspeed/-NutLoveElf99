'use client'
const steps = ['draft', 'cutting', 'sewing', 'packed', 'shipped']
export default function BillTimeline({ status }: { status: string }) {
  const idx = steps.indexOf(status)
  return (
    <ol className="flex justify-between text-sm">
      {steps.map((s, i) => (
        <li key={s} className={i <= idx ? 'font-bold text-primary' : 'text-gray-400'}>
          {s}
        </li>
      ))}
    </ol>
  )
}
