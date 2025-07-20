export default function BillPrintDate({ id }: { id: string }) {
  const date = new Date().toLocaleDateString('th-TH')
  return <p className="text-sm text-right mb-4">เลขที่บิล {id} | พิมพ์ {date}</p>
}
