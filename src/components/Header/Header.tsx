import React, {useState} from "react";
import s from "./Header.module.scss"
import logo from "../../assets/img/martz-logo.png"
import {NavLink} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {logout} from "../../redux/Slices/userSlice";


const Header = () => {
    const [searchValue, setSearchValue] = useState("")
    const [resetWindow, setResetWindow] = useState(false)

    const userData = useAppSelector(state => state.user)

    const dispatch = useAppDispatch()

    const handleLogoutClick = () => {
        dispatch(logout())
    }



    return (
        <div className={s.header}>
            <div className="container">
                <div className={s.title}>
                    <img src={logo} alt="logo"/>
                    <div className={s.account}>
                        {userData.isAuth
                            ? <div className={s.account_info}>
                                <div className={resetWindow ? s.account_block_active : s.account_block}
                                     onMouseEnter={() => setResetWindow(true)}
                                     onMouseLeave={() => setResetWindow(false)}
                                >
                                    <span className={s.email}>
                                        {userData.email}<ArrowDropDownIcon/>
                                    </span>
                                    {resetWindow
                                        ? <div className={s.reset_window}>
                                            <NavLink to="reset-password"><button>Reset password</button></NavLink>
                                            <span className={s.logout} onClick={handleLogoutClick}>Sign out<LogoutIcon/></span>
                                        </div> : null}
                                </div>
                            </div>
                            : <>
                                <NavLink to="sign-in">Sign in <LoginIcon/></NavLink>
                                <NavLink to="sign-up">Sign up...</NavLink>
                            </>
                        }
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
                        {searchValue ?
                            <CloseIcon fontSize="large" cursor="pointer" onClick={() => setSearchValue("")}/> : null}
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