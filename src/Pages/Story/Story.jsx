import React from 'react';
import "./Story.css";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import { HiSpeakerWave } from "react-icons/hi2";
import { FaPlay } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { FaRegShareSquare } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import dpImg4 from '../../images/dp4.png';
import dpImg1 from '../../images/dp1.png';

function Story() {
  return (
    <div className="story-page-conti">
        <div className="story-pages-box-main">
            <div className="story-instagram-name">
                <h2>Instagram</h2>
                <NavLink to="/" style={{border:"none"}}><p><RxCross2 /></p></NavLink>
            </div>
            <div className="real-story-status">
               <div className="real-story-box">
                  <img src={dpImg4} alt="" />
                  <div className="story-others-content-box">
                    <div className="story-main-context">
                       <div className="status-timer">
                           
                       </div>
                       <div className="status-timer">

                       </div>
                   </div>
                 <div className="story-main-section-box">
                 <div className="story-user-and-icon-box">
                      <div className="story-user-username">
                        <img src={dpImg1} alt=""  />
                        <p>its_._.syedzada</p>
                        <span>24h</span>
                      </div>
                      <div className="story-others-icons">
                        <h3><HiSpeakerWave /></h3>
                        <h3><FaPlay /></h3>
                        <h3><BsThreeDots /></h3>
                      </div>
                   </div>
                   <div className="input-share-other">
                    <input type="text" placeholder='Replay to its_.syedzada..' />
                    <div className="story-like-and-share">
                      <h3 className='story-status-like'><FaRegHeart /></h3>
                      <h3><FaRegShareSquare /></h3>
                    </div>
                   </div>
                 </div>
                </div>
               </div>
            </div>
        </div>

    </div>
  )
}

export default Story