import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

const Shop = () => {

  const { strapiShop } = useStaticQuery(graphql`
    query ShopQuery {
      strapiShop {
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
      children={strapiShop.text.data.text}
      remarkPlugins={[remarkGfm]}
    />
  )
}

export default Shop