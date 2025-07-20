import { ReactNode } from 'react'
import { pageClass } from '@/lib/pdf/print-styles'

export default function BillPrintLayout({ children }: { children: ReactNode }) {
  return <div className={pageClass}>{children}</div>
}
