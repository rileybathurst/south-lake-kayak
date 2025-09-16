import React, { useState, useRef, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from "gatsby"
import LargeMenu from "./large-menu"
import MenuList from './menu-list';
import Logo from '../images/logo';
import { PaddleTopBar } from '@rileybathurst/paddle';

// * I was doing something about if the top banner should close
// * but never finished it

function SmallMenu() {

  const CloseLoop = () => {
    return (
      <button
        type="button"
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
            transform: `translateY(-${amount}px)`,
            marginBottom: `-${amount}px`,
            visibility: "hidden",
          }}
          ref={ref}
        >
          <MenuList />
        </nav>
      </div >
    );
  }

  if (slide === "menu") {
    // console.log('menu');
    return (
      <div className='menu__small'>
        <CloseLoop />
        <nav
          className='menu__small'
          style={{
            transform: `translateY(-${amount}px)`,
            marginBottom: `-${amount}px`,
            visibility: "hidden",
          }}
          ref={ref}
        >
          <MenuList />
        </nav>
      </div>
    );
  }
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
        type='button'
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
          marginBottom: `-${amount}px`,
        }}
        ref={ref}
      >
        <MenuList />
      </nav>
    </div>
  );
}

const Header = () => {

  const {strapiBranch} = useStaticQuery(graphql`
    query TopBarQuery {
      strapiBranch(slug: {eq: "south-tahoe"}) {
        name

        topbar {
          data {
            topbar
          }
        }
      }
    }
  `)

  // console.log(strapiBranch.name);

  return (
    <header>

      <PaddleTopBar {...strapiBranch} />
      <p className='sr-only'>
        {strapiBranch.name} Kayak & Paddleboard rentals and tours
      </p>

      <div className="logo-container" >
        <Link
          to="/"
          className="link__subtle"
        >
          <Logo />
        </Link>
        <h1 className='sr-only'>
          <Link to="/" className="link__subtle">
            {strapiBranch.name} &amp; Paddleboard
          </Link>
        </h1>
      </div>
      <LargeMenu />
      <SmallMenu />
    </header >
  )
}

export default Header
