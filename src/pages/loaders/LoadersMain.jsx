import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Center } from '@react-three/drei';
import { div } from 'three/tsl';
import { useControls } from 'leva';

const COLOR_PRESETS = [
  { name: 'Cyber Neon', primaryColor: '#06b6d4', secondaryColor: '#ec4899', accent: '#3b82f6', bg: '#050714' },
  { name: 'Emerald Flux', primaryColor: '#10b981', secondaryColor: '#6ee7b7', accent: '#047857', bg: '#03120e' },
  { name: 'Solar Flame', primaryColor: '#f97316', secondaryColor: '#facc15', accent: '#ef4444', bg: '#140803' },
  { name: 'Electric Violet', primaryColor: '#8b5cf6', secondaryColor: '#c084fc', accent: '#6366f1', bg: '#090514' },
  { name: 'Hyper Matrix', primaryColor: '#22c55e', secondaryColor: '#a3e635', accent: '#15803d', bg: '#020d06' },
  { name: 'Monochrome Luxe', primaryColor: '#f8fafc', secondaryColor: '#94a3b8', accent: '#475569', bg: '#09090b' },
];

const LOADER_PRESETS = [
  {
    id: 'rings',
    name: 'Quantum Gyroscope',
    category: 'Orbital Dynamics',
    description: 'Triple nested gimbal rings rotating along harmonic Euler axes with counter-orbiting telemetry beads.',
    componentName: 'QuantumGyroLoader',
    speed: 0.4,
    progress: 0,
    isProgressMode: true,
    color: COLOR_PRESETS[0]
  },
  {
    id: 'geosphere',
    name: 'Morphing Geo-Core',
    category: 'Wireframe Lattice',
    description: 'Dodecahedron with vertex displacement and floating inner crystalline nucleus responding to progress.',
    componentName: 'GeoCoreLoader',
    speed: 0.4,
    progress: 0,
    isProgressMode: true,
    color: COLOR_PRESETS[1]
  },
  {
    id: 'cubes',
    name: 'Kinetic Matrix Swarm',
    category: 'Algorithmic Array',
    description: 'Floating volumetric grid of micro-cubes undulating in continuous sine-wave harmonic propagation.',
    componentName: 'KineticMatrixLoader',
    speed: 0.4,
    progress: 0,
    isProgressMode: true,
    color: COLOR_PRESETS[3]
  },
  {
    id: 'torus',
    name: 'Infinity Knot Flow',
    category: 'Topological Curve',
    description: 'Interwoven Torus Knot with radiant iridescent wireframe geometry and pulsating orbital tracer.',
    componentName: 'InfinityKnotLoader',
    speed: 0.4,
    progress: 0,
    isProgressMode: true,
    color: COLOR_PRESETS[4]
  },
  {
    id: 'particles',
    name: 'Cyber Vortex Particles',
    category: 'Particle Physics',
    description: 'Spiral galaxy vortex funnel with outward stellar dispersion and center singularity pulse.',
    componentName: 'VortexParticlesLoader',
    speed: 0.4,
    progress: 0,
    isProgressMode: true,
    color: COLOR_PRESETS[5]
  }
];

function QuantumGyroLoader({ speed, primaryColor, secondaryColor, progress, isProgressMode }) {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const bead = useRef();

  useFrame((state, delta) => {
    const s = speed * 1.6;
    if (ring1.current) ring1.current.rotation.x += delta * s * 1.2;
    if (ring1.current) ring1.current.rotation.y += delta * s * 0.8;

    if (ring2.current) ring2.current.rotation.y += delta * s * 1.5;
    if (ring2.current) ring2.current.rotation.z += delta * s * 1.0;

    if (ring3.current) ring3.current.rotation.z += delta * s * 1.8;
    if (ring3.current) ring3.current.rotation.x += delta * s * 0.6;

    if (bead.current) {
      const t = state.clock.getElapsedTime() * s * 2;
      bead.current.position.x = Math.sin(t) * 1.9;
      bead.current.position.y = Math.cos(t) * 1.9;
      bead.current.position.z = Math.sin(t * 1.5) * 0.5;
    }
  });

  const scaleMultiplier = isProgressMode ? 0.4 + (progress / 100) * 0.6 : 1.0;
  const beadScale = isProgressMode ? 0.15 + (progress / 100) * 0.15 : 0.22;

  return (
    <group scale={scaleMultiplier}>
      {/* Outer Ring */}
      <mesh ref={ring1}>
        <torusGeometry args={[2.0, 0.045, 24, 100]} />
        <meshStandardMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={0.65}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Middle Ring */}
      <mesh ref={ring2} scale={0.78}>
        <torusGeometry args={[2.0, 0.04, 24, 100]} />
        <meshStandardMaterial
          color={secondaryColor}
          emissive={secondaryColor}
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Ring */}
      <mesh ref={ring3} scale={0.58}>
        <torusGeometry args={[2.0, 0.04, 24, 100]} />
        <meshStandardMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={0.9}
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>

      {/* Center Power Core */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color={secondaryColor}
          emissive={secondaryColor}
          emissiveIntensity={1.8}
          roughness={0.1}
        />
      </mesh>

      {/* Fast Orbiting Satellite Bead */}
      <mesh ref={bead}>
        <sphereGeometry args={[beadScale, 20, 20]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={primaryColor}
          emissiveIntensity={2.5}
        />
      </mesh>
    </group>
  );
}

function GeoCoreLoader({ speed, primaryColor, secondaryColor, progress, isProgressMode }) {
  const outerRef = useRef();
  const innerRef = useRef();
  const wireRef = useRef();

  useFrame((state, delta) => {
    const s = speed * 1.5;
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * s * 0.7;
      outerRef.current.rotation.y += delta * s * 0.9;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * s * 1.1;
      wireRef.current.rotation.z += delta * s * 0.5;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * s * 1.6;
      innerRef.current.rotation.z -= delta * s * 1.4;
      const breathe = Math.sin(state.clock.getElapsedTime() * s * 3) * 0.08;
      const baseScale = isProgressMode ? 0.3 + (progress / 100) * 0.5 : 0.6;
      innerRef.current.scale.setScalar(baseScale + breathe);
    }
  });

  return (
    <group>
      {/* Outer faceted shield */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshStandardMaterial
          color={primaryColor}
          wireframe
          wireframeLinewidth={2}
          emissive={primaryColor}
          emissiveIntensity={0.6}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Secondary geodesic wire */}
      <mesh ref={wireRef}>
        <dodecahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial
          color={secondaryColor}
          wireframe
          wireframeLinewidth={1.5}
          emissive={secondaryColor}
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Internal energetic crystalline nucleus */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={secondaryColor}
          emissiveIntensity={2.0}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

function KineticMatrixLoader({ speed, primaryColor, secondaryColor, progress, isProgressMode }) {
  const groupRef = useRef();
  const cubes = useMemo(() => {
    const list = [];
    const size = 3;
    const spacing = 0.85;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const dist = Math.sqrt(x * x + y * y + z * z);
          list.push({ pos: [x * spacing, y * spacing, z * spacing], dist, key: `${x}-${y}-${z}` });
        }
      }
    }
    return list;
  }, []);

  const cubeRefs = useRef([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed * 3.5;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.25;
    }

    cubes.forEach((cube, index) => {
      const el = cubeRefs.current[index];
      if (el) {
        const offset = Math.sin(t - cube.dist * 1.8) * 0.28;
        const progressBonus = isProgressMode ? (progress / 100) * 0.3 : 0;
        const s = Math.max(0.12, 0.28 + offset + progressBonus);
        el.scale.set(s, s, s);
        el.rotation.x = t * 0.5 + cube.dist;
        el.rotation.y = t * 0.3 + cube.dist;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, idx) => (
        <mesh
          key={cube.key}
          position={cube.pos}
          ref={(r) => (cubeRefs.current[idx] = r)}
        >
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial
            color={idx % 2 === 0 ? primaryColor : secondaryColor}
            emissive={idx % 2 === 0 ? primaryColor : secondaryColor}
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function InfinityKnotLoader({ speed, primaryColor, secondaryColor, progress, isProgressMode }) {
  const knotRef = useRef();
  const particleGroup = useRef();

  useFrame((state, delta) => {
    const s = speed * 1.8;
    if (knotRef.current) {
      knotRef.current.rotation.x += delta * s * 0.8;
      knotRef.current.rotation.y += delta * s * 1.2;
    }
    if (particleGroup.current) {
      particleGroup.current.rotation.z -= delta * s * 2;
    }
  });

  const tubeThickness = isProgressMode ? 0.12 + (progress / 100) * 0.18 : 0.24;

  return (
    <group>
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[1.3, tubeThickness, 128, 32, 2, 3]} />
        <meshStandardMaterial
          color={primaryColor}
          emissive={secondaryColor}
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.85}
          wireframe={false}
        />
      </mesh>

      {/* Halo outer Wireframe */}
      <mesh rotation={[0.4, 0.2, 0]}>
        <torusKnotGeometry args={[1.32, tubeThickness + 0.02, 64, 16, 2, 3]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.3}
          emissive={primaryColor}
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

function VortexParticlesLoader({ speed, primaryColor, secondaryColor, particleCount = 600, progress, isProgressMode }) {
  const pointsRef = useRef();

  const [positions, initialAngles, radii] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const angles = new Float32Array(particleCount);
    const rads = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.5 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.2;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      angles[i] = angle;
      rads[i] = radius;
    }
    return [pos, angles, rads];
  }, [particleCount]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed * 2;
    if (!pointsRef.current) return;

    const currentPos = pointsRef.current.geometry.attributes.position.array;
    const progressFactor = isProgressMode ? 0.3 + (progress / 100) * 0.7 : 1;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = initialAngles[i] + t * (2.8 / (radii[i] + 0.4));
      const rad = radii[i] * progressFactor;

      currentPos[i3] = Math.cos(angle) * rad;
      currentPos[i3 + 1] = Math.sin(t + radii[i] * 3) * 0.35 + (Math.sin(initialAngles[i]) * 0.3);
      currentPos[i3 + 2] = Math.sin(angle) * rad;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={primaryColor}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Central Singularity Pulse Core */}
      <mesh>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={secondaryColor}
          emissiveIntensity={3.0}
        />
      </mesh>
    </group>
  );
}



export default function LoadersMain() {
  const { activeLoader, selectedPreset } = useControls('Loaders', {
    activeLoader: {
      value: 'rings',
      options: ['rings', 'geosphere', 'cubes', 'torus', 'particles']
    },
    selectedPreset: {
      value: 'Cyber Neon',
      options: COLOR_PRESETS.map((preset) => preset.name)
    }
  })


  function getLoader(loader, loaderProps) {
    if (loader === 'rings') return <QuantumGyroLoader {...loaderProps}/>
    else if(loader === 'geosphere') return <GeoCoreLoader {...loaderProps}/>
    else if(loader === 'cubes') return <KineticMatrixLoader {...loaderProps}/>
    else if(loader === 'torus') return <InfinityKnotLoader {...loaderProps}/>
    else if(loader === 'particles') return <VortexParticlesLoader {...loaderProps}/>
  }

  const activePreset = COLOR_PRESETS.find(
    (preset) => preset.name === selectedPreset
  );
  
  const loaderProps = {
     speed: 0.5,
      primaryColor: activePreset?activePreset.primaryColor: 'red',
      secondaryColor: activePreset?activePreset.secondaryColor: 'blue',
      progress: 0.1,
      isProgressMode: true,
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      {
        getLoader(activeLoader,loaderProps)
      }
    </Canvas>

  );
}

// function QuantumGyroLoader({ speed, primaryColor, secondaryColor, progress, isProgressMode }) {