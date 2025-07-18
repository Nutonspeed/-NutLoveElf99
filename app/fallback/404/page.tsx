import Fallback from '@/components/Fallback'
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Fallback type="404" title="ไม่พบหน้า" />
    </div>
  )
}
