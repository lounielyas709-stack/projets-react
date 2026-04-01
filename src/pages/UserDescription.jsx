import { useParams } from 'react-router'
import { motion } from 'framer-motion'
import { users } from '../data'
import styles from './UserDescription.module.css'

const countryFlags = {
  France: '🇫🇷', Germany: '🇩🇪', UK: '🇬🇧',
  USA: '🇺🇸', Spain: '🇪🇸', Italy: '🇮🇹', Japan: '🇯🇵',
}

const genrePool = ['Sci-Fi', 'Drama', 'Thriller', 'Action', 'Fantasy', 'Mystery']
const badges    = ['Cinephile', 'Top Reviewer', 'Verified', '100 Films']

function getStats(firstName, lastName) {
  const seed = (firstName + lastName).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return {
    watched:   (seed % 180) + 20,
    reviews:   (seed % 80)  + 5,
    avgRating: ((seed % 30) + 60) / 10,
    year:      2019 + (seed % 5),
    progress:  (seed % 55) + 40,
    followers: (seed % 900) + 100,
    following: (seed % 300) + 50,
    genres: [
      { name: genrePool[seed % genrePool.length],         pct: (seed % 40) + 55 },
      { name: genrePool[(seed + 1) % genrePool.length],   pct: (seed % 30) + 35 },
      { name: genrePool[(seed + 2) % genrePool.length],   pct: (seed % 25) + 20 },
    ],
  }
}

function UserDescription() {
  const { id } = useParams()
  const user = users[parseInt(id)]

  if (!user) return <p style={{ color: '#9ca3af', padding: 40 }}>User not found.</p>

  const { firstName, lastName, country } = user
  const initials = `${firstName[0]}${lastName[0]}`
  const flag  = countryFlags[country] || '🌍'
  const stats = getStats(firstName, lastName)
  const seed  = (firstName + lastName).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const stars = Math.round(stats.avgRating / 2)

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.heroInfo}>
          <h1 className={styles.fullName}>{firstName} {lastName}</h1>
          <span className={styles.location}>{flag} {country}</span>
          <p className={styles.bio}>
            Movie enthusiast with {stats.watched} films watched. Average rating {stats.avgRating.toFixed(1)}/10.
            Member since {stats.year}.
          </p>
          <div className={styles.badgeRow}>
            {badges.slice(0, seed % 3 + 2).map(b => (
              <span key={b} className={styles.badge}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className={styles.statsStrip}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.watched}</span>
          <span className={styles.statLabel}>Films watched</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.reviews}</span>
          <span className={styles.statLabel}>Reviews</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.followers}</span>
          <span className={styles.statLabel}>Followers</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.avgRating.toFixed(1)}</span>
          <span className={styles.statLabel}>Avg rating</span>
        </div>
      </div>

      {/* Rating */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Rating</h2>
        <div className={styles.levelRow}>
          <span className={styles.levelBadge}>
            {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
          </span>
          <div className={styles.barTrack}>
            <div className={styles.barFill} style={{ width: `${(stats.avgRating / 10) * 100}%` }} />
          </div>
          <span className={styles.levelNext}>{stats.avgRating.toFixed(1)}/10</span>
        </div>
        <p className={styles.levelCaption}>{stats.progress}% of films rated</p>
      </div>

      {/* Favourite genres */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Favourite Genres</h2>
        <div className={styles.skillsGrid}>
          {stats.genres.map(g => (
            <div key={g.name} className={styles.skillCard}>
              <span className={styles.skillName}>{g.name}</span>
              <div className={styles.skillBar}>
                <div className={styles.skillFill} style={{ width: `${g.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default UserDescription
