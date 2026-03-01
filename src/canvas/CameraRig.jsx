import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'

import state from '../store'

const CameraRig = ({ children }) => {
  const group = useRef()
  const { camera, viewport } = useThree()
  const snap = useSnapshot(state)

  const [isBreakpoint, setIsBreakpoint] = useState(window.innerWidth <= 1260)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)

  useEffect(() => {
    const handleResize = () => {
      setIsBreakpoint(window.innerWidth <= 1260)
      setIsMobile(window.innerWidth <= 600)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useFrame((state, delta) => {
    if (!group.current) return

    // Adjust camera target position based on device and intro state
    let targetPosition = [0, 0.5, 3]  // default: centered, slightly raised view

    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0.5, 2.8]
      if (isMobile) targetPosition = [0, 0.8, 3.2]
    } else {
      if (isMobile) targetPosition = [0, 0.6, 3.5]
      else targetPosition = [0, 0.5, 3]
    }

    // Smoothly move camera position
    easing.damp3(camera.position, targetPosition, 0.25, delta)

    // Make camera look at the center of the shirt (where backdrop is)
    camera.lookAt(0, 0.5, 0)

    // Optional: Subtle mouse-follow rotation on the model group
    // Reduced intensity to keep shirt mostly centered
    easing.dampE(
      group.current.rotation,
      [
        state.pointer.y * 0.05,     // very subtle pitch
        state.pointer.x * 0.1,      // subtle yaw
        0
      ],
      0.15,
      delta
    )
  })

  return <group ref={group}>{children}</group>
}

export default CameraRig