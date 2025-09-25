'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(): State {
    return { hasError: true }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-[var(--muted)] mb-8">We apologize for the inconvenience.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-semibold hover:opacity-90"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    
    return this.props.children
  }
}