'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Copy, Check } from 'lucide-react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  templateId: number
  textElements: Array<{ id: number; text: string; x: number; y: number; fontSize: number; color: string; font: string; bold: boolean }>
}

export default function ShareModal({ isOpen, onClose, templateId, textElements }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  // Create a shareable URL with encoded state
  const state = {
    t: templateId,
    e: textElements,
  }
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/create?share=${btoa(JSON.stringify(state))}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full">
        <div className="border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Share Your Meme</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Share Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground"
              />
              <Button
                onClick={copyToClipboard}
                size="sm"
                variant="outline"
                className="bg-transparent"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Share this link to let others view and edit your creation!
            </p>
          </div>

          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>How it works:</strong> Recipients can open this link, load your design, and customize it further.
            </p>
          </div>

          <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90">
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}
