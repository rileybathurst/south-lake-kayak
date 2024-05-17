import type { IGatsbyImageData } from "gatsby-plugin-image";

export interface TicketTypes {
  tour: {
    id: React.Key;
    ogimage: {
      localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData } };
      alternativeText?: string;
    };
    slug: string;
    name: string;
    start?: Date | string | null;
    finish?: Date | string | null;
    duration?: number | null;
    fitness: string;
    excerpt: string;
    price: string;
    peek: string;
  };
}
