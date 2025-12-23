import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Phone({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + (rotation?.[1] || 0);
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Phone body */}
      <RoundedBox args={[1.2, 2.4, 0.15]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      {/* Screen */}
      <RoundedBox args={[1.05, 2.1, 0.02]} radius={0.08} position={[0, 0, 0.08]}>
        <meshStandardMaterial color="#0a2647" metalness={0.1} roughness={0.8} emissive="#0a2647" emissiveIntensity={0.3} />
      </RoundedBox>
      {/* UPI Logo indicator */}
      <mesh position={[0, 0.5, 0.1]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#f5a623" emissive="#f5a623" emissiveIntensity={0.5} />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.3} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function QRCode({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const qrPattern = useMemo(() => {
    const pattern = [];
    const seed = 42; // Fixed seed for consistent pattern
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // Simple deterministic pattern
        if ((i + j + seed) % 3 !== 0) {
          pattern.push({ x: i * 0.12 - 0.42, y: j * 0.12 - 0.42 });
        }
      }
    }
    return pattern;
  }, []);

  return (
    <group position={position} ref={groupRef}>
      {/* QR Base */}
      <RoundedBox args={[1.2, 1.2, 0.05]} radius={0.05}>
        <meshStandardMaterial color="#ffffff" />
      </RoundedBox>
      {/* QR Pattern */}
      {qrPattern.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, 0.03]}>
          <boxGeometry args={[0.1, 0.1, 0.02]} />
          <meshStandardMaterial color="#0a2647" />
        </mesh>
      ))}
      {/* Corner markers */}
      {[[-0.38, 0.38], [0.38, 0.38], [-0.38, -0.38]].map(([x, y], i) => (
        <mesh key={`corner-${i}`} position={[x, y, 0.03]}>
          <boxGeometry args={[0.2, 0.2, 0.02]} />
          <meshStandardMaterial color="#0a2647" />
        </mesh>
      ))}
      {/* Canara Bank logo center */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.25, 0.25, 0.02]} />
        <meshStandardMaterial color="#f5a623" />
      </mesh>
    </group>
  );
}

function FloatingRupee({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Rupee symbol as a golden coin */}
      <mesh>
        <cylinderGeometry args={[0.25, 0.25, 0.05, 32]} />
        <meshStandardMaterial color="#f5a623" emissive="#f5a623" emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* ₹ symbol embossed */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.12, 32]} />
        <meshStandardMaterial color="#d4920a" />
      </mesh>
    </group>
  );
}

function SuccessIndicator() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[2.2, 1.2, 0]}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
        </mesh>
        {/* Checkmark indicator */}
        <mesh position={[0, 0, 0.25]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

function PaymentParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(60);
    for (let i = 0; i < 60; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = (Math.random() - 0.5) * 4;
      positions[i + 2] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={20}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#f5a623" transparent opacity={0.6} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#f5a623" />
      <pointLight position={[0, -3, 3]} intensity={0.3} color="#0a2647" />

      {/* Customer Phone */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Phone position={[-2.2, 0.3, 0]} rotation={[0, 0.3, 0]} />
      </Float>

      {/* QR Code */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <QRCode position={[0, -0.2, 0.5]} />
      </Float>

      {/* Merchant Device */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Phone position={[2.2, 0.3, 0]} rotation={[0, -0.3, 0]} />
      </Float>

      {/* Floating Rupee Symbols */}
      <FloatingRupee position={[-1, 1.8, 0.5]} delay={0} />
      <FloatingRupee position={[1, 2, -0.5]} delay={1} />
      <FloatingRupee position={[0, 1.5, 1]} delay={2} />

      {/* Success Indicator */}
      <SuccessIndicator />

      {/* Background particles */}
      <PaymentParticles />

      <Environment preset="city" />
    </>
  );
}

export default function PaymentScene3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}