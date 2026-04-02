import { createContext, useContext, useState } from 'react'

// Fake accounts — study project only, no real security
const ACCOUNTS = [
  { id: 1, email: 'alice@movietreasures.com',  password: 'alice123',  name: 'Alice Martin',   avatar: 'AM' },
  { id: 2, email: 'bob@movietreasures.com',    password: 'bob123',    name: 'Bob Dupont',     avatar: 'BD' },
  { id: 3, email: 'carol@movietreasures.com',  password: 'carol123',  name: 'Carol Schmidt',  avatar: 'CS' },
  { id: 4, email: 'admin@movietreasures.com',  password: 'admin123',  name: 'Admin',          avatar: '👑' },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mt-user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  function login(email, password) {
    const account = ACCOUNTS.find(a => a.email === email && a.password === password)
    if (!account) return false
    const { password: _, ...safe } = account
    setUser(safe)
    localStorage.setItem('mt-user', JSON.stringify(safe))
    return true
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('mt-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, accounts: ACCOUNTS }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
