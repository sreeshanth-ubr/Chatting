import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/Authcontext";
import { ChatContext } from "../context/ChatContext";
import { useRef } from "react";
const messege = ({message}) => {
     const {currentUser} = useContext(AuthContext);
     const{data} = useContext(ChatContext);
     const ref= useRef();
     useEffect(() => {
        ref.current?.scrollIntoView({behavior:"smooth"})
     },[message])
  return (
<>
     <div className={`message ${message.senderId === currentUser.uid && "send"}`}>
     {message.senderId === currentUser.uid && <div className="messagewraper">
          
          <div className="messageContent">
           <div className="mes">{message.text}</div> 
            {message.img && <img className="img"src={message.img}  />}
          </div>
          <div className="messageInfo">
          </div>
       </div>}
       {message.senderId === data.user.uid && <div className="messagewraper">
       <div className="messageInfo">
           <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
          </div>
          <div className="messageContent">
            <div className="mes">{message.text}</div> 
          {message.img && <img className="img" src={message.img}  />}
           
          </div>
       </div>}
       
     </div>
     </>
  )
}

export default messege