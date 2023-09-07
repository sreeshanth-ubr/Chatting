import React from 'react'
import './App.css'
import Img from './assets/my.jpeg'
const Profilesetting = () => {
  function importData() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange =_=>{
    Array.form(input.files);
    };
   input.click();
    }
  return (
    <div className="profilecontainer">
        <form >
        <button onClick={importData} className='profile-photo'> 
          <img src={Img} alt="" />
          <br />
          <div>change profile photo</div>
         </button>
         <input type="text" placeholder='Displayname'/>
         <input type="text" placeholder='Bio'/>
         <button className='btn'>update</button>
        </form>
    </div>
  )
}

export default Profilesetting