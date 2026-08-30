import * as THREE from 'three';
import { useFrame, extend, useThree } from '@react-three/fiber'
import { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import CustomObject from './CustomObject';

export default function Experience() {
    const { camera, gl } = useThree()
    const group = useRef()
    const box = useRef()

    useFrame((state, delta) => {
        group.current.rotation.y += delta
        box.current.rotation.x += delta
    })

    return <>
     <OrbitControls 
          enableDamping={true} 
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={10}
        />
        <directionalLight position={ [ 1, 2, 3 ] }  intensity={ 4.5 }/>
        <group ref={group}>
            <mesh
                rotation-y={Math.PI * 0.25}
                position-x={0}
                scale={1.5}
                ref={box}
                >
                <boxGeometry />
                <meshStandardMaterial
                    color="mediumpurple"
                    wireframe={true} />
            </mesh>
            <mesh position={[2, 0, 1]} scale={0.5}>
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

