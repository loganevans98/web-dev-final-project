import axios from "axios";
const OUR_BOOKS_API = 'http://localhost:4000/api/books'; //TODO: CHECK IF THIS IS THE RIGHT LINK
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const BY_ID_API_LINK = "https://www.googleapis.com/books/v1/volumes/";
const BY_TITLE_API_LINK = `https://www.googleapis.com/books/v1/volumes?key${API_KEY}&q`;
const api = axios.create({withCredentials: true});


export const fetchBookById = async (bookID) => {
    const response = await axios.get(`${BY_ID_API_LINK}${bookID}?key${API_KEY}`);
    return response.data;
}

export const searchBooksByTitle = async (title) => {
    const response = await axios.get(`${BY_TITLE_API_LINK}=${title}`);
    return response.data;
}


export const postComment = async (userId, imdbID, comment) => {
    const response = await api.post(`${OUR_BOOKS_API}/${imdbID}/comments/${userId}`, comment);
    return response.data;
}

export const findCommentsByImdbID = async (imdbID) => {
    const response = await api.get(`${OUR_BOOKS_API}/${imdbID}/comments`);
    return response.data;
}

export const findCommentsByUserId = async (userId) => {
    const response = await api.get(`http://localhost:4000/users/${userId}/comments`);
    return response.data;
}