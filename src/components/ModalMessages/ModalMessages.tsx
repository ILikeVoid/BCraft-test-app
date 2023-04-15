import React, {FC} from "react";
import s from "./ModalMessages.module.scss"
import CloseIcon from '@mui/icons-material/Close';
import {IModalMessage} from "../forms/RegisterForm";
import {useNavigate} from "react-router-dom";
import {IResetModalMessage} from "../../pages/ResetPasswordPage/ResetPasswordPage";




export const RegisterSuccessModalMessage: FC<IModalMessage> = ({registerSuccessfulMessageActive, setRegisterSuccessfulMessageActive}) => {

    const navigate = useNavigate()

    return (
        <div className={registerSuccessfulMessageActive ? s.success_active : s.success_message}
             onClick={() => setRegisterSuccessfulMessageActive(false)}>
            <div className={registerSuccessfulMessageActive ? s.success_content_active : s.success_content}
                 onClick={e => e.stopPropagation()}>
                <div className={s.success_items}>
                    <span className={s.message_title}>Success!</span>
                    <span className={s.message}>Your account has been created!</span>
                    <span className="cursor-pointer" onClick={() => {setRegisterSuccessfulMessageActive(false); navigate("/sign-in")}}><CloseIcon fontSize="large"/></span>
                </div>
            </div>
        </div>
    )
}

export const ResetPasswordSuccessModalMessage: FC<IResetModalMessage> = ({resetPasswordSuccessModalMessageActive, setResetPasswordSuccessModalMessage}) => {

    const navigate = useNavigate()

    return (
        <div className={resetPasswordSuccessModalMessageActive ? s.success_active : s.success_message}
             onClick={() => setResetPasswordSuccessModalMessage(false)}>
            <div className={resetPasswordSuccessModalMessageActive ? s.success_content_active : s.success_content}
                 onClick={e => e.stopPropagation()}>
                <div className={s.success_items}>
                    <span className={s.message_title}>Success!</span>
                    <span className={s.message}>Your password has been changed!</span>
                    <span className="cursor-pointer" onClick={() => {setResetPasswordSuccessModalMessage(false); navigate("/")}}><CloseIcon fontSize="large"/></span>
                </div>
            </div>
        </div>
    )
}

