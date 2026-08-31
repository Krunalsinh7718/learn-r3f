import * as THREE from 'three';
import { useFrame, extend, useThree } from '@react-three/fiber'
import { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import CustomObject from './CustomObject';

export default function Experience() {
    const { camera, gl } = useThree()
    const group1 = useRef()
    const box = useRef()
    const sphere = useRef()
    const spherePos = [3,0,1];

    useFrame((state, delta) => {
         const angle = state.clock.elapsedTime
        group1.current.rotation.y = angle * 0.1;
        // box.current.rotation.x = angle;
        sphere.current.position.x = spherePos[0] + Math.sin(angle * 1.5) * 0.8;
        sphere.current.position.z = spherePos[1] + Math.cos(angle * 1.5) * 0.8;
    })

    return <>
     <OrbitControls 
          enableDamping={true} 
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={10}
        />
        <directionalLight position={ [ 1, 2, 3 ] }  intensity={ 4.5 }/>
          
        <group ref={group1}>
            <mesh
                scale={1.5}
                ref={box}
                >
                <boxGeometry />
                <meshStandardMaterial
                    color="mediumpurple"
                    wireframe={true} />
            </mesh>
            <mesh position={spherePos} scale={0.5} ref={sphere}>
                <sphereGeometry />
                <meshStandardMaterial color={'gold'} />
            </mesh>
        </group>
        <mesh
            scale={20}
            rotation-x={Math.PI * 0.5}
            position={[0, -2, 0]}
        >
            <planeGeometry />
            <meshStandardMaterial
                color={'skyblue'}
                side={THREE.DoubleSide} />
        </mesh>
        <CustomObject />
    </>;
}

