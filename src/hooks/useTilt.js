import { useRef, useCallback } from 'react'
import { useMotionValue, useTransform, useSpring } from 'framer-motion'

export function useTilt(spotlightColor = 'rgba(34,211,238,0.16)') {
  const spotRef = useRef()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 25 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 25 })

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mx.set(x / rect.width - 0.5)
    my.set(y / rect.height - 0.5)
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${spotlightColor} 0%, transparent 65%)`
    }
  }, [spotlightColor, mx, my])

  const handleMouseLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
    if (spotRef.current) spotRef.current.style.background = 'none'
  }, [mx, my])

  return { spotRef, rotateX, rotateY, handleMouseMove, handleMouseLeave }
}
