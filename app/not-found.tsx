"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center space-y-8 px-4">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-9xl font-bold text-gray-200 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Search className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">ไม่พบหน้าที่คุณค้นหา</h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">ขออภัย หน้าที่คุณกำลังมองหาอาจถูกย้าย ลบ หรือไม่มีอยู่จริง</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => window.history.back()} variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            กลับหน้าก่อนหน้า
          </Button>

          <Link href="/">
            <Button size="lg">
              <Home className="mr-2 h-4 w-4" />
              กลับหน้าแรก
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">หรือลองดูหน้าเหล่านี้:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/products">
              <Button variant="ghost" size="sm">
                สินค้าทั้งหมด
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="sm">
                เกี่ยวกับเรา
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="sm">
                ติดต่อเรา
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="ghost" size="sm">
                แชทสด
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
