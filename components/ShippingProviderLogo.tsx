import React from 'react'

export default function ShippingProviderLogo({ provider }: { provider?: string }) {
  if (provider === 'Kerry') {
    return (
      <svg width="80" height="24" viewBox="0 0 80 24" aria-label="Kerry Express">
        <rect width="80" height="24" fill="#ff6600" />
        <text
          x="40"
          y="17"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#fff"
        >
          KERRY
        </text>
      </svg>
    )
  }
  if (provider === 'Flash') {
    return (
      <svg width="80" height="24" viewBox="0 0 80 24" aria-label="Flash Express">
        <rect width="80" height="24" fill="#ffe600" />
        <text
          x="40"
          y="17"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#000"
        >
          FLASH
        </text>
      </svg>
    )
  }
  return null
}
