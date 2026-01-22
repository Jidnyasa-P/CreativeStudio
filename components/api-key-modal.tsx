'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import { useApi } from '@/contexts/api-context'

export default function ApiKeyModal() {
  const { apiKey, setApiKey, hasApiKey } = useApi()
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Show modal on first load if no API key
    if (!hasApiKey) {
      const hasShownBefore = localStorage.getItem('api_modal_shown')
      if (!hasShownBefore) {
        setIsOpen(true)
      }
    }
  }, [hasApiKey])

  const handleSetKey = () => {
    if (!inputValue.trim()) {
      setError('Please enter a valid API key')
      return
    }

    if (!inputValue.startsWith('sk-')) {
      setError('OpenAI API keys start with "sk-"')
      return
    }

    setApiKey(inputValue)
    localStorage.setItem('api_modal_shown', 'true')
    setIsOpen(false)
    setInputValue('')
    setError('')
  }

  const handleContinueWithout = () => {
    localStorage.setItem('api_modal_shown', 'true')
    setIsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && !hasApiKey) {
      // Prevent closing without choosing an option
      return
    }
    setIsOpen(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md" closeButton={hasApiKey}>
        <DialogHeader>
          <DialogTitle>OpenAI API Key (Optional)</DialogTitle>
          <DialogDescription>
            Add your OpenAI API key to enable AI-powered caption generation. You can also continue without it and use fallback captions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* API Key Input */}
          <div className="space-y-2">
            <label htmlFor="api-key" className="text-sm font-medium">
              API Key
            </label>
            <div className="relative">
              <Input
                id="api-key"
                type={showKey ? 'text' : 'password'}
                placeholder="sk-..."
                value={inputValue}
                onChange={e => {
                  setInputValue(e.target.value)
                  setError('')
                }}
                className="pr-10"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                type="button"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Get your API key from{' '}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                OpenAI Dashboard
              </a>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSetKey}
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={!inputValue.trim()}
            >
              Add API Key
            </Button>
            <Button
              onClick={handleContinueWithout}
              variant="outline"
              className="flex-1 bg-transparent border-border"
            >
              Continue Without
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Your API key is stored locally in your browser and never sent to our servers.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
