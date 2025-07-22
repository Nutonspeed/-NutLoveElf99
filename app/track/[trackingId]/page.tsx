import { promises as fs } from 'fs'
import { join } from 'path'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

interface StatusEntry {trackingId:string;status:string;history:{date:string;text:string}[]}

async function getStatus(id:string):Promise<StatusEntry|null> {
  try {
    const txt = await fs.readFile(join(process.cwd(),'mock/store/shipping-status.json'),'utf8')
    const data:StatusEntry[] = JSON.parse(txt)
    return data.find(s=>s.trackingId===id) || null
  } catch {
    return null
  }
}

export default async function TrackingPage({ params }:{params:{trackingId:string}}) {
  const info = await getStatus(params.trackingId)
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">ติดตามพัสดุ #{params.trackingId}</h1>
        {info ? (
          <div className="space-y-4">
            <p className="font-semibold">สถานะปัจจุบัน: {info.status}</p>
            <ul className="space-y-1">
              {info.history.map((h,i)=>(<li key={i}>[{h.date}] {h.text}</li>))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-500">ไม่พบข้อมูลการจัดส่ง</p>
        )}
        <p className="text-center">หากมีคำถาม กรุณาติดต่อทีมสนับสนุนที่ <a href="/support" className="text-blue-600 underline">หน้าช่วยเหลือ</a></p>
      </div>
      <Footer />
    </div>
  )
}
