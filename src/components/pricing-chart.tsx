import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
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

interface PricingTypes {
  book: boolean;
}
function PricingChart({ book }: PricingTypes) {

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

  interface RateTypes {
    id: React.Key;
    item: string;
    oneHour: number;
    threeHour: number;
    fullDay: number;
  }

  interface AddonTypes {
    name: string;
    single: number;
    double: number;
    sup: number;
  }

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

          {data.allStrapiRentalRate.nodes.map((rate: RateTypes) => (
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
          {/* // TODO: needs a key but broke the styling */}
          {data.allStrapiRentalAddon.nodes.map((addon: AddonTypes) => (
            <>
              <p key={addon.name}>{addon.name}</p>
              <p key={addon.single}>+{addon.single}</p>
              <p key={addon.double}>+{addon.double}</p>
              <p key={addon.sup}>+{addon.sup}</p>
            </>
          ))}
        </div>
      </div>
      <div className={`pricing-chart__${book}`}>
        <BookNow />
      </div>
    </>

  )
}

export default PricingChart
