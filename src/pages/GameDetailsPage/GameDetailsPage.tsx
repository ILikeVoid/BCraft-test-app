import React, {useEffect} from "react";
import s from "./GameDetailsPage.module.scss"
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getGameDetailsThunk} from "../../redux/Slices/gamesSlice";
import loadingImg from "../../assets/img/loading-img.svg"

const GameDetailsPage = () => {

    const {gameId} = useParams()
    const dispatch = useAppDispatch()

    const gameDetail = useAppSelector(state => state.games.gameDetails)
    const loading = useAppSelector(state => state.games.loading)

    useEffect(() => {
        if (gameId) {
            dispatch(getGameDetailsThunk(parseInt(gameId)))
        }
    }, [])

    return (
        <div className={s.game_details}>
            {loading ? <img src={loadingImg} alt="loading"/>
                : <div className="container">
                    {gameDetail &&
                        <>
                            <div className={s.title}>
                                <img src={gameDetail.img} alt="game picture"/>
                                <div className={s.info}>
                                    <span className={s.name}>{gameDetail.title}</span>
                                    <span className={s.description}>{gameDetail.short_description}</span>
                                </div>
                            </div>
                            <span className={s.developer}>Developer: {gameDetail.developer}</span>
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default GameDetailsPage