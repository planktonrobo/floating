import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const sinBox = () => {
  function Box() {
    const ref = useRef();
    useFrame((state) => {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime) / 2;
    });
    return (
      <mesh ref={ref}>
        <boxGeometry />
      </mesh>
    );
  }
  return <div></div>;
};

export default sinBox;
