import * as THREE from 'three';
import { useRef } from 'react';
import { shaderMaterial } from "@react-three/drei"
import { useControls } from "leva"
import gridVertexShader from "./shaders/vertex.vert"
import gridFragmentShader from "./shaders/fragment.frag"
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

extend({ GridMaterial });

export default function BgElements(){
    const gridMaterialRef = useRef();
    const {positionX, positionY, positionZ, rotateX, rotateY, rotateZ, scale} = useControls("Bottom Grid",{
        positionX : {
            value: 3,
            min: -3,
            max: 3,
            step: 0.01
        },
        positionY : {
            value: -2.25,
            min: -3,
            max: 3,
            step: 0.01
        },
        positionZ : {
            value: -1.60,
            min: -3,
            max: 3,
            step: 0.01
        },
        rotateX : {
            value: -1.51,
            min: -Math.PI * 2,
            max: Math.PI * 2,
            step: 0.01
        },
        rotateY : {
            value: -0.11,
            min: -Math.PI * 2,
            max: Math.PI * 2,
            step: 0.01
        },
        rotateZ : {
            value:0.00,
            min: -Math.PI * 2,
            max: Math.PI * 2,
            step: 0.01
        },
        scale : {
            value:1.69,
            min: 1,
            max: 3,
            step: 0.01
        },
    })

     useFrame((state, delta) => {
        gridMaterialRef.current.uniforms.uTime.value += delta;
        
    })

    const { gridColorStart, gridColorEnd } = useControls('grid', {
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

    return <>
        <mesh 
        rotation={[rotateX, rotateY, rotateZ]} 
        position={[positionX, positionY, positionZ]}
        scale={scale}>
            <planeGeometry args={[10,10,20]}/>
            <gridMaterial ref={gridMaterialRef} />
        </mesh>
    </>
}