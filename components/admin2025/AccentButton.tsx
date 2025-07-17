"use client"
import { ButtonHTMLAttributes } from "react"

export default function AccentButton2025({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="rounded bg-dashboard2025-accent px-3 py-2 text-dashboard2025-accent-foreground"
    >
      {children}
    </button>
  )
}
