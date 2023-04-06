import React from "react";
import s from "./Header.module.scss"
import logo from "../../assets/img/martz-logo.png"
import noAvatarImg from "../../assets/img/no-photo user.jpeg"
import categories from "../../assets/img/categories-img.png"
import shopping from "../../assets/img/shopping-image.png"
import like from "../../assets/img/heart.png"

const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.head}>
                <div className={s.title}>
                    <div className="container flex justify-between">
                        <img src={logo} alt="logo"/>
                        <div className={s.account}>
                            <span className="text-white font-bold mr-2">Dauren</span>
                            <img src={noAvatarImg} alt="avatar"/>
                        </div>
                    </div>
                </div>
                <div className={s.options}>
                    <div className="container flex justify-between items-center">
                        <div className={s.categories}>
                            <div className="w-full flex justify-center">
                                <img src={categories} alt="categories"/>
                            </div>
                            <span className="text-gray-600">Categories</span>
                        </div>
                        <input type="text" placeholder="Search..."/>
                        <div className={s.shopping}>
                            <img className="w-1.5" src={like} alt="like"/>
                            <img src={shopping} alt="shopping"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header