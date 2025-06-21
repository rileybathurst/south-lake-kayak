import * as React from "react"
import { Link } from "gatsby"

import Header from "../../components/header";
import Footer from "../../components/footer";

function TourCatchAll({ params }: { params: { name: string } }) {

  // console.log(params);

  return (
    <>
      <Header />
      <main className="pelican">
        <h1>
          <Link to="/tours">Tours</Link> / {params.name}</h1>

        {/* // TODO: this should be a component */}
        <h2>Looks like you&apos;ve paddled into uncharted waters!</h2>
        <p>Don&apos;t worry, we&apos;ll help you navigate <Link to="/">back to our homepage.</Link></p>

        {/* // TODO: this is a broken tour page add a set of tours it should be with cards */}
      </main>
      <Footer />
    </>
  )
}

export default TourCatchAll
