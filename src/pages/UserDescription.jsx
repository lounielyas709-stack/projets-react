import { useMemo } from 'react'
import { useParams } from 'react-router'
import { motion } from 'framer-motion'
import { users, movies, countryFlags } from '../data'
import { getUserStats, getUserReviews, strSeed } from '../utils/stats'
import { usePageTitle } from '../hooks/usePageTitle'
import { useAuth } from '../context/AuthContext'
import { useWatched } from '../hooks/useWatched'
import styles from './UserDescription.module.css'

const badges = ['Cinephile', 'Top Reviewer', 'Verified', '100 Films']

function UserDescription() {
  const { id } = useParams()
  const user = users[parseInt(id)]

  if (!user) return <p style={{ color: '#9ca3af', padding: 40 }}>User not found.</p>

  const { firstName, lastName, country } = user
  usePageTitle(`${firstName} ${lastName}`)
  const { user: authUser } = useAuth()
  const { marked } = useWatched()
  const initials = `${firstName[0]}${lastName[0]}`
  const flag     = countryFlags[country] || '🌍'
  const stats    = getUserStats(firstName, lastName)
  const reviews  = getUserReviews(firstName, lastName)
  const seed     = strSeed(firstName + lastName)
  const stars    = Math.round(stats.avgRating / 2)

  const filmsInCommon = useMemo(() =>
    reviews.filter(r => {
      const idx = movies.findIndex(m => m.name === r.name)
      return idx !== -1 && marked.has(idx)
    }).length
  , [reviews, marked])

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
            {authUser && (
              <span className={styles.badge} style={{ background: 'rgba(6,182,212,0.15)', color: '#22d3ee', borderColor: 'rgba(6,182,212,0.3)' }}>
                🎬 {filmsInCommon} film{filmsInCommon !== 1 ? 's' : ''} en commun
              </span>
            )}
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

      {/* Reviews */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Reviews</h2>
        <div className={styles.reviewsGrid}>
          {reviews.map((r, i) => (
            <div key={i} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewFilm}>{r.name}</span>
                <span className={styles.reviewYear}>{r.year}</span>
                <span className={styles.reviewRating}>{'★'.repeat(Math.round(r.rating / 2))}{'☆'.repeat(5 - Math.round(r.rating / 2))}</span>
                <span className={styles.reviewScore}>{r.rating}/10</span>
              </div>
              <p className={styles.reviewOpinion}>{r.opinion}</p>
            </div>
          ))}
        </div>
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
