import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

function FormatPhoneNumber({ phoneNumberString }: { phoneNumberString: number }) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}

const Phone = () => {

  const { strapiLocale } = useStaticQuery(graphql`
    query PhoneQuery {
      strapiLocale(slug: {eq: "south-lake"}) {
        phone
      }
    }
  `)

  return (
    <a
      href={`tel:${strapiLocale.phone}`}
      rel="norel norefferer"
      className="button"
    >
      Phone: <FormatPhoneNumber phoneNumberString={strapiLocale.phone} />
    </a>
  )
}

export default Phone
