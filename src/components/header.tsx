import React, { useState, useRef, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import LargeMenu from "./large-menu"
import MenuList from './menu-list';
import Logo from '../images/logo';
import { useSiteMetadata } from "../hooks/use-site-metadata"

// * I was doing something about if the top banner should close
// * but never finished it

function SmallMenu() {

  const CloseLoop = () => {
    return (
      <button
        className="button-styles"
        onClick={() => setSlide('close')}
      >
        <span
          style={{
            transform: 'translateY(-2rem)'
          }}
          className="span-styles"
        >CLOSE<br />MENU
        </span>
      </button>

    )
  }

  // first and closed are the same just loop them
  // ? why do I need first load cant I just use closed
  // * is the problem the ref?
  // !: theres 2 levels of menu__small classes nested in each other surley this is weird

  const [slide, setSlide] = useState('firstload');
  const [amount, setAmount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    // console.log(ref.current.clientHeight);
    setAmount(ref.current.clientHeight);
  });

  if (slide === "firstload") {
    return (
      <div className='menu__small'
        style={{
          height: '2rem',
        }}
      >
        <CloseLoop />
        <nav
          className='menu__small'
          style={{
            transform: 'translateY(-' + amount + 'px)',
            marginBottom: '-' + amount + 'px',
            visibility: "hidden",
          }}
          ref={ref}
        >
          <MenuList />
        </nav>
      </div>
    );
  } else if (slide === "menu") {
    // console.log('menu');
    return (
      <div className='menu__small'>
        <CloseLoop />
        <nav
          className='menu__small'
          style={{
            transform: 'translateY(-' + amount + 'px)',
            marginBottom: '-' + amount + 'px',
            visibility: "hidden",
          }}
          ref={ref}
        >
          <MenuList />
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
          <MenuList />
        </nav>
      </div>
    );
  }
}

const Header = () => {

  const { strapiSouthLakeTopBar } = useStaticQuery(graphql`
        query TopBarQuery {
          strapiSouthLakeTopBar {
          topbar {
          data {
          topbar
        }
        }
      }
    }
        `)

  return (
    <header>

      {/* // TODO: needs a date to remove after */}
      <div className="top-bar" >
        < ReactMarkdown
          children={strapiSouthLakeTopBar.topbar.data.topbar}
          remarkPlugins={[remarkGfm]}
        />
      </div>

      <div className="logo-container" >
        <Link
          to="/"
          className="link__subtle"
        >
          <Logo />
        </Link>
        <h1 className='sr-only'>
          <Link to="/" className="link__subtle">
            {useSiteMetadata().title}
          </Link>
        </h1>
      </div>
      <LargeMenu />
      <SmallMenu />
    </header >
  )
}

export default Header
