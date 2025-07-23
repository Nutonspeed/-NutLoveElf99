import { redirect } from 'next/navigation'

export default function ShortBill({ params }: { params: { billId: string } }) {
  redirect(`/bill/view/${params.billId}`)
}
