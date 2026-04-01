import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { motion } from 'framer-motion'
import './App.css'

import ParticleField from './components/ParticleField'
import NavBar from './pages/NavBar'
import Home from './pages/Home'
import UserDescription from './pages/UserDescription'
import FilmDescription from './pages/FilmDescription'

function App() {
  const [mouse, setMouse] = useState({ x: -500, y: -500 })

  useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      const ring = document.createElement('div')
      ring.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 0; height: 0;
        border-radius: 50%;
        border: 2px solid rgba(6, 182, 212, 0.8);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
        animation: ripple-wave 0.7s ease-out forwards;
      `
      document.body.appendChild(ring)
      setTimeout(() => ring.remove(), 700)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      <ParticleField />

      <motion.div
        className="cursor-glow"
        animate={{ x: mouse.x - 200, y: mouse.y - 200 }}
        transition={{ type: 'spring', stiffness: 800, damping: 90, mass: 0.3 }}
      />

      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/user/:id" element={<UserDescription />} />
          <Route path="/film/:id" element={<FilmDescription />} />
        </Routes>
      </div>
    </>
  )
}

export default App
