import { graphql, useStaticQuery } from "gatsby";

export const useStrapiFaq = () => {
  const { allStrapiFaq } = useStaticQuery(graphql`
    query {
      allStrapiFaq {
        nodes {
          id
          question
          answer
        }
      }
    }
  `);

  return allStrapiFaq;
};
