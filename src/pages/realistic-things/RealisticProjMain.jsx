import { Canvas } from "@react-three/fiber";
import RealisticProjExperience from "./RealisticProjExperience";
import { OrbitControls } from "@react-three/drei";
import { Leva } from "leva";
import "./app-circular-slider-style.css"
import { createContext, useContext, useRef } from "react";

const SliderContext = createContext(null);

export default function RealisticProjMain() {
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
        <Leva />
        <SliderContext.Provider
            value={{
                nextSliderOuter,
                prevSliderOuter
            }}
        >
            <Canvas
                shadows
                className="r3f-geomatries"
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [0, 0.3, 8]

                }}
            >
                <OrbitControls />
                <RealisticProjExperience />
            </Canvas>
        </SliderContext.Provider>
        <button className="app-circular-slider-nav app-circular-slider-nav-left" onClick={prevSlide} >
            <svg width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M90.5 19L43 66.5L90.5 114" stroke="white" />
            </svg>
        </button>
        <button className="app-circular-slider-nav app-circular-slider-nav-right" onClick={nextSlide}>
            <svg width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43 114L90.5 66.5L43 19" stroke="white" />
            </svg>
        </button>


    </>
}

export const useSlider = () => {
    return useContext(SliderContext);
}