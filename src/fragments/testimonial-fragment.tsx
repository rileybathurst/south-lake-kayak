import { graphql } from "gatsby";

export const query = graphql`
  fragment TestimonialFragment on STRAPI_TESTIMONIAL {
    id
    testimonial
    customer
    sign
    location
  }
`;
