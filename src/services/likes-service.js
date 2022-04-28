import axios from "axios";

const API_BASE = 'http://localhost:4000/api';
const api = axios.create({
    withCredentials: true
});

export const likeBook = async (book) => {
    const response = await api.post(`${API_BASE}/likes`, book)
    return response.data;
}

export const dislikeBook = async (book) => {
    const response = await api.post(`${API_BASE}/dislikes`, book)
    return response.data;
}

