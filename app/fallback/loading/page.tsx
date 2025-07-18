import Fallback from '@/components/Fallback'
export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Fallback type="loading" />
    </div>
  )
}
