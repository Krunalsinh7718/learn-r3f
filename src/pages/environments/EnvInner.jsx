import * as THREE from 'three';
import {
    OrbitControls,
    useHelper,
    Stage
} from '@react-three/drei';
export default function EnvInner() {
    return <>
        <color attach="background"  args={['ivory']} />
        <OrbitControls
            enableDamping={false}
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={10}
            makeDefault
        />
       <Stage
    // environment="city"
    preset="soft"
    intensity={0.5}
  >
    <mesh position={[-2, 1, 0]} scale={1.5}>
      <boxGeometry />
      <meshBasicMaterial color="orange" />
    </mesh>

    <mesh position={[2, 1, 0]} scale={1.5}>
      <sphereGeometry />
      <meshBasicMaterial color="#9d2be9" />
    </mesh>
  </Stage>

    </>
}