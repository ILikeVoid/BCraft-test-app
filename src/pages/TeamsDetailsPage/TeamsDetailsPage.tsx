import React, {useEffect} from "react";
import s from "./TeamsDetailsPage.module.scss"
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getTeamDetailsThunk} from "../../redux/Slices/teamsSlice";
import loadingImg from "../../assets/img/loading-img.svg"

const TeamsDetailsPage = () => {

    const {teamId} = useParams()
    const dispatch = useAppDispatch()

    const teamDetails = useAppSelector(state => state.teams.teamDetails)
    const loading = useAppSelector(state => state.teams.loading)

    useEffect(() => {
        if (teamId) {
            dispatch(getTeamDetailsThunk(parseInt(teamId)))
        }
    }, [])

    return (
        <div className={s.team_details}>
            {loading ? <img src={loadingImg} alt="loading"/>
                : <div className="container">
                    {teamDetails &&
                        <>
                            <div className={s.title}>
                                <img src={teamDetails.logo_url} alt="game picture"/>
                                <div className={s.info}>
                                    <span className={s.name}>{teamDetails.name}</span>
                                    <span className={s.wins}>Win: {teamDetails.wins}</span>
                                    <span className={s.losses}>Losses: {teamDetails.losses}</span>
                                    <span className={s.rating}>Rating: {teamDetails.rating}</span>
                                </div>
                            </div>
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default TeamsDetailsPage