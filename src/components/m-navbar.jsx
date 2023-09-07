import React from 'react'
import './App.css'
import { useContext } from 'react'
import {ChatContext} from '../context/ChatContext'

const Mnavbar = () => {

  const {data} =useContext(ChatContext);
  return (
    
    <div className="mncontainer">
     <img src={data.user?.photoURL} alt=""  />
    <div className="name">
    <h4>{data.user?.Displayname}</h4>
    </div>
  
 </div>
  )
}

export default Mnavbar