import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Chats.css'
import SearchIcon from '@mui/icons-material/Search'
import ChatIcon from '@mui/icons-material/Chat'
import { auth, db } from './firebase'
import Chat from './Chat'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from './features/counter/appSlice'
function Chats() {
    const[posts,setPosts]=useState([]);
    const history=useHistory();
    const user=useSelector(selectUser);
    useEffect(()=>{
        db.collection('posts').orderBy('timestamp','desc')
        .onSnapshot(snapshot=>setPosts(snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data(),
        }))))
    },[]);
    const back=()=>{
        history.replace('/');
    };
  return (
    <div className='chats'>
        <div className='chats_header'>
            <Avatar src={user.profilePic} onClick={()=>auth.signOut()} className='avatar'/>
            <div className='search'>
                <SearchIcon/>
                <input type='text' placeholder='friends'/>
            </div>
            
                <ChatIcon className='chat_icon'/>
        </div>
            <div className='chat_post'>
                {posts.map(({id,data:{profilePic,username,timestamp,imageurl,read}})=>(
                    <Chat
                    key={id}
                    id={id}
                    username={username}
                    timestamp={timestamp}
                    imageUrl={imageurl}
                    read={read}
                    profilePic={profilePic}
                    />
                ))}
            </div>
            <div onClick={back}>
                Back
            </div>
    </div>
  )
}

export default Chats