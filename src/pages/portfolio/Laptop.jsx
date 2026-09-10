import { Center, Float, PresentationControls, useAnimations, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";

export default function Laptop() {
    const model = useGLTF("/models/laptop/laptop.glb");
    const animations = useAnimations(model.animations, model.scene);

    const { animationName } = useControls({
        animationName: {
            options: animations.names
        }
    })

    useEffect(() => {
        const action = animations.actions[animationName]

        action.play();

        return () => {
            action.fadeOut(1)

        }
    }, [animationName])


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
                    scale={0.13}
                    rotation-y={0.7}
                    rotation-x={-0.1}
                    position-y={-1.2}
                />
            </Float>
        </PresentationControls>

    </>
}