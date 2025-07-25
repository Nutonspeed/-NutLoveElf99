"use client"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

export interface ChartData {
  date: string
  total: number
}

export default function BillSummaryChart({ data }: { data: ChartData[] }) {
  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 0, right: 0 }}>
          <Bar dataKey="total" fill="#0ea5e9" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis hide />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
