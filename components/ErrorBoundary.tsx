"use client"
import React from "react"
import EmptyState from "./ui/EmptyState"
import { Button } from "@/components/ui/buttons/button"
import { AlertTriangle } from "lucide-react"

export default class ErrorBoundary extends React.Component<{
  children: React.ReactNode
}> {
  state = { hasError: false, error: null as any }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }

  componentDidCatch(error: any, info: any) {
    if (process.env.NODE_ENV === "development") {
      console.warn("ErrorBoundary caught", error, info)
    }
    fetch('/api/error-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'ui', message: String(error), stack: error?.stack, info })
    }).catch(() => {})
  }

  handleRefresh = () => {
    this.setState({ hasError: false })
    if (typeof window !== "undefined") window.location.reload()
  }

  handleReport = () => {
    fetch('/api/error-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'ui-manual', message: String(this.state.error) })
    }).then(() => alert('reported'))
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <EmptyState
            icon={<AlertTriangle className="h-8 w-8 text-red-600" />}
            title="เกิดปัญหาชั่วคราว"
            description="โปรดลองรีเฟรชหน้านี้"
            action={
              <div className="space-x-2">
                <Button onClick={this.handleRefresh}>Refresh</Button>
                <Button variant="outline" onClick={this.handleReport}>Report this bug</Button>
              </div>
            }
          />
        </div>
      )
    }
    return this.props.children
  }
}
