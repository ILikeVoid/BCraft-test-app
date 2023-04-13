import React from "react";
import s from "../../pages/RegistrationPage/Registration.module.scss";
import logo from "../../assets/img/martz-logo.png";
import LoginIcon from "@mui/icons-material/Login";
import {NavLink} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form"

interface IFormInput {
    email: string
    password: string
    confirm: string
}

const RegisterForm = () => {

    const {handleSubmit, register, formState: {errors, isValid}, reset} = useForm<IFormInput>({mode: "onBlur"})

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data)
        reset()
    }

    const passwordErrorMessage = "Must contain at least one number and one uppercase and lowercase letter, as well as at least 4 and no more than 10 characters."

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.logo}>
                    <img src={logo} alt="logo"/>
                    <span>Welcome back! Create new account</span>
                </div>
                <div className={s.email}>
                    <input placeholder="Email" type="email"
                           {...register("email", {
                               required: "Field is required!", pattern: {
                                   value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,30}$/,
                                   message: 'Please enter a valid email',
                               },
                           })}/>
                    {errors.email? <span>{errors.email?.message}</span> : null}
                </div>
                <div className={s.password}>
                    <input placeholder="Password" {...register("password", {
                        minLength: {
                            value: 4,
                            message: passwordErrorMessage
                        },
                        maxLength: {
                            value: 10,
                            message: passwordErrorMessage
                        },
                        required: "Field is required!", pattern: {
                            value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
                            message: passwordErrorMessage
                        },
                    })}/>
                    {errors.password? <span>{errors.password?.message}</span> : null}
                </div>
                <div className={s.password}>
                    <input placeholder="Confirm password" {...register("confirm", {required: true})}/>
                </div>
                <button disabled={!isValid}>Sign up <LoginIcon/></button>
                <span>Do you have an account? <NavLink to="/sign-in">Sign in</NavLink></span>
            </form>
        </>
    )
}

export default RegisterForm