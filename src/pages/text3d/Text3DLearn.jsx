import { Canvas } from "@react-three/fiber";
import InnerText3DLearn from "./InnerText3DLearn";
import { Perf } from "r3f-perf";
import { useControls } from "leva";

export default function Text3DLearn() {
    const {color} = useControls('background',{
        color : "#ffb78c"
    })
    

    return <>
        <Canvas camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [0, 4, 8]
        }}

       >
            <Perf position="top-left" />
            <InnerText3DLearn />
            <color args={[color]} attach="background"/>
        </Canvas>
    </>
}