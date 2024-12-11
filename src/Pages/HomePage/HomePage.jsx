import React, {useEffect, useState} from 'react';
import './HomePage.css'
import { useFirebase } from '../../Firebase'
// import { NavLink } from 'react-router-dom';
import { dpData, newsReels } from '../../Data';
import emptyImg from "../../images/empty.jpeg" 
// import dpImg from '../../images/dp1.png'
// icons
import { FaRegHeart} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { BsShare } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa6";
import { NavLink, useParams } from 'react-router-dom';
function HomePage() {

  const firebase = useFirebase();

  const storyId = useParams();

  const [username, setUsername] = useState("");
  const [randomProfiles, setRandomProfiles] = useState([]);
  // const [storyFetch ,setStoryFetch] = useState([]);

  useEffect(() => {
    if (firebase.frds.length > 5) {
      const shuffled = firebase.frds.sort(() => Math.random() - 0.5);
      setRandomProfiles(shuffled.slice(0, 5));
    }
  }, [firebase.frds]);

  useEffect(()=>{
    const fetchStoryData = async () => {
         try {
           await firebase.storyFetch();
         } catch (error) {
           console.log("errin in home page fetch story data", error)
         }
    };
    fetchStoryData()
  },[firebase.storyFetch])
  

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const fetchedUsername = await firebase.getUsername(); 
        setUsername(fetchedUsername); 
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
  
    fetchUsername();
  }, [firebase]);


  useEffect(()=>{
    const fetchFrds = async () => {
      try {
        await firebase.suggestFrd()
      } catch (error) {
        console.log("fetch frds err", error)
      }
    }
    fetchFrds();
  },[])

  return (
    <>
    <section>
    <div className="home-container">
        <div className="second-box">
        <div className="story">
              {
                firebase.allStory.map((items, value)=>(
                  <div className="dp-box" key={value}> 
                      <div className="dp">
                      <NavLink to={`/story/${items.username}`} style={{border:"none", overflow:"hidden"}}><img src={items.photoURL || emptyImg} alt="" /></NavLink>
                      </div>
                      <div className="name">
                      <p>{items.username}</p>
                      </div>
                  </div>
                ))
              }
            </div>
            <div className="news">
                <div className="reels">
                  {
                    newsReels.map((items, value) => (
                        <div className="new-reels-box"  key={value}>
                            <div className="reels-container">
                               <div className="img-box">
                               <img src={items.img} alt="" />
                                <p>{items.username}</p>
                                <p className='time'>1 h</p>
                               </div>
                               <div className="icon">
                               <p><BsThreeDots /></p>
                               </div>
                            </div>
                              <div className="reels-videos">
                              <video 
                               src={items.video}
                               muted
                               autoPlay
                               loop
                               playsInline
                               className="reel-video">
                               </video>
                              </div>
                              <div className="share-comment-box">
                                  <div className="share-comment-icon">
                                  <h2><FaRegHeart/></h2>
                                  <h2><FaRegComment /></h2>
                                  <h2><BsShare /></h2>
                                  </div>
                                  <div className="save-icon">
                                    <h2><FaRegBookmark /></h2>
                                  </div>
                              </div>
                              <div className="likes">
                              <h4>1455 likes</h4>
                              </div>
                              <div className="post-name">
                              <p>{items.username}  <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ipsum ullam ipsam, at maxime veritatis repellat a quod commodi facere alias. Cum numquam accusantium consequuntur cupiditate minus quae magnam mollitia.</span></p>                 
                              </div>
                              <div className="add-comment">
                                 <p>View all three comments</p>
                                <input type="text" placeholder='Add a comment...' />
                                {/* <p>View all three comments</p>
                                <p>Add a comment...</p> */}
                              </div>
                              <div className="hr">
                              <hr />
                              </div>
                        </div>
                    ))
                  }
                </div>
            </div>
        </div>

         <div className="third-box">
             <div className="profile">
                <div className="profile-logo">
                   <img src={firebase.user.photoURL || emptyImg} alt="" />
                   <div className="username">
                   <p>{username}</p>
                   <h6>{firebase.user.displayName}</h6>
                   </div>
                </div>
                <div className="switch">
                  <a href="">Switch</a>
                </div>
             </div>
             <div className="other-frds-container">
              <div className="frds-container">
                <h5>Suggested for you</h5>
                <p>See All</p>
              </div>
              <div className="suggest-profile-container">
                {
                  randomProfiles.map((items, value)=>(
                    <div className="profile" key={value}>
                    <div className="profile-logo">
                    <img src={items.photoURL || emptyImg} alt="" />
                    <div className="username">
                    <p>{items.username}</p>
                    <h6>{items.fullName}</h6>
                    </div>
                 </div>
                 <div className="switch">
                   <a href="">Follow</a>
                 </div>
                 </div>
                  ))
                } 
                </div>

                <div className="contact-instagram-container">
                    <div className="contact-instagram">
                      <a href="">About .</a>
                      <a href=""> Help .</a>
                      <a href=""> Press .</a>
                      <a href=""> API .</a>
                      <a href=""> Jobs .</a>
                      <a href=""> Privacy .</a>
                      <a href=""> Terms .</a>
                      <a href=""> Location .</a>
                      <a href=""> Language .</a>
                      <a href=""> Meta Verified .</a>
                    </div>
                </div>
                    <div className="instagram-copy-right">
                    <p>&#169;<span>  2024 Instagram from Meta</span></p>
                    </div>
             </div>
        </div> 
      </div>
    </section>
    </>
  )
}

export default HomePage