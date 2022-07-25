import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { selectselectedImage } from './features/counter/appSlice'
import './view.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
function view() {
    const selectedImage=useSelector(selectselectedImage);
    const history=useHistory();
    const exit=()=>{
        history.replace('./chat')
     }
    useEffect(()=>{
        if(!selectedImage){
            exit();
        }
    },[selectedImage])
    
  return (
    <div className='view'>
      <img src={selectedImage} onClick={exit} alt=" "/>
      <div className='view_timer'>
      <CountdownCircleTimer
       isPlaying
       duration={10}
       strokeWidth={6}
       size={50}
       colors={['#004777', '#F7B801', '#A30000', '#A30000']}
       colorsTime={[10, 5, 2, 0]}
  >
    {({ remainingTime }) => {
         if(remainingTime===0){
            exit();
         }
         return remainingTime
    }}
  </CountdownCircleTimer>
  </div>
    </div>
  )
}

export default view