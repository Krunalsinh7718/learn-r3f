import { useHelper } from "@react-three/drei";
import { useCreateStore, useControls, LevaPanel } from 'leva'
import { useEffect, useRef } from "react"
import { SpotLightHelper } from 'three'

export default function GeomatriesProjLights() {
    const lightStore = useCreateStore();

    const spotLightRef = useRef(null);
    useHelper(spotLightRef, SpotLightHelper, 'cyan');
    const { angle, positionX, positionY, positionZ, targetX, targetY, targetZ } = useControls( {
        angle: {
            value: 0.11,
            min: -3.14,
            max: 3.14,
            step: 0.001
        },
        positionX: {
            value: 0,
            min: -50,
            max: 50,
            step: 0.1
        },
        positionY: {
            value: 9.3,
            min: -50,
            max: 50,
            step: 0.1
        },
        positionZ: {
            value: 1.8,
            min: -50,
            max: 50,
            step: 0.1
        },
        targetX: {
            value: 0,
            min: -50,
            max: 50,
            step: 0.1
        },
        targetY: {
            value: 0,
            min: -50,
            max: 50,
            step: 0.1
        },
        targetZ: {
            value: 3.5,
            min: -50,
            max: 50,
            step: 0.1
        },
        intensity: {
            value: 300,
            min: 0,
            max: 1000,
            step: 1
        },


    },{ store: lightStore })

    useEffect(() => {
        spotLightRef.current.target.position.set(targetX, targetY, targetZ)
        spotLightRef.current.target.updateMatrixWorld();
    }, [targetX, targetY, targetZ])
    return <>
        <spotLight
            ref={spotLightRef}
            angle={angle}
            intensity={300}
            castShadow
            position={[positionX, positionY, positionZ]}
            attenuation={5}
            anglePower={5}
        />
        <ambientLight intensity={0.5} />
    </>
}