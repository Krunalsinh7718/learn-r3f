
import { Canvas } from "@react-three/fiber";
import ModelInner from "./ModelInner";

export default function Models() {
    return <>
        <Canvas shadows camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [0, 4, 8]
            
        }}>
          <ModelInner />
        </Canvas>
    </>;
}
