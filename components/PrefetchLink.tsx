"use client"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { AnchorHTMLAttributes, PropsWithChildren } from "react"

export default function PrefetchLink({ href, children, ...props }: PropsWithChildren<LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>>) {
  const router = useRouter()
  return (
    <Link
      href={href}
      {...props}
      onMouseEnter={(e) => {
        props.onMouseEnter?.(e)
        router.prefetch(href.toString())
      }}
    >
      {children}
    </Link>
  )
}
