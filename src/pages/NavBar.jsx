import { Link, useLocation } from 'react-router'
import styles from './NavBar.module.css'

function NavBar() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoMark}>RP</span>
        <span className={styles.logoText}>React Playground</span>
      </Link>

      <div className={styles.links}>
        {isHome ? (
          <>
            <button className={styles.link} onClick={() => scrollTo('section-users')}>
              Users
            </button>
            <button className={styles.link} onClick={() => scrollTo('section-movies')}>
              Movies
            </button>
          </>
        ) : (
          <Link to="/" className={styles.backLink}>← Back</Link>
        )}
      </div>
    </nav>
  )
}

export default NavBar
