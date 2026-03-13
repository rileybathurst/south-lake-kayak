import React from 'react';
import { Link, useStaticQuery, graphql } from "gatsby"
import { MenuList } from './menu-list';
import Logo from '../images/logo';
import {
  PaddleTopBar,
  PaddleMenu
} from '@rileybathurst/paddle';

const Header = () => {

  const data = useStaticQuery(graphql`
    query TopBarQuery {
      strapiBranch(slug: {eq: "south-tahoe"}) {
        name
          peek_base

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

      <PaddleTopBar {...data} />
      <p className='sr-only'>
        {data.strapiBranch.name} Kayak & Paddleboard rentals and tours
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
            {data.strapiBranch.name} Kayak &amp; Paddleboard
          </Link>
        </h1>
      </div>

      <PaddleMenu
        menu_items={MenuList}
        peek_base={data.strapiBranch.peek_base}
        strapiBranchName={data.strapiBranch.name}
      />

    </header >
  )
}

export default Header
