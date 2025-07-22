interface BillProgressProps {
  steps: string[]
  current: number
  updatedAt: string
}

export default function BillProgress({ steps, current, updatedAt }: BillProgressProps) {
  return (
    <div className="space-y-1">
      <ol className="flex justify-between text-sm">
        {steps.map((s, i) => (
          <li key={s} className={i === current ? 'font-bold text-primary' : 'text-gray-500'}>
            {s}
          </li>
        ))}
      </ol>
      <p className="text-xs text-gray-500">อัปเดตล่าสุด: {updatedAt}</p>
    </div>
  )
}
