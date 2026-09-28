import * as THREE from "three";
import { Text, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useState } from "react";

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

const GeoPosition = ({ x, z }) => (
    <Text
        font="/fonts/bangers-v20-latin-regular.woff"
        fontSize={0.2}
        position={[0, 2, 0]}
        color="#fff"
    >
        {`${x.toFixed(2)}, 0, ${z.toFixed(2)}`}
    </Text>
);

function GeometryMesh({
    geometry,
    position,
    active,
}) {
    const meshRef = useRef();

    useFrame((_, delta) => {
        if (!meshRef.current) return;

        meshRef.current.rotation.x += delta * 0.5;
        meshRef.current.rotation.y += delta * 0.8;
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            scale={active ? 0.7 : 0.5}
            castShadow
        >
            {geometry.type === "box" && (
                <boxGeometry
                    args={[
                        geometry.defaults.width,
                        geometry.defaults.height,
                        geometry.defaults.depth,
                    ]}
                />
            )}

            {geometry.type === "capsule" && (
                <capsuleGeometry
                    args={[
                        geometry.defaults.radius,
                        geometry.defaults.length,
                        geometry.defaults.capSegments,
                        geometry.defaults.radialSegments,
                    ]}
                />
            )}

            {geometry.type === "torus" && (
                <torusGeometry
                    args={[
                        geometry.defaults.radius,
                        geometry.defaults.tube,
                        geometry.defaults.radialSegments,
                        geometry.defaults.tubularSegments,
                    ]}
                />
            )}

            {geometry.type === "cone" && (
                <coneGeometry
                    args={[
                        geometry.defaults.radius,
                        geometry.defaults.height,
                        geometry.defaults.radialSegments,
                    ]}
                />
            )}

            {geometry.type === "cylinder" && (
                <cylinderGeometry
                    args={[
                        geometry.defaults.radiusTop,
                        geometry.defaults.radiusBottom,
                        geometry.defaults.height,
                        geometry.defaults.radialSegments,
                    ]}
                />
            )}

            {geometry.type === "sphere" && (
                <sphereGeometry
                    args={[
                        geometry.defaults.radius,
                        geometry.defaults.widthSegments,
                        geometry.defaults.heightSegments,
                    ]}
                />
            )}

            <meshStandardMaterial
                color={geometry.color}
            />

            {/* <Text
                font="/fonts/bangers-v20-latin-regular.woff"
                fontSize={0.2}
                position={[0, 2, 0]}
                color="#fff"
            >
                {`${position[0].toFixed(2)}, 0, ${position[2].toFixed(2)}`}
            </Text> */}
        </mesh>
    );
}

export default function GeomatriesProjGeoGroup() {
    const [activeIndex, setActiveIndex] = useState(0);

    const groupRef = useRef();
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
        setActiveIndex((current) => {
            const nextIndex = (current + 1) % count;

            targetRotation.current =
                -(nextIndex * Math.PI * 2) / count;

            return nextIndex;
        });
    };

    const previous = () => {
        setActiveIndex((current) => {
            const previousIndex =
                (current - 1 + count) % count;

            targetRotation.current =
                -(previousIndex * Math.PI * 2) / count;

            return previousIndex;
        });
    };

    return (
        <>
            <group ref={groupRef}>
                {geometryList.map((geometry, index) => {
                    const angle =
                        Math.PI / 2 +
                        (index / count) * Math.PI * 2;

                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;

                    return (
                        <GeometryMesh
                            key={geometry.type}
                            geometry={geometry}
                            position={[x, 0, z]}
                            active={index === activeIndex}
                        />
                    );
                })}
            </group>

            <Html position={[0, 3, 4]}>
                <button onClick={previous}>
                    Previous
                </button>

                <button onClick={next}>
                    Next
                </button>
            </Html>
        </>
    );
}