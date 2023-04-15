import React, {FC} from "react";
import s from "./GamesList.module.scss"
import {IGamesState} from "../../redux/Slices/gamesSlice";
import {NavLink} from "react-router-dom";

const GamesList: FC<IGamesState> = ({title, short_description, developer, img, id}) => {
    return (
        <NavLink to={`/games/${id}`} className={s.games}>
            <div className={s.img_block}><img src={img} alt="game pictures"/></div>
            <span className={s.title}>{title}</span>
            <span className={s.description}>{short_description}</span>
            <span className={s.developer}>Developer: {developer}</span>
        </NavLink>
    )
}

export default GamesList