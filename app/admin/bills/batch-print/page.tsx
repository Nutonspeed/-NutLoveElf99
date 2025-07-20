"use client"
import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/inputs/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { downloadCSV, downloadPDF } from "@/lib/mock-export"
import { mockBills } from "@/mock/bills"
import { toast } from "sonner"

export default function BatchPrintBillsPage() {
  const [selected, setSelected] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [tagFilter, setTagFilter] = useState<string>("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [progress, setProgress] = useState(0)
  const [size, setSize] = useState(0)

  const tags = Array.from(new Set(mockBills.flatMap(b => b.tags || [])))

  const filtered = mockBills.filter(b => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false
    if (tagFilter !== "all" && !(b.tags || []).includes(tagFilter)) return false
    if (startDate && new Date(b.createdAt) < new Date(startDate)) return false
    if (endDate && new Date(b.createdAt) > new Date(endDate)) return false
    return true
  })

  const toggle = (id: string, checked: boolean) => {
    setSelected(s => checked ? [...s, id] : s.filter(x => x !== id))
  }

  const selectAll = (checked: boolean) => {
    if (checked) setSelected(filtered.map(b => b.id))
    else setSelected([])
  }

  const handlePrint = () => {
    if (selected.length === 0) { toast.error("กรุณาเลือกบิล"); return }
    const win = window.open("", "_blank")
    if (!win) return
    const html = selected.map(id => {
      const b = mockBills.find(x => x.id === id)
      return b ? `<h3>${b.id} - ${b.customer}</h3>` : ""
    }).join("<hr/>")
    win.document.write(`<html><body>${html}</body></html>`)
    win.document.close()
    win.print()
  }

  const handleCSV = () => {
    if (selected.length === 0) { toast.error("กรุณาเลือกบิล"); return }
    const rows = selected.map(id => {
      const b = mockBills.find(x => x.id === id)!
      return { id: b.id, customer: b.customer, status: b.status, date: b.createdAt }
    })
    downloadCSV(rows, "bills.csv")
  }

  const handlePDF = () => {
    if (selected.length === 0) { toast.error("กรุณาเลือกบิล"); return }
    setSize(selected.length * 20)
    setProgress(0)
    let p = 0
    const timer = setInterval(() => {
      p += 20
      setProgress(p)
      if (p >= 100) {
        clearInterval(timer)
        downloadPDF("mock merged pdf", "bills.pdf")
        toast.success("Exported PDF (mock)")
        setTimeout(() => setProgress(0), 500)
      }
    }, 300)
  }

  const allChecked = filtered.length > 0 && selected.length === filtered.length
  const indeterminate = selected.length > 0 && selected.length < filtered.length

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">พิมพ์หลายบิล</h1>
      <Card>
        <CardHeader>
          <CardTitle>ตัวกรอง</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-end gap-4">
          <div>
            <label className="text-sm block">จาก</label>
            <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-40" />
          </div>
          <div>
            <label className="text-sm block">ถึง</label>
            <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-40" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="สถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="pending">รอตรวจสอบ</SelectItem>
              <SelectItem value="unpaid">รอชำระ</SelectItem>
              <SelectItem value="paid">ชำระแล้ว</SelectItem>
              <SelectItem value="cancelled">ยกเลิก</SelectItem>
            </SelectContent>
          </Select>
          {tags.length > 0 && (
            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="แท็ก" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">แท็กทั้งหมด</SelectItem>
                {tags.map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>เลือกบิล ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox checked={allChecked} onCheckedChange={c => selectAll(c as boolean)} ref={r => { if (r) r.indeterminate = indeterminate }} />
                </TableHead>
                <TableHead>เลขบิล</TableHead>
                <TableHead>ลูกค้า</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead>วันที่</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(b => (
                <TableRow key={b.id}>
                  <TableCell>
                    <Checkbox checked={selected.includes(b.id)} onCheckedChange={c => toggle(b.id, c as boolean)} />
                  </TableCell>
                  <TableCell>{b.id}</TableCell>
                  <TableCell>{b.customer}</TableCell>
                  <TableCell>{b.status}</TableCell>
                  <TableCell>{new Date(b.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length === 0 && <p className="text-center text-sm text-gray-500">ไม่พบข้อมูล</p>}
        </CardContent>
      </Card>
      {selected.length > 0 && (
        <div className="flex space-x-2">
          <Button onClick={handlePrint}>Print All</Button>
          <Button onClick={handlePDF}>Export PDFs</Button>
          <Button onClick={handleCSV}>Export CSV</Button>
        </div>
      )}
      {progress > 0 && progress < 100 && (
        <div className="space-y-2 max-w-sm">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground">ประมาณ {size} KB</p>
        </div>
      )}
    </div>
  )
}
