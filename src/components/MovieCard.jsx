import styles from './MovieCard.module.css'

function MovieCard({ name, year }) {
  return (
    <div className={styles.card}>
      <div className={styles.poster}>
        <span className={styles.icon}>🎬</span>
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <span className={styles.year}>{year}</span>
      </div>
    </div>
  )
}

export default MovieCard
