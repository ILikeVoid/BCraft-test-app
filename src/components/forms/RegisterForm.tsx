import React, {FC, useEffect, useState} from "react";
import s from "../../pages/RegistrationPage/Registration.module.scss";
import logo from "../../assets/img/martz-logo.png";
import LoginIcon from "@mui/icons-material/Login";
import {NavLink, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form"
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setUser} from "../../redux/Slices/userSlice";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {RegisterSuccessModalMessage} from "../ModalMessages/ModalMessages";
import {setRegisterInputsState} from "../../redux/Slices/inputsSlice";
import HomeIcon from '@mui/icons-material/Home';

export interface IRegisterFormInput {
    email: string
    password: string
    confirm?: string
}

export interface IModalMessage {
    registerSuccessfulMessageActive: boolean
    setRegisterSuccessfulMessageActive: Function
}

const RegisterForm: FC<IModalMessage> = ({registerSuccessfulMessageActive, setRegisterSuccessfulMessageActive}) => {
    const [confirmInvalid, setConfirmInvalid] = useState(false)
    const [confirmValue, setConfirmValue] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("")

    const inputsValues = useAppSelector(state => state.inputs.register_inputs)


    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {
        handleSubmit,
        register,
        formState: {errors, isValid},
        reset,
        watch
    } = useForm<IRegisterFormInput>({
        mode: "onBlur", defaultValues: {
            email: inputsValues.email,
            password: inputsValues.password,
            confirm: inputsValues.password
        }
    })

    useEffect(() => {
        let newInputsValue: IRegisterFormInput = {
            email: emailValue,
            password: passwordValue,
            confirm: confirmPasswordValue
        }
        dispatch(setRegisterInputsState(newInputsValue))
    }, [emailValue, passwordValue, confirmPasswordValue])


    useEffect(() => {
        if (watch("password") !== confirmValue) {
            setConfirmInvalid(true)
        } else setConfirmInvalid(false)
    }, [confirmValue])

    const onSubmit: SubmitHandler<IRegisterFormInput> = (data) => {
        dispatch(setUser(data))
        setRegisterSuccessfulMessageActive(true)
        reset()
    }

    const passwordErrorMessage = "Must contain at least one number and one uppercase and lowercase letter, as well as at least 4 and no more than 10 characters."

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                    <span className={s.home} onClick={() => navigate("/")}>
                    <HomeIcon fontSize="large"/></span>
                </div>
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
                               onChange: (e) => setEmailValue(e.target.value)
                           })}/>
                    {errors.email ? <span>{errors.email?.message}</span> : null}
                </div>
                <div className={s.password}>
                    <div className={s.password_input}>
                        <input placeholder="Password"
                               type={showPassword ? "text" : "password"} {...register("password", {
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
                            onChange: (e) => setPasswordValue(e.target.value)
                        })}/>
                        <div onClick={() => setShowPassword(!showPassword)}><VisibilityIcon fontSize="large"/></div>
                    </div>
                    {errors.password ? <span>{errors.password?.message}</span> : null}
                </div>
                <div className={s.password}>
                    <div className={s.password_input}>
                        <input placeholder="Confirm password"
                               type={showConfirmPassword ? "text" : "password"} {...register("confirm", {
                            required: "Field is required!",
                            onChange: (e) => {setConfirmValue(e.target.value); setConfirmPasswordValue(e.target.value)}
                        })}/>
                        <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}><VisibilityIcon
                            fontSize="large"/></div>
                    </div>
                    {confirmInvalid ? <span>{"Passwords do not match"}</span> : null}
                </div>
                <button disabled={!isValid || confirmInvalid}>Sign up <LoginIcon/></button>
                <span>Do you have an account? <NavLink to="/sign-in">Sign in</NavLink></span>
            </form>
            <RegisterSuccessModalMessage registerSuccessfulMessageActive={registerSuccessfulMessageActive}
                                         setRegisterSuccessfulMessageActive={setRegisterSuccessfulMessageActive}/>
        </>
    )
}

export default RegisterForm