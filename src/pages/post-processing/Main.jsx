import { Canvas, useFrame } from "@react-three/fiber";
import Experiance from "./Experiance";
import { Perf } from "r3f-perf";

export default function Main() {
   
    return <>
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [0, 0, 5]
            }}
        >
            <Perf position="top-left"/>
            <Experiance />
        </Canvas>
    </>
}

