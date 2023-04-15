//inputsSlice

export type ILoginInputsState = {
    email: string
    password: string
}

export type IRegisterInputsState = {
    email: string
    password: string
    confirm_password: string
}

export type IResetPasswordInputsState = {
    old_password: string
    new_password: string
    confirm_new_password: string
}

export type IState = {
    login_inputs: ILoginInputsState
    register_inputs: IRegisterInputsState
    reset_password_inputs: IResetPasswordInputsState
}

///////////////////////////////////////////