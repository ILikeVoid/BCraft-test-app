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
    gameDetails: IGamesState | null
}

const initialState: IState = {
    loading: false,
    games: [],
    gameDetails: null
}

export const getGamesThunk = createAsyncThunk<Array<IGamesState>, undefined, {rejectValue: string}>(
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

export const getGameDetailsThunk = createAsyncThunk<IGamesState, number, {rejectValue: string}>(
    'getGameDetailsThunk',
    async (gameId, {rejectWithValue}) => {
        try {
            console.log(gameId)
            const response = await gamesApi.getGameDetails(gameId)
            return response.data
        } catch (e) {
            return rejectWithValue('Не удалось получить детали игры')
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
        builder.addCase(getGameDetailsThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getGameDetailsThunk.fulfilled, (state, action) => {
            state.gameDetails = action.payload
            state.loading = false
        })
        builder.addCase(getGameDetailsThunk.rejected, (state) => {
            state.loading = false
        })
    }
})




export default gamesSlice.reducer