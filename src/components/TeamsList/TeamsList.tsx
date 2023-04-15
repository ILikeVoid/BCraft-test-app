import React, {FC} from "react";
import s from "./TeamsList.module.scss"
import {NavLink} from "react-router-dom";

type ITeams = {
    team_id: number
    name: string
    logo_url: string
    rating: number
}

const TeamsList: FC<ITeams> = ({team_id, name, logo_url, rating}) => {
    return (
        <NavLink to={`/teams/${team_id}`} className={s.teams}>
            <div className={s.img_block}><img className="text-white" src={logo_url} alt={name}/></div>
            <span className={s.title}>{name}</span>
            <span className={s.rating}>Rating: {rating}</span>
        </NavLink>
    )
}

export default TeamsList