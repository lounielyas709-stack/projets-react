import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import UserProfile from '../components/UserProfile'
import MovieCard from '../components/MovieCard'
import Toast from '../components/Toast'
import Contact from './Contact'
import { users, movies, genres } from '../data'
import { getMovieStats } from '../utils/stats'
import { usePageTitle } from '../hooks/usePageTitle'
import { useWatched } from '../hooks/useWatched'

const PREVIEW = 8

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

const todayFilm = (() => {
  const dateInt = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''))
  return { movie: movies[dateInt % movies.length], id: dateInt % movies.length }
})()

function Home() {
  usePageTitle(null)
  const navigate = useNavigate()
  const { marked, toggleMark: _toggleMark } = useWatched()

  const [counter,   setCounter]   = useState(0)
  const [direction, setDirection] = useState(1)
  const [showUsers, setShowUsers] = useState(true)
  const [search,       setSearch]       = useState('')
  const [filmSearch,   setFilmSearch]   = useState('')
  const [genreFilter,  setGenreFilter]  = useState('')
  const [sortBy,       setSortBy]       = useState('')
  const [loading,      setLoading]      = useState(true)
  const [toast,        setToast]        = useState({ visible: false, message: '' })

  const filmSearchRef = useRef()
  const plusRef  = useRef()
  const minusRef = useRef()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

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

  // Raccourci clavier "/" → focus barre de recherche films
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault()
        filmSearchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const showToast = useCallback((message) => {
    setToast({ visible: true, message })
    setTimeout(() => setToast({ visible: false, message: '' }), 2000)
  }, [])

  const toggleMark = useCallback((id) => {
    const wasWatched = marked.has(id)
    _toggleMark(id)
    showToast(wasWatched ? '✕ Removed from watchlist' : '✓ Added to watchlist')
  }, [marked, _toggleMark, showToast])

  const increment = () => { setDirection(1);  setCounter(c => c + 1) }
  const decrement = () => { setDirection(-1); setCounter(c => c - 1) }

  const goRandom = () => {
    const id = Math.floor(Math.random() * movies.length)
    navigate(`/film/${id}`)
  }

  const filteredMovies = useMemo(() => {
    let result = movies
    if (filmSearch)  result = result.filter(m => m.name.toLowerCase().includes(filmSearch.toLowerCase()))
    if (genreFilter) result = result.filter(m => getMovieStats(m.name).genre === genreFilter)
    if (sortBy === 'rating') result = [...result].sort((a, b) => getMovieStats(b.name).rating - getMovieStats(a.name).rating)
    if (sortBy === 'year')   result = [...result].sort((a, b) => parseInt(b.year) - parseInt(a.year))
    return result.slice(0, PREVIEW)
  }, [filmSearch, genreFilter, sortBy])

  const filteredUsers = useMemo(() => {
    if (!search) return users.slice(0, PREVIEW)
    const q = search.toLowerCase()
    return users.filter(u =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
      u.country.toLowerCase().includes(q)
    ).slice(0, PREVIEW)
  }, [search])

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
          MovieTreasures
        </motion.h1>
        <motion.p
          className="app-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          Find your watch tonight !
        </motion.p>
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.7 }}
        >
          <span>🎬 {movies.length} films</span>
          <span className="hero-stats-dot">·</span>
          <span>🎙️ {users.length} experts</span>
          <span className="hero-stats-dot">·</span>
          <span>✓ {marked.size} watched</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button className="btn-random" onClick={goRandom}>🎲 Je me lance</button>
          <Link to={`/film/${todayFilm.id}`} className="btn-random" style={{ textDecoration: 'none', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.3)' }}>
            🎬 Film du jour : {todayFilm.movie.name}
          </Link>
        </motion.div>
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

        {/* Experts */}
        <section id="section-experts" className="section">
          <motion.div
            className="section-header"
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="section-title">Experts</h2>
            <button className="btn btn-toggle" onClick={() => setShowUsers(s => !s)}>
              {showUsers ? 'Hide' : 'Show'}
            </button>
          </motion.div>

          <AnimatePresence>
            {showUsers && (
              <motion.div
                initial="hidden" animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                variants={stagger}
              >
                <motion.div variants={fadeUp} style={{ marginBottom: 16 }}>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Search an expert..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </motion.div>

                {filteredUsers.length === 0 ? (
                  <p className="no-results">No experts match your search.</p>
                ) : (
                  <motion.div className="cards-grid" variants={stagger}>
                    {filteredUsers.map((user, i) => (
                      <motion.div key={i} variants={fadeUp}>
                        <UserProfile {...user} id={users.indexOf(user)} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {!search && (
                  <motion.div variants={fadeUp} className="see-more-row">
                    <Link to="/experts" className="see-more-btn">
                      See all {users.length} experts →
                    </Link>
                  </motion.div>
                )}
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

          <div className="movies-controls" style={{ marginBottom: 16 }}>
            <input
              ref={filmSearchRef}
              className="search-input"
              type="text"
              placeholder='Search a film... (press "/" to focus)'
              value={filmSearch}
              onChange={e => setFilmSearch(e.target.value)}
            />
            <div className="filter-pills">
              <button className={`filter-pill ${genreFilter === '' ? 'filter-pill-active' : ''}`} onClick={() => setGenreFilter('')}>All</button>
              {genres.map(g => (
                <button key={g} className={`filter-pill ${genreFilter === g ? 'filter-pill-active' : ''}`} onClick={() => setGenreFilter(g)}>{g}</button>
              ))}
            </div>
            <div className="sort-pills">
              <span className="sort-label">Sort:</span>
              {[['', 'Default'], ['rating', 'Rating'], ['year', 'Year']].map(([val, label]) => (
                <button key={val} className={`filter-pill ${sortBy === val ? 'filter-pill-active' : ''}`} onClick={() => setSortBy(val)}>{label}</button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="cards-grid">
              {Array.from({ length: PREVIEW }).map((_, i) => (
                <div key={i} className="skeleton-card" />
              ))}
            </div>
          ) : filteredMovies.length === 0 ? (
            <p className="no-results">No films match your search.</p>
          ) : (
            <>
              <motion.div
                className="cards-grid"
                initial="hidden"
                animate="show"
                variants={stagger}
              >
                {filteredMovies.map((movie) => {
                  const id = movies.indexOf(movie)
                  return (
                    <motion.div key={id} variants={fadeUp}>
                      <MovieCard
                        {...movie}
                        id={id}
                        marked={marked.has(id)}
                        onMark={() => toggleMark(id)}
                      />
                    </motion.div>
                  )
                })}
              </motion.div>
              {!filmSearch && (
                <div className="see-more-row">
                  <Link to="/films" className="see-more-btn">
                    See all {movies.length} films →
                  </Link>
                </div>
              )}
            </>
          )}
        </section>

        {/* Contact */}
        <section id="section-contact" className="section">
          <motion.h2
            className="section-title"
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={fadeUp}
          >
            Contact
          </motion.h2>
          <Contact hideTitle />
        </section>

      </main>

      <Toast message={toast.message} visible={toast.visible} />
    </>
  )
}

export default Home
