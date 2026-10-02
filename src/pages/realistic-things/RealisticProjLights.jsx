import { useHelper, Environment } from "@react-three/drei";
import { useCreateStore, useControls, LevaPanel, folder } from 'leva'
import { useEffect, useRef } from "react"
import { SpotLightHelper } from 'three'
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";


export default function RealisticProjLights() {
    const spotLightRef = useRef(null);
    // useHelper(spotLightRef, SpotLightHelper, 'cyan');
    const rectLightRef = useRef(null);
    // useHelper(rectLightRef, RectAreaLightHelper, 'cyan');
    const { angle, positionX, positionY, positionZ, targetX, targetY, targetZ } = useControls({
        spotLight: folder({

            angle: {
                value: 0.31,
                min: -3.14,
                max: 3.14,
                step: 0.0001
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
                value: -0.3,
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
        }, {
            render: () => true
        })

    })

    // useEffect(() => {
    //     spotLightRef.current.target.position.set(targetX, targetY, targetZ)
    //     spotLightRef.current.target.updateMatrixWorld();
    // }, [targetX, targetY, targetZ])
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

        <rectAreaLight
            ref={rectLightRef}
            rotation-x={Math.PI * 0.5}

            position={[0, -0.99, 4]}
            width={2.5}
            height={2.5}

        />
        <Environment

            background={true}
            backgroundBlurriness={0.03}
            backgroundIntensity={3}
            environmentIntensity={3}
            files="/images/environments/the_sky_is_on_fire_2k.hdr"
        />

    </>
}