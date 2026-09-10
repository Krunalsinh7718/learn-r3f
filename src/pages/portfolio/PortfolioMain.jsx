import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";

export default function PortfolioMain() {
    return <>
    <Canvas 
    className="r3f"
    camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [0, 4, 8]
            
        }}>
        <Experience />
    </Canvas>
    </>;
}
