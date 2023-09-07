import React, { useContext } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Sinup from './components/Sinup';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import { AuthContext } from './context/Authcontext';
  
const app = () => {
  const{currentUser} = useContext(AuthContext);
   const ProtectedRoute =({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children;
   }

  return (
     <BrowserRouter>
        <Routes>
            <Route path='/'>
                <Route path='/' element={<ProtectedRoute>
                  <Home/>
                </ProtectedRoute>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Sinup/>}/>
            </Route>
        </Routes>
     </BrowserRouter>
  )
}

export default app