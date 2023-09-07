import MNavbar from './m-navbar'
import Messege from './messege'
import Upload from './upload'
import './App.css'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext';
import { onSnapshot,doc } from 'firebase/firestore';
import { db } from '../firebase';

const Chat = () => {

  const[messages,setMessages] = useState([]);
  const {data} = useContext(ChatContext);
  
  useEffect(() => {
    const unsub = onSnapshot(doc(db,"chats", data.chatId), (doc) => {
      doc.exists()  &&  setMessages(doc.data().messages)
    });
    return() => {
      unsub();
    }
  },[data.chatId]);
 
  return (
    <div className="chatcontainor">
      <MNavbar />
      <div className="msg">
      { messages?.map((m) => (
          <Messege message={m} key={m.id} />
      ))};
      </div>
      <Upload />
    </div>
  );
}
export default Chat
