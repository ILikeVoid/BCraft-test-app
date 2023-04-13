import React from "react";
import s from "./Registration.module.scss"
import RegisterForm from "../../components/forms/RegisterForm";


const RegistrationPage = () => {


    return (
        <div className={s.registration}>
            <RegisterForm />
        </div>
    )
}

export default RegistrationPage