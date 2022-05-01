import axios from "axios";

const API_BASE = 'http://localhost:4000/api';
const api = axios.create({
    withCredentials: true
});
/*
export const likeBook = async (book) => {
    const response = await api.post(`${API_BASE}/likes`, book)
    return response.data;
}

export const dislikeBook = async (book) => {
    const response = await api.post(`${API_BASE}/dislikes`, book)
    return response.data;
}
 */



export const userTogglesLike = async (userId, bookID, book) => {
    const response = await api.put(`${API_BASE}/users/${userId}/likes/${bookID}`,book)
    return response.data;
}

export const userTogglesDislike = async (userId, bookID, book) => {
    const response = await api.put(`${API_BASE}/users/${userId}/dislikes/${bookID}`,book)
    return response.data;
}

export const checkIfUserLikeBook = async (userId, bookId) => {
    const response = await api.get(`${API_BASE}/users/${userId}/likes/${bookId}`);
    return response.data;
}

export const checkIfUserDislikeBook = async (userId, bookId) => {
    const response = await api.get(`${API_BASE}/users/${userId}/dislikes/${bookId}`);
    return response.data;
}