import { Link } from 'react-router'
import { motion } from 'framer-motion'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.sub}>This route doesn't exist.</p>
      <Link to="/" className={styles.btn}>← Back to home</Link>
    </motion.div>
  )
}

export default NotFound
