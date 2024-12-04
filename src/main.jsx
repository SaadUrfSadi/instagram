import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './Context.jsx';
import { FirebaseProvider } from './Firebase.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <FirebaseProvider>
         <App />
      </FirebaseProvider>
    </ContextProvider>
  </StrictMode>
)
