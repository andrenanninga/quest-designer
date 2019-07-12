import React from "react";
import Helmet from "react-helmet";
import GestureProvider from "../src/providers/Gesture";
import { DialogueCard, ChoiceCard } from "../src/components/Card";
import Canvas from "../src/components/Canvas";
import Curve from "../src/components/Curve";

import "../src/styles/index.css";

const Index = () => {
  return (
    <>
      <Helmet />
      <GestureProvider>
        <Canvas>
          <Curve
            startPoint={[202, 132]}
            startDirection="down"
            endPoint={[402, 222]}
            endDirection="left"
          />
          <Curve
            startPoint={[718, 249]}
            startDirection="right"
            endPoint={[952, 202]}
            endDirection="up"
          />
          <Curve
            startPoint={[952, 282]}
            startDirection="down"
            endPoint={[952, 372]}
            endDirection="up"
          />
          <Curve
            startPoint={[952, 452]}
            startDirection="down"
            endPoint={[952, 542]}
            endDirection="up"
          />
          <Curve
            startPoint={[952, 622]}
            startDirection="down"
            endPoint={[402, 222]}
            endDirection="left"
          />

          <DialogueCard text="What am I to do?" actor="Cook" xy={[50, 50]} />
          <ChoiceCard
            outputs={[
              "What's wrong?",
              "Can you make me a cake?",
              "You don't look very happy",
              "nice hat!"
            ]}
            xy={[400, 200]}
          />
          <DialogueCard
            text="You're a cook, why don't you bake me a cake?"
            actor="Player"
            xy={[800, 200]}
          />
          <DialogueCard
            text="*sniff* don't talk to me about cakes..."
            actor="Cook"
            xy={[800, 370]}
          />
          <DialogueCard text="What's wrong?" actor="Player" xy={[800, 540]} />
        </Canvas>
      </GestureProvider>
    </>
  );
};

export default Index;
