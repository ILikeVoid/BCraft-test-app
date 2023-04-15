import React, {useEffect, useState} from "react";
import s from "./Registration.module.scss"
import RegisterForm from "../../components/forms/RegisterForm";
import {useAppSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";


const RegistrationPage = () => {
    const isAuth = useAppSelector(state => state.user.isAuth)
    const [registerSuccessfulMessageActive, setRegisterSuccessfulMessageActive] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth === true){
            navigate("/")
        }
    }, [])

    return (
        <div className={s.registration}>
            <RegisterForm registerSuccessfulMessageActive={registerSuccessfulMessageActive} setRegisterSuccessfulMessageActive={setRegisterSuccessfulMessageActive}/>
        </div>
    )
}

export default RegistrationPage