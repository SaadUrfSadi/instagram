import React from 'react';
import Nav from './Pages/Nav/Nav';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();

  const excludeNavPaths = ['/story/', '/chats/'];

  const hideNav = excludeNavPaths.some((path) => location.pathname.startsWith(path));

  return (
    <>
      {!hideNav && <Nav />}
      <Outlet />
    </>
  );
}

export default Layout;