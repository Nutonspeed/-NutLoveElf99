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
import { FavoritesProvider } from "@/contexts/favorites-context"
import { AdminProductGroupsProvider } from "@/contexts/admin-product-groups-context"
import { validateMockData } from "@/lib/mock-validator"
import RedirectMobileHome from "@/components/RedirectMobileHome"
import { ThemeProvider } from "@/contexts/theme-context"
import ThemeWrapper from "@/components/ThemeWrapper"

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
  if (process.env.NODE_ENV === "development") {
    validateMockData()
  }
  return (
    <html lang="th">
      <body className={`${inter.className} px-4 sm:px-6 overflow-x-hidden`}>
        <ThemeProvider>
          <ThemeWrapper>
            <AuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <CompareProvider>
                    <FavoritesProvider>
                      <AdminProductGroupsProvider>
                        <ReviewImagesProvider>
                          <RedirectMobileHome />
                          {children}
                          <Toaster />
                        </ReviewImagesProvider>
                      </AdminProductGroupsProvider>
                    </FavoritesProvider>
                  </CompareProvider>
                </WishlistProvider>
              </CartProvider>
            </AuthProvider>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
