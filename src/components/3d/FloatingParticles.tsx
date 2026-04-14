'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 1800 }: { count?: number }) {
    const mesh = useRef<THREE.Points>(null!);

    const [positions, speeds] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const spd = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 40;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
            spd[i] = 0.02 + Math.random() * 0.04;
        }
        return [pos, spd];
    }, [count]);

    useFrame(({ clock }) => {
        if (!mesh.current) return;
        const t = clock.getElapsedTime();
        const pos = mesh.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
            pos[i * 3 + 1] += speeds[i] * 0.15;
            if (pos[i * 3 + 1] > 15) pos[i * 3 + 1] = -15;
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;
        mesh.current.rotation.y = t * 0.015;
        mesh.current.rotation.x = Math.sin(t * 0.008) * 0.05;
    });

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [positions]);

    return (
        <points ref={mesh} geometry={geometry}>
            <pointsMaterial
                size={0.055}
                color="#c084fc"
                transparent
                opacity={0.65}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

export function FloatingParticles() {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ alpha: true, antialias: false }}
                style={{ background: 'transparent' }}
            >
                <Particles count={1800} />
            </Canvas>
        </div>
    );
}
