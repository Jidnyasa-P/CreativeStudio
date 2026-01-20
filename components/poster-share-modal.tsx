'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check, X } from 'lucide-react'

interface PosterShareModalProps {
  isOpen: boolean
  onClose: () => void
  templateId: number
  posterData: {
    heading: string
    subheading: string
    body: string
    bgColor: string
  }
}

export default function PosterShareModal({
  isOpen,
  onClose,
  templateId,
  posterData,
}: PosterShareModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const shareData = btoa(
    JSON.stringify({
      t: templateId,
      h: posterData.heading,
      s: posterData.subheading,
      b: posterData.body,
      c: posterData.bgColor,
    })
  )

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/poster?share=${shareData}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Share Your Poster</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Share Link:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono text-foreground overflow-x-auto"
              />
              <Button
                onClick={copyToClipboard}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Share this link with others to let them view and edit your poster design.
          </p>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-transparent border-border"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                copyToClipboard()
              }}
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Copy Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
