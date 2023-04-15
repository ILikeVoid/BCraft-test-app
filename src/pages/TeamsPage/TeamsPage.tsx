import React, {useEffect} from "react";
import s from "./TeamsPage.module.scss"
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getTeamsThunk} from "../../redux/Slices/teamsSlice";
import loadingSvg from "../../assets/img/loading-img.svg"
import TeamsList from "../../components/TeamsList/TeamsList";


const TeamsPage = () => {

    const teamsState = useAppSelector(state => state.teams.teams)
    const loading = useAppSelector(state => state.teams.loading)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(getTeamsThunk())
    }, [])

    return (
        <div className={s.teams}>
            <div className="container">
                {loading ?
                    <span className="w-full flex justify-center align-middle">
                        <img src={loadingSvg} alt="loaging"/>
                    </span>
                    :
                    <div className="grid grid-cols-6 grid-flow-row gap-3">
                        {teamsState.slice(0, 100).map((t, index) =>
                            <TeamsList key={index + 1} name={t.name} rating={t.rating} logo_url={t.logo_url} team_id={t.team_id}/>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default TeamsPage