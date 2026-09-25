import { Environment, OrbitControls } from "@react-three/drei";
import Laptop from "./Laptop";
import Laptop1 from "./Laptop1";
import { useControls } from "leva";
import BgElements from "./BgElements";
import { useRef } from "react";
import { EffectComposer, ToneMapping, Bloom } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import { HalfFloatType } from "three";
import { BlendFunction, Effect } from "postprocessing";


import Logos from "./Logos";
import CornerPattern from "./CornerPattern";
import ModelLoader from "./ModelLoader";


export default function Experience() {
    const { backgroundColor } = useControls({
        backgroundColor: {
            value: '#3a1d83'
        }
    })

    const patternRef = useRef();

    const {toneMappingMode} = useControls('Tone Mapping', {
        toneMappingMode : {
            value: ToneMappingMode.LINEAR,
            options: ToneMappingMode
        }
    })

    const cornerPatternProps = useControls('Corner Pattern', {
        patternEnable:{
            value: true
        },
        frequency: {
            value: 10.19,
            min: 0,
            max: 20,
            step: 0.01
        },
        amplitude: {
            value: 0.14,
            min: 0.01,
            max: 0.5,
            step: 0.001
        },
        gridSize: {
            value: 69,
            min: 40,
            max: 150,
            step: 1
        },
        blendFunction: {
            value: BlendFunction.AVERAGE,
            options: BlendFunction
        },
        color1: {
            value: '#8701fa',
            render: (value) => value,
            color: { rgb: true }
        },
        color2: {
            value: '#b75ae9',
            render: (value) => value,
            color: { rgb: true }
        },
        dotRadius: {
            value: 0.28,
            min: 0.1,
            max: 0.4,
            step: 0.01
        },
    })

    const { bloomIntensity, luminanceThreshold, bloomEnable } = useControls("Glow", {
        bloomEnable: {
            value: true
        },
        bloomIntensity: {
            value: 1.9,
            min: 0,
            max: 5,
            step: 0.1
        },
        luminanceThreshold: {
            value: 0.4,
            min: 0,
            max: 5,
            step: 0.1
        },
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
        <Laptop />
        <Logos />
        <BgElements />
        <EffectComposer resolutionScale={0.75}>
            <ToneMapping mode={toneMappingMode} />
            {
                cornerPatternProps.patternEnable && 
                <CornerPattern ref={patternRef} {...cornerPatternProps} />
            }
            {bloomEnable &&
                <Bloom

                    luminanceThreshold={bloomIntensity}
                    mipmapBlur
                    intensity={luminanceThreshold}
                />
            }
        </EffectComposer>
        
    </>;
}

