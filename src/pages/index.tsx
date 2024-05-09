import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { SEO } from "../components/seo";
import { useSiteMetadata } from '../hooks/use-site-metadata';
// import { useStrapiTopBar } from "../hooks/use-strapi-topbar";
import Markdown from "react-markdown";

import Header from "../components/header"
import Footer from "../components/footer"
import PricingChart from "../components/pricing-chart"
import TwoKayakers from "../images/twokayakers";
import WaterTexture from "../images/watertexture";
import AndyPaddling from "../images/andypaddling";
import BookTour from "../components/peek/book-tour";
import BookRental from "../components/peek/book-rental";
import Ticket from "../components/ticket";
import LocationDeck from "../components/location-deck";

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query IndexQuery {

      allStrapiLocation(
        filter: {
          locale: {slug: {eq: "south-lake"}}
        },
        sort: {order: ASC}
      ) {
        nodes {
          ...locationCard
        }
      }

      allStrapiTour(
        sort: {featured: ASC},
        filter: {location: {eq: "south lake"}}
        ) {
        nodes {
          ...tourCard
          id
        }
      }

      strapiAbout {
        text {
          data {
            text
          }
        }
      }

      strapiShop {
        text {
          data {
            text
          }
        }
      }

      strapiExperience {
        text {
          data {
            text
          }
        }
      }

    }
  `)

  // ! I need to order the tours

  let allTours = data.allStrapiTour.nodes
  // console.log(allTours);

  // State for the list
  const [list, setList] = useState([...allTours.slice(0, 2)])

  // State to trigger oad more
  const [loadMore, setLoadMore] = useState(false)

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(allTours.length > 2)

  // Load more button click
  const handleLoadMore = () => {
    setLoadMore(true)
  }

  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allTours.length
      const nextResults = isMore
        ? allTours.slice(currentLength, currentLength + 2)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore])

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < allTours.length
    setHasMore(isMore)
  }, [list])

  return (
    <>
      <Header />
      <main className="home">
        <section>
          <h2 className="page-title">
            {/* // TODO: */}
            North Lake Tahoe&apos;s Premier Kayak and Paddleboard Provider, offering Rentals and Tours
          </h2>

          <div className="margin-block-end-aconcagua">
            <Markdown
              children={data.strapiAbout.text.data.text}
              className="react-markdown"
            />
          </div>

          <LocationDeck
            locations={data.allStrapiLocation}
            background={false}
          />

          <div className="button__double">
            <BookRental />
            <BookTour />
          </div>

        </section>

        <div>
          <div className="home__photo-grid">
            <TwoKayakers className="kayakers" />
            <WaterTexture className="texture" />
            <AndyPaddling className="andy" />
          </div>

          <PricingChart book={true} />
        </div>
      </main>

      <section id="tours" className="home__tours">
        <div>
          {/* // TODO: only one h and then p */}
          <hgroup className="crest">
            <h3 className="brow"><Link to="/tours">Tours</Link></h3>
            {/* think about capitalization here */}
            <h4 className="supra">Enjoy The Majesty Of Lake Tahoe</h4>
          </hgroup>

          <Markdown
            children={data.strapiExperience.text.data.text}
            className="react-markdown"
          />

          <h4>
            <Link to="/tours/compare">Compare Tours</Link>
          </h4>
        </div>
        <div>{/* stay gold */}</div>
      </section>

      <div className="deck">
        {list.map((tour) => (
          <div key={tour.id}>
            <Ticket tour={tour} />
          </div>
        ))}
      </div>
      <div className="deck__more">
        {hasMore ? (
          <button onClick={handleLoadMore} className=''>VIEW MORE TOURS</button>
        ) : (
          <p>Thats all the tours</p>
        )}
        <hr />
      </div>

      <section id="retail" className="passage">
        {/* // TODO: only one h and then p */}
        <hgroup className="crest">
          <h3 className="brow">
            <a href="https://tahoecitykayak.com/retail/">
              Retail Store
            </a>
          </h3>
          <h4 className="supra">Kayaks and Paddleboards</h4>
        </hgroup>

        <Markdown
          children={data.strapiShop.text.data.text}
          className="react-markdown"
        />
        <hr />
      </section>

      <Footer />
    </>
  )
}

export default IndexPage

export const Head = () => {
  return (
    <SEO
      title="Home"
    />
  )
}
