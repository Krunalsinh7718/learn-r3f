import { Canvas } from "@react-three/fiber";
import GeomatriesProjExperiance from "./GeomatriesProjExperiance";
import { OrbitControls } from "@react-three/drei";
import { Leva } from "leva";

export default function GeomatriesProjMain() {
    return <>
    <Leva collapsed/>
        <Canvas
            shadows
            className="r3f-camera"
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [0, 0.3, 8]

            }}
        >
            <OrbitControls />
            <GeomatriesProjExperiance />
        </Canvas>
    </>
}