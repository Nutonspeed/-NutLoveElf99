import { getStoreProfile } from '@/core/mock/store'

export default function BillHeader() {
  const company = getStoreProfile()
  return (
    <div className="flex items-start mb-6 space-x-4">
      {company.logoUrl && (
        <img src={company.logoUrl} alt={company.storeName} className="w-12 h-12" />
      )}
      <div className="text-sm">
        <h1 className="text-2xl font-bold mb-1">ใบเสร็จรับเงิน</h1>
        <h2 className="text-xl font-semibold leading-none">{company.storeName}</h2>
        <p className="whitespace-pre-line">{company.address}</p>
        <p>โทร: {company.phoneNumber}</p>
      </div>
    </div>
  )
}
