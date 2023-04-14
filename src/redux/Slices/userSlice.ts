import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    email: null,
    password: null,
    isAuth: false
}



export type UserType = typeof initialState

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email
            state.password = action.payload.password
        },
        login(state, action) {
            state.isAuth = action.payload
        },
        logout(state) {
            state.isAuth = false
        },
        resetPassword(state, action){
            state.password = action.payload
        }
    }
})

export const {setUser, login, logout, resetPassword} = userSlice.actions

export default userSlice.reducer
