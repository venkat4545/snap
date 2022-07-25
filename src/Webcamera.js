import React, { useCallback, useRef} from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/counter/cameraSlice';
import { useHistory } from 'react-router-dom';
import './Webcam.css'

const videoconstraints={
    width:250,
    height:200,
    facingMode:"user",
}
function Webcamera() {
    const webCamref=useRef(null);
    const dispatch=useDispatch();
    const history=useHistory();
    const capture=useCallback(()=>{
      const imagesrc=webCamref.current.getScreenshot();
      dispatch(setCameraImage(imagesrc));
      history.push('/preview');
    },[webCamref]);
  return (
    <div className='webcapture'>
       
        <Webcam audio={false} height={videoconstraints.height} ref={webCamref}
        width={videoconstraints.width}
        videoConstraints={videoconstraints}
        
        />
        <RadioButtonUncheckedIcon
        className='webcamcapture' onClick={capture}
        fontSize='large'
        />
       
       
    </div>

  )
}

export default Webcamera