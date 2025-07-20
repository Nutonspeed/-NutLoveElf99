"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAdminRanking, loadConversations, exportKpiCsv, getKpiSummary } from "@/lib/mock-conversations"

export default function RankingPage() {
  const [data, setData] = useState(() => getAdminRanking())
  const [summary, setSummary] = useState(() => getKpiSummary())

  useEffect(() => {
    loadConversations()
    setData(getAdminRanking())
    setSummary(getKpiSummary())
  }, [])

  const exportCsv = () => {
    const blob = new Blob([exportKpiCsv()], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'kpi.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">จัดอันดับแอดมิน</h1>
          <Button asChild>
            <Link href="/admin/chat">กลับ</Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>สรุป KPI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>แชทรวม: {summary.totalChats}</div>
            <div>คะแนนเฉลี่ย: {summary.avgRating.toFixed(2)}</div>
            <div>ตอบช้า: {summary.slow}</div>
            <div>ตอบเร็ว: {summary.fast}</div>
            <Button onClick={exportCsv}>Export CSV</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>อันดับ</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admin</TableHead>
                  <TableHead>คะแนนเฉลี่ย</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((r) => (
                  <TableRow key={r.adminId}>
                    <TableCell>{r.adminId}</TableCell>
                    <TableCell>{r.avgRating}</TableCell>
                  </TableRow>
                ))}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-8">
                      ไม่มีข้อมูล
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
