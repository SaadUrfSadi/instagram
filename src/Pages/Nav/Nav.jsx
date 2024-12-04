import React, { useRef, useState, useEffect } from 'react';
import './Nav.css';
import { GoHome, GoSearch} from "react-icons/go";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { BsCameraReels } from "react-icons/bs";
import { RiMessengerLine } from "react-icons/ri";
import { FiPlusSquare } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { MdAutoGraph } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineReport } from "react-icons/md";
import { MdOutlineSwitchAccessShortcut } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { MdOutlineInsertPhoto } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import DpImg from '../../images/dp3.png'
import DpImg6 from '../../images/dp6.png'
import emptyImg from "../../images/empty.jpeg"
import { dpData } from '../../Data';
import { useFirebase } from '../../Firebase';
// ========================================================

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import './User.css';
import { Navigation, Pagination } from 'swiper/modules';
import { CiFaceSmile } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa6";
import { FaAngleDown } from 'react-icons/fa';
import { CiLocationOn } from "react-icons/ci";
import PostLoader from '../../Components/PostLoader/PostLoader';


function Nav() {
   const searchRef = useRef();
   const heightRef = useRef();
   const moreRef = useRef();
   const apparanceRef = useRef();
   const notificationRef = useRef();
   const pagesNameFirstRef = useRef();
   const pagesNameSecRef = useRef();
   const pagesNameThirdRef = useRef();
   const pagesNameFourthRef = useRef();
   const pagesNameFifthRef = useRef();
   const pagesNameSixRef = useRef();
   const pagesNameSevenRef = useRef();
   const pagesNameEightRef = useRef();
   const pagesNameNineRef = useRef();


   const [searchIcon, setSearchIcon] = useState(false);
   const [modalActive, setModalActive] = useState(false); 

 const homeActive = () => {
   setSearchIcon(false);
   pagesNameFirstRef.current.classList.remove('active');
   pagesNameSecRef.current.classList.remove('active')
   pagesNameThirdRef.current.classList.remove('active')
   pagesNameFourthRef.current.classList.remove('active')
   pagesNameFifthRef.current.classList.remove('active')
   pagesNameSixRef.current.classList.remove('active')
   pagesNameSevenRef.current.classList.remove('active')
   pagesNameEightRef.current.classList.remove('active')
   pagesNameNineRef.current.classList.remove('active')
   heightRef.current.classList.remove('active');
 };

 const searchActive = async () => {
  await heightRef.current.classList.toggle('active');
  await searchRef.current.classList.toggle('active');
  await notificationRef.current.classList.remove('active');
   setSearchIcon((prev) => !prev);
  };

  const exploreActive = () => {
   setSearchIcon(false);
   heightRef.current.classList.remove('active');
   pagesNameFirstRef.current.classList.remove('active');
   pagesNameSecRef.current.classList.remove('active')
   pagesNameThirdRef.current.classList.remove('active')
   pagesNameFourthRef.current.classList.remove('active')
   pagesNameFifthRef.current.classList.remove('active')
   pagesNameSixRef.current.classList.remove('active')
   pagesNameSevenRef.current.classList.remove('active')
   pagesNameEightRef.current.classList.remove('active')
   pagesNameNineRef.current.classList.remove('active')
  };

  const reelsActive = () => {
   setSearchIcon(false);
   heightRef.current.classList.remove('active');
   pagesNameFirstRef.current.classList.remove('active');
   pagesNameSecRef.current.classList.remove('active')
   pagesNameThirdRef.current.classList.remove('active')
   pagesNameFourthRef.current.classList.remove('active')
   pagesNameFifthRef.current.classList.remove('active')
   pagesNameSixRef.current.classList.remove('active')
   pagesNameSevenRef.current.classList.remove('active')
   pagesNameEightRef.current.classList.remove('active')
   pagesNameNineRef.current.classList.remove('active')
  };

  const msgActive = () => {
   setSearchIcon(true);
   pagesNameFirstRef.current.classList.add('active');
   pagesNameSecRef.current.classList.add('active')
   pagesNameThirdRef.current.classList.add('active')
   pagesNameFourthRef.current.classList.add('active')
   pagesNameFifthRef.current.classList.add('active')
   pagesNameSixRef.current.classList.add('active')
   pagesNameSevenRef.current.classList.add('active')
   pagesNameEightRef.current.classList.add('active')
   pagesNameNineRef.current.classList.add('active')
   heightRef.current.classList.add('active');
   setIsMessagesActive(!isMessagesActive);

 };

 const  NotificationActive = () => {
   notificationRef.current.classList.toggle('active');
   heightRef.current.classList.toggle('active');
   searchRef.current.classList.remove('active');
   setSearchIcon(true);
  };

  const userActive = () => {
   setSearchIcon(false);
   heightRef.current.classList.remove('active');
   pagesNameFirstRef.current.classList.remove('active');
   pagesNameSecRef.current.classList.remove('active')
   pagesNameThirdRef.current.classList.remove('active')
   pagesNameFourthRef.current.classList.remove('active')
   pagesNameFifthRef.current.classList.remove('active')
   pagesNameSixRef.current.classList.remove('active')
   pagesNameSevenRef.current.classList.remove('active')
   pagesNameEightRef.current.classList.remove('active')
   pagesNameNineRef.current.classList.remove('active')
  };

  const moreActive = () => {
   moreRef.current.classList.toggle('active');
   notificationRef.current.classList.remove('active');
   searchRef.current.classList.remove('active');

  };

  const toggleModal = () => {
    setModalActive(prevState => !prevState); 
  };

  const apperanceActive = () => {
   moreRef.current.classList.toggle('active');
    apparanceRef.current.classList.toggle('active')
  };

//   ========================================================

const [filteredUsers, setFilteredUsers] = useState([]); 
const [searchTerm, setSearchTerm] = useState("");
const [followReq, setFollowReq] = useState("");

const firebase = useFirebase(); 

// create k context......................................
const soOnRef = useRef();
const copyesRef = useRef();
const [bio, setBio] = useState("");
const [username, setUsername] = useState('');
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

console.log("file ha bhai",photo)
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
},[])

const toggleModalDel = () => {
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

  // =========================================

  const handleFollowReq = () => {
     setFollowReq((prev)=> !prev)
  };


  const handleSearchInput = async (e) => {
   const inputValue = e.target.value;
   setSearchTerm(inputValue);

   if (inputValue.trim() !== "") {
     const filtered = firebase.users.filter((user) =>
       user.username.toLowerCase().includes(inputValue.toLowerCase())
     );
     setFilteredUsers(filtered); 
   } else {
     setFilteredUsers([]); 
   }
 };

 const searchtermRemove = () => {
   setFilteredUsers([]); 
   setSearchTerm("");
 };

 const logout = () => {
   return firebase.logout();
 };

 const searchNavRemove = () => {
  searchRef.current.classList.remove('active');
  heightRef.current.classList.remove('active');
 }
  
  return (
    <>
    <div className="nav-container">
        <div className="width-line">
          
        </div>
        <div className="nav">
            <div className="logo">
            { searchIcon ? <p><FaInstagram /></p> : <h1>Instagram</h1> }
            </div>
           <div className="pages-box">
            <div className="first-page-box">
        
           <div className="pages">
               <NavLink to="" style={{textDecoration:"none", color:"black",  border:'none'}}><h3 onClick={homeActive}><GoHome/></h3></NavLink>
               <NavLink to="" style={{textDecoration:"none", color:"black",  border:'none'}}><p className='pages-name-none' ref={pagesNameFirstRef} onClick={homeActive}>Home</p></NavLink>
            </div>
           
           <div className="pages">
               <h3 onClick={searchActive}><GoSearch /></h3>
               <p className='pages-name-none' onClick={searchActive} ref={pagesNameSecRef} >Search</p>
            </div>

            <div className="pages">
               <NavLink to="/explore" style={{textDecoration:"none", color:"black",  border:'none'}}><h3 onClick={exploreActive}><MdOutlineExplore /></h3></NavLink>
               <NavLink to="/explore" style={{textDecoration:"none", color:"black",  border:'none'}}><p className='pages-name-none' ref={pagesNameThirdRef} onClick={exploreActive}>Explore</p></NavLink>
            </div>
          
           <div className="pages"  >
               <NavLink to="/reels" style={{textDecoration:"none", color:"black",  border:'none'}} ><h3 onClick={reelsActive}><BsCameraReels /></h3></NavLink>
               <NavLink to="/reels" style={{textDecoration:"none", color:"black",  border:'none'}} ><p className='pages-name-none' ref={pagesNameFourthRef} onClick={reelsActive}>Reels</p></NavLink>
            </div>
         
         
           <div className="pages">
               <NavLink to="/messages" style={{textDecoration:"none", color:"black",  border:'none'}}><h3 onClick={msgActive}><RiMessengerLine /></h3></NavLink>
               <NavLink to="/messages" style={{textDecoration:"none", color:"black",  border:'none'}} ><p className='pages-name-none' ref={pagesNameFifthRef} onClick={msgActive}>Messages</p></NavLink>
            </div>
          
            <div className="pages">
               <h3  onClick={NotificationActive}><FaRegHeart /></h3>
               <p className='pages-name-none' onClick={NotificationActive}  ref={pagesNameSixRef}>Notification</p>
            </div>
           <div className="pages" >
               <h3 onClick={toggleModal}><FiPlusSquare /></h3>
               <p className='pages-name-none' onClick={toggleModal} ref={pagesNameSevenRef}>Create</p>
            </div>
          
            <div className="pages">
               <NavLink to="/user" style={{textDecoration:"none", color:"black",  border:'none'}}><h3 onClick={userActive}><FaRegCircleUser /></h3></NavLink>
               <NavLink to="/user" style={{textDecoration:"none", color:"black",  border:'none'}}><p className='pages-name-none' ref={pagesNameEightRef} onClick={userActive}>User</p></NavLink>
            </div>
  
            </div>
            <div className="second-page-box">
            <div className="pages bar">
               <h3 onClick={moreActive}><FaBars /></h3>
               <p className='pages-name-none' ref={pagesNameNineRef} onClick={moreActive}>More</p>
            </div>
            </div>
           </div>
            
        </div>
        <div className="height-line" ref={heightRef}>

        </div>
        {/* more box */}
        <div className="more-box-container" ref={moreRef} >
           <div className="more-box-section">
           <div className="more-pages">
            <NavLink to="/setting" style={{textDecoration:"none", color:"black",  border:'none'}}><h3><FiSettings /></h3></NavLink>
            <NavLink to="/setting" style={{textDecoration:"none", color:"black",  border:'none'}}><p>Setting</p></NavLink>
           </div>
           <div className="more-pages">
            <h3><MdAutoGraph /></h3>
            <p>Your Activity</p>
           </div>
           <div className="more-pages">
            <h3><FiBookmark /></h3>
            <p>Saved</p>
           </div>
           <div className="more-pages" onClick={apperanceActive}>
            <h3><MdOutlineLightMode /></h3>
            <p>Switch Appearance</p>
           </div>
           <div className="more-pages">
            <h3><MdOutlineReport /></h3>
            <p>Report a problem</p>
           </div>
           <div className="more-pages">
            <h3><MdOutlineSwitchAccessShortcut /></h3>
            <p>Switch account</p>
           </div>
           <div className="hr-line">
           <hr />
           </div>
           <div className="more-pages">
            <h3><MdLogout /></h3>
            <p onClick={logout}>Logout</p>
           </div>
           </div>
        </div>
        
        <div className="apparance-container" ref={apparanceRef}>
        <div className="switch-apparance">
            <p>Switch Appearance</p>
            <h3><MdOutlineLightMode /></h3>
           </div>
           <hr />
         <div className="dark-light-mode">
             <p>Dark Mode</p>
         </div>
        </div>


        {/* search box */}
        <div className="search-box" ref={searchRef}>
        <div className="search-details">
           <div className="search-logo">
             <h3>Search</h3>
           </div>
          <div className="search-container">
          <div className="search-input">
            <input 
            type="text" 
            placeholder='Search' 
            value={searchTerm}
            onChange={handleSearchInput}
            onKeyUp={firebase.searchUsername}
            />
           </div>
           <div className="cross-icon-search">
             <p onClick={searchtermRemove}><FaRegCircleXmark /></p>
           </div>
          </div>
        </div>
        <div className="search-line">
          
        </div>
        <div className="recent-data">
             <h4>Recent</h4>
       </div>

             <div className="search-data-usernames">
             {filteredUsers.length > 0 ? (
            filteredUsers.map((users, index) => (
               <NavLink to={`/alluser/${users.username}`} style={{textDecoration:"none", border:"none", outline:"none", color:"black"}} onClick={searchNavRemove}>
                <div className="serches-user" key={index}>
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
        {/* notification box */}
        <div className="notification-container" ref={notificationRef}>
         
         {
          followReq ?
         (
          <>
             <div className="back-noti">
             <p onClick={handleFollowReq}><FaAngleLeft /></p>
             <h3>Follow Requests</h3>
             </div>
             <div className="follower-req-container">
               <div className="follower-req-box">
               {
                  dpData.map((items, value)=>(
                    <div className="likes-container follower-req" key={value}>
                      <div className="likes-box follwer-req-img">
                         <img src={items.img} alt="" />
                          <div className="user-likes-your-story follwer-username-req">
                           <p>x_.bukhari</p>
                           <span>..shah zada..</span>
                          </div>
                     </div>
                     <div className="your-story-item">
                        <button className='confirm-btn'>Confirm</button>
                        <button id='del-btn'>Delete</button>
                     </div>
                    </div>
                  ))
               }
               </div>
             </div>
          </>
         )
         :
          (
            <>
         <div className="notification-box">
             <div className="notification-name">
               <h1>Notifications</h1>
             </div>
            <div className="requested-container" onClick={handleFollowReq}>
            <div className="follow-req">
               <div className="follow-dps">
                <img src={DpImg} alt="" />
               </div>
                  <div className="follow-reqested">
                  <h4>Follow requests</h4>
                  <p>thairhussain113 + 11 others</p>
                  </div>
                  </div>
                  <div className="noti-arrow">
                  <h6></h6>
                  <p><FaAngleRight /></p>
               </div>
             </div>
         </div>
         <div className="noti-line">
            
         </div>
         <div className="liked-story">
          <div className="liked-story-section">
             <div className="likestory-name">
               <h3>Likes Story</h3>
             </div>
             <div className="username-likes-story">
               {
                  dpData.map((items, value)=>(
                    <div className="likes-container" key={value}>
                      <div className="likes-box">
                         <img src={items.img} alt="" />
                          <div className="user-likes-your-story">
                           <p>x_.bukhari</p>
                           <span>liked your story</span>
                          </div>
                     </div>
                     <div className="your-story-item">
                        <img src={DpImg6} alt="" />
                     </div>
                    </div>
                  ))
               }
             </div>
             </div>
         </div>
         </>
          )
        }
        </div>

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
                       <p onClick={toggleModalDel}><FaXmark /></p>
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
                  {/* onClick={handlerSelect} */}
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
  

     </div>
    </>
  )
}

export default Nav          
          


