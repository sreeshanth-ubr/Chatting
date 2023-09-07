
import React from 'react'
import Saidbar from './saidbar'
import Chat from './chat'
import './App.css'

const Home = () => {
  return (
    <div className="container">
        <Saidbar/>
        <Chat/>
    </div>
  )
}

export default Home