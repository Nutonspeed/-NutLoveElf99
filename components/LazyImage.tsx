"use client"
import Image, { type ImageProps } from "next/image"
import { useEffect, useRef, useState } from "react"

export default function LazyImage({ className, ...props }: ImageProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true)
        obs.disconnect()
      }
    })
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  const style = !('fill' in props && props.fill) ? { width: props.width, height: props.height } : {}

  return (
    <div ref={ref} style={style} className={"relative " + (className || "")}>
      {visible ? (
        <Image {...props} className={props.className} />
      ) : (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}
