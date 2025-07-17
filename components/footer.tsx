import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export function Footer() {
  const { theme } = useTheme()
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SC</span>
              </div>
              <span className="font-bold text-xl">SofaCover Pro</span>
            </div>
            <p className="text-gray-400 text-sm">ผู้นำด้านผ้าคลุมโซฟาคุณภาพสูง ด้วยประสบการณ์กว่า 10 ปี</p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">ลิงก์ด่วน</h3>
            <div className="space-y-2">
              <Link href="/products" className="block text-gray-400 hover:text-white text-sm">
                สินค้าทั้งหมด
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-white text-sm">
                เกี่ยวกับเรา
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white text-sm">
                ติดต่อเรา
              </Link>
              <Link href="/shipping" className="block text-gray-400 hover:text-white text-sm">
                การจัดส่ง
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">บริการลูกค้า</h3>
            <div className="space-y-2">
              <Link href="/faq" className="block text-gray-400 hover:text-white text-sm">
                คำถามที่พบบ่อย
              </Link>
              <Link href="/returns" className="block text-gray-400 hover:text-white text-sm">
                การคืนสินค้า
              </Link>
              <Link href="/warranty" className="block text-gray-400 hover:text-white text-sm">
                การรับประกัน
              </Link>
              <Link href="/size-guide" className="block text-gray-400 hover:text-white text-sm">
                คู่มือเลือกขนาด
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">ติดต่อเรา</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">02-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">info@sofacover.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                <span className="text-gray-400 text-sm">
                  123 ถนนสุขุมวิท แขวงคลองตัน
                  <br />
                  เขตวัฒนา กรุงเทพฯ 10110
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 SofaCover Pro. สงวนลิขสิทธิ์ทั้งหมด.</p>
          <p className="text-gray-500 text-xs mt-2">Theme: {theme === 'admin' ? 'Admin' : 'Customer'}</p>
        </div>
      </div>
    </footer>
  )
}
