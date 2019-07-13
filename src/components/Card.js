import React from "react";
import { useSpring, animated, interpolate, config } from "react-spring";
import { css } from "astroturf";
import classnames from "classnames";
import useDraggable from "../hooks/useDraggable";
import Dot from "./Dot";
import Label from "./Label";

css`
  .card {
    @apply w-64;
    @apply flex;
    @apply flex-col;
    @apply rounded-lg;
    @apply border-2;
    @apply absolute;
    @apply bg-white;
    @apply cursor-move;
    @apply shadow-xl;
    @apply border-gray-300;
  }
`;

const Card = ({ text, actor, input, outputs, wide, xy }) => {
  const { spring, active, hover, bind } = useDraggable(xy);
  const ref = React.useRef();

  React.useLayoutEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    console.log(rect);
  }, [ref]);

  return (
    <animated.div
      ref={ref}
      className={classnames([
        "card",
        { "z-20": active },
        { "border-indigo-500": hover || active }
      ])}
      style={{
        transform: interpolate(spring, (x, y) => `translate(${x}px, ${y}px)`),
        transition: "border-color .2s ease-in-out",
        width: wide ? "20rem" : "16rem"
      }}
      {...bind()}
    >
      {actor || text ? (
        <div className="p-4 border-b">
          {actor ? (
            <span className="text-gray-600 text-sm italic ">{actor}</span>
          ) : null}
          <p className="text-base text-gray-800 leading-normal">{text}</p>
        </div>
      ) : null}
      <div className="flex justify-between items-start p-4 py-2 bg-gray-100 rounded-lg">
        <div className="items-center relative flex py-1">
          <Dot direction="left" style={{ left: "-1.5rem" }} />
          <Label>{input}</Label>
        </div>
        <div className="flex flex-col">
          {outputs.map(output => (
            <div className="items-center justify-end relative flex py-1">
              <Dot direction="right" style={{ right: "-1.5rem" }} />
              <Label>{output}</Label>
            </div>
          ))}
        </div>
      </div>
    </animated.div>
  );
};

Card.defaultProps = {
  input: "",
  outputs: ["Accept", "Decline"]
};

const DialogueCard = ({ text, actor, input, outputs, wide, xy }) => {
  const { spring, active, hover, bind } = useDraggable(xy);

  return (
    <animated.div
      className={classnames([
        "card",
        { "z-20": active },
        { "border-indigo-500": hover || active }
      ])}
      style={{
        transform: interpolate(spring, (x, y) => `translate(${x}px, ${y}px)`),
        transition: "border-color .2s ease-in-out",
        width: "20rem"
      }}
      {...bind()}
    >
      <div
        className="absolute"
        style={{
          top: "-.5rem",
          left: "calc(50% - 1rem)"
        }}
      >
        <Dot direction="up" />
      </div>
      <div className="flex">
        {actor ? (
          <span
            className={classnames([
              "font-bold",
              "text-xs",
              "text-white",
              "rounded-lg",
              "px-2",
              "py-1",
              "absolute",
              "bg-yellow-500",
              { "bg-green-500": actor === "Player" }
            ])}
            style={{
              top: "-.8rem",
              right: actor === "Player" ? "auto" : "1rem",
              left: actor !== "Player" ? "auto" : "1rem"
            }}
          >
            {actor}
          </span>
        ) : null}
        <span className="absolute font-serif top-0 left-0 mx-1 text-gray-500 text-3xl">
          “
        </span>
        <textarea
          type="text"
          className="text-base p-4 rounded-lg text-gray-800 leading-normal flex-1 resize-none italic"
          defaultValue={text}
          readOnly
        />
        <span className="absolute font-serif right-0 bottom-0 mx-1 -my-4 text-gray-500 text-3xl">
          ”
        </span>
      </div>
      <div
        className="absolute"
        style={{
          bottom: ".5rem",
          left: "calc(50% - 1rem)"
        }}
      >
        <Dot direction="down" />
      </div>
    </animated.div>
  );
};

const ChoiceCard = ({ outputs, ...props }) => (
  <Card input="" wide outputs={outputs} {...props} />
);

export default Card;

export { DialogueCard, ChoiceCard };
