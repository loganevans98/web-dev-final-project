import {React, useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import "../tuiter.css";

const BookDetails = () => {
    const [bookDetails, setBookDetails] = useState({});
	const [imageLink, setImageLink] = useState();
	const {bookID} = useParams();
	const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const API_LINK = "https://www.googleapis.com/books/v1/volumes/";
    const fetchBookById = async() => {
        const response = await axios.get(`${API_LINK}${bookID}?key${API_KEY}`);
		setBookDetails(response.data.volumeInfo);
		setImageLink(bookDetails.imageLinks.smallThumbnail);
	}
	useEffect(() => {
		fetchBookById();
	})


	return(
		<div className="d-flex flex-column">
			<div className="d-flex flex-row">
				<img src={imageLink}/>
				<div className="ms-5">
					<h1>{bookDetails.title}</h1>
					<h4>{bookDetails.subtitle}</h4>
					<p>
						{bookDetails.authors ? `By ${bookDetails.authors}` : ""}
						<br />
						{bookDetails.pageCount ? `${bookDetails.pageCount} Pages` : ""}
						<br />
						<a href={bookDetails.previewLink}>Preview this Book</a>

					</p>
				</div>
			</div>
			<div className="d-flex flex-column mt-2">
				<button className="btn btn-primary wd-small-button"><i className="fas fa-thumbs-up"></i></button>
				<button className="mt-2 btn btn-primary wd-small-button"><i className="fas fa-thumbs-down"></i></button>
			</div>
			<h2>Leave a comment</h2>
			<textarea></textarea>
			<button className="btn btn-primary mt-2">Post</button>

		</div>
	);
};
export default BookDetails;