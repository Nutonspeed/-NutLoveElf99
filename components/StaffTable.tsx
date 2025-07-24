import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/buttons/button'
import type { Staff } from '@/lib/staff'

export default function StaffTable({ staffs }: { staffs: Staff[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ชื่อ</TableHead>
          <TableHead>บทบาท</TableHead>
          <TableHead>ชื่อผู้ใช้</TableHead>
          <TableHead>ใช้งาน</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staffs.map(s => (
          <TableRow key={s.id}>
            <TableCell>{s.name}</TableCell>
            <TableCell>{s.role}</TableCell>
            <TableCell>{s.username}</TableCell>
            <TableCell>{s.active ? '✓' : '✗'}</TableCell>
            <TableCell className="text-right">
              <Link href={`/admin/staffs/${s.id}/edit`}>
                <Button size="sm" variant="outline">แก้ไข</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
        {staffs.length === 0 && (
          <TableRow>
            <TableCell colSpan={5}>ไม่มีข้อมูล</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
