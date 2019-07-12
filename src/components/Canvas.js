import React from "react";
import { animated } from "react-spring";
import { GestureContext } from "../providers/Gesture";

const Canvas = ({ children }) => {
  const { world } = React.useContext(GestureContext);

  return (
    <div className="overflow-hidden w-screen h-screen relative">
      <animated.div
        className="absolute"
        style={{
          transform: world.interpolate(
            (x, y) => `translate(
              ${(x % 60) - 60}px,
              ${(y % 60) - 60}px)`
          ),
          width: "calc(100vw + 120px)",
          height: "calc(100vh + 120px)",
          backgroundSize: "60px 60px",
          backgroundImage:
            "radial-gradient(circle at center, #CBD5E0 2px, rgba(0, 0, 0, 0) 2px)"
        }}
      />
      <animated.div
        className={`border-4 border-red-700 bg-white rounded-full w-8 h-8 absolute cursor-pointer`}
        style={{
          transform: world.interpolate(
            (x, y) => `translate(
              ${Math.min(Math.max(x, 0), window.innerWidth) - 16}px,
              ${Math.min(Math.max(y, 0), window.innerHeight) - 16}px)`
          )
        }}
      />
      <animated.div
        style={{
          transform: world.interpolate((x, y) => `translate(${x}px,${y}px)`)
        }}
      >
        {children}
      </animated.div>
    </div>
  );
};

export default Canvas;
