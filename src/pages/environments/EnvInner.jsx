import * as THREE from 'three';
import {
    OrbitControls,
    useHelper,
    BakeShadows,
    AccumulativeShadows,
    RandomizedLight,
    ContactShadows,
    Sky,
    Environment,
    Lightformer
} from '@react-three/drei';
import { useControls, button } from 'leva'
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

export default function EnvInner() {

    const dirLight = useRef();
    useHelper(dirLight, THREE.DirectionalLightHelper, 1);

    const box = useRef();

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;
        box.current.position.x = Math.sin(time) - 2;
    })

    const { color, opacity, blur } = useControls('contact shadows', {
        color: '#000000',
        opacity: { value: 0.5, min: 0, max: 1 },
        blur: { value: 1, min: 0, max: 10 },
    })

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [1, 2, 3] }
    })

    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('environment map', {
        envMapIntensity: { value: 7, min: 0, max: 12 },
        envMapHeight: { value: 7, min: 0, max: 100 },
        envMapRadius: { value: 28, min: 10, max: 1000 },
        envMapScale: { value: 100, min: 10, max: 1000 }
    })

    const scene = useThree(state => state.scene)

    useEffect(() => {
        scene.environmentIntensity = envMapIntensity
    }, [envMapIntensity])



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
        {/* <ambientLight intensity={1} /> */}
        {/* <Sky sunPosition={sunPosition}/> */}
        <ContactShadows
            position={[0, 0, 0]}
            scale={10}
            resolution={512}
            far={5}
            color={color}
            opacity={opacity}
            blur={blur}
            frames={1}
        />
        <Environment
            background
            preset="sunset"
            resolution={32}
            ground={{
                height: envMapHeight,
                radius: envMapRadius,
                scale: envMapScale
            }}
        // files={[
        //     '/images/environments/2/px.jpg',
        //     '/images/environments/2/nx.jpg',
        //     '/images/environments/2/py.jpg',
        //     '/images/environments/2/ny.jpg',
        //     '/images/environments/2/pz.jpg',
        //     '/images/environments/2/nz.jpg',
        // ]}
        // files="/images/environments/the_sky_is_on_fire_2k.hdr"

        >
            <color args={['#000']} attach="background" />
            {/* <mesh position-z={- 5} scale={10} >
                <planeGeometry />
                <meshBasicMaterial color={[1, 0, 0]} />
            </mesh> */}
            <Lightformer
                position-z={- 5}
                scale={10}
                color="red"
                intensity={10}
                form="ring"
            />
        </Environment>

        {/* <directionalLight
    ref={ dirLight }
    position={ sunPosition }
    intensity={ 4.5 }
    castShadow
    shadow-mapSize={ [ 1024, 1024 ] }
    shadow-camera-near={ 1 }
    shadow-camera-far={ 10 }
    shadow-camera-top={ 5 }
    shadow-camera-right={ 5 }
    shadow-camera-bottom={ - 5 }
    shadow-camera-left={ - 5 }
/> */}
        {/* <AccumulativeShadows
            position={[0, - 0.99, 0]}
            scale={10}
            color="#316d39"
            opacity={ 0.8 }
            frames={ Infinity  }
            temporal
             blend={ 100 }
        > */}
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
        {/* <RandomizedLight
                position={[1, 2, 3]}
                amount={8}
                radius={1}
                ambient={0.5}
                intensity={3}
                bias={0.001}
            />

        </AccumulativeShadows> */}
        <mesh
            scale={1.5}
            position={[-2, 1, 0]}
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
            position={[2, 1, 0]}
            castShadow
        >
            <sphereGeometry />
            <meshStandardMaterial
                color={'#9d2be9'}
            />
        </mesh>
        {/* <mesh
            scale={10}
            rotation-x={Math.PI * -0.5}
            position={[0, 0, 0]}
        >
            <planeGeometry />
            <meshStandardMaterial
                side={THREE.DoubleSide}
                color="#acf780"
            />
        </mesh> */}
    </>
}