import * as THREE from "three";
import { Text, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useContext, useEffect, useRef, useState } from "react";
import { useSlider } from "./GeomatriesProjMain";
import GeomatriesProGeoMesh from "./GeomatriesProGeoMesh";




const geometryList = [
    {
        type: "box",
        color: "#e57373",
        defaults: {
            width: 1,
            height: 1,
            depth: 1,
        },
    },
    {
        type: "capsule",
        color: "#64b5f6",
        defaults: {
            radius: 0.5,
            length: 1,
            capSegments: 4,
            radialSegments: 8,
        },
    },
    {
        type: "torus",
        color: "#81c784",
        defaults: {
            radius: 1,
            tube: 0.4,
            radialSegments: 16,
            tubularSegments: 32,
        },
    },
    {
        type: "cone",
        color: "#ba68c8",
        defaults: {
            radius: 1,
            height: 2,
            radialSegments: 16,
        },
    },
    {
        type: "cylinder",
        color: "#ffb74d",
        defaults: {
            radiusTop: 1,
            radiusBottom: 1,
            height: 2,
            radialSegments: 16,
        },
    },
    {
        type: "sphere",
        color: "#4db6ac",
        defaults: {
            radius: 1,
            widthSegments: 16,
            heightSegments: 16,
        },
    },
];


export default function GeomatriesProjGeoGroup() {

    const { nextSliderOuter, prevSliderOuter } = useSlider();

    const [activeIndex, setActiveIndex] = useState(0);
    const activeType = geometryList[activeIndex].type;

    const groupRef = useRef();
    const activeIndexRef = useRef(0);
    const targetRotation = useRef(0);

    const radius = 4;
    const count = geometryList.length;

    useFrame((_, delta) => {
        if (!groupRef.current) return;

        groupRef.current.rotation.y = THREE.MathUtils.damp(
            groupRef.current.rotation.y,
            targetRotation.current,
            5,
            delta
        );
    });

    const next = () => {
        const nextIndex =
            (activeIndexRef.current + 1) % count;
        activeIndexRef.current = nextIndex;

        targetRotation.current =
            -(nextIndex * Math.PI * 2) / count;
        setActiveIndex(nextIndex);

    };

    const previous = () => {
        const previousIndex =
            (activeIndexRef.current - 1 + count) % count;

        activeIndexRef.current = previousIndex;

        targetRotation.current =
            -(previousIndex * Math.PI * 2) / count;

        setActiveIndex(previousIndex);
    };

    useEffect(() => {
        prevSliderOuter(previous);
        nextSliderOuter(next);
    }, []);


    const boxControls = useControls("Box", {
        width: {
            value: 1,
            min: 0.1,
            max: 5,
            step: 0.1,
            render: () => activeType === "box",
        },

        height: {
            value: 1,
            min: 0.1,
            max: 5,
            step: 0.1,
            render: () => activeType === "box",
        },

        depth: {
            value: 1,
            min: 0.1,
            max: 5,
            step: 0.1,
            render: () => activeType === "box",
        },
    }, [activeType]);
    const capsuleControls = useControls("Capsule", {
        radius: {
            value: 0.5,
            min: 0.1,
            max: 3,
            step: 0.1,
            render: () => activeType === "capsule",
        },

        length: {
            value: 1,
            min: 0.1,
            max: 5,
            step: 0.1,
            render: () => activeType === "capsule",
        },

        capSegments: {
            value: 4,
            min: 1,
            max: 32,
            step: 1,
            render: () => activeType === "capsule",
        },

        radialSegments: {
            value: 8,
            min: 3,
            max: 64,
            step: 1,
            render: () => activeType === "capsule",
        },
    }, [activeType]);

    const controlsByType = {
        box: boxControls,
        capsule: capsuleControls,
    };



    return (
        <>
            <group ref={groupRef}>
                {geometryList.map((geometry, index) => {
                    const angle =
                        Math.PI / 2 -
                        (index / count) * Math.PI * 2;

                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;

                    return (
                        <GeomatriesProGeoMesh
                            key={geometry.type}
                            geometry={geometry}
                            position={[x, 0, z]}
                            active={index === activeIndex}
                            controls={controlsByType[geometry.type]}
                        />

                    );
                })}
            </group>
            {/* <Text
                fontSize={3}
                position={[0, 2, 0]}
            >{activeIndex}</Text> */}

            <Text
                fontSize={1}
                position={[0, 2, 0]}
                color={"red"}
            >{geometryList[activeIndex].type}</Text>

        </>
    );
}