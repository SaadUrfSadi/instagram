import React, { useState, useRef, useEffect } from 'react';
import './Reels.css';
import { GoUnmute, GoMute } from "react-icons/go";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FiShare2, FiBookmark } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { useFirebase } from '../../Firebase';
import emptyImg from "../../images/empty.jpeg";

function Reels() {
  const firebase = useFirebase();
  const [isPlaying, setIsPlaying] = useState({});
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        await firebase.allPosts();
      } catch (error) {
        console.error("Error in fetching reels:", error);
      }
    };
    fetchReels();
  }, [firebase]);

  const videoPosts = firebase.allPostsAndReels.filter(
    (post) =>
      Array.isArray(post.postURL) &&
      post.postURL.some((url) => url.includes('.mp4') || url.includes('.webm'))
  );

  const handleTogglePlay = (index) => {
    const currentVideo = videoRefs.current[index];
    if (currentVideo) {
      if (currentVideo.paused) {
        currentVideo.play();
        setIsPlaying((prev) => ({ ...prev, [index]: true }));
      } else {
        currentVideo.pause();
        setIsPlaying((prev) => ({ ...prev, [index]: false }));
      }
    }
  };

  return (
    <div className="reel-section">
      <div className="reel-container">
        {videoPosts.map((items, index) => {
          const videoUrl = items.postURL.find(
            (url) => url.includes('.mp4') || url.includes('.webm')
          );
          return (
            <div className="reel-box" key={index}>
              <div className="reel-content">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="reel-video"
                  src={videoUrl}
                  title={`reel-video-${index}`}
                  onClick={() => handleTogglePlay(index)}
                  autoPlay={false}
                  loop
                  muted={!isPlaying[index]}
                  controls={false}
                />
                <div
                  className="music-icon"
                  onClick={() => handleTogglePlay(index)}
                >
                  {isPlaying[index] ? (
                    <span className="music-on">
                      <GoUnmute />
                    </span>
                  ) : (
                    <span className="music-off">
                      <GoMute />
                    </span>
                  )}
                </div>
                <div className="user-info">
                  <img src={items.photoURL || emptyImg} alt="" />
                  <div className="user-name">{items.username}</div>
                  <button className="follow-btn">Follow</button>
                </div>
                <div className="music-info">{/* Optional music info */}</div>
              </div>
              <div className="reel-other-icon-box">
                <div className="reel-icon-box">
                  <p>
                    <FaRegHeart />
                  </p>
                  <span>1488</span>
                </div>
                <div className="reel-icon-box">
                  <p>
                    <FaRegComment />
                  </p>
                  <span>455</span>
                </div>
                <div className="reel-icon-box ico">
                  <p>
                    <FiShare2 />
                  </p>
                </div>
                <div className="reel-icon-box ico">
                  <p>
                    <FiBookmark />
                  </p>
                </div>
                <div className="reel-icon-box ico">
                  <p>
                    <BsThreeDots />
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reels;