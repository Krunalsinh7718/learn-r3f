
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function ModelLoader({ 
  speed = 1.0, 
  primaryColor = "#06b6d4", 
  secondaryColor = "#ec4899", 
  progress = 1, 
  isProgressMode = false 
}) {

  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const bead = useRef();
  

  useFrame((state, delta) => {
    const s = speed * 1.6;
    if (ring1.current) ring1.current.rotation.x += delta * s * 1.2;
    if (ring1.current) ring1.current.rotation.y += delta * s * 0.8;

    if (ring2.current) ring2.current.rotation.y += delta * s * 1.5;
    if (ring2.current) ring2.current.rotation.z += delta * s * 1.0;

    if (ring3.current) ring3.current.rotation.z += delta * s * 1.8;
    if (ring3.current) ring3.current.rotation.x += delta * s * 0.6;

    if (bead.current) {
      const t = state.clock.getElapsedTime() * s * 2;
      bead.current.position.x = Math.sin(t) * 1.9;
      bead.current.position.y = Math.cos(t) * 1.9;
      bead.current.position.z = Math.sin(t * 1.5) * 0.5;
    }
  });

  const scaleMultiplier = isProgressMode ? 0.4 + (progress / 100) * 0.6 : 1.0;
  const beadScale = isProgressMode ? 0.15 + (progress / 100) * 0.15 : 0.22;

  return (
    <group scale={0.5}>
      {/* Outer Ring */}
      <mesh ref={ring1}>
        <torusGeometry args={[2.0, 0.045, 24, 100]} />
        <meshBasicMaterial
          color={primaryColor}
          
          wireframe={false}
        />
      </mesh>

      {/* Middle Ring */}
      <mesh ref={ring2} scale={0.78}>
        <torusGeometry args={[2.0, 0.04, 24, 100]} />
        <meshBasicMaterial
          color={secondaryColor}
          
        />
      </mesh>

      {/* Inner Ring */}
      <mesh ref={ring3} scale={0.58}>
        <torusGeometry args={[2.0, 0.04, 24, 100]} />
        <meshBasicMaterial
          color={primaryColor}
          
        />
      </mesh>

      {/* Center Power Core */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color={secondaryColor}
          
        />
      </mesh>

      {/* Fast Orbiting Satellite Bead */}
      <mesh ref={bead}>
        <sphereGeometry args={[beadScale, 20, 20]} />
        <meshBasicMaterial
          color="#ffffff"
         
        />
      </mesh>
    </group>
  );
}