import { useParams } from 'react-router'
import { motion } from 'framer-motion'
import { movies } from '../data'
import styles from './FilmDescription.module.css'

const genres     = ['Sci-Fi', 'Drama', 'Thriller', 'Action', 'Fantasy', 'Mystery']
const castPool   = ['Emma Stone', 'Ryan Gosling', 'Cillian Murphy', 'Zendaya', 'Timothée Chalamet', 'Ana de Armas', 'Tom Hanks', 'Margot Robbie']
const directors  = ['Denis Villeneuve', 'Christopher Nolan', 'Bong Joon-ho', 'Makoto Shinkai', 'Ridley Scott', 'Sofia Coppola']
const descs      = [
  'A visually stunning journey through space and time, pushing the boundaries of what cinema can achieve.',
  'A gripping psychological thriller that keeps you on the edge of your seat until the very last frame.',
  'An intimate portrait of human connection in a world increasingly defined by isolation and technology.',
  'A breathtaking epic that blends ancient mythology with cutting-edge visual storytelling.',
]

function getMovieData(name) {
  const seed = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return {
    rating:      ((seed % 30) + 65) / 10,
    genre:       genres[seed % genres.length],
    runtime:     (seed % 60) + 90,
    votes:       ((seed % 900) + 100) * 1000,
    director:    directors[seed % directors.length],
    cast:        [castPool[seed % castPool.length], castPool[(seed + 2) % castPool.length], castPool[(seed + 4) % castPool.length]],
    description: descs[seed % descs.length],
    budget:      (seed % 150) + 50,
    language:    ['English', 'French', 'Japanese', 'Korean'][seed % 4],
  }
}

function FilmDescription() {
  const { id } = useParams()
  const film = movies[parseInt(id)]

  if (!film) return <p style={{ color: '#9ca3af', padding: 40 }}>Film not found.</p>

  const { name, year } = film
  const data  = getMovieData(name)
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
