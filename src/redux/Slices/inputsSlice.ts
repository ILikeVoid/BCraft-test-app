import {createSlice} from "@reduxjs/toolkit";
import {IState} from "../types";


const initialState: IState = {
    login_inputs: {
        email: "",
        password: ""
    },
    register_inputs: {
        email: "",
        password: "",
        confirm_password: ""
    },
    reset_password_inputs:{
        old_password: "",
        new_password: "",
        confirm_new_password: ""
    }
}

const inputsSlice = createSlice({
    name: "inputs",
    initialState,
    reducers: {
        setRegisterInputsState(state, action) {
            state.register_inputs.email = action.payload.email
            state.register_inputs.password = action.payload.password
            state.register_inputs.confirm_password = action.payload.confirm_password
        },
        setLoginInputsState(state, action) {
            state.login_inputs.email = action.payload.email
            state.login_inputs.password = action.payload.password
        },
        setResetPasswordInputsState(state, action) {
            state.reset_password_inputs.old_password = action.payload.old_password
            state.reset_password_inputs.new_password = action.payload.new_password
            state.reset_password_inputs.confirm_new_password = action.payload.confirm_new_password
        },

    }
})

export const {setRegisterInputsState, setLoginInputsState, setResetPasswordInputsState} = inputsSlice.actions
export default inputsSlice.reducer