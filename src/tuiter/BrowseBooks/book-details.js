import {React, useState, useEffect, useRef} from 'react';
import {useProfile} from "../../contexts/profile-context";
import {useParams} from "react-router-dom";
import SecureContent from "../Secure/SecureContent";
import * as bookService from "../../services/books-service";
import * as saveService from "../../services/lists-service";
import "../tuiter.css";

const BookDetails = () => {
	const [comments, setComments] = useState([]);
	const [likes, setLikes] = useState(0);
	const [liked, setLiked] = useState(false);
	const [dislikes, setDislikes] = useState(0);
	const [disliked, setDisliked] = useState(false);
    const [bookDetails, setBookDetails] = useState({});
	const [imageLink, setImageLink] = useState();
	const [saved, setSaved] = useState(false)
	const {bookID} = useParams();
	const commentRef = useRef();

    const fetchBookById = async() => {
        const response = await bookService.fetchBookById(bookID);
		setBookDetails(response.volumeInfo);
		setImageLink(bookDetails.imageLinks.smallThumbnail);
	}

	const handleComment = async () => {
		// const actualComment = await postComment(profile._id, movieDetails.imdbId, {
		// 	comment: commentRef.current.value,
		// 	commenter: profile._id,
		// 	commentEmail: profile.email
		// })
		setComments([...comments, commentRef.current.value]);
	}

	const handleLike = async () => {
		// const actualComment = await postComment(profile._id, movieDetails.imdbId, {
		// 	comment: commentRef.current.value,
		// 	commenter: profile._id,
		// 	commentEmail: profile.email
		// })
		let currentLikes = likes;
		if(liked) {
			setLikes(likes-1);
			setLiked(false)
		} else if(!liked) {
			setLikes(likes+1);
			setLiked(true)
		}
	}

	const handleDislike = async () => {
		// const actualComment = await postComment(profile._id, movieDetails.imdbId, {
		// 	comment: commentRef.current.value,
		// 	commenter: profile._id,
		// 	commentEmail: profile.email
		// })
		let currentDislikes = dislikes;
		if(disliked) {
			setDislikes(dislikes-1);
			setDisliked(false)
		} else if(!disliked) {
			setDislikes(dislikes+1);
			setDisliked(true)
		}
	}

	const handleSave = async() => {
		if(saved) {
			//work to unsave it from collection
			setSaved(false)
		} else if(!saved) {
			//work to save to collection
			setSaved(true)
		}
	}

	const {profile} = useProfile()

	const handleSaveButton = async() => {
		const response = await saveService.userTogglesSave(profile._id, bookID)
		console.log(response)
	}

	useEffect(() => {
		fetchBookById();
	},[]);



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
					<SecureContent>
						<button className="btn btn-outline-primary" onClick={handleSaveButton}>save</button>

					</SecureContent>
				</div>
			</div>
			<SecureContent>
				<div className="d-flex flex-column mt-2">
					<span><button className={`btn ${liked ? `btn-primary` : `btn-outline-primary`}`} onClick={handleLike}><i className="fas fa-thumbs-up"></i></button>{likes} Likes</span>
					<span><button className={`btn ${disliked ? `btn-primary` : `btn-outline-primary`}`} onClick={handleDislike}><i className="fas fa-thumbs-down"></i></button>{dislikes} Dislikes</span>
				</div>
				<h2>Leave a comment</h2>
				<textarea ref={commentRef}></textarea>
				<button className="btn btn-primary mt-2" onClick={handleComment}>Post</button>
				<h2>Comments</h2>
				<ul className="list-group">
					{
						comments.map(comment => <li>{comment}</li>)
					}
				</ul>
			</SecureContent>

		</div>
	);
};
export default BookDetails;

/*
<button className={`btn ${saved ? `btn-primary` : `btn-outline-primary`}`} onClick={handleSave}>{saved ? "Save" : "Saved"}</button>
 */