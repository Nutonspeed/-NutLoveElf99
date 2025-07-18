"use client"
import React from "react"
import EmptyState from "./EmptyState"
import { Button } from "./buttons/button"
import { AlertTriangle } from "lucide-react"

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  handleRetry = () => {
    this.setState({ hasError: false })
    if (typeof window !== "undefined") window.location.reload()
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <EmptyState
            icon={<AlertTriangle className="h-8 w-8 text-red-600" />}
            title="เกิดข้อผิดพลาด"
            description="โปรดลองอีกครั้ง"
          >
            <Button onClick={this.handleRetry}>ลองใหม่</Button>
          </EmptyState>
        </div>
      )
    }
    return this.props.children
  }
}
