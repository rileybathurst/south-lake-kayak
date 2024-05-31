// TODO: some of the typographic sizing is really out
// ! this is in strapi use that

import * as React from "react"
import { Link, Script, graphql, useStaticQuery } from 'gatsby';
import { SEO } from "../../components/seo";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import Header from "../../components/header";
import Footer from "../../components/footer";

const JobsPage = () => {

  interface JobTypes {
    title: string;
    id: string;
    description: {
      data: string;
    }
  }

  // * this is weird and wont query the other way
  const { strapiLocale } = useStaticQuery(graphql`
    query JobsQuery {
      strapiLocale(slug: {eq: "south-lake"}) {
        name
        email
        jobs {
          title
          id
          description {
            data
          }
        }
      }
    }
  `)

  return (
    <>
      <Header />

      <main className="condor">

        <section>
          <h1>Jobs</h1>
          <hr />
          <p>{strapiLocale.name} Kayak & Paddleboard is hiring for Summer <strong>May 1st to Oct 31</strong>.</p>

          <p>Housing options available!</p>

          <p>If you want a fun <strong>but also physical</strong> job with great views of the lake.</p>
          <hr />
        </section>

        <section>
          {strapiLocale.jobs.map((job: JobTypes) => {
            return (
              <div key={job.id}>
                <h2 className="">{job.title}</h2>
                <p>{job.description.data}</p>
              </div>
            )
          })}
        </section>

        <hr />

        <h4>If Interested</h4>
        <p>please send a resume with references to</p>
        <a
          href={`mailto:${strapiLocale.email}`}
          className="button"
        >
          {strapiLocale.email}
        </a>
      </main >

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb>Jobs</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  )
}
export default JobsPage

// TODO: SEO for jobs
export const Head = () => {
  return (
    <SEO
      title='Jobs'
      description='Are you looking for a job in kayaking or paddleboarding? Look no further. We&apos;re currently hiring for several positions. Apply today and join our team!'
      breadcrumbs={{
        one: { name: 'About', item: 'about' },
        two: { name: 'Jobs', item: 'jobs' }
      }}
    />
  )
}
