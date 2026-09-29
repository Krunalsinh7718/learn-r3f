import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function GeomatriesProGeoMesh({
    geometry,
    position,
    active,
    controls
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
            scale={active ? 0.5 : 0.3}
            castShadow
        >
            {geometry.type === "box" && (
                <boxGeometry
                    args={[
                        controls?.width ?? geometry.defaults.width,
                        controls?.height ?? geometry.defaults.height,
                        controls?.depth ?? geometry.defaults.depth,
                    ]}
                />
            )}

            {geometry.type === "capsule" && (
                <capsuleGeometry
                    args={[
                        controls?.radius ?? geometry.defaults.radius,
                        controls?.length ?? geometry.defaults.length,
                        controls?.capSegments ?? geometry.defaults.capSegments,
                        controls?.radialSegments ?? geometry.defaults.radialSegments,
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

        </mesh>
    );
}