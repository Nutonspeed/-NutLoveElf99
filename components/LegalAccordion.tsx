"use client"
import { useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { LegalSection } from "@/types/legal"

export function LegalAccordion({ items, loader }: { items: LegalSection[]; loader?: () => void }) {
  const [sections, setSections] = useState(items)

  useEffect(() => {
    if (loader) {
      loader()
      setSections([...items])
    }
  }, [loader, items])

  return (
    <Accordion type="single" collapsible className="w-full">
      {sections.map((s) => (
        <AccordionItem key={s.id} value={s.id}>
          <AccordionTrigger>{s.title}</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {s.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
