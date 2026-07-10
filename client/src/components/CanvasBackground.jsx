import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Custom GLSL Wave Shader Material Configuration
const WaveShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uColorTrough: { value: new THREE.Color('#3b0764') }, // Deep purple
    uColorCrest: { value: new THREE.Color('#00f2fe') },  // Neon cyan
  },
  vertexShader: `
    uniform float uTime;
    uniform float uScroll;
    varying vec3 vPosition;
    varying float vWaveHeight;

    void main() {
      vPosition = position;
      vec3 pos = position;
      
      // Calculate dual-frequency organic sine wave heights
      float wave1 = sin(pos.x * 0.12 + uTime * 0.7) * cos(pos.y * 0.12 + uTime * 0.7) * 0.75;
      float wave2 = sin(pos.x * 0.25 - uTime * 0.4) * sin(pos.y * 0.25 + uTime * 0.4) * 0.35;
      
      // Integrate scroll progress into wave speed/height dynamics
      float scrollInfluence = uScroll * 0.8;
      pos.z += (wave1 + wave2) * (1.0 + scrollInfluence);
      vWaveHeight = wave1 + wave2;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColorTrough;
    uniform vec3 uColorCrest;
    varying vec3 vPosition;
    varying float vWaveHeight;

    void main() {
      // Normalize wave height coordinates (range approx -1.1 to 1.1) to factor blends
      float mixFactor = (vWaveHeight + 1.1) / 2.2;
      mixFactor = clamp(mixFactor, 0.0, 1.0);
      vec3 color = mix(uColorTrough, uColorCrest, mixFactor);

      // Smooth radial distance fade out (fog)
      float distanceToCenter = length(vPosition.xy);
      float opacityFade = 1.0 - smoothstep(8.0, 24.0, distanceToCenter);

      gl_FragColor = vec4(color, opacityFade * 0.65);
    }
  `
};

// R3F Custom Wave Mesh component
function MorphingGrid({ scrollProgress }) {
  const meshRef = useRef();
  
  // Memoize custom shader uniforms
  const uniforms = useMemo(() => {
    return THREE.UniformsUtils.clone(WaveShaderMaterial.uniforms);
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    uniforms.uTime.value = elapsed;
    uniforms.uScroll.value = scrollProgress;
    
    // Wave mesh slow rotation drift
    if (meshRef.current) {
      meshRef.current.rotation.z = elapsed * 0.02;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      rotation={[-Math.PI / 2.1, 0, 0]} 
      position={[0, -2.4, 0]}
    >
      <planeGeometry args={[45, 45, 60, 60]} />
      <shaderMaterial
        vertexShader={WaveShaderMaterial.vertexShader}
        fragmentShader={WaveShaderMaterial.fragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

// Camera Path Controller
function CameraController({ scrollProgress }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0.5, 7.5));
  const targetLook = useRef(new THREE.Vector3(0, -0.5, 0));

  useFrame((state, delta) => {
    const p = scrollProgress;

    // Directing the virtual camera path over the morphing digital ocean
    if (p < 0.15) {
      // Hero (overview)
      const factor = p / 0.15;
      targetPos.current.set(0, 0.5, 7.5 - factor * 1.2);
      targetLook.current.set(0, -0.5, 0);
    } else if (p < 0.4) {
      // Services (glide left and tilt up)
      const factor = (p - 0.15) / 0.25;
      targetPos.current.set(-2.0 * factor, 1.2 * factor, 6.3 - factor * 0.6);
      targetLook.current.set(0.5 * factor, -0.2 * factor, 0);
    } else if (p < 0.65) {
      // Portfolio (orbit right and drop camera)
      const factor = (p - 0.4) / 0.25;
      targetPos.current.set(-2.0 + 4.5 * factor, 1.2 - 1.8 * factor, 5.7 + factor * 0.8);
      targetLook.current.set(0.5 - 1.0 * factor, -0.6 * factor, 0);
    } else if (p < 0.8) {
      // Dashboard Showcase (recenter, pull back for full display layout)
      const factor = (p - 0.65) / 0.15;
      targetPos.current.set(2.5 - 2.5 * factor, -0.6 + 1.2 * factor, 6.5 + factor * 1.5);
      targetLook.current.set(-0.5 + 0.5 * factor, -0.3 * factor, 0);
    } else {
      // Contact Form (epic zoom into the neon horizon)
      const factor = (p - 0.8) / 0.2;
      targetPos.current.set(0, -2.2 * factor, 8.0 - factor * 5.2);
      targetLook.current.set(0, -1.8 * factor, 0);
    }

    // Parallax mouse offsets
    const mouseX = state.pointer.x * 0.4;
    const mouseY = state.pointer.y * 0.4;

    const smoothPos = new THREE.Vector3(
      targetPos.current.x + mouseX,
      targetPos.current.y + mouseY,
      targetPos.current.z
    );

    // Damped camera interpolation
    camera.position.lerp(smoothPos, delta * 2.5);

    // Damped camera target coordinates
    const lookTarget = new THREE.Vector3().copy(targetLook.current);
    const lookCurrent = new THREE.Vector3(0, -0.5, 0);
    lookCurrent.lerp(lookTarget, delta * 2.5);
    camera.lookAt(lookCurrent);
  });

  return null;
}

// 3D Scene Assembly
function SceneAssembly({ scrollProgress }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 15, 5]} intensity={1.5} color="#a14fff" />
      <pointLight position={[-10, -5, -5]} intensity={1.2} color="#00f2fe" />

      {/* Cosmic morphing digital wave grid */}
      <MorphingGrid scrollProgress={scrollProgress} />

      {/* Floating neon light nodes */}
      <Stars radius={80} depth={40} count={2800} factor={4.5} saturation={0.5} fade speed={1.2} />
      <fog attach="fog" args={['#05020c', 4, 20]} />
      
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
      <Canvas gl={{ antialias: true, alpha: false }} camera={{ fov: 60, near: 0.1, far: 40 }}>
        <color attach="background" args={['#05020c']} />
        <SceneAssembly scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
