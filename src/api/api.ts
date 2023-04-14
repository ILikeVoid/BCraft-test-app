import {apiInstance} from "./instanceAxios"

export const gamesApi = {
    getGames: () => {
        return apiInstance.get("/games")
    }
}