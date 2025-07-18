"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function RefNotice() {
  const searchParams = useSearchParams()
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    const ref = searchParams.get("ref")
    if (ref) {
      sessionStorage.setItem("ref", ref)
      setMsg("เพื่อนของคุณแนะนำลิงก์นี้")
    }
  }, [searchParams])

  if (!msg) return null
  return (
    <div className="mb-4 rounded bg-green-100 p-2 text-sm text-green-700">
      {msg}
    </div>
  )
}
