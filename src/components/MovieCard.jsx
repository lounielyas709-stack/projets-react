import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { useTilt } from '../hooks/useTilt'
import { getMovieStats } from '../utils/stats'
import styles from './MovieCard.module.css'

function MovieCard({ name, year, id, marked = false, onMark }) {
  const [flipped, setFlipped] = useState(false)
  const { spotRef, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt()

  const stats = useMemo(() => getMovieStats(name), [name])

  return (
    <motion.div
      className={styles.wrapper}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setFlipped(f => !f)}
    >
      <div ref={spotRef} className={styles.spotlight} />

      <motion.div
        className={styles.inner}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className={styles.front}>
          <span className={styles.yearTop}>{year}</span>
          <button
            className={`${styles.markBtn} ${marked ? styles.markBtnActive : ''}`}
            onClick={e => { e.stopPropagation(); onMark?.() }}
          >
            {marked ? '✓ Watched' : 'Not watched'}
          </button>
          <div className={styles.poster}>
            <span className={styles.icon}>🎬</span>
            {marked && <div className={styles.watchedBadge}>✓ Watched</div>}
            <div className={styles.flipHint}>click to flip</div>
          </div>
          <div className={styles.info}>
            <p className={styles.name}>{name}</p>
          </div>
        </div>

        {/* Back */}
        <div className={styles.back}>
          <div className={styles.backTitle}>{name}</div>
          <div className={styles.ratingRow}>
            <span className={styles.ratingValue}>{stats.rating.toFixed(1)}</span>
            <span className={styles.ratingMax}> / 10</span>
          </div>
          <div className={styles.stars}>
            {'★'.repeat(Math.round(stats.rating / 2))}{'☆'.repeat(5 - Math.round(stats.rating / 2))}
          </div>
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Genre</span>
              <span className={styles.metaValue}>{stats.genre}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Runtime</span>
              <span className={styles.metaValue}>{stats.runtime}min</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Year</span>
              <span className={styles.metaValue}>{year}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Votes</span>
              <span className={styles.metaValue}>{(stats.votes / 1000).toFixed(0)}k</span>
            </div>
          </div>
          <Link
            to={`/film/${id}`}
            className={styles.viewLink}
            onClick={e => e.stopPropagation()}
          >
            View Film →
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default MovieCard
