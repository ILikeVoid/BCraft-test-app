import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    id: null,
    email: null,
    token: null,
    password: null
}

export type UsersType = typeof initialState

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email
            state.password = action.payload.password
            state.token = action.payload.token
            state.id = action.payload.id
        }
    }
})

export const {setUser} = usersSlice.actions

export default usersSlice.reducer
