import React from 'react';
import './InstaLoader.css'
import instaLogo from '../../images/instalogo.png'
import meta from '../../images/metalogo.png'

function InstaLoader() {
  return (
    <>
    <div className="insta-loading">
        <div className="icon">
         <img src={instaLogo} alt="" />
         <div className="meta">
          <p>form</p>
          <img src={meta} alt="" />
         </div>
        </div>
        
    </div>
    </>
  )
}

export default InstaLoader