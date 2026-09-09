import { OrbitControls } from "@react-three/drei";
import { 
    EffectComposer, 
    ToneMapping,
    Vignette,
    Glitch,
    Noise,
    Bloom,
    DepthOfField
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { 
    ToneMappingMode,
    BlendFunction,
    GlitchMode
} from "postprocessing";
import Drunk from "./Drunk";
import { useEffect, useRef } from "react";

// console.log(GlitchMode);



export default function Experiance() {

    const {toneMapingMode} = useControls("Tone Maping Mode",{
        toneMapingMode : {
            value : ToneMappingMode.ACES_FILMIC,
            options : ToneMappingMode
        }
    })

    const {blandFunction} = useControls("Bland Function",{
        blandFunction : {
            value : BlendFunction.COLOR_BURN,
            options : BlendFunction
        }
    })

    const {noiseBlandFunction} = useControls("Noise Bland Function",{
        noiseBlandFunction : {
            value : BlendFunction.SOFT_LIGHT,
            options : BlendFunction
        }
    })


    const {glitchMode} = useControls("Bland Function",{
        glitchMode : {
            value : GlitchMode.CONSTANT_MILD,
            options : GlitchMode
        }
    })

    const {bloomIntensity, luminanceThreshold} = useControls("Bloom",{
        bloomIntensity : {
            value : 1.9,
            min: 0,
            max: 5,
            step: 0.1
        },
        luminanceThreshold : {
            value : 1.1,
            min: 0,
            max: 5,
            step: 0.1
        },
    })
    const {colorR, colorG, colorB} = useControls("Bloom Color Channels",{
        colorR : {
            value : 4,
            min: 0,
            max: 10,
            step: 0.1
        },
        colorG : {
            value : 0.5,
            min: 0,
            max: 10,
            step: 0.1
        },
        colorB : {
            value : 0.1,
            min: 0,
            max: 10,
            step: 0.1
        }
    })


    const {focusDistance, focalLength, bokehScale} = useControls("Depth of field",{
        focusDistance : {
            value : 0,
            min: 0,
            max: 1,
            step: 0.001
        },
        focalLength : {
            value : 0.07,
            min: 0,
            max: 1,
            step: 0.001
        },
        bokehScale : {
            value : 6,
            min: 0,
            max: 10,
            step: 0.1
        }
    })

    const drunkRef = useRef();

    useEffect(() => {
        console.log(drunkRef.current);
    },[])

    const drunkProps = useControls("Drunk Effect",{
        frequency : {
            value : 16.4,
            min: 0,
            max: 20,
            step: 0.1
        },
        amplitude : {
            value : 0.02,
            min: 0,
            max: 1,
            step: 0.001
        },
       
    })


    return <>
        <color args={["#000"]} attach="background" />
        <OrbitControls />
        <directionalLight
            position={[1, 2, 3]}
            intensity={4.5}
        />
        <mesh>
            <boxGeometry />
            {/* <meshBasicMaterial 
                color={ [ colorR, colorG, colorB ] } 
                // color="#0ff"
                // emissive="orange"
                // emissiveIntensity={ 2 }
            /> */}
            <meshStandardMaterial color="#e44720"/>
        </mesh>

        <mesh position-x="-4" scale={0.6} >
            <sphereGeometry />
            <meshStandardMaterial color="#2a9d8f"/>
        </mesh>

        <mesh position-x="4" scale={0.4} >
            <torusKnotGeometry />
            <meshStandardMaterial color="#aee96a"/>
        </mesh>
        <mesh position-y="-1" scale={10} rotation-x={- Math.PI * 0.5} >
            <planeGeometry />
            <meshStandardMaterial color="#e76f51"/>
        </mesh>
        <EffectComposer >
             {/* <Vignette 
                offset={ 0.3 }
                darkness={ 0.9 }
                blendFunction={ blandFunction }
             />
             <Glitch 
                delay={ [ 0.5, 1 ] }
                duration={ [ 0.1, 0.3 ] }
                strength={ [ 0.2, 0.4 ] }
                mode={ glitchMode }
             />
             <Noise blendFunction={noiseBlandFunction}/>
             <Bloom 
                luminanceThreshold={ luminanceThreshold } 
                mipmapBlur 
                intensity={ bloomIntensity }
            />
            <DepthOfField 
                focusDistance={ focusDistance }
                focalLength={ focalLength }
                bokehScale={ bokehScale }
            /> */}
            <Drunk 
                ref={ drunkRef }
                {...drunkProps}
                blendFunction={ blandFunction }
              
            />
            <ToneMapping mode={toneMapingMode}/>
        </EffectComposer>
    </>
}
