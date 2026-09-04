import { useAnimations, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";

export default function Fox() {
    const model = useGLTF("/models/Fox/Fox.gltf");
    const animations = useAnimations(model.animations, model.scene);
    console.log("animations", animations);
    
    
    const {animationName} = useControls({
        animationName : {
            options: animations.names
        }
    })
    
    useEffect(() => {
        const action = animations.actions[animationName]
        action
        .reset()
        .fadeIn(0.5)
        .play()

        return () => {
            action.fadeOut(0.5)
            
        }
    },[animationName])
    

    return <>
        <primitive
            object={model.scene}
            scale={0.02}
            position={[- 2.5, 0, 2.5]}
            rotation-y={0.3}
        />
    </>
}