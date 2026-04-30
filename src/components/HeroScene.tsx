import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Points,
  PointMaterial,
  Environment,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ---------------------------------------------------------------------------
// Particles – drift gently in the direction the cursor points
// ---------------------------------------------------------------------------
function Particles({
  count = 800,
  mouse,
}: {
  count?: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Points>(null);
  const smoothMouse = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 1.5;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    // Smooth the mouse position
    smoothMouse.current.x = lerp(smoothMouse.current.x, mouse.current.x, 0.04);
    smoothMouse.current.y = lerp(smoothMouse.current.y, mouse.current.y, 0.04);

    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.05 + smoothMouse.current.x * 0.3;
    ref.current.rotation.x = t * 0.03 - smoothMouse.current.y * 0.25;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ff6a1a"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// ---------------------------------------------------------------------------
// CoreObject – the icosahedron + rings, all mouse-interactive
// ---------------------------------------------------------------------------
function CoreObject({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  // Smoothed values live here so they persist across frames
  const smooth = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    // Spring-smooth the raw mouse
    smooth.current.x = lerp(smooth.current.x, mouse.current.x, 0.06);
    smooth.current.y = lerp(smooth.current.y, mouse.current.y, 0.06);

    const sx = smooth.current.x;
    const sy = smooth.current.y;

    // Core group follows cursor with auto-rotation bias
    group.current.rotation.y = t * 0.18 + sx * 0.7;
    group.current.rotation.x = sy * 0.45;

    // Inner mesh spins independently
    if (mesh.current) {
      mesh.current.rotation.z = t * 0.12;
    }

    // Rings tilt toward the cursor for a parallax feel
    if (ring1.current) {
      ring1.current.rotation.x = Math.PI / 2 + sy * 0.4;
      ring1.current.rotation.y = sx * 0.35;
    }
    if (ring2.current) {
      ring2.current.rotation.x = Math.PI / 3 + sy * 0.5;
      ring2.current.rotation.y = Math.PI / 4 + sx * 0.45;
    }
  });

  return (
    <group ref={group}>
      {/* Inner aluminum core */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#a8a39a" metalness={1} roughness={0.18} />
      </mesh>

      {/* Outer agentic shell */}
      <Float speed={1.4} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh scale={1.55}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#ff6a1a"
            wireframe
            distort={0.45}
            speed={2.2}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>

      {/* Glow ring 1 */}
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.008, 16, 120]} />
        <meshBasicMaterial color="#ff6a1a" />
      </mesh>

      {/* Glow ring 2 */}
      <mesh ref={ring2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.4, 0.006, 16, 120]} />
        <meshBasicMaterial color="#a8a39a" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Camera rig – slight parallax shift that follows the cursor
// ---------------------------------------------------------------------------
function CameraRig({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();
  const smooth = useRef({ x: 0, y: 0 });
  const base = new THREE.Vector3(0, 0, 6);

  useFrame(() => {
    smooth.current.x = lerp(smooth.current.x, mouse.current.x, 0.05);
    smooth.current.y = lerp(smooth.current.y, mouse.current.y, 0.05);

    camera.position.x = base.x + smooth.current.x * 0.4;
    camera.position.y = base.y + smooth.current.y * 0.3;
    camera.position.z = base.z;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ---------------------------------------------------------------------------
// Scene root
// ---------------------------------------------------------------------------
function Scene() {
  const mouse = useRef({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
  };

  return (
    <div className="absolute inset-0" onPointerMove={onMove}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ff8a3a" />
        <directionalLight position={[-5, -3, -2]} intensity={0.6} color="#a8a39a" />
        <pointLight position={[0, 0, 4]} intensity={2} color="#ff6a1a" distance={8} />

        <CameraRig mouse={mouse} />
        <CoreObject mouse={mouse} />
        <Particles mouse={mouse} />
        <Environment preset="warehouse" />
      </Canvas>
    </div>
  );
}

export default Scene;
