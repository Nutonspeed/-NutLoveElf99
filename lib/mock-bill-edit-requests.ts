export interface BillEditRequest {
  billId: string
  text: string
  createdAt: string
}

export let billEditRequests: BillEditRequest[] = []

export function loadBillEditRequests() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('billEditRequests')
    if (stored) billEditRequests = JSON.parse(stored)
  }
}

export function addBillEditRequest(req: BillEditRequest) {
  billEditRequests.push(req)
  if (typeof window !== 'undefined') {
    localStorage.setItem('billEditRequests', JSON.stringify(billEditRequests))
  }
}
