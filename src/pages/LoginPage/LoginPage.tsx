import React from "react";
import s from "./LoginPage.module.scss"
import LoginForm from "../../components/forms/LoginForm";

const LoginPage = () => {

    return (
        <div className={s.login}>
            <LoginForm />
        </div>
    )
}

export default LoginPage
