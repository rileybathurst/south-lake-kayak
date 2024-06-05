import type { IGatsbyImageData } from "gatsby-plugin-image";

export interface TicketTypes {
  id: React.Key;
  ogimage: {
    localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData } };
    alternativeText?: string;
  };
  slug: string;
  name: string;
  start?: string | null;
  finish?: string | null;
  duration?: number | null;
  timeframe?: string | null;
  fitness?: string | null;
  excerpt: string;
  price: string;
  peek: string;
}
