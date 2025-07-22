import { promises as fs } from 'fs'
import { join } from 'path'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

async function loadBills() {
  const file = join(process.cwd(), 'mock', 'store', 'deleted-bills.json')
  try {
    const text = await fs.readFile(file, 'utf8')
    return JSON.parse(text) as any[]
  } catch {
    return []
  }
}

export default async function DeletedBillsPage() {
  const bills = await loadBills()
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Deleted Bills</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Time</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map(b => (
            <TableRow key={b.id}>
              <TableCell>{b.id}</TableCell>
              <TableCell>{b.customer}</TableCell>
              <TableCell>{b.reason}</TableCell>
              <TableCell>{b.deletedAt && new Date(b.deletedAt).toLocaleString()}</TableCell>
              <TableCell className="space-x-2">
                <form action={`/api/bills/${b.id}/restore`} method="post" className="inline">
                  <Button size="sm" type="submit">Restore</Button>
                </form>
                <form action={`/api/bills/${b.id}/hard-delete`} method="post" className="inline">
                  <Button size="sm" variant="destructive" type="submit">Delete</Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
          {bills.length === 0 && (
            <TableRow><TableCell colSpan={5}>No deleted bills</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
      <Link href="/admin/bills"> <Button>Back</Button> </Link>
    </div>
  )
}
