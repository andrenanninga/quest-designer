import React from "react";
import * as d3 from "d3-shape";
import getBounds from "svg-path-bounds";
import { dist, scale, add } from "vec-la";

const DIR = {
  right: [1, 0],
  left: [-1, 0],
  up: [0, -1],
  down: [0, 1]
};

const Curve = ({ startPoint, startDirection, endPoint, endDirection }) => {
  const line = d3.line().curve(d3.curveCatmullRom.alpha(1));

  const distance = dist(startPoint, endPoint);
  const pull = distance / 10;

  const points = [
    startPoint,
    add(startPoint, scale(DIR[startDirection], pull)),
    add(endPoint, scale(DIR[endDirection], pull)),
    endPoint
  ];

  const path = line(points);
  const bounds = getBounds(path);

  const margin = 10;

  const left = bounds[0] - margin;
  const top = bounds[1] - margin;
  const width = bounds[2] - bounds[0] + margin * 2;
  const height = bounds[3] - bounds[1] + margin * 2;

  return (
    <svg
      className="absolute"
      style={{
        top,
        left,
        width,
        height
      }}
      viewBox={`${left} ${top} ${width} ${height}`}
    >
      <path fill="none" stroke="#C3DAFE" strokeWidth={4} d={path} />
    </svg>
  );
};

export default Curve;
