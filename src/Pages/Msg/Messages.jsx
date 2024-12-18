import React, { useEffect, useRef, useState } from 'react';
import './Messages.css';
import { FaAngleDown } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
import { dpData } from '../../Data';
import { RiMessengerLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { BsCameraVideo } from "react-icons/bs";
import { RiInformationLine } from "react-icons/ri";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import dp1 from '../../images/dp1.png';
import emptyImg from "../../images/empty.jpeg";
import { useFirebase } from '../../Firebase';
import { NavLink } from 'react-router-dom';

function Messages() {

  const firebase = useFirebase();

  const btnRef = useRef();
  // State to track the selected user
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalActive, setModalActive] = useState(false); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [userSelect, setUserSelect] = useState(null);
  const [chatText, setChatText] = useState("");
  const [chat, setChat] = useState([]);
  const [chatUser, setChatUser] = useState([]);
  const [sendBtn, setSendBtn] = useState("");
  console.log(firebase.messages);

  useEffect(()=>{
    const fetchChating = async () => {
    const data = await firebase.fetchChat();
    setChatUser(data);
    } 
    fetchChating();
  },[]);
  
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

  const chatSend = async (e) => {
    e.preventDefault();
    setChatText("");
    try {
      await firebase.chating(chatText, selectedUser.username, selectedUser.UID);
    } catch (error) {
      console.log("error in chat", error)
    }
  };
  

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    try {
      const fetchedMessages = await firebase.fetchMessages(user.UID); 
      // setMessages(fetchedMessages);
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
              <h2>its_._.syedzada</h2>
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
                  <img src={selectedUser.photoURL} alt="" />
                  <p>{selectedUser.username} . <span>Instagram</span></p> 
                  <div className="chat-frds">
                   {
                     firebase.messages && firebase.messages.length > 0 ? (
                     firebase.messages.map((chat, index) => (
                     <div className="chat-me" key={index}>
                     <p>{chat.chatText}</p>
                      </div>
                       ))
                     ) : (
                       <p></p>
                     )
                    }
                    </div>

                  {
                    <div className="chats-user">
                      <div className="photo-chat-user">
                        <img src={selectedUser.photoURL} alt="" />
                        <p>Dollars ni pounds</p>
                      </div>
                      
                    </div>
                  }
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

