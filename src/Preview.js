import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Preview.css"
import {resetCameraimage, selectcameraImage} from './features/counter/cameraSlice'
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer'
import TextFields from '@mui/icons-material/TextFields';
import SendIcon from '@mui/icons-material/Send'
import {v4 as uuid} from 'uuid'
import { db,storage } from './firebase';
import firebase from 'firebase/app'
import { selectUser } from './features/counter/appSlice';
function Preview() {
   const user=useSelector(selectUser);
    const cameraImage=useSelector(selectcameraImage);
    const history=useHistory();
    const dispatch=useDispatch();
    useEffect(()=>{
      if(!cameraImage){
        history.replace('/')
      }
    },[cameraImage,history]);
    const closePreview=()=>{
        dispatch(resetCameraimage());
    }
    const sendpost=()=>{
      const id=uuid();
      const uploadTask=storage.ref(`posts/${id}`)
      .putString(cameraImage,"data_url");

      uploadTask.on("state_changed",null,(error)=>{
        console.log(error);
      },
      ()=>{
          storage
          .ref('posts')
          .child(id)
          .getDownloadURL()
          .then((url)=>{
              db.collection('posts').add({
              imageurl:url,
              username:user.username,
              read:false,
              profilePic:user.profilePic,
              timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.push('/chat');
          });
      }
      );
    }
  return (
    <div className='preview'>
        <CloseIcon onClick={closePreview} className='preview_close' />
        <div className='preview_toolbar'>
        <TextFields/>
        <AddCircleRoundedIcon/>
        <NoteIcon/>
        <MusicNoteIcon/>
        <AttachFileIcon/>
        <CropIcon/>
        <TimerIcon/>
        </div>
        <img src= {cameraImage}alt="" />
        <div onClick={sendpost} className='preview_footer'>
          <h2>Send Now</h2>
          <SendIcon className='preview_send'/>
        </div>
    </div>
  )
}

export default Preview