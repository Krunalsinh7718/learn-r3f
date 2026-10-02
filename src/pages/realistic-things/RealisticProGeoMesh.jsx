import * as THREE from "three";
import { DoubleSide, FrontSide, MathUtils } from "three";
import { Text, Html, useTexture } from "@react-three/drei";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function RealisticProGeoMesh({
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
        } else {
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

    const woodTextureColor = useTexture('/images/pbr/wood/Bark_06_BaseColor.jpg');
    woodTextureColor.colorSpace = THREE.SRGBColorSpace;
    woodTextureColor.flipY = false;
    const woodTextureHeight = useTexture('/images/pbr/wood/Bark_06_Height.png');
    const woodTextureNormal = useTexture('/images/pbr/wood/Bark_06_Normal.jpg');
    const woodTextureRoughness = useTexture('/images/pbr/wood/Bark_06_Roughness.jpg');
    const woodTextureAO = useTexture('/images/pbr/wood/Bark_06_AmbientOcclusion.jpg');

    return (
        <mesh
            ref={meshRef}
            position={position}
            // scale={active ? 0.5 : 0.3}
            castShadow
        >
            {geometry.type === "wood" && (
                <>
                    <boxGeometry
                        args={[
                            controls?.width ?? geometry.defaults.width,
                            controls?.height ?? geometry.defaults.height,
                            controls?.depth ?? geometry.defaults.depth,
                        ]}
                    />
                    <meshStandardMaterial
                        map={woodTextureColor}
                        metalness={0.0}
                        displacementMap={woodTextureHeight}
                        displacementScale={0.1}
                        normalMap={woodTextureNormal}
                        normalScale={[0, 1]}
                        roughness={1.0}
                        roughnessMap={woodTextureRoughness}
                        aoMap={woodTextureAO}
                        aoMapIntensity={1}
                    />
                </>
            )}

            {geometry.type === "capsule" && (
                <>
                    <capsuleGeometry
                        args={[
                            controls?.radius ?? geometry.defaults.radius,
                            controls?.length ?? geometry.defaults.length,
                            controls?.capSegments ?? geometry.defaults.capSegments,
                            controls?.radialSegments ?? geometry.defaults.radialSegments,
                        ]}
                    />
                    <meshStandardMaterial
                        color={geometry.color}
                        wireframe={controls?.wireframe}
                        side={controls?.doubleside ? DoubleSide : FrontSide}
                    />
                </>
            )}

            {geometry.type === "torus" && (
                <>
                    <torusGeometry
                        args={[
                            controls?.radius ?? geometry.defaults.radius,
                            controls?.tube ?? geometry.defaults.tube,
                            controls?.radialSegments ?? geometry.defaults.radialSegments,
                            controls?.tubularSegments ?? geometry.defaults.tubularSegments,
                            controls?.arc ?? geometry.defaults.arc,
                        ]}
                    />
                    <meshStandardMaterial
                        color={geometry.color}
                        wireframe={controls?.wireframe}
                        side={controls?.doubleside ? DoubleSide : FrontSide}
                    />
                </>
            )}

            {geometry.type === "cone" && (
                <>
                    <coneGeometry
                        args={[
                            controls?.radius ?? geometry.defaults.radius,
                            controls?.height ?? geometry.defaults.height,
                            controls?.radialSegments ?? geometry.defaults.radialSegments,
                            controls?.heightSegments ?? geometry.defaults.heightSegments,
                            controls?.openEnded ?? geometry.defaults.openEnded,
                        ]}
                    />
                     <meshStandardMaterial
                        color={geometry.color}
                        wireframe={controls?.wireframe}
                        side={controls?.doubleside ? DoubleSide : FrontSide}
                    />
                </>
            )}

            {geometry.type === "cylinder" && (
                <>
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
                    <meshStandardMaterial
                        color={geometry.color}
                        wireframe={controls?.wireframe}
                        side={controls?.doubleside ? DoubleSide : FrontSide}
                    />
                </>
            )}

            {geometry.type === "sphere" && (
                <>
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
                     <meshStandardMaterial
                        color={geometry.color}
                        wireframe={controls?.wireframe}
                        side={controls?.doubleside ? DoubleSide : FrontSide}
                    />
                </>
            )}

            {geometry.type === "circle" && (
                <>
                <circleGeometry
                    args={[
                        controls?.radius ?? geometry.defaults.radius,
                        controls?.segments ?? geometry.defaults.segments,
                        controls?.thetaStart ?? geometry.defaults.thetaStart,
                        controls?.thetaLength ?? geometry.defaults.thetaLength,
                    ]}
                />
                 <meshStandardMaterial
                        color={geometry.color}
                        wireframe={controls?.wireframe}
                        side={controls?.doubleside ? DoubleSide : FrontSide}
                    />
                </>
            )}

            {geometry.type === "plane" && (
                <>
                    <planeGeometry
                        args={[
                            controls?.width ?? geometry.defaults.width,
                            controls?.height ?? geometry.defaults.height,
                            controls?.widthSegments ?? geometry.defaults.widthSegments,
                            controls?.heightSegments ?? geometry.defaults.heightSegments,
                        ]}
                    />
                     <meshStandardMaterial
                        color={geometry.color}
                        wireframe={controls?.wireframe}
                        side={controls?.doubleside ? DoubleSide : FrontSide}
                    />
                </>
            )}

            {geometry.type === "icosahedron" && (
                <>
                <icosahedronGeometry
                    args={[
                        controls?.radius ?? geometry.defaults.radius,
                        controls?.detail ?? geometry.defaults.detail,
                    ]}
                />
                 <meshStandardMaterial
                        color={geometry.color}
                        wireframe={controls?.wireframe}
                        side={controls?.doubleside ? DoubleSide : FrontSide}
                    />
                </>
            )}

            {geometry.type === "torusKnot" && (
                <>
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
                 <meshStandardMaterial
                        color={geometry.color}
                        wireframe={controls?.wireframe}
                        side={controls?.doubleside ? DoubleSide : FrontSide}
                    />
                </>
            )}

         

        </mesh>
    );
}