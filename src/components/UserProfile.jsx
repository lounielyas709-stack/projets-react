import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { countryFlags } from '../data'
import { useTilt } from '../hooks/useTilt'
import { getUserStats } from '../utils/stats'
import styles from './UserProfile.module.css'

function UserProfile({ firstName, lastName, country, id }) {
  const [flipped, setFlipped] = useState(false)
  const { spotRef, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt('rgba(6,182,212,0.2)')

  const initials = `${firstName[0]}${lastName[0]}`
  const flag     = countryFlags[country] || '🌍'
  const stats    = useMemo(() => getUserStats(firstName, lastName), [firstName, lastName])

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
