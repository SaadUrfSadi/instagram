import React, { useEffect, useState } from 'react';
import "./Story.css";
import { RxCross2 } from "react-icons/rx";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { HiSpeakerWave } from "react-icons/hi2";
import { FaPlay } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { FaRegShareSquare, FaRegHeart, FaHeart } from "react-icons/fa";
import { useFirebase } from '../../Firebase';

function Story() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const { storyId } = useParams(); // Get storyId from the route
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(null); // Track the current user
  const [likedStory, setLikedStory] = useState(false);

  // Get all stories
  const stories = firebase.allStory;

  // Fetch stories when the component mounts
  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        await firebase.storyFetch();
      } catch (error) {
        console.error("Error in fetching story data", error);
      }
    };
    fetchStoryData();
  }, [firebase]);

  // Map storyId to currentUserIndex when stories are loaded
  useEffect(() => {
    if (storyId && stories.length > 0) {
      const userIndex = stories.findIndex((user) => user.id === storyId || user.username === storyId);
      if (userIndex !== -1) {
        setCurrentUserIndex(userIndex);
        setCurrentStoryIndex(0); // Reset to the first story
      } else {
        console.error("Invalid storyId or user not found");
        navigate('/'); // Redirect to home if storyId is invalid
      }
    }
  }, [storyId, stories, navigate]);

  // Automatically cycle through stories
  useEffect(() => {
    if (currentUserIndex === null || !stories[currentUserIndex]) return;

    const currentStoryUser = stories[currentUserIndex];
    if (!currentStoryUser || currentStoryUser.storyURL.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentStoryIndex((prevIndex) => {
        if (prevIndex < currentStoryUser.storyURL.length - 1) {
          return prevIndex + 1; // Move to the next story
        } else {
          // Move to the next user if available
          if (currentUserIndex < stories.length - 1) {
            setCurrentStoryIndex(0); // Reset story index for the new user
            setCurrentUserIndex((prevUserIndex) => prevUserIndex + 1); // Move to the next user
          } else {
            // Redirect to home if no more users
            navigate('/');
          }
          clearInterval(intervalId);
          return prevIndex;
        }
      });
    }, 15000); // 15 seconds per story

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [currentUserIndex, stories, navigate]);

  const MsgLikeStory = async (URL, photoURL, username) => {
    setLikedStory((prev) => !prev);
    if (!likedStory) {
      await firebase.likesStory(URL, photoURL, username);
    } else {
      console.error("Error in likes");
    }
  };

  // Redirect to home if no stories are available
  if (currentUserIndex === null || !stories[currentUserIndex]) {
    return <p>Loading story...</p>; // Keep this section for loading state
  }

  const currentStoryUser = stories[currentUserIndex];

  return (
    <div className="story-page-conti">
      <div className="story-pages-box-main">
        <div className="story-instagram-name">
          <h2>Instagram</h2>
          <NavLink to="/" style={{ border: "none" }}>
            <p><RxCross2 /></p>
          </NavLink>
        </div>
        <div className="real-story-status">
          <div className="real-story-box">
            {currentStoryUser.storyURL[currentStoryIndex].includes('mp4') ? (
              <video
                src={currentStoryUser.storyURL[currentStoryIndex]}
                autoPlay
                muted
                loop
                controls={false}
                className="real-story-users"
              />
            ) : (
              <img src={currentStoryUser.storyURL[currentStoryIndex]} alt="Story" />
            )}
            <div className="story-others-content-box">
              <div className="story-main-context">
                {/* Status Timers */}
                <div className="status-timers-container">
                  {currentStoryUser.storyURL.map((_, index) => (
                    <div
                      key={index}
                      className={`status-timer ${index === currentStoryIndex ? "active" : ""}`}
                    >
                      <div
                        className="status-timer-flow"
                        style={{
                          animation: index === currentStoryIndex
                            ? 'fill-status-timer 15s linear forwards'
                            : 'none',
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="story-main-section-box">
                <div className="story-user-and-icon-box">
                  <div className="story-user-username">
                    <img src={currentStoryUser.photoURL} alt="User Avatar" />
                    <p>{currentStoryUser.username}</p>
                    <span>24h</span>
                  </div>
                  <div className="story-others-icons">
                    <h3><HiSpeakerWave /></h3>
                    <h3><FaPlay /></h3>
                    <h3><BsThreeDots /></h3>
                  </div>
                </div>
                <div className="input-share-other">
                  <input type="text" placeholder={`Reply to ${currentStoryUser.username}...`} />
                  <div className="story-like-and-share">
                    <h3
                      className="story-status-like"
                      onClick={() =>
                        MsgLikeStory(currentStoryUser.storyURL[currentStoryIndex], currentStoryUser.photoURL, currentStoryUser.username)
                      }
                    >
                      {likedStory ? <FaHeart style={{ color: "#e637ec" }} /> : <FaRegHeart />}
                    </h3>
                    <h3><FaRegShareSquare /></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Story;