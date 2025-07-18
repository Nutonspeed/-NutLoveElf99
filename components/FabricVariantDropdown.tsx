"use client"

import Image from 'next/image'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockFabricToneVariants } from '@/lib/mock-fabric-variants'

interface Props {
  slug: string
  defaultImage: string
}

export function FabricVariantDropdown({ slug, defaultImage }: Props) {
  const variants = mockFabricToneVariants[slug] || []
  const [image, setImage] = useState(defaultImage)

  if (variants.length === 0) {
    return <p className="text-sm text-gray-500">ไม่มีเฉดสีอื่นสำหรับลายนี้</p>
  }

  return (
    <div className="space-y-2">
      <div className="relative w-full aspect-square">
        <Image src={image} alt="fabric variant" fill className="object-cover rounded-lg" />
      </div>
      <Select onValueChange={value => setImage(value)} defaultValue={image}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="เลือกเฉดสี" />
        </SelectTrigger>
        <SelectContent>
          {variants.map(v => (
            <SelectItem key={v.image} value={v.image}>
              {v.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
