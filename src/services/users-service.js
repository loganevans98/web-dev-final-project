import axios from 'axios';
const API_BASE = 'http://localhost:4000/api';
const USERS_API = `${API_BASE}/users`;

export const createUser = (user) =>
    axios.post(`${USERS_API}`, user)
        .then(response => response.data);

export const findAllUsers = () =>
    axios.get(USERS_API)
        .then(response => response.data);

export const findUserById = (uid) =>
    axios.get(`${USERS_API}/${uid}`)
        .then(response => response.data);

export const deleteUser = (uid) =>
    axios.delete(`${USERS_API}/${uid}`)
        .then(response => response.data);

export const updateUser = (user) => {
    axios.put(`${USERS_API}/${user._id}`, user)
        .then(response => response.data);
}


export const findUserByEmail = (uEmail) =>
    axios.get(`${USERS_API}/email/${uEmail}`)
        .then(response => response.data);

export const findUserByCredentials = (credentials) =>
    axios.get(`${USERS_API}/${credentials}`)
        .then(response => response.data);

