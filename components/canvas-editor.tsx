'use client'

import React from "react"

import { forwardRef, useEffect } from 'react'

interface TextElement {
  id: number
  text: string
  x: number
  y: number
  fontSize: number
  color: string
  font: string
  bold: boolean
}

interface Template {
  title: string
  img: string
  width: number
  height: number
}

interface CanvasEditorProps {
  template: Template
  textElements: TextElement[]
  setTextElements: (elements: TextElement[]) => void
  selectedId: number
  setSelectedId: (id: number) => void
}

const CanvasEditor = forwardRef<HTMLCanvasElement, CanvasEditorProps>(
  ({ template, textElements, setTextElements, selectedId, setSelectedId }, ref) => {
    useEffect(() => {
      if (!(ref as any)?.current) return

      const canvas = (ref as any).current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = template.width
      canvas.height = template.height

      // Draw template background
      if (template.img) {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          drawText()
        }
        img.onerror = () => {
          ctx.fillStyle = '#f0f0f0'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          drawText()
        }
        img.src = template.img
      } else {
        ctx.fillStyle = '#f0f0f0'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawText()
      }

      function drawText() {
        textElements.forEach(element => {
          // Draw stroke for text shadow/outline
          ctx.font = `${element.bold ? 'bold' : ''} ${element.fontSize}px ${element.font}`
          ctx.fillStyle = element.color
          ctx.textAlign = 'left'
          ctx.textBaseline = 'top'
          ctx.strokeStyle = '#000000'
          ctx.lineWidth = 3

          // Stroke text
          ctx.strokeText(element.text, element.x, element.y)
          // Fill text
          ctx.fillText(element.text, element.x, element.y)

          // Draw selection box
          if (element.id === selectedId) {
            const metrics = ctx.measureText(element.text)
            ctx.strokeStyle = '#3B82F6'
            ctx.lineWidth = 2
            ctx.strokeRect(
              element.x - 5,
              element.y - 5,
              metrics.width + 10,
              element.fontSize + 10
            )
          }
        })
      }
    }, [template, textElements, selectedId, ref])

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = (ref as any)?.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Check if click is on any text element
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      for (const element of textElements) {
        ctx.font = `${element.bold ? 'bold' : ''} ${element.fontSize}px ${element.font}`
        const metrics = ctx.measureText(element.text)

        if (
          x >= element.x &&
          x <= element.x + metrics.width &&
          y >= element.y &&
          y <= element.y + element.fontSize
        ) {
          setSelectedId(element.id)
          return
        }
      }
    }

    const handleDragStart = (e: React.DragEvent<HTMLCanvasElement>) => {
      const canvas = (ref as any)?.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      for (const element of textElements) {
        ctx.font = `${element.bold ? 'bold' : ''} ${element.fontSize}px ${element.font}`
        const metrics = ctx.measureText(element.text)

        if (
          x >= element.x &&
          x <= element.x + metrics.width &&
          y >= element.y &&
          y <= element.y + element.fontSize
        ) {
          setSelectedId(element.id)
          break
        }
      }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = (ref as any)?.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      let isOverText = false
      for (const element of textElements) {
        ctx.font = `${element.bold ? 'bold' : ''} ${element.fontSize}px ${element.font}`
        const metrics = ctx.measureText(element.text)

        if (
          x >= element.x &&
          x <= element.x + metrics.width &&
          y >= element.y &&
          y <= element.y + element.fontSize
        ) {
          isOverText = true
          break
        }
      }

      canvas.style.cursor = isOverText ? 'move' : 'default'
    }

    return (
      <div className="bg-card border-2 border-border rounded-lg p-6 shadow-lg flex justify-center">
        <canvas
          ref={ref}
          onClick={handleCanvasClick}
          onDragStart={handleDragStart}
          onMouseMove={handleMouseMove}
          className="border border-border rounded cursor-move max-w-full h-auto"
          style={{ maxHeight: '600px', background: '#f0f0f0' }}
        />
      </div>
    )
  }
)

CanvasEditor.displayName = 'CanvasEditor'

export default CanvasEditor
