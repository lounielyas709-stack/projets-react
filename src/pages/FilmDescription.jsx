import { useParams } from 'react-router'
import { motion } from 'framer-motion'
import { movies } from '../data'
import { getMovieStats } from '../utils/stats'
import styles from './FilmDescription.module.css'

function FilmDescription() {
  const { id } = useParams()
  const film = movies[parseInt(id)]

  if (!film) return <p style={{ color: '#9ca3af', padding: 40 }}>Film not found.</p>

  const { name, year } = film
  const data  = getMovieStats(name)
  const stars = Math.round(data.rating / 2)

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.poster}>
          <span className={styles.posterIcon}>🎬</span>
          <div className={styles.posterGlow} />
        </div>
        <div className={styles.heroInfo}>
          <span className={styles.genre}>{data.genre}</span>
          <h1 className={styles.title}>{name}</h1>
          <div className={styles.metaRow}>
            <span className={styles.year}>{year}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.runtime}>{data.runtime} min</span>
            <span className={styles.dot}>·</span>
            <span className={styles.language}>{data.language}</span>
          </div>
          <p className={styles.description}>{data.description}</p>
          <div className={styles.ratingRow}>
            <span className={styles.ratingValue}>{data.rating.toFixed(1)}</span>
            <div className={styles.ratingRight}>
              <div className={styles.stars}>{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</div>
              <span className={styles.votes}>{(data.votes / 1000).toFixed(0)}k votes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details grid */}
      <div className={styles.detailsGrid}>
        <div className={styles.detailCard}>
          <span className={styles.detailLabel}>Director</span>
          <span className={styles.detailValue}>{data.director}</span>
        </div>
        <div className={styles.detailCard}>
          <span className={styles.detailLabel}>Genre</span>
          <span className={styles.detailValue}>{data.genre}</span>
        </div>
        <div className={styles.detailCard}>
          <span className={styles.detailLabel}>Budget</span>
          <span className={styles.detailValue}>${data.budget}M</span>
        </div>
        <div className={styles.detailCard}>
          <span className={styles.detailLabel}>Language</span>
          <span className={styles.detailValue}>{data.language}</span>
        </div>
      </div>

      {/* Cast */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Cast</h2>
        <div className={styles.castRow}>
          {data.cast.map(actor => (
            <div key={actor} className={styles.castCard}>
              <div className={styles.castAvatar}>{actor.split(' ').map(w => w[0]).join('')}</div>
              <span className={styles.castName}>{actor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Score */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Audience Score</h2>
        <div className={styles.scoreRow}>
          <span className={styles.scoreLabel}>Rating</span>
          <div className={styles.scoreTrack}>
            <div className={styles.scoreFill} style={{ width: `${(data.rating / 10) * 100}%` }} />
          </div>
          <span className={styles.scoreValue}>{data.rating.toFixed(1)}/10</span>
        </div>
      </div>
    </motion.div>
  )
}

export default FilmDescription
