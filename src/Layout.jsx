import React from 'react'
import Nav from './Pages/Nav/Nav'
import { Outlet, useLocation } from 'react-router-dom'

function Layout() {

  const location = useLocation();
  return (
    <>
    {location.pathname !== "/story" && <Nav/> }
    <Outlet/>
    </>
  )
}

export default Layout