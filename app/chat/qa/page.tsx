"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { listLowRatingConversations, loadConversations } from "@/lib/mock-conversations"

export default function ChatQaPage() {
  const [data, setData] = useState(() => listLowRatingConversations())

  useEffect(() => {
    loadConversations()
    setData(listLowRatingConversations())
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">แชทที่ถูกประเมินต่ำ</h1>
          <Button asChild>
            <Link href="/admin/chat">กลับ</Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>รายการ</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>คะแนน</TableHead>
                  <TableHead>ความคิดเห็นแอดมิน</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.customerName}</TableCell>
                    <TableCell>{c.rating ?? '-'}</TableCell>
                    <TableCell>{c.adminComment ?? '-'}</TableCell>
                  </TableRow>
                ))}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8">
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
