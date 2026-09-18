import { Float, Text, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' });

function BlockStart({ position = [0, 0, 0] }) {
    return <>
        <group position={position}>
            <Float floatIntensity={0.25} rotationIntensity={0.25}>
                <Text
                    font="/fonts/bebas-neue-v9-latin-regular.woff"
                    fontSize={0.4}
                    lineHeight={0.75}
                    position={[0.75, 0.65, 0]}
                    rotation-y={- 0.25}
                    maxWidth={1.5}
                    textAlign='right'
                >
                    Marble Race
                    <meshBasicMaterial toneMapped={false}/>
                </Text>
            </Float>
            <mesh
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
                geometry={boxGeometry}
                material={floor1Material}
            />
        </group>
    </>
}

function BlockEnd({ position = [0, 0, 0] }) {
    const hamburger = useGLTF('/models/hamburger/hamburger.glb');
    hamburger.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })
    return <>
        <group position={position}>
            <Text
                    font="/fonts/bebas-neue-v9-latin-regular.woff"
                    fontSize={0.4}
                    lineHeight={0.75}
                    position={[0, 1.5, 2]}
                    maxWidth={1.5}
                    textAlign='right'
                >
                   FINISH
                    <meshBasicMaterial toneMapped={false}/>
                </Text>
            <mesh
                position={[0, 0, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
                geometry={boxGeometry}
                material={floor1Material}
            />
            <RigidBody type="fixed" colliders="hull" restitution={0.2} friction={0} position={[0, 0.25, 0]}>
                <primitive object={hamburger.scene} scale={0.2} />
            </RigidBody>
        </group>
    </>
}

function BlockSpinner({ position = [0, 0, 0] }) {
    const obstacle = useRef();
    const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1));

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();

        const rotation = new THREE.Quaternion();
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
        obstacle.current.setNextKinematicRotation(rotation)
    })

    return <>
        <group position={position}>
            <mesh
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
                geometry={boxGeometry}
                material={floor2Material}
            />
            <RigidBody
                type='kinematicPosition'
                position={[0, 0.25, 0]}
                restitution={0.2}
                friction={0}
                ref={obstacle}
            >
                <mesh
                    scale={[3.5, 0.3, 0.3]}
                    castShadow
                    receiveShadow
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                />
            </RigidBody>
        </group>
    </>
}

function BlockLimbo({ position = [0, 0, 0] }) {
    const obstacle = useRef();
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        const translationY = Math.sin(time + timeOffset) + 1.2;
        obstacle.current.setNextKinematicTranslation({ x: position[0], y: position[1] + translationY, z: position[2] })
    })

    return <>
        <group position={position}>
            <mesh
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
                geometry={boxGeometry}
                material={floor2Material}
            />
            <RigidBody
                type='kinematicPosition'
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}
                ref={obstacle}
            >
                <mesh

                    scale={[3.5, 0.3, 0.3]}
                    castShadow
                    receiveShadow
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                />
            </RigidBody>
        </group>
    </>
}

function BlockAxe({ position = [0, 0, 0] }) {
    const obstacle = useRef();
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        const translationX = Math.sin(time + timeOffset) * 1.25;
        obstacle.current.setNextKinematicTranslation({ x: position[0] + translationX, y: position[1] + 0.75, z: position[2] })
    })

    return <>
        <group position={position}>
            <mesh
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
                geometry={boxGeometry}
                material={floor2Material}
            />
            <RigidBody
                type='kinematicPosition'
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}
                ref={obstacle}
            >
                <mesh
                    scale={[1.5, 1.5, 0.3]}
                    castShadow
                    receiveShadow
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                />
            </RigidBody>
        </group>
    </>
}

function Bounds({ length = 1 }) {
    return <>
        <RigidBody type="fixed" restitution={0.2} friction={0}>
            <mesh
                position={[2.15, 0.75, -(length * 2) + 2]}
                scale={[0.3, 1.5, 4 * length]}
                geometry={boxGeometry}
                material={wallMaterial}
                castShadow
            />
            <mesh
                position={[-2.15, 0.75, -(length * 2) + 2]}
                scale={[0.3, 1.5, 4 * length]}
                geometry={boxGeometry}
                material={wallMaterial}
                receiveShadow
            />
            <mesh
                position={[0, 0.75, -(length * 4) + 2]}
                scale={[4, 1.5, 0.3]}
                geometry={boxGeometry}
                material={wallMaterial}
                receiveShadow
            />
            <CuboidCollider
                position={[0, -0.1, -(length * 2) + 2]}
                args={[2, 0.1, length * 2]}
                restitution={0.2}
                friction={1}
            />
        </RigidBody>
    </>
}
function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

export default function GameLevel({
    blocksCount = 5,
    blocksType = [BlockSpinner, BlockAxe, BlockLimbo],
    seed = 0
}) {

    const blocks = useMemo(() => {

        const blocks = [];

        for (let i = 0; i < blocksCount; i++) {
            const random = seededRandom(seed + i);
            const type = blocksType[Math.floor(random * blocksType.length)];
            blocks.push(type);
        }
        return blocks;
    }, [blocksCount, blocksType, seed])

    return <>
        <BlockStart position={[0, 0, 0]} />
        {blocks.map((Block, index) => <Block key={index} position={[0, 0, (index + 1) * -4]} />)}
        <BlockEnd position={[0, 0, (blocksCount + 1) * -4]} />
        <Bounds length={blocksCount + 2} />

    </>
}

export { BlockSpinner, BlockLimbo, BlockAxe }