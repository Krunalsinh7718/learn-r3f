import * as THREE from 'three';
import { Center, OrbitControls, Text3D, useMatcapTexture, useTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from '@react-three/fiber';

export default function InnerText3DLearn() {
    // const [ torusGeometry, setTorusGeometry ] = useState();
    // const [ torusMaterial, setTorusMaterial ] = useState();

    const donutsGroup = useRef();

    const matCapTexture = useTexture("/images/matcaps/thuglee-03.jpg");
    const torusGeometry = new THREE.TorusGeometry();
    const torusMaterial = new THREE.MeshMatcapMaterial();

    const donutArr = useRef([]);

    useEffect(() => {
        torusMaterial.matcap = matCapTexture;
        torusMaterial.needsUpdate = true;

        matCapTexture.colorSpace = THREE.SRGBColorSpace;
        matCapTexture.needsUpdate = true;
    }, [])

    useFrame((state, delta) => {
        for (const child of donutArr.current) {
            child.rotation.y += delta * 0.2 * Math.sin(child.position.x);
        }
    })

    return <>
        <OrbitControls />
        <Center>
            <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                Hello R3F
                <meshMatcapMaterial matcap={matCapTexture} />
            </Text3D>
        </Center>
        {
            [...Array(100)].map((e, index) =>
                <mesh
                    key={index}
                    geometry={torusGeometry}
                    material={torusMaterial}
                    position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10
                    ]}
                    scale={0.2 + Math.random() * 0.2}
                    rotation={[
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0
                    ]}
                    ref={(element) => donutArr.current[index] = element}
                >
                    
                </mesh>
            )
        }
    </>
}