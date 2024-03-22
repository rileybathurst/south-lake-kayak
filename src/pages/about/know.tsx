// take some inspiration from Modern for Wikipedia https://www.modernwiki.app/
// TODO: there has to be an easier way to do this
// TODO: add a little animation with a color behind the nav which slides with the current section

import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql, Script } from 'gatsby';
// import * as Scroll from 'react-scroll';

import { SEO } from "../../components/seo";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
// import { StrapiMap } from "../../components/map";

import Header from "../../components/header";
import Footer from "../../components/footer";

import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";

// import scrollTo from 'gatsby-plugin-smoothscroll';

const KnowPage = () => {

  /* if (typeof window !== "undefined") {
    // eslint-disable-next-line global-require
    require("smooth-scroll")('a[href*="#"]')
  }

  const { allStrapiFaq } = useStaticQuery(graphql`
    query KnowQuery {
      allStrapiFaq {
        nodes {
          id
          question
          answer
        }
      }
    }
  `)
 */
  let title = "Know Before You Go";
  let parent = "about";

  const [dressState, setDressState] = useState("current");
  const [weatherState, setWeatherState] = useState("");
  const [rentalState, setRentalState] = useState("");
  const [paddleState, setPaddleState] = useState("");
  const [safetyState, setSafetyState] = useState('');
  const [hydrateState, setHydrateState] = useState('');
  const [sliderState, setSliderState] = useState('1.5');

  const dressRef = useRef();
  const weatherRef = useRef();
  const rentalRef = useRef();
  const paddleRef = useRef();
  const safetyRef = useRef();
  const hydrateRef = useRef();

  // Im using a ready state as if something comes in
  // but the above are there it needs to hold state
  // for when the one above moves out

  useEffect(() => {

    let dress = dressRef.current;

    createObserver();
    function createObserver() {
      let observer;

      let options = {
        threshold: 0.1
      };

      observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(dress);
    }

    function handleIntersect(entries) {
      entries.forEach((entry) => {
        // if this is in it should always be current
        if (entry.intersectionRatio > 0.1) {
          setDressState("current")
          setWeatherState("")
          setSliderState("dress")
          // if dress goes out but weather is in it should make that the current
        } else if (entry.intersectionRatio < 0.1 && (weatherState === "ready" || weatherState === "current")) {
          // * depending which order these fire it hits one or the other
          setWeatherState("current")
          setDressState("")
        }
      });
    }

    // ------------------------------------------------------------------------

    let weather = weatherRef.current;

    weatherObserver();
    function weatherObserver() {
      let observeWeather;

      let weatherOptions = {
        threshold: 0.1
      };

      observeWeather = new IntersectionObserver(weatherIntersect, weatherOptions);
      observeWeather.observe(weather);
    }

    function weatherIntersect(entriesW) {
      entriesW.forEach((entry) => {
        // if the weather is in and dress is out it should be current
        if (entry.intersectionRatio > 0.1 && dressState !== "current") {
          setDressState("")
          setWeatherState("current")
          setSliderState("weather")

          // if weather is in and dress is in it should be ready
        } else if (entry.intersectionRatio > 0.1 && dressState === "current") {
          setWeatherState("ready")
          // if weather is out its out and only if dress is out should it be current
        } else if (entry.intersectionRatio < 0.1 && (rentalState === "ready" || rentalState === "current")) {
          setWeatherState("")
          setRentalState("current")
        }
      });
    }

    // ------------------------------------------------------------------------

    let rental = rentalRef.current;

    rentalObserver();
    function rentalObserver() {
      let observeRental;

      let rentalOptions = {
        threshold: 0.1
      };

      observeRental = new IntersectionObserver(rentalIntersect, rentalOptions);
      observeRental.observe(rental);
    }

    function rentalIntersect(entriesR) {
      entriesR.forEach((entry) => {
        // if we come and no one above is we go current
        if (entry.intersectionRatio > 0.1 && (dressState !== "current" && weatherState !== "current")) {
          setRentalState("current")
          // if we come and someone above is we go ready
        } else if (entry.intersectionRatio > 0.1 && (dressState === "current" || weatherState === "current")) {
          setRentalState("ready")
          // if we go out we go out and set the next one to current
        } else if (entry.intersectionRatio < 0.1 && (paddleState === "ready" || paddleState === "current")) {
          setRentalState("")
          setPaddleState("current")
        }
      });
    }

    // ------------------------------------------------------------------------

    let paddle = paddleRef.current;

    paddleObserver();
    function paddleObserver() {
      let observePaddle;

      let paddleOptions = {
        threshold: 0.1
      };

      observePaddle = new IntersectionObserver(paddleIntersect, paddleOptions);
      observePaddle.observe(paddle);
    }

    function paddleIntersect(entriesP) {
      entriesP.forEach((entry) => {
        // this has to be an and not an or
        if (entry.intersectionRatio > 0.1 && (dressState !== "current" && weatherState !== "current" && rentalState !== "current")) {
          setPaddleState("current")
        } else if (entry.intersectionRatio > 0.1 && (dressState === "current" || weatherState === "current" || rentalState === "current")) {
          setPaddleState("ready")
        } else if (entry.intersectionRatio < 0.1 && (safetyState === "ready" || safetyState === "current")) {
          setPaddleState("")
          setSafetyState("current")
        }
      });
    }

    // ------------------------------------------------------------------------

    let safety = safetyRef.current;

    safetyObserver();
    function safetyObserver() {
      let observeSafety;
      let safetyOptions = {
        threshold: 0.1
      };
      observeSafety = new IntersectionObserver(safetyIntersect, safetyOptions);
      observeSafety.observe(safety);
    }
    function safetyIntersect(entries) {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.1 && (dressState !== "current" && weatherState !== "current" && rentalState !== "current" && paddleState !== "current")) {
          setSafetyState("current")
        } else if (entry.intersectionRatio > 0.1 && (dressState === "current" || weatherState === "current" || rentalState === "current" || paddleState === "current")) {
          setSafetyState("ready")
        } else if (entry.intersectionRatio < 0.1 && (hydrateState === "ready" || hydrateState === "current")) {
          setSafetyState("")
          setHydrateState('current')
        }
      });
    }

    let hydrate = hydrateRef.current;
    hydrateObserver();
    function hydrateObserver() {
      let observeHydrate;
      let hydrateOptions = {
        threshold: 0.1
      };
      observeHydrate = new IntersectionObserver(hydrateIntersect, hydrateOptions);
      observeHydrate.observe(hydrate);
    }
    function hydrateIntersect(entries) {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.1 && (dressState !== "current" && weatherState !== "current" && rentalState !== "current" && paddleState !== "current" && safetyState !== "current")) {
          setHydrateState("current")
        } else if (entry.intersectionRatio > 0.1 && (dressState === "current" || weatherState === "current" || rentalState === "current" || paddleState === "current" || safetyState === "current")) {
          setHydrateState("ready")
          // * the last one doesnt need the drop down
        } else if (entry.intersectionRatio < 0.1) {
          setHydrateState("")
        }
      });
    }


  }, [dressState, weatherState, rentalState, paddleState, safetyState, hydrateState])

  return (
    <>
      <Header />


      <main className="wiki">

        <nav>
          <ul>
            <li className={dressState}><button onClick={() => scrollTo('#dress')}>Dress for Success</button></li>
            <li className={weatherState}><Link to="/about/know/#weather">Weather and Navigation</Link></li>
            <li className={rentalState}><Link to="/about/know/#rental">Rental, Retail and Delivery</Link></li>
            <li className={paddleState}><Link to="/about/know/#paddle">Basic Paddling Tips</Link></li >
            <li className={safetyState}><Link to="/about/know/#safety">Safety on the Water</Link></li >
            <li className={hydrateState}><Link to="/about/know/#hydrate">Stay Hydrated!</Link></li >
          </ul >
          <div className={`slider-guy ${sliderState}`}>{/* stay gold */}</div>
        </nav >

        <div className="scroll-container">
          <h1>{title}</h1>

          <article
            id="dress"
            ref={dressRef}
            aria-current={dressState} // TODO: location
          >
            <h3>Dress for Success</h3>
            <ul>
              <li>Properly Fitting Life Jacket (PFD)</li>
              <li>Clothing &ndash; Wear clothing that dries quickly (non&ndash;cotton)</li>
              <li>Sun Protection &ndash; Lake Tahoe reflects sunlight, &amp; UV is stronger at elevation</li>
            </ul>
            <hr />
            <article>
              What do I wear to go kayaking or paddle boarding?
              You should wear clothing and footwear that will dry quickly. Synthetic (usually polyester) clothing is usually the best. Cotton clothing dries the slowest, and therefore will make you feel colder. Sandals or water shoes are better than sneakers. Bringing a waterproof, windbreaker jacket is a good idea. Sun protection is a must due to our high altitude and because of the reflection off the water.
            </article>

            <hr />

            <article>
              Shouldn’t I be wearing a wetsuit?
              Neoprene wetsuits are designed to work best when you are actually drenched or immersed in water. They are appropriate for whitewater river paddling, open ocean paddling, or winter paddling in Lake Tahoe. While there’s nothing wrong with wearing a wetsuit to paddle in Lake Tahoe, most people find them to be too hot, sweaty (they don’t breathe), and uncomfortable for summer-time lake paddling. It’s usually better to bring a change of clothes in a dry bag for the rare event that you capsize.
            </article>

            <hr />

            <article>
              Do I have to wear a lifejacket?
              We ask that you do. Legally, adults fourteen-years and older must have a PFD on the kayak (or board). Children need to wear their life jackets. Inflatable PFD’s must be worn at all times.
            </article>

            <hr />

            <article>
              I see paddleboarders without life jackets all the time. Is a PFD required on a SUP?
              Absolutely. The Coast Guard and police boats will be checking this summer. Fines will be issued to those paddleboarders without proper life jackets on board. Unlike surfers on the ocean’s coast, an ankle leash on your board does not make the board count as your PFD at Lake Tahoe. This may change in the future, but that doesn’t excuse you from breaking the law now.
            </article>

            <article>
              Will I get wet while kayaking or paddle boarding at Lake Tahoe?
              You are doing a watersport, so you will definitely get splashed and dripped on. You are unlikely to get soaked, but your feet and rear end will almost definitely get a little wet. We do have a limited number of drybags to loan out with our rentals for those who bring a towel or a change of clothes.
            </article>

            <article>
              Do people fall in the water often?
              Not usually. The wider, more recreational kayaks and SUPs are very difficult to tip over. Staying relaxed and not fighting the rocking of the boat (or board) is usually the best strategy. For large boat wakes, point your paddle-craft directly into the wake instead of taking the wave broadside. Sit-on-top kayaks and paddleboards generally don’t fill with water, so it’s fairly easy to get back on board and continue paddling if you do fall off.
            </article>
          </article>





          <article
            id="weather"
            ref={weatherRef}
            aria-current={weatherState}
          >
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

            <article>
              What is the best time of day to go paddling?
              Lake Tahoe is usually fairly windy and wavy from 2:00pm to 6:00pm. Although the West Shore of Lake Tahoe is somewhat sheltered from the wind most days, it’s usually best to paddle in the morning/early afternoon, or at sunset. For a multi-sport day, we recommend planning a morning paddle and hiking or biking for the afternoon. Our “Sunset Kayak Tour” and “Get Up Stand Up” programs are a great way to get on the water outside our normal business hours.
            </article>

            <hr />

            <article>
              How long is your paddling season at Tahoe City Kayak?
              We typically open in early-mid May, and close in early-mid October. Spring and fall hours and offerings are very weather-dependent. Call ahead.
            </article>

            <hr />

            <article>
              How long will it take me to paddle across Lake Tahoe?
              Lake Tahoe is about 12 miles across and most recreational paddlers paddle at about 2.5 mph. It takes most people a minimum of 4 hours to cross. We do not recommend this!! There are large power boats moving at full speed out in the middle of the lake, as well as the possibility of high winds and very large waves. Moreover, you won’t be able to make it across and back in time to return your rental…at which point we will have to send out a rescue party.
            </article>

            <article>
              Which way is the most scenic/best direction to paddle?
              Everywhere in Lake Tahoe is very scenic. We recommend paddling south from either of our locations, since the wind frequently blows out of the southwest, you won’t have to paddle into it on the way home. (our beach staff will point you in the right direction).
            </article>

          </article>




















          <article
            id="rental"
            ref={rentalRef}
          >
            <h3>Rental, Retail and Delivery</h3>
            <article>
              Do you offer multi-day rentals and/or delivery?
              Yes. Call ahead for rates and availability. We can deliver rental or retail paddle-craft to almost anywhere in the Lake Tahoe/Truckee region. Deliveries to San Francisco, Sacramento, and Reno may be possible as well, especially during slower periods of the year.
            </article>

            <article>
              Am I going to find this retail kayak or paddleboard cheaper at a big-city retailer?
              Usually not. Most of the popular brands set a minimum price that must be followed by large and small retailers (similar to Apple Computers). We do not mark up our boards and kayaks above that price, so they should be very competitively priced. We want your business.
            </article>

            <article>
              Do you have a demo day or a way to try before you buy?
              Yes. We have at least one of most everything we carry available to rent. If you decide to buy a kayak or SUP, you can apply up to two days of rental fees toward the retail price (in the same season). We don’t do a specific “Demo Day,” since every day is a demo day. Call ahead to reserve a specific watercraft.
            </article>

          </article>





          <article
            id="paddle"
            ref={paddleRef}
          >
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

          <article
            id="safety"
            ref={safetyRef}
          >
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

          <article id="hydrate"
            ref={hydrateRef}
          >
            <h3>Stay Hydrated!</h3>
            <ul>
              <li>Bring along clean drinking water and food, especially if you will be paddling for more than an hour.</li>
            </ul>

            <hr />
          </article>


          <article id="tandem">
            <h3>Is it best to go in a two-person (tandem) kayak?</h3>
            <p>There are pros and cons.</p>
            <ul>
              <li>The advantage of tandem kayaking is having two motors (people) on board. If there is a significantly weaker paddler, then this can be the way to go.</li>
              <li>A possible disadvantage of tandem kayaking is that it takes much more communication and synchronization to paddle straight and steer. This presents a problem for some pairs.</li>
              <li>New paddlers often have an easier time in a single kayak, where they only have to worry about coordinating themselves.</li>
              <li>Paddling side-by-side with your fellow paddlers can be a more social experience as well. Either way, we’ve got you covered.</li>
              <li>Single kayaks are a great way to social distance.</li>
            </ul>
            <hr />
          </article>

          <article id="age">
            <h3>What is the minimum age for paddlers?</h3>
            <ul>
              <li>Children 5 yrs old and up can be in a tandem kayak with an adult.</li>
              <li>Children 10 years and up can participate in our guided tours and/or paddle their own kayak with adult supervision.</li>
            </ul>
          </article>
        </div>
      </main >

      <ParentTitleBreadcrumb
        parent={parent}
        title={title}
      />

      <Footer />
    </>
  )
}

export default KnowPage

export const Head = () => {
  return (
    <SEO
      title={`Frequently Asked Questions | ${useSiteMetadata().title}`}
      description="Get answers to your questions about kayaking and paddleboarding in Lake Tahoe with Tahoe City Kayak and Paddleboards’ frequently asked questions page. Learn about our kayak and paddleboard rentals, sales, lessons, tours, and storage options. Contact us at (530) 581-4336 for current hours and availability."
    >
      {/* <StrapiMap /> */}
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
              "name": "Frequently Asked Questions"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}
