import React, {useEffect , useState} from 'react';
import './Chats.css';
import dp from '../../images/dp1.png';
// import { RiMessengerLine } from "react-icons/ri";
import { RiInformationLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { BsCameraVideo } from "react-icons/bs";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useFirebase } from '../../Firebase';
function Chats() {
    const firebase = useFirebase();
  
    const { chatsId } = useParams();
    const [chatUser, setChatUser] = useState([]);
    const [msg, setMsg] = useState([]);
    const [userSelect, setUserSelect] = useState(null);
    const [chatText, setChatText] = useState("");
    const [sendBtn, setSendBtn] = useState("");
    const [username, setUsername] = useState("");
    // const [combinedMessages, setCombinedMessages] = useState([]);

    console.log(firebase.otherMsg)

    useEffect(()=>{
        const fetchChating = async () => {
        const data = await firebase.fetchChat();
        setChatUser(data);
        } 
        fetchChating();
      },[]);


      useEffect(()=>{
        const filterUser = () => {
            const userData = chatUser.find((e)=> e.username === chatsId);
            console.log(userData)
            setUserSelect(userData || null);
        }
        filterUser();
      },[chatUser, chatsId])

    //   useEffect(() => {
    //     const fetchMessages = async () => {
    //         try {
    //             const messages = await firebase.fetchMessages(); // Fetch all messages
    //             // setMsg(messages.sentMessages); // Sent messages
    //             // firebase.otherMsg = messages.receivedMessages; // Received messages
    //         } catch (error) {
    //             console.error("Error fetching messages:", error);
    //         }
    //     };
    
    //     fetchMessages();
    // }, [firebase]);
    


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
        //   const fetchMsg = async () => {
        //     await firebase.fetchMessages();
        //   }
        //   fetchMsg();
        // },[firebase])

        
        // useEffect(() => {
        //   const mergeAndSortMessages = () => {
        //     // Combine messages
        //     const allMessages = [
        //       ...msg.map((message) => ({ ...message, type: "sent" })), // Mark sent messages
        //       ...(firebase.otherMsg || []).map((message) => ({ ...message, type: "received" })), // Mark received messages
        //     ];
        
        //     // Sort messages by timestamp
        //     allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
        //     return allMessages;
        //   };
        
        //   setCombinedMessages(mergeAndSortMessages());
        // }, [msg, firebase.otherMsg]);
        


    const handleChange = (e) => {
        const input = e.target.value;
        setChatText(input)
        if (input.length >= 1) {
          setSendBtn(input.length)
        }else{
          setSendBtn("");
        }
      };


      // const combinedMessages = [...msg, ...(firebase.otherMsg || [])].sort(
      //   (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      // );

    const chatSend = async (e) => {
        e.preventDefault();
      
        const newMessage = {
          chatText: chatText,
          sender: userSelect.username,
          // timestamp: new Date().toISOString(),
          photoURL: userSelect.photoURL,
          // timestamp: new Date().toISOString(),
        };
      
        setMsg((prevChat) => [...prevChat, newMessage]);
      
        setChatText("");
      
        try {
          await firebase.chating(chatText, userSelect.username, userSelect.UID, username);
      
        } catch (error) {
          console.log("Error in sending message:", error);
        }
      };

  return (
    <>
    <div className="user-chats-section">
             <div className="msg-right-top">
                      <div className="handle-user-msg">
                        <div className="handle-user">
                          <img src={userSelect?.photoURL} alt="" />
                        </div>
                        <div className="msg-username-active">
                          <p>{userSelect?.username}</p>
                          <span>Active 12h ago</span>
                        </div>
                      </div>
                      <div className="handler-user-icon">
                        <p><FiPhoneCall /></p>
                        <p><BsCameraVideo /></p>
                        <p><RiInformationLine /></p>
                      </div>
              </div>
                 <div className="msgg-in-user">
                  <div className="type-users">
                  <img src={userSelect?.photoURL} alt="" />
                  <div className="user-chats-username">
                    <h3>{userSelect?.username}</h3>
                    <p>{userSelect?.fullName} . <span>Instagram</span></p> 
                   <div className="view-btn">
                   <button>View more</button>
                   </div>
                 </div>
                  </div>

                  {/* <div className="chat-frds">
        {combinedMessages.map((chat, index) => (
          <div
            key={index}
            className={`chat-bubble ${
              chat.senderUID === firebase.user.UID ? "chat-sent" : "chat-received"
            }`}
          >
            {chat.senderUID !== firebase.user.UID && <img src={chat.photoURL} alt="" />}
            <p>{chat.chatText}</p>
          </div>
        ))}
      </div> */}
                  <div className="chat-frds">
                  
                      {
                        msg && msg.length > 0 ? (
                        msg.map((chat, index) => (
                          <div className="chat-me" key={index}>
                             <p>{chat.chatText}</p>
                           </div>
                           ))
                           ) : (
                          <p></p>
                           )
                       }
                    </div>

                    <div className="chats-user">
                    {
                     firebase.otherMsg && firebase.otherMsg.length > 0 ? (
                     firebase.otherMsg.map((chat, index) => (
                      <div className="photo-chat-user" key={index}>
                        <img src={chat.photoURL} alt="" />
                        <p>{chat.chatText}</p>
                      </div>
                       ))
                     ) : (
                       <p></p>
                     )
                    }
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
    </>
  )
}

export default Chats
