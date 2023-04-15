import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {teamsApi} from "../../api/api";

export type ITeamsState = {
    team_id: number
    name: string
    rating: number
    logo_url: string
    losses: number
    wins: number
}

type IState = {
    loading: boolean
    teams: ITeamsState[]
    teamDetails: ITeamsState | null
}

const initialState: IState = {
    loading: false,
    teams: [],
    teamDetails: null
}


export const getTeamsThunk = createAsyncThunk<Array<ITeamsState>, undefined, {rejectValue: string}>(
    'getTeamsThunk',
    async (_, {rejectWithValue}) => {
        try {
            const response = await teamsApi.getTeams()
            return response.data
        } catch (e) {
            return rejectWithValue('Не удалось получить список игр')
        }
    }
)

export const getTeamDetailsThunk = createAsyncThunk<ITeamsState, number, {rejectValue: string}>(
    'getTeamDetailsThunk',
    async (teamId, {rejectWithValue}) => {
        try {
            console.log(teamId)
            const response = await teamsApi.getTeamDetails(teamId)
            return response.data
        } catch (e) {
            return rejectWithValue('Не удалось получить детали игры')
        }
    }
)

const teamsSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTeamsThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getTeamsThunk.fulfilled, (state, action) => {
            state.teams = action.payload
            state.loading = false
        })
        builder.addCase(getTeamsThunk.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(getTeamDetailsThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getTeamDetailsThunk.fulfilled, (state,action) => {
            state.teamDetails = action.payload
            state.loading = false
        })
        builder.addCase(getTeamDetailsThunk.rejected, (state) => {
            state.loading = false
        })
    }
})

export default teamsSlice.reducer