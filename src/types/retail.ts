import { IGatsbyImageData } from "gatsby-plugin-image";

export interface RetailCardType {
  retail: {
    id: React.Key;
    name: string;
    slug: any;
    price: number;
    excerpt: string;
    start?: Date;
    end?: Date;
    duration?: number;
    peek: string;
    iogimage: {
      localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData } };
      alternativeText: string;
    };
  };
}
