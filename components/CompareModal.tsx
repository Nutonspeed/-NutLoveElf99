import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/modals/dialog"

interface Fabric {
  id: string
  slug: string
  name: string
  color: string
  price: number
  images: string[]
}

interface CompareModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fabrics: Fabric[]
}

export function CompareModal({ open, onOpenChange, fabrics }: CompareModalProps) {
  if (fabrics.length < 2) return null
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>เปรียบเทียบลายผ้า</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full text-center border">
            <thead>
              <tr>
                <th className="px-4 py-2">รายละเอียด</th>
                {fabrics.map((f) => (
                  <th key={f.slug} className="px-4 py-2">
                    <Image
                      src={f.images[0] || "/placeholder.svg"}
                      alt={f.name}
                      width={100}
                      height={100}
                      className="mx-auto rounded"
                    />
                    <p className="mt-2 font-medium">{f.name}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium">สี</td>
                {fabrics.map((f) => (
                  <td key={f.slug}>{f.color}</td>
                ))}
              </tr>
              <tr>
                <td className="font-medium">ราคา</td>
                {fabrics.map((f) => (
                  <td key={f.slug}>฿{f.price.toLocaleString()}</td>
                ))}
              </tr>
              <tr>
                <td className="font-medium">ความรู้สึก</td>
                {fabrics.map((f) => (
                  <td key={f.slug}>นุ่มสบาย</td>
                ))}
              </tr>
              <tr>
                <td className="font-medium">ผิวสัมผัส</td>
                {fabrics.map((f) => (
                  <td key={f.slug}>ผิวละเอียด</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
