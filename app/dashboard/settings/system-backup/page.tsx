"use client"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"
import { useToast } from "@/hooks/use-toast"

export default function SystemBackupPage() {
  const { toast } = useToast()

  const handleExport = () => {
    const data = JSON.stringify({ ...localStorage }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'system-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const obj = JSON.parse(reader.result as string)
        for (const k in obj) localStorage.setItem(k, obj[k])
        toast({ title: 'นำเข้าเรียบร้อย' })
      } catch {
        toast({ title: 'นำเข้าไม่สำเร็จ', variant: 'destructive' })
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">System Backup</h1>
      <div className="flex flex-col gap-2 max-w-sm">
        <Button onClick={handleExport}>Export Settings</Button>
        <Input type="file" onChange={handleImport} />
      </div>
    </div>
  )
}
