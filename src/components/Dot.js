import React from "react";
import useNode from "../hooks/useNode";
import useBounds from "../hooks/useBounds";

const Dot = ({ style = {}, direction = "down" }) => {
  const { ref, bounds } = useBounds();
  const { update } = useNode();

  React.useEffect(() => {
    update({
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2,
      direction
    });
  }, [bounds]);

  return (
    <div
      ref={ref}
      className={`flex border-2 border-indigo-500 bg-white rounded-lg w-4 h-4 absolute cursor-pointer justify-center items-center`}
      onMouseDownCapture={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
      style={style}
    >
      <div className={`w-2 h-2 rounded-full bg-indigo-200`} />
    </div>
  );
};

export default Dot;
