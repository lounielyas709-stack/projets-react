import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'

function Particles({ count = 3500 }) {
  const pointsRef = useRef()
  const rotX = useRef(0)
  const rotY = useRef(0)
  const rotSpeed = useRef(1)
  const scaleTarget = useRef(1)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 28
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28
      pos[i * 3 + 2] = (Math.random() - 0.5) * 28
      const t = Math.random()
      col[i * 3]     = t * 0.06
      col[i * 3 + 1] = 0.65 + t * 0.35
      col[i * 3 + 2] = 0.78 + t * 0.22
    }
    return [pos, col]
  }, [count])

  useEffect(() => {
    const handleClick = () => {
      rotSpeed.current = 8
      scaleTarget.current = 1.28
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  useFrame((state, delta) => {
    rotSpeed.current = MathUtils.lerp(rotSpeed.current, 1, delta * 2.2)
    scaleTarget.current = MathUtils.lerp(scaleTarget.current, 1, delta * 5)
    rotX.current += 0.025 * rotSpeed.current * delta
    rotY.current += 0.04 * rotSpeed.current * delta
    pointsRef.current.rotation.x = rotX.current
    pointsRef.current.rotation.y = rotY.current
    pointsRef.current.scale.setScalar(scaleTarget.current)
    state.camera.position.x += (state.mouse.x * 0.8 - state.camera.position.x) * 0.015
    state.camera.position.y += (state.mouse.y * 0.8 - state.camera.position.y) * 0.015
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.75} sizeAttenuation />
    </points>
  )
}


export default function ParticleField() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      camera={{ position: [0, 0, 13], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Particles />
    </Canvas>
  )
}
