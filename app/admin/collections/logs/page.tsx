"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { getCollections } from "@/lib/mock-collections"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { CollectionHistory } from "@/types/collection"

interface Entry { name: string; history: CollectionHistory }

export default function CollectionLogsPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  useEffect(() => {
    getCollections().then((cols) => {
      const all: Entry[] = []
      cols.forEach((c) =>
        c.history.forEach((h) => all.push({ name: c.name, history: h })),
      )
      all.sort(
        (a, b) =>
          new Date(b.history.timestamp).getTime() -
          new Date(a.history.timestamp).getTime(),
      )
      setEntries(all)
    })
  }, [])
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/collections">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ประวัติคอลเลกชัน</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Logs ({entries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เวลา</TableHead>
                  <TableHead>คอลเลกชัน</TableHead>
                  <TableHead>เวอร์ชัน</TableHead>
                  <TableHead>แอดมิน</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      {new Date(e.history.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>{e.name}</TableCell>
                    <TableCell>{e.history.version}</TableCell>
                    <TableCell>{e.history.admin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
