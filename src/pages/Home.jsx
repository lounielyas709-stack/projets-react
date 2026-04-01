import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UserProfile from '../components/UserProfile'
import MovieCard from '../components/MovieCard'
import { users, movies } from '../data'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

function Home() {
  const [counter, setCounter] = useState(0)
  const [direction, setDirection] = useState(1)
  const [showUsers, setShowUsers] = useState(true)

  const plusRef  = useRef()
  const minusRef = useRef()

  useEffect(() => {
    const buttons = [plusRef.current, minusRef.current].filter(Boolean)
    const handleMove = (e) => {
      buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 90) {
          const f = (1 - dist / 90) * 0.38
          btn.style.transform = `translate(${dx * f}px, ${dy * f}px) scale(${1 + f * 0.15})`
          btn.style.transition = 'transform 0.1s ease'
        } else {
          btn.style.transform = ''
          btn.style.transition = 'transform 0.4s ease'
        }
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const increment = () => { setDirection(1);  setCounter(c => c + 1) }
  const decrement = () => { setDirection(-1); setCounter(c => c - 1) }

  return (
    <>
      {/* Hero */}
      <motion.header
        className="app-header"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h1
          className="app-title"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          React Playground
        </motion.h1>
        <motion.p
          className="app-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          Components demo
        </motion.p>
      </motion.header>

      <main className="app-main">

        {/* Counter */}
        <motion.section className="section" initial="hidden" animate="show" variants={stagger}>
          <motion.h2 className="section-title" variants={fadeUp}>Counter</motion.h2>
          <motion.div className="counter-widget" variants={fadeUp}>
            <button ref={minusRef} className="btn btn-minus" onClick={decrement}>−</button>
            <div className="counter-track">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={counter}
                  className="counter-value"
                  initial={{ y: direction * 55, opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: direction * -55, opacity: 0, filter: 'blur(8px)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                >
                  {counter}
                </motion.span>
              </AnimatePresence>
            </div>
            <button ref={plusRef} className="btn btn-plus" onClick={increment}>+</button>
          </motion.div>
        </motion.section>

        {/* Users */}
        <section id="section-users" className="section">
          <motion.div
            className="section-header"
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="section-title">Users</h2>
            <button className="btn btn-toggle" onClick={() => setShowUsers(!showUsers)}>
              {showUsers ? 'Hide' : 'Show'}
            </button>
          </motion.div>
          <AnimatePresence>
            {showUsers && (
              <motion.div
                className="cards-grid"
                initial="hidden" animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                variants={stagger}
              >
                {users.map((user, id) => (
                  <motion.div key={id} variants={fadeUp}>
                    <UserProfile {...user} id={id} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Movies */}
        <section id="section-movies" className="section">
          <motion.h2
            className="section-title"
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={fadeUp}
          >
            Movies
          </motion.h2>
          <motion.div
            className="cards-grid"
            initial="hidden" whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={stagger}
          >
            {movies.map((movie, id) => (
              <motion.div key={id} variants={fadeUp}>
                <MovieCard {...movie} id={id} />
              </motion.div>
            ))}
          </motion.div>
        </section>

      </main>
    </>
  )
}

export default Home
