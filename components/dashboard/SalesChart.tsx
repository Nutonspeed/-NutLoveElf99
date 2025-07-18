"use client"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { Card, CardContent } from '@/components/ui/cards/card'
import FallbackCenter from '@/components/FallbackCenter'

interface SalesChartProps {
  data: { name: string; total: number }[]
}

export default function SalesChart({ data }: SalesChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-40">
          <FallbackCenter title="ไม่มีข้อมูลในช่วงเวลานี้" />
        </CardContent>
      </Card>
    )
  }

  try {
    return (
      <Card>
        <CardContent className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: 0, right: 0 }}>
              <XAxis dataKey="name" />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="total" fill="#0ea5e9" name="ยอดขาย" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )
  } catch {
    return null
  }
}
