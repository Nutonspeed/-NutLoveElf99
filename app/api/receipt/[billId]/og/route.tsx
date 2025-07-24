import { ImageResponse } from 'next/og'
import { NextResponse } from 'next/server'
import { getPaidBill, calcTotal } from '@/lib/receipt'

export const runtime = 'edge'

export function GET(req: Request, { params }: { params: { billId: string } }) {
  const bill = getPaidBill(params.billId)
  if (!bill) {
    const url = new URL('/placeholder.jpg', req.url)
    return NextResponse.redirect(url)
  }
  const total = calcTotal(bill)
  const date = new Date().toLocaleDateString('th-TH')
  return new ImageResponse(
    <div style={{fontSize:48,color:'#000',background:'#fff',width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'40px'}}>
      <div>Receipt #{bill.id}</div>
      <div>{date}</div>
      <div style={{fontSize:64,fontWeight:'bold',marginTop:20}}>฿{total.toFixed(2)}</div>
    </div>,
    { width: 1200, height: 630 },
  )
}
