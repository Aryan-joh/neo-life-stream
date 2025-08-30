import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { Sector } from './ActivitySector';

interface HolographicChartProps {
  data: Sector[];
}

interface BarProps {
  position: [number, number, number];
  height: number;
  color: string;
  label: string;
  value: number;
}

const HolographicBar: React.FC<BarProps> = ({ position, height, color, label, value }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  const getColorHex = (colorName: string) => {
    const colorMap = {
      purple: '#8B5CF6',
      cyan: '#06D6A0',
      magenta: '#FF006E',
      blue: '#3B82F6',
      green: '#10B981'
    };
    return colorMap[colorName as keyof typeof colorMap] || '#8B5CF6';
  };

  const colorHex = getColorHex(color);

  return (
    <group position={position}>
      {/* Main Bar */}
      <mesh ref={meshRef} position={[0, height / 2, 0]}>
        <boxGeometry args={[0.6, height, 0.6]} />
        <meshPhongMaterial 
          color={colorHex} 
          transparent 
          opacity={0.8}
          emissive={colorHex}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Glow Effect */}
      <mesh ref={glowRef} position={[0, height / 2, 0]}>
        <boxGeometry args={[0.8, height + 0.2, 0.8]} />
        <meshBasicMaterial 
          color={colorHex} 
          transparent 
          opacity={0.1}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.2}
        color={colorHex}
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {label}
      </Text>

      {/* Value */}
      <Text
        position={[0, height + 0.3, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {`${Math.floor(value / 60)}h ${value % 60}m`}
      </Text>
    </group>
  );
};

const GridFloor: React.FC = () => {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper 
        args={[10, 20, '#8B5CF6', '#8B5CF6']} 
        position={[0, -1, 0]}
      />
      <mesh position={[0, -1.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial 
          color="#8B5CF6" 
          transparent 
          opacity={0.05}
        />
      </mesh>
    </group>
  );
};

const Scene: React.FC<{ data: Sector[] }> = ({ data }) => {
  if (!data.length) return null;

  const maxTime = Math.max(...data.map(s => s.totalTime));
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#8B5CF6" />
      <pointLight position={[-10, 10, -10]} intensity={0.6} color="#06D6A0" />
      <pointLight position={[0, 20, 0]} intensity={0.4} color="#FF006E" />

      {/* Grid Floor */}
      <GridFloor />

      {/* Bars */}
      {data.map((sector, index) => {
        const normalizedHeight = (sector.totalTime / maxTime) * 3;
        const xPos = (index - (data.length - 1) / 2) * 2;
        
        return (
          <HolographicBar
            key={sector.id}
            position={[xPos, 0, 0]}
            height={normalizedHeight}
            color={sector.color}
            label={sector.name.split(' ')[0]} // First word only for space
            value={sector.totalTime}
          />
        );
      })}

      {/* Title */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Today's Activity Distribution
      </Text>

      {/* Orbit Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={1}
        maxPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={15}
      />
    </>
  );
};

export const HolographicChart: React.FC<HolographicChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden glass-panel border border-neon-purple/30">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene data={data} />
      </Canvas>
    </div>
  );
};