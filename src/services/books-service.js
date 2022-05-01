import axios from "axios";
const API_BASE = 'http://localhost:4000/api'
const OUR_BOOKS_API = 'http://localhost:4000/api/books/'; //TODO: CHECK IF THIS IS THE RIGHT LINK
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const BY_ID_API_LINK = "https://www.googleapis.com/books/v1/volumes/";
const BY_TITLE_API_LINK = `https://www.googleapis.com/books/v1/volumes?key${API_KEY}&q`;
const api = axios.create({withCredentials: true});

// In books-controller:
//
// app.get('/api/books/:bookID', findBookByBookID)
//
export const fetchBookByIdFromGoogle = async (bookID) => {
    const response = await axios.get(`${BY_ID_API_LINK}${bookID}?key${API_KEY}`);
    return response.data;
}

export const fetchBooksByTitleFromGoogle = async (title) => {
    const response = await axios.get(`${BY_TITLE_API_LINK}=${title}`);
    return response.data;
}


export const fetchBookByIdFromOurApi = async(bookID) => {
    const response = await axios.get(`${OUR_BOOKS_API}${bookID}`);
    return response.data;
}


// In comments-controller:
//
// app.post('/api/books/:bookID/comments/:userId', postComment)
//
export const postComment = async (userId, bookID, comment) => {
    const response = await api.post(`${OUR_BOOKS_API}${bookID}/comments/${userId}`, comment);
    return response.data;
}

export const deleteCommentById = async (commentID) => {
    const response = await api.delete(`${API_BASE}/comments/${commentID}`);
    return response.data;
}

// In comments-controller:
//
// app.get('/api/books/:bookID/comments', findCommentsByBookID)
//
export const findCommentsByBookID = async (bookID) => {
    const response = await api.get(`${OUR_BOOKS_API}${bookID}/comments`);
    return response.data;
}

// In comments-controller:
//
// app.get('/api/users/:userId/comments', findCommentsByUserId)
//
export const findCommentsByUserId = async (userId) => {
    const response = await api.get(`${API_BASE}/users/${userId}/comments`);
    return response.data;
}

export const findAllMostRecentComments = async () => {
    const response = await api.get(`${API_BASE}/comments/recent`);
    return response.data;
}

