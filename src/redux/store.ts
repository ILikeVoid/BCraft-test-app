import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./Slices/productsSlice";
import usersReducer from "./Slices/usersSlice";

const store = configureStore({
        reducer: {
            product: productsReducer,
            users: usersReducer
        }
    }
)

export default store
export type AppDispatch = typeof store.dispatch
export type RootType = ReturnType<typeof store.getState>
