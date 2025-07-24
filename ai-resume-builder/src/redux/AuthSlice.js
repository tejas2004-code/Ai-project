import {createSlice} from '@reduxjs/toolkit';

const initialState={
    user:null,
    token:null,
    isAuthenticated:false,
};
const AuthSlice=createSlice({

    name:'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{
        state.user=action.payload.user;
        state.token=action.payload.token;
        state.isAuthenticated=true;
        },
        ClearUser:(state)=>{
            state.user=null;
            state.token=null;
            state.isAuthenticated=false;
        }

    }
});
export const {setUser,ClearUser} =AuthSlice.actions;
export default AuthSlice.reducer;