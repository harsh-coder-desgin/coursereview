import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    status:false,
    users:null
}

const creatorAuthSlice  = createSlice({
    name:"creatorAuth",
    initialState,
    reducers:{
        login:(state,action)=>{                        
            state.status=true;
            state.users = action.payload                        
        },
        logout :(state)=>{
            state.status = false;
            state.users = null;
        }
    }
})

export const {login,logout } = creatorAuthSlice.actions;

export default creatorAuthSlice.reducer;