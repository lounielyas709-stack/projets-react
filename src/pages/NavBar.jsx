import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import styles from './NavBar.module.css'

function NavBar() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const isHome    = location.pathname === '/'
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  const scrollTo = (id) => {
    close()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinkClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`

  const handleLogout = () => {
    logout()
    close()
    navigate('/')
  }

  return (
    <nav className={styles.nav}>
      <NavLink to="/" end onClick={close} className={({ isActive }) => `${styles.logo} ${isActive ? styles.logoActive : ''}`}>
        <span className={styles.logoMark}>MT</span>
        <span className={styles.logoText}>MovieTreasures</span>
      </NavLink>

      {/* Hamburger */}
      <button
        className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>

      {/* Links — desktop always visible, mobile toggles */}
      <div className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
        {isHome ? (
          <>
            <button className={styles.navLink} onClick={() => scrollTo('section-experts')}>Experts</button>
            <button className={styles.navLink} onClick={() => scrollTo('section-movies')}>Movies</button>
            <button className={styles.navLink} onClick={() => scrollTo('section-contact')}>Contact</button>
          </>
        ) : (
          <>
            <NavLink to="/experts" className={navLinkClass} onClick={close}>Experts</NavLink>
            <NavLink to="/films"   className={navLinkClass} onClick={close}>Films</NavLink>
            <NavLink to="/contact" className={navLinkClass} onClick={close}>Contact</NavLink>
          </>
        )}

        <NavLink to="/watchlist" className={navLinkClass} onClick={close}>Watchlist</NavLink>

        {user ? (
          <div className={styles.userZone}>
            <span className={styles.userAvatar}>{user.avatar}</span>
            <span className={styles.userName}>{user.name}</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>Sign out</button>
          </div>
        ) : (
          <NavLink to="/login" className={navLinkClass} onClick={close}>Sign in</NavLink>
        )}
      </div>

      {/* Backdrop */}
      {open && <div className={styles.backdrop} onClick={close} />}
    </nav>
  )
}

export default NavBar
