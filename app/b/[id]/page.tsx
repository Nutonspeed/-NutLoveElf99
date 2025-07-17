import { redirect } from "next/navigation"

export default function BillPage({ params }: { params: { id: string } }) {
  redirect(`/bill/${params.id}`)
}
