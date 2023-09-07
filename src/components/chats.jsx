import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { AuthContext } from '../context/Authcontext'
import { ChatContext } from '../context/ChatContext'

const chats = () => {

  const [chats,setChat] = useState([])
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(() =>{
    const getChats = () =>{
        const unsub = onSnapshot(doc(db,"userChats",currentUser.uid),(doc) => {
        setChat(doc.data())
      });
      return () =>{
      unsub();
      };
    };
    currentUser.uid && getChats();
  },[currentUser.uid]);



  const handleSelect= (u) =>{
      dispatch({type:"CHNAGE_USER",payload:u})
     
  }
  return (
    <div className="chats">
    {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
      <div className="userchat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo?.photoURL} alt="" />
         <div className="userchatInfo">
          <span>
            {chat[1].userInfo?.Displayname}
          </span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
    ))}
  </div>
  
  )
}

export default chats