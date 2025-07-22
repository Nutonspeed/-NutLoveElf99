import { listErrors } from '@/lib/errorLog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/buttons/button'

export default async function ErrorLogsPage() {
  const logs = await listErrors()
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Error Logs</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Message</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map(l => (
            <TableRow key={l.id} className={l.resolved ? 'opacity-50' : ''}>
              <TableCell>{new Date(l.timestamp).toLocaleString()}</TableCell>
              <TableCell>{l.type}</TableCell>
              <TableCell>{l.message}</TableCell>
              <TableCell>
                {!l.resolved && (
                  <form action="/api/error-log/resolve" method="post">
                    <input type="hidden" name="id" value={l.id} />
                    <Button size="sm" type="submit">Mark Resolved</Button>
                  </form>
                )}
              </TableCell>
            </TableRow>
          ))}
          {logs.length === 0 && (
            <TableRow><TableCell colSpan={4}>No errors</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
