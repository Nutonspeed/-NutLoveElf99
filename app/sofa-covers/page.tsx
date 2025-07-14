'use client'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const mockFabrics = [
  { id: 1, name: 'สีเทาเข้ม', image: '/images/fabrics/dark-gray.jpg' },
  { id: 2, name: 'สีเบจ', image: '/images/fabrics/beige.jpg' },
  { id: 3, name: 'ลายสก็อต', image: '/images/fabrics/scott.jpg' },
  { id: 4, name: 'ลายคลาสสิก', image: '/images/fabrics/classic.jpg' },
]

export default function SofaCoversPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>ผ้าคลุมโซฟาเข้ารูป กันน้ำ - ElfSofaCover</title>
        <meta
          name="description"
          content="ผ้าคลุมโซฟาสำหรับทุกทรง กันน้ำ ผ้ายืดหยุ่น ครบไซส์ พร้อมส่งทั่วไทย"
        />
        <meta property="og:title" content="ผ้าคลุมโซฟาเข้ารูป - ElfSofaCover" />
      </Head>

      <Navbar />

      <main className="p-6 max-w-5xl mx-auto flex-1">
        <h1 className="text-3xl font-bold mb-4">ผ้าคลุมโซฟาเข้ารูป พร้อมส่ง</h1>
        <p className="mb-6 text-gray-700">
          เลือกผ้าคลุมโซฟาที่เหมาะกับบ้านคุณ ทั้งผ้ายืดหยุ่น กันน้ำ และลายยอดนิยม
        </p>

        {mockFabrics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {mockFabrics.map((fabric) => (
              <div key={fabric.id} className="border rounded-xl p-4 shadow">
                <Image
                  src={fabric.image}
                  alt={`ผ้าคลุมโซฟา ${fabric.name}`}
                  width={400}
                  height={300}
                  className="rounded-xl mb-2"
                />
                <p className="text-center font-medium">{fabric.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            กำลังอัปเดตลายผ้าคลุมโซฟา โปรดกลับมาใหม่เร็ว ๆ นี้
          </div>
        )}

        <div className="mt-10 space-y-3 text-blue-600 font-medium">
          <Link href="/collections" className="block hover:underline">
            ดูคอลเลกชันผ้าทั้งหมด
          </Link>
          <Link href="/products" className="block hover:underline">
            ดูสินค้าเสริม
          </Link>
          <Link href="/chat" className="block hover:underline">
            แชทกับแอดมินเพื่อวัดไซส์
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
