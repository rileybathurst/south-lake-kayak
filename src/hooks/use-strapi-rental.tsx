import { graphql, useStaticQuery } from "gatsby";

export const useStrapiRental = () => {
  const { strapiRental } = useStaticQuery(graphql`
    query {
      strapiRental {
        text {
          data {
            text
          }
        }
        excerpt
      }
    }
  `);

  return strapiRental;
};
