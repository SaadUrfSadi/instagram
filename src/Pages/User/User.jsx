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
import { FiSettings } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { FiMoreHorizontal } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { useFirebase } from '../../Firebase';
import { FaRegBookmark } from "react-icons/fa";
import { FaAngleDown } from 'react-icons/fa';
import { FaRegShareSquare } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import PostLoader from '../../Components/PostLoader/PostLoader';
import { dpData } from '../../Data';

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
  const [modalImage, setModalImage] = useState(null); // Store the clicked image URL
  const [isModalOpen, setModalOpen] = useState(false);
  const [postLoct, setPostLoct] = useState("");
  const [postdetail, setPostDetail] = useState("");
  const [postShare, setPostShare] = useState([]);
  console.log(postShare);


  useEffect(()=>{
    const fetchPost = async () => {
      const data = await firebase.listAllPost();
      setListPost(data);
    };
    fetchPost()
  },[]);


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

  useEffect(()=> {
    if(selectedImageIndex === 0){
         setSelected(true)
    }
  },[]);

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl); // Set the clicked image
    setModalOpen(true); // Open the modal
    // setPostLoct(imageUrl.postLocation)
};

// Function to close modal
const closeModal = () => {
    setModalImage(null); // Clear the modal image
    setModalOpen(false); // Close the modal
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

  // const handlerSelect = () => {
  //    setSelected((prev)=> !prev);
  // };

  const handlerSelectChange = () => {
    setSelectChange((prev)=> !prev);
  };

  const uploadPhoto = (e) => {
    // const file = e.target.files;
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

  const handleDiscard = () => {
    setSelected(false);
    setModalActive(null)
  };

  return (
    <>
    <main>
      <div className="user-container">
         <div className="top-user-section">
                <div className="logo-section">
                 <img src={firebase.user.photoURL} alt="" />
                </div>
                <div className="profile-section">
                   <div className="profile-container">
                   <div className="user-username-detail">
                    <h4>{username}</h4>
                   <NavLink to="/setting" style={{textDecoration:'none', color:'black', whiteSpace:"nowrap"}}><button>Edit Profile</button></NavLink>
                    <button>View archive</button>
                    <h3><FiSettings /></h3>
                   </div>
                   <div className="folling-followers-details">
                    <h4>0 <span>post</span></h4>
                    <h4>15 <span>followers</span></h4>
                    <h4>360 <span>following</span></h4>
                   </div>
                   <div className="user-other-bio-details">
                     <div className="user-name">
                      <h4 className='account-name'>{firebase.user.displayName}</h4>
                      <p>{bio || "Loading..."}</p>
                     </div>
                   </div>
                </div>
              </div>
              </div>


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
                                                                <img 
                                                                src={url} 
                                                                alt={`Post ${urlIndex}`} 
                                                                
                                                                />
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
                                            <img 
                                            src={post.postURL[0]} 
                                            alt="Single Image" 
                                            />
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

            {isModalOpen && (
                <div className="postview-modal" onClick={closeModal}>
                    <div className="postview-content" onClick={(e) => e.stopPropagation()}>
                        <img src={modalImage} alt="Clicked Image" />
                       {/* <div className="postview-main-container"> */}
                         <div className="postview-comment-other-container">
                            <div className="postview-user-box">
                              <div className="postview-dp-username">
                                <img src={firebase.user.photoURL} alt="" />
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
                                <img src={firebase.user.photoURL} alt="" />
                                  <div className="post-view-city">
                                    <h5>{username}</h5>
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
                // </div>
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
                                    <h3>Discard</h3>
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