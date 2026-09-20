import { Environment, OrbitControls } from "@react-three/drei";
import Laptop from "./Laptop";
import Laptop1 from "./Laptop1";
import { useControls } from "leva";
import BgElements from "./BgElements";
import CornerPattern from "./CornerPattern";
import { useRef } from "react";
import { 
    ToneMappingMode,
    BlendFunction,
    GlitchMode
} from "postprocessing";
import { 
    EffectComposer, 
    ToneMapping,
    Vignette,
    Glitch,
    Noise,
    Bloom,
    DepthOfField
} from "@react-three/postprocessing";
import TestEffect from "./TestEffect";


export default function Experience() {
    const {backgroundColor} = useControls({
        backgroundColor : {
            value: '#4f3493'
        }
    })

    const patternRef = useRef();

     const {blandFunction} = useControls("Bland Function",{
        blandFunction : {
            value : BlendFunction.SET,
            options : BlendFunction
        }
    })


    return <>
        
        <color args={[backgroundColor]} attach="background" />
        <ambientLight intensity={1.5} />
        <Environment
            files={[
                '/images/environments/2/px.jpg',
                '/images/environments/2/nx.jpg',
                '/images/environments/2/py.jpg',
                '/images/environments/2/ny.jpg',
                '/images/environments/2/pz.jpg',
                '/images/environments/2/nz.jpg',
            ]} />
            {/* <Laptop />
            <BgElements /> */}

            <TestEffect />
       
        
    </>;
}

