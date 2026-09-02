import * as React from "react";
import { Link, graphql } from "gatsby";
import Header from "../components/header";
import Footer from "../components/footer";
import ReactMarkdown from "react-markdown";
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import { SEO } from "../components/seo";
import Hero from "../components/hero";

type TeamViewTypes = {
  data: {
    strapiTeam: {
      id: string;
      name: string;
      slug: string;
      bio: {
        data: {
          bio: string;
        };
      };
      profile: {
        localFile: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
        alternativeText: string;
      };
    };
    allStrapiConnection: {
      edges: {
        node: {
          name: string;
          excerpt: string;
          website: string;
          recommendation: {
            reason: string;
            team: {
              name: string;
              slug: string;
            };
          }[];
        };
      }[];
    };
  };
};

export const data = graphql`
  query TeamViewQuery($slug: String!) {
    strapiTeam(
      slug: { eq: $slug }
    ) {
      id
      name
      slug
      bio {
        data {
          bio
        }
      }
      profile {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }

    allStrapiConnection(
      filter: {recommendation: {elemMatch: {team: {slug: {eq: $slug}}}}}
    ) {
      edges {
        node {
          name
          excerpt
          website
          recommendation {
            reason
            team {
              name
              slug
            }
          }
        }
      }
    }
  }
`

const TeamView = ({ data }: TeamViewTypes) => {
  const teamRecommendations = data.allStrapiConnection.edges.map(({ node }) => {
    const recommendations = node.recommendation.filter(
      (recommendation) => recommendation.team.name === data.strapiTeam.name

    );

    return {
      name: node.name,
      excerpt: node.excerpt,
      website: node.website,
      recommendations,
      hasRecommendations: recommendations.length > 0,
    };
  });

  return (
    <React.Fragment>
      <Header />

      <Hero
        image={data.strapiTeam?.profile}
      />

      <main className="condor">

        <h1>{data.strapiTeam.name}</h1>
        {data.strapiTeam.bio ? <div className='react-markdown'><ReactMarkdown>{data.strapiTeam.bio.data.bio}</ReactMarkdown></div> : null}


        {teamRecommendations.some(({ hasRecommendations }) => hasRecommendations) ? (
          <div className="panel">
            <h2>Favorites</h2>
            <div className="deck">
              {teamRecommendations.map(({ name, excerpt, website, recommendations, hasRecommendations }) => (
                hasRecommendations ? (
                  <div key={name} className="card">
                    <h2>{name}</h2>
                    {excerpt ? <p>{excerpt}</p> : null}
                    {website ? <p><a href={website}>{website}</a></p> : null}
                    {recommendations.map((recommendation, index) => (
                      <div key={index}>
                        <blockquote>
                          {data.strapiTeam.name} says: "{recommendation.reason}"
                        </blockquote>
                      </div>
                    ))}
                  </div>
                ) : null
              ))}
            </div>
          </div>
        ) : null}
      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb><Link to="/about/team/">Team</Link></Breadcrumb>
        <Breadcrumb>{data.strapiTeam.name}</Breadcrumb>
      </Breadcrumbs>
      <Footer />
    </React.Fragment>
  );
};

export default TeamView;

export const Head = ({ data }: TeamViewTypes) => {
  return (
    <SEO
      title={data.strapiTeam.name}
      // description="We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake."
      breadcrumbs={[
        { name: 'About', item: 'about' },
        { name: 'Team', item: 'about/team' },
        { name: 'Team Member', item: `about/team/${data.strapiTeam.slug}` }
      ]}
    />
  )
}
