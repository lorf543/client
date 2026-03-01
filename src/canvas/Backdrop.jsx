// Backdrop.jsx
import React, { useRef } from 'react'
import { Plane } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSnapshot } from 'valtio'
import { easing } from 'maath'
import * as THREE from 'three'
import state from '../store'

const Backdrop = () => {
  const materialRef = useRef()
  const snap = useSnapshot(state)

  useFrame((_, delta) => {
    if (materialRef.current) {
      // Create color bleeding effect
      const shirtColor = new THREE.Color(snap.color)
      const bleedColor = shirtColor.clone().multiplyScalar(0.25) // 25% intensity
      
      easing.dampC(materialRef.current.color, bleedColor, 0.08, delta)
      
      // Adjust emissive slightly for glow effect
      const emissiveColor = shirtColor.clone().multiplyScalar(0.1)
      easing.dampC(materialRef.current.emissive, emissiveColor, 0.08, delta)
    }
  })

  return (
    <group position={[0, 0.5, -0.10]}>
      <Plane
        args={[6, 7]} 
        rotation={[0, 0, 0]}
        receiveShadow  
      >
        <meshStandardMaterial 
          ref={materialRef}
          color="white"
          roughness={1}
          emissive="#000000"
          toneMapped={true}
        />
      </Plane>
    </group>
  )
}

export default Backdrop