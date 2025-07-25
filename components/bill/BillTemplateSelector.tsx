'use client'
import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { listTemplates, BillTemplate } from '@/core/mock/templates'

interface Props {
  onSelect: (slug: string | null) => void
}

export default function BillTemplateSelector({ onSelect }: Props) {
  const [templates, setTemplates] = useState<BillTemplate[]>([])

  useEffect(() => {
    setTemplates(listTemplates())
    const handler = () => setTemplates(listTemplates())
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  return (
    <Select onValueChange={(v) => onSelect(v)}>
      <SelectTrigger>
        <SelectValue placeholder="เลือกเทมเพลต" />
      </SelectTrigger>
      <SelectContent>
        {templates.map(t => (
          <SelectItem key={t.slug} value={t.slug}>
            {t.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
