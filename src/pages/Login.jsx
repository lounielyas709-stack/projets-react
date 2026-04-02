import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { usePageTitle } from '../hooks/usePageTitle'
import styles from './Login.module.css'

function Login() {
  usePageTitle('Login')
  const { login, accounts } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const redirectTo = location.state?.from || '/'

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    // Simulate network delay
    await new Promise(r => setTimeout(r, 600))
    const ok = login(email, password)
    setLoading(false)
    if (ok) {
      navigate(redirectTo, { replace: true })
    } else {
      setError('Invalid email or password.')
    }
  }

  function fillAccount(account) {
    setEmail(account.email)
    setPassword(account.password)
    setError('')
  }

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.logo}>MT</span>
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.sub}>Welcome back to MovieTreasures</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              className={styles.input}
              type="email"
              placeholder="you@movietreasures.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? <span className={styles.spinner} /> : 'Sign in →'}
          </button>
        </form>

        {/* Demo accounts */}
        <div className={styles.demo}>
          <p className={styles.demoTitle}>Demo accounts</p>
          <div className={styles.demoList}>
            {accounts.map(a => (
              <button
                key={a.id}
                className={styles.demoBtn}
                onClick={() => fillAccount(a)}
                type="button"
              >
                <span className={styles.demoAvatar}>{a.avatar}</span>
                <span className={styles.demoName}>{a.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Login
