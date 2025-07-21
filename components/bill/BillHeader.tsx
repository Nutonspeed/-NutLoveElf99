import { company } from '@/lib/config/company.config'
import { formatAddress } from '@/lib/format/address'

export default function BillHeader() {
  return (
    <div className="flex items-start mb-6 space-x-4">
      {company.logo && (
        <img src={company.logo} alt={company.name} className="w-12 h-12" />
      )}
      <div className="text-sm">
        <h1 className="text-2xl font-bold mb-1">ใบเสร็จรับเงิน</h1>
        <h2 className="text-xl font-semibold leading-none">{company.name}</h2>
        <p className="whitespace-pre-line">{formatAddress(company.address)}</p>
        <p>โทร: {company.phone}</p>
      </div>
    </div>
  )
}
