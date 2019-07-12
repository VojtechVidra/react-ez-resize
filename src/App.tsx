import React from "react";
import { Resizer } from "./lib/Resizer";
import Avocode from "images/avocode.png";

export const App: React.FC = () => {
  return (
    <div className="App">
      <div style={{ maxWidth: 1200, margin: "auto" }}>
        <Resizer
          minWidth={100}
          minHeight={100}
          handleStyle={{ bottom: { display: "flex" } }}
          handleContent={{
            bottom: <div style={{ backgroundColor: "red", width: "100%", height: 5, margin: "auto" }} />
          }}
        >
          <div
            style={{
              backgroundImage: `url(${Avocode})`,
              backgroundColor: "#c1f784",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "100%"
            }}
          />
        </Resizer>
      </div>
    </div>
  );
};
