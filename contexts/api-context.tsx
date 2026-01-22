'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface ApiContextType {
  apiKey: string | null
  setApiKey: (key: string | null) => void
  hasApiKey: boolean
}

const ApiContext = createContext<ApiContextType | undefined>(undefined)

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key')
    if (savedKey) {
      setApiKeyState(savedKey)
    }
    setMounted(true)
  }, [])

  const setApiKey = (key: string | null) => {
    if (key) {
      localStorage.setItem('openai_api_key', key)
    } else {
      localStorage.removeItem('openai_api_key')
    }
    setApiKeyState(key)
  }

  return (
    <ApiContext.Provider value={{ apiKey, setApiKey, hasApiKey: !!apiKey }}>
      {mounted && children}
    </ApiContext.Provider>
  )
}

export function useApi() {
  const context = useContext(ApiContext)
  if (context === undefined) {
    throw new Error('useApi must be used within ApiProvider')
  }
  return context
}
