import axios from "axios";
const API_BASE = "http://localhost:4000/api";

const api = axios.create({
    withCredentials: true
});

export const signup = async (user) => {
    try {
        const response = await api.post(`${API_BASE}/signup`, user)
        const returnedUser = response.data;
        return returnedUser;
    } catch (e) {
        alert(e)
    }
}

export const signin = async (credentials) => {
    try {
        const response = await api.post(`${API_BASE}/signin`, credentials)
        const returnedCred = response.data;
        return returnedCred;
    } catch (e) {
        alert(e)
    }
}

export const signout = async (user) => {
    try {
        const response = await  api.post(`${API_BASE}/signout`, user)
        const returnedUser = response.data;
        return returnedUser;
    } catch (e) {
        throw(e)
    }
}

export const profile = async () => {
    try {
        const response = await  api.post(`${API_BASE}/profile`)
        const returnedUser = response.data;
        return returnedUser;
    } catch (e) {
        throw(e)
    }
}
