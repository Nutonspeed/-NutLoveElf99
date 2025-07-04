"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Construction, X } from "lucide-react"
import { useState } from "react"

interface DevelopmentNoticeProps {
  feature: string
  description?: string
  onClose?: () => void
}

export function DevelopmentNotice({ feature, description, onClose }: DevelopmentNoticeProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if (!isVisible) return null

  return (
    <Alert className="border-orange-200 bg-orange-50">
      <Construction className="h-4 w-4 text-orange-600" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <strong className="text-orange-800">กำลังพัฒนา:</strong>{" "}
          <span className="text-orange-700">
            {feature} {description && `- ${description}`}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="h-6 w-6 p-0 text-orange-600 hover:text-orange-800"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
