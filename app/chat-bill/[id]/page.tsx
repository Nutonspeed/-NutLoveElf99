import { redirect } from 'next/navigation'

export default function ChatBillPage({ params }: { params: { id: string } }) {
  redirect(`/bill/${params.id}`)
}
