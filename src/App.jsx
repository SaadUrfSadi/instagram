import React from 'react';
import { useEffect, useState } from 'react'
import './App.css'
import Login from './Pages/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import { useFirebase } from './Firebase'
import InstaLoader from './Components/Loader/InstaLoader'
import Layout from './Layout';
import Explore from './Pages/Explore/Explore';
import User from './Pages/User/User';
import Reels from './Pages/Reels/Reels';
import Messages from './Pages/Msg/Messages';
import Setting from './Pages/Setting/Setting';
import AllUser from './Pages/AllUser/AllUser';
import Story from './Pages/Story/Story';
import Chats from './Pages/Chats/Chats';

function App() {

  const firebase = useFirebase();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <InstaLoader />;
  }

  if (firebase.isLoggedIn === false) {
    return <Login/>;
  };

  const router = createBrowserRouter([
    {
    path:"/",
    element:<Layout/>,
    children:[
      {
      path:"",
      element:<HomePage/>
      },
      {
        path:"/explore",
        element:<Explore/>
      },
      {
        path:"/user",
        element:<User/>
      },
      {
        path:"/reels",
        element:<Reels/>
      },
      {
        path:"/messages",
        element:<Messages/>
      },
      {
        path:"/chats/:chatsId",
        element:<Chats/>
      },
      {
        path:"/setting",
        element:<Setting/>
      },
      {
        path:"/alluser/:alluserId",
        element:<AllUser/>
      },
      {
        path:"/story/:storyId",
        element:<Story/>
      },

    ]
    }
])
  

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
