import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

import ParticleField from './components/ParticleField'
import BackToTop from './components/BackToTop'
import NavBar from './pages/NavBar'
import Home from './pages/Home'
import UserDescription from './pages/UserDescription'
import FilmDescription from './pages/FilmDescription'
import Contact from './pages/Contact'
import AllFilms from './pages/AllFilms'
import AllExperts from './pages/AllExperts'
import Watchlist from './pages/Watchlist'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import { useScrollToTop } from './hooks/useScrollToTop'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

function AnimatedRoutes() {
  const location = useLocation()
  useScrollToTop()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/"           element={<Home />} />
          <Route path="/user/:id"   element={<UserDescription />} />
          <Route path="/film/:id"   element={<FilmDescription />} />
          <Route path="/contact"    element={<Contact />} />
          <Route path="/films"      element={<AllFilms />} />
          <Route path="/experts"    element={<AllExperts />} />
          <Route path="/watchlist"  element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
          <Route path="/login"      element={<Login />} />
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  const [mouse, setMouse] = useState({ x: -500, y: -500 })
  const progressRef       = useRef()

  useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      if (progressRef.current) progressRef.current.style.width = `${pct}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      const ring = document.createElement('div')
      ring.style.cssText = `
        position: fixed; left: ${e.clientX}px; top: ${e.clientY}px;
        width: 0; height: 0; border-radius: 50%;
        border: 2px solid rgba(6, 182, 212, 0.8);
        transform: translate(-50%, -50%); pointer-events: none;
        z-index: 9999; animation: ripple-wave 0.7s ease-out forwards;
      `
      document.body.appendChild(ring)
      setTimeout(() => ring.remove(), 700)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      <div ref={progressRef} className="scroll-progress" />
      <ParticleField />
      <motion.div
        className="cursor-glow"
        animate={{ x: mouse.x - 200, y: mouse.y - 200 }}
        transition={{ type: 'spring', stiffness: 800, damping: 90, mass: 0.3 }}
      />
      <div className="app">
        <NavBar />
        <AnimatedRoutes />
      </div>
      <BackToTop />
    </>
  )
}

export default App
