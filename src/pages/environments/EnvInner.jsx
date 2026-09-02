import * as THREE from 'three';
import { OrbitControls, useHelper, BakeShadows, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { useControls, button } from 'leva'
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function EnvInner() {

    const dirLight = useRef();
    // useHelper(dirLight, THREE.DirectionalLightHelper, 1);

    const box = useRef();

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;
        box.current.position.x = Math.sin(time) - 2;
    })

    return <>
        {/* <BakeShadows /> */}
        <color args={['ivory']} attach="background" />
        <OrbitControls
            enableDamping={false}
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={10}
            makeDefault
        />
        <ambientLight intensity={2} />
        <AccumulativeShadows
            position={[0, - 0.99, 0]}
            scale={10}
            color="#316d39"
            opacity={ 0.8 }
            frames={ Infinity  }
            temporal
             blend={ 100 }
        >
            {/* <directionalLight
            position={[1, 2, 3]}
            ref={dirLight}
            castShadow 
            intensity={4.5}
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={-2}
            shadow-camera-bottom={2}
            shadow-camera-left={-4}
            shadow-camera-right={4}
        /> */}
            <RandomizedLight
                position={[1, 2, 3]}
                amount={8}
                radius={1}
                ambient={0.5}
                intensity={3}
                bias={0.001}
            />

        </AccumulativeShadows>
        <mesh
            scale={1.5}
            position={[-2, 0, 0]}
            visible={true}
            ref={box}
            castShadow
        >
            <boxGeometry />
            <meshStandardMaterial
                color={'orange'}
            />
        </mesh>
        <mesh
            position={[2, 0, 0]}
            castShadow
        >
            <sphereGeometry />
            <meshStandardMaterial
                color={'#9d2be9'}
            />
        </mesh>
        <mesh
            scale={10}
            rotation-x={Math.PI * -0.5}
            position={[0, -1, 0]}
        >
            <planeGeometry />
            <meshStandardMaterial
                side={THREE.DoubleSide}
                color="#acf780"
            />
        </mesh>
    </>
}