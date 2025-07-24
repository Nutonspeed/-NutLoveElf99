"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import StaffForm, { StaffFormData } from '@/components/StaffForm'
import { getStaff, updateStaff } from '@/lib/staff'
import { toast } from 'sonner'

export default function EditStaffPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [staff, setStaff] = useState<StaffFormData | null>(null)

  useEffect(() => {
    getStaff(id).then(s => s && setStaff(s))
  }, [id])

  const handleSave = async (data: StaffFormData) => {
    await updateStaff(id, data)
    toast.success('บันทึกแล้ว')
    router.push('/admin/staffs')
  }

  if (!staff) return <div className="p-4">กำลังโหลด...</div>

  return (
    <div className="container mx-auto max-w-md py-8">
      <h1 className="text-2xl font-bold mb-4">แก้ไขพนักงาน</h1>
      <StaffForm onSubmit={handleSave} defaultValues={staff} />
    </div>
  )
}
