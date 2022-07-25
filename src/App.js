
import React, { useEffect } from 'react';
import { BrowserRouter, Switch,Route } from 'react-router-dom';
import './App.css';
import Webcamera  from './Webcamera';
import Preview from './Preview';
import Chats from './Chats';
import View from './View'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/counter/appSlice';
import Login from './Login';
import { auth } from './firebase';

 function App() {
  const user=useSelector(selectUser);
  const dispatch=useDispatch();
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
          username:authUser.displayName,
            profilePic:authUser.photoURL,
            id:authUser.uid,
        }))
      }else{
        dispatch(logout())
      }
    });
  },[]);
  return (
    <div className="app">
    
     <BrowserRouter>
     {!user?(
      <Login/>
     ):(
      <div className='app_body'>
      <Switch>
      <Route exact path='/'>
     <Webcamera/>
     </Route>
        <Route  path='/preview' >
        <Preview/>
        </Route>
        <Route  path='/chat' >
        <Chats/>
        </Route>
        <Route  path='/view' >
         <View/>
        </Route>
      </Switch>
      
     </div>
     )}
      </BrowserRouter>
    </div>
  );
}

export default App;
