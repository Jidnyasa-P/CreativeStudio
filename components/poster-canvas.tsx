'use client'

import { useRef, useEffect } from 'react'

interface PosterCanvasProps {
  heading: string
  subheading: string
  body: string
  bgColor: string
  textColor: string
}

export default function PosterCanvas({
  heading,
  subheading,
  body,
  bgColor,
  textColor,
}: PosterCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = 800
    const height = 1000

    canvas.width = width
    canvas.height = height

    // Draw background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)

    // Set text color
    ctx.fillStyle = textColor
    ctx.textAlign = 'center'

    // Draw heading
    ctx.font = 'bold 64px Arial'
    const headingLines = heading.split('\n')
    let y = 150
    headingLines.forEach(line => {
      ctx.fillText(line, width / 2, y)
      y += 80
    })

    // Draw subheading
    ctx.font = 'bold 32px Arial'
    ctx.globalAlpha = 0.9
    const subheadingLines = subheading.split('\n')
    y += 40
    subheadingLines.forEach(line => {
      ctx.fillText(line, width / 2, y)
      y += 50
    })

    // Draw body
    ctx.font = '20px Arial'
    ctx.globalAlpha = 0.85
    const bodyLines = body.split('\n')
    y += 60
    bodyLines.forEach(line => {
      ctx.fillText(line, width / 2, y)
      y += 35
    })

    ctx.globalAlpha = 1
  }, [heading, subheading, body, bgColor, textColor])

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        className="border-4 border-border rounded-lg shadow-2xl"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}
