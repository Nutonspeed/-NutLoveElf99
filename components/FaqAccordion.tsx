"use client"
import { useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqItems, loadFaq } from "@/lib/mock-faq"

export function FaqAccordion() {
  const [items, setItems] = useState(faqItems)

  useEffect(() => {
    loadFaq()
    setItems([...faqItems])
  }, [])

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((f) => (
        <AccordionItem key={f.id} value={f.id}>
          <AccordionTrigger>{f.question}</AccordionTrigger>
          <AccordionContent>{f.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
