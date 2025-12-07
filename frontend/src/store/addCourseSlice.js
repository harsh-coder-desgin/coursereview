import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    coursedata:[],
    tab:null,
    tab2:null
 }

const addcourseAuthSlice  = createSlice({
    name:"addcourseAuth",
    initialState,
    reducers:{
        addcoursedata:(state,action)=>{    
            state.coursedata = {...action.payload}
        },
        changetab:(state,action)=>{
            state.tab= action.payload
        },
        changetab2:(state,action)=>{
            state.tab2= action.payload
        }
    }
})

export const {addcoursedata,changetab,changetab2} = addcourseAuthSlice.actions;

export default addcourseAuthSlice.reducer;