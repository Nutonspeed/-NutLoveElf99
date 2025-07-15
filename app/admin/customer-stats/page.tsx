"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import EmptyState from "@/components/EmptyState"
import { activities, loadActivities, type CustomerActivity } from "@/lib/mock-customer-timeline"

export default function AdminCustomerStatsPage() {
  const [data, setData] = useState<CustomerActivity[]>([])

  useEffect(() => {
    loadActivities()
    setData([...activities])
  }, [])

  const counts = useMemo(() => {
    const grid = Array.from({ length: 7 }, () => Array(24).fill(0)) as number[][]
    data.forEach((a) => {
      const d = new Date(a.timestamp)
      const day = d.getDay()
      const hour = d.getHours()
      grid[day][hour] += 1
    })
    return grid
  }, [data])

  const max = Math.max(0, ...counts.flat())

  const color = (count: number) => {
    if (count === 0 || max === 0) return "bg-gray-100"
    const level = count / max
    if (level > 0.66) return "bg-blue-500"
    if (level > 0.33) return "bg-blue-300"
    return "bg-blue-200"
  }

  const days = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">สถิติพฤติกรรมลูกค้า</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>แผนผังการใช้งานตามวันและเวลา</CardTitle>
          </CardHeader>
          <CardContent>
            {data.length === 0 ? (
              <EmptyState title="ยังไม่มีพฤติกรรมลูกค้าในระบบ" />
            ) : (
              <div className="overflow-auto">
                <table className="border-collapse">
                  <thead>
                    <tr>
                      <th className="p-1" />
                      {Array.from({ length: 24 }).map((_, h) => (
                        <th key={h} className="p-1 text-xs font-normal text-center">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {days.map((day, d) => (
                      <tr key={day}>
                        <td className="pr-1 text-xs font-medium whitespace-nowrap">
                          {day}
                        </td>
                        {Array.from({ length: 24 }).map((_, h) => {
                          const count = counts[d][h]
                          return (
                            <td key={h} className="p-0">
                              <div
                                className={`w-4 h-4 ${color(count)}`}
                                title={`${count}`}
                              />
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
