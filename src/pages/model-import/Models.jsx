import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

export default function Models() {
    return <>
        <Canvas camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [0, 4, 8]
        }}>
            <OrbitControls/>
            <Perf position="top-left" />
            <mesh
                scale={1.5}
                position={[-2, 1, 0]}
            >
                <boxGeometry />
                <meshBasicMaterial
                    color={'orange'}
                />
            </mesh>
        </Canvas>
    </>;
}
