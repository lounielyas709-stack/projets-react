import { useMemo } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import MovieCard from '../components/MovieCard'
import { movies } from '../data'
import { getMovieStats } from '../utils/stats'
import { usePageTitle } from '../hooks/usePageTitle'
import { useWatched } from '../hooks/useWatched'
import styles from './Watchlist.module.css'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

function Watchlist() {
  usePageTitle('Watchlist')
  const { marked, toggleMark } = useWatched()

  const watchedMovies = useMemo(() =>
    movies.map((m, id) => ({ ...m, id, stats: getMovieStats(m.name) }))
          .filter(m => marked.has(m.id)),
    [marked]
  )

  const genreBreakdown = useMemo(() => {
    const counts = {}
    watchedMovies.forEach(m => {
      counts[m.stats.genre] = (counts[m.stats.genre] || 0) + 1
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [watchedMovies])

  const avgRating = useMemo(() => {
    if (!watchedMovies.length) return 0
    return watchedMovies.reduce((s, m) => s + m.stats.rating, 0) / watchedMovies.length
  }, [watchedMovies])

  if (watchedMovies.length === 0) {
    return (
      <motion.div
        className={styles.empty}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.emptyIcon}>🎬</span>
        <h2 className={styles.emptyTitle}>No films watched yet</h2>
        <p className={styles.emptySub}>Mark films as "Watched" to see them here.</p>
        <Link to="/films" className="see-more-btn">Browse films →</Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <h1 className={styles.title}>
        Watchlist
        <span className={styles.count}>{watchedMovies.length}</span>
      </h1>

      {/* Stats strip */}
      <div className={styles.statsStrip}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{watchedMovies.length}</span>
          <span className={styles.statLabel}>Films watched</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>{avgRating.toFixed(1)}</span>
          <span className={styles.statLabel}>Avg rating</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>{genreBreakdown[0]?.[0] ?? '—'}</span>
          <span className={styles.statLabel}>Top genre</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {Math.round((watchedMovies.length / movies.length) * 100)}%
          </span>
          <span className={styles.statLabel}>Catalogue seen</span>
        </div>
      </div>

      {/* Genre breakdown */}
      {genreBreakdown.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Genres</h2>
          <div className={styles.genreGrid}>
            {genreBreakdown.map(([genre, count]) => (
              <div key={genre} className={styles.genreCard}>
                <span className={styles.genreName}>{genre}</span>
                <div className={styles.genreBar}>
                  <div
                    className={styles.genreFill}
                    style={{ width: `${(count / watchedMovies.length) * 100}%` }}
                  />
                </div>
                <span className={styles.genreCount}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Films grid */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Films</h2>
        <motion.div
          className="cards-grid"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {watchedMovies.map(movie => (
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
      </div>
    </motion.div>
  )
}

export default Watchlist
