import React, { useState, useRef } from "react"
import { Script } from "gatsby";
import { SEO } from "../../components/seo";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useMapEvents } from 'react-leaflet/hooks'

import Header from "../../components/header";
import Footer from "../../components/footer";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import Composition from "../../components/composition";

const TahoeCity = { name: 'Tahoe City', lat: 39.16879, lng: -120.14199 }
const AlpineMeadows = { name: 'Alpine Meadows', lat: 39.18528, lng: -120.19494 }
const RetailLocation = { name: 'Retail Location', lat: 39.17123, lng: -120.14093 }
const OnWaterRental = { name: 'On Water Rental', lat: 39.16879, lng: -120.14199 }
const SixtyFourAcres = { name: '64 Acres', lat: 39.16418, lng: -120.14717 }
const zoom = 14

function DisplayPosition({ map }): JSX.Element {
  const toTahoeCity = () => {
    map.setView([TahoeCity.lat, TahoeCity.lng], zoom)
  }
  const toAlpineMeadows = () => {
    map.setView([AlpineMeadows.lat, AlpineMeadows.lng], zoom)
  }

  return (
    <div className="buttonGroup">
      <button onClick={toTahoeCity}>Tahoe City</button>
      <button onClick={toAlpineMeadows}>Alpine Meadows</button>
    </div>
  )
}

function Markers() {
  const [marks, setMarks] = useState([
    TahoeCity,
    AlpineMeadows
  ]);

  const map = useMapEvents({
    zoom: () => {
      if (map.getZoom() > 12) {
        // console.log('show popup');
        setMarks([
          // ...marks, // if i want to keep the previous ones
          RetailLocation,
          OnWaterRental,
          SixtyFourAcres,
          AlpineMeadows
        ]);
      }

      if (map.getZoom() < 12) {
        // console.log('hide popup');
        // remove the last item in the array
        setMarks([
          // ...marks, // if i want to keep the previous ones
          TahoeCity,
          AlpineMeadows
        ]);
      }
    },
  })

  return (
    <>
      {marks.map((mark, index) => (
        <Marker key={index} position={[mark.lat, mark.lng]}>
          <Popup>
            {mark.name}
          </Popup>
        </Marker>
      ))}
    </>
  )
}

function Map() {
  const [mapped, setMapped] = useState(null)
  const ref = useRef(null);

  return (
    <>
      {mapped ? <DisplayPosition map={mapped} /> : null}
      <MapContainer
        // move this to a component with props on whats needed per page
        // TODO change this to a classname
        // this could be interesting as a container query
        style={{ height: '400px' }}
        center={[TahoeCity.lat, TahoeCity.lng]}
        zoom={12}
        scrollWheelZoom={false}
        // MapContainer doesnt take a ref
        // https://github.com/PaulLeCam/react-leaflet/issues/841
        // ref={ref}
        // although it is useful here in diffferent ways so this kinda has two things for this
        ref={setMapped}
        whenCreated={map => {
          <>
            ref={ref}
          </>
        }}
      >
        <Markers />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  )
}


const TruckeeRiverPage = () => {

  return (
    <>
      <Header />

      {/* // TODO: links */}

      <main className="progression">
        <article>
          <h1>Truckee River Rentals</h1>
          <p>
            We offer high end inflatables that you can rent for the Truckee River, as well as inexpensive tubes and rafts for purchase. That said, we are not a livery service with shuttle transportation for the river. You can easily transport our lightweight &#40;inflatable&#41; river-oriented watercraft yourself, or &#40;if you can't self transport&#41; you can choose to rent one of our lake-oriented watercraft and paddle directly from our rental location at the waters&apos; edge on Commons Beach in Tahoe City.
          </p>

          <p>
            Our company does not have the permits to guide or transport you &#40;or your watercraft&#41; to/from the river, but our rental location is just a couple minutes walk, drive, or paddle from the start of the Truckee River &#40;you can see it from our locations&#41;.
          </p>

          <p>
            The section of the Truckee River between Tahoe City and Alpine Meadows is an easy family-friendly float with a couple of "white water" sections that barely register as a Class 1 rapid.  The float trip takes most people around 3 hours to complete &#40;not counting transportation&#41;, and many people use basic tubes as their watercraft.
          </p>

          <h2>
            How to Launch:
          </h2>
          <p>
            The easiest place to launch for the Truckee River is a large public parking lot called "64 Acres" that is located behind the Tahoe City Transportation Center &#40;the public bus station&#41; at 180 West Lake Blvd in Tahoe City. This parking lot has a public boat ramp into the river that's free to use.  You'll need to have a plan to get back to your car at the end of the day &#40;see below&#41;.
          </p>

          <h2>
            How to get back at the end of the day:
          </h2>
          <p>
            You'll want to get out of the river at &#40;or near&#41; the River Ranch Lodge and Restaurant, as there is more dangerous white water just after this location. There are no other large restaurants with outdoor dining and river docks in the area, so it would be very hard to float past the River Ranch by mistake.
          </p>

          <h2>
            A few options for getting back to your car include:
          </h2>

          <ol>
            <li>
              There is a public parking area less than 100 yards upstream from River Ranch where you can leave a second car. Please do not park in the River Ranch's parking lot unless you are patronizing their restaurant &#40;we highly recommend their food&#41;.
            </li>
            <li>
              Public transportation options include the  TART bus &#40;the public bus that stops at River Ranch hourly&#41;, TART Connect &#40;a free public van service&#41;, or local UBER/Taxi options. You could deflate your watercraft and use these options to get back to your vehicle.
            </li>
            <li>
              Before you begin your river float, you could lock a bike near the take-out and, when you exit the river a few hours later, have one person in your group ride back to your parked car using the scenic bike path that follows the Truckee River.
            </li>
          </ol>

          <p>
            You are responsible for your watercraft, whether you&apos;ve rented it or purchased it. Please do not leave deflated tubes, rafts, or trash along the side of the road or riverbank!  You will be financially responsible for replacing lost or broken rental equipment.
          </p>

          <p>
            Please note that while the Truckee River rarely closes to the public, there are times when weather-related events like drought or excessive snowmelt can create conditions where it's too shallow &#40;or too deep&#41; for a good floating experience. We always recommend kayaking or paddleboarding with us on uniquely beautiful Lake Tahoe, regardless of river conditions.
          </p>

          <h3>Examples of our river-oriented inflatables:</h3>
          <ul>
            <li><a href="https://www.nrs.com/star-karma-river-tube/paka" target='_blank' rel='noopener noreferrer'>STAR Karma River Tube | NRS</a></li>
            <li><a href="https://www.nrs.com/star-viper-xl-inflatable-kayak/p1w8" target='_blank' rel='noopener noreferrer'>STAR Viper XL Inflatable Kayak | NRS</a></li>
            <li><a href="https://www.nrs.com/nrs-outlaw-legend-ii-inflatable-kayak/p8bn" target='_blank' rel='noopener noreferrer'>NRS Outlaw Legend II Inflatable Kayak</a></li>
          </ul>
        </article>
        <Composition />
      </main>

      <hr className="passage" />

      <section className="map">
        <h3>Map</h3>
        <Map />
      </section>


      <ParentTitleBreadcrumb
        parent="rentals"
        title="Truckee River Rentals"
      />

      <Footer />
    </>
  )
}

export default TruckeeRiverPage

export const Head = () => {
  return (
    <SEO
      title={`Truckee River Rentals | ${useSiteMetadata().title}`}
      description="We offer high end inflatables that you can rent for the Truckee River, as well as inexpensive tubes and rafts for purchase"
    >
      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Rentals",
              "item": "${useSiteMetadata().url}/rentals"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Truckee River Rentals"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}