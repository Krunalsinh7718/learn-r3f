import { Canvas } from "@react-three/fiber";
import GameExperience from "./GameExperience";

export default function GameMain() {
    return <>
        <Canvas
            shadows
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [2.5, 4, 6]
            }}
        >
            <GameExperience />
        </Canvas>
    </>;
}
