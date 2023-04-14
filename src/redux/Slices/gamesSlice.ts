import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {gamesApi} from "../../api/api";

export type IGamesState = {
    id: number
    title: string
    short_description: string
    developer: string
    img: string
}

interface IState {
    loading: boolean,
    games: IGamesState[],
}

const initialState: IState = {
    loading: false,
    games: []
}

export const getGamesThunk = createAsyncThunk<IGamesState[], undefined, {rejectValue: string}>(
    'getGamesThunk',
    async (_, {rejectWithValue}) => {
        try {
            const response = await gamesApi.getGames()
            return response.data
        } catch (e) {
            return rejectWithValue('Не удалось получить список игр')
        }
    }
)




export const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGamesThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getGamesThunk.fulfilled, (state, action) => {
            state.games = action.payload
            state.loading = false
        })
        builder.addCase(getGamesThunk.rejected, (state) => {
            state.loading = false
        })
    }
})




export default gamesSlice.reducer