import React, {FC, useEffect, useState} from "react";
import s from "../../pages/ResetPasswordPage/ResetPasswordPage.module.scss";
import logo from "../../assets/img/martz-logo.png";
import {SubmitHandler, useForm} from "react-hook-form"
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {resetPassword} from "../../redux/Slices/userSlice";
import {IResetModalMessage} from "../../pages/ResetPasswordPage/ResetPasswordPage";
import {ResetPasswordSuccessModalMessage} from "../ModalMessages/ModalMessages";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useNavigate} from "react-router-dom";
import {setResetPasswordInputsState} from "../../redux/Slices/inputsSlice";

export interface IResetFormInput {
    oldPassword: string
    newPassword: string
    confirm: string
}

const ResetPasswordForm: FC<IResetModalMessage> = ({
                                                       resetPasswordSuccessModalMessageActive,
                                                       setResetPasswordSuccessModalMessage
                                                   }) => {
    const [confirmInvalid, setConfirmInvalid] = useState(false)
    const [oldPasswordInvalid, setOldPasswordInvalid] = useState(false)
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [sameError, setSameError] = useState(false)
    const [oldPasswordValue, setOldPasswordValue] = useState("")
    const [newPasswordValue, setNewPasswordValue] = useState("")
    const [confirmNewPasswordValue, setConfirmNewPasswordValue] = useState("")

    const userPassword = useAppSelector(state => state.user.password)
    const inputsValue = useAppSelector(state => state.inputs.reset_password_inputs)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {
        handleSubmit,
        register,
        formState: {errors, isValid},
        reset,
        watch,
    } = useForm<IResetFormInput>({
        mode: "onBlur", defaultValues: {
            oldPassword: inputsValue.old_password,
            newPassword: inputsValue.new_password,
            confirm: inputsValue.confirm_new_password
        }
    })

    useEffect(() => {
        let newInputsValue: IResetFormInput = {
            oldPassword: oldPasswordValue,
            newPassword: newPasswordValue,
            confirm: confirmNewPasswordValue
        }
        dispatch(setResetPasswordInputsState(newInputsValue))
    }, [oldPasswordValue, newPasswordValue, confirmNewPasswordValue])


    useEffect(() => {
        if (watch("newPassword") !== confirmNewPasswordValue) {
            setConfirmInvalid(true)
        } else setConfirmInvalid(false)
    }, [confirmNewPasswordValue])


    const onSubmit: SubmitHandler<IResetFormInput> = (data) => {
        if (watch("oldPassword") !== userPassword) {
            setOldPasswordInvalid(true)
        } else if ((watch("newPassword") === userPassword)) {
            setSameError(true)
        } else if ((watch("newPassword") !== confirmNewPasswordValue)) {
            setConfirmInvalid(true)
        } else {
            setResetPasswordSuccessModalMessage(true)
            dispatch(resetPassword(data.newPassword))
            reset()
        }
    }

    const passwordErrorMessage = "Must contain at least one number and one uppercase and lowercase letter, as well as at least 4 and no more than 10 characters. Should not match the old one."

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                    <span className={s.back} onClick={() => navigate(-1)}>
                    <KeyboardBackspaceIcon fontSize="large"/>Back</span>
                </div>
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
                                   onChange: (e) => {setOldPasswordInvalid(false); setOldPasswordValue(e.target.value)}
                               })}/>
                        <div onClick={() => setShowOldPassword(!showOldPassword)}><VisibilityIcon fontSize="large"/>
                        </div>
                    </div>
                    {errors.oldPassword ? <span>{errors.confirm?.message}</span> : null}
                    {oldPasswordInvalid ? <span>{"Old password incorrect"}</span> : null}
                </div>
                <div className={s.password}>
                    <div className={s.password_input}>
                        <input placeholder="New password"
                               type={showNewPassword ? "text" : "password"} {...register("newPassword", {
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
                            onChange: (e) => {setSameError(false); setNewPasswordValue(e.target.value)}
                        })}/>
                        <div onClick={() => setShowNewPassword(!showNewPassword)}><VisibilityIcon fontSize="large"/>
                        </div>
                    </div>
                    {sameError ? <span>Should not match the old one.</span> : null}
                    {errors.newPassword ? <span>{errors.newPassword?.message}</span> : null}
                </div>
                <div className={s.password}>
                    <div className={s.password_input}>
                        <input placeholder="Confirm new password"
                               type={showConfirmPassword ? "text" : "password"} {...register("confirm", {
                            required: "Field is required!",
                            onChange: e => setConfirmNewPasswordValue(e.target.value)
                        })}/>
                        <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}><VisibilityIcon
                            fontSize="large"/></div>
                    </div>
                    {confirmInvalid || errors.confirm ? <span>{"Passwords do not match"}</span> : null}
                </div>
                <button disabled={!isValid || confirmInvalid}>Reset</button>
            </form>
            <ResetPasswordSuccessModalMessage
                resetPasswordSuccessModalMessageActive={resetPasswordSuccessModalMessageActive}
                setResetPasswordSuccessModalMessage={setResetPasswordSuccessModalMessage}/>
        </>
    )
}

export default ResetPasswordForm