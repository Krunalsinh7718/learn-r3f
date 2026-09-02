import * as THREE from 'three';
import { useRef } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { Perf } from 'r3f-perf'
import { Leva } from 'leva'
import EnvInner from './EnvInner';

export default function Environments() {
   

    return <>
        <Leva collapsed />
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [0, 4, 8]
            }}
            shadows="soft"
        >
            <Perf position="top-left" />
            <EnvInner />


        </Canvas>
    </>;
}

