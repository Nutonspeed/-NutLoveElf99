import { Clock, Scissors, Shirt, Package, Truck, CircleCheck } from 'lucide-react'
import type { BillStatus } from '@/core/mock/fakeBillDB'

const steps = [
  { key: 'waiting', label: 'รอคิว', icon: Clock },
  { key: 'cutting', label: 'ตัดผ้า', icon: Scissors },
  { key: 'sewing', label: 'เย็บ', icon: Shirt },
  { key: 'packing', label: 'แพ็ค', icon: Package },
  { key: 'shipped', label: 'ส่งแล้ว', icon: Truck },
  { key: 'delivered', label: 'ได้รับแล้ว', icon: CircleCheck },
] as const

export default function BillTimeline({ status }: { status: BillStatus }) {
  const current = steps.findIndex(s => s.key === status)
  return (
    <div className="flex items-center justify-between relative">
      {steps.map((step, index) => {
        const StepIcon = step.icon
        const isDone = index <= current
        const isCurrent = index === current
        return (
          <div key={step.key} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                isDone
                  ? 'bg-green-500 text-white'
                  : isCurrent
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              <StepIcon className="h-4 w-4" />
            </div>
            <span className={`text-xs text-center ${isDone || isCurrent ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{step.label}</span>
            {index < steps.length - 1 && (
              <div
                className={`absolute h-0.5 w-full mt-4 ${index < current ? 'bg-green-500' : 'bg-gray-200'}`}
                style={{
                  left: `${(100 / steps.length) * (index + 0.5)}%`,
                  width: `${100 / steps.length}%`,
                  zIndex: -1,
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
