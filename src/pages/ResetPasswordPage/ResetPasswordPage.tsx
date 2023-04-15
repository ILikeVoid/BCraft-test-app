import React, {useEffect, useState} from "react";
import s from "./ResetPasswordPage.module.scss"
import ResetPasswordForm from "../../components/forms/ResetPasswordForm";
import {useAppSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";

export interface IResetModalMessage {
    resetPasswordSuccessModalMessageActive: boolean
    setResetPasswordSuccessModalMessage: Function
}

const ResetPasswordPage = () => {
    const [resetPasswordSuccessModalMessageActive, setResetPasswordSuccessModalMessage] = useState(false)

    const isAuth = useAppSelector(state => state.user.isAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth === false) {
            navigate("/sign-in")
        }
    }, [])

    return (
        <div className={s.reset}>
            <ResetPasswordForm resetPasswordSuccessModalMessageActive={resetPasswordSuccessModalMessageActive}
                               setResetPasswordSuccessModalMessage={setResetPasswordSuccessModalMessage}/>
        </div>
    )
}

export default ResetPasswordPage