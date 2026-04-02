import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Toast.module.css'

function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.toast}
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
