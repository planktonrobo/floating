import React from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
const popBox = () => {
  const ref = useRef();
  const [clicked, setClicked] = useState(false);
  useFrame((state) => {
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime) / 8;
    ref.current.position.z = THREE.MathUtils.lerp(
      ref.current.position.z,
      clicked ? 1 : 0,
      0.1
    );
  });
  return (
    <mesh ref={ref} onClick={() => setClicked(!clicked)}>
      <boxGeometry />
      <meshBasicMaterial color="orange" />
    </mesh>
  );
};

export default popBox;
