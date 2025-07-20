import { triggerPrint } from '@/lib/pdf/print'
import { downloadPDF } from '@/lib/pdf/download'
import PrintActionBar from '@/components/ui/PrintActionBar'

export default function BillPrintActions() {
  return <PrintActionBar onPrint={triggerPrint} onDownload={downloadPDF} />
}
