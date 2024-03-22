import React from "react";
import Remainder from "./remainder";

// I looked at adapting this to remove the names and think it gets over complicated
// https://gist.github.com/rileybathurst/2c3191a7714e1204b07c725104d4ab93

function Spec(props: {
  name: string;
  spec: string | number | boolean;
  unit?: string;
  unitPlace?: string;
  unitSpace?: string;
}) {
  if (props.name === 'length' || props.name === 'width') {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3><Remainder inches={props.spec} /></h3>
      </div>
    );
  } else if ((props.spec) && (props.unitPlace == "before")) {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3 className="spec-flex unit-place__before">
          <span className="specification">{props.spec}</span>&thinsp;
          <span className="unit">{props.unit}</span>
        </h3>
      </div>
    );
  } else if (props.spec === true) {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3>Yes</h3>
      </div>
    );
  } else if (props.spec) {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3>
          {props.spec}
          <span className="spec__unit">&thinsp;{props.unit}</span>
        </h3>
      </div>
    );
  } else {
    return null;
  }
}

export default Spec;