import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from './features/counter/appSlice';
import { auth, provider } from './firebase';
import './Login.css'
function Login() {
    const dispatch=useDispatch();
    const signin=()=>{
     auth.signInWithPopup(provider)
     .then(result=>{
        dispatch(login({
            username:result.user.displayName,
            profilePic:result.user.photoURL,
            id:result.user.uid,
        }))
     }).catch((error)=>alert(error.message));
    }
  return (
    <div className='login'>
        <div className='login_body'>
           <Button variant='outlined' onClick={signin}>Sign in</Button>
        </div>
    </div>
  )
}

export default Login