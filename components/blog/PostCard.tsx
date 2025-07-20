import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/types/blog'
import { Card, CardContent } from '@/components/ui/cards/card'

interface PostCardProps {
  post: BlogPost
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/blog/${post.slug}`}
        className="block">
        <CardContent className="p-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.image || '/placeholder.svg'}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
