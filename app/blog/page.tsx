import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { mockPosts } from '@/lib/mock-posts'
import { PostCard } from '@/components/blog/PostCard'

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-10 flex-1">
        <h1 className="text-3xl font-bold mb-8">บทความล่าสุด</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPosts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
