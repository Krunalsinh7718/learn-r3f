import { Float, Image } from "@react-three/drei"
import { useControls } from "leva"

export default function Logos(){
    // const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ, scale} = useControls("logo",{
    //     positionX : {
    //         value: 1,
    //         min: -5,
    //         max: 5,
    //         step: 0.01
    //     }, 
    //     positionY: {
    //         value: 1,
    //         min: -5,
    //         max: 5,
    //         step: 0.01
    //     }, 
    //     positionZ: {
    //         value: 1,
    //         min: -5,
    //         max: 5,
    //         step: 0.01
    //     }, 
    //     rotationX: {
    //         value: 1,
    //         min: -3.14,
    //         max: 3.14,
    //         step: 0.01
    //     }, 
    //     rotationY:{
    //         value: 1,
    //         min: -3.14,
    //         max: 3.14,
    //         step: 0.01
    //     }, 
    //     rotationZ:{
    //         value: 1,
    //         min: -3.14,
    //         max: 3.14,
    //         step: 0.01
    //     },
    //     scale:{
    //         value: 0.5,
    //         min: 0.1,
    //         max: 2,
    //         step: 0.01
    //     }
    // })
        return <>
            <Float
                speed={1.5}
                rotationIntensity={0.5}
                floatIntensity={0.8}
            >
                <Image
                    url="/images/logos/react.png"
                    position={[-2.99,0.7,1.00]}
                    scale={0.2}
                    rotation={[-0.25,-0.41,0.51]}
                    transparent={true}
                />
            </Float>

            <Float
                speed={1.5}
                rotationIntensity={0.3}
                floatIntensity={0.4}
            >
                <Image
                    url="/images/logos/css3.png"
                    position={[-2.68,-0.2,1.00]}
                    scale={0.2}
                    rotation={[-0.25,-0.41,-0.6]}
                    transparent={true}
                />
            </Float>

            <Float
                speed={1.2}
                rotationIntensity={0.4}
                floatIntensity={1.2}
            >
                <Image
                    url="/images/logos/html5.png"
                    position={[-2.77,1.28,1.00]}
                    scale={0.20}
                    rotation={[0.04,-0.23,-0.43]}
                    transparent={true}
                />
            </Float>

            <Float
                speed={1.7}
                rotationIntensity={0.6}
                floatIntensity={0.6}
            >
                <Image
                    url="/images/logos/javascript.png"
                    position={[1.18, 1.6, 1.19]}
                    scale={0.30}
                    rotation={[.63, -1.05, 0.98]}
                    transparent={true}
                />
            </Float>

            <Float
                speed={1.3}
                rotationIntensity={0.5}
                floatIntensity={1}
            >
                <Image
                    url="/images/logos/blender.png"
                    position={[1.8, -0.38, 1.85]}
                    scale={0.44}
                    rotation={[-0.90, -1.02, -1.18]}
                    transparent={true}
                />
            </Float>

            <Float
                speed={1.3}
                rotationIntensity={0.5}
                floatIntensity={1}
            >
                <Image
                    url="/images/logos/threejs.png"
                    // position={[-0.02, -0.57, 1.92]}
                    position={[5.00, 0.16, 1.53]}
                    scale={0.56}
                    rotation={[-0.77, -1.13, 2.21]}
                    transparent={true}
                    
                />
            </Float>


        </>
}