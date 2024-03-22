import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

const AboutUs = () => {

  const { strapiAbout } = useStaticQuery(graphql`
    query AboutQuery {
      strapiAbout {
        text {
          data {
            text
          }
        }
      }
    }
  `)

  return (
    <ReactMarkdown
      children={strapiAbout.text.data.text}
      remarkPlugins={[remarkGfm]}
    />
  )
}

export default AboutUs