import * as React from "react"
import { Link } from "gatsby"
import { SEO } from "../components/seo";
import { useSiteMetadata } from '../hooks/use-site-metadata';

import Header from "../components/header";
import Footer from "../components/footer";

const NotFoundPage = ({ location }) => {
  return (
    <>
      <Header />

      <main className="measure">
        {/* // TODO: add an eyebrow to this */}
        <h2 className="crest">404 - {location.pathname}</h2>

        <h1 className="mixta">Looks like you&apos;ve paddled into uncharted waters!</h1>
        <p>Don&apos;t worry, we&apos;ll help you navigate <Link to="/">back to our homepage.</Link>
        </p>
      </main>
      <Footer />
    </>
  )
}

export default NotFoundPage

export const Head = ({ location }) => {
  return (
    <SEO
      title={`404 - ${location.pathname} | ${useSiteMetadata().title}`}
      description="Looks like you&apos;ve paddled into uncharted waters! Don&apos;t worry, we&apos;ll help you navigate back to our homepage."
    />
  )
}