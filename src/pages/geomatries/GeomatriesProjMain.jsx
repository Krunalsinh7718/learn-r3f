import { Canvas } from "@react-three/fiber";
import GeomatriesProjExperiance from "./GeomatriesProjExperiance";
import { OrbitControls } from "@react-three/drei";
import { Leva } from "leva";
import "./app-circular-slider-style.css"
import { createContext, useContext, useRef } from "react";

const SliderContext = createContext(null);

export default function GeomatriesProjMain() {
    const nextSlideRef = useRef(null);
    const prevSlideRef = useRef(null);

    const nextSliderOuter = (fn) => {
        nextSlideRef.current = fn;
    };
    const prevSliderOuter = (fn) => {
        prevSlideRef.current = fn;
    };

    const nextSlide = () => {
        nextSlideRef.current?.();
    };
    const prevSlide = () => {
        prevSlideRef.current?.();
    };


    return <>
        <Leva  />
        <SliderContext.Provider
            value={{
                nextSliderOuter,
                prevSliderOuter
            }}
        >
            <Canvas
                shadows
                className="r3f-camera"
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [0, 0.3, 8]

                }}
            >
                <OrbitControls />
                <GeomatriesProjExperiance />
            </Canvas>
        </SliderContext.Provider>
        <button className="app-circular-slider-nav app-circular-slider-nav-left" onClick={prevSlide} >
            &lt;
        </button>
        <button className="app-circular-slider-nav app-circular-slider-nav-right" onClick={nextSlide}>
            &gt;
        </button>
    </>
}

export const useSlider = () => {
    return useContext(SliderContext );
}