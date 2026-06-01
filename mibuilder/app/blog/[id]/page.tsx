import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, User, Tag, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getBlogPostById, getRelatedPosts } from "@/lib/blog"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostById(params.id)

  if (!post) {
    return notFound()
  }

  const relatedPosts = getRelatedPosts(post.category, post.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white relative">
      <div className="absolute inset-0 bg-gradient-radial from-purple-600/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-pink-600/20 via-transparent to-transparent" style={{ backgroundPosition: "70% 30%" }} />
      <div className="relative z-10">
        <nav className="border-b border-white/10 backdrop-blur-xl bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Mibuilder Blog</span>
              </div>
              <Link href="/blog" className="text-white/80 hover:text-white transition-colors">
                Back to Blog
              </Link>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button variant="ghost" className="mb-8 text-white/80 hover:text-white hover:bg-white/10" asChild>
            <Link href="/blog">
              <span className="inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to articles
              </span>
            </Link>
          </Button>

          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 bg-white/10 border border-white/15">
            <div className="relative h-96 overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-xl">
                  <Tag className="w-4 h-4" />
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-10">
              <div className="flex flex-wrap items-center gap-4 text-sm text-purple-200 mb-6">
                <span className="inline-flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>
              <p className="text-lg text-purple-100 max-w-3xl mb-8">{post.excerpt}</p>
              <div className="space-y-6 text-purple-200 leading-8">
                {post.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <section className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-semibold">Related posts</h2>
                  <p className="text-purple-200">More articles from the same category.</p>
                </div>
                <Link href="/blog" className="text-purple-200 hover:text-white">View all</Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Card key={related.id} className="bg-white/10 border border-white/10 shadow-xl shadow-purple-500/10 hover:border-purple-400/40 transition-all">
                    <CardContent>
                      <div className="mb-4 text-sm text-purple-200">{related.category}</div>
                      <CardTitle className="text-xl text-white mb-2">{related.title}</CardTitle>
                      <CardDescription className="text-purple-200 mb-4">{related.excerpt}</CardDescription>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-200">{related.author}</span>
                        <Link href={`/blog/${related.id}`}>
                          <Button variant="ghost" className="text-purple-300 hover:text-white hover:bg-white/10 p-2">
                            Read
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
