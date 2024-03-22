import * as React from "react"

function Breadcrumbs(props) {
  if (props.breadcrumbs) {
    return (
      <div className="breadcrumbs">
        <p>breadcrumbs</p>
      </div>
    )
  } else {
    return null
  }
}

const SEOcase = (props) => {
  return (
    <>
      {process.env.NODE_ENV === "development" ? (
        <section className="SEOcase">
          <p>title = {props.title}</p>
          <p>description = {props.description}</p>
          <p>image = {props.image}</p>

          <Breadcrumbs />
        </section>
      ) : null}
    </>
  )
}

export default SEOcase
