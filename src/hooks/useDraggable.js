import React from "react";
import { useSpring, config } from "react-spring";
import { useGesture } from "react-use-gesture";
import { add } from "vec-la";
import { GestureContext } from "../providers/Gesture";

function useDraggable(initial = [0, 0]) {
  const { lock } = React.useContext(GestureContext);
  const [active, setActive] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [{ xy: spring }, set] = useSpring(() => ({ xy: initial }));

  const bind = useGesture(
    {
      onHover: ({ hovering }) => setHover(hovering),
      onDragStart: () => {
        lock(true);
        setActive(true);
      },
      onDrag: ({ delta, temp = spring.getValue() }) => {
        set({ xy: add(delta, temp), config: { mass: 0.1, ...config.stiff } });
        return temp;
      },
      onDragEnd: () => {
        lock(false);
        setActive(false);
      }
    },
    {
      event: {
        passive: true,
        capture: false
      }
    }
  );

  return { spring, bind, active, hover };
}

export default useDraggable;
