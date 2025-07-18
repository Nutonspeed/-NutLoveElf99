import Fallback from '@/components/Fallback'
export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Fallback type="error" />
    </div>
  )
}
