import React, { useState } from 'react';
import { useStaticQuery, graphql, Link, Script } from 'gatsby';
import { SEO } from "../../components/seo";

import { useSiteMetadata } from "../../hooks/use-site-metadata";

import Header from "../../components/header";
import Footer from "../../components/footer";

import Time from "../../components/time";

function Compare(props) {

  function Option(props) {
    if (props.name === props.current) {
      return (
        <option selected key={props.key}>{props.name}</option>
      )
    }
    else if (props.name === props.other) {
      return (
        <option disabled key={props.key}>{props.name}</option>
      )
    } else {
      return (
        <option key={props.key}>{props.name}</option>
      )
    }
  }

  function first(e) {
    setTour1(e.target.value);
    return null;
  }

  function second(e) {
    setTour2(e.target.value);
    return null;
  }

  function Details1(props) {
    props.set.forEach(element => {
      if (element.name === props.show) {
        setLink1(element.slug);
        setSport1(element.sport);
        setDuration1(element.duration);
        setStart1(element.start);
        setFinish1(element.finish);
        setFitness1(element.fitness);
        setLocation1(element.location);
        setExcerpt1(element.excerpt);
        setMinimum1(element.minimum);
        setPrice1(element.price);
        setPeeks1(element.peek);
      }
    });
    return null;
  }

  function Details2(props) {
    props.set.forEach(element => {
      if (element.name === props.show) {
        setLink2(element.slug);
        setSport2(element.sport);
        setDuration2(element.duration);
        setStart2(element.start);
        setFinish2(element.finish);
        setFitness2(element.fitness);
        setLocation2(element.location);
        setExcerpt2(element.excerpt);
        setMinimum2(element.minimum);
        setPrice2(element.price);
        setPeeks2(element.peek);
      }
    });
    return null;
  }

  const [tour1, setTour1] = useState('Sunset Kayak Tour on Lake Tahoe');
  const [tour2, setTour2] = useState('Historic West Shore Tour');

  const [link1, setLink1] = useState('not set');
  const [link2, setLink2] = useState('not set');

  const [sport1, setSport1] = useState('not set');
  const [sport2, setSport2] = useState('not set');

  const [duration1, setDuration1] = useState('not set');
  const [duration2, setDuration2] = useState('not set');

  const [start1, setStart1] = useState('not set');
  const [start2, setStart2] = useState('not set');

  const [finish1, setFinish1] = useState('not set');
  const [finish2, setFinish2] = useState('not set');

  const [location1, setLocation1] = useState('not set');
  const [location2, setLocation2] = useState('not set');

  const [excerpt1, setExcerpt1] = useState('not set');
  const [excerpt2, setExcerpt2] = useState('not set');

  const [minimum1, setMinimum1] = useState(0);
  const [minimum2, setMinimum2] = useState(0);

  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);

  const [peeks1, setPeeks1] = useState('not set');
  const [peeks2, setPeeks2] = useState('not set');

  const [fitness1, setFitness1] = useState('fitness');
  const [fitness2, setFitness2] = useState('fitness');

  return (
    <>
      <div className='comparesheet'>
        <div className='comparesheet_titles subgrid-passthrough'>

          <div className='grid__title--select comparesheet__transparent'>{/* stay gold */}</div>
          <h3 className='grid__title--name h4 comparesheet_freeze'>Tour</h3>
          <p className='grid__title--sport'>Sport</p>
          <p className='grid__title--time'>Time</p>
          <p className='grid__title--fitness'>Fitness</p>
          <p className='grid__title--location'>Location</p>
          <p className='grid__title--about'>About</p>
          <p className='grid__title--minimum'>Minimum People</p>
          <p className='grid__title--price'>Price</p>
          <p className='grid__title--book button-drop'>Book Now</p>
        </div>

        {/* Tour 1 */}
        <div className='subgrid-passthrough'>
          {/* // ? why tour3? */}
          <select name="tour3" id="tour1" onChange={first} className="grid__one--select comparesheet_select">
            {props.tours.map((tour) => (
              <Option key={tour.id} name={tour.name} current={tour1} other={tour2} />
            ))}
          </select>
          <h2 className='grid__one--name h3 comparesheet__title1'>

            <Link to={`/tours/${link1}`}>
              {tour1}
            </Link>
          </h2>
          <Details1 show={tour1} set={props.tours} />
          <h4 className='grid__one--sport capitalize'>{sport1}</h4>
          <div className='grid__one--time'>
            <Time
              duration={duration1}
              start={start1}
              finish={finish1}
            />
          </div>
          <p className='grid__one--fitness capitalize'>{fitness1}
            <span className='show-below__vulture'>&nbsp;fitness</span>
          </p>
          <p className='grid__one--location'><span className='show-below__vulture'>Starts at&nbsp;</span>Tahoe City</p>
          <p className='grid__one--about'>{excerpt1}</p>
          <p className='grid__one--minimum'>{minimum1}<span className='show-below__vulture'>&nbsp;people minimum</span></p>
          <p className='grid__one--price'>${price1}</p>
          <p className='grid__one--book'><a href={peeks1}
            rel="noopener noreferrer"
            className="book-now"
          >
            BOOK NOW
          </a></p>

        </div>

        {/* Tour 2 */}
        <div className='subgrid-passthrough'>
          <select name="tour3" id="tour2" onChange={second} className="grid__two--select comparesheet_select">
            {props.tours.map((tour) => (
              <Option key={tour.id} name={tour.name} current={tour2} other={tour1} />
            ))}
          </select>
          <h2 className='grid__two--name h3 comparesheet__title2'>
            <Link to={`/tours/${link2}`}>
              {tour2}
            </Link></h2>
          <Details2 show={tour2} set={props.tours} />
          <h4 className='grid__two--sport capitalize'>{sport2}</h4>
          <div className='grid__two--time'>
            <Time
              duration={duration2}
              start={start2}
              finish={finish2}
            />
          </div>
          <p className='grid__two--fitness capitalize'>{fitness2}<span className='show-below__vulture'>&nbsp;fitness</span></p>
          <p className='grid__two--location'><span className='show-below__vulture'>Starts at&nbsp;</span>Tahoe City</p>
          <p className='grid__two--about'>{excerpt2}</p>
          <p className='grid__two--minimum'>{minimum2}<span className='show-below__vulture'>&nbsp;people minimum</span></p>
          <p className='grid__two--price'>${price2}</p>
          <p className='grid__two--book'><a href={peeks2}
            rel="noopener noreferrer"
            className="book-now"
          >
            BOOK NOW
          </a></p>
        </div>
      </div >
    </>
  )
}

const ComparePage = () => {

  const { allStrapiTour } = useStaticQuery(graphql`
    query TourCompareQuery {
      allStrapiTour(sort: {featured: ASC},) {
        nodes {
          id
          fitness
          slug
          start
          sport
          peek
          price
          name
          minimum
          finish
          excerpt
          duration
        }
    }
  }
`)

  return (
    <>
      <Header />

      <main className='main__pelican'>
        <h1>Compare</h1>
        <Compare tours={allStrapiTour.nodes} />
      </main>

      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
      >
        <ol>
          <li>
            <Link to={`/tours`}>Tours</Link>&nbsp;/&nbsp;
          </li>
          <li aria-current="page">Compare</li>
        </ol>
      </nav>

      <Footer />
    </>
  )
}

export default ComparePage

export const Head = () => {
  return (
    <SEO
      title={`Compare Tours | ${useSiteMetadata().title}`}
    // TODO description and image
    >
      <Script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Tours",
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "Compare",
          }]
        }
      `}
      </Script>

    </SEO>
  )
}
