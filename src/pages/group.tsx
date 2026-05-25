import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SEO } from "../components/seo";

import Header from "../components/header";
import Footer from "../components/footer";
import ReactMarkdown from "react-markdown";
import Phone from "../components/phone";
import Hero from "../components/hero";

type groupTypes = {
  strapiGroup: {
    text: {
      data: {
        text: string;
      }
    }
  }
}
const GroupPage = () => {

  const data: groupTypes = useStaticQuery(graphql`
    query GroupQuery {
      strapiGroup {
        text {
          data {
            text
          }
        }
      }
    }
  `);

  return (
    <React.Fragment>
      <Header />
      <Hero />

      <main>

        <h1>Group</h1>

        <ReactMarkdown>
          {data.strapiGroup.text.data.text}
        </ReactMarkdown>
        <Phone />
      </main>

      <Footer topHR />
    </React.Fragment>
  )
}

export default GroupPage

export const Head = () => {
  return (
    <SEO
      title='Group'
    // TODO: description
    />
  )
}
