import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface DashboardCategory {
  label: string;
  content: React.ReactNode;
}

export interface DashboardLayoutProps {
  /**
   * Object where key is the tab value and value contains label and content.
   */
  categories?: Record<string, DashboardCategory>;
  /**
   * default active tab key
   */
  defaultCategory?: string;
}

export const defaultCategories: Record<string, DashboardCategory> = {
  orders: { label: "Orders", content: null },
  customers: { label: "Customers", content: null },
  marketing: { label: "Marketing", content: null },
};

export default function DashboardLayout({
  categories = defaultCategories,
  defaultCategory,
}: DashboardLayoutProps) {
  const keys = Object.keys(categories);
  const defaultValue = defaultCategory ?? keys[0];
  return (
    <Tabs defaultValue={defaultValue} className="space-y-4">
      <TabsList className="flex w-full flex-wrap gap-2">
        {keys.map((key) => (
          <TabsTrigger key={key} value={key} className="capitalize">
            {categories[key].label}
          </TabsTrigger>
        ))}
      </TabsList>
      {keys.map((key) => (
        <TabsContent key={key} value={key} className="mt-0">
          {categories[key].content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
