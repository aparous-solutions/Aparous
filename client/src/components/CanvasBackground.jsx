import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Grid, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Camera Scroll & Parallax Controller
function CameraController({ scrollProgress }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const p = scrollProgress;
    
    // Map scroll checkpoints to camera coordinates
    if (p < 0.15) {
      // Hero (centered core facing)
      const factor = p / 0.15;
      targetPos.current.set(0, 0, 8 - factor * 1.5);
      targetLook.current.set(0, 0, 0);
    } else if (p < 0.4) {
      // Services (shift camera left and slightly up)
      const factor = (p - 0.15) / 0.25;
      targetPos.current.set(-2.2 * factor, 0.6 * factor, 6.5 - factor * 0.8);
      targetLook.current.set(0.6 * factor, 0.1 * factor, 0);
    } else if (p < 0.65) {
      // Portfolio (orbit right and drop)
      const factor = (p - 0.4) / 0.25;
      targetPos.current.set(-2.2 + 5.0 * factor, 0.6 - 1.2 * factor, 5.7 + factor * 1.2);
      targetLook.current.set(0.6 - 1.2 * factor, -0.2 * factor, 0);
    } else if (p < 0.8) {
      // Dashboard (pull back for wide layout overlay)
      const factor = (p - 0.65) / 0.15;
      targetPos.current.set(2.8 - 2.8 * factor, -0.6 + 0.8 * factor, 6.9 + factor * 1.6);
      targetLook.current.set(-0.6 + 0.6 * factor, 0, 0);
    } else {
      // Timeline & Contact (epic core zoom)
      const factor = (p - 0.8) / 0.2;
      targetPos.current.set(0, -3.2 * factor, 8.5 - factor * 5.8);
      targetLook.current.set(0, -1.0 * factor, 0);
    }

    // Parallax mouse offsets
    const mouseX = state.pointer.x * 0.45;
    const mouseY = state.pointer.y * 0.45;

    const smoothPos = new THREE.Vector3(
      targetPos.current.x + mouseX,
      targetPos.current.y + mouseY,
      targetPos.current.z
    );

    // Apply interpolation for organic easing
    camera.position.lerp(smoothPos, delta * 2.8);

    // Lerp camera lookAt coordinate target
    const lookTarget = new THREE.Vector3().copy(targetLook.current);
    const lookCurrent = new THREE.Vector3(0, 0, 0);
    lookCurrent.lerp(lookTarget, delta * 2.8);
    camera.lookAt(lookCurrent);
  });

  return null;
}

// 3D Geometry Universe
function UniverseScene({ scrollProgress }) {
  const torusRef = useRef();
  const innerRef = useRef();
  const outerRingRef = useRef();

  useFrame((state, delta) => {
    // Spin rings and central octahedron
    if (torusRef.current) {
      torusRef.current.rotation.y += delta * 0.22;
      torusRef.current.rotation.x += delta * 0.08;
    }
    if (innerRef.current) {
      innerRef.current.rotation.z -= delta * 0.35;
      innerRef.current.rotation.y += delta * 0.12;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.12;
      outerRingRef.current.rotation.y -= delta * 0.18;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1.6} color="#a14fff" />
      <pointLight position={[-12, -12, -6]} intensity={1.2} color="#00f2fe" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#ffffff" />

      {/* Central APAROUS Core Symbol (Abstract Glass & Neon Torus Knot) */}
      <Float speed={2.2} floatIntensity={1.4} floatingRange={[-0.2, 0.2]}>
        <group>
          {/* Wireframe Glass core */}
          <mesh ref={innerRef}>
            <octahedronGeometry args={[0.75]} />
            <meshStandardMaterial 
              color="#00f2fe" 
              wireframe
              emissive="#00f2fe"
              emissiveIntensity={0.65}
            />
          </mesh>

          {/* Refractive Transmission Globe */}
          <mesh ref={torusRef}>
            <sphereGeometry args={[1.25, 32, 32]} />
            <MeshTransmissionMaterial
              transmission={1.0}
              roughness={0.15}
              thickness={1.6}
              ior={1.22}
              chromaticAberration={0.06}
              anisotropicBlur={0.12}
              color="#d8b4fe"
            />
          </mesh>

          {/* Orbital Tech Rings */}
          <mesh ref={outerRingRef} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[1.9, 0.035, 16, 100]} />
            <meshStandardMaterial 
              color="#a14fff" 
              metalness={0.9} 
              roughness={0.1} 
              emissive="#a14fff"
              emissiveIntensity={0.35}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.3, 0.015, 8, 64]} />
            <meshStandardMaterial color="#3b82f6" wireframe />
          </mesh>
        </group>
      </Float>

      {/* Floating Abstract Geometry Shapes */}
      <Float speed={1.4} floatIntensity={1.0}>
        <mesh position={[-3.6, 2.2, -2.5]} rotation={[1, 2, 3]}>
          <boxGeometry args={[0.45, 0.45, 0.45]} />
          <meshStandardMaterial color="#a14fff" metalness={0.9} roughness={0.1} wireframe />
        </mesh>
      </Float>
      <Float speed={1.6} floatIntensity={1.1}>
        <mesh position={[4.2, -1.9, -1.5]} rotation={[2, 0, 1]}>
          <coneGeometry args={[0.25, 0.55, 4]} />
          <meshStandardMaterial color="#00f2fe" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={1.8} floatIntensity={1.3}>
        <mesh position={[-3.0, -2.2, 1.2]} rotation={[0.4, 0.4, 0.4]}>
          <dodecahedronGeometry args={[0.35]} />
          <meshStandardMaterial color="#c084fc" wireframe />
        </mesh>
      </Float>

      {/* Grid Floor */}
      <Grid 
        position={[0, -2.8, 0]} 
        args={[60, 60]} 
        cellSize={1.2} 
        cellThickness={0.85} 
        cellColor="#3b0764" 
        sectionSize={6} 
        sectionThickness={1.4} 
        sectionColor="#0ea5e9" 
        fadeDistance={28} 
      />

      {/* Volumetric Stars and Fog */}
      <Stars radius={90} depth={45} count={3500} factor={4.5} saturation={0.65} fade speed={1.4} />
      <fog attach="fog" args={['#05020c', 4.5, 24]} />
      <CameraController scrollProgress={scrollProgress} />
    </>
  );
}

export default function CanvasBackground() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      setScrollProgress(window.scrollY / totalScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -2,
      pointerEvents: 'none',
      background: '#05020c',
    }}>
      <Canvas gl={{ antialias: true, alpha: false }} camera={{ fov: 60, near: 0.1, far: 45 }}>
        <color attach="background" args={['#05020c']} />
        <UniverseScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
