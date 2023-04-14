import React, {useEffect} from "react";
import s from "./LoginPage.module.scss"
import LoginForm from "../../components/forms/LoginForm";
import {useAppSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const isAuth = useAppSelector(state => state.user.isAuth)

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth === true){
            navigate("/")
        }
    }, [])

    return (
        <div className={s.login}>
            <LoginForm />
        </div>
    )
}

export default LoginPage
