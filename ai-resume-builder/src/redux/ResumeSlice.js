import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    resume: null,
    allResume: [],
    userId: null,  
};

const resumeSlice = createSlice({
  name: 'ResumeState',
  initialState,
  reducers: {
    setResume: (state, action) => {
        state.resume = action.payload.resume ?? state.resume;
        state.userId = action.payload.userId ?? state.userId;
        state.allResume = action.payload.allResume ?? state.allResume;
    },
    deleteResumeFromState: (state, action) => {
      state.allResume = state.allResume.filter(
        resume => resume._id !== action.payload
      );
    }
  }
});

export const { setResume, deleteResumeFromState } = resumeSlice.actions;
export default resumeSlice.reducer;