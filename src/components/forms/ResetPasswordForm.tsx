import React, {useEffect, useState} from "react";
import s from "../../pages/ResetPasswordPage/ResetPasswordPage.module.scss";
import logo from "../../assets/img/martz-logo.png";
import {SubmitHandler, useForm} from "react-hook-form"
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {resetPassword} from "../../redux/Slices/userSlice";

export interface IResetFormInput {
    oldPassword: string
    newPassword: string
    confirm: string
}

const ResetPasswordForm = () => {
    const [confirmInvalid, setConfirmInvalid] = useState(false)
    const [confirmValue, setConfirmValue] = useState("")
    const [oldPasswordInvalid, setOldPasswordInvalid] = useState(false)
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [sameError, setSameError] = useState(false)
    const [resetSuccessfulMessage, setResetSuccessfulMessage] = useState(false)

    const {
        handleSubmit,
        register,
        formState: {errors, isValid},
        reset,
        watch,
    } = useForm<IResetFormInput>({mode: "onBlur"})

    const userPassword = useAppSelector(state => state.user.password)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (watch("newPassword") !== confirmValue) {
            setConfirmInvalid(true)
        } else setConfirmInvalid(false)
    }, [confirmValue])

    const onSubmit: SubmitHandler<IResetFormInput> = (data) => {
        if(watch("oldPassword") !== userPassword){
            setOldPasswordInvalid(true)
        }else if ((watch("newPassword") === userPassword)){
            setSameError(true)
        }else if ((watch("newPassword") !== confirmValue)){
            setConfirmInvalid(true)
        }
        else {
            setResetSuccessfulMessage(true)
            dispatch(resetPassword(data.newPassword))
            reset()
        }
    }

    const passwordErrorMessage = "Must contain at least one number and one uppercase and lowercase letter, as well as at least 4 and no more than 10 characters. Should not match the old one."

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.logo}>
                    <img src={logo} alt="logo"/>
                    <span>Want to change your password?</span>
                </div>
                <div className={s.password}>
                    <div className={s.password_input}>
                        <input placeholder="Old passwrd"
                               type={showOldPassword ? "text" : "password"}
                               {...register("oldPassword", {
                                   required: "Field is required!",
                                   onChange: () => setOldPasswordInvalid(false)
                               })}/>
                        <div onClick={() => setShowOldPassword(!showOldPassword)}><VisibilityIcon fontSize="large"/></div>
                    </div>
                    {errors.oldPassword ? <span>{errors.confirm?.message}</span> : null}
                    {oldPasswordInvalid ? <span>{"Old password incorrect"}</span> : null}
                </div>
                <div className={s.password}>
                    <div className={s.password_input}>
                        <input placeholder="New password" type={showNewPassword ? "text" : "password"} {...register("newPassword", {
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
                            onChange: () => setSameError(false)
                        })}/>
                        <div onClick={() => setShowNewPassword(!showNewPassword)}><VisibilityIcon fontSize="large"/></div>
                    </div>
                    {sameError ?<span>Should not match the old one.</span> : null }
                    {errors.newPassword ? <span>{errors.newPassword?.message}</span> : null}
                </div>
                <div className={s.password}>
                    <div className={s.password_input}>
                        <input placeholder="Confirm new password" type={showConfirmPassword? "text" : "password"} {...register("confirm", {
                            required: "Field is required!",
                            onChange: e => setConfirmValue(e.target.value)
                        })}/>
                        <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}><VisibilityIcon fontSize="large"/></div>
                    </div>
                    {confirmInvalid || errors.confirm ? <span>{"Passwords do not match"}</span> : null}
                </div>
                {resetSuccessfulMessage ? <span className="text-green-600">{"Password changed successfully"}</span> : null}
                <button disabled={!isValid}>Reset</button>
            </form>
        </>
    )
}

export default ResetPasswordForm