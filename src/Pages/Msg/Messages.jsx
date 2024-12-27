import React, { useEffect, useRef, useState } from 'react';
import './Messages.css';
import { FaAngleDown } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
// import { dpData } from '../../Data';
import { RiMessengerLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { BsCameraVideo } from "react-icons/bs";
import { RiInformationLine } from "react-icons/ri";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FaXmark } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import emptyImg from "../../images/empty.jpeg";
import { useFirebase } from '../../Firebase';
import { NavLink } from 'react-router-dom';
// import { set } from 'animejs';

function Messages() {

  const firebase = useFirebase();

  const btnRef = useRef();
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalActive, setModalActive] = useState(false); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [userSelect, setUserSelect] = useState(null);
  const [chatText, setChatText] = useState("");
  const [chat, setChat] = useState([]);
  const [chatUser, setChatUser] = useState([]);
  const [sendBtn, setSendBtn] = useState("");
  const [msg, setMsg] = useState([]);
  const [chatingUser, setChatingUser] = useState([]);
  const [username, setUsername] = useState("");
  console.log(chatingUser);
  // console.log(chatingUser[0]?.photoURL);
  // console.log(chatingUser[0]?.username);

  useEffect(() => {
    const fetch = async () => {
      try {
        await firebase.chatingUser;
        setChatingUser([...firebase.chatingUser]);
      } catch (error) {
        console.log("Error in store chats:", error);
      }
    };
    fetch();
  }, [firebase.chatingUser]);
  
  // useEffect(() => {
  //   if (chatingUser.length > 0) {
  //     console.log(chatingUser); 
  //     console.log(chatingUser?.photoURL); 
  //     console.log(chatingUser?.username); 
  //   }
  // }, [chatingUser]);
  

  useEffect(()=>{
    const fetch = async () => {
       try {
        await firebase.chatingUser;
        setChatingUser(firebase.chatingUser)
       } catch (error) {
        console.log("error in store chats", error)
       }
    }
    fetch();
  },[firebase.chatingUser])

  useEffect(()=>{
    const fetchChating = async () => {
    const data = await firebase.fetchChat();
    setChatUser(data);
    } 
    fetchChating();
  },[]);

  useEffect(()=>{
    const dataMsg = () => {
     setMsg(firebase.messages);
    }
    dataMsg ();
  },[firebase.messages]);

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

  // useEffect(()=>{
  //   const autoStoreChating = async () => {
  //     await firebase.chatStore(chatingUser[0]?.photoURL, chatingUser[0]?.username, chatingUser[0]?.displayName, chatingUser[0]?.senderUID)
  //   }
  //   autoStoreChating();
  // },[])
  

  const startChat = async () => {
    if (userSelect) {
     await firebase.chatStore(userSelect.photoURL, userSelect.username, userSelect.fullName, userSelect.userUID);
      setChat([userSelect]);
      toggleClose(); 
    }
  };
  
  const toggleModal = () => {
    setModalActive((prev)=> !prev)
  }

  const toggleClose = () => {
    setModalActive(false)
  };

  const handleSearchInput = (e) => {
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

  const handlerCheck = (user) => {
    setUserSelect(user);
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setChatText(input)
    if (input.length >= 1) {
      setSendBtn(input.length)
    }else{
      setSendBtn("");
    }
  }

  useEffect(() => {
    if (userSelect) {
      btnRef.current?.classList.add("active");
    } else {
      btnRef.current?.classList.remove("active");
    }
  }, [userSelect]);
  
 
  const searchtermRemove = () => {
    setFilteredUsers([]); 
    setSearchTerm("");
  };

   useEffect(()=>{
          const fetchMsg = async () => {
         const data =  await firebase.fetchMessages();
        //  setChatingUser(data);
          }
          fetchMsg();
        },[])

  
  const handleUserClick = async (user) => {
    setSelectedUser(user);
    try {
       await firebase.fetchMessages(user.UID); 
       setMsg(firebase.messages)
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  };
  
  return (
    <>
      <div className="msg-user-container">
        {/* Left Container */}
        <div className="msg-left-container">
          <div className="msg-user-name">
            <div className="msg-username-box">
              <h2>{username}</h2>
              <span className="arr-down"><FaAngleDown /></span>
            </div>
            <div className="msg-search">
              <p onClick={toggleModal}><BsPencilSquare /></p>
            </div>
          </div>

          <div className="msg-all-username-box">
            <div className="msg-name">
              <h4>Messages</h4>
              <p>Requests</p>
            </div>
            <div className="msg-users">
              {
                chatUser.map((items, index) => (
                 <NavLink to={`/chats/${items.username}`} style={{textDecoration:'none', color:'black', border:"none"}}>
                   <div 
                    className="msg-user-box" 
                    key={index} 
                    onClick={() => handleUserClick(items)}
                  >
                    <div className="message-user">
                      <img src={items.photoURL || emptyImg} alt="" />
                    </div>
                    <div className="msg-username-active">
                      <p>{items.username}</p>
                      <span>Active 12h ago</span>
                    </div>
                  </div>
                 </NavLink>
                ))
              }
            </div>
          </div>
        </div>

        {selectedUser ? (
         <form action="">
           <div className="msg-right-container">
            <div className="msg-right-top">
              <div className="handle-user-msg">
                <div className="handle-user">
                  <img src={selectedUser.photoURL} alt="" />
                </div>
                <div className="msg-username-active">
                  <p>{selectedUser.username}</p>
                  <span>Active 12h ago</span>
                </div>
              </div>
              <div className="handler-user-icon">
                <p><FiPhoneCall /></p>
                <p><BsCameraVideo /></p>
                <p><RiInformationLine /></p>
              </div>
            </div>
            <div className="msg-mid-container">
              <div className="handler-msg-send">
                 <div className="msgg-in-user">
                  <div className="type-users">
                  <img src={selectedUser.photoURL} alt="" />
                  <p>{selectedUser.username} . <span>Instagram</span></p> 
                  </div>
                  
                 </div>
              </div>
            </div>
            <div className="msg-third-container">
              <textarea 
              name="" 
              id="" 
              placeholder='Message'
              value={chatText}
              onChange={(e)=> handleChange(e)}
              ></textarea>
              <div className="msgg-icons-box">
             {
              sendBtn ? 
              <button onClick={(e)=> chatSend(e)}>Send</button>
              :
              <>
              <h3><MdOutlineKeyboardVoice /></h3>
              <h3><HiOutlinePhotograph /></h3>
              <h3><FaRegHeart /></h3>
              </>
             }
            </div>
            </div>

          </div>
         </form>
        ) : (
          <div className="msgg-box-icon">
            <div className="msgg-icon">
              <h1><RiMessengerLine /></h1>
            </div>
            <div className="msgg-others">
              <h3>Your messages</h3>
              <p>Send a message to start a chat.</p>
              <button>Send a message</button>
            </div>
          </div>
        )}
        
                              { modalActive && (
                                  <div className="modal-overlay all-msgs-user">
                                  <div className="modal-content modal-msgg-name" >
                                    <h3>New message</h3>
                                    <div className="cut-msg-search">
                                       <p onClick={toggleModal}><FaXmark /></p>
                                    </div>
                                    <div className="msgg-width-line">

                                    </div>
                                    <div className="msgg-search">
                                      <h3>To:</h3>
                                      <input 
                                      type="text" 
                                      placeholder='Search' 
                                      value={searchTerm}
                                      onChange={handleSearchInput}
                                      onKeyUp={firebase.searchUsername}
                                      />
                                    </div>
                                    <div className="msgg-width-line">

                                    </div>
                                    <div className="msgg-username-found">
                                      {
                                        filteredUsers.length > 0 ? (
                                          filteredUsers.map((user, index)=>(
                                           <div className="serches-user msgg-usersname-find" key={index}>
                                                <div className="msgg-all-username">
                                                   <div className="searches-user-dp">
                                                     <img src={user.photoURL || emptyImg} alt={index} />
                                                   </div>
                                                   <div className="serches-username msgg-user-fullname">
                                                      <p>{user.username}</p>
                                                      <span>{user.fullName}</span>
                                                  </div>
                                               </div>
                                               <div className="msgg-checkbox">
                                                <input 
                                                type="checkbox"  
                                                className="custom-checkbox" 
                                                onClick={()=> handlerCheck(user)}
                                                checked={userSelect?.username === user.username}
                                                 />
                                               </div>
                                           </div>
                                        ))
                                      ) : (
                                        <p>No account found</p>
                                      )
                                      }
                                    </div>
                                    <div className="msgg-chat-user">
                                      <button 
                                      onClick={startChat} 
                                      ref={btnRef} 
                                      className={`btn-msgg-chat ${userSelect ? "active" : ""}`} 
                                      disabled={!userSelect}
                                      >Chat</button>
                                    </div>
                                  </div>
                                </div>
                              )}
      </div>
    </>
  );
}

export default Messages;

