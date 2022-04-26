import axios from "axios";
const API_BASE = "http://localhost:4000/api";

const api = axios.create({
    withCredentials: true
});

export const signup = (user) =>
    api.post(`${API_BASE}/signup`, user)
        .then(response => response.data);

export const signin = (credentials) =>
    api.post(`${API_BASE}/signin`, credentials)
        .then(response => response.data);

export const signout = (user) =>
    api.post(`${API_BASE}/signout`, user)
        .then(response => response.data);

export const profile = () =>
    api.post(`${API_BASE}/profile`)
        .then(response => response.data);
