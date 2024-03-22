import * as React from "react";
import { Link } from "gatsby";

export default function SportFeatureList(props) {

  return (
    <ul className="feature-list">
      {props.sport.nodes.map((attribute: {
        id: React.Key;
        slug: string;
        name: string;
        type: string;
      }) => (
        <li key={attribute.id}>
          <Link to={`/retail/attribute/${attribute.type}/${attribute.slug}`}>
            {attribute.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
