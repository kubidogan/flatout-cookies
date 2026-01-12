import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import { useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";

function Cookie3D({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={[0, 0, 0]}>
      {/* Cookie body */}
      <mesh
        position={[0, 0, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.15 : 1}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[1.5, 1.5, 0.3, 32]} />
        <meshStandardMaterial color="#D2691E" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Chocolate chips */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={i} position={[x, 0.16, z]} castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#4A2511" />
          </mesh>
        );
      })}

      {/* Center chip */}
      <mesh position={[0, 0.16, 0]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#3D1F0F" />
      </mesh>

      {/* Inner chips */}
      {[...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const radius = 0.4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={`inner-${i}`} position={[x, 0.16, z]} castShadow>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#4A2511" />
          </mesh>
        );
      })}
    </group>
  );
}

function FloatingText() {
  return (
    <Text
      position={[0, 2.5, 0]}
      fontSize={0.4}
      color="#FF6B35"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor="#FFFFFF"
    >
      Click the Cookie!
    </Text>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="text-white text-xl font-bold">Loading 3D Scene...</div>
    </Html>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleCookieClick = () => {
    setClicked(true);
    setTimeout(() => {
      navigate("/shop");
    }, 500);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200">
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate
            autoRotateSpeed={0.5}
          />

          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#FFE4B5" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
          />

          {/* 3D Content */}
          <Cookie3D onClick={handleCookieClick} />
          <FloatingText />

          {/* Ground */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -2, 0]}
            receiveShadow
          >
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#F5DEB3" roughness={0.8} />
          </mesh>
        </Suspense>
      </Canvas>

      {/* Overlay content */}
      <div className="absolute top-8 left-0 right-0 text-center pointer-events-none">
        <h1 className="text-6xl md:text-7xl font-bold text-primary-800 font-display drop-shadow-lg">
          FlatOut Cookies
        </h1>
        <p className="text-xl md:text-2xl text-primary-700 mt-4">
          The Ultimate Cookie Experience
        </p>
      </div>

      {/* Instruction */}
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
        <p className="text-lg text-primary-600 font-semibold animate-bounce">
          ↑ Rotate and click the cookie to enter ↑
        </p>
      </div>

      {/* Transition overlay */}
      {clicked && (
        <div className="absolute inset-0 bg-primary-600 animate-fade-in" />
      )}
    </div>
  );
}
