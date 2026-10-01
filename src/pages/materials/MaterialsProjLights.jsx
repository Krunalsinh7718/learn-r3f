import { useHelper } from "@react-three/drei";
import { useCreateStore, useControls, LevaPanel, folder } from 'leva'
import { useEffect, useRef } from "react"
import { SpotLightHelper } from 'three'
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";
import { Environment, OrbitControls } from "@react-three/drei";


export default function MaterialsProjLights() {

    const { bottomLight, environmentLight } = useControls("Light Settings", {
        bottomLight: true,
        environmentLight: true
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
                intensity={0.5}
            />
        }
        {
            environmentLight &&
            <Environment

                background={true}
                backgroundBlurriness={0.03}
                backgroundIntensity={2}
                environmentIntensity={1}
                files="/images/environments/the_sky_is_on_fire_2k.hdr"
            />
        }

    </>
}