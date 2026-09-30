import { DoubleSide, FrontSide, MathUtils } from "three";
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
        if (active) {
            meshRef.current.scale.x = MathUtils.damp(
                meshRef.current.scale.x,
                0.5,
                5,
                delta
            );
             meshRef.current.scale.y = MathUtils.damp(
                meshRef.current.scale.y,
                0.5,
                5,
                delta
            );
             meshRef.current.scale.z = MathUtils.damp(
                meshRef.current.scale.z,
                0.5,
                5,
                delta
            );
        }else{
             meshRef.current.scale.x = MathUtils.damp(
                meshRef.current.scale.x,
                0.25,
                5,
                delta
            );
             meshRef.current.scale.y = MathUtils.damp(
                meshRef.current.scale.y,
                0.25,
                5,
                delta
            );
             meshRef.current.scale.z = MathUtils.damp(
                meshRef.current.scale.z,
                0.25,
                5,
                delta
            );
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            // scale={active ? 0.5 : 0.3}
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
                        controls?.radius ?? geometry.defaults.radius,
                        controls?.tube ?? geometry.defaults.tube,
                        controls?.radialSegments ?? geometry.defaults.radialSegments,
                        controls?.tubularSegments ?? geometry.defaults.tubularSegments,
                        controls?.arc ?? geometry.defaults.arc,
                    ]}
                />
            )}

            {geometry.type === "cone" && (
                <coneGeometry
                    args={[
                        controls?.radius ?? geometry.defaults.radius,
                        controls?.height ?? geometry.defaults.height,
                        controls?.radialSegments ?? geometry.defaults.radialSegments,
                        controls?.heightSegments ?? geometry.defaults.heightSegments,
                        controls?.openEnded ?? geometry.defaults.openEnded,
                    ]}
                />
            )}

            {geometry.type === "cylinder" && (
                <cylinderGeometry
                    args={[
                        controls?.radiusTop ?? geometry.defaults.radiusTop,
                        controls?.radiusBottom ?? geometry.defaults.radiusBottom,
                        controls?.height ?? geometry.defaults.height,
                        controls?.radialSegments ?? geometry.defaults.radialSegments,
                        controls?.heightSegments ?? geometry.defaults.heightSegments,
                        controls?.openEnded ?? geometry.defaults.openEnded,
                    ]}
                />
            )}

            {geometry.type === "sphere" && (
                <sphereGeometry
                    args={[
                        controls?.radius ?? geometry.defaults.radius,
                        controls?.widthSegments ?? geometry.defaults.widthSegments,
                        controls?.heightSegments ?? geometry.defaults.heightSegments,
                        controls?.phiStart ?? geometry.defaults.phiStart,
                        controls?.phiLength ?? geometry.defaults.phiLength,
                        controls?.thetaStart ?? geometry.defaults.thetaStart,
                        controls?.thetaLength ?? geometry.defaults.thetaLength,
                    ]}
                />
            )}

            {geometry.type === "circle" && (
                <circleGeometry
                    args={[
                        controls?.radius ?? geometry.defaults.radius,
                        controls?.segments ?? geometry.defaults.segments,
                        controls?.thetaStart ?? geometry.defaults.thetaStart,
                        controls?.thetaLength ?? geometry.defaults.thetaLength,
                    ]}
                />
            )}

            {geometry.type === "plane" && (
                <planeGeometry
                    args={[
                        controls?.width ?? geometry.defaults.width,
                        controls?.height ?? geometry.defaults.height,
                        controls?.widthSegments ?? geometry.defaults.widthSegments,
                        controls?.heightSegments ?? geometry.defaults.heightSegments,
                    ]}
                />
            )}

            {geometry.type === "icosahedron" && (
                <icosahedronGeometry
                    args={[
                        controls?.radius ?? geometry.defaults.radius,
                        controls?.detail ?? geometry.defaults.detail,
                    ]}
                />
            )}

            {geometry.type === "torusKnot" && (
                <torusKnotGeometry
                    args={[
                        controls?.radius ?? geometry.defaults.radius,
                        controls?.tube ?? geometry.defaults.tube,
                        controls?.tubularSegments ?? geometry.defaults.tubularSegments,
                        controls?.radialSegments ?? geometry.defaults.radialSegments,
                        controls?.p ?? geometry.defaults.p,
                        controls?.q ?? geometry.defaults.q,
                    ]}
                />
            )}

            <meshStandardMaterial
                color={geometry.color}
                wireframe={controls?.wireframe}
                side={controls?.doubleside ? DoubleSide : FrontSide}
            />

        </mesh>
    );
}