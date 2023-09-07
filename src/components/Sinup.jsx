
import './App.css'
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth , storage,db} from '../firebase';
import { useState } from 'react';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate,Link } from 'react-router-dom';
function Sinup()  {
  const[ err,setErr] = useState(false);
  const navigate = useNavigate();



  const handleSubmit = async (e) =>{

    e.preventDefault()
    const Displayname=  e.target.elements[0].value;
    const email = e.target.elements[1].value;
    const password =  e.target.elements[2].value;
    const file = e.target.elements[3].files[0] ;
      
      console.log(file)
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password)
  
      const storageRef = ref(storage, Displayname);
         
      const uploadTask = uploadBytesResumable(storageRef, file);
         
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        (error) => {
          setErr(true);
          // Handle unsuccessful uploads
          console.log("error")
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user,{
              displayName: Displayname,
              photoURL: downloadURL,
            });
                
            await setDoc(doc(db,'users/',res.user.uid),{
              uid: res.user.uid,
              displayName: Displayname,
              email,
              photoURL: downloadURL,
            });
  
            await setDoc(doc(db,"userChats",res.user.uid), {});
  
            navigate('/');
          });
        }      
      );
    } catch(err){
      setErr(true)
      console.log("err")
    }  
  }
  
  return (
        <div className="formcontainer">
          <div className="formwraper">
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                 <input type="text"  placeholder='Display Name' />
                 <input type="email"  placeholder='email' />
                 <input type="password" placeholder='password' />
                 <input type="file"  />

                 <button>Sin up</button>
                 {err && <span>Somthing Went Wrong</span>}
            </form>
            <p>You do have an account?  <Link to="/Login">Login</Link></p>
          </div>
        </div>
  )
}

export default Sinup ;
