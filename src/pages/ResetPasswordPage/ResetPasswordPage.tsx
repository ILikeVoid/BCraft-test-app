import React, {useEffect} from "react";
import s from "./ResetPasswordPage.module.scss"
import ResetPasswordForm from "../../components/forms/ResetPasswordForm";
import {useAppSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";

const ResetPasswordPage = () => {

    const isAuth = useAppSelector(state => state.user.isAuth)

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth === false){
            navigate("/sign-in")
        }
    }, [])

    return (
        <div className={s.reset}>
            <ResetPasswordForm />
        </div>
    )
}

export default ResetPasswordPage