import { Clock, Scissors, Shirt, Package, Truck, CircleCheck } from 'lucide-react'

const steps = [
  { key: 'waiting', label: 'รอตัด', icon: Clock },
  { key: 'cutting', label: 'กำลังตัด', icon: Scissors },
  { key: 'sewing', label: 'รอเย็บ', icon: Shirt },
  { key: 'done', label: 'เย็บเสร็จ', icon: CircleCheck },
  { key: 'packing', label: 'แพ็คแล้ว', icon: Package },
  { key: 'shipped', label: 'จัดส่งแล้ว', icon: Truck },
] as const

type StepKey = typeof steps[number]['key']

export default function BillStatusStepper({ status }: { status: StepKey }) {
  const currentStepIndex = steps.findIndex(s => s.key === status)

  return (
    <div className="flex items-center justify-between relative">
      {steps.map((step, index) => {
        const StepIcon = step.icon
        const isCompleted = index <= currentStepIndex
        const isCurrent = index === currentStepIndex
        return (
          <div key={step.key} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isCurrent
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              <StepIcon className="h-4 w-4" />
            </div>
            <span
              className={`text-xs text-center ${
                isCompleted || isCurrent ? 'text-gray-900 font-medium' : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`absolute h-0.5 w-full mt-4 ${
                  index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                }`}
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
