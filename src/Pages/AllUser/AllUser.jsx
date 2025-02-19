import React, {useState, useEffect, useRef} from 'react';
import './AllUser.css';
import Dp from '../../images/dp1.png'
import emptyImg from '../../images/empty.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Help from '../../Components/Help/Help'
import { useParams } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import { CiFaceSmile } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { FiMoreHorizontal } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { useFirebase } from '../../Firebase';
import { FaRegBookmark } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";

function AllUser() {

  const firebase = useFirebase();
  const {alluserId} = useParams();

  const btnRef = useRef();

  const [userData, setUserData] = useState(null);
  const [postLoct, setPostLoct] = useState("");
  const [postdetail, setPostDetail] = useState("");
  const [postShare, setPostShare] = useState([]);
  const [bio, setBio] = useState("");
  const [modalImage, setModalImage] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [userFollow ,setUserFollow] = useState("");


  useEffect(()=>{
     const fetchUser = () => {
        const user = firebase.users.find((u)=> u.username === alluserId);
        setUserData(user);
     };
     fetchUser();
  },[firebase.users, alluserId]);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const fetchedBio = await firebase.getUserBio(); 
        setBio(fetchedBio); 
      } catch (error) {
        console.error("Error fetching bio:", error);
      }
    };

    fetchBio();
  }, [firebase]);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const fetchedUsername = await firebase.getUsername(); 
        setUsername(fetchedUsername); 
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchBio();
  }, [firebase]);

//   useEffect(() => {
//     const fetchFollowStatus = async () => {
//         try {
//             const targetUserUID = userData.userUID; // Target user's UID
//             const currentUID = firebase.user.uid;

//             if (userData.followRequests?.includes(currentUID)) {
//                 setUserFollow(true); // Mark as "Requested"
//             }
//         } catch (error) {
//             console.error("Error checking follow request status:", error);
//         }
//     };

//     if (userData) {
//         fetchFollowStatus();
//     }
// }, [userData, firebase.user]);

  // Check initial follow status
  useEffect(() => {
    const checkFollowStatus = async () => {
        if (!userData) return;
        const currentUID = firebase.user.uid;

        if (userData.followers?.some((follower) => follower.uid === currentUID)) {
            setUserFollow("Unfollow");
        } else if (userData.followRequests?.includes(currentUID)) {
            setUserFollow("Requested");
        } else {
            setUserFollow("Follow"); 
        }
    };

    checkFollowStatus();
}, [userData, firebase.user]);

  const handlerListedData = (post) => {
    setPostLoct(post.postLocation);
    setPostDetail(post.detail);
  };

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setModalOpen(true); 
};

const closeModal = () => {
  setModalImage(null);
  setModalOpen(false); 
};

const followRequest = async () => {
  try {
      await firebase.sendFollowRequest(userData.userUID);
      setUserFollow("Requested"); 
      btnRef.current.classList.add("active");
  } catch (error) {
      console.error("Error sending follow request:", error);
  }
};

 // Unfollow user
 const unfollowUser = async () => {
  try {
      await firebase.unfollowUser(userData.userUID);
      setUserFollow("Follow");
  } catch (error) {
      console.error("Error unfollowing user:", error);
  }
};

const handleFollowButtonClick = () => {
  if (userFollow === "Follow") {
      followRequest();
  } else if (userFollow === "Unfollow") {
      unfollowUser();
  }
};
 

  if (!userData) {
    return (
      <>
      <div className="plz-search-user">
      <h2>Plz Search User...</h2>
      </div>
      </>
    )
  };


  return (
    <>
    <main>
      <div className="user-container">
         <div className="top-user-section">
                <div className="logo-section">
                 <img src={userData.photoURL || emptyImg} alt="" />
                </div>
                <div className="profile-section">
                   <div className="profile-container">
                   <div className="user-username-detail">
                    <h4>{userData.username}</h4>
                    <button 
                    id='follow-btn-users' 
                    ref={btnRef} 
                    className='fo-fl-rq'
                    onClick={handleFollowButtonClick}
                    style={{
                      background:
                      userFollow === "Follow" ? "#007bff" :
                      userFollow === "Requested" ? "#e1e1e1" : 
                     userFollow === "Unfollow" ? "#e1e1e1" : "transparent",
                     color: 
                     userFollow === "Follow" ? "white" : "black",
                    }}
                    >{userFollow || "Follow"}
                    </button>
                    <button className='mg'>Message</button>
                    <h3><FiSettings /></h3>
                   </div>


                   <div className="set-btns users-all-set-btns">
                                         <div className="set-btn user-username-detail" >
                                         <button 
                                         id='follow-btn-users' 
                                         ref={btnRef} 
                                         onClick={handleFollowButtonClick}
                                         style={{
                                         background:
                                         userFollow === "Follow" ? "#007bff" :
                                         userFollow === "Requested" ? "#e1e1e1" : 
                                         userFollow === "Unfollow" ? "#e1e1e1" : "transparent",
                                         color: 
                                         userFollow === "Follow" ? "white" : "black",
                                         }}
                                         >{userFollow || "Follow"}
                                         </button>
                                         <button>Message</button>
                                         </div>
                                         </div>



                   <div className="folling-followers-details">
                    <h4>{userData.posts ? userData.posts.length : "0"} <span>post</span></h4>
                    <h4>{userData.followers ? userData.followers.length : "0"} <span>followers</span></h4>
                    <h4>{userData.following ? userData.following.length : "0"} <span>following</span></h4>
                   </div>
                   <div className="user-other-bio-details">
                     <div className="user-name">
                      <h4 className='account-name'>{userData.fullName}</h4>
                      <p>{userData.bio || ""}</p>
                     </div>
                   </div>
                </div>
              </div>
              </div>

              <div className="user-line">
               <hr />
              </div>
      </div>

      {userData.posts && userData.posts.length > 0 ? (
  <div className="posted-container-user-section">
    {userData.posts.map((post, index) => (
      <div key={index} className="posted-images" onClick={()=> handlerListedData(post)}>
        {Array.isArray(post.postURL) && post.postURL.length > 0 ? (
          <div className="image-slider">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
            >
              {post.postURL.map((url, urlIndex) => (
                <SwiperSlide key={urlIndex}>
                                <div 
                                   className="url-post posted-images"
                                   onClick={() => handleImageClick(url)}
                                 >
                                 {url.includes("mp4") ? (
                                 <video 
                                 src={url}
                                 muted
                                 autoPlay
                                 loop
                                 controls 
                                 playsInline
                                 className="user-post-reel-video"
                                 alt={`Video ${urlIndex}`}
                                 >
                                 </video>
                                 ) : (                
                                   <img
                                  src={url}
                                  alt={`Post ${urlIndex}`}
                                  className="post-image"
                                  />
                                  )}
                              </div>
                       </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <img
            src={post.postURL}
            alt={`Post ${index}`}
            onClick={() => handleImageClick(post.postURL)}
            className='#all-users-img'
          />
        )}
      </div>
    ))}
  </div>
) : (
  <div className="bottom-user-section">
    <div className="botttom-user-container">
      <div className="post-section">
        <div className="post-box">
          <h1><FiCamera /></h1>
          <h2>No Posts Yet</h2>
          <p>When you share photos, they will appear on your profile.</p>
        </div>
      </div>
    </div>
  </div>
)}


            {isModalOpen && (
                <div className="postview-modal" onClick={closeModal}>
                    <div className="postview-content" onClick={(e) => e.stopPropagation()}>
                        <img src={modalImage} alt="Clicked Image" />
                         <div className="postview-comment-other-container">
                            <div className="postview-user-box">
                              <div className="postview-dp-username">
                                <img src={userData.photoURL || emptyImg} alt="" />
                                  <div className="post-view-city">
                                    <h5>{userData.username}</h5>
                                    <p>{postLoct}</p>
                                 </div>
                                 </div>
                                <div className="postview-more">
                                  <p><FiMoreHorizontal /></p>
                               </div>
                             </div>
                             <div className="postview-line-width">
                      
                             </div>
                             <div className="postreview-comment">
                             <div className="postview-users-comments">
                                <img src={userData.photoURL || emptyImg} alt="" />
                                  <div className="post-view-city">
                                    <h5>{userData.username}</h5>
                                    <p>7 h</p>
                                 </div>
                                 </div>
                                 <div className="postview-detail">
                                  <p>{postdetail}</p>
                               </div>
                              </div>
                              <div className="postview-line-width-sec">
                      
                              </div> 

                       <div className="postview-liks-other-box">
                                  <div className="postview-likes-other">
                                     <h3><FaRegHeart /></h3>
                                     <h3><FaRegComment /></h3>
                                     <h3><FaRegShareSquare /></h3>
                                 </div>
                                 <div className="postview-save">
                                    <h3><FaRegBookmark /></h3>
                                </div>
                             </div>
                              <div className="likes-post">
                                <div className="postview-users-comments like-post-img">
                                   <img src={Dp} alt="" />
                                     <div className="post-likes-username">
                                       <h5>Liked by <span>Talha_rajpot</span> and <span>25 others</span></h5>
                                       <p>7 h</p>
                                     </div>
                                </div>
                        </div>
                        <div className="postview-line-width-third">
                      
                      </div> 

                      <div className="add-post-comment">
                        <div className="input-post-comment">
                            <h3><CiFaceSmile /></h3>
                            <textarea 
                            name="" 
                            id=""
                            placeholder='Add a comment...'
                            ></textarea>
                        </div>
                        <div className="post-post-submit">
                          <p>Post</p>
                        </div>
                      </div>
                        </div>
                       </div>
                    </div>
             )} 

     <div className="user-help-box">
     <Help/>
     </div>
    </main>
    </>
  )
}

export default AllUser