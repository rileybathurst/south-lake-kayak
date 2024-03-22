// TODO: this is so simple it can be inline?

import * as React from "react"

const Danger = (props: { svg: string; }) => {
  const svg = (props.svg);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default Danger
