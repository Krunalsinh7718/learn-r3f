import { useRef } from 'react'
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, TransformControls, PivotControls, Html } from '@react-three/drei';


export default function Drei() {

    const transObject = useRef();
    const box = useRef();
    const circle = useRef();
    return <>
        <Canvas>
            <OrbitControls
                enableDamping={false}
                dampingFactor={0.05}
                minDistance={2}
                maxDistance={10}
                makeDefault
            />
            <directionalLight
                position={[1, 2, 3]}
                intensity={4.5}
                ref={transObject}
            />
            <TransformControls object={transObject} />
            <mesh
                scale={1.5}
                position={[3, 0, 0]}
                ref={box}
            >
                <boxGeometry />
                <meshStandardMaterial
                    color="mediumpurple"
                />
                <Html
                    position={[0, 1, 0]}
                    wrapperClass="floating-label"
                    occlude={[box,circle]}
                    center
                    distanceFactor={ 8 }
                >Test</Html>
            </mesh>
            <PivotControls
                anchor={[0, 0, 0]}
                depthTest={false}
            >
                <mesh
                    position={[0, 0, 2]}
                    ref={circle}
                >
                    <sphereGeometry />
                    <meshStandardMaterial color={'gold'} />
                </mesh>
            </PivotControls>
            <mesh
                scale={20}
                rotation-x={Math.PI * 0.5}
                position={[0, -2, 0]}
            >
                <planeGeometry />
                <meshStandardMaterial
                    color={'skyblue'}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </Canvas>
    </>;
}

