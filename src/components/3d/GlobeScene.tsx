'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Landmark dots on globe surface (lat/long → 3D)
const LANDMARKS = [
    { name: 'Delhi', lat: 28.6, lon: 77.2 },
    { name: 'Mumbai', lat: 19.1, lon: 72.9 },
    { name: 'Jaipur', lat: 26.9, lon: 75.8 },
    { name: 'Kerala', lat: 10.8, lon: 76.3 },
    { name: 'Goa', lat: 15.3, lon: 74.1 },
    { name: 'Varanasi', lat: 25.3, lon: 83.0 },
    { name: 'Manali', lat: 32.2, lon: 77.2 },
    { name: 'Kolkata', lat: 22.6, lon: 88.4 },
];

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}

function LandmarkDot({ lat, lon }: { lat: number; lon: number }) {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 2 + lat) * 0.3);
        }
    });
    const pos = latLonToVec3(lat, lon, 1.52);
    return (
        <mesh ref={ref} position={pos}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2} />
        </mesh>
    );
}

function OrbitRing({ radius, tilt, color, speed }: { radius: number; tilt: number; color: string; speed: number }) {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.z = clock.getElapsedTime() * speed;
        }
    });
    const geometry = useMemo(() => new THREE.TorusGeometry(radius, 0.003, 8, 120), [radius]);
    return (
        <mesh ref={ref} rotation={[tilt, 0, 0]} geometry={geometry}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.5} />
        </mesh>
    );
}

function Globe() {
    const globeRef = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        if (globeRef.current) {
            globeRef.current.rotation.y = clock.getElapsedTime() * 0.12;
        }
    });

    return (
        <group>
            {/* Core globe */}
            <Sphere ref={globeRef} args={[1.5, 32, 32]}>
                <MeshDistortMaterial
                    color="#1a0040"
                    emissive="#3b0a8a"
                    emissiveIntensity={0.3}
                    distort={0.08}
                    speed={1.5}
                    roughness={0.6}
                    metalness={0.4}
                    wireframe={false}
                />
            </Sphere>

            {/* Wireframe overlay */}
            <Sphere args={[1.51, 16, 16]}>
                <meshStandardMaterial
                    color="#9333ea"
                    emissive="#9333ea"
                    emissiveIntensity={0.2}
                    wireframe
                    transparent
                    opacity={0.15}
                />
            </Sphere>

            {/* Glow sphere */}
            <Sphere args={[1.65, 16, 16]}>
                <meshStandardMaterial
                    color="#7c3aed"
                    emissive="#7c3aed"
                    emissiveIntensity={0.05}
                    transparent
                    opacity={0.06}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* Orbit rings */}
            <OrbitRing radius={1.9} tilt={0.4} color="#9333ea" speed={0.3} />
            <OrbitRing radius={2.1} tilt={-0.6} color="#ec4899" speed={-0.2} />
            <OrbitRing radius={2.35} tilt={1.0} color="#f59e0b" speed={0.15} />

            {/* Landmark dots */}
            {LANDMARKS.map(l => (
                <LandmarkDot key={l.name} lat={l.lat} lon={l.lon} />
            ))}
        </group>
    );
}

export function GlobeScene() {
    return (
        <div className="w-full h-full" style={{ minHeight: 500 }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#c084fc" />
                <pointLight position={[-10, -5, -10]} intensity={0.8} color="#f472b6" />
                <pointLight position={[0, 0, 8]} intensity={0.5} color="#60a5fa" />
                <Stars radius={80} depth={50} count={3000} factor={3} saturation={0.5} fade speed={0.5} />
                <Globe />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
            </Canvas>
        </div>
    );
}
