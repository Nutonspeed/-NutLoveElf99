"use client"

import { useDebug } from "@/contexts/debug-context"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDebugPage() {
  const { debug, setDebug } = useDebug()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Debug Mode</h1>
        </div>
        <Card>
          <CardHeader><CardTitle>ตั้งค่า</CardTitle></CardHeader>
          <CardContent className="flex items-center space-x-4">
            <span>แสดงค่าพารามิเตอร์ UTM</span>
            <Switch checked={debug} onCheckedChange={setDebug} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
