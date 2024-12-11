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
  const { storyId } = useParams();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [likedStory, setLikedStory] = useState(false);
  
  const story = firebase.allStory.find(story => story.username === storyId);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        await firebase.storyFetch();
      } catch (error) {
        console.log("Error in fetching story data", error);
      }
    };
    fetchStoryData();
  }, [firebase.storyFetch]);

  useEffect(() => {
    if (!story || story.storyURL.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentStoryIndex(prevIndex => {
        if (prevIndex < story.storyURL.length - 1) {
          return prevIndex + 1;
        } else {
          navigate('/'); // Go back to home after the last story
          clearInterval(intervalId);
          return prevIndex; // Prevent additional state updates after navigating
        }
      });
    }, 15000); // Story changes every 15 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on unmount or when story changes
  }, [story, navigate]);

  useEffect(() => {
    if (story && story.storyURL.length > 0) {
      const lines = document.querySelectorAll('.status-timer');

      // Reset all the status-timer flows
      lines.forEach(line => {
        const flow = line.querySelector('.status-timer-flow');
        if (flow) {
          flow.style.left = '-100%';
        }
      });

      const currentLine = lines[currentStoryIndex];
      if (!currentLine) return navigate('/');

      const flow = currentLine.querySelector('.status-timer-flow');
      if (flow) {
        flow.style.transition = 'none';
        flow.style.left = '-100%';
        flow.offsetHeight; // Trigger a reflow to reset the transition
        flow.style.transition = 'left 15s linear';
        flow.style.left = '0%';
      }
    }
  }, [currentStoryIndex, story]);

  const MsgLikeStory = async (URL, photoURL, username) => {
    setLikedStory(prev => !prev);
    console.log(URL);
    console.log(photoURL);
    console.log(username)
    if (!likedStory) {
      await firebase.likesStory(URL, photoURL, username);
      console.log("likes list in firebase database")
    }else{
      console.log("Error in liks");
    }
  };

  if (!story || !story.storyURL[currentStoryIndex]) {
    return navigate('/');
  };

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
          {story ? (
            <div className="real-story-box">
              {story.storyURL[currentStoryIndex].includes('mp4') ? (
                <video 
                  src={story.storyURL[currentStoryIndex]} 
                  alt="Story" 
                  autoPlay 
                  muted 
                  loop 
                  controls={false}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <img src={story.storyURL[currentStoryIndex]} alt="Story" />
              )}
              <div className="story-others-content-box">
                <div className="story-main-context">
                  <div className="status-timers-container">
                    {story.storyURL.map((_, index) => (
                      <div key={index} className="status-timer">
                         <div className="status-timer-flow"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="story-main-section-box">
                  <div className="story-user-and-icon-box">
                    <div className="story-user-username">
                      <img src={story.photoURL} alt="User Avatar" />
                      <p>{story.username}</p>
                      <span>24h</span>
                    </div>
                    <div className="story-others-icons">
                      <h3><HiSpeakerWave /></h3>
                      <h3><FaPlay /></h3>
                      <h3><BsThreeDots /></h3>
                    </div>
                  </div>
                  <div className="input-share-other">
                    <input type="text" placeholder={`Reply to ${story.username}...`} />
                    <div className="story-like-and-share">
                      <h3 className="story-status-like" onClick={()=> MsgLikeStory(story.storyURL[currentStoryIndex], story.photoURL, story.username)}>
                        {likedStory ? <FaHeart style={{ color: "#e637ec" }} /> : <FaRegHeart />}
                      </h3>
                      <h3><FaRegShareSquare /></h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading story...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Story;



// import React, { useEffect, useState } from 'react';
// import "./Story.css";
// import { RxCross2 } from "react-icons/rx";
// import { NavLink, useParams, useNavigate } from 'react-router-dom';
// import { HiSpeakerWave } from "react-icons/hi2";
// import { FaPlay } from "react-icons/fa6";
// import { BsThreeDots } from "react-icons/bs";
// import { FaRegShareSquare } from "react-icons/fa";
// import { FaRegHeart } from "react-icons/fa";
// import { useFirebase } from '../../Firebase';
// import { FaHeart } from "react-icons/fa";
// import anime from 'animejs';

// function Story() {
//   const firebase = useFirebase();
//   const navigate = useNavigate();
//   const { storyId } = useParams();
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const [timer, setTimer] = useState(null);
//   const [likedStory, setLikedStory] = useState(false);
  
//   const story = firebase.allStory.find(story => story.username === storyId);

//   useEffect(() => {
//     const fetchStoryData = async () => {
//       try {
//         await firebase.storyFetch();
//       } catch (error) {
//         console.log("Error in fetching story data", error);
//       }
//     };
//     fetchStoryData();
//   }, [firebase.storyFetch]);

//   useEffect(() => {
//     if (story && story.storyURL.length > 0) {
//       setTimer(setInterval(() => {
//         if (currentStoryIndex < story.storyURL.length - 1) {
//           setCurrentStoryIndex(prevIndex => prevIndex + 1);
//         } else {
//           navigate('/'); // Go back to home after the last story
//         }
//       }, 15000)); // Story changes every 15 seconds
//     }

//     return () => {
//       if (timer) {
//         clearInterval(timer);
//       }
//     };
//   }, [story, currentStoryIndex, timer, navigate]);
 
//   useEffect(() => {
//     if (story && story.storyURL.length > 0) {
//       const lines = document.querySelectorAll('.status-timer');
  
//       lines.forEach(line => {
//         const flow = line.querySelector('.status-timer-flow');
//         if (flow) {
//           flow.style.left = '-100%';
//         }
//       });
  
//       const currentLine = lines[currentStoryIndex];
//       if (!currentLine) {
//         return  navigate('/');
//       }
//       const flow = currentLine.querySelector('.status-timer-flow');
  
//       if (flow) {
//         flow.style.transition = 'none'; 
//         flow.style.left = '-100%'; 
//         flow.offsetHeight; 
//         flow.style.transition = 'left 15s linear';
//         flow.style.left = '0%';
//         flow.style.width = "100%"
//         // flow.style.right = "0";
//       }
//     }
//   }, [currentStoryIndex, story]);

//   const MsgLikeStory = async (URL, photoURL, username) => {
//     setLikedStory((prev) => !prev);
//     if (likedStory === true) {
//       await firebase.likesStory(URL, photoURL, username);
//       console.log(URL);
//       console.lo(photoURL);
//       console.log(username)
//     }
//   }
  
  

//   // useEffect(() => {
//   //   if (story && story.storyURL.length > 0) {
//   //     const lines = document.querySelectorAll('.status-timer');
      
//   //     lines.forEach(line => {
//   //       anime.remove(line);
//   //       line.style.width = '100%';
//   //     });

//   //     anime({
//   //       targets: lines[currentStoryIndex],
//   //       width: '100%',
//   //       backgroundColor: '#orange',
//   //       duration: 15000, 
//   //       easing: 'linear',
//   //     });
//   //   }
//   // }, [currentStoryIndex, story]);


//   if (!story || !story.storyURL[currentStoryIndex]) {
//     return navigate('/');
//   }

//   return (
//     <div className="story-page-conti">
//       <div className="story-pages-box-main">
//         <div className="story-instagram-name">
//           <h2>Instagram</h2>
//           <NavLink to="/" style={{ border: "none" }}>
//             <p><RxCross2 /></p>
//           </NavLink>
//         </div>
//         <div className="real-story-status">
//           {story ? (
//             <div className="real-story-box">
//               {story.storyURL[currentStoryIndex].includes('mp4') ? (
//                 <video 
//                   src={story.storyURL[currentStoryIndex]} 
//                   alt="Story" 
//                   autoPlay 
//                   muted 
//                   loop 
//                   controls={false}
//                   style={{ width: "100%", height: "100%" }}
//                 />
//               ) : (
//                 <img src={story.storyURL[currentStoryIndex]} alt="Story" />
//               )}
//               <div className="story-others-content-box">
//                 <div className="story-main-context">
//                   {/* Dynamic line container */}
//                   <div className="status-timers-container">
//                     {story.storyURL.map((_, index) => (
//                       <div key={index} className="status-timer">
//                          <div className="status-timer-flow"></div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="story-main-section-box">
//                   <div className="story-user-and-icon-box">
//                     <div className="story-user-username">
//                       <img src={story.photoURL} alt="User Avatar" />
//                       <p>{story.username}</p>
//                       <span>24h</span>
//                     </div>
//                     <div className="story-others-icons">
//                       <h3><HiSpeakerWave /></h3>
//                       <h3><FaPlay /></h3>
//                       <h3><BsThreeDots /></h3>
//                     </div>
//                   </div>
//                   <div className="input-share-other">
//                     <input type="text" placeholder={`Reply to ${story.username}...`} />
//                     <div className="story-like-and-share">
//                       <h3 className="story-status-like" onClick={()=> MsgLikeStory(story.storyURL[currentStoryIndex], story.photoURL, story.username)}>{ likedStory ? <FaHeart style={{color: "#e637ec"}} /> : <FaRegHeart />}</h3>
//                       <h3><FaRegShareSquare /></h3>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p>Loading story...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Story