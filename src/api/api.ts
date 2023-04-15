import {gamesApiInstance, teamsApiInstance} from "./instanceAxios"

export const gamesApi = {
    getGames: () => {
        return gamesApiInstance.get("/games")
    },
    getGameDetails: (gameId: number) => {
        return gamesApiInstance.get(`/games/${gameId}`)
    }
}

export const teamsApi = {
    getTeams: () => {
        return teamsApiInstance.get("/teams")
    },
    getTeamDetails: (teamId: number) => {
        return teamsApiInstance.get(`/teams/${teamId}`)
    }
}
