import * as THREE from "three";
import { Text, Html, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useContext, useEffect, useRef, useState } from "react";
import { useSlider } from "./RealisticProjMain";
import RealisticProGeoMesh from "./RealisticProGeoMesh";




const geometryList = [
    {
        type: "wood",
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
    {
        type: "circle",
        color: "#4d54b6",
        defaults: {
            radius: 1,
            segments: 32,
            thetaStart: 0,
            thetaLength: Math.PI * 2,
        },
    },
    {
        type: "plane",
        color: "#b64d79",
        defaults: {
            width: 2,
            height: 2,
            widthSegments: 1,
            heightSegments: 1,
        },
    },
    {
        type: "icosahedron",
        color: "#904db6",
        defaults: {
            radius: 1,
            detail: 0,
        },
    },
    {
        type: "torusKnot",
        color: "#4db6b1",
        defaults: {
            radius: 1,
            tube: 0.4,
            tubularSegments: 64,
            radialSegments: 8,
            p: 2,
            q: 3,

        },
    },
];


export default function RealisticProjGeoGroup() {

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
        wireframe: {
            value: false,
            render: () => activeType === "box",
        }
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
        wireframe: {
            value: false,
            render: () => activeType === "capsule",
        }
    }, [activeType]);

    const torusControls = useControls(
        "Torus",
        {
            radius: {
                value: 1,
                min: 0.1,
                max: 5,
                step: 0.1,
                render: () => activeType === "torus",
            },

            tube: {
                value: 0.4,
                min: 0.05,
                max: 2,
                step: 0.05,
                render: () => activeType === "torus",
            },

            radialSegments: {
                value: 16,
                min: 3,
                max: 64,
                step: 1,
                render: () => activeType === "torus",
            },

            tubularSegments: {
                value: 32,
                min: 3,
                max: 128,
                step: 1,
                render: () => activeType === "torus",
            },

            arc: {
                value: Math.PI * 2,
                min: 0.1,
                max: Math.PI * 2,
                step: 0.01,
                render: () => activeType === "torus",
            },

            wireframe: {
                value: false,
                render: () => activeType === "torus",
            },
        },
        [activeType]
    );

    const coneControls = useControls(
        "Cone",
        {
            radius: {
                value: 1,
                min: 0.1,
                max: 5,
                step: 0.1,
                render: () => activeType === "cone",
            },

            height: {
                value: 2,
                min: 0.1,
                max: 5,
                step: 0.1,
                render: () => activeType === "cone",
            },

            radialSegments: {
                value: 16,
                min: 3,
                max: 64,
                step: 1,
                render: () => activeType === "cone",
            },

            heightSegments: {
                value: 1,
                min: 1,
                max: 32,
                step: 1,
                render: () => activeType === "cone",
            },

            openEnded: {
                value: false,
                render: () => activeType === "cone",
            },

            wireframe: {
                value: false,
                render: () => activeType === "cone",
            },
        },
        [activeType]
    );

    const cylinderControls = useControls(
        "Cylinder",
        {
            radiusTop: {
                value: 1,
                min: 0.1,
                max: 5,
                step: 0.1,
                render: () => activeType === "cylinder",
            },

            radiusBottom: {
                value: 1,
                min: 0.1,
                max: 5,
                step: 0.1,
                render: () => activeType === "cylinder",
            },

            height: {
                value: 2,
                min: 0.1,
                max: 5,
                step: 0.1,
                render: () => activeType === "cylinder",
            },

            radialSegments: {
                value: 16,
                min: 3,
                max: 64,
                step: 1,
                render: () => activeType === "cylinder",
            },

            heightSegments: {
                value: 1,
                min: 1,
                max: 32,
                step: 1,
                render: () => activeType === "cylinder",
            },

            openEnded: {
                value: false,
                render: () => activeType === "cylinder",
            },

            wireframe: {
                value: false,
                render: () => activeType === "cylinder",
            },
        },
        [activeType]
    );

    const sphereControls = useControls(
        "Sphere",
        {
            radius: {
                value: 1,
                min: 0.1,
                max: 5,
                step: 0.1,
                render: () => activeType === "sphere",
            },

            widthSegments: {
                value: 16,
                min: 3,
                max: 64,
                step: 1,
                render: () => activeType === "sphere",
            },

            heightSegments: {
                value: 16,
                min: 2,
                max: 64,
                step: 1,
                render: () => activeType === "sphere",
            },

            phiStart: {
                value: 0,
                min: 0,
                max: Math.PI * 2,
                step: 0.01,
                render: () => activeType === "sphere",
            },

            phiLength: {
                value: Math.PI * 2,
                min: 0.1,
                max: Math.PI * 2,
                step: 0.01,
                render: () => activeType === "sphere",
            },

            thetaStart: {
                value: 0,
                min: 0,
                max: Math.PI,
                step: 0.01,
                render: () => activeType === "sphere",
            },

            thetaLength: {
                value: Math.PI,
                min: 0.1,
                max: Math.PI,
                step: 0.01,
                render: () => activeType === "sphere",
            },

            wireframe: {
                value: false,
                render: () => activeType === "sphere",
            },
        },
        [activeType]
    );

    const circleControls = useControls(
        "Circle",
        {
            radius: {
                value: 1,
                min: 0.1,
                max: 5,
                step: 0.1,
                render: () => activeType === "circle",
            },

            segments: {
                value: 32,
                min: 3,
                max: 64,
                step: 1,
                render: () => activeType === "circle",
            },

            thetaStart: {
                value: 0,
                min: 0,
                max: Math.PI * 2,
                step: 0.01,
                render: () => activeType === "circle",
            },

            thetaLength: {
                value: Math.PI * 2,
                min: 0.1,
                max: Math.PI * 2,
                step: 0.01,
                render: () => activeType === "circle",
            },

            wireframe: {
                value: false,
                render: () => activeType === "circle",
            },
            doubleside: {
                value: true,
                render: () => activeType === "circle",
            }
        },
        [activeType]
    );

    const planeControls = useControls(
        "Plane",
        {
            width: {
                value: 2,
                min: 0.1,
                max: 10,
                step: 0.1,
                render: () => activeType === "plane",
            },

            height: {
                value: 2,
                min: 0.1,
                max: 10,
                step: 0.1,
                render: () => activeType === "plane",
            },

            widthSegments: {
                value: 1,
                min: 1,
                max: 64,
                step: 1,
                render: () => activeType === "plane",
            },

            heightSegments: {
                value: 1,
                min: 1,
                max: 64,
                step: 1,
                render: () => activeType === "plane",
            },

            wireframe: {
                value: false,
                render: () => activeType === "plane",
            },
            doubleside: {
                value: true,
                render: () => activeType === "plane",
            }
        },
        [activeType]
    );

    const icosahedronControls = useControls(
        "Icosahedron",
        {
            radius: {
                value: 1,
                min: 0.1,
                max: 5,
                step: 0.1,
                render: () => activeType === "icosahedron",
            },

            detail: {
                value: 0,
                min: 0,
                max: 5,
                step: 1,
                render: () => activeType === "icosahedron",
            },

            wireframe: {
                value: false,
                render: () => activeType === "icosahedron",
            },
        },
        [activeType]
    );

    const torusKnotControls = useControls(
        "Torus Knot",
        {
            radius: {
                value: 1,
                min: 0.1,
                max: 5,
                step: 0.1,
                render: () => activeType === "torusKnot",
            },

            tube: {
                value: 0.4,
                min: 0.05,
                max: 2,
                step: 0.05,
                render: () => activeType === "torusKnot",
            },

            tubularSegments: {
                value: 64,
                min: 3,
                max: 128,
                step: 1,
                render: () => activeType === "torusKnot",
            },

            radialSegments: {
                value: 8,
                min: 3,
                max: 32,
                step: 1,
                render: () => activeType === "torusKnot",
            },

            p: {
                value: 2,
                min: 1,
                max: 10,
                step: 1,
                render: () => activeType === "torusKnot",
            },

            q: {
                value: 3,
                min: 1,
                max: 10,
                step: 1,
                render: () => activeType === "torusKnot",
            },

            wireframe: {
                value: false,
                render: () => activeType === "torusKnot",
            },
        },
        [activeType]
    );




    const controlsByType = {
        box: boxControls,
        capsule: capsuleControls,
        torus: torusControls,
        cone: coneControls,
        cylinder: cylinderControls,
        sphere: sphereControls,
        circle: circleControls,
        plane: planeControls,
        icosahedron: icosahedronControls,
        torusKnot: torusKnotControls,
    };

    const woodTextureColor = useTexture('/images/pbr/wood/Bark_06_BaseColor.jpg');
    woodTextureColor.colorSpace = THREE.SRGBColorSpace;
    woodTextureColor.flipY = false;
    const woodTextureHeight = useTexture('/images/pbr/wood/Bark_06_Height.png');
    const woodTextureNormal = useTexture('/images/pbr/wood/Bark_06_Normal.jpg');
    const woodTextureRoughness = useTexture('/images/pbr/wood/Bark_06_Roughness.jpg');
    const woodTextureAO = useTexture('/images/pbr/wood/Bark_06_AmbientOcclusion.jpg');
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
                        <RealisticProGeoMesh
                            key={geometry.type}
                            geometry={geometry}
                            position={[x, 0, z]}
                            active={index === activeIndex}
                            controls={controlsByType[geometry.type]}
                        />

                    );
                })}
            </group>
           

            <Text
                font="/fonts/bangers-v20-latin-regular.woff"
                fontSize={1}
                position={[0, 2, 0]}
                color={"#fff"}

            >{geometryList[activeIndex].type}
                <meshBasicMaterial toneMapped={false} />
            </Text>

            <mesh position={[0,1,0]} scale={0.5}>
                <sphereGeometry
                    args={[1, 320, 320]}
                    // args={[
                    //     1.0,
                    //     1.0,
                    //     2.0,
                    //     320,
                    //     180,
                    //     false,
                    // ]}
                />
                <meshStandardMaterial
                    map={woodTextureColor}
                    metalness={0.0}
                    displacementMap={woodTextureHeight}
                    displacementScale={0.1}
                    normalMap={woodTextureNormal}
                    normalScale={[0,1]}
                    roughness={1.0}
                    roughnessMap={woodTextureRoughness}
                    aoMap={woodTextureAO}
                    aoMapIntensity={1}
                />
            </mesh>

        </>
    );
}