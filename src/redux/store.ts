import {configureStore} from "@reduxjs/toolkit";
import gamesReducer from "./Slices/gamesSlice";
import userReducer from "./Slices/userSlice";
import teamsReducer from "./Slices/teamsSlice"
import inputsReducer from "./Slices/inputsSlice";


const store = configureStore({
        reducer: {
            user: userReducer,
            games: gamesReducer,
            teams: teamsReducer,
            inputs: inputsReducer
        }
    }
)

export default store
export type AppDispatch = typeof store.dispatch
export type RootType = ReturnType<typeof store.getState>
