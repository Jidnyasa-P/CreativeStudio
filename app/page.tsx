'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, Zap, Palette, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'
import TemplatesModal from '@/components/templates-modal'

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const html = document.documentElement
    if (isDark) {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <TemplatesModal isOpen={showTemplates} onClose={() => setShowTemplates(false)} />

      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CreativeStudio
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link href="/create">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Creating
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Create with AI Creativity
          </h1>
          <p className="text-xl text-muted-foreground mb-12 text-balance max-w-2xl mx-auto">
            Choose your creation mode: Generate hilarious memes or design stunning posters with AI-powered text generation.
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Meme Creation Card */}
          <Link href="/create?mode=meme">
            <div className="group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-2xl hover:border-primary/50 transition-all h-full bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src="/templates/drake-meme.jpg"
                  alt="Create Memes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-3">Create Memes</h2>
                <p className="text-muted-foreground mb-6">
                  Generate viral memes with AI captions. Choose from popular templates and customize every element.
                </p>
                <div className="space-y-2 mb-6 text-sm">
                  <p>✓ AI-powered captions with multiple tones</p>
                  <p>✓ 5+ meme templates</p>
                  <p>✓ Full text customization</p>
                  <p>✓ Shareable links & instant download</p>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Creating Memes
                </Button>
              </div>
            </div>
          </Link>

          {/* Poster Creation Card */}
          <Link href="/create?mode=poster">
            <div className="group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-2xl hover:border-accent/50 transition-all h-full bg-gradient-to-br from-accent/5 to-primary/5">
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src="/templates/poster-gradient.jpg"
                  alt="Create Posters"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-3">Design Posters</h2>
                <p className="text-muted-foreground mb-6">
                  Create professional posters with AI-generated text. Perfect for events, workshops, and announcements.
                </p>
                <div className="space-y-2 mb-6 text-sm">
                  <p>✓ AI generates heading, subheading & body text</p>
                  <p>✓ 5 stunning blank templates</p>
                  <p>✓ Custom background colors</p>
                  <p>✓ Professional export options</p>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Palette className="w-4 h-4 mr-2" />
                  Start Designing Posters
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-secondary/20 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-balance">Why CreativeStudio?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <Sparkles className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">AI-Powered Captions</h3>
              <p className="text-muted-foreground">
                Get creative, funny, or inspirational captions instantly. Our AI learns what makes memes go viral.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <Palette className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Easy Editor</h3>
              <p className="text-muted-foreground">
                Customize text, fonts, colors, and size with an intuitive canvas editor. Real-time preview included.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3">Instant Sharing</h3>
              <p className="text-muted-foreground">
                Download high-quality PNG or share directly. Perfect for Instagram, TikTok, and Reddit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Preview */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-balance">Popular Templates</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Drake Meme', img: '/templates/drake-meme.jpg' },
            { title: 'Distracted Boyfriend', img: '/templates/distracted-boyfriend.jpg' },
            { title: 'Loss Meme', img: '/templates/loss-meme.jpg' },
            { title: 'Motivational Poster', img: '/templates/motivational-poster.jpg' },
            { title: 'Event Poster', img: '/templates/event-poster.jpg' },
            { title: 'Blank Canvas', img: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%22200%22 y=%22150%22 fontSize=%2220%22 textAnchor=%22middle%22 fill=%22%23999%22%3EBlank Canvas%3C/text%3E%3C/svg%3E' },
          ].map((template, i) => (
            <Link key={i} href={`/create?template=${i}`}>
              <div className="group cursor-pointer rounded-lg overflow-hidden shadow-md border border-border hover:shadow-lg transition-all hover:border-primary/50">
                <div className="relative overflow-hidden bg-muted h-48">
                  <img
                    src={template.img || "/placeholder.svg"}
                    alt={template.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 bg-card">
                  <h3 className="font-semibold text-foreground">{template.title}</h3>
                  <p className="text-sm text-muted-foreground">Click to edit</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Pick a template, customize with AI captions, and share your masterpiece.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8">
              Start Creating
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground">
          <p>CreativeStudio - Create Memes. Design Posters. Powered by AI.</p>
        </div>
      </footer>
    </div>
  )
}
