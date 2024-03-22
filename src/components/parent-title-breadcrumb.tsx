import * as React from "react"
import { Link } from 'gatsby';

const ParentTitleBreadcrumb = (props: { parent: string; title: string; }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="breadcrumbs"
    >
      <ol>
        <li>
          <Link to={`/${props.parent}`}>{props.parent}</Link>&nbsp;/&nbsp;
        </li>
        <li aria-current="page">{props.title}</li>
      </ol>
    </nav>
  )
}

export default ParentTitleBreadcrumb
