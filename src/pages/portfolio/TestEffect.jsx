

import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

// 1. Define standard vertex shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// 2. Define fragment shader (Outputs a pulsing gradient)
const fragmentShader = /*glsl*/ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
     vec2 uv = vUv;    
    vec2 uv1 = vUv;    
    vec3 color = vec3(0.0);
    uv.x += uTime * 0.1;
    vec2 pattern = uv * 30.0 ;
    pattern = fract(pattern) ;
    float frame = 0.02;
	float calcX = step(frame,pattern.x);
    float calcY = step(frame,pattern.y);
	
    float calcX1 = step(frame, 1.0 - pattern.x);
	float calcY2 = step(frame, 1.0 - pattern.y);

     float strength = 1.0 - (calcX * calcX1 * calcY * calcY2);

     //outer glow
   float dist =  smoothstep(0.01, 0.8, distance(uv1, vec2(0.5))  * 2.1);
   strength -= dist;

   color = mix(vec3(0.1, 0.2, 2.0), vec3(0.1, 0.9, 0.7), strength);


	
	

    gl_FragColor = vec4(color, strength);
  }
`

function CustomShaderObject() {
  const materialRef = useRef()

  // Update the uniform time on every frame for animation
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  // Memoize uniforms so they aren't recreated on every render
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), [])

  return (
    <mesh position={[0, 0, 0]} scale={0.5}>
      <boxGeometry args={[3, 3, 3]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        // CRITICAL: Prevents the composer from washing out or clamping the shader colors
        toneMapped={false} 
      />
    </mesh>
  )
}

export default function TestEffect(){
    return <>
        <CustomShaderObject />

      {/* 
        CRITICAL: depthWrite={false} prevents post-processing from rendering 
        the shadow plane as a solid black square.
      */}
      <ContactShadows 
        position={[0, -1.2, 0]} 
        opacity={0.8} 
        scale={10} 
        blur={2.5} 
        far={2}
        depthWrite={false} 
      />

      {/* 
        Post Processing Pipeline 
        disableNormalPass={true} saves performance if you don't use SSAO/SSAA
      */}
      <EffectComposer disableNormalPass>
        <Bloom 
          luminanceThreshold={1.0} 
          mipmapBlur 
          intensity={1.5} 
        />
        <Vignette offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
}