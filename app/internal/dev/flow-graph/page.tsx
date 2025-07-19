"use client"
import { useState } from "react"
import ReactFlow, { Background, Controls } from "reactflow"
import "reactflow/dist/style.css"

import { mockCustomers } from "@/lib/mock-customers"
import { mockOrders } from "@/lib/mock-orders"
import type { Payment } from "@/lib/mock/payment"
import { mockFabricReviews } from "@/lib/mock/fabricReviews"
import { Button } from "@/components/ui/buttons/button"

export default function FlowGraphPage() {
  if (process.env.NODE_ENV !== "development") {
    return <div className="p-4">Available only in development mode.</div>
  }

  const customer = mockCustomers[0]
  const order = mockOrders[0]
  const payment: Payment = {
    orderId: order.id,
    date: order.createdAt,
    amount: order.total,
  }
  const review = mockFabricReviews[0]

  const nodes = [
    { id: "customer", data: { label: `Customer: ${customer.name}` }, position: { x: 0, y: 0 } },
    { id: "order", data: { label: `Order: ${order.id}` }, position: { x: 250, y: 0 } },
    { id: "payment", data: { label: `Payment: ${payment.amount}` }, position: { x: 500, y: 0 } },
    { id: "review", data: { label: `Review: ${review.id}` }, position: { x: 750, y: 0 } },
  ]

  const edges = [
    { id: "e1-2", source: "customer", target: "order" },
    { id: "e2-3", source: "order", target: "payment" },
    { id: "e3-4", source: "payment", target: "review" },
  ]

  const graphData = { nodes, edges }
  const [showJson, setShowJson] = useState(false)

  return (
    <div className="container mx-auto space-y-4 p-4">
      <h1 className="text-2xl font-bold">Flow Graph</h1>
      <div className="h-96 border">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <Button variant="outline" onClick={() => setShowJson(!showJson)}>
        {showJson ? "Hide JSON" : "Show JSON"}
      </Button>
      {showJson && (
        <pre className="bg-gray-100 text-xs p-2 overflow-x-auto">
          {JSON.stringify(graphData, null, 2)}
        </pre>
      )}
    </div>
  )
}
