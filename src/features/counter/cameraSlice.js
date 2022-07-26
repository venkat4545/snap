import { createSlice } from '@reduxjs/toolkit';

export const cameraSlice = createSlice({
  name: 'camera',
  initialState:{
  cameraImage:null,
  },
  reducers: {
    setCameraImage: (state, action) => {
      state.cameraImage = action.payload;
    },
    resetCameraimage:(state)=>{
        state.cameraImage=null;
    },
  },
});

export const {setCameraImage,resetCameraimage } = cameraSlice.actions;
export const selectcameraImage = (state) => state.camera.cameraImage;
export default cameraSlice.reducer;
