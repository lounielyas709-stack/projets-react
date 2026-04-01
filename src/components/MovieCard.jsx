import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import styles from './MovieCard.module.css'

const genres = ['Sci-Fi', 'Drama', 'Thriller', 'Action', 'Fantasy', 'Mystery']

function getMovieStats(name) {
  const seed = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return {
    rating: ((seed % 30) + 65) / 10,
    genre: genres[seed % genres.length],
    runtime: (seed % 60) + 90,
    votes: ((seed % 900) + 100) * 1000,
  }
}

function MovieCard({ name, year, id }) {
  const spotRef = useRef()
  const [flipped, setFlipped] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 25 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 25 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(34,211,238,0.16) 0%, transparent 65%)`
    }
  }

  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
    if (spotRef.current) spotRef.current.style.background = 'none'
  }

  const stats = getMovieStats(name)

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
          <div className={styles.poster}>
            <span className={styles.icon}>🎬</span>
          </div>
          <div className={styles.info}>
            <p className={styles.name}>{name}</p>
          </div>
          <div className={styles.flipHint}>click to flip</div>
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
