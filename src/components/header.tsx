import React, { useState, useRef, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
// import Menu from "./menu"
// import MenuList from './menu-list';
// import Logo from '../images/logo';

function Button() {
  const [slide, setSlide] = useState('firstload');
  const [amount, setAmount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    // console.log(ref.current.clientHeight);
    setAmount(ref.current.clientHeight);
  });

  if (slide === "firstload") {
    // console.log('first');
    return (
      <div className='menu__small'
        style={{
          height: '2rem',
        }}
      >
        <button
          className="button-styles"
          onClick={() => setSlide('close')}
        >
          <span
            style={{ transform: 'translateY(-2rem)' }}
            className="span-styles"
          >CLOSE<br />MENU
          </span>
        </button>
        <nav
          className='menu__small'
          style={{
            transform: 'translateY(-' + amount + 'px)',
            marginBottom: '-' + amount + 'px',
            visibility: "hidden",
          }}
          ref={ref}
        >
          MenuList
        </nav>
      </div>
    );
  } else if (slide === "menu") {
    // console.log('menu');
    return (
      <div className='menu__small'>
        <button
          className="button-styles"
          onClick={() => setSlide('close')}
        >
          <span
            style={{ transform: 'translateY(-2rem)' }}
            className="span-styles"
          >CLOSE<br />MENU
          </span>
        </button>
        <nav
          className='menu__small'
          style={{
            transform: 'translateY(-' + amount + 'px)',
            marginBottom: '-' + amount + 'px',
            visibility: "hidden",
          }}
          ref={ref}
        >
          MenuList
        </nav>
      </div>
    );
  } else {
    // console.log('else');
    return (
      <div className='menu__small'
        style={{
          height: '2rem',
        }}
      >
        <button
          className="button-styles"
          onClick={() => setSlide('menu')}
        >
          <span
            style={{ transform: 'translateY(0)' }}
            className="span-styles"
          >CLOSE<br />MENU
          </span>
        </button>
        <nav
          style={{
            transform: 'translateY(0)',
            marginBottom: '-' + amount + 'px',
          }}
          ref={ref}
        >
          MenuList
        </nav>
      </div>
    );
  }
}

function TopBar(props: { markdown: string | null | undefined; }) {
  if (!props.markdown) {
    return null;
  } else {
    return (
      <div className="cap" >
        {/* // TODO: needs a date to remove after */}
        {/* // I renamed this as it was conflicting with the topbar that moves */}
        {/* <p>{strapiTopbar.markdown.data.markdown}</p> */}
        < ReactMarkdown
          children={props.markdown}
          remarkPlugins={[remarkGfm]}
        />
      </div>
    )
  }
}

const Header = () => {

  const { strapiTopbar } = useStaticQuery(graphql`
    query TopBarQuery {
      strapiTopbar {
        markdown {
          data {
            markdown
          }
        }
      }
    }
  `)

  return (
    <header>

      {/*
      // TODO this would be nice to be able to close but I dont have it right yet
      <StaticQuery
        query={query}
        render={data => (
          <OpenSeason topbar={data.strapiTopbar.text} />
        )}
      /> */}


      <TopBar markdown={strapiTopbar.markdown.data.markdown} />

      <div className="logo-container" >
        {/* <PaddleIcon className="paddle--left" /> */}
        <h1 className='logo'>
          <Link to="/" className="link__subtle">
            {/* Tahoe City Kayak */}
            Logo
          </Link>
        </h1>
      </div>
      Menu
      <Button />
    </header >
  )
}

export default Header
