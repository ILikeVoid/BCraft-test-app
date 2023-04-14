import axios from 'axios'

const url = 'https://643956a71b9a7dd5c9651bf2.mockapi.io/Games';

export const apiInstance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    }
})