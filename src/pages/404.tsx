import * as React from "react"
import { Link } from "gatsby"
import { SEO } from "../components/seo";

import Header from "../components/header";
import Footer from "../components/footer";

interface LocationTypes {
  location: {
    pathname: string;
  };
}
const NotFoundPage = ({ location }: LocationTypes) => {
  return (
    <>
      <Header />
      <main className="pelican">
        <h1 className="crest">404 - {location.pathname}</h1>
        <h2>Looks like you&apos;ve paddled into uncharted waters!</h2>
        <p>Don&apos;t worry, we&apos;ll help you navigate <Link to="/">back to our homepage.</Link>
        </p>
      </main>
      <Footer />
    </>
  )
}

export default NotFoundPage

export const Head = ({ location }: LocationTypes) => {
  return (
    <SEO
      title={`404 - ${location.pathname}`}
      description="Looks like you&apos;ve paddled into uncharted waters! Don&apos;t worry, we&apos;ll help you navigate back to our homepage."
    />
  )
}