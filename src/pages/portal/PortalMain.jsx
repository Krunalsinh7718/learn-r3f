import { Canvas } from "@react-three/fiber";
import PortalInner from "./PortalInner";

export default function PortalMain() {
    return <>
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-5, 1.7, 2.6]
            }}
        >
            <PortalInner />
        </Canvas>
    </>
}

