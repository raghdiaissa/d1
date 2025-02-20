import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Post as PostType } from '../../types/Post'

const Post = () => {
  const { id } = useParams()
  const [post, setPost] = useState<PostType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`)
        if (!response.ok) throw new Error('Failed to fetch post')
        const data = await response.json()
        setPost(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  )

  if (error) return (
    <div className="text-center text-red-600 p-4">
      <p>{error}</p>
    </div>
  )

  if (!post) return null

  return (
    <article className="max-w-3xl mx-auto">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg shadow-md mb-8"
        />
      )}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center space-x-4">
            {post.author.avatar && (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full"
              />
            )}
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </header>
      <div className="prose prose-lg max-w-none">
        {post.content}
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

export default Post