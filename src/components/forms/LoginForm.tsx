import React from "react";
import s from "../../pages/LoginPage/LoginPage.module.scss";
import logo from "../../assets/img/martz-logo.png";
import LoginIcon from "@mui/icons-material/Login";
import {NavLink} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";

interface IFormInput {
    email: string
    password: string
}

const LoginForm = () => {

    const {handleSubmit, register, formState: {errors, isValid}, reset} = useForm<IFormInput>({mode: "onBlur"})

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data)
        reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.logo}>
                    <img src={logo} alt="logo"/>
                    <span>Welcome back! Please enter your details</span>
                </div>
                <div className={s.email}>
                    <input placeholder="Email" type="email"
                           {...register("email", {
                               required: "Field is required!", pattern: {
                                   value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,30}$/,
                                   message: 'Please enter a valid email',
                               },
                           })}/>
                    {errors.email? <span>{errors.email.message}</span> : null}
                </div>
                <div className={s.password}>
                    <input placeholder="Password" type="password" {...register("password", {required: true})}/>
                </div>
                <button disabled={!isValid}>Sign in <LoginIcon/></button>
                <span>Don`t have an account? <NavLink to="/sign-up">Sign up</NavLink></span>
            </form>
        </>
    )
}

export default LoginForm