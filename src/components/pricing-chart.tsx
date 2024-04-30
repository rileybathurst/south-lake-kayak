import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import BookNow from "./peek/book-now"

function LineBreaker(props: { text: string; }) {
  const regex = /[- ]/g;
  const newStr = props.text.replace(regex, "<br />$&");
  // console.log(newStr);

  return (
    <h4>
      <span
        dangerouslySetInnerHTML={{ __html: newStr }}
      />
    </h4>
  );
}

const PricingChart = (props: { book: boolean; }) => {

  const data = useStaticQuery(graphql`
    query PricingChartQuery {
      allStrapiRentalRate(filter: {favorite: {eq: true}}) {
        nodes {
          id
          item
          oneHour
          threeHour
          fullDay
        }
      }

      strapiRentalAddon(name: {eq: "Pedal Drive"}) {
        name
        single
        double
        sup
      }

      allStrapiRentalAddon {
        nodes {
          name
          single
          double
          sup
        }
      }
    }
  `)

  return (
    <>
      <div className="charts">
        <div className="pricing-chart">
          <div className="row row-header">
            <h2 className="kilimanjaro">
              <span>Rental<br />Rates</span>
            </h2>
            <p>1 Hour</p>
            <p><span>3 Hours</span></p>
            <p><span>Full Day</span></p>
          </div>

          {data.allStrapiRentalRate.nodes.map((rate: {
            id: React.Key;
            item: string;
            oneHour: number;
            threeHour: number;
            fullDay: number;
          }) => (
            <div key={rate.id} className="row">
              {/* <h4>{rate.item}</h4> */}
              <LineBreaker text={rate.item} />
              <p>{rate.oneHour}</p>
              <p>{rate.threeHour}</p>
              <p>{rate.fullDay}</p>
            </div>
          ))}
        </div>

        <div className="pricing-chart">
          {data.allStrapiRentalAddon.nodes.map((addon: { name: string; }) => (
            <>
              <p>{addon.name}</p>
              <p>+{addon.single}</p>
              <p>+{addon.double}</p>
              <p>+{addon.sup}</p>
            </>
          ))}
        </div>
      </div>
      <div className={`pricing-chart__${props.book}`}>
        <BookNow />
      </div>
    </>

  )
}

export default PricingChart
