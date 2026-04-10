import React, { useRef, useMemo, Component, ErrorInfo, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const DataRiver = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 4000;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const t = Math.random();
        const z = -200 + t * 220; // from deep background to front
        // curve the river slightly
        const cx = Math.sin(z * 0.05) * 3;
        const x = cx + (Math.random() - 0.5) * 8 * Math.pow((1.1 - t), 1.5);
        const y = Math.random() * 1.5 - 2; 
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;
    }
    return pos;
  }, [particleCount]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const time = clock.getElapsedTime();
        for(let i = 0; i < particleCount; i++) {
            positions[i*3+2] += 0.8; // Flow speed
            if(positions[i*3+2] > 20) {
               // wrap around to the back
               positions[i*3+2] = -200;
            }
            // sine wave motion
            const cx = Math.sin(positions[i*3+2] * 0.05 + time * 0.5) * 3;
            const xOffset = Math.sin(i * 999.0) * 8; // random static seed
            // narrow at distance, wide near camera
            const spread = Math.pow(Math.abs(-200 - positions[i*3+2]) / 220, 1.5) + 0.1;

            positions[i*3] = cx + xOffset * spread;
            // Wave on Y axis to simulate liquid flow
            positions[i*3+1] = (Math.sin(i * 123 + time) * 0.5) - 2;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.3} color="#00ffff" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </points>
  );
};

// Represents a stylized analytical tower
const DataNode = ({ position, rotation, scale, glowColor }: any) => {
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);
    
    useFrame(({ clock }) => {
        if (materialRef.current) {
            // subtle breathing pulse
            const pulse = Math.sin(clock.getElapsedTime() * 1.5 + position[0]) * 0.2 + 0.8;
            materialRef.current.emissiveIntensity = pulse;
        }
    });

    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Base Tier */}
            <mesh position={[0, 1, 0]}>
                <boxGeometry args={[4, 2, 4]} />
                <meshStandardMaterial color="#050314" roughness={0.7} metalness={0.9} />
            </mesh>
            {/* Mid Tier Glassy */}
            <mesh position={[0, 3, 0]}>
                <boxGeometry args={[3.5, 2, 3.5]} />
                <meshStandardMaterial color="#0d0a2b" transparent opacity={0.6} roughness={0.1} />
            </mesh>
            {/* Core glowing orb inside mid tier */}
            <mesh position={[0, 3, 0]}>
                <sphereGeometry args={[1.2, 16, 16]} />
                <meshStandardMaterial ref={materialRef} emissive={glowColor} emissiveIntensity={2} color="#ffffff" />
            </mesh>
            {/* Top Spire */}
            <mesh position={[0, 6, 0]}>
                <cylinderGeometry args={[0, 1.5, 4, 4]} />
                <meshStandardMaterial color="#0b081c" roughness={0.5} metalness={0.5} />
            </mesh>
            
            {/* Bridge connection line towards the central river */}
            {position[0] < 0 ? (
                <mesh position={[3, 1.5, 0]} rotation={[0, 0, -0.2]}>
                    <boxGeometry args={[6, 0.2, 1]} />
                    <meshStandardMaterial emissive="#00ffff" emissiveIntensity={2} color="#ffffff" />
                </mesh>
            ) : (
                <mesh position={[-3, 1.5, 0]} rotation={[0, 0, 0.2]}>
                    <boxGeometry args={[6, 0.2, 1]} />
                    <meshStandardMaterial emissive="#ff00ff" emissiveIntensity={2} color="#ffffff" />
                </mesh>
            )}
        </group>
    );
};

const NodeRing = () => {
    // Array of nodes symmetrically aligned to form a majestic path
    const nodes = [];
    const depthSpacing = 40;
    
    for (let i = 0; i < 6; i++) {
        const z = -20 - (i * depthSpacing);
        // Left
        nodes.push(<DataNode key={`L${i}`} position={[-15, -2, z]} rotation={[0, Math.PI / 6, 0]} scale={1 - (i*0.05)} glowColor="#00f0ff" />);
        // Right
        nodes.push(<DataNode key={`R${i}`} position={[15, -2, z]} rotation={[0, -Math.PI / 6, 0]} scale={1 - (i*0.05)} glowColor="#ff00ff" />);
    }

    return <group>{nodes}</group>;
};

// Magical Floating Particles replicating soft cherry blossom/spirit atmosphere but AI themed
const MagicalAtmosphere = () => {
    return (
        <>
            <Sparkles count={500} scale={[100, 50, 150]} size={4} speed={0.4} opacity={0.5} color="#d4b4f5" />
            <Sparkles count={200} scale={[100, 50, 150]} size={6} speed={0.2} opacity={0.8} color="#00ffff" />
            
            {/* Massive floating orbs in the deep background representing cloud concepts */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[-20, 10, -50]}>
                <mesh>
                    <icosahedronGeometry args={[8, 0]} />
                    <meshStandardMaterial color="#050314" wireframe />
                </mesh>
            </Float>
             <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} position={[25, 15, -80]}>
                <mesh>
                    <icosahedronGeometry args={[12, 0]} />
                    <meshStandardMaterial color="#080424" wireframe />
                </mesh>
            </Float>
        </>
    );
}

const GalaxyBackground = () => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (groupRef.current) {
            // Very slow aesthetic rotation simulating a vast, living galaxy
            groupRef.current.rotation.y -= 0.0005;
            groupRef.current.rotation.x += 0.0002;
            groupRef.current.rotation.z -= 0.0003;
        }
    });

    return (
        <group ref={groupRef}>
             <Stars radius={100} depth={100} count={5000} factor={5} saturation={0} fade speed={1} />
             {/* Additional colored stellar dust/galaxies deep in the background */}
             <Stars radius={150} depth={50} count={2000} factor={8} saturation={1} fade speed={2} />
             <Stars radius={120} depth={80} count={3000} factor={6} saturation={0.5} fade speed={1.5} />
        </group>
    );
}

const CameraRig = () => {
    const { camera, pointer } = useThree();
    const vec = new THREE.Vector3();
    
    useFrame(() => {
        // Subtle cinematic drift tied to pointer, simulating slow heavy camera
        const targetX = pointer.x * 4;
        const targetY = pointer.y * 3 + 2;
        
        vec.set(targetX, targetY, 15);
        camera.position.lerp(vec, 0.02);
        camera.lookAt(0, 0, -40); // Looking deep into the illuminated matrix tunnel
    });
    return null;
}

class SceneErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ThreeJS Scene crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/20 text-white z-50 p-10 overflow-auto">
          <pre className="bg-black/80 p-4 rounded text-sm text-red-300 max-w-4xl max-h-screen whitespace-pre-wrap">
            {this.state.error?.toString()}
            {"\n"}
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export const LandingScene = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#050314] z-0 pointer-events-none">
      <SceneErrorBoundary>
        <Canvas
          camera={{ position: [0, 2, 15], fov: 60 }}
          dpr={[1, 2]} // Optimize performance vs quality
          gl={{ powerPreference: "high-performance", antialias: false }}
        >
          <color attach="background" args={['#050314']} />
          {/* Thick, heavy fog dissolving symmetrical structures smoothly into the distance */}
          <fog attach="fog" args={['#050314', 15, 120]} />
          
          <ambientLight intensity={0.4} color="#8a5ebd" />
          <directionalLight position={[0, 20, 10]} intensity={2} color="#150a3b" />
          <spotLight position={[-10, 20, -10]} intensity={10} color="#00ffff" penumbra={1} angle={1} />
          <spotLight position={[10, 10, -20]} intensity={10} color="#ff00ff" penumbra={1} angle={1} />

          <NodeRing />
          <DataRiver />
          <MagicalAtmosphere />
          <GalaxyBackground />
          
          {/* Soft ground reflection plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
              <planeGeometry args={[400, 400]} />
              <meshStandardMaterial color="#02010a" roughness={0.2} metalness={0.9} />
          </mesh>

          {/* 
          <EffectComposer disableNormalPass>
             <Bloom 
                luminanceThreshold={0.5} 
                luminanceSmoothing={0.9} 
                intensity={1.5} 
                mipmapBlur 
              />
          </EffectComposer> 
          */}

          <CameraRig />
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
};
