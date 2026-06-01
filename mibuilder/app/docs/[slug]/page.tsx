import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Tag, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDocBySlug, getRelatedDocs } from "@/lib/docs"

interface DocPageProps {
  params: {
    slug: string
  }
}

export default function DocPage({ params }: DocPageProps) {
  const doc = getDocBySlug(params.slug)

  if (!doc) {
    return notFound()
  }

  const relatedDocs = getRelatedDocs(doc.category, doc.slug)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative text-white">
      <div className="absolute inset-0 bg-gradient-radial from-purple-600/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-pink-600/20 via-transparent to-transparent" style={{ backgroundPosition: "70% 30%" }} />
      <div className="relative z-10">
        <nav className="border-b border-white/10 backdrop-blur-xl bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 h-16">
              <div className="flex items-center gap-4">
                <Link href="/docs">
                  <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Docs
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">{doc.title}</span>
                </div>
              </div>

              <Link href="/" className="text-white/80 hover:text-white transition-colors">
                Back to App
              </Link>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
            <section>
              <div className="rounded-3xl bg-white/10 border border-white/10 shadow-2xl shadow-purple-500/10 p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-100">
                    <Tag className="w-4 h-4 mr-2" />
                    {doc.category}
                  </span>
                  <span className="text-sm text-purple-300">{doc.time}</span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">{doc.title}</h1>
                <p className="text-lg text-purple-200 mb-8">{doc.description}</p>

                <div className="space-y-6 text-purple-200 leading-8">
                  {doc.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <Card className="bg-white/10 border border-white/10 shadow-xl shadow-purple-500/10">
                <CardHeader>
                  <CardTitle>Quick links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/docs" className="block text-purple-200 hover:text-white">Docs home</Link>
                  <Link href="/docs/installation" className="block text-purple-200 hover:text-white">Installation</Link>
                  <Link href="/docs/first-workspace" className="block text-purple-200 hover:text-white">First Workspace</Link>
                  <Link href="/docs/basic-concepts" className="block text-purple-200 hover:text-white">Basic Concepts</Link>
                </CardContent>
              </Card>

              {relatedDocs.length > 0 && (
                <Card className="bg-white/10 border border-white/10 shadow-xl shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle>Related docs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedDocs.map((related) => (
                      <div key={related.slug} className="rounded-3xl bg-white/5 p-4">
                        <h3 className="text-base font-semibold text-white">{related.title}</h3>
                        <p className="text-sm text-purple-200 mb-3">{related.description}</p>
                        <Link href={`/docs/${related.slug}`} className="inline-flex items-center gap-2 text-purple-300 hover:text-white">
                          Read more
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
