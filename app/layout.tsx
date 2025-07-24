import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { FeatureFlagProvider } from "@/contexts/feature-flag-context";
import { DemoProvider } from "@/contexts/demo-context";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { CompareProvider } from "@/contexts/compare-context";
import { ReviewImagesProvider } from "@/contexts/review-images-context";
import { FavoritesProvider } from "@/contexts/favorites-context";
import { RecentProductsProvider } from "@/contexts/recent-products-context";
import { AdminProductGroupsProvider } from "@/contexts/admin-product-groups-context";
import { validateMockData } from "@/lib/mock-validator";
import RedirectMobileHome from "@/components/RedirectMobileHome";
import DevBar from "@/components/DevBar";
import StoreBottomNav from "@/components/StoreBottomNav";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import LanguageSetter from "@/components/LanguageSetter";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SofaCover Pro - ผ้าคลุมโซฟาคุณภาพพรีเมียม",
  description: "ระบบขายผ้าคลุมโซฟาออนไลน์ที่ทันสมัยและครบครัน",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "development") {
    validateMockData();
  }
  return (
    <html lang="th">
      <body className={`${inter.className} px-4 sm:px-6 overflow-x-hidden`}>
        <LanguageSetter />
        <AnalyticsScripts />
        <FeatureFlagProvider>
          <DemoProvider>
            <AuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <RecentProductsProvider>
                    <CompareProvider>
                      <FavoritesProvider>
                        <AdminProductGroupsProvider>
                          <ReviewImagesProvider>
                            <RedirectMobileHome />
                            {children}
                            <StoreBottomNav className="print:hidden" />
                            {process.env.NODE_ENV !== "production" && (
                              <DevBar className="print:hidden" />
                            )}
                            <Toaster />
                            <LanguageSwitcher />
                          </ReviewImagesProvider>
                        </AdminProductGroupsProvider>
                      </FavoritesProvider>
                    </CompareProvider>
                  </RecentProductsProvider>
                </WishlistProvider>
              </CartProvider>
            </AuthProvider>
          </DemoProvider>
        </FeatureFlagProvider>
      </body>
    </html>
  );
}
