import * as React from "react"

import Card from "./card";

const OtherBrand = (props) => {
  let any = [];

  props.nodes.forEach(element => {
    element.retail.forEach(retail => {
      if (retail.type === props.type) {
        any.push(retail);
      };
    });
  });

  if (any.length !== 0) {
    return (
      <div>
        <section className="passage">
          <h2>
            Additional Paddleboards
          </h2>
          <hr />
        </section >
        <div className='deck'>
          {any.map((retail) => {
            return (
              <div key={retail.id}>
                <Card retail={retail} />
              </div>
            )
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default OtherBrand