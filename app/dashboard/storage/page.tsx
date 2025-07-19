"use client"
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/inputs/input'
import { loadStoredFiles, getFiles, StoredFile } from '@/lib/mock/files'

export default function StoragePage() {
  const [files, setFiles] = useState<StoredFile[]>([])
  const [type, setType] = useState('')
  const [user, setUser] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    loadStoredFiles()
    setFiles(getFiles())
  }, [])

  const filtered = files.filter(
    f => (!type || f.type === type) &&
      (!user || f.user.includes(user)) &&
      (!date || f.date.startsWith(date))
  )

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">ไฟล์ทั้งหมด</h1>
      <div className="flex flex-wrap gap-2">
        <Input placeholder="วันที่ YYYY-MM-DD" value={date} onChange={e => setDate(e.target.value)} />
        <Input placeholder="ประเภท" value={type} onChange={e => setType(e.target.value)} />
        <Input placeholder="ผู้ใช้" value={user} onChange={e => setUser(e.target.value)} />
      </div>
      <ul className="list-disc pl-4 space-y-1">
        {filtered.map(f => (
          <li key={f.id}>{f.name} - {f.type} - {f.user} - {new Date(f.date).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  )
}
