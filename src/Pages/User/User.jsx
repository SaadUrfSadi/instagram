import React, {useState, useEffect, useRef} from 'react';
import Help from '../../Components/Help/Help'
import Dp from '../../images/dp2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './User.css';
import { Navigation, Pagination } from 'swiper/modules';
import { MdOutlineInsertPhoto } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { FaXmark } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { FiPlusSquare } from "react-icons/fi";
// import { FiSettings } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { FiMoreHorizontal } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { useFirebase } from '../../Firebase';
import { FaCamera } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { FaAngleDown } from 'react-icons/fa';
import { FaRegShareSquare } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import PostLoader from '../../Components/PostLoader/PostLoader';
import emptyImg from "../../images/empty.jpeg"

function User() {

  const soOnRef = useRef();
  const copyesRef = useRef();

  const firebase = useFirebase();

  const [bio, setBio] = useState("");
  const [username, setUsername] = useState('');
  const [modalActive, setModalActive] = useState(false); 
  const [selected, setSelected] = useState(false);
  const [selectChange, setSelectChange] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [nextPostPage, setNextPostPage] = useState(false);
  const [detail, setDetail] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [input, setInput] = useState("");
  const [sharePost, setSharePost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [posted , setPosted] = useState(true);
  const [listPost, setListPost] = useState([]);
  const [modalImage, setModalImage] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [postLoct, setPostLoct] = useState("");
  const [postdetail, setPostDetail] = useState("");
  const [postShare, setPostShare] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [post, setPost] = useState([]);
  const [isFollowerModal, setIsFollowerModal] = useState(false);
  const [isFollowingModal, setIsFollowingModal] = useState(false);
  const [followersFilter, setFollowersFilter] = useState([]);
  const [followingFilter, setFollowingFilter] = useState([]);
  const [followersTrim, setFollowersTrim] = useState("");
  const [followingTrim, setFollowingTrim] = useState("");
  const [videoModal, setVideoModal] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await firebase.listAllPost(); 
        console.log("Fetched Posts:", data); 
        const uniquePosts = [...new Set(data)]; 
        setListPost(uniquePosts);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
    fetchPost();
  }, []);
  
  // getUsername k useEffect ha
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

  // username k useEffect ha
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

  useEffect(()=>{
    const fetchFollowers = async () => {
      try {
        const allFollowers = await firebase.followersFetchData();
        setFollowers(allFollowers);
      } catch (error) {
        console.log("err in fetch followers", error);
        throw error
      }
    };
    fetchFollowers();
  },[]);

  useEffect(()=>{
    const fetchFollowing = async () => {
      try {
        const allFollowing = await firebase.followingFetchData();
        setFollowing(allFollowing);
      } catch (error) {
        console.log("err in fetch following", error);
        throw error
      }
    };
    fetchFollowing();
  },[]);

  useEffect(()=>{
    const fetchPosts = async () => {
      try {
        const allPosts = await firebase.postFetchData();
        console.log(allPosts)
        setPost(allPosts);
      } catch (error) {
        console.log("err in fetch posts", error);
        throw error
      }
    };
      fetchPosts();
  },[])

  useEffect(()=> {
    if(selectedImageIndex === 0){
         setSelected(true)
    }
  },[]);

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl); 
    setModalOpen(true);
    if (imageUrl.includes("mp4")) {
      setVideoModal(imageUrl)
    }
};

const closeModal = () => {
    setModalImage(null); 
    setModalOpen(false); 
};

const handlerListedData = (post) => {
  setPostLoct(post.postLocation);
  setPostDetail(post.detail);
  setPostShare(post)
};

const handleShare = async () => {
  const shareData = {
    title: "Check out this post!",
    text: postShare.detail || "Amazing post!",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      console.log("Post shared successfully!");
    } else {
      await navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard. Share it with your friends!");
    }
  } catch (error) {
    console.error("Error sharing the post:", error);
  }
};

const toggleModal = () => {
    setModalActive(prevState => !prevState); 
    setSelected(false);
    setPhotos([]);
  };

  const handlerSelectChange = () => {
    setSelectChange((prev)=> !prev);
  };

  const uploadPhoto = (e) => {
    const files = Array.from(e.target.files);
    setPhoto(prevPhotos=> [...prevPhotos, ...files])

    if (files) {
      setSelected(true);
      const newPhotos = files.map(file => URL.createObjectURL(file));
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    } else {
      console.log("Error in files");
    }
  };

  const selectImage = (index) => {
    setSelectedImageIndex(index); 
  };

  const deleteImage = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  
    if (updatedPhotos.length === 0) {
      setSelectedImageIndex(null);
    } else if (index === selectedImageIndex) {
      setSelectedImageIndex(index > 0 ? index - 1 : 0);
    }
  };

   const soOnActive = () => {
     soOnRef.current.classList.toggle("active");
     copyesRef.current.classList.toggle("active");
   };

   const nextPost = () => {
    setNextPostPage((prev)=> !prev)
   };

   const textareaChange = (e) => {
    const text = e.target.value;
    if (text.length <= 500) {
      setDetail(text);
      setCharCount(text.length)
    }

   };

   const inputChange = (e) => {
      const inputText = e.target.value;
      setInput(inputText);
   };

   const handlerBack = () => {
    setNextPostPage((prev)=> !prev);
   };

   const handlePost = async (photo, detail, input) => {
    setIsLoading(true);
    setSharePost(true); 

   await firebase.postData(photo, detail, input)
    
    setTimeout(() => {
      setIsLoading(false);
      setPhoto([]);

      setTimeout(()=>{
        setSelected(false);
        setNextPostPage(false);
        setSharePost(false);
        setModalActive(null)
      },4000);

    }, 5000); 
  };

  const followerModal = () => {
    setIsFollowerModal((prev)=> !prev);
  };

  const followingModal = () => {
    setIsFollowingModal((prev)=> !prev);
  }

  const closeFollowerModal = () => {
    setIsFollowerModal(false);
  }

  const closeFollowingModal = () => {
    setIsFollowingModal(false);
  }

  const handleDiscard = () => {
    setSelected(false);
    setModalActive(null)
  };

  const handleFollwersFilter = (e) => {
    const input = e.target.value;
    setFollowersTrim(input);
    
    if (input.trim() !== "") {
      const filter = followers.filter((user) => 
        user.username.toLowerCase().includes(input.toLowerCase())
      );
      setFollowersFilter(filter); 
    } else {
      setFollowersFilter(followers); 
    }
  };

  const handleFollwingFilter = (e) => {
    const input = e.target.value;
    setFollowingTrim(input);
    
    if (input.trim() !== "") {
      const filter = followers.filter((user) => 
        user.username.toLowerCase().includes(input.toLowerCase())
      );
      setFollowingFilter(filter);
    } else {
      setFollowingFilter(following); 
    }
  };
  
  const uploadStory = async (e) => {
        const file = Array.from(e.target.files)
        if(!file){
          return
        }
        try {
          await firebase.storyList(file, firebase.user.photoURL, username);
          alert("story store in firebase")
        } catch (error) {
          console.log("story file error", error)
        }
  }

  return (
    <>
    <main>
      <div className="user-container">
         <div className="top-user-section">
                <div className="logo-section">
                 <img src={firebase.user.photoURL || emptyImg} alt="" onClick={()=> document.getElementById("story-input").click()}/>
                 <div className="logo-camera-img" onClick={()=> document.getElementById("story-input").click()}>
                <h2><FaCamera /></h2>
                </div>
                </div>
                <input 
                type="file" 
                id='story-input'
                style={{display:"none"}}
                onChange={uploadStory}
                />
                <div className="profile-section">
                   <div className="profile-container">
                   <div className="user-username-detail">
                    <h4>{username}</h4>
                   <NavLink to="/setting" className="edit-btn" style={{textDecoration:'none', color:'black', whiteSpace:"nowrap", border:"none"}}><button>Edit Profile</button></NavLink>
                    <button className='view-btn'>View archive</button>
                    <h3 onClick={()=> firebase.logout()}><IoMdLogOut /></h3>
                   </div>

                   <div className="set-btns">
                   <div className="set-btn user-username-detail" >
                   <NavLink to="/setting" style={{textDecoration:'none', color:'black', whiteSpace:"nowrap"}}><button>Edit Profile</button></NavLink>
                   <button>View archive</button>
                   </div>
                   </div>

                   <div className="folling-followers-details">
                    <h4>{post ? post.length : "0"} <span>post</span></h4>
                    <h4 onClick={followerModal}>{followers ? followers.length : "0"} <span>followers</span></h4>
                    <h4 onClick={followingModal}>{following ? following.length : "0"} <span>following</span></h4>
                   </div>
                   <div className="user-other-bio-details">
                     <div className="user-name">
                      <h4 className='account-name'>{firebase.user.displayName}</h4>
                      <p>{bio || ""}</p>
                     </div>
                   </div>
                </div>
              </div>
              </div>

              {/* followers modal */}

              {
                isFollowerModal && (
                  <div className="modal-overlay" onClick={closeFollowerModal}>
                  <div className="modal-content follers-md-content" onClick={(e) => e.stopPropagation()}>
                      <div className="follwers-md-top-name">
                          <p>Followers</p>
                      </div>
                      <div className="postview-line-width">
                      
                      </div>
                      <div className="all-md-followers-container">
                        <div className="search-md-box">
                          <input 
                          type="text" 
                          placeholder='Search'
                          value={followersTrim}
                          onChange={(e)=> handleFollwersFilter(e)}
                          onKeyUp={followersFilter}
                          />
                        </div>
                        <div className="all-mdf-followers-box">
                        {
                         followersFilter.map((request, value)=>(
                          <div className="likes-container follower-req" key={value}>
                              <div className="likes-box follwer-req-img">
                                   <img src= {request.URL || emptyImg} alt="" />
                                <div className="user-likes-your-story follwer-username-req">
                                   <p>{request.username}</p>
                                  <span>{request.fullName}</span>
                                </div>
                             </div>
                              <div className="your-story-item">
                                <button
                                id="del-btn"
                               onClick={() => firebase.deleteFollowRequest(request.userUID)}
                                >
                                Remove
                               </button>
                             </div>
                        </div>
                         ))
                       }
                        </div>
                      </div>
                  </div>
                  </div>
                )
              }

              {/* following modal */}

              {
                isFollowingModal && (
                  <div className="modal-overlay" onClick={closeFollowingModal}>
                  <div className="modal-content follers-md-content" onClick={(e) => e.stopPropagation()}>
                      <div className="follwers-md-top-name">
                          <p>Following</p>
                      </div>
                      <div className="postview-line-width">
                      
                      </div>
                      <div className="all-md-followers-container">
                        <div className="search-md-box">
                          <input 
                          type="text" 
                          placeholder='Search'
                          value={followingTrim}
                          onChange={handleFollwingFilter}
                          />
                        </div>
                        <div className="all-mdf-followers-box">
                        {
                         following.map((request, value)=>(
                          <div className="likes-container follower-req" key={value}>
                              <div className="likes-box follwer-req-img">
                                   <img src= {request.URL || emptyImg} alt="" />
                                <div className="user-likes-your-story follwer-username-req">
                                   <p>{request.username}</p>
                                  <span>{request.fullName}</span>
                                </div>
                             </div>
                              <div className="your-story-item">
                                <button
                                id="del-btn"
                                >
                                Remove
                               </button>
                             </div>
                        </div>
                         ))
                       }
                        </div>
                      </div>
                  </div>
                  </div>
                )
              }
      {/* ======================================================= */}

              <div className="user-line">

              </div>

         <div className="bottom-user-section">
              <div className="botttom-user-container">
                  <div className="post-saved">
                   <p><FiPlusSquare /></p>
                   <span>Post</span>
                 </div>
                   <div className="post-saved">
                   <p><FiBookmark /></p>
                   <span>Saved</span>
                 </div>
              </div>
              </div>
              </div>
              {
    posted ? (
        <>
            <div className="posted-container-user">
                {
                    listPost.map((items, index) => (
                        <div className="posted-images" key={index}>
                            {/* Map through all posts */}
                            {items.posts.map((post, postIndex) => (
                                <div key={postIndex}  onClick={()=> handlerListedData(post)}>
                                    {/* Check if postURL contains multiple images */}
                                    {post.postURL.length > 1 ? (
                                        <div className="image-slider">
                                            <Swiper
                                                modules={[Navigation, Pagination]}
                                                spaceBetween={10}
                                                slidesPerView={1}
                                                navigation
                                                pagination={{ clickable: true }}
                                            >
                                                { 
                                                    post.postURL.map((url, urlIndex) => (
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
                                                    ))
                                                }
                                            </Swiper>
                                        </div>
                                    ) : (
                                        // For a single image
                                        <div 
                                            className="url-post posted-images"
                                            onClick={() => handleImageClick(post.postURL[0])}
                                            >
                                              {
                                                modalImage ? 
                                                 <img 
                                            src={post.postURL[0]} 
                                            alt="Single Image" 
                                                /> 
                                                : 
                                                <video src={videoModal}></video>
                                              }
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>
        </>
    ) : (
        <>
            <div className="bottom-user-section">
                <div className="botttom-user-container">
                    <div className="post-section">
                        <div className="post-box">
                            <h1 onClick={toggleModal}><FiCamera /></h1>
                            <h2>Share Photos</h2>
                            <p>When you share photos, they will appear on your profile.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

            {
                isModalOpen && (
                 <div className="postview-modal" onClick={closeModal}>
                    <div className="postview-content" onClick={(e) => e.stopPropagation()}>
                        <img src={modalImage} alt="Clicked Image" />
        
                         <div className="postview-comment-other-container">
                            <div className="postview-user-box">
                              <div className="postview-dp-username">
                                <img src={firebase.user.photoURL || emptyImg} alt="" />
                                  <div className="post-view-city">
                                    <h5>{username}</h5>
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
                                <img src={firebase.user.photoURL || emptyImg} alt="" />
                                  <div className="post-view-city">
                                    <h5>{username}</h5>
                                    <p>2 min</p>
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
                                     <h3 onClick={handleShare}><FaRegShareSquare /></h3>
                                 </div>
                                 <div className="postview-save">
                                    <h3><FaRegBookmark /></h3>
                                </div>
                             </div>
                              <div className="likes-post">
                                <div className="postview-users-comments like-post-img">
                                   <img src={Dp} alt="" />
                                     <div className="post-likes-username">
                                       <h5>Liked by <span>its_._.syedzada</span> and <span>5 others</span></h5>
                                       <p>2 min</p>
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


{
        selected ? 
         (
          <>
          {

            nextPostPage ? 
             <div className="modal-overlay">
              <div className="modal-fetch-box">
                {
                  sharePost ? 
                  <>
                 <div className="posted-content">
                 {isLoading ? <PostLoader/> : <h2>{firebase.postError}</h2>}
                 </div>
                  </>
                   :
                   <>
                  <div className="top-fetch">
                     <h2 onClick={handlerBack}><FaArrowLeft /></h2>
                     <p>Crop</p>
                     <p id='modal-next' onClick={()=> handlePost(photo, detail, input)}>Share</p>
                  </div>
                  <div className="post-share-dec-container">
                    <div className="post-share-dec-username">
                      <img src={firebase.user.photoURL} alt="" />
                      <p>{username}</p>
                    </div>
                    <div className="post-textarea-box">
                      <textarea 
                      name="" 
                      id=""
                      placeholder='Bio'
                      onChange={textareaChange}
                      value={detail}
                      ></textarea>
                    </div>
                    <div className="post-emoji">
                      <p><CiFaceSmile/></p>
                       <p>{charCount}/500</p>
                    </div>
                    
                    <div className="post-width-line">

                    </div>
                    <div className="post-location-box">
                       <div className="post-other">
                          <input 
                          type="text" 
                          placeholder='Add Location'
                          value={input}
                          onChange={inputChange} 
                         />
                          <h3><CiLocationOn /></h3>
                        </div>
                        </div>
                        <div className="post-other post-accessibility">
                          <p>Accessibility</p>
                          <h3><FaAngleDown /></h3>
                        </div>

                  </div>
                  </>
                }
              </div>
             </div>
             :
             modalActive && (
                            <div className="modal-overlay">
                              <div className="modal-content modal-fetch-box">
                                <div className="top-fetch">
                                   <h2 onClick={handlerSelectChange}><FaArrowLeft /></h2>
                                   <p>Crop</p>
                                   <p id='modal-next' onClick={nextPost}>Next</p>
                                </div>
                                <div className="fetch-img-box">
                                 <div className="modal-fetch-img">
                                   {photos.length > 0 && (
                                      <div className="image-slider">
                                      <Swiper
                                      key={photos.length}
                                      modules={[Navigation, Pagination]}
                                      spaceBetween={10}
                                      slidesPerView={1}
                                      navigation
                                      pagination={{ clickable: true }}
                                      loop
                                      >
                                  {photos.map((photo, index) => (
                                    <SwiperSlide key={index}>
                                       <div className="image-slide">
                                         <img src={photo} alt={`Slide ${index}`} />
                                       </div>
                                    </SwiperSlide>
                                   ))}
                                       </Swiper>
                                 </div>
                                     )}
                                  </div>
                                </div>
              
                                <div className="so-on-pic-container" ref={soOnRef}>
                                   <div className="max-img-box">
                                   {photos.map((photo, index) => (
                                     <div key={index} className={`so-on-images ${selectedImageIndex === index ? 'selected' : ''}`} onClick={() => selectImage(index)}>
                                        <img src={photo} alt="" />
                                        <p onClick={(e) => { e.stopPropagation(); deleteImage(index); }}><FaXmark /></p>
                                     </div>
                                   ))}
                                    <div className="added-img" onClick={() => document.getElementById('file-input').click()}>
                                      <p><GoPlus /></p>
                                    </div>
                                    <input
                                    type="file"
                                    id="file-input"
                                    style={{ display: 'none' }}
                                    onChange={uploadPhoto}
                                    multiple
                                />
                                   </div>
                                </div>
              
                                <div className="so-on-pic-box" onClick={soOnActive}>
                                  <p className='copy-ref' ref={copyesRef}><FaRegCopy /></p>
                                </div>
              
                               {selectChange && (
                                <div className="modal-overlay set-modal-overlay">
                                <div className="set-modal-content" id="discard-modal-box">
                                  <div className="profile-set-name discard-file">
                                  <h3>Discard post?</h3>
                                  <p>f you leave, your edits won't be saved.</p>
                                  </div>
                                   <div className="set-width-line">
              
                                   </div>
                                    <div className="set-box remove-dp">
                                    <h3 onClick={handleDiscard}>Discard</h3>
                                    </div>
                                    <div className="set-width-line">
                                    
                                   </div>
                                    <div className="set-box cancel-dp">
                                      <h3 onClick={handlerSelectChange}>Cancel</h3>
                                    </div>
                                  <div className="x-mark">
                                     <p><FaXmark /></p>
                                  </div>
                                  
                                </div>
                                </div>
                           )} 
              
                              </div>
                              <div className="x-mark">
                               <p onClick={toggleModal}><FaXmark /></p>
                               </div>
                            </div>
                          )
                        }
                        </>
                       )
                       :
                       <>
                        { modalActive && (
                          <div className="modal-overlay">
                          <div className="modal-content">
                            <h3>Create new post</h3>
                            <div className="modal-box">
                               <div className="modal-icon-first">
                                  <h1><MdOutlineInsertPhoto /></h1>
                               </div>
                            <div className="modal-text">
                               <h2>Drag photos and videos here</h2>
                            </div>
                            <div className="modal-btn">
                               <button onClick={() => document.getElementById('file-input').click()}>Select from Computer</button>
                               <input
                                   type="file"
                                   id="file-input"
                                   style={{ display: 'none' }}
                                   onChange={uploadPhoto}
                                   multiple
                                />
                            </div>
                            <div className="x-mark">
                               <p onClick={toggleModal}><FaXmark /></p>
                            </div>
                          </div>
                          </div>
                        </div>
                      )}
                      </>
                    }
              
                   <div className="user-help-box">
                   <Help/>
                   </div>
                  </main>
                  </>
                )
              }

export default User