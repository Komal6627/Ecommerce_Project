import {createSlice} from "@reduxjs/toolkit";
import userApi from "../../mocks/user";

const storedUserInfo = localStorage.getItem("userInfo");

let initialUserDetails = null;

if (storedUserInfo !== "undefined" && storedUserInfo !== null && storedUserInfo !== "") {
    try {
        initialUserDetails = JSON.parse(storedUserInfo);
    } catch (error) {
        console.error("Error parsing storedUserInfo:", error);
        // Handle the error, e.g., set initialUserDetails to null or a default value
    }
}

  

  const initialState = {
    userDetails: initialUserDetails,
    loading: false,
    error: null,
  };


const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        loginStart(state){
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action){
            state.userDetails = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        loginFailure(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        getUserDetailsStart(state) {
            state.loading = true;
            state.error = null;
          },
        getUserDetailSuccess(state, action){
            state.userDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
        getUserDetailFailure(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        createUserStart(state){
            state.loading = true;
            state.error = null;
        },
        createUserSuccess(state, action){
            state.userDetails = {...action.payload};
            state.loading = false;
            state.error = null;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        createUserFailure(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart(state){
            state.loading = true;
            state.error = null;
        },
        updateUserSuccess(state, action){
            state.userDetails = {...state.userDetails, ...action.payload};
            state.loading = false;
            state.error = null;
            localStorage.setItem("userInfo", JSON.stringify(state.userDetails));
        },
        updateUserFailure(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart(state){
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess(state){
            state.userDetails = {};
            state.loading = false;
            state.error = null;
            localStorage.removeItem("userInfo"); 
        },
        deleteUserFailure(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        logoutSuccess(state){
            state.userDetails = {};
            state.loading = false;
            state.error = null;
            localStorage.removeItem("userInfo");
        },
    }
});


export const  {
    loginStart,
    loginSuccess,
    loginFailure,
    getUserDetailsStart,
    getUserDetailSuccess,
    getUserDetailFailure,
    createUserStart,
    createUserSuccess,
    createUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    logoutSuccess
} = userSlice.actions;

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch(loginStart());
        const user = await userApi.login(email, password);
        dispatch(loginSuccess(user));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
}

export const fetchUserDetails = (userId) => async(dispatch) => {
    try {
        dispatch(getUserDetailsStart());
        const userDetails = await userApi.getUserDetails(userId);
        dispatch(getUserDetailSuccess(userDetails));
    } catch (error) {
        dispatch(getUserDetailFailure(error.message));
    }
}


export const createUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch(createUserStart());
        const user = await userApi.createUser(name, email, password);
        dispatch(createUserSuccess(user));
        dispatch(loginSuccess(user));
    } catch (error) {
        dispatch(createUserFailure(error.message));
    }
}

export const updateUser = (userId, updateData) => async (dispatch) =>{
    try {
        dispatch(updateUserStart());
        const updatedUser = await userApi.updateUser(userId, updateData);
        dispatch(updateUserSuccess(updatedUser))
    } catch (error) {
        dispatch(updateUserFailure(error.message));     
    }
}


export const deleteUser =(userId) => async(dispatch) =>{
    try {
        dispatch(deleteUserStart());
        await userApi.deleteUser(userId);
        dispatch(deleteUserSuccess())
    } catch (error) {
        dispatch(deleteUserFailure(error.message));
    }
}

export const logout = () => (dispatch) =>{
    dispatch(userSlice.actions.logoutSuccess());    
}

export const {reducer} = userSlice;

export default userSlice;