import { Environment, OrbitControls } from "@react-three/drei";
import Laptop from "./Laptop";

export default function Experience() {
    return <>
        
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
        <color args={['#836b6b']} attach="background" />
    </>;
}

