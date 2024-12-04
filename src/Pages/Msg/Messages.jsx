import React from 'react';
import './Messages.css';
import { FaAngleDown } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
import { dpData } from '../../Data';
import { FiPhoneCall } from "react-icons/fi";
import { BsCameraVideo } from "react-icons/bs";
import { RiInformationLine } from "react-icons/ri";
import dp1 from '../../images/dp1.png'

function Messages() {
  return (
    <>
    
     <div className="msg-user-container">
      <div className="msg-left-container">
          <div className="msg-username-box">
            <h2>its_._.syedzada <span><FaAngleDown /></span></h2>
            <p><BsPencilSquare/></p>
          </div>
    
          <div className="msg-all-username-box">
            <div className="msg-name">
              <h4>Messages</h4>
              <p>Requests</p>
            </div>
            <div className="msg-users">
              {
                dpData.map((items, index)=>(
                  <div className="msg-user-box">
                    <div className="message-user" key={index}>
                        <img src={items.img} alt="" />
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
      <div className="msg-right-container">
          <div className="msg-right-top">
            <div className="handle-user-msg">
               <div className="handle-user">
                 <img src={dp1 } alt="" />
                 </div>
                 <div className="msg-username-active">
                    <p>x_.bukhari</p>
                    <span>Active 12h ago</span>
                 </div>
                 </div>
               <div className="handler-user-icon">
                   <p><FiPhoneCall /></p>
                   <p><BsCameraVideo /></p>
                   <p><RiInformationLine /></p>
               
            </div>
          </div>
      </div>
     </div>
    {/* </section> */}
    </>
  )
}

export default Messages