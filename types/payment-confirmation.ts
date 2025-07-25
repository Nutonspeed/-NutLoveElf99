export interface PaymentConfirmation {
  amountTransferred: number
  transferDate: string
  transferSlipUrl: string
  customerNote?: string
  verified?: boolean
}
