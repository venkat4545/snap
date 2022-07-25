import { Avatar } from '@mui/material'
import React from 'react'
import './Chat.css'
import StopRoundedIcon from '@mui/icons-material/StopRounded' 
import { selectImage } from './features/counter/appSlice';
import { useDispatch } from 'react-redux';
import { db } from './firebase';
import { useHistory } from 'react-router-dom';
import ReactTimeago from 'react-timeago';
function Chat({id,username,read,imageUrl,profilePic,timestamp}) {
    const dispatch=useDispatch();
    const history=useHistory();
    const open=()=>{
    if(!read){
        console.log(imageUrl);
        dispatch(selectImage(imageUrl));
        db.collection('posts').doc(id).set({
        },{merge:true}
        );
        history.push('/view')
    }
 }
    return (
    <div onClick={open} className='chat'>
     <Avatar className='chat_avatar' src={profilePic}/>
     <div className='chat_info'>
        <h4>{username}</h4>
        <p>{!read && "Tap to view-"}time will show{/*<ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/>
        {/*new Date(timestamp?.toData().toUTCString())..*/}
        </p> 
     </div>
      {!read && <StopRoundedIcon className='chat_readicon'/> } 
    </div>
  );
}
export default Chat