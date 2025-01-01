import React, {useEffect, useState, useRef} from 'react';
import './Explore.css'
import { useFirebase } from '../../Firebase';
import { GoUnmute, GoMute } from "react-icons/go";
import { FaRegCircleXmark } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import emptyImg from "../../images/empty.jpeg"

  
function Explore() {

  const firebase = useFirebase();

    const [isPlaying, setIsPlaying] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]); 

    const searchBoxRef = useRef();
    const videoRefs = useRef([]);


  const isTargetImage = (index) => {
    const position = index + 1; 
  
    if (position === 3 || position === 6) return true;
  
    if (position > 1 && (position - 1) % 12 === 0) return true;
  
    return false;
  };

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
       searchBoxRef.current.classList.remove("active");
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
     

    const handleSearchInput = (e) => {
      const inputValue = e.target.value;
      setSearchTerm(inputValue);
   
      if (inputValue.trim() !== "") {
        const filtered = firebase.users.filter((user) =>
          user.username.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredUsers(filtered.slice(0,5)); 
      } else {
        setFilteredUsers([]); 
      }
    };
   

    const searchtermRemove = () => {
      setFilteredUsers([]); 
      setSearchTerm("");
      searchBoxRef.current.classList.remove("active");
    };

    const searchBox = () => {
      searchBoxRef.current.classList.add("active")
    }

  return (
    <>
    {/* <main> */}
        <div className="explore-section-container">
          <div className="search-container exp-search-box">

                    <div className="search-input-ex">
                      <input 
                      type="text" 
                      placeholder='Search' 
                      value={searchTerm}
                      onChange={handleSearchInput}
                      onKeyUp={firebase.searchUsername}
                      onClick={searchBox}
                      />
                     </div>
                     <div className="cross-icon-search cross-ex">
                       <p onClick={searchtermRemove}><FaRegCircleXmark /></p>
                     </div>
                    </div>
                    
                    <div className="search-all-usernames-show-box" ref={searchBoxRef}>
                        <div className="recent-data recent-explore-name">
                                    <h4>Recent</h4>
                              </div>
                       
                                    <div className="search-data-usernames no-recentsearch">
                                    {filteredUsers.length > 0 ? (
                                   filteredUsers.map((users, index) => (
                                      <NavLink to={`/alluser/${users.username}`} style={{textDecoration:"none", border:"none", outline:"none", color:"black"}}>
                                       <div className="serches-user search-user-ex" key={index}>
                                         <div className="searches-user-dp">
                                         <img src={users.photoURL || emptyImg} alt={index} />
                                         </div>
                                       <div className="serches-username">
                                         <p>{users.username}</p>
                                         <span>{users.fullName}</span>
                                       </div>
                                      </div>
                                      </NavLink>
                                   ))
                                 ) : (
                                   <h4>No recent searches</h4>
                                 )}
                                    </div>
                    </div>
          
            <div className="explore-box-container">
            {videoPosts.map((items, index) => {
          const videoUrl = items.postURL.find(
            (url) => url.includes('.mp4') || url.includes('.webm')
          );
          return(
            <div className="explore-box-container" key={index}>
              <div className={`explore-box ${isTargetImage(index) ? "span-box" : ""}`}>

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
                </div>
                </div>
          )
              }
              )}              
            </div>
        </div>
    
    </>
  )
}

export default Explore