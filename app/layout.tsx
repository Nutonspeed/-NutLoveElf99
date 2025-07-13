import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { CompareProvider } from "@/contexts/compare-context"
import { ReviewImagesProvider } from "@/contexts/review-images-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SofaCover Pro - ผ้าคลุมโซฟาคุณภาพพรีเมียม",
  description: "ระบบขายผ้าคลุมโซฟาออนไลน์ที่ทันสมัยและครบครัน",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
                <ReviewImagesProvider>
                  {children}
                  <Toaster />
                </ReviewImagesProvider>
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
