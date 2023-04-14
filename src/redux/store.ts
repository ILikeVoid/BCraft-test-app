import {configureStore} from "@reduxjs/toolkit";
import gamesReducer from "./Slices/gamesSlice";
import userReducer from "./Slices/userSlice";


const store = configureStore({
        reducer: {
            user: userReducer,
            games: gamesReducer,
        }
    }
)

export default store
export type AppDispatch = typeof store.dispatch
export type RootType = ReturnType<typeof store.getState>
