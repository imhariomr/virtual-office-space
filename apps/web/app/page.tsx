"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

// Single Desk with Chair and Computer
function Desk({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  // const texture = useTexture("/floor.jpg"); 
  return (
    <group position={position}>
      {/* Desk */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.3, 1.5]} />
        <meshStandardMaterial color="#fd8834ff" />
      </mesh>

      {/* Computer Monitor */}
      <mesh position={[0, 1.5, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.6, 0.1]} />
        <meshStandardMaterial color="#ff3b3bff" />
      </mesh>
      <mesh position={[0, 1.2, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      {/* Chair */}
      <mesh position={[0, 0.5, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0, 1, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.1, 0.6]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
    </group>
  );
}

// Floor
function Floor() {
  const texture = useTexture("/floor.jpg");
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 30]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// Virtual Office: generate a grid of desks
function Office() {
  const desks = [];
  const rows = 4; // number of rows
  const cols = 6; // number of columns
  const spacingX = 6;
  const spacingZ = 4;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      desks.push(<Desk key={`${i}-${j}`} position={[j * spacingX - (cols-1)*spacingX/2, 0, i * spacingZ - (rows-1)*spacingZ/2]} />);
    }
  }

  return <group>{desks}</group>;
}

// Main Scene
export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        shadows
        camera={{ position: [0, 25, 30], fov: 60 }}
        style={{ background: "#f0f0f0" }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight
          color={"#fff8e7"}
          intensity={1}
          position={[20, 30, 20]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Controls */}
        <OrbitControls target={[0, 0, 0]} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />

        {/* Floor */}
        <Floor />

        {/* Office Desks */}
        <Office />
      </Canvas>
    </div>
  );
}
