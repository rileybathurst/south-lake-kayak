import * as React from "react"
import { Script } from 'gatsby';
import { SEO } from "../../components/seo";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import Header from "../../components/header";
import Footer from "../../components/footer";

const PoliciesPage = () => {
  let title = "Store Policies";
  let parent = "about";

  return (
    <>
      <Header />

      {/* // TODO composition */}

      <main className="condor" >
        <h1>Store Policies</h1>

        <article>
          <h2>Transportation</h2>
          <p>The prices quoted for all of the tours do not include customer transportation to the tour starting point.</p>
          <hr />

          <h2>Tour Booking Procedure</h2>
          <ul>
            <li>
              {/* // TODO links to phone and online booking */}
              Tours can also be booked with VISA/MC/AMEX directly over the phone at (530) 581-4336 or on-line.</li>
            <li>Please list your phone number if purchasing with Paypal so we can contact you with any changes that may arise with your tour.</li>
            <li>We can usually book any of our tours for you with 48 hours notice (depending on availability).</li>
            <li>We offer kayak tours from May through September 30th. (We’ll operate into October if weather cooperates.)</li>
            <li>Private tours are possible if you pay the equivalent cost of 6 guests or more.</li>
          </ul>
          <hr />

          <h2>Cancellation Policy</h2>
          <ul>
            <li>Cancelling more than 24 before your reservation is completely fine, we will provide a full refund.</li>
            <li>Cancelling within 24 hours of your reservation means you will be financially held to your reservation.</li>
            {/* <li>Please note: The Sand Harbor State Park is limited on its parking capacity due to Covid-19. Getting there by the time the gates open at 8AM will help ensure your entry.</li> */}
          </ul>

        </article>

      </main>

      <ParentTitleBreadcrumb
        parent={parent}
        title={title}
      />

      <Footer />
    </>
  )
}

export default PoliciesPage

export const Head = () => {
  return (
    <SEO
      title={`About Us | ${useSiteMetadata().title}`}
      description="Transportation, Tour Booking Procedure and Cancellation Policy."
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
              "name": "Policies"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}
