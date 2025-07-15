"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/cards/card"
import { getMonthlyFabricRanking } from "@/lib/get-monthly-fabric-ranking"
import { getCollectionViewStats } from "@/lib/get-collection-view-stats"

export default function AdminFabricReports() {
  const fabricStats = getMonthlyFabricRanking()
  const collectionStats = getCollectionViewStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/reports">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">รายงานลายผ้า (mock)</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ลายผ้ายอดนิยมประจำเดือน</CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fabricStats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#8884d8" name="ยอดดู" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ยอดดูตามคอลเลกชัน</CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collectionStats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#82ca9d" name="ยอดดู" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
