import styles from './UserProfile.module.css'

const countryFlags = {
  France: '🇫🇷',
  Germany: '🇩🇪',
  UK: '🇬🇧',
  USA: '🇺🇸',
  Spain: '🇪🇸',
  Italy: '🇮🇹',
  Japan: '🇯🇵',
}

function UserProfile({ firstName, lastName, country }) {
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase()
  const flag = countryFlags[country] || '🌍'

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>{initials}</div>
      <div className={styles.info}>
        <p className={styles.name}>{firstName} {lastName}</p>
        <span className={styles.badge}>{flag} {country}</span>
      </div>
    </div>
  )
}

export default UserProfile
