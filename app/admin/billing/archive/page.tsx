"use client"
import { useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/cards/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/buttons/button'
import { useBillStore } from '@/core/store'

export default function BillingArchivePage() {
  const store = useBillStore()

  useEffect(() => {
    store.refresh()
  }, [])

  const bills = store.archived

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4">Archived Bills</h1>
      <Card>
        <CardHeader>
          <CardTitle>Archived / Expired Bills</CardTitle>
        </CardHeader>
        <CardContent>
          {bills.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-24" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>{b.id}</TableCell>
                    <TableCell>{b.customer}</TableCell>
                    <TableCell>{new Date(b.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => store.restore(b.id)}>
                        Restore
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-sm text-gray-500">No archived bills</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
