import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

export default function Player() {

    const body = useRef();
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const { rapier, world } = useRapier();
    const [smoothCameraPosition] = useState(() => new THREE.Vector3(10,10,10));
    const [smoothCameraTarget] = useState(() => new THREE.Vector3());

    // console.log(world);

    const jump = () => {
        const origin = body.current.translation();
        origin.y -= 0.31;
        const direction = { x: 0, y: -1, z: 0 };
        const ray = new rapier.Ray(origin, direction);
        const hit = world.castRay(ray, 10, true);

        if (hit.timeOfImpact < 0.1) {
            body.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
        }
    }

    useEffect(e => {
        const unsubscribe = subscribeKeys(
            (state) => state.jump,
            (value) => {
                if (value) {
                    jump()
                }

            })

        return () => unsubscribe()
    }, [])

    useFrame((state, delta) => {
        const { backward, forward, leftward, rightward, jump } = getKeys();
        // console.log("backward 👇: "+ backward," forward 👆: "+ forward," leftward 👈: "+ leftward," rightward 👉: "+ rightward," jump ✊: "+ jump);

        const impulseStrenth = 0.6 * delta;
        const torqueStrenth = 0.2 * delta;

        const impulse = { x: 0, y: 0, z: 0 };
        const torque = { x: 0, y: 0, z: 0 };

        if (forward) {
            impulse.z -= impulseStrenth;
            torque.x -= torqueStrenth;
        }
        if (rightward) {
            impulse.x += impulseStrenth;
            torque.z -= torqueStrenth;
        }
        if (backward) {
            impulse.z += impulseStrenth;
            torque.x += torqueStrenth;
        }
        if (leftward) {
            impulse.x -= impulseStrenth;
            torque.z += torqueStrenth;
        }

        body.current.applyImpulse(impulse);
        body.current.applyTorqueImpulse(torque);

        /**
         * Camera
         */
        const bodyPosition = body.current.translation();

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition);
        cameraPosition.z += 2.25;
        cameraPosition.y += 0.65;

        const cameraTarget = new THREE.Vector3();
        cameraTarget.copy(bodyPosition);
        cameraTarget.y += 0.25;

        smoothCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothCameraPosition)
        state.camera.lookAt(smoothCameraTarget)
    })


    return <RigidBody
        ref={body}
        colliders="ball"
        restitution={0.2}
        friction={1}
        position={[0, 1, 0]}
        canSleep={false}
        linearDamping={0.5}
        angularDamping={0.5}
    >
        <mesh castShadow >
            <icosahedronGeometry args={[0.3, 1]} />
            <meshStandardMaterial color="mediumpurple" flatShading />
        </mesh>
    </RigidBody>
}