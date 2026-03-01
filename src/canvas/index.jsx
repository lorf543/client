// CanvasModel.jsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Center } from '@react-three/drei'
import Backdrop from './Backdrop'
import Shirt from './Shirt'
import CameraRig from './CameraRig'

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ 
        position: [10, 0.5, 4], 
        fov: 20,
        near: 0.1,
        far: 100
      }}
      gl={{ preserveDrawingBuffer: true }}
      style={{ background: '#222' }}
    >

      <ambientLight intensity={0.7} />


      
      {/* Key light from front-right */}
      <directionalLight
        castShadow
        position={[3, 4, 4]}
        intensity={1.9}
        shadow-radius={4}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      
      {/* Fill light from front-left for softer shadows */}
      <directionalLight
        position={[-3, 2, 4]}
        intensity={.5}
      />
      
      <CameraRig>
        <group position={[0, 0.5, 0]}>
          <Shirt />
        </group>
      </CameraRig>

      <Backdrop />
    </Canvas>
  )
}

export default CanvasModel