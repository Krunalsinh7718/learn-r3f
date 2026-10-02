import { useHelper } from "@react-three/drei";
import { useCreateStore, useControls, LevaPanel, folder } from 'leva'
import { useEffect, useRef } from "react"
import { SpotLightHelper } from 'three'
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";
import { Environment, OrbitControls } from "@react-three/drei";


export default function MaterialsProjLights() {

    const { bottomLight, bottomLightIntensity, environmentLight, environmentIntensity } = useControls("Light Settings", {
        bottomLight: true,
        bottomLightIntensity : {
            value: 0.5,
            min: 0,
            max: 3,
            step: 0.001
        },
        environmentLight: true,
        environmentIntensity : {
            value: 1,
            min: 0,
            max: 3,
            step: 0.001
        }
    })

    return <>

        <ambientLight intensity={0.5} />
        {
            bottomLight &&
            <rectAreaLight
                rotation-x={Math.PI * 0.5}
                position={[0, -0.99, 4]}
                width={2.5}
                height={2.5}
                intensity={bottomLightIntensity}
            />
        }
        {
            environmentLight &&
            <Environment

                background={true}
                backgroundBlurriness={0.03}
                backgroundIntensity={environmentIntensity}
                environmentIntensity={environmentIntensity}
                files="/images/environments/the_sky_is_on_fire_2k.hdr"
            />
        }

    </>
}