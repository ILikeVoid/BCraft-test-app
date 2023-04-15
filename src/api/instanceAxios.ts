import axios from 'axios'


export const gamesApiInstance = axios.create({
    baseURL: 'https://643956a71b9a7dd5c9651bf2.mockapi.io/Games',
    headers: {
        'Content-Type': 'application/json',
    }
})

export const teamsApiInstance = axios.create({
    baseURL: 'https://api.opendota.com/api',
    headers: {
        'Content-Type': 'application/json',
    }
})
