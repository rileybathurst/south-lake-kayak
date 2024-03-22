// TODO: some of the typographic sizing is really out

import * as React from "react"
import { Script } from 'gatsby';
import { SEO } from "../../components/seo";
import { useSiteMetadata } from "../../hooks/use-site-metadata";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import Header from "../../components/header";
import Footer from "../../components/footer";

const JobsPage = () => {
  let title = "Jobs";
  let parent = "about";

  return (
    <>
      <Header />

      <main className="jobs progression">

        <section>
          <hgroup className="crest">
            {/* // TODO: only one h and then p */}

            <h1 className="brow">{title}</h1>
            <h2 className="supra">Help Wanted</h2>
          </hgroup>
          <hr />
          <p>Tahoe City Kayak is hiring for Summer <strong>May 1st to Oct 31</strong>.</p>

          <p>Housing options available!</p>

          <p>If you want a fun <strong>but also physical</strong> job with great views of the lake.</p>

          {/* <p>We are hiring for the following:</p> */}

          <h3>If Interested</h3>
          <p>
            please send a resume with references to
          </p>
          <a href={useSiteMetadata().jobEmail} className="button">{useSiteMetadata().jobEmail}</a>
        </section>

        <section>
          <h3>Kayak/Paddleboard Guide</h3>
          <p>take people on guided paddling tours and entertain them with fun facts, dad jokes, etc. Full or part time. Training provided.</p>
          <hr />
          <h3>Operations Manager</h3>
          <p>Work in our retail kayak shop while managing incoming reservations and assigning guides to kayak tours.</p>
          <hr />
          <h3>Sales Manager</h3>
          <p>Manage our retail store, sell kayaks, order inventory, etc.</p>
          <hr />
          <h3>Beach Rental Tech</h3>
          <p>Work on the local beach renting kayaks</p>
          <hr />
          <h3>Shuttle Van Driver</h3>
          <p>Must have a clean driving record and the ability to pass a drug test and physical <strong>state requirements</strong>.</p>
        </section>


      </main >

      <ParentTitleBreadcrumb
        parent={parent}
        title={title}
      />

      <Footer />
    </>
  )
}
export default JobsPage

export const Head = () => {
  return (
    <SEO
      title={`Jobs | ${useSiteMetadata().title}`}
      description="“Are you looking for a job in kayaking or paddleboarding? Look no further than Tahoe City Kayak & Paddleboard! We’re currently hiring for several positions, including kayak rental staff, paddleboard instructors, and more. Apply today and join our team!"
    >
      <Script type="application/ld+json">
        {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
              "name": "About",
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Jobs"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}
