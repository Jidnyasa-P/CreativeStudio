'use client'

import { useState, useRef, Suspense, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Wand2, Moon, Sun, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import PosterCanvas from '@/components/poster-canvas'
import PosterShareModal from '@/components/poster-share-modal'

interface PosterState {
  heading: string
  subheading: string
  body: string
  bgColor: string
  textColor: string
  category: string
}

const colorPresets = [
  { name: 'White', bg: '#FFFFFF', text: '#000000' },
  { name: 'Navy Blue', bg: '#1a3a52', text: '#FFFFFF' },
  { name: 'Coral', bg: '#FF6B6B', text: '#FFFFFF' },
  { name: 'Sage Green', bg: '#6B8E6F', text: '#FFFFFF' },
  { name: 'Purple', bg: '#6B4C9A', text: '#FFFFFF' },
  { name: 'Gradient Gold', bg: 'linear-gradient(135deg, #FFD700, #FFA500)', text: '#000000' },
  { name: 'Deep Black', bg: '#1a1a1a', text: '#FFFFFF' },
  { name: 'Mint', bg: '#98D8C8', text: '#1a1a1a' },
]

const categories = ['event', 'workshop', 'promotion', 'announcement', 'general']

const posterTemplates = [
  { id: 0, name: 'Geometric Abstract', img: '/templates/poster-geometric.jpg' },
  { id: 1, name: 'Nature Botanical', img: '/templates/poster-nature.jpg' },
  { id: 2, name: 'Pastel Gradient', img: '/templates/poster-gradient.jpg' },
  { id: 3, name: 'Minimal Frame', img: '/templates/poster-minimal-frame.jpg' },
  { id: 4, name: 'Double Frame', img: '/templates/poster-double-frame.jpg' },
  { id: 5, name: 'Geometric Modern', img: '/templates/poster-geometric-2.jpg' },
  { id: 6, name: 'Soft Gradient', img: '/templates/poster-gradient-2.jpg' },
  { id: 7, name: 'Clean Minimal', img: '/templates/poster-minimal-2.jpg' },
  { id: 8, name: 'Nature Green', img: '/templates/poster-nature-2.jpg' },
]

function PosterPageContent() {
  const searchParams = useSearchParams()

  const [poster, setPoster] = useState<PosterState>({
    heading: 'Your Heading Here',
    subheading: 'Your Subheading',
    body: 'Add your message or content here',
    bgColor: '#FFFFFF',
    textColor: '#000000',
    category: 'general',
  })

  const [isDark, setIsDark] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Load shared poster data
  useEffect(() => {
    const shareData = searchParams.get('share')
    if (shareData) {
      try {
        const decoded = JSON.parse(atob(shareData))
        setPoster(prev => ({
          ...prev,
          heading: decoded.h || prev.heading,
          subheading: decoded.s || prev.subheading,
          body: decoded.b || prev.body,
          bgColor: decoded.c || prev.bgColor,
        }))
      } catch (error) {
        console.log('[v0] Failed to load shared poster')
      }
    }
  }, [searchParams])

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

  const generatePosterText = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-poster-full', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: poster.category }),
      })

      if (response.ok) {
        const data = await response.json()
        setPoster(prev => ({
          ...prev,
          heading: data.text.heading,
          subheading: data.text.subheading,
          body: data.text.body,
        }))
      }
    } catch (error) {
      console.log('[v0] Text generation error:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadPoster = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current.querySelector('canvas') as HTMLCanvasElement
    if (!canvas) return

    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `poster-${Date.now()}.png`
    link.click()
  }

  return (
    <div className="min-h-screen bg-background">
      <PosterShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        templateId={0}
        posterData={poster}
      />

      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Design Your Poster</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button
              onClick={() => setShowShare(true)}
              variant="outline"
              size="sm"
              className="bg-transparent border-border"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button onClick={downloadPoster} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Download className="w-4 h-4 mr-2" />
              Download PNG
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Canvas */}
          <div className="lg:col-span-2">
            <div ref={canvasRef} className="bg-muted p-8 rounded-lg flex justify-center min-h-96">
              <PosterCanvas
                heading={poster.heading}
                subheading={poster.subheading}
                body={poster.body}
                bgColor={poster.bgColor}
                textColor={poster.textColor}
              />
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Templates */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold">Templates</h3>
              <div className="grid grid-cols-3 gap-2">
                {posterTemplates.map(template => (
                  <div
                    key={template.id}
                    className="aspect-square rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors cursor-pointer"
                    title={template.name}
                  >
                    <img
                      src={template.img || "/placeholder.svg"}
                      alt={template.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* AI Generation */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-accent" />
                AI Generator
              </h3>

              <div>
                <label className="text-sm font-medium block mb-2">Category</label>
                <select
                  value={poster.category}
                  onChange={e => setPoster(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={generatePosterText}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? 'Generating...' : 'Generate Text'}
              </Button>
            </div>

            {/* Text Editing */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold">Text Content</h3>

              <div>
                <label className="text-sm font-medium block mb-2">Heading</label>
                <textarea
                  value={poster.heading}
                  onChange={e => setPoster(prev => ({ ...prev, heading: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Subheading</label>
                <textarea
                  value={poster.subheading}
                  onChange={e => setPoster(prev => ({ ...prev, subheading: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Body Text</label>
                <textarea
                  value={poster.body}
                  onChange={e => setPoster(prev => ({ ...prev, body: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  rows={3}
                />
              </div>
            </div>

            {/* Colors */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold">Colors</h3>

              <div className="grid grid-cols-2 gap-2">
                {colorPresets.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() =>
                      setPoster(prev => ({
                        ...prev,
                        bgColor: preset.bg,
                        textColor: preset.text,
                      }))
                    }
                    className={`p-3 rounded-lg border-2 transition-all text-xs font-medium ${
                      poster.bgColor === preset.bg
                        ? 'border-primary ring-2 ring-primary'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                    style={{
                      backgroundColor: typeof preset.bg === 'string' && preset.bg.startsWith('#') ? preset.bg : '#999',
                    }}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Custom Background</label>
                <input
                  type="color"
                  value={poster.bgColor}
                  onChange={e => setPoster(prev => ({ ...prev, bgColor: e.target.value }))}
                  className="w-full h-10 rounded-lg border border-border cursor-pointer"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Text Color</label>
                <input
                  type="color"
                  value={poster.textColor}
                  onChange={e => setPoster(prev => ({ ...prev, textColor: e.target.value }))}
                  className="w-full h-10 rounded-lg border border-border cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PosterPage() {
  return (
    <Suspense fallback={null}>
      <PosterPageContent />
    </Suspense>
  )
}
