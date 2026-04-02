import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import MovieCard from '../components/MovieCard'
import { movies, genres } from '../data'
import { getMovieStats } from '../utils/stats'
import { useWatched } from '../hooks/useWatched'
import styles from './AllFilms.module.css'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

function AllFilms() {
  const { marked, toggleMark } = useWatched()

  const [search,      setSearch]      = useState('')
  const [genreFilter, setGenreFilter] = useState('')
  const [sortBy,      setSortBy]      = useState('')

  const moviesWithStats = useMemo(() =>
    movies.map((m, id) => ({ ...m, id, stats: getMovieStats(m.name) })), []
  )

  const filtered = useMemo(() => {
    let result = moviesWithStats
    if (search)      result = result.filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
    if (genreFilter) result = result.filter(m => m.stats.genre === genreFilter)
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.stats.rating - a.stats.rating)
    if (sortBy === 'year')   result = [...result].sort((a, b) => parseInt(b.year) - parseInt(a.year))
    return result
  }, [moviesWithStats, search, genreFilter, sortBy])

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>
          All Films
          <span className={styles.count}>{filtered.length}</span>
        </h1>
        <input
          className="search-input"
          type="text"
          placeholder="Search a film..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="movies-controls">
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

      {filtered.length === 0 ? (
        <p className="no-results">No films match your search.</p>
      ) : (
        <motion.div
          className="cards-grid"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {filtered.map(movie => (
            <motion.div key={movie.id} variants={fadeUp}>
              <MovieCard
                name={movie.name}
                year={movie.year}
                id={movie.id}
                marked={marked.has(movie.id)}
                onMark={() => toggleMark(movie.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default AllFilms
