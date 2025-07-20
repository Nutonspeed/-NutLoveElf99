export default function BillNoteBox({ note }: { note?: string }) {
  if (!note) return null
  return <p className="border p-2 mt-4 text-sm">หมายเหตุ: {note}</p>
}
