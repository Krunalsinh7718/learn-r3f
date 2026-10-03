import * as THREE from 'three';
import { DoubleSide, FrontSide, BackSide, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useTexture } from "@react-three/drei";

const vertexShader = /*glsl*/`
    varying vec2 vUv;

    void main() {
        vUv = uv;

        gl_Position = projectionMatrix *
                    modelViewMatrix *
                    vec4(position, 1.0);
    }
`;
const fragmentShader = /*glsl*/`
    uniform vec3 uColor;
    uniform float uStrength;

    varying vec2 vUv;

    void main() {
        vec3 color = uColor * uStrength;

        gl_FragColor = vec4(color, 1.0);
    }
`;
export default function MaterialsProGeoMesh({
    position,
    active,
    controls,
    materialType,
}) {

    const matcapTexture = useTexture(
        "/images/matcaps/Clay1.png"
    );

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

    return (
        <mesh
            ref={meshRef}
            position={position}
            // scale={active ? 0.5 : 0.3}
            castShadow
        >
            <sphereGeometry args={[1,96,48]}/>
            {materialType === "basic" && (
                <meshBasicMaterial
                    color={controls?.color}
                    wireframe={controls?.wireframe}
                    transparent={controls?.transparent}
                    opacity={controls?.opacity}
                    side={
                        controls?.side === "double"
                            ? DoubleSide
                            : controls?.side === "back"
                                ? BackSide
                                : FrontSide
                    }
                />
            )}

            {materialType === "lambert" && (
                <meshLambertMaterial
                    color={controls?.color}
                    emissive={controls?.emissive}
                    emissiveIntensity={controls?.emissiveIntensity}
                    flatShading={controls?.flatShading}
                    wireframe={controls?.wireframe}
                    transparent={controls?.transparent}
                    opacity={controls?.opacity}
                    side={DoubleSide}
                />
            )}

            {materialType === "phong" && (
                <meshPhongMaterial
                    color={controls?.color}
                    emissive={controls?.emissive}
                    specular={controls?.specular}
                    shininess={controls?.shininess}
                    flatShading={controls?.flatShading}
                    wireframe={controls?.wireframe}
                    transparent={controls?.transparent}
                    opacity={controls?.opacity}
                    side={DoubleSide}
                />
            )}

            {materialType === "standard" && (
                <meshStandardMaterial
                    color={controls?.color}
                    metalness={controls?.metalness}
                    roughness={controls?.roughness}
                    envMapIntensity={controls?.envMapIntensity}
                    flatShading={controls?.flatShading}
                    wireframe={controls?.wireframe}
                    transparent={controls?.transparent}
                    opacity={controls?.opacity}
                    side={DoubleSide}
                />
            )}

            {materialType === "physical" && (
                <meshPhysicalMaterial
                    color={controls?.color}
                    metalness={controls?.metalness}
                    roughness={controls?.roughness}
                    envMapIntensity={controls?.envMapIntensity}
                    clearcoat={controls?.clearcoat}
                    clearcoatRoughness={controls?.clearcoatRoughness}
                    transmission={controls?.transmission}
                    iridescence={controls?.iridescence}
                    iridescenceIOR={controls?.iridescenceIOR}
                    ior={controls?.ior}
                    thickness={controls?.thickness}
                    sheen={controls?.sheen}
                    anisotropy={controls?.anisotropy}
                    transparent={controls?.transparent}
                    opacity={controls?.opacity}
                    flatShading={controls?.flatShading}
                    wireframe={controls?.wireframe}
                    side={DoubleSide}
                />
            )}

            {materialType === "normal" && (
                <meshNormalMaterial
                    flatShading={controls?.flatShading}
                    wireframe={controls?.wireframe}
                    transparent={controls?.transparent}
                    opacity={controls?.opacity}
                    side={DoubleSide}
                />
            )}

            {materialType === "shader" && (
                <shaderMaterial
                    uniforms={{
                        uColor: {
                            value: new THREE.Color(
                                controls?.color ?? "#570cd1"
                            ),
                        },

                        uStrength: {
                            value: controls?.strength ?? 1,
                        },
                    }}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    wireframe={controls?.wireframe}
                />
            )}

            {materialType === "matcap" && (
                <meshMatcapMaterial
                    matcap={matcapTexture}
                    color={controls?.color}
                    flatShading={controls?.flatShading}
                    wireframe={controls?.wireframe}
                    side={DoubleSide}
                />
            )}

        </mesh>
    );
}