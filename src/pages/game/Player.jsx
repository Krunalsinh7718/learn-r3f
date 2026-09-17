import { useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Player() {

    const [ subscribeKeys, getKeys ] = useKeyboardControls();
    

    return <RigidBody
        colliders="ball"
        restitution={0.2}
        friction={1}
        position={[0, 1, 0]}
        canSleep={false}
    >
        <mesh castShadow >
            <icosahedronGeometry args={[0.3, 1]} />
            <meshStandardMaterial color="mediumpurple" flatShading />
        </mesh>
    </RigidBody>
}