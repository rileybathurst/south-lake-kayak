// ! I havent got this sorted Im not sure how often I need it in this format

import * as React from "react"
import { Link } from 'gatsby';



/*
Weights

Kayaks generally have a riggedweight and hullweight
although some only have hullweight
sup generally have a hullweight only

if we have both riggedweight and hullweight show both but often there is only a hullweight
if we have neither

*/

if (props.hullWeight && props.riggedWeight) {
  return (
    <>
      <h2>Hull Weight {props.hullWeight}
        <span className="spec__unit">&thinsp;{props.unit}</span>
      </h3>
      <h2>Rigged Weight</h2>
      <h3>{props.rigged}
        <span className="spec__unit">&thinsp;{props.unit}</span>
      </h3>
    </div >
    </>
  )
} else if (props.hullWeight) {
  return (
    <div className="spec">
      


const Weight = (props) => {
  return (
      <>
        <div className="spec">
          <h2>Hull Weight</h2>
          <h3>
            {props.spec}
            <span className="spec__unit">&thinsp;{props.unit}</span>
          </h3>
        </div>
        <div className="spec">
          <h2>Rigged Weight</h2>
          <h3>{props.rigged}
            <span className="spec__unit">&thinsp;{props.unit}</span>
          </h3>
        </div>
      </>
      )
}

      export default Weight
