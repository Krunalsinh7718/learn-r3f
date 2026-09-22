import * as THREE from 'three';
import { Uniform } from "three";
import { useMemo, useRef } from 'react';
import { shaderMaterial } from "@react-three/drei"
import { useControls } from "leva"
import gridVertexShader from "./grid-shaders/vertex.vert"
import gridFragmentShader from "./grid-shaders/fragment.frag"

import dotGridVertexShader from "./dots-shaders/vertex.vert"
import dotGridFragmentShader from "./dots-shaders/fragment.frag"
import { extend, useFrame } from '@react-three/fiber';

const GridMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color("red"),
        uColorEnd: new THREE.Color("blue"),
        transparent: true,
    },
    gridVertexShader,
    gridFragmentShader
);


const DotGridMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color("red"),
        uColorEnd: new THREE.Color("blue"),
        transparent: true,
        uResolution: new THREE.Vector2(
            window.innerWidth * Math.min(window.devicePixelRatio, 2),
            window.innerHeight * Math.min(window.devicePixelRatio, 2)
        )
    },
    dotGridVertexShader,
    dotGridFragmentShader
);





extend({ GridMaterial });
extend({ DotGridMaterial })

export default function BgElements() {
    const gridMaterialRef = useRef();
    const dotGridMaterialRef = useRef();
    const { positionX, positionY, positionZ, rotateX, rotateY, rotateZ, scale, gridColorStart, gridColorEnd } = useControls("Bottom Grid", {
        positionX: {
            value: 3,
            min: -3,
            max: 3,
            step: 0.01
        },
        positionY: {
            value: -2.25,
            min: -3,
            max: 3,
            step: 0.01
        },
        positionZ: {
            value: -1.60,
            min: -3,
            max: 3,
            step: 0.01
        },
        rotateX: {
            value: -1.51,
            min: -Math.PI * 2,
            max: Math.PI * 2,
            step: 0.01
        },
        rotateY: {
            value: -0.11,
            min: -Math.PI * 2,
            max: Math.PI * 2,
            step: 0.01
        },
        rotateZ: {
            value: 0.00,
            min: -Math.PI * 2,
            max: Math.PI * 2,
            step: 0.01
        },
        scale: {
            value: 2.04,
            min: 1,
            max: 3,
            step: 0.01
        },
         gridColorStart: {
            value: "#2975c9",
            onChange: (value) => {
                gridMaterialRef.current.uniforms.uColorStart.value.set(value)
            },
        },
        gridColorEnd: {
            value: "#a935ff",
            onChange: (value) => {
                gridMaterialRef.current.uniforms.uColorEnd.value.set(value)
            },
        },
    })

    useFrame((state, delta) => {
        gridMaterialRef.current.uniforms.uTime.value += delta;
        // dotGridMaterialRef.current.lookAt(state.camera.position)

    })

    

    const uniforms = useMemo(() => ({
        uTime: { value: 0.0 },
        uColorStart:  {value:new THREE.Color(gridColorStart)},
        uColorEnd: {value: new THREE.Color(gridColorEnd)},
    }), [])



    return <>
        <mesh
            rotation={[rotateX, rotateY, rotateZ]}
            position={[positionX, positionY, positionZ]}
            scale={scale}>
            <planeGeometry args={[10, 10]} />
            {/* <gridMaterial 
                ref={gridMaterialRef} 
                toneMapped={false}
                depthWrite={false}
                attach="material"
            /> */}
            <shaderMaterial
                ref={gridMaterialRef}
                vertexShader={gridVertexShader}
                fragmentShader={gridFragmentShader}
                uniforms={uniforms}
                transparent={true}
                toneMapped={false}
            />
        </mesh>


    </>
}