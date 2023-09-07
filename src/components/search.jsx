import { collection, getDoc, query, serverTimestamp, setDoc, updateDoc,getDocs, where,doc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { useState } from 'react';
import { db } from '../firebase';
import {AuthContext} from '../context/Authcontext';
const search = () => {
    const [username,setUsername] = useState("")
    const [user,setUser] = useState(null)
    const [err,setErr] = useState(false)
    const {currentUser} = useContext(AuthContext);

     const handleSearch = async () =>{
        const q = query(
                collection(db,"users"),where("displayName", "==",username)
        );

        try{
          
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUser(doc.data());
        });

      }catch (err){
         setErr(true);
      }
     };




     const handleKey = (e) =>{
        e.code === "Enter" && handleSearch();
      
     };



     const handleSelect = async () => {
      const combainId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;

          console.log("user",)
          console.log("currentuser",currentUser.displayName)
      try {
        const res = await getDoc(doc(db, 'chats', combainId));
    
        if (!res.exists()) {
          await setDoc(doc(db, 'chats', combainId), { messages: [] });
    
          await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [combainId + '.userInfo']: {
              uid: user.uid,
              Displayname: user.displayName,
              photoURL: user.photoURL,
            },
            [combainId + '.date']: serverTimestamp(),
          })
        
          await updateDoc(doc(db, 'userChats', user.uid), {
            [combainId + '.userInfo']: {
              uid: currentUser.uid,
              Displayname: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combainId + '.date']: serverTimestamp(),
          })
      }
     } catch (err) {
        setErr(true);
      }
    
      setUser(null);
      setUsername('');
    };
    
    

  return (
   <div className='searchcontainer'>
    <div className="searchwraper">
        <input type="text" value={username} placeholder=' find your friend'onKeyDown={handleKey} onChange={(e)=> setUsername(e.target.value)} />
    </div>
    {err && <div className="error">Oops, something went wrong. Please try again later.</div>}

    {user && <div className="userchat" onClick={handleSelect}>
         <img src={user.photoURL} alt="" />
         <div className="userchatinfo">
            <span>{user.displayName}</span>
         </div>
    </div>}
    </div>
  )
}

export default search