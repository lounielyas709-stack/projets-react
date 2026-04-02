import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'

export function useWatched() {
  const { user } = useAuth()
  const storageKey = `mt-watched-${user?.id ?? 'guest'}`

  const [marked, setMarked] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch { return new Set() }
  })

  // Re-sync when user changes (login / logout)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      setMarked(saved ? new Set(JSON.parse(saved)) : new Set())
    } catch { setMarked(new Set()) }
  }, [storageKey])

  const toggleMark = useCallback((id) => {
    setMarked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      localStorage.setItem(storageKey, JSON.stringify([...next]))
      return next
    })
  }, [storageKey])

  return { marked, toggleMark }
}
