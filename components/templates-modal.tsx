'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Link from 'next/link'

const templates = [
  { id: 0, title: 'Drake Meme', img: '/templates/drake-meme.jpg' },
  { id: 1, title: 'Distracted Boyfriend', img: '/templates/distracted-boyfriend.jpg' },
  { id: 2, title: 'Loss Meme', img: '/templates/loss-meme.jpg' },
  { id: 3, title: 'Motivational Poster', img: '/templates/motivational-poster.jpg' },
  { id: 4, title: 'Event Poster', img: '/templates/event-poster.jpg' },
  { id: 5, title: 'Blank Canvas', img: '' },
]

interface TemplatesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TemplatesModal({ isOpen, onClose }: TemplatesModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Choose a Template</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(template => (
            <Link key={template.id} href={`/create?template=${template.id}`}>
              <div className="group cursor-pointer rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all">
                <div className="relative overflow-hidden bg-muted h-40">
                  {template.img ? (
                    <img
                      src={template.img || "/placeholder.svg"}
                      alt={template.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-foreground">{template.title}</div>
                        <div className="text-xs text-muted-foreground">Blank canvas</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 bg-card border-t border-border">
                  <h3 className="font-semibold text-foreground">{template.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Click to edit</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
