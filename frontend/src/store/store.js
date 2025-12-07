import { configureStore } from "@reduxjs/toolkit";
import creatorAuthReducer  from "./creatorAuthSlice"; 
import userAuthReducer from "./userAuthSlice"
import courseAuthReducer from "./courseAuthSlice"
import usersearchAuthReducer from "./usersearch"
import addcourseAuthReducer from './addCourseSlice'
const store = configureStore({
  reducer: {
    creatorAuth: creatorAuthReducer,
    userAuth:userAuthReducer,
    courseAuth:courseAuthReducer,
    usersearchAuth:usersearchAuthReducer,
    addcourseAuth:addcourseAuthReducer
  },
});

export default store;
