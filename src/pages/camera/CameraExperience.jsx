import { useFrame } from "@react-three/fiber";
import { useControls } from "leva"
import { useRef } from "react";
import * as THREE from 'three';

export default function CameraExperience() {
    const { backgroundColor } = useControls("Background", {
        backgroundColor: '#94abc0'
    })

    const { cameraAnimation } = useControls("Camera Animation", {
        cameraAnimation: {
            value: 'animation0',
            options: ['animation0', 'animation1', 'animation2']
        }
    })

    const torus = useRef();

    useFrame((state, delta) => {
        if (cameraAnimation === 'animation1') {
            state.camera.position.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 10;
            state.camera.position.z = Math.cos(state.clock.getElapsedTime() * 0.5) * 10;
            state.camera.lookAt(torus.current.position)
        }
        if (cameraAnimation === 'animation2') {
           
            state.camera.position.z = (Math.abs(Math.cos(state.clock.getElapsedTime() * 0.5)) + 0.5) * 10;
            state.camera.fov = Math.abs(Math.sin(state.clock.getElapsedTime() * 0.5)) * 75;
            state.camera.lookAt(new THREE.Vector3(0,0,0))
            // console.log(state.camera.position.z, state.camera.fov);
            
        }

    })

    return <>
        <mesh position={[0, -1, 0]} rotation-x={Math.PI * -0.5}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="beige" metalness={1} />
        </mesh>
        <mesh position={[-2, -0.2, 2]}>
            <boxGeometry />
            <meshStandardMaterial color="darkblue" roughness={0.8} />
        </mesh>
        <mesh>
            <sphereGeometry />
            <meshStandardMaterial color="darkgreen" />
        </mesh>
        <mesh ref={torus} position={[2, -0.1, -2]} rotation={[1, 1, 1]} scale={0.65}>
            <torusGeometry />
            <meshStandardMaterial color="darkmagenta" />
        </mesh>
        <mesh position={[2, -0.1, 2]} rotation={[-1, -1, -1]} scale={0.65}>
            <torusKnotGeometry />
            <meshStandardMaterial color="firebrick" />
        </mesh>
        <ambientLight intensity={1} color="#fff" />
        <directionalLight position={[0, 2, 0]} intensity={10} />
        <color args={[backgroundColor]} attach="background" />
    </>
}