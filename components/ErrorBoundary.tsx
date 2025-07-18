"use client"
import React from "react"
import EmptyState from "./ui/EmptyState"
import { Button } from "@/components/ui/buttons/button"
import { AlertTriangle } from "lucide-react"

export default class ErrorBoundary extends React.Component<{
  children: React.ReactNode
}> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    if (process.env.NODE_ENV === "development") {
      console.warn("ErrorBoundary caught", error, info)
    }
  }

  handleRefresh = () => {
    this.setState({ hasError: false })
    if (typeof window !== "undefined") window.location.reload()
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <EmptyState
            icon={<AlertTriangle className="h-8 w-8 text-red-600" />}
            title="เกิดปัญหาชั่วคราว"
            description="โปรดลองรีเฟรชหน้านี้"
            action={<Button onClick={this.handleRefresh}>Refresh</Button>}
          />
        </div>
      )
    }
    return this.props.children
  }
}
