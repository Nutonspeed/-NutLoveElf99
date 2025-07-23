"use client"
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/inputs/input'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { getBills } from '@/core/mock/store'
import { getRevenueSummary, getRevenueHistory } from '@/lib/revenue'
import { downloadCSV } from '@/lib/mock-export'
import { formatCurrency } from '@/lib/utils'

function startOfMonth() {
  const d = new Date()
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d
}

function startOfWeek() {
  const d = new Date()
  d.setDate(d.getDate() - 6)
  d.setHours(0, 0, 0, 0)
  return d
}

export default function RevenueReportPage() {
  const summary = useMemo(() => getRevenueSummary(), [])
  const [mode, setMode] = useState<'week' | 'month' | 'custom'>('week')
  const [start, setStart] = useState(startOfWeek().toISOString().slice(0, 10))
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 10))

  const applyPreset = (value: 'week' | 'month' | 'custom') => {
    if (value === 'week') {
      setStart(startOfWeek().toISOString().slice(0, 10))
      setEnd(new Date().toISOString().slice(0, 10))
    } else if (value === 'month') {
      setStart(startOfMonth().toISOString().slice(0, 10))
      setEnd(new Date().toISOString().slice(0, 10))
    }
    setMode(value)
  }

  const startDate = useMemo(() => new Date(start), [start])
  const endDate = useMemo(() => new Date(end + 'T23:59:59'), [end])

  const bills = useMemo(
    () =>
      getBills().filter(b => {
        if (b.status !== 'paid') return false
        const d = new Date(b.createdAt)
        return d >= startDate && d <= endDate
      }),
    [startDate, endDate],
  )

  const chartData = useMemo(() => getRevenueHistory(startDate, endDate), [startDate, endDate])

  const exportCsv = () => {
    downloadCSV(
      bills.map(b => ({
        date: b.createdAt.slice(0, 10),
        item: b.id,
        customer: b.customer,
        total: billTotal(b),
      })),
      'revenue.csv',
    )
  }

  function billTotal(b: ReturnType<typeof getBills>[number]) {
    return b.items.reduce((s, i) => s + i.price * i.quantity, 0) + (b.shipping || 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/reports">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">สรุปรายรับ</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>วันนี้</CardTitle>
            </CardHeader>
            <CardContent>{formatCurrency(summary.today)}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>เดือนนี้</CardTitle>
            </CardHeader>
            <CardContent>{formatCurrency(summary.thisMonth)}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>ปีนี้</CardTitle>
            </CardHeader>
            <CardContent>{formatCurrency(summary.thisYear)}</CardContent>
          </Card>
        </div>
        <div className="flex gap-2 items-end">
          <Select value={mode} onValueChange={v => applyPreset(v as 'week' | 'month' | 'custom')}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">สัปดาห์นี้</SelectItem>
              <SelectItem value="month">เดือนนี้</SelectItem>
              <SelectItem value="custom">ช่วงเวลาเอง</SelectItem>
            </SelectContent>
          </Select>
          {mode === 'custom' && (
            <>
              <Input type="date" value={start} onChange={e => setStart(e.target.value)} />
              <Input type="date" value={end} onChange={e => setEnd(e.target.value)} />
            </>
          )}
          <Button onClick={exportCsv} variant="outline">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
        {chartData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>รายได้ย้อนหลัง</CardTitle>
            </CardHeader>
            <CardContent className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#0ea5e9" name="ยอดขาย" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
