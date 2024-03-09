import {createSlice} from "@reduxjs/toolkit";
import userApi from "../../mocks/user";

const storedUserInfo = localStorage.getItem("userInfo");

const initialState = {
    userDetails : storedUserInfo ? JSON.parse(storedUserInfo) : null,
    loading : false,
    error : null,

}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        loginStart(state){
            state.loading = true;
            state.error = null;
        },
        loginSucess(state, action){
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
        getUserDetailSucess(state, action){
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
    loginSucess,
    loginFailure,
    getUserDetailsStart,
    getUserDetailSucess,
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

export const login = (email, password) => async(dispath) => {
    try {
        dispath(loginStart());
        const user = await userApi.login(email, password);
        dispath(loginSucess(user));
    } catch (error) {
        dispath(loginFailure(error.message));
    }
}

export const fetchUserDetails = (userId) => async(dispath) => {
    try {
        dispath(getUserDetailsStart());
        const userDetails = await userApi.getUserDetails(userId);
        dispath(getUserDetailSucess(userDetails));
    } catch (error) {
        dispath(getUserDetailFailure(error.message));
    }
}


export const createUser = (name, email, password) => async (dispath) => {
    try {
        dispath(createUserStart());
        const user = await userApi.createUser(name, email, password);
        dispath(createUserSuccess(user));
        dispath(loginSucess(user));
    } catch (error) {
        dispath(createUserFailure(error.message));
    }
}

export const updateUser = (userId, updateData) => async (dispath) =>{
    try {
        dispath(updateUserStart());
        const updatedUser = await userApi.updateUser(userId, updateData);
        dispath(updateUserSuccess(updateUser))
    } catch (error) {
        dispath(updateUserFailure(error.message));     
    }
}


export const deleteUser =(userId) => async(dispath) =>{
    try {
        dispath(deleteUserStart());
        await userApi.deleteUser(userId);
        dispath(deleteUserSuccess())
    } catch (error) {
        dispath(deleteUserFailure(error.message));
    }
}

export const logout = () => (dispath) =>{
    dispath(userSlice.actions.logoutSuccess());    
}

export const {reducer} = userSlice;

export default userSlice;