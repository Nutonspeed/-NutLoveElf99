"use client"
import { useRouter } from 'next/navigation'
import StaffForm, { StaffFormData } from '@/components/StaffForm'
import { addStaff } from '@/lib/staff'
import { toast } from 'sonner'

export default function CreateStaffPage() {
  const router = useRouter()

  const handleSave = async (data: StaffFormData) => {
    await addStaff(data)
    toast.success('เพิ่มพนักงานแล้ว')
    router.push('/admin/staffs')
  }

  return (
    <div className="container mx-auto max-w-md py-8">
      <h1 className="text-2xl font-bold mb-4">เพิ่มพนักงาน</h1>
      <StaffForm onSubmit={handleSave} />
    </div>
  )
}
