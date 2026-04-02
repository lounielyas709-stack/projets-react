import { NavLink, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import styles from './NavBar.module.css'

function NavBar() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const isHome    = location.pathname === '/'
  const { user, logout } = useAuth()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinkClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className={styles.nav}>
      <NavLink to="/" end className={({ isActive }) => `${styles.logo} ${isActive ? styles.logoActive : ''}`}>
        <span className={styles.logoMark}>MT</span>
        <span className={styles.logoText}>MovieTreasures</span>
      </NavLink>

      <div className={styles.links}>
        {isHome ? (
          <>
            <button className={styles.navLink} onClick={() => scrollTo('section-experts')}>Experts</button>
            <button className={styles.navLink} onClick={() => scrollTo('section-movies')}>Movies</button>
            <button className={styles.navLink} onClick={() => scrollTo('section-contact')}>Contact</button>
          </>
        ) : (
          <>
            <NavLink to="/experts" className={navLinkClass}>Experts</NavLink>
            <NavLink to="/films"   className={navLinkClass}>Films</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </>
        )}

        <NavLink to="/watchlist" className={navLinkClass}>Watchlist</NavLink>

        {user ? (
          <div className={styles.userZone}>
            <span className={styles.userAvatar}>{user.avatar}</span>
            <span className={styles.userName}>{user.name}</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>Sign out</button>
          </div>
        ) : (
          <NavLink to="/login" className={navLinkClass}>Sign in</NavLink>
        )}
      </div>
    </nav>
  )
}

export default NavBar
