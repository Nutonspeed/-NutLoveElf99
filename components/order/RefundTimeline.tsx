"use client"
import { Badge } from '@/components/ui/badge'
import type { Claim } from '@/lib/mock-claims'
import { getClaimStatusBadgeVariant, getClaimStatusText } from '@/lib/claim-status'
import { formatThaiDate } from '@/lib/utils'

interface RefundTimelineProps {
  claim: Claim
}

export function RefundTimeline({ claim }: RefundTimelineProps) {
  const createdAt = new Date(Number(claim.id))
  return (
    <ul className="space-y-2">
      <li className="flex items-start space-x-2">
        <span className="w-44 text-sm text-gray-500">
          {formatThaiDate(createdAt)}
        </span>
        <Badge variant="secondary">ร้องขอคืนเงิน</Badge>
        <span className="text-sm">{claim.reason}</span>
      </li>
      {claim.status !== 'pending' && (
        <li className="flex items-start space-x-2">
          <span className="w-44 text-sm text-gray-500">
            {formatThaiDate(createdAt)}
          </span>
          <Badge variant={getClaimStatusBadgeVariant(claim.status)}>
            {getClaimStatusText(claim.status)}
          </Badge>
        </li>
      )}
    </ul>
  )
}

export type { RefundTimelineProps }
