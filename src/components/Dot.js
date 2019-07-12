import React from "react";

const Dot = ({ position, cardPosition }) => {
  const ref = React.useRef();
  React.useEffect(() => {
    if (ref.current && cardPosition) {
      const rect = ref.current.getBoundingClientRect();

      console.log(
        rect.x,
        rect.y,
        rect.x - cardPosition[0],
        rect.y - cardPosition[1]
      );
    }
  }, [ref, cardPosition]);

  return (
    <div
      ref={ref}
      className={`flex border-2 border-indigo-500 bg-white rounded-lg w-4 h-4 absolute cursor-pointer justify-center items-center`}
      onMouseDownCapture={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
      style={{
        left: position === "left" ? "-1.5rem" : "auto",
        right: position === "right" ? "-1.5rem" : "auto"
      }}
    >
      <div className={`w-2 h-2 rounded-full bg-indigo-200`} />
    </div>
  );
};

export default Dot;
