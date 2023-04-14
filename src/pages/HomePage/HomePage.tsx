import React, {useEffect} from "react";
import s from "./HomePage.module.scss"
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getGamesThunk} from "../../redux/Slices/gamesSlice";
import GamesList from "../../components/GamesList/GamesList";
import loadingSvg from "../../assets/img/loading-img.svg"


const HomePage = () => {

    const gamesState = useAppSelector(state => state.games.games)
    const loading = useAppSelector(state => state.games.loading)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getGamesThunk())
    }, [])

    return (
        <div className={s.home}>
            <div className="container">
                {loading ?
                    <span className="w-full flex justify-center align-middle">
                        <img src={loadingSvg} alt="loaging"/>
                    </span>
                    :
                    <div className="grid grid-cols-4 grid-rows-3 grid-flow-col gap-6">
                        {gamesState.map(g =>
                            <GamesList
                                key={g.id}
                                id={g.id}
                                title={g.title}
                                short_description={g.short_description}
                                developer={g.developer}
                                img={g.img}
                            />)}
                    </div>
                }
            </div>
        </div>
    )
}

export default HomePage