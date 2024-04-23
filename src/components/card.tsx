// ? Is there a way to get rid of the retail.retail.?
// * there is also a ticket for tours and lessons similar to a card

import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import TextureBackgrounds from "./texturebackgrounds"
import Remainder from "./remainder"
import { RetailCardType } from "../types/retail"

function Name(props) {
  return (
    <div className="badge">
      <h5 className="capitalize">{props.name}</h5>
    </div>
  )
}

// ? are these used in south lake?
function Badges(props) {

  // TODO: deal with multiple
  // console.log(props);
  if (props.discount) {
    return (
      <div className="badge">
        {/* // TODO: deal with color */}
        <h5 className="capitalize mullen">{props.discount}% off</h5>
      </div>
    )
  } else if (props.inflatable) {
    return (
      <Name name="inflatable" />
    )
  } else if (props.demo) {
    return (
      <Name name="demo" />
    )
  } else {
    return null
  }
}

// TODO: cardType
const Card = (retail: RetailCardType) => {

  // console.log(retail)
  if (retail.retail.cutout.alternativeText === null) {
    console.warn(`${retail.retail.title} by ${retail.retail.brand.slug} doesnt have altText`)
  }

  return (
    <article
      key={retail.retail.id}
      className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <Link
          to={`/retail/${retail.retail.type}/${retail.retail.brand.slug}/${retail.retail.slug}`}
          className="image-link"
        >
          <GatsbyImage
            image={retail.retail.cutout?.localFile?.childImageSharp?.gatsbyImageData}
            alt={retail.retail.cutout?.alternativeText || retail.retail.title + ' by ' + retail.retail.brand.slug}
            className="cutout"
            objectFit="contain"
          // TODO: this has been causing some problems but keep an eye on it
          />
        </Link>
        <Badges
          // ? i could just pass everything and deal with it then?
          inflatable={retail.retail.inflatable}
          demo={retail.retail.demo}
          discount={retail.retail.discount}
        />
      </div>
      {/* // ? does this need a brand */}
      <h4 className="card__title">
        <Link to={`/retail/${retail.retail.type}/${retail.retail.brand.slug}/${retail.retail.slug}`}>
          {retail.retail.title}
        </Link>
      </h4>
      <hr />
      <p>{retail.retail.excerpt}</p>
      <hr />
      <div className="card__details">
        <h4>
          <Remainder inches={retail.retail.length} />
          long by {retail.retail.width}" wide
        </h4>
        <h5 className="capitalize">Capacity {retail.retail.capacity}&thinsp;lbs</h5>
      </div>
    </article>
  )
}

export default Card
