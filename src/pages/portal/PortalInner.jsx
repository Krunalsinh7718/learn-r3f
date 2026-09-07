import * as THREE from 'three';
import { Center, OrbitControls, Sparkles, useGLTF, useTexture, shaderMaterial } from "@react-three/drei"
import portalVertexShader from "./shaders/vertex.vert"
import portalFragmentShader from "./shaders/fragment.frag"
import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useControls } from 'leva';

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color("red"),
        uColorEnd: new THREE.Color("blue")
    },
    portalVertexShader,
    portalFragmentShader
);

extend({ PortalMaterial });


export default function PortalInner() {

    const { nodes } = useGLTF("/models/portal/portal.glb");
    const texture = useTexture("/images/portal/baked.jpg")
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;

    const portalMaterialRef = useRef();

    useFrame((state, delta) => {
        portalMaterialRef.current.uniforms.uTime.value += delta;
        
    })
    const { background } = useControls('background', {
       background: "#414840"
   })

    const { portalColorStart, portalColorEnd } = useControls('portal', {
        portalColorStart: {
            value: "#eee",
            onChange: (value) => {
                portalMaterialRef.current.uniforms.uColorStart.value.set(value)
            },
        },
        portalColorEnd: {
            value: "#313f2c",
            onChange: (value) => {
                portalMaterialRef.current.uniforms.uColorEnd.value.set(value)
            },
        },
    })




    return <>
        <color args={[background]} attach="background"/>
        <OrbitControls />
        <group position-y={-1}>
            <mesh
                geometry={nodes.Cube037.geometry}
            >
                <meshBasicMaterial map={texture}></meshBasicMaterial>
            </mesh>
            <mesh
                geometry={nodes.lampLight1.geometry}
            >
                <meshBasicMaterial color="#eee" />
            </mesh>
            <mesh
                geometry={nodes.lampLight2.geometry}
            >
                <meshBasicMaterial color="#eee" />
            </mesh>
            <mesh
                geometry={nodes.portalLight.geometry}
            >
                <portalMaterial ref={portalMaterialRef} />
            </mesh>
        </group>   

        <Sparkles
            size={6}
            scale={[4, 2, 4]}
            speed={0.2}
            count={40}
        />

    </>
}