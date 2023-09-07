import React, { useContext } from 'react';
import './App.css';
import { AuthContext } from '../context/Authcontext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navcontainer">
      <img src={currentUser?.photoURL} alt="profile" />
      <span>{currentUser.displayName}</span>
      <button onClick={()=>signOut(auth)}> <i class='bx bx-log-out'></i></button>
    </div>
  );
};

export default Navbar;
