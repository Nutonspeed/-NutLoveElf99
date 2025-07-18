"use client"
import WithSuspense from "@/components/WithSuspense"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <WithSuspense>
        <div className="flex-1">{children}</div>
      </WithSuspense>
      <Footer />
    </div>
  )
}
