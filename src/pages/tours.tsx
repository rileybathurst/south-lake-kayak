import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { SEO } from "../components/seo"
import Markdown from "react-markdown";
import { useSiteMetadata } from '../hooks/use-site-metadata';
import Header from "../components/header"
import Footer from "../components/footer"
import BookNow from "../components/peek/book-now";
import Ticket from "../components/ticket";
import { CardType } from "../types/card";
import MapIconSVG from "../images/map-icon";
// import MapLink from "../components/map-link";
import KayakIcon from "../images/kayak";
import Sport from "../components/sport";

function Nested(props: { sport: string }) {
  if (props.sport) {
    // console.log(props.sport);

    return (
      <h1 className="capitalize">
        <Sport sport={props.sport} />
      </h1>
    )
  }
  else {
    return null;
  }
}

const ToursPage = () => {

  const query = useStaticQuery(graphql`
    query ToursQuery {
      kayak: allStrapiTour
        (filter: { sport: { eq: "kayak" } }, sort: {featured: ASC})
      {
        nodes {
          ...tourCard
        }
      }
  
      sup: allStrapiTour
        (filter: { sport: { eq: "sup" } } sort: {featured: ASC})
      {
        nodes {
          ...tourCard
        }
      }
    }
  `)

  let sports = [
    query.kayak,
    query.paddleboard,
  ]

  return (
    <>
      <Header />

      <main>
        <div className="passage location_card-wrapper">
          <div>
            <h1>Tours</h1>
            <Markdown
              children={query.strapiExperience.text.data.text}
              className="react-markdown"
            />
            <h2><Link to="/tours/compare">Compare Tours</Link></h2>
            <BookNow />
            <hr />
          </div>

          <div className="here__location here__card">
            {/* <MapLink> */}
            <KayakIcon />
            <p>
              <strong>Tour Start Location</strong><br />
              Commons Beach<br />
              400 North Lake Blvd,<br />
              Tahoe City 96145<br />
            </p>
            {/* </MapLink> */}
            <Link to="/map">
              <MapIconSVG />
              <p>
                View The Map<br />
                For The Store,<br />
                Tours, Rentals, Parking<br />
                and Directions
              </p>
            </Link>
          </div>
        </div>
      </main>

      {sports.map((sport: any) => (
        <section key={sport.nodes[0].id}>
          <hgroup className="passage">
            {/* naming this is weird */}
            <Nested sport={sport.nodes[0].sport} />
            <p className="aconcagua">Tours &amp; Lessions</p>
          </hgroup>

          <div className="deck">
            {sport.nodes.map((tour: CardType) => (
              <div key={tour.id}>
                <Ticket tour={tour} />
              </div>
            ))}
          </div>
        </section>
      ))}

      < Footer />
    </>
  )
}

export default ToursPage

export const Head = () => {
  return (
    <SEO
      title={`Tours | ${useSiteMetadata().title}`}
      description="We have many different Kayak and Paddle board Tours to offer. Our tours leave from multiple locations around the lake."
    />
  )
}
