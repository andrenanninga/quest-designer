import React from "react";

function useBounds() {
  const ref = React.useRef();
  const [bounds, setBounds] = React.useState({});

  React.useLayoutEffect(() => {
    function update() {
      if (ref.current) {
        setBounds(ref.current.getBoundingClientRect());
      }
      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, [ref]);

  return { ref, bounds };
}

export default useBounds;
