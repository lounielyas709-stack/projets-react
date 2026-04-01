import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Contact.module.css'

function Contact({ hideTitle = false }) {
  const [email,   setEmail]   = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent,    setSent]    = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    console.log('📧 New message', { to: 'lounielyas709@gmail.com', from: email, subject, message })
    const mailto = `mailto:lounielyas709@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${email}\n\n${message}`)}`
    window.location.href = mailto
    setSent(true)
    setEmail('')
    setSubject('')
    setMessage('')
  }

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {!hideTitle && <h1 className={styles.title}>Contact</h1>}

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            className={styles.success}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className={styles.successIcon}>✓</span>
            <p>Message sent!</p>
            <button className={styles.resetBtn} onClick={() => setSent(false)}>
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                id="email"
                className={styles.input}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="subject">Subject</label>
              <input
                id="subject"
                className={styles.input}
                type="text"
                placeholder="What's this about?"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">Message</label>
              <textarea
                id="message"
                className={styles.textarea}
                placeholder="Your message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={5}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Send Message →
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Contact
