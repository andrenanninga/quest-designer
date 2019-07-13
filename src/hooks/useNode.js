import React from "react";
import nanoid from "nanoid";
import { context } from "../providers/Graph";

function useNode() {
  const { updateNode, removeNode } = React.useContext(context);
  const [id] = React.useState(nanoid(8));

  React.useEffect(() => {
    updateNode(id, {});

    return () => {
      removeNode(id);
    };
  }, []);

  function update(data) {
    updateNode(id, data);
  }

  return { id, update };
}

export default useNode;
