import { Center, ContactShadows, Float, Html, PresentationControls, Text, useAnimations, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useState } from "react";
import * as THREE from 'three';

export default function Laptop() {

    const [frameOpacity, setFrameOpacity] = useState(0);
    // console.log(setFrameOpacity);


    const model = useGLTF("/models/laptop/laptop.glb");
    const animations = useAnimations(model.animations, model.scene);

    const { animationName } = useControls("Animation", {
        animationName: {
            options: animations.names
        },

    })

    const { laptopRotationY } = useControls("Laptop", {
        laptopRotationY: {
            value: 0.22,
            min: -2,
            max: 2,
            step: 0.0001
        }
    })

    const {
        distanceFactor,
        positionX,
        positionY,
        positionZ,
        rotationX,
        rotationY,
        rotationZ
    } = useControls("Html Frame", {

        distanceFactor: {
            value: 9.99,
            min: -20,
            max: 20,
            step: 0.001
        },
        positionX: {
            value: 0.00,
            min: -40,
            max: 40,
            step: 0.001
        },
        positionY: {
            value: 12.7,
            min: -40,
            max: 40,
            step: 0.001
        },
        positionZ: {
            value: -16.52,
            min: -40,
            max: 40,
            step: 0.001
        },
        rotationX: {
            value: -0.35,
            min: -2,
            max: 2,
            step: 0.0001
        },

    })

    useEffect(() => {
        const action = animations.actions[animationName]
        action.setLoop(THREE.LoopOnce)
        action.play();

        return () => {
            action.fadeOut(1)
        }
    }, [animationName])

    useEffect(() => {
        setTimeout(function () {
            setFrameOpacity(1)
        }, 1000)
    }, [])


    return <>
        <PresentationControls
            global
            rotation={[0.13, 0.1, 0]}
            polar={[- 0.4, 0.2]}
            azimuth={[- 1, 0.75]}
            damping={0.1}
            snap
        >
            <Float rotationIntensity={0.4}>
                <primitive
                    object={model.scene}
                    scale={0.08}
                    rotation-y={laptopRotationY}
                    // rotation-x={-0.1}
                    position-y={-0.5}
                >
                    <Html
                        wrapperClass="html-frame"
                        transform
                        distanceFactor={distanceFactor}
                        position={[positionX, positionY, positionZ]}
                        rotation-x={rotationX}
                        occlude
                        style={{
                            transitionDuration: '1s',
                            opacity: frameOpacity
                        }}
                    >
                        <iframe
                            src="/html/purple_blue_portfolio.html"
                        />
                    </Html>
                </primitive>
                <rectAreaLight
                    width={2.5}
                    height={1.65}
                    intensity={40}
                    color={'#a1a1ff'}
                    rotation={[- 0.1, Math.PI, 0]}
                    position={[0, 0.55, - 1.15]}
                />
                <Text
                    font="/fonts/bangers-v20-latin-regular.woff"
                    fontSize={0.8}
                    position={[2, 0.6, 0.2]}
                    rotation-y={- 1.25}
                    maxWidth={2}
                    fillOpacity={frameOpacity}
                    transitionDuration={'3s'}
                    
                >KRUNALSINH VAGHELA
                <meshBasicMaterial toneMapped={false}/>
                </Text>
            </Float>
        </PresentationControls>
        <ContactShadows
            position-y={- 1.4}
            opacity={0.4}
            scale={5}
            blur={2.4}
        />

    </>
}