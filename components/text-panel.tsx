'use client'

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

interface TextPanelProps {
  element: TextElement
  onChange: (element: TextElement) => void
}

export default function TextPanel({ element, onChange }: TextPanelProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold">Text Properties</h3>

      {/* Text Input */}
      <div>
        <label className="block text-sm font-medium mb-2">Text</label>
        <textarea
          value={element.text}
          onChange={(e) => onChange({ ...element, text: e.target.value })}
          className="w-full bg-input border border-border rounded px-3 py-2 text-foreground resize-none"
          rows={3}
        />
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium mb-2">Font Size: {element.fontSize}px</label>
        <input
          type="range"
          min="16"
          max="120"
          value={element.fontSize}
          onChange={(e) => onChange({ ...element, fontSize: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Font Family */}
      <div>
        <label className="block text-sm font-medium mb-2">Font</label>
        <select
          value={element.font}
          onChange={(e) => onChange({ ...element, font: e.target.value })}
          className="w-full bg-input border border-border rounded px-3 py-2 text-foreground"
        >
          <option>Arial</option>
          <option>Verdana</option>
          <option>Times New Roman</option>
          <option>Courier New</option>
          <option>Georgia</option>
          <option>Comic Sans MS</option>
          <option>Impact</option>
        </select>
      </div>

      {/* Bold Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bold"
          checked={element.bold}
          onChange={(e) => onChange({ ...element, bold: e.target.checked })}
          className="w-4 h-4 rounded border-border"
        />
        <label htmlFor="bold" className="text-sm font-medium cursor-pointer">
          Bold
        </label>
      </div>

      {/* Color Picker */}
      <div>
        <label className="block text-sm font-medium mb-2">Color</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={element.color}
            onChange={(e) => onChange({ ...element, color: e.target.value })}
            className="w-16 h-10 rounded border border-border cursor-pointer"
          />
          <input
            type="text"
            value={element.color}
            onChange={(e) => onChange({ ...element, color: e.target.value })}
            className="flex-1 bg-input border border-border rounded px-3 py-2 text-foreground text-sm"
          />
        </div>
      </div>

      {/* Position */}
      <div>
        <label className="block text-sm font-medium mb-2">X Position: {element.x}px</label>
        <input
          type="range"
          min="0"
          max="550"
          value={element.x}
          onChange={(e) => onChange({ ...element, x: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Y Position: {element.y}px</label>
        <input
          type="range"
          min="0"
          max="550"
          value={element.y}
          onChange={(e) => onChange({ ...element, y: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>
    </div>
  )
}
