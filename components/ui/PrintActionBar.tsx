import { Button } from './buttons/button'

export default function PrintActionBar({ onPrint, onDownload }: { onPrint: () => void; onDownload: () => void }) {
  return (
    <div className="print:hidden flex gap-2 mb-4">
      <Button onClick={onPrint}>พิมพ์หน้านี้</Button>
      <Button onClick={onDownload}>ดาวน์โหลด PDF</Button>
    </div>
  )
}
