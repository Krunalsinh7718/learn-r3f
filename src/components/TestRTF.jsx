import * as THREE from 'three'
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import Experience from "./Experience";



export default function TestRTF() {
    const cameraSettings = {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [3, 2, 6]
    }



    return <>
        <Canvas
             dpr={ [ 1, 2 ] }
            gl={{
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                outputColorSpace: THREE.LinearSRGBColorSpace
            }}
            camera={cameraSettings}>
            <Experience />
        </Canvas>
    </>
}