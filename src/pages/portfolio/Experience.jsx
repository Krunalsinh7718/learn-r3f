import { Environment, OrbitControls } from "@react-three/drei";
import Laptop from "./Laptop";

export default function Experience() {
    return <>
        <directionalLight
            castShadow
            position={[1, 2, 3]}
            intensity={4.5}
            shadow-normalBias={0.04}

        />
        <ambientLight intensity={1.5} />
        <Laptop />
        <Environment
            files={[
                '/images/environments/2/px.jpg',
                '/images/environments/2/nx.jpg',
                '/images/environments/2/py.jpg',
                '/images/environments/2/ny.jpg',
                '/images/environments/2/pz.jpg',
                '/images/environments/2/nz.jpg',
            ]} />
        <color args={['#241a1a']} attach="background" />
    </>;
}

