import React, {useEffect} from "react";
import s from "./HomePage.module.scss"
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getGamesThunk} from "../../redux/Slices/gamesSlice";
import GamesList from "../../components/GamesList/GamesList";
import loadingSvg from "../../assets/img/loading-img.svg"
import {NavLink, useNavigate} from "react-router-dom";
import {getTeamsThunk} from "../../redux/Slices/teamsSlice";


const HomePage = () => {

    const gamesState = useAppSelector(state => state.games.games)
    const teamsState = useAppSelector(state => state.teams.teams)
    const loadingGames = useAppSelector(state => state.games.loading)
    const loadingTeams = useAppSelector(state => state.teams.loading)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getGamesThunk())
        dispatch(getTeamsThunk())
    }, [])

    return (
        <div className={s.home}>
            <div className="container">
                {loadingGames || loadingTeams ?
                    <span className="w-full flex justify-center align-middle">
                        <img src={loadingSvg} alt="loaging"/>
                    </span>
                    :
                    <>
                        <div className="mt-20">
                            <span className={s.section_title}>Games</span>
                            <div className="flex justify-end"><span className={s.all}
                                                                    onClick={() => navigate("/games")}>All Games</span>
                            </div>
                            <div className="grid grid-cols-4 grid-flow-col gap-6">
                                {gamesState.slice(0, 4).map(g =>
                                    <NavLink to={`/games/${g.id}`} className={s.games}>
                                        <div className={s.img_block}><img src={g.img} alt="game pictures"/></div>
                                        <span className={s.title}>{g.title}</span>
                                        <span className={s.description}>{g.short_description}</span>
                                        <span className={s.developer}>Developer: {g.developer}</span>
                                    </NavLink>)}
                            </div>
                        </div>
                        <>
                            <span className={s.section_title}>Dota2 Pro teams</span>
                            <div className="flex justify-end"><span className={s.all}
                                                                    onClick={() => navigate("/teams")}>All Teams</span>
                            </div>
                            <div className="grid grid-cols-6 grid-flow-col gap-6 pb-20">
                                {teamsState.slice(0, 6).map(t =>
                                    <NavLink to={`/teams/${t.team_id}`} className={s.teams}>
                                        <div className={s.img_block}><img src={t.logo_url} alt="tems pictures"/></div>
                                        <span className={s.title}>{t.name}</span>
                                        <span className={s.rating}>Rating: {t.rating}</span>
                                    </NavLink>)}
                            </div>
                        </>
                    </>
                }
            </div>
        </div>
    )
}

export default HomePage