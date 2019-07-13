import React from "react";
import omit from "lodash/omit";
import sample from "lodash/sample";
import sampleSize from "lodash/sampleSize";
import Curve from "../components/Curve";

const context = React.createContext();

let ids = [];
const Provider = ({ children }) => {
  const [nodes, setNodes] = React.useState({});
  const [edges, setEdges] = React.useState([]);

  function updateNode(id, data) {
    ids.push(id);
    setNodes(nodes => ({ ...nodes, [id]: data }));
  }

  function removeNode(id) {
    setNodes(nodes => omit(nodes, id));
    setEdges(edges => edges.filter(edge => edge[0] === id || edge[1] === id));
  }

  function createEdge(fromNode, toNode) {
    setEdges(edges => [...edges, [fromNode, toNode]]);
  }

  function removeEdge(fromNode, toNode) {
    setEdges(edges =>
      edges.filter(edge => edge[0] === fromNode && edge[1] === toNode)
    );
  }

  React.useEffect(() => {
    setTimeout(() => {
      createEdge(ids[2], ids[4]);
      createEdge(ids[9], ids[14]);
      createEdge(ids[16], ids[18]);
      createEdge(ids[20], ids[22]);
      createEdge(ids[24], ids[4]);
    }, 100);
  }, []);

  return (
    <context.Provider value={{ nodes, updateNode, removeNode }}>
      {edges.map(edge => {
        const start = nodes[edge[0]];
        const end = nodes[edge[1]];

        if (!start || !end) {
          return null;
        }

        return (
          <Curve
            startPoint={[start.x, start.y]}
            startDirection={start.direction}
            endPoint={[end.x, end.y]}
            endDirection={end.direction}
          />
        );
      })}
      {children}
    </context.Provider>
  );
};

export default Provider;
export { context };
