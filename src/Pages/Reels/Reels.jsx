import React, {useState, useRef} from 'react';
import './Reels.css';
import { GoUnmute } from "react-icons/go";
import { GoMute } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import DpImgReel from '../../images/dp3.png';
import { newsReels } from '../../Data';

function Reels() {

    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef(null);

    const handleTogglePlay = () => {
        if (videoRef.current) {
          if (videoRef.current.paused) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
          setIsPlaying(!isPlaying);
        }
      };
  return (
    <>
    <div className="reel-section">
        <div className="reel-container">
            {
                newsReels.map((items, index)=>(
                    <div className="reel-box" key={index}>
                        <div className="reel-content">
                        <video
                        ref={videoRef}
                        className="reel-video"
                        src={items.video}
                        title={`reel-video-${index}`}
                        onClick={handleTogglePlay}
                        autoPlay={false}  
                        loop={true}
                        muted={false}    
                        controls={false}
                        ></video>
             <div className="music-icon" onClick={handleTogglePlay}>
                {isPlaying ? (
                  <span className="music-on"><GoUnmute /></span>
                ) : (
                  <span className="music-off"><GoMute /></span>
                )}
              </div>
                {/* User info */}
                <div className="user-info">
                <img src={DpImgReel} alt="" />
                <div className="user-name">its_._.syedzada</div>
                <button className="follow-btn">Follow</button>
              </div>

              {/* Music info */}
              <div className="music-info">
                {/* <span>song</span> */}
              </div>
            </div>
                    <div className="reel-other-icon-box">
                        <div className="reel-icon-box">
                            <p><FaRegHeart /></p>
                            <span>2257</span>
                        </div>
                        <div className="reel-icon-box">
                            <p><FaRegComment /></p>
                            <span>578</span>
                        </div>
                        <div className="reel-icon-box ico">
                            <p><FiShare2 /></p>
                        </div>
                        <div className="reel-icon-box ico">
                            <p><FiBookmark /></p>
                        </div>
                        <div className="reel-icon-box ico">
                            <p><BsThreeDots /></p>
                        </div>

                    </div>
                        </div>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default Reels