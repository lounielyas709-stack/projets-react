import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import UserProfile from '../components/UserProfile'
import { users } from '../data'
import styles from './AllExperts.module.css'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

const usersWithId = users.map((u, id) => ({ ...u, id }))

function AllExperts() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return usersWithId
    const q = search.toLowerCase()
    return usersWithId.filter(u =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
      u.country.toLowerCase().includes(q)
    )
  }, [search])

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>
          All Experts
          <span className={styles.count}>{filtered.length}</span>
        </h1>
        <input
          className="search-input"
          type="text"
          placeholder="Search an expert..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="no-results">No experts match your search.</p>
      ) : (
        <motion.div
          className="cards-grid"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {filtered.map(u => (
            <motion.div key={u.id} variants={fadeUp}>
              <UserProfile {...u} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default AllExperts
