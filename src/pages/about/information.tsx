// TOD: I started moving this to starpi but it needs some more thought

import * as React from "react"
import { Link, Script } from "gatsby"
import { SEO } from "../../components/seo";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import Header from "../../components/header";
import Footer from "../../components/footer";

const InformationPage = () => {
  let title = "Paddlesports Information";
  let parent = "about";

  return (
    <>
      <Header />

      {/* this page could use accordions to make it easier to read */}

      <main>
        <h1>{title}</h1>
        <h2>Before you go!</h2>

        <article>
          <h3>Dress for Success</h3>
          <ul>
            <li>Properly Fitting Life Jacket (PFD)</li>
            <li>Clothing &ndash; Wear clothing that dries quickly (non&ndash;cotton)</li>
            <li>Sun Protection &ndash; Lake Tahoe reflects sunlight, &amp; UV is stronger at elevation</li>
          </ul>
          <hr />
        </article>

        <article>
          <h3>Weather and Navigation</h3>
          <ul>
            <li>Wind and Waves &ndash; Lake Tahoe is often windy and wavy from 2 to 6pm. Plan on being within view (less than a mile) of your final destination during this (or any windy) time.
              *Head to the right and stay close to shore! &ndash; The wind usually blows from the Southwest at Lake Tahoe, so heading to the right along the West shore keeps you in calmer water
              and puts the wind at your back on the way home.</li>
            <li>Paddling Speed and Distance &ndash; Most paddlers average 2.5 miles per hour. Lake Tahoe is 12 miles across (4 ½ hours of paddling), so DO NOT ATTEMPT TO CROSS THE LAKE.</li>
            <li>Set a Turnaround Time: Generally half way through your rental period.</li>
            <li>Visual Cues &ndash; Look at the shore and remember landmarks to guide you home.</li>
          </ul>
          <hr />
        </article>

        <article>
          <h3>Basic Paddling Tips</h3>
          <h4>Kayak Paddle Strokes</h4>
          <ul>
            <li>Forward Stroke &ndash; Your paddle enters the water near your feet and exits the water near your hips. This stroke propels you forward. Remember: “Anything past your waist is a waste.”</li>
            <li>Turning (“Sweep”) Stroke &ndash; Your paddle enters the water near your feet, and then sweeps past your hip. This stroke turns the kayak in the opposite direction from the side you are paddling on.</li>
            <li>Back Stroke &ndash; Easy does it! Paddling backwards slows you down, or propels you in reverse.</li>
          </ul>

          <hr />

          <h4>Tandem Kayaking &ndash; Its about communication!</h4>
          <ul>
            <li>Try to paddle at the same time, and on the same side!</li>
            <li>
              Turning the kayak
              <ol>
                <li>The paddler in the back can sneak in a few longer Sweep Strokes (see above), while keeping the same rhythm as the paddler in front.</li>
                <li>The paddler in front can stop paddling while the paddler in back does multiple sweep strokes on the same side of the boat.</li>
              </ol>
            </li>
            <li>Stability &ndash; Just Relax! Let waves come and go by relaxing your hips and letting the boat rock. Most recreational kayaks are very stable. Don&rsquo;t tense up and try to overcompensate for the boat. The boat wants to float.
              <ul>
                <li>Power Boat Wakes &ndash; pointing your watercraft perpendicular to large wakes can help your stability.</li>
                <li>Stay Close to Shore &ndash; You&rsquo;ll deal with less waves and boat wakes here. On the shore side of the white buoys is the no&ndash;wake zone. Power boats are limited to 5 MPH here.</li>
              </ul>
            </li>
            <li>Paddleboard Strokes
              <ul>
                <li>Forward Stroke &ndash; Keep your arms fairly straight and the paddle shaft vertical to the water. The paddle should enter the water well in front of you and exit the water at your feet.</li>
                <li>Turning (Sweep) Stroke &ndash; The paddle shaft should be at a lower, 45 degree angle to the water. It should enter the water in front of you, and sweep past your feet (keep your stance wide for stability).</li>
              </ul>
            </li>
          </ul>
          <hr />
        </article>

        <article>
          <h3>Safety on the Water</h3>
          <ul>
            <li>You Are Harder to See in a Small Boat &ndash; Don&rsquo;t wait for large power boats to see and avoid you. Take evasive maneuvers to be sure you are seen and give power boaters plenty of room. Wear bright clothing.</li>
            <li>Rules of the Road Apply &ndash; When heading straight for another watercraft, the preferred method of passing each other is to move your boat slightly to the right, and pass with the left (“port”) side of your boat passing the left side of the other boat.</li>
            <li>Don&rsquo;t Cut People Off &ndash; No matter how fast you think you can go, when your path of travel is about to cross with another boat, it is best to slow down and let the other boat pass by.</li>
            <li>Look for, and Avoid Obstacles &ndash; Submerged rocks, other boaters, and floating logs can be present. Pay attention to these obstacles and avoid them.</li>
            <li>Non&ndash;Swimmers &ndash; We discourage non&ndash;swimmers from engaging in paddle sports. If you choose to do so, you should operate your watercraft in water that is shallow enough for you to stand up in. Non&ndash;swimmers will be required to wear life vests.</li>
            <li>Getting on/off a Paddleboard &ndash; Make sure water is at least knee&ndash;deep when getting on and off your board. The fin protrudes almost a foot beneath the board. Hooking your fin on the bottom of the lake can cause expensive damage to your board and/or your body.</li>
            <li>Paddleboards are Fragile! &ndash; Be careful not to ram your paddleboard into rocks or other obstacles. Fiberglass cracks easily and can cause the board to take on water.</li>
          </ul>
          <hr />
        </article>

        <article>
          <h3>Stay Hydrated!</h3>
          <ul>
            <li>Bring along clean drinking water and food, especially if you will be paddling for more than an hour.</li>
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

export default InformationPage

export const Head = () => {
  return (
    <SEO
      title={`Information | ${useSiteMetadata().title}`}
      description="Before you go. Dress for Success. Weather and Navigation. Basic Paddling Tips. Kayak Paddle Strokes. Tandem Kayaking – Its about communication. Safety on the Water. Stay Hydrated"
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
              "item": "${useSiteMetadata().url}/about"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Information",
            }]
          }
        `}
      </Script>

    </SEO>
  )
}
