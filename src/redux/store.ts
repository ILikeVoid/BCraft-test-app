import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "./Slices/productsSlice";

const store = configureStore({
        reducer: {
            product: productsSlice
        }
    }
)

export default store
export type AppDispatch = typeof store.dispatch
export type RootType = ReturnType<typeof store.getState>
