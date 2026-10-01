import * as THREE from "three";
import { Text, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useContext, useEffect, useRef, useState } from "react";
import { useSlider } from "./MaterialsProjMain";
import MaterialsProGeoMesh from "./MaterialsProGeoMesh";

const materialList = [
    {
        type: "basic",
        label: "MeshBasicMaterial",
    },
    {
        type: "standard",
        label: "MeshStandardMaterial",
    },
    {
        type: "physical",
        label: "MeshPhysicalMaterial",
    },
    {
        type: "lambert",
        label: "MeshLambertMaterial",
    },
    {
        type: "normal",
        label: "MeshNormalMaterial",
    },
    {
        type: "phong",
        label: "MeshPhongMaterial",
    },
    {
        type: "shader",
        label: "ShaderMaterial",
    },
    {
        type: "matcap",
        label: "MeshMatcapMaterial",
    },
];


export default function MaterialsProjGeoGroup() {


    const { nextSliderOuter, prevSliderOuter } = useSlider();

    const [activeIndex, setActiveIndex] = useState(0);
    const activeMaterialType = materialList[activeIndex].type;

    const groupRef = useRef();
    const activeIndexRef = useRef(0);
    const targetRotation = useRef(0);

    const radius = 4;
    const count = materialList.length;

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


    const basicControls = useControls(
        "MeshBasicMaterial",
        {
            color: {
                value: "#e57373",
                render: () => activeMaterialType === "basic",
            },

            opacity: {
                value: 1,
                min: 0,
                max: 1,
                step: 0.01,
                render: () => activeMaterialType === "basic",
            },

            transparent: {
                value: false,
                render: () => activeMaterialType === "basic",
            },

            wireframe: {
                value: false,
                render: () => activeMaterialType === "basic",
            },

            side: {
                options: {
                    Front: "front",
                    Double: "double",
                    Back: "back",
                },
                value: "front",
                render: () => activeMaterialType === "basic",
            },
        }
    );
    const lambertControls = useControls(
        "MeshLambertMaterial",
        {
            color: {
                value: "#64b5f6",
                render: () => activeMaterialType === "lambert",
            },

            emissive: {
                value: "#d32a2a",
                render: () => activeMaterialType === "lambert",
            },

            emissiveIntensity: {
                value: 0.48,
                min: 0,
                max: 5,
                step: 0.01,
                render: () => activeMaterialType === "lambert",
            },

            flatShading: {
                value: false,
                render: () => activeMaterialType === "lambert",
            },

            wireframe: {
                value: false,
                render: () => activeMaterialType === "lambert",
            },

            transparent: {
                value: false,
                render: () => activeMaterialType === "lambert",
            },

            opacity: {
                value: 1,
                min: 0,
                max: 1,
                step: 0.01,
                render: () => activeMaterialType === "lambert",
            },
        },
        [activeMaterialType]
    );
    const phongControls = useControls(
        "MeshPhongMaterial",
        {
            color: {
                value: "#81c784",
                render: () => activeMaterialType === "phong",
            },
            emissive: {
                value: "#ffffff",
                render: () => activeMaterialType === "phong",
            },
            specular: {
                value: "#ffffff",
                render: () => activeMaterialType === "phong",
            },

            shininess: {
                value: 30,
                min: 0,
                max: 200,
                step: 1,
                render: () => activeMaterialType === "phong",
            },

            flatShading: {
                value: false,
                render: () => activeMaterialType === "phong",
            },

            wireframe: {
                value: false,
                render: () => activeMaterialType === "phong",
            },

            transparent: {
                value: false,
                render: () => activeMaterialType === "phong",
            },

            opacity: {
                value: 1,
                min: 0,
                max: 1,
                step: 0.01,
                render: () => activeMaterialType === "phong",
            },
        },
        [activeMaterialType]
    );
    const standardControls = useControls(
        "MeshStandardMaterial",
        {
            color: {
                value: "#ffb74d",
                render: () => activeMaterialType === "standard",
            },

            metalness: {
                value: 0,
                min: 0,
                max: 1,
                step: 0.01,
                render: () => activeMaterialType === "standard",
            },

            roughness: {
                value: 0.5,
                min: 0,
                max: 1,
                step: 0.01,
                render: () => activeMaterialType === "standard",
            },

            envMapIntensity: {
                value: 1,
                min: 0,
                max: 5,
                step: 0.01,
                render: () => activeMaterialType === "standard",
            },

            flatShading: {
                value: false,
                render: () => activeMaterialType === "standard",
            },

            wireframe: {
                value: false,
                render: () => activeMaterialType === "standard",
            },

            transparent: {
                value: false,
                render: () => activeMaterialType === "standard",
            },

            opacity: {
                value: 1,
                min: 0,
                max: 1,
                step: 0.01,
                render: () => activeMaterialType === "standard",
            },
        },
        [activeMaterialType]
    );
    const physicalControls = useControls(
        "MeshPhysicalMaterial",
        {
            color: {
                value: "#4db6ac",
                render: () => activeMaterialType === "physical",
            },

            metalness: {
                value: 0,
                min: 0,
                max: 1,
                step: 0.01,
                render: () => activeMaterialType === "physical",
            },

            roughness: {
                value: 0.3,
                min: 0,
                max: 1,
                step: 0.01,
                render: () => activeMaterialType === "physical",
            },

            envMapIntensity: {
                value: 1,
                min: 0,
                max: 5,
                step: 0.01,
                render: () => activeMaterialType === "physical",
            },

            clearcoat: {
                value: 0,
                min: 0,
                max: 1,
                step: 0.01,
                render: () => activeMaterialType === "physical",
            },

            clearcoatRoughness: {
                value: 0,
                min: 0,
                max: 1,
                step: 0.01,
                render: () => activeMaterialType === "physical",
            },

            transmission: {
                value: 0,
                min: 0,
                max: 1,
                step: 0.01,
                render: () => activeMaterialType === "physical",
            },

            ior: {
                value: 1.5,
                min: 1,
                max: 2.5,
                step: 0.01,
                render: () => activeMaterialType === "physical",
            },

            thickness: {
                value: 0,
                min: 0,
                max: 5,
                step: 0.01,
                render: () => activeMaterialType === "physical",
            },

            sheen: {
                value: 0,
                min: 0,
                max: 1,
                step: 0.01,
                render: () => activeMaterialType === "physical",
            },

            anisotropy: {
                value: 0,
                min: 0,
                max: 1,
                step: 0.01,
                render: () => activeMaterialType === "physical",
            },

            flatShading: {
                value: false,
                render: () => activeMaterialType === "physical",
            },

            wireframe: {
                value: false,
                render: () => activeMaterialType === "physical",
            },
        },
        [activeMaterialType]
    );
    const normalControls = useControls(
        "MeshNormalMaterial",
        {
            flatShading: {
                value: false,
                render: () => activeMaterialType === "normal",
            },

            wireframe: {
                value: false,
                render: () => activeMaterialType === "normal",
            },

            transparent: {
                value: false,
                render: () => activeMaterialType === "normal",
            },

            opacity: {
                value: 1,
                min: 0,
                max: 1,
                step: 0.01,
                render: () => activeMaterialType === "normal",
            },
        },
        [activeMaterialType]
    );
    const shaderControls = useControls(
        "ShaderMaterial",
        {
            color: {
                value: "#ffffff",
                render: () => activeMaterialType === "shader",
            },

            strength: {
                value: 1,
                min: 0,
                max: 3,
                step: 0.01,
                render: () => activeMaterialType === "shader",
            },

            wireframe: {
                value: false,
                render: () => activeMaterialType === "shader",
            },
        },
        [activeMaterialType]
    );
    const matcapControls = useControls(
        "MeshMatcapMaterial",
        {
            color: {
                value: "#ffffff",
                render: () => activeMaterialType === "matcap",
            },

            flatShading: {
                value: false,
                render: () => activeMaterialType === "matcap",
            },

            wireframe: {
                value: false,
                render: () => activeMaterialType === "matcap",
            },
        },
        [activeMaterialType]
    );




    const materialControlsByType = {
        basic: basicControls,
        standard: standardControls,
        physical: physicalControls,
        lambert: lambertControls,
        normal: normalControls,
        phong: phongControls,
        shader: shaderControls,
        matcap: matcapControls,
    };



    return (
        <>
            <group ref={groupRef}>
                {materialList.map((material, index) => {
                    const angle =
                        Math.PI / 2 -
                        (index / count) * Math.PI * 2;

                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;

                    return (
                        <MaterialsProGeoMesh
                            key={material.type}
                            position={[x, 0, z]}
                            active={index === activeIndex}
                            materialType={material.type}
                            controls={materialControlsByType[material.type]}
                        />
                    );
                })}
            </group>
            {/* <Text
                fontSize={3}
                position={[0, 2, 0]}
            >{activeIndex}</Text> */}

            <Text
                font="/fonts/bangers-v20-latin-regular.woff"
                fontSize={1}
                position={[0, 2, 0]}
                color={"#fff"}

            >{materialList[activeIndex].type}
                <meshBasicMaterial toneMapped={false} />
            </Text>

        </>
    );
}