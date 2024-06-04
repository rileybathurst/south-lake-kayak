import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import WaterTexture from "../images/watertexture";
import { useStrapiTextures } from "../hooks/use-strapi-textures"

function Paddler({ sport }: CompositionTypes) {

  const data = useStaticQuery(graphql`
  query {
    kayaker: strapiImagegrab(title: {eq: "kayaker"}) {
      title
      image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }

    supper: strapiImagegrab(title: {eq: "supper"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `)

  if (sport === "paddleboard") {
    return <GatsbyImage
      image={data.supper.image.localFile.childImageSharp.gatsbyImageData}
      alt={data.supper.title}
      className='img__wrapped paddler'
    />
  }

  return <GatsbyImage
    image={data.kayaker.image.localFile.childImageSharp.gatsbyImageData}
    alt={data.kayaker.title}
    className='img__wrapped paddler'
  />
}

function TopThree(props: { className: string; }) {

  const { query } = useStrapiTextures()
  // console.log(query.baseone);

  return <GatsbyImage
    image={query.topthree.image.localFile.childImageSharp.gatsbyImageData}
    alt="deepwater texture"
    className={`texture-slice crops ${props.className}`}
    objectFit="contain"
  />
}

interface CompositionTypes {
  sport?: string;
  tour?: string;
}
const Composition = ({ sport, tour }: CompositionTypes) => {
  return (
    <div className="composition">
      <WaterTexture className="texture-1" />
      <TopThree className="texture-2 img__wrapped" />
      <Paddler sport={sport} tour={tour} />
    </div>
  )
}

export default Composition