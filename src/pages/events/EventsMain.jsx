import { Canvas } from "@react-three/fiber";
import EventsInner from "./EventsInner.jsx";

export default function EventsMain() {
    return <>
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [0, 1.7, 5]
            }}
        >
            <EventsInner />
        </Canvas>
    </>
}

