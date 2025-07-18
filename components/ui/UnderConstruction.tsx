import Link from "next/link"
import { Construction } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import EmptyState from "./EmptyState"

interface UnderConstructionProps {
  message?: string
  backHref?: string
}

export default function UnderConstruction({
  message = "หน้านี้อยู่ระหว่างการพัฒนา",
  backHref = "/",
}: UnderConstructionProps) {
  return (
    <EmptyState
      icon={<Construction className="h-10 w-10 text-yellow-600" />}
      title="อยู่ระหว่างการพัฒนา"
      description={message}
      action={
        <Link href={backHref}>
          <Button>กลับหน้าแรก</Button>
        </Link>
      }
    />
  )
}
