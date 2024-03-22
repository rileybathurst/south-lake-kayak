import * as React from "react"
import { Link } from "gatsby"

import Sport from "./sport";

const More = (props) => {
  // cant do a default length as it counts kayaks and paddleboards
  // console.log(props.retail.length);
  let typeLength = 0;
  // check which are kayaks and only add those to a new length
  /*   props.retail.map(retail => {
  
      if (retail.type === props.type) {
        // TODO: I think this is the key issue
        // console.log('we got a kayak'); // 28 is all the times this happens
        typeLength = typeLength + 1;
        // console.log(typeLength);
      }
  
    }); */

  props.retail.forEach(retail => {
    if (retail.type === props.type) {
      typeLength = typeLength + 1;
    }
  });

  if (typeLength > 4) {

    return (
      <section className="passage">
        <h3 className='capitalize'>
          <Link to={props.slug}>
            All {typeLength} {props.brand} <Sport sport={`${props.type}s`} />
          </Link>
        </h3>
        <hr />
      </section>
    )
  } else {
    // console.log('less');
    return null;
  }
}

export default More
