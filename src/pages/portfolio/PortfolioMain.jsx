import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Perf } from "r3f-perf";
import Experience from "./Experience.jsx";
import ModelLoader from "./ModelLoader.jsx";
import { Leva } from 'leva';

export default function PortfolioMain() {
    return <>
    
        <Leva collapsed />
        <Canvas
            className="r3f"
            gl={{
                toneMapping: THREE.NoToneMapping
            }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 2000,
                position: [-3, 1.5, 4]

            }}>
            <Suspense fallback={<ModelLoader />}>
                <Experience />
            </Suspense>
        </Canvas>
    </>;
}
