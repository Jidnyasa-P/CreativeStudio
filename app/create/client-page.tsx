'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useRef, Suspense, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Wand2, Plus, Trash2, Share2, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import CanvasEditor from '@/components/canvas-editor'
import TextPanel from '@/components/text-panel'
import ToneSelector from '@/components/tone-selector'
import ShareModal from '@/components/share-modal'
import { useRouter } from 'next/navigation'

type Tone = 'funny' | 'sarcastic' | 'professional' | 'gen-z' | 'formal'

const memeTemplates = [
  { title: 'Drake Meme', img: '/templates/drake-meme.jpg', width: 600, height: 600 },
  { title: 'Distracted Boyfriend', img: '/templates/distracted-boyfriend.jpg', width: 600, height: 450 },
  { title: 'Loss Meme', img: '/templates/loss-meme.jpg', width: 600, height: 600 },
  { title: 'Blank Canvas', img: '', width: 600, height: 600 },
]

function CreatePageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const mode = searchParams.get('mode') || 'meme'

  // Redirect to poster page if mode is poster
  useEffect(() => {
    if (mode === 'poster') {
      router.push('/poster')
    }
  }, [mode, router])

  const templateId = parseInt(searchParams.get('template') || '0')
  const template = memeTemplates[templateId] || memeTemplates[0]

  const [textElements, setTextElements] = useState([
    { id: 1, text: 'Top Text', x: 50, y: 50, fontSize: 48, color: '#FFFFFF', font: 'Arial', bold: true },
    { id: 2, text: 'Bottom Text', x: 50, y: 500, fontSize: 48, color: '#FFFFFF', font: 'Arial', bold: true },
  ])
  const [selectedId, setSelectedId] = useState(1)
  const [loading, setLoading] = useState(false)
  const [tone, setTone] = useState<Tone>('funny')
  const [isDark, setIsDark] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Load dark mode preference and share data
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)

    const shareData = searchParams.get('share')
    if (shareData) {
      try {
        const decoded = JSON.parse(atob(shareData))
        if (decoded.e && Array.isArray(decoded.e)) {
          setTextElements(decoded.e)
        }
      } catch (error) {
        console.log('[v0] Failed to load shared data')
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

  // Generate AI caption with tone
  const generateCaption = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template: template.title,
          currentText: textElements.map(t => t.text).join(' | '),
          tone,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const newText = data.caption || 'New Caption'
        const selected = textElements.find(t => t.id === selectedId)
        if (selected) {
          setTextElements(
            textElements.map(t =>
              t.id === selectedId ? { ...t, text: newText } : t
            )
          )
        }
      }
    } catch (error) {
      console.log('[v0] Caption generation error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Download image
  const downloadImage = async () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `${template.title.replace(/\s/g, '-')}-${Date.now()}.png`
    link.click()
  }

  // Add new text
  const addText = () => {
    const newId = Math.max(...textElements.map(t => t.id), 0) + 1
    const newText = {
      id: newId,
      text: 'New Text',
      x: 50,
      y: 200,
      fontSize: 36,
      color: '#FFFFFF',
      font: 'Arial',
      bold: false,
    }
    setTextElements([...textElements, newText])
    setSelectedId(newId)
  }

  // Delete text
  const deleteText = (id: number) => {
    if (textElements.length > 1) {
      setTextElements(textElements.filter(t => t.id !== id))
      setSelectedId(textElements[0].id)
    }
  }

  const selected = textElements.find(t => t.id === selectedId)

  return (
    <div className="min-h-screen bg-background">
      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        templateId={templateId}
        textElements={textElements}
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
            <h1 className="text-2xl font-bold">{template.title}</h1>
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
            <Button
              onClick={downloadImage}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PNG
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Canvas Area */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <CanvasEditor
              ref={canvasRef}
              template={template}
              textElements={textElements}
              setTextElements={setTextElements}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </div>
        </div>

        {/* Controls Panel */}
        <div className="space-y-6">
          {/* Tone Selector */}
          <ToneSelector selectedTone={tone} onToneChange={setTone} />

          {/* AI Caption Generator */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-accent" />
              AI Caption Generator
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Generate smart captions for the selected text using AI.
            </p>
            <Button
              onClick={generateCaption}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {loading ? 'Generating...' : 'Generate Caption'}
            </Button>
          </div>

          {/* Text Elements */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Text Elements</h3>
              <Button
                onClick={addText}
                size="sm"
                variant="outline"
                className="border-border bg-transparent"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2 mb-4">
              {textElements.map(element => (
                <div
                  key={element.id}
                  onClick={() => setSelectedId(element.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedId === element.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{element.text}</p>
                      <p className="text-xs text-muted-foreground">{element.fontSize}px</p>
                    </div>
                    {textElements.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteText(element.id)
                        }}
                        className="p-1 hover:bg-destructive/20 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text Properties */}
          {selected && (
            <TextPanel
              element={selected}
              onChange={(updated) =>
                setTextElements(
                  textElements.map(t =>
                    t.id === updated.id ? updated : t
                  )
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <CreatePageContent />
    </Suspense>
  )
}

export const generateStaticParams = () => {
  return [
    { template: '0' },
    { template: '1' },
    { template: '2' },
    { template: '3' },
    { template: '4' },
    { template: '5' },
  ]
}
