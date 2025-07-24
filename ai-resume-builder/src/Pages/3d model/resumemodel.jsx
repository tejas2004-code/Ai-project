import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { VideoTexture } from 'three';
import videosrc from '../../assets/tp.mp4'; // Path to your video file

export function ResumeModel() {
  const groupRef = useRef(null);
  const meshRef = useRef(null);
  const video = document.createElement('video');
  video.src = videosrc;
  video.load();
  video.play();
  video.loop = true; 
  const videoTexture = new THREE.VideoTexture(video);

  useFrame((state) => {
    if (groupRef.current && meshRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

  
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main resume paper */}
      <mesh ref={meshRef} scale={[2, 2.5, 0.1]} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#1E40AF"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={2}
        />

        {/* Front page content with video */}
        <mesh position={[0, 0, 0.6]} scale={[1.8, 1.8, 1.1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={videoTexture} />
        </mesh>

    

        {/* Glowing edges */}
        <mesh position={[0, 0, 0]} scale={[2.02, 2.02, 2.02]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#60A5FA"
            emissive="#60A5FA"
            emissiveIntensity={0.3}
            transparent
            opacity={0.1}
          />
        </mesh>
      </mesh>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.random() * 4 - 2,
            Math.random() * 4 - 2,
            Math.random() * 4 - 2
          ]}
          scale={0.05}
        >
          <sphereGeometry />
          <meshStandardMaterial
            color="#60A5FA"
            emissive="#60A5FA"
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  );
}
