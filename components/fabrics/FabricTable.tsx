"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/modals/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import type { AdminFabric } from "@/mock/fabrics"

interface FabricTableProps {
  items: AdminFabric[]
}

export default function FabricTable({ items }: FabricTableProps) {
  const [status, setStatus] = useState<"all" | "active" | "archived">("all")
  const [selected, setSelected] = useState<AdminFabric | null>(null)

  const filtered = items.filter((f) => status === "all" || f.status === status)

  return (
    <>
      <div className="flex justify-end pb-4">
        <Select value={status} onValueChange={(v) => setStatus(v as any)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {filtered.length === 0 ? (
        <Alert>
          <AlertTitle>No fabrics</AlertTitle>
          <AlertDescription>ไม่พบข้อมูลผ้า</AlertDescription>
        </Alert>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((f) => (
              <TableRow
                key={f.id}
                onClick={() => setSelected(f)}
                className="cursor-pointer"
              >
                <TableCell>
                  <div className="relative h-12 w-12">
                    <Image
                      src={f.image}
                      alt={f.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </TableCell>
                <TableCell>{f.name}</TableCell>
                <TableCell>{f.code}</TableCell>
                <TableCell>{f.stock}</TableCell>
                <TableCell>{f.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-2">
              <div className="relative w-full h-40">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <p>Code: {selected.code}</p>
              <p>Status: {selected.status}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
