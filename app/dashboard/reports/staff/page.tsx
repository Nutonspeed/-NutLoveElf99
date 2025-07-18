"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { staffSummary } from '@/mock/staff'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658']

export default function DashboardReportStaff() {
  const data = staffSummary.map(s => ({ name: s.name, value: s.opened }))
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">รายงานพนักงาน (mock)</h1>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
              {data.map((entry, index) => (
                <Cell key={`c${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
