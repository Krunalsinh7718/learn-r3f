import { meshBounds, OrbitControls } from "@react-three/drei";
import { useRef } from "react";

export default function EventsInner() {

    const boxRef = useRef();
    const eventHandler = (event) => {
        boxRef.current.material.color.set(`hsl(${Math.floor(Math.random() * 360)},50%, 50%)`)
        event.stopPropagation();

        console.log('---')
        console.log('distance', event.distance) // Distance between camera and hit point
        console.log('point', event.point) // Hit point coordinates (in 3D)
        console.log('uv', event.uv) // UV coordinates on the geometry (in 2D)
        console.log('object', event.object) // The object that triggered the event
        console.log('eventObject', event.eventObject) // The object that was listening to the event (useful where there is objects in objects)

        console.log('---')
        console.log('x', event.x) // 2D screen coordinates of the pointer
        console.log('y', event.y) // 2D screen coordinates of the pointer

        console.log('---')
        console.log('shiftKey', event.shiftKey) // If the SHIFT key was pressed
        console.log('ctrlKey', event.ctrlKey) // If the CTRL key was pressed
        console.log('metaKey', event.metaKey) // If the COMMAND key was pressed
    }
    return <>
        <OrbitControls />
    
        <mesh  raycast={ meshBounds } onClick={eventHandler} ref={boxRef}>
            <boxGeometry />
            <meshBasicMaterial color="red" />
        </mesh>

        <mesh position-x="-2" scale={0.6} onClick={ (event) => event.stopPropagation() }>
            <sphereGeometry />
            <meshBasicMaterial color="green" />
        </mesh>

        <mesh position-x="2" scale={0.4} onClick={ (event) => event.stopPropagation() }>
            <torusKnotGeometry />
            <meshBasicMaterial color="blue" />
        </mesh>
    </>
}