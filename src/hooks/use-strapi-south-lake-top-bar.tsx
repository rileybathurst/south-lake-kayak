import { graphql, useStaticQuery } from "gatsby";

export const useStrapiSouthLakeTopBar = () => {
  const data = useStaticQuery(graphql`
    query {
      strapiSouthLakeTopBar {
        topbar {
          data {
            topbar
          }
        }
      }
    }
  `);

  return data.strapiSouthLakeTopBar.topbar.data.topbar;
};
