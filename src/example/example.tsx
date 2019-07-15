import React from "react";
import ReactDOM from "react-dom";
import "./example.scss";
import { Resizer } from "lib/Resizer";
import Avocode from "images/avocode.png";

export const App: React.FC = () => (
  <div className="container">
    <Resizer
      minWidth={100}
      minHeight={100}
      handleStyle={{ bottom: { display: "flex" } }}
      handleContent={{
        bottom: <div style={{ backgroundColor: "blue", width: "100%", height: 5, margin: "auto" }} />
      }}
      handleEnabled={{ bottom: true, bottomRight: true }}
    >
      <div className="avocode-box" />
    </Resizer>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
