import React, {useState} from "react";
import s from "./Header.module.scss"
import logo from "../../assets/img/martz-logo.png"
import noAvatarImg from "../../assets/img/no-photo user.jpeg"
import {NavLink} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
    const [searchValue, setSearchValue] = useState("")

    return (
        <div className={s.header}>
            <div className="container">
                <div className={s.title}>
                    <img src={logo} alt="logo"/>
                    <div className={s.account}>
                        <NavLink to="sign-in">Sign in <LoginIcon/></NavLink>
                        <NavLink to="registration-page">Sign up...</NavLink>
                    </div>
                </div>
                <div className={s.options}>
                    <div className={s.nav}>
                        <NavLink to="wow">World of Warcraft</NavLink>
                        <NavLink to="diablo">Diablo</NavLink>
                        <NavLink to="starcraft">StarCraft</NavLink>
                        <NavLink to="warcraft">WarCraft3</NavLink>
                    </div>
                    <div className={s.search}>
                        <SearchIcon fontSize="large" cursor="pointer"/>
                        <input placeholder="Search..."
                               onChange={e => setSearchValue(e.target.value)}
                               value={searchValue}
                        />
                        {searchValue ? <CloseIcon fontSize="large" cursor="pointer" onClick={() =>setSearchValue("")}/> : null}
                    </div>
                    <div className={s.shop}>
                        <NavLink to="favorite"><FavoriteIcon fontSize="large"/></NavLink>
                        <NavLink to="shop"><LocalGroceryStoreIcon fontSize="large"/></NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header