import React from 'react'
import Nav from './Pages/Nav/Nav'
import { Outlet, useLocation } from 'react-router-dom'

function Layout() {

  const location = useLocation();

  const isStoryPage = location.pathname.startsWith('/story/');
  return (
    <>
    {!isStoryPage && <Nav />}
    {/* {location.pathname !== `/story/` && <Nav/> } */}
    <Outlet/>
    </>
  )
}

export default Layout