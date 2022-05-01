import axios from "axios";

const API_BASE = 'http://localhost:4000/api';
const api = axios.create({
    withCredentials: true
});

export const userSaveBook = async (userId, bookID) => {
    const response = await api.post(`${API_BASE}/users/${userId}/lists/${bookID}`)
    return response.data
}

export const userUnsaveBook = async (userId, bookID) => {
    const response = await api.delete(`${API_BASE}/users/${userId}/lists/${bookID}`)
    return response.data
}

export const findAllBooksSavedByUser = async (userId) => {
    const response = await api.get(`${API_BASE}/users/${userId}/lists/`)
    return response.data
}

export const findMostRecentSavesByUser = async (userId) => {
    const response = await api.get(`${API_BASE}/users/${userId}/lists/recent`)
    return response.data
}

export const userTogglesSave = async (userId, bookID) => {
    const response = await api.put(`${API_BASE}/users/${userId}/lists/${bookID}`)
    return response.data
}

export const checkIfUserSavedBook = async (userId, bookID) => {
    const response = await api.get(`${API_BASE}/users/${userId}/lists/${bookID}`)
    console.log(response.data)
    return response.data

}
