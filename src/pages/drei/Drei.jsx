import { useRef } from 'react'
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls, TransformControls, PivotControls, Html, Text, Float, MeshReflectorMaterial,
    AsciiRenderer,
    Billboard,
    Clone,
    Decal,
    Edges,
    GradientTexture,
    GradientType,
    Image,
    Outlines,
    Trail,
    useTrail,
    MeshDiscardMaterial,
    MeshDistortMaterial,
    MeshTransmissionMaterial,
    MeshWobbleMaterial
} from '@react-three/drei';
import { useControls, button } from 'leva'
import { Perf } from 'r3f-perf'


export default function Drei() {

    const transObject = useRef();
    const box = useRef();
    const circle = useRef();

    const { position, boxColor, boxVisible, myInterval, choice } = useControls('Box',{
        position: {
            value: { x: 3, z: 0 },
            min: -3,
            max: 9,
            step: 0.01,
        },
        boxColor: "mediumpurple",
        boxVisible: true,
        myInterval:
        {
            min: 0,
            max: 10,
            value: [4, 5],
        },
        clickMe: button(() => { console.log('ok') }),
        choice: { options: [ 'a', 'b', 'c' ] }
    })

     const {  sphereColor } = useControls('Sphere',{
        
        sphereColor: "mediumpurple",
        
    })
     const {  perfVisible } = useControls('Perf',{
        
        perfVisible: true,
        
    })
    // console.log(choice);



    return <>
        <Canvas>
             {perfVisible && <Perf position="top-left" />}
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
            {/* <TransformControls object={transObject} /> */}
            <mesh
                scale={1.5}
                position={[position.x, 0, position.z]}
                ref={box}
                visible={boxVisible}
            >
                <boxGeometry />
                <meshStandardMaterial
                    color={boxColor}
                />
            </mesh>
                <mesh
                    position={[0, 0, 2]}
                    ref={circle}
                >
                    <sphereGeometry />
                    <meshStandardMaterial color={'gold'} ></meshStandardMaterial>
                    {/* <MeshWobbleMaterial factor={1} speed={10}/> */}

                </mesh>
            {/* <PivotControls
                anchor={[0, 0, 0]}
                depthTest={false}
            >
            </PivotControls> */}
            <mesh
                scale={20}
                rotation-x={Math.PI * -0.5}
                position={[0, -1, 0]}
            >
                <planeGeometry />
                <MeshReflectorMaterial
                    side={THREE.DoubleSide}
                    resolution={512}
                    blur={[1000, 1000]}
                    mixBlur={0.5}
                    mirror={0.5}
                    color="greenyellow"
                />
            </mesh>
            {/* <Float
                speed={3}
                floatIntensity={2}
            >
                <Text
                    position={[-3, 1.5, 1]}
                    font="/fonts/PermanentMarker-Regular.ttf"
                    color="orange"
                    fontSize={1}
                    maxWidth={2}
                    textAlign="center"
                    anchorY='middle'
                    lineHeight={1}
                >I LOVE R3F</Text>
            </Float> */}

        </Canvas>
    </>;
}

