"use client"
import { useTheme } from "next-themes"

export default function AboutClient() {
  const { theme } = useTheme()
  return <div>Current theme: {theme}</div>
}
