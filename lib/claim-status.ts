export type ClaimStatus = 'pending' | 'approved' | 'rejected'

import type { BadgeProps } from '@/components/ui/badge'

export function getClaimStatusText(status: ClaimStatus): string {
  switch (status) {
    case 'pending':
      return 'รอตรวจสอบ'
    case 'approved':
      return 'อนุมัติคืนเงิน'
    case 'rejected':
      return 'ปฏิเสธ'
    default:
      return status
  }
}

export function getClaimStatusBadgeVariant(
  status: ClaimStatus,
): BadgeProps['variant'] {
  switch (status) {
    case 'approved':
      return 'default'
    case 'pending':
      return 'secondary'
    case 'rejected':
      return 'destructive'
    default:
      return 'outline'
  }
}
