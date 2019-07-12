import React from "react";
import { useSpring, config, animated } from "react-spring";
import { useGesture } from "react-use-gesture";
import { add } from "vec-la";

const GestureContext = React.createContext();

const Provider = ({ children }) => {
  if (!process.browser) {
    return null;
  }

  const [locked, lock] = React.useState(false);
  const [{ world }, setWorld] = useSpring(() => ({
    world: [0, 0]
  }));

  const bind = useGesture(
    {
      onDrag: ({ delta, last, first, temp = world.getValue() }) => {
        if (!locked && !first && !last) {
          setWorld({
            world: add(temp, delta),
            config: { mass: 0.1, ...config.stiff }
          });
        }
        return temp;
      }
    },
    {
      event: {
        passive: false,
        capture: false
      }
    }
  );

  const value = {
    lock,
    world
  };

  return (
    <GestureContext.Provider value={value}>
      <div {...bind()}>
        {children}
        <div className="absolute p-2 font-mono bg-gray-200 right-0 top-0 flex flex-col">
          <animated.div>
            {world.interpolate((x, y) => `${~~x}, ${~~y}`)}
          </animated.div>
        </div>
      </div>
    </GestureContext.Provider>
  );
};

export default Provider;
export { GestureContext };
