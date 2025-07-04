"use client"

import { useToast } from "@/hooks/use-toast"

export function useDevelopmentNotice() {
  const { toast } = useToast()

  const showDevelopmentNotice = (feature: string, description?: string) => {
    toast({
      title: "🚧 กำลังพัฒนา",
      description: `${feature}${description ? ` - ${description}` : ""} อยู่ระหว่างการพัฒนา`,
      duration: 3000,
    })
  }

  return { showDevelopmentNotice }
}
