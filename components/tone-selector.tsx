'use client'

import { Button } from '@/components/ui/button'

type Tone = 'funny' | 'sarcastic' | 'professional' | 'gen-z' | 'formal'

interface ToneSelectorProps {
  selectedTone: Tone
  onToneChange: (tone: Tone) => void
}

const tones: { value: Tone; label: string; description: string }[] = [
  { value: 'funny', label: 'Funny', description: 'Hilarious & relatable' },
  { value: 'sarcastic', label: 'Sarcastic', description: 'Witty & ironic' },
  { value: 'professional', label: 'Professional', description: 'Business-ready' },
  { value: 'gen-z', label: 'Gen-Z', description: 'No cap fr fr' },
  { value: 'formal', label: 'Formal', description: 'Sophisticated' },
]

export default function ToneSelector({ selectedTone, onToneChange }: ToneSelectorProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">AI Style / Tone</h3>
      <div className="space-y-2">
        {tones.map(tone => (
          <button
            key={tone.value}
            onClick={() => onToneChange(tone.value)}
            className={`w-full text-left p-3 rounded-lg border transition-all ${
              selectedTone === tone.value
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="font-medium text-foreground">{tone.label}</div>
            <div className="text-xs text-muted-foreground">{tone.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
