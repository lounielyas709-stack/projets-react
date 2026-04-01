import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import styles from './UserProfile.module.css'

const countryFlags = {
  France: '🇫🇷',
  Germany: '🇩🇪',
  UK: '🇬🇧',
  USA: '🇺🇸',
  Spain: '🇪🇸',
  Italy: '🇮🇹',
  Japan: '🇯🇵',
}

const genrePool = ['Sci-Fi', 'Drama', 'Thriller', 'Action', 'Fantasy', 'Mystery']

function getStats(firstName, lastName) {
  const seed = (firstName + lastName).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return {
    watched:   (seed % 180) + 20,
    reviews:   (seed % 80) + 5,
    avgRating: ((seed % 30) + 60) / 10,
    genre:     genrePool[seed % genrePool.length],
    progress:  (seed % 55) + 40,
  }
}

function UserProfile({ firstName, lastName, country, id }) {
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
      spotRef.current.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(6,182,212,0.2) 0%, transparent 65%)`
    }
  }

  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
    if (spotRef.current) spotRef.current.style.background = 'none'
  }

  const initials = `${firstName[0]}${lastName[0]}`
  const flag = countryFlags[country] || '🌍'
  const stats = getStats(firstName, lastName)

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
          <div className={styles.flipHint}>click to flip</div>
          <div className={styles.avatar}>{initials}</div>
          <div className={styles.info}>
            <p className={styles.name}>{firstName} {lastName}</p>
            <span className={styles.badge}>{flag} {country}</span>
          </div>
        </div>

        {/* Back */}
        <div className={styles.back}>
          <div className={styles.backTitle}>{firstName} {lastName}</div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Movies watched</span>
            <span className={styles.statValue}>{stats.watched}</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Reviews</span>
            <span className={styles.statValue}>{stats.reviews}</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Avg rating</span>
            <span className={styles.statValue}>{stats.avgRating.toFixed(1)} / 10</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Fav genre</span>
            <span className={styles.statValue}>{stats.genre}</span>
          </div>
          <div className={styles.barTrack}>
            <div className={styles.barFill} style={{ width: `${stats.progress}%` }} />
          </div>
          <span className={styles.statLabel}>{stats.watched} films · {stats.reviews} reviews</span>
          <Link
            to={`/user/${id}`}
            className={styles.viewLink}
            onClick={e => e.stopPropagation()}
          >
            View Profile →
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default UserProfile
