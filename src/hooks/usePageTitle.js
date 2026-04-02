import { useEffect } from 'react'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — MovieTreasures` : 'MovieTreasures'
    return () => { document.title = 'MovieTreasures' }
  }, [title])
}
