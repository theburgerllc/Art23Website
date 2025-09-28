'use client'

import { useEffect, useState } from 'react'

export default function TextModeToggle() {
  const [textMode, setTextMode] = useState(false)
  
  useEffect(() => {
    const stored = localStorage.getItem('textMode')
    if (stored === 'true') {
      setTextMode(true)
      document.documentElement.setAttribute('data-textmode', 'on')
    }
  }, [])
  
  const toggleTextMode = () => {
    const newValue = !textMode
    setTextMode(newValue)
    
    if (newValue) {
      document.documentElement.setAttribute('data-textmode', 'on')
      localStorage.setItem('textMode', 'true')
    } else {
      document.documentElement.removeAttribute('data-textmode')
      localStorage.removeItem('textMode')
    }
  }
  
  return (
    <button
      onClick={toggleTextMode}
      className="px-4 py-2 rounded-lg border border-[var(--muted)] hover:border-[var(--accent)] transition-colors text-sm font-medium"
      aria-label={`${textMode ? 'Disable' : 'Enable'} text mode`}
      aria-pressed={textMode}
    >
      {textMode ? 'Visual' : 'Text'} Mode
    </button>
  )
}