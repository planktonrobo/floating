import Head from "next/head";
import Image from "next/image";
import * as THREE from "three";
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

function Coin({ z }) {
  const { nodes, materials } = useGLTF("/coin3-transformed.glb");
  const ref = useRef();
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state) => {
    ref.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.001),
      (data.rZ += 0.001)
    );
    ref.current.position.set(data.x * width, (data.y += 0.002), z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });
  return (
    <group ref={ref} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 10]}>
          <mesh
            geometry={nodes.Coin_SmothGold_0_1.geometry}
            material={materials.SmothGold}
          />
          <mesh
            geometry={nodes.Coin_SmothGold_0_2.geometry}
            material={materials.Gold}
          />
        </group>
      </group>
    </group>
  );
}

export default function Home({ count = 50, depth = 80 }) {
  return (
    <>
      <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 100, fov: 15 }}>
        <color attach="background" args={["#ef224b"]} />
        <ambientLight intensity={0.2} />
        <Suspense fallback={null}>
          <spotLight position={[10, 10, 10]} intensity={0.5} />
          {Array.from({ length: count }, (_, i) => (
            <Coin key={i} z={(-i / count) * depth - 20} />
          ))}
          <Environment preset="sunset" />
          <EffectComposer>
            <DepthOfField
              target={[0, 0, depth / 2]}
              bokehScale={1.1}
              focalLength={0.5}
              height={700}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <div className="overlay">
        
       
          <h1>inKind </h1>
       

        <h2>Growth funding for top restaurant operators</h2>
        <a href="https://inkind.com">
          <button>Check us out</button>
        </a>
      </div>
    </>
  );
}
