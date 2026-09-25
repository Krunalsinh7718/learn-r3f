import { Canvas, useThree } from "@react-three/fiber";
import CameraExperience from "./CameraExperience";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";

function CameraController({far, fov, near, positionX, positionY, positionZ, rotationX, rotationY, rotationZ}){
    const {camera} = useThree();

    useEffect(() => {
        camera.fov = fov;
        camera.near = near;
        camera.far = far;
        camera.position.set(positionX, positionY, positionZ);
        camera.rotation.set(rotationX, rotationY, rotationZ);

        camera.updateProjectionMatrix();

    },[far, fov, near, positionX, positionY, positionZ, rotationX, rotationY, rotationZ])

    return null;

}

export default function CameraMain() {
    const cameraProps = useControls("camera", {
        fov: {
            value: 45,
            min: 25,
            max: 100,
            step: 0.5
        },
        near: {
            value: 0.1,
            min: 0,
            max: 20,
            step: 0.1
        },
        far: {
            value: 2000,
            min: 0,
            max: 2500,
            step: 1
        },
        positionX: {
            value: 0,
            min: -10,
            max: 10,
            step: 1
        }, 
        positionY: {
            value: 0,
            min: -10,
            max: 10,
            step: 1
        }, 
        positionZ: {
            value: 8,
            min: -10,
            max: 10,
            step: 1
        }, 
        rotationX: {
            value: 0,
            min: -6.28,
            max: 6.28,
            step: 0.1
        }, 
         rotationY: {
            value: 0,
            min: -6.28,
            max: 6.28,
            step: 0.1
        }, 
         rotationZ: {
            value: 0,
            min: -6.28,
            max: 6.28,
            step: 0.1
        },   
    })

    

    return <>
        <Canvas
            className="r3f-camera"
            // camera={{
            //     fov,
            //     near,
            //     far,
            //     position: [positionX, positionY, positionZ]
            // }}
        >
            {/* <OrbitControls /> */}
            <CameraExperience />
            <CameraController {...cameraProps} />
        </Canvas>
    </>
}