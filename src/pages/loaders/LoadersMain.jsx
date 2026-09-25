import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Copy, 
  Check, 
  Code2, 
  Sparkles, 
  Layers, 
  Sliders, 
  Maximize2, 
  RefreshCw,
  Sun,
  Activity,
  Palette,
  Eye,
  Info
} from 'lucide-react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Center } from '@react-three/drei';

const COLOR_PRESETS = [
  { name: 'Cyber Neon', primary: '#06b6d4', secondary: '#ec4899', accent: '#3b82f6', bg: '#050714' },
  { name: 'Emerald Flux', primary: '#10b981', secondary: '#6ee7b7', accent: '#047857', bg: '#03120e' },
  { name: 'Solar Flame', primary: '#f97316', secondary: '#facc15', accent: '#ef4444', bg: '#140803' },
  { name: 'Electric Violet', primary: '#8b5cf6', secondary: '#c084fc', accent: '#6366f1', bg: '#090514' },
  { name: 'Hyper Matrix', primary: '#22c55e', secondary: '#a3e635', accent: '#15803d', bg: '#020d06' },
  { name: 'Monochrome Luxe', primary: '#f8fafc', secondary: '#94a3b8', accent: '#475569', bg: '#09090b' },
];

const LOADER_PRESETS = [
  {
    id: 'rings',
    name: 'Quantum Gyroscope',
    category: 'Orbital Dynamics',
    description: 'Triple nested gimbal rings rotating along harmonic Euler axes with counter-orbiting telemetry beads.',
    componentName: 'QuantumGyroLoader',
  },
  {
    id: 'geosphere',
    name: 'Morphing Geo-Core',
    category: 'Wireframe Lattice',
    description: 'Dodecahedron with vertex displacement and floating inner crystalline nucleus responding to progress.',
    componentName: 'GeoCoreLoader',
  },
  {
    id: 'cubes',
    name: 'Kinetic Matrix Swarm',
    category: 'Algorithmic Array',
    description: 'Floating volumetric grid of micro-cubes undulating in continuous sine-wave harmonic propagation.',
    componentName: 'KineticMatrixLoader',
  },
  {
    id: 'torus',
    name: 'Infinity Knot Flow',
    category: 'Topological Curve',
    description: 'Interwoven Torus Knot with radiant iridescent wireframe geometry and pulsating orbital tracer.',
    componentName: 'InfinityKnotLoader',
  },
  {
    id: 'particles',
    name: 'Cyber Vortex Particles',
    category: 'Particle Physics',
    description: 'Spiral galaxy vortex funnel with outward stellar dispersion and center singularity pulse.',
    componentName: 'VortexParticlesLoader',
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
      currentPos[i3 + 1] = Math.sin(t + radii[i] * 3) * 0.35 + (Math.sin(angles[i]) * 0.3);
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

function SceneContent({ activeLoader, speed, primaryColor, secondaryColor, particleCount, progress, isProgressMode, bloomIntensity }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[-4, -4, -4]} intensity={0.6} color={secondaryColor} />
      <pointLight position={[0, 0, 0]} intensity={bloomIntensity * 1.5} color={primaryColor} />

      <Center>
        <Float speed={speed * 1.5} rotationIntensity={0.4} floatIntensity={0.5}>
          {activeLoader === 'rings' && (
            <QuantumGyroLoader
              speed={speed}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              progress={progress}
              isProgressMode={isProgressMode}
            />
          )}
          {activeLoader === 'geosphere' && (
            <GeoCoreLoader
              speed={speed}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              progress={progress}
              isProgressMode={isProgressMode}
            />
          )}
          {activeLoader === 'cubes' && (
            <KineticMatrixLoader
              speed={speed}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              progress={progress}
              isProgressMode={isProgressMode}
            />
          )}
          {activeLoader === 'torus' && (
            <InfinityKnotLoader
              speed={speed}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              progress={progress}
              isProgressMode={isProgressMode}
            />
          )}
          {activeLoader === 'particles' && (
            <VortexParticlesLoader
              speed={speed}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              particleCount={particleCount}
              progress={progress}
              isProgressMode={isProgressMode}
            />
          )}
        </Float>
      </Center>

      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={9}
        makeDefault
      />
    </>
  );
}

function generateCodeSnippet(loaderId, primaryColor, secondaryColor, speed) {
  if (loaderId === 'rings') {
    return `import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

export function QuantumGyroLoader({ speed = ${speed}, primary = '${primaryColor}', secondary = '${secondaryColor}' }) {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((_, delta) => {
    if (ring1.current) { ring1.current.rotation.x += delta * speed * 1.2; ring1.current.rotation.y += delta * speed * 0.8; }
    if (ring2.current) { ring2.current.rotation.y += delta * speed * 1.5; ring2.current.rotation.z += delta * speed * 1.0; }
    if (ring3.current) { ring3.current.rotation.z += delta * speed * 1.8; }
  });

  return (
    <group>
      <mesh ref={ring1}><torusGeometry args={[2.0, 0.045, 24, 100]} /><meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.7} metalness={0.8} /></mesh>
      <mesh ref={ring2} scale={0.78}><torusGeometry args={[2.0, 0.04, 24, 100]} /><meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.8} /></mesh>
      <mesh ref={ring3} scale={0.58}><torusGeometry args={[2.0, 0.04, 24, 100]} /><meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.9} /></mesh>
      <mesh><sphereGeometry args={[0.35, 32, 32]} /><meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={2.0} /></mesh>
    </group>
  );
}

// Usage:
// <Canvas><ambientLight /><directionalLight position={[5,5,5]} /><QuantumGyroLoader /></Canvas>`;
  }

  if (loaderId === 'geosphere') {
    return `import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

export function GeoCoreLoader({ speed = ${speed}, primary = '${primaryColor}', secondary = '${secondaryColor}' }) {
  const outer = useRef();
  const inner = useRef();

  useFrame((state, delta) => {
    if (outer.current) outer.current.rotation.x += delta * speed * 0.8;
    if (inner.current) {
      inner.current.rotation.y -= delta * speed * 1.5;
      const breathe = Math.sin(state.clock.elapsedTime * speed * 3) * 0.08;
      inner.current.scale.setScalar(0.6 + breathe);
    }
  });

  return (
    <group>
      <mesh ref={outer}><icosahedronGeometry args={[1.7, 1]} /><meshStandardMaterial color={primary} wireframe emissive={primary} emissiveIntensity={0.7} transparent opacity={0.85} /></mesh>
      <mesh ref={inner}><octahedronGeometry args={[0.8, 0]} /><meshStandardMaterial color="#ffffff" emissive={secondary} emissiveIntensity={2.0} /></mesh>
    </group>
  );
}`;
  }

  if (loaderId === 'cubes') {
    return `import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

export function KineticMatrixLoader({ speed = ${speed}, primary = '${primaryColor}', secondary = '${secondaryColor}' }) {
  const group = useRef();
  const cubes = useMemo(() => {
    const list = [];
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++)
          list.push({ pos: [x * 0.85, y * 0.85, z * 0.85], dist: Math.sqrt(x*x + y*y + z*z) });
    return list;
  }, []);

  return (
    <group ref={group}>
      {cubes.map((c, i) => (
        <mesh key={i} position={c.pos}>
          <boxGeometry args={[0.26, 0.26, 0.26]} />
          <meshStandardMaterial color={i % 2 === 0 ? primary : secondary} emissive={primary} emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}`;
  }

  return `// ${loaderId} Component Code\nimport { Canvas } from '@react-three/fiber';\n// Import your custom 3D shader or mesh loader components directly.`;
}

export default function LoadersMain() {
  const [activeLoader, setActiveLoader] = useState('rings');
  const [speed, setSpeed] = useState(1.0);
  const [particleCount, setParticleCount] = useState(600);
  const [bloomIntensity, setBloomIntensity] = useState(1.2);
  const [primaryColor, setPrimaryColor] = useState('#06b6d4');
  const [secondaryColor, setSecondaryColor] = useState('#ec4899');
  const [themeBg, setThemeBg] = useState('#050714');
  const [isProgressMode, setIsProgressMode] = useState(false);
  const [progress, setProgress] = useState(42);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('models'); // 'models' | 'tuning' | 'presets'

  // Automatic simulated progress simulator
  useEffect(() => {
    if (!isProgressMode || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return Math.min(100, prev + 1);
      });
    }, 60 / speed);
    return () => clearInterval(interval);
  }, [isProgressMode, isPlaying, speed]);

  const handleCopyCode = () => {
    const code = generateCodeSnippet(activeLoader, primaryColor, secondaryColor, speed);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (preset) => {
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
    setThemeBg(preset.bg);
  };

  const currentPresetInfo = LOADER_PRESETS.find((p) => p.id === activeLoader);

  return (
    <div 
      className="relative w-full h-screen overflow-hidden flex flex-col font-sans select-none"
      style={{ backgroundColor: themeBg, color: '#f8fafc' }}
    >
      {/* Top Header Navigation */}
      <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between backdrop-blur-md bg-black/30 z-20">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-fuchsia-500 p-[2px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              R3F Loader Studio
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                v2.4
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">Interactive Three.js & React-Three-Fiber 3D Loader Suite</p>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="flex items-center space-x-3">
          {/* Progress Mode Toggle */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1 text-xs">
            <button
              onClick={() => setIsProgressMode(false)}
              className={`px-3 py-1 rounded-md transition-all font-medium ${
                !isProgressMode ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Infinite Loop
            </button>
            <button
              onClick={() => setIsProgressMode(true)}
              className={`px-3 py-1 rounded-md transition-all font-medium ${
                isProgressMode ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Simulate 0-100%
            </button>
          </div>

          {/* Export Code Modal Trigger */}
          <button
            onClick={() => setShowCodeModal(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition"
          >
            <Code2 className="w-4 h-4" />
            <span className="hidden sm:inline">Inspect Code</span>
          </button>
        </div>
      </header>

      {/* Main Viewport & Canvas Area */}
      <div className="relative flex-1 w-full h-full flex overflow-hidden">
        {/* Central 3D Interactive Canvas */}
        <div className="relative flex-1 h-full w-full">
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <SceneContent
                activeLoader={activeLoader}
                speed={isPlaying ? speed : 0}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                particleCount={particleCount}
                progress={progress}
                isProgressMode={isProgressMode}
                bloomIntensity={bloomIntensity}
              />
            </Suspense>
          </Canvas>

          {/* Canvas Floating Overlay Controls */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 max-w-xs pointer-events-none">
            <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl p-3.5 shadow-xl pointer-events-auto">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                {currentPresetInfo?.category}
              </span>
              <h2 className="text-sm font-semibold text-white mt-0.5">{currentPresetInfo?.name}</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{currentPresetInfo?.description}</p>
            </div>

            {/* Simulated Progress Live HUD */}
            {isProgressMode && (
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-xl pointer-events-auto flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Loading State</span>
                  <span className="text-fuchsia-400 font-bold">{progress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <button 
                    onClick={() => setProgress(0)}
                    className="hover:text-white flex items-center gap-1 transition"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                  <button 
                    onClick={() => setProgress(100)}
                    className="hover:text-white flex items-center gap-1 transition"
                  >
                    <Check className="w-3 h-3" /> Complete
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Floating Playback Controls (Bottom-Center) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-slate-950/75 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-2xl">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              title={isPlaying ? 'Pause Motion' : 'Play Motion'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>
            <div className="h-4 w-px bg-white/20 mx-1" />
            <button
              onClick={() => {
                setSpeed(1.0);
                setProgress(0);
              }}
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition"
              title="Reset Speed & Position"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400 px-2">
              {(speed).toFixed(1)}x
            </span>
          </div>

          {/* Hint Overlay */}
          <div className="absolute bottom-3 right-4 text-[11px] text-slate-500 flex items-center gap-1.5 pointer-events-none hidden sm:flex">
            <Eye className="w-3.5 h-3.5" />
            <span>Click & drag to rotate • Scroll to zoom</span>
          </div>
        </div>

        <aside className="w-80 border-l border-white/10 bg-slate-950/90 backdrop-blur-xl flex flex-col z-20 shrink-0 overflow-y-auto">
          {/* Tab Selection */}
          <div className="grid grid-cols-3 border-b border-white/10 text-xs font-medium">
            <button
              onClick={() => setActiveTab('models')}
              className={`py-3 flex flex-col items-center gap-1 border-b-2 transition ${
                activeTab === 'models'
                  ? 'border-cyan-400 text-cyan-400 bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Loaders</span>
            </button>
            <button
              onClick={() => setActiveTab('tuning')}
              className={`py-3 flex flex-col items-center gap-1 border-b-2 transition ${
                activeTab === 'tuning'
                  ? 'border-cyan-400 text-cyan-400 bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Tuning</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`py-3 flex flex-col items-center gap-1 border-b-2 transition ${
                activeTab === 'presets'
                  ? 'border-cyan-400 text-cyan-400 bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Palettes</span>
            </button>
          </div>

          <div className="p-4 space-y-6 flex-1">
            {/* TAB 1: 3D Loader Models Selection */}
            {activeTab === 'models' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    3D Archetypes
                  </span>
                  <span className="text-[11px] text-cyan-400 font-mono">5 Styles</span>
                </div>
                <div className="space-y-2">
                  {LOADER_PRESETS.map((preset) => {
                    const isSelected = activeLoader === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => setActiveLoader(preset.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1 ${
                          isSelected
                            ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                            : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`text-sm font-semibold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                            {preset.name}
                          </span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                        </div>
                        <span className="text-[11px] text-slate-400 line-clamp-1">{preset.category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: Dynamic Parameters & Fine Tuning */}
            {activeTab === 'tuning' && (
              <div className="space-y-5">
                {/* Speed Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Rotation Speed</span>
                    <span className="text-cyan-400 font-mono">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                  />
                </div>

                {/* Glow & Emissive Intensity */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Core Emissive Glow</span>
                    <span className="text-cyan-400 font-mono">{bloomIntensity.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3.5"
                    step="0.1"
                    value={bloomIntensity}
                    onChange={(e) => setBloomIntensity(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                  />
                </div>

                {/* Particle Count (For vortex) */}
                {activeLoader === 'particles' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">Particle Density</span>
                      <span className="text-cyan-400 font-mono">{particleCount}</span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="1200"
                      step="50"
                      value={particleCount}
                      onChange={(e) => setParticleCount(parseInt(e.target.value))}
                      className="w-full accent-cyan-400 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                    />
                  </div>
                )}

                {/* Custom Color Pickers */}
                <div className="pt-2 border-t border-white/10 space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                    Color Modulation
                  </span>
                  
                  <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="text-xs text-slate-300">Primary Tone</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
                      />
                      <span className="text-xs font-mono uppercase text-slate-400">{primaryColor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="text-xs text-slate-300">Secondary Accent</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
                      />
                      <span className="text-xs font-mono uppercase text-slate-400">{secondaryColor}</span>
                    </div>
                  </div>
                </div>

                {/* Manual progress scrub if progress mode is active */}
                {isProgressMode && (
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">Progress Position</span>
                      <span className="text-fuchsia-400 font-mono">{progress}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={(e) => setProgress(parseInt(e.target.value))}
                      className="w-full accent-fuchsia-400 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'presets' && (
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Studio Lighting Palettes
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 transition group text-left"
                    >
                      <div>
                        <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                          {preset.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full border border-black/40" style={{ backgroundColor: preset.primary }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-black/40" style={{ backgroundColor: preset.secondary }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-black/40" style={{ backgroundColor: preset.bg }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Copy Snippet Button at bottom of sidebar */}
          <div className="p-4 border-t border-white/10 bg-slate-950">
            <button
              onClick={handleCopyCode}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Component Copied!' : 'Copy Active R3F Component'}
            </button>
          </div>
        </aside>
      </div>

      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-slate-900 border border-white/15 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-white">
                  R3F Component Snippet • {currentPresetInfo?.name}
                </h3>
              </div>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-md hover:bg-white/10 transition"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-4 flex-1 overflow-auto bg-slate-950 text-slate-300 font-mono text-xs leading-relaxed">
              <pre className="whitespace-pre">
                {generateCodeSnippet(activeLoader, primaryColor, secondaryColor, speed)}
              </pre>
            </div>

            <div className="px-5 py-3 border-t border-white/10 bg-slate-900/60 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                Ready for `@react-three/fiber` & Three.js projects
              </span>
              <button
                onClick={handleCopyCode}
                className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}