import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import StaffTable from '@/components/StaffTable'
import { listStaffs } from '@/lib/staff'

export default async function StaffListPage() {
  const staffs = await listStaffs()
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">พนักงาน</h1>
        <Link href="/admin/staffs/create">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" /> เพิ่มพนักงาน
          </Button>
        </Link>
      </div>
      <StaffTable staffs={staffs} />
    </div>
  )
}
