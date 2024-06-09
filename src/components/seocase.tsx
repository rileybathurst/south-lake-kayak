import * as React from "react"

interface BreadcrumbsTypes {
  breadcrumbs?: string | null;
}
function Breadcrumbs({ breadcrumbs }: BreadcrumbsTypes) {
  if (breadcrumbs) {
    return (
      <div className="breadcrumbs">
        <p>breadcrumbs</p>
      </div>
    )
  }
  return null
}

interface SEOcaseTypes {
  title: string;
  description: string;
  image: string;
}
const SEOcase = ({ title, description, image }: SEOcaseTypes) => {
  return (
    process.env.NODE_ENV === "development" ? (
      <section className="SEOcase">
        <p>title = {title}</p>
        <p>description = {description}</p>
        <p>image = {image}</p>

        <Breadcrumbs />
      </section>
    ) : null
  )
}

export default SEOcase
