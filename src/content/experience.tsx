import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

const Experience = () => {

  const { strapiExperience } = useStaticQuery(graphql`
    query ExperienceQuery {
      strapiExperience {
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
      children={strapiExperience.text.data.text}
      remarkPlugins={[remarkGfm]}
    />
  )
}

export default Experience