import { Environment, OrbitControls } from "@react-three/drei";
import Laptop from "./Laptop";
import Laptop1 from "./Laptop1";
import { useControls } from "leva";
import BgElements from "./BgElements";

export default function Experience() {
    const {backgroundColor} = useControls({
        backgroundColor : {
            value: '#4f3493'
        }
    })
    return <>
        
        <ambientLight intensity={1.5} />
        <BgElements />
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
        <color args={[backgroundColor]} attach="background" />
    </>;
}

