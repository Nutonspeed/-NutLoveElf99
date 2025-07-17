import { redirect } from 'next/navigation'

export default function Page({ params }: { params: { id: string } }) {
  redirect(`/bill/${params.id}?mode=qr`)
}
