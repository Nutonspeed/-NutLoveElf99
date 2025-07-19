"use client"
import type { OrderType } from "@/lib/schema/order"
import type { Customer as CustomerType } from "@/lib/mock-customers"

/**
 * Simple SVG diagram illustrating the order lifecycle.
 * This page is meant for developers to verify shared data types
 * between front‑end and back‑end.
 */
export default function FlowGraphPage() {
  // Example instances typed with shared schemas
  const order: OrderType = {
    id: "demo-order",
    customerId: "demo-customer",
    items: [],
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const customer: CustomerType = {
    id: "demo-customer",
    name: "Demo Customer",
    email: "demo@example.com",
    createdAt: new Date().toISOString(),
  }

  const stages = ["Order", "Payment", "Status", "Delivery"]

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Order Lifecycle</h1>
      <svg
        width="600"
        height="120"
        viewBox="0 0 600 120"
        className="bg-white border rounded"
      >
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="black" />
          </marker>
        </defs>
        {stages.map((label, idx) => {
          const x = 40 + idx * 140
          return (
            <g key={label}>
              <rect x={x} y={40} width="120" height="40" fill="#e2e8f0" stroke="#000" rx="4" />
              <text x={x + 60} y={60} textAnchor="middle" dominantBaseline="middle">
                {label}
              </text>
              {idx < stages.length - 1 && (
                <path
                  d={`M${x + 120} 60 L${x + 140} 60`}
                  stroke="#000"
                  markerEnd="url(#arrow)"
                />
              )}
            </g>
          )
        })}
      </svg>
      <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
        {JSON.stringify({ order, customer }, null, 2)}
      </pre>
    </div>
  )
}
