import axios from "axios";

const API_BASE = 'http://localhost:4000/api';
const api = axios.create({
    withCredentials: true
});

export const userSaveBook = async (userId, bookID) => {
    const response = await api.post(`${API_BASE}/${userId}/lists/${bookID}`)
    return response.data
}

export const userUnsaveBook = async (userId, bookID) => {
    const response = await api.delete(`${API_BASE}/${userId}/lists/${bookID}`)
    return response.data
}

export const findAllBooksSavedByUser = async (userId) => {
    const response = await api.get(`${API_BASE}/${userId}/lists/`)
    return response.data
}
