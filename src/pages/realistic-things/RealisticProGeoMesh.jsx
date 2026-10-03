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

        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.3;
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



    const wallTextureColor = useTexture('/images/pbr/wall/rock_wall_17_diff_1k.png');
    wallTextureColor.colorSpace = THREE.SRGBColorSpace;
    wallTextureColor.flipY = false;
    const wallTextureHeight = useTexture('/images/pbr/wall/rock_wall_17_disp_1k.png');
    const wallTextureNormal = useTexture('/images/pbr/wall/rock_wall_17_nor_gl_1k.png');
    const wallTextureRoughness = useTexture('/images/pbr/wall/rock_wall_17_arm_1k.png');
    const wallTextureMetalness = useTexture('/images/pbr/wall/rock_wall_17_arm_1k.png');
    const wallTextureAO = useTexture('/images/pbr/wall/rock_wall_17_arm_1k.png');



    const pebblesTextureColor = useTexture('/images/pbr/pebbles/dry_river_pebbles_diff_1k.png');
    pebblesTextureColor.colorSpace = THREE.SRGBColorSpace;
    pebblesTextureColor.flipY = false;
    const pebblesTextureHeight = useTexture('/images/pbr/pebbles/dry_river_pebbles_disp_1k.png');
    const pebblesTextureNormal = useTexture('/images/pbr/pebbles/dry_river_pebbles_nor_gl_1k.png');
    const pebblesTextureRoughness = useTexture('/images/pbr/pebbles/dry_river_pebbles_arm_1k.png');
    const pebblesTextureMetalness = useTexture('/images/pbr/pebbles/dry_river_pebbles_arm_1k.png');
    const pebblesTextureAO = useTexture('/images/pbr/pebbles/dry_river_pebbles_arm_1k.png');


    const cottonTextureColor = useTexture('/images/pbr/cotton/waffle_pique_cotton_diff_1k.png');
    cottonTextureColor.colorSpace = THREE.SRGBColorSpace;
    cottonTextureColor.flipY = false;
    const cottonTextureHeight = useTexture('/images/pbr/cotton/waffle_pique_cotton_disp_1k.png');
    const cottonTextureNormal = useTexture('/images/pbr/cotton/waffle_pique_cotton_nor_gl_1k.png');
    const cottonTextureRoughness = useTexture('/images/pbr/cotton/waffle_pique_cotton_arm_1k.png');
    const cottonTextureMetalness = useTexture('/images/pbr/cotton/waffle_pique_cotton_arm_1k.png');
    const cottonTextureAO = useTexture('/images/pbr/cotton/waffle_pique_cotton_arm_1k.png');
    const cottonTextureAnisotropy = useTexture('/images/pbr/cotton/waffle_pique_cotton_anisotropy_strength_1k.png');
    const cottonTextureAnisotropyRotation = useTexture('/images/pbr/cotton/waffle_pique_cotton_anisotropy_rotation_1k.png');
    const cottonTextureIor = useTexture('/images/pbr/cotton/waffle_pique_cotton_spec_ior_1k.png');



    const metalTextureColor = useTexture('/images/pbr/metal/metal_plate_02_diff_1k.png');
    metalTextureColor.colorSpace = THREE.SRGBColorSpace;
    metalTextureColor.flipY = false;
    const metalTextureHeight = useTexture('/images/pbr/metal/metal_plate_02_disp_1k.png');
    const metalTextureNormal = useTexture('/images/pbr/metal/metal_plate_02_nor_gl_1k.png');
    const metalTextureRoughness = useTexture('/images/pbr/metal/metal_plate_02_arm_1k.png');
    const metalTextureMetalness = useTexture('/images/pbr/metal/metal_plate_02_arm_1k.png');
    const metalTextureAO = useTexture('/images/pbr/metal/metal_plate_02_arm_1k.png');

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
                            1, 1, 1, 320, 320, 320
                        ]}
                    />
                    <meshStandardMaterial
                        map={woodTextureColor}
                        metalness={0.0}
                        displacementMap={woodTextureHeight}
                        displacementScale={0.05}
                        normalMap={woodTextureNormal}
                        normalScale={[0, 1]}
                        roughness={1.0}
                        roughnessMap={woodTextureRoughness}
                        aoMap={woodTextureAO}
                        aoMapIntensity={1}
                    />
                </>
            )}

            {geometry.type === "wall" && (
                <>
                    <boxGeometry
                        args={[
                            1, 1, 1, 320, 320, 320
                        ]}
                    />
                    <meshStandardMaterial
                        map={wallTextureColor}
                        displacementMap={wallTextureHeight}
                        displacementScale={0.1}
                        normalMap={wallTextureNormal}
                        normalScale={[0, 1]}
                        roughness={1.0}
                        roughnessMap={wallTextureRoughness}
                        metalness={0.0}
                        metalnessMap={wallTextureMetalness}
                        aoMap={wallTextureAO}
                        aoMapIntensity={1}
                    />
                </>
            )}

            {geometry.type === "pebbles" && (
                <>
                    <boxGeometry
                        args={[
                            1, 1, 1, 320, 320, 320
                        ]}
                    />
                    <meshStandardMaterial
                        map={pebblesTextureColor}
                        displacementMap={pebblesTextureHeight}
                        displacementScale={0.1}
                        normalMap={pebblesTextureNormal}
                        normalScale={[0, 1]}
                        roughness={1.0}
                        roughnessMap={pebblesTextureRoughness}
                        metalness={0.0}
                        metalnessMap={pebblesTextureMetalness}
                        aoMap={pebblesTextureAO}
                        aoMapIntensity={1}
                    />
                </>
            )}

            {geometry.type === "cotton" && (
                <>
                    <sphereGeometry
                        args={[
                            1, 320, 320
                        ]}
                    />
                    <meshPhysicalMaterial
                        map={cottonTextureColor}
                        displacementMap={cottonTextureHeight}
                        displacementScale={0.02}
                        normalMap={cottonTextureNormal}
                        normalScale={[0, 1]}
                        roughness={1.0}
                        roughnessMap={cottonTextureRoughness}
                        metalness={0.0}
                        metalnessMap={cottonTextureMetalness}
                        aoMap={cottonTextureAO}
                        aoMapIntensity={1}
                        anisotropy={1}
                        anisotropyMap={cottonTextureAnisotropy}
                        anisotropyRotation={cottonTextureAnisotropyRotation}
                        specularIntensityMap={cottonTextureIor}
                    />
                </>
            )}

            {geometry.type === "metal" && (
                <>
                    <sphereGeometry
                        args={[
                            1, 320, 320
                        ]}
                    />
                    <meshStandardMaterial
                        map={metalTextureColor}
                        displacementMap={metalTextureHeight}
                        displacementScale={0.02}
                        normalMap={metalTextureNormal}
                        normalScale={[0, 1]}
                        roughness={1.0}
                        roughnessMap={metalTextureRoughness}
                        metalness={0.0}
                        metalnessMap={metalTextureMetalness}
                        aoMap={metalTextureAO}
                        aoMapIntensity={1}
                    />
                </>
            )}

            {geometry.type === "glass" && (
                <>
                    <boxGeometry
                        args={[
                            1, 1, 1, 320, 320, 320
                        ]}
                    />
                    <meshPhysicalMaterial
                        color={"#ffffff"}
                        metalness={0}
                        roughness={0}
                        envMapIntensity={0}
                        clearcoat={0}
                        clearcoatRoughness={0}
                        transmission={1}
                        iridescence={1}
                        iridescenceIOR={1.30}
                        ior={0}
                        thickness={0}
                        sheen={0}
                        anisotropy={0}
                        transparent={false}
                        opacity={1}
                        flatShading={false}
                        wireframe={false}
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