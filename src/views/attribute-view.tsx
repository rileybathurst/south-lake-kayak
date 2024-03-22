import * as React from "react"
import { Link, Script } from 'gatsby';
import { SEO } from "../components/seo";
import { useSiteMetadata } from '../hooks/use-site-metadata';
import Header from "../components/header"
import Footer from "../components/footer"
import Card from "../components/card"
import KayakFeatureList from "../components/kayak-feature-list";
import PaddleboardFeatureList from "../components/paddleboard-feature-list"
import Sport from "../components/sport";

// ! SEO isnt here its on the templates

function SportFeatureList(props: { sport: string; }) {
  if (props.sport === "kayak") {
    return (
      <KayakFeatureList />
    )
  } else {
    return (
      <PaddleboardFeatureList />
    )
  }
}

const AttributeView = (props: {
  title: string;
  description: string;
  query: { nodes: any[]; };
  type: string;
}) => {
  return (
    <>
      <Header />

      <main>
        <h1 className="capitalize">{props.title} <Sport sport={props.type} />s</h1>

        {/* // TODO: I need to work on a version of this that uses some markdown - ultralight kayaks do this */}
        <p>{props.description}</p>
      </main>

      <section className="deck">
        {props.query.nodes.map((retail: { id: any; type?: string; slug?: string; title?: string; excerpt?: string; cutout?: { localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData; }; }; alternativeText: string; }; length?: number; width?: number; capacity?: number; inflatable?: boolean | undefined; }) => (
          <div key={retail.id}>
            <Card
              retail={retail}
            />
          </div>
        ))
        }
      </section>

      <hr className="passage" />

      <section className="passage" >
        <h2>Browse By Feature</h2>
        <SportFeatureList sport={props.type} />
      </section>

      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
      >
        <ol>
          <li>
            <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
          </li>
          <li>
            <Link to={`/retail/${props.type}`}>
              <Sport sport={props.type} />
            </Link>&nbsp;/&nbsp;
          </li>
          <li aria-current="page">{props.title}</li>
        </ol>
      </nav>

      <Footer />
    </>
  )
}

export default AttributeView
