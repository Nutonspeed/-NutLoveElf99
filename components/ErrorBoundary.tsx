"use client"
import React from "react"

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
          <div className="text-center space-y-2">
            <p>เกิดปัญหาชั่วคราว</p>
            <button
              className="px-4 py-2 rounded bg-primary text-white"
              onClick={this.handleRefresh}
            >
              Refresh
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
