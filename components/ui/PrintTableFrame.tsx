import { ReactNode } from 'react'

export default function PrintTableFrame({ children }: { children: ReactNode }) {
  return <div className="border rounded-md overflow-hidden">{children}</div>
}
