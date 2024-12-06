import React from 'react';
import "./Story.css";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from 'react-router-dom';

function Story() {
  return (
    <div className="story-page-conti">
        <div className="story-pages-box-main">
            <div className="story-instagram-name">
                <h2>Instagram</h2>
                <NavLink to="/" style={{border:"none"}}><p><RxCross2 /></p></NavLink>
            </div>
        </div>

    </div>
  )
}

export default Story