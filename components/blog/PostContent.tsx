import Image from 'next/image'
import type { BlogPost } from '@/types/blog'

interface PostContentProps {
  post: BlogPost
}

export function PostContent({ post }: PostContentProps) {
  return (
    <article className="prose mx-auto">
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={400}
          className="w-full rounded-lg mb-6"
        />
      )}
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(post.publishedAt).toLocaleDateString('th-TH')}
      </p>
      {post.content.split(/\n\n+/).map((paragraph, idx) => (
        <p key={idx}>{paragraph}</p>
      ))}
    </article>
  )
}
