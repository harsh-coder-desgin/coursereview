import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courses: [],
    edit: null,
    onecourse: null,
}

const courseAuthSlice = createSlice({
    name: "courseAuth",
    initialState,
    reducers: {
        
        allcourse: (state, action) => {
            state.courses = action.payload
        },

        addcourse: (state, action) => {
            state.courses.push(action.payload)
        },
        
        setEditcourse: (state, action) => {            
            const course = state.courses.find(
                (course) => course._id === action.payload
            );

            if (course) {
                state.edit = course 
            }
            
        },

        updatecourse: (state, action) => {
            const index = state.courses.findIndex(
                (course) => course._id === action.payload._id
            );
            if (index !== -1) {
                state.courses[index] = action.payload; 
            }
            state.edit = null
        },

        deletecourse: (state, action) => {
            state.courses = state.courses.filter((course) => course
                ._id !== action.payload)
        },

        detailcourse: (state, action) => {
            state.onecourse = action.payload
            const course = state.courses.find((course) =>
                course._id === action.payload)
            if (course) {
                state.onecourse = course
            }
        }

    }
})

export const { addcourse, setEditcourse, updatecourse, deletecourse, allcourse, detailcourse } = courseAuthSlice.actions;

export default courseAuthSlice.reducer;