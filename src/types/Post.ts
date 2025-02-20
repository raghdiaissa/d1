export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  coverImage?: string
  publishedAt: string
  readingTime: number
  author: {
    name: string
    avatar?: string
  }
  tags?: string[]
}