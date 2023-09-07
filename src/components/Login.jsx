import './App.css'
import { useNavigate,Link } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
function Login()  {

  const[ err,setErr] = useState(false);
  const navigate = useNavigate();



   const handleSubmit = async (e) =>{
       e.preventDefault()
       const email = e.target[0].value;
       const password =  e.target[1].value;
       
  
     try{
     
      await  signInWithEmailAndPassword(auth,email,password);
      navigate("/");
     }catch(err){
       setErr(true)
     }

    }

  return (
        <div className="formcontainer">
          <div className="formwraper">
            <span className="title">Login</span>
            <form onSubmit={handleSubmit} >
                 <input type="email"  placeholder='email' />
                 <input type="password" placeholder='password' />
                 <button>Login</button>
                 {err && <span>Somthing Went Wrong</span>}
            </form>
            <p>I have already a account?  <Link to="/register">Sinup</Link></p>
          </div>
        </div>
  )
}

export default Login ;