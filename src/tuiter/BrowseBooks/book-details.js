import {React, useState, useEffect, useRef} from 'react';
import {useProfile} from "../../contexts/profile-context";
import {Link, useParams} from "react-router-dom";
import SecureContent from "../Secure/SecureContent";
import * as booksService from "../../services/books-service";
import * as likesService from "../../services/likes-service";
import * as saveService from "../../services/lists-service";
import "../tuiter.css";


const BookDetails = () => {
	const {profile} = useProfile();
	const [comments, setComments] = useState([]);
	const [isModerator, setIsModerator] = useState(false)
	const [likes, setLikes] = useState(0);
	const [liked, setLiked] = useState(false);
	const [dislikes, setDislikes] = useState(0);
	const [disliked, setDisliked] = useState(false);
    const [bookDetails, setBookDetails] = useState({});
	const [imageLink, setImageLink] = useState();
	const [saved, setSaved] = useState(false)
	const {bookID} = useParams();
	const commentRef = useRef();

	const checkIfModerator = () => {
		setIsModerator(profile && profile.userType === 'MODERATOR') ;
	}

    const fetchBookById = async() => {
        const response = await booksService.fetchBookByIdFromGoogle(bookID);
		setBookDetails(response.volumeInfo);
		setImageLink(bookDetails.imageLinks.smallThumbnail);
	}

	const fetchComments = async () => {
		const allComments = await booksService.findCommentsByBookID(bookID);
		setComments(allComments);
	}

	const fetchLikes = async () => {
		const book = await booksService.fetchBookByIdFromOurApi(bookID);
		setLikes(book.likes);
	}

	const fetchDislikes = async () => {
		const book = await booksService.fetchBookByIdFromOurApi(bookID);
		setDislikes(book.dislikes);
	}

	const handleComment = async () => {
		const actualComment = await booksService.postComment(profile._id, bookID, {
			comment: commentRef.current.value,
			commenter: profile._id,
			commenterEmail: profile.email,
			bookTitle: bookDetails.title,
			bookLink: `/browse-books/details/${bookID}`
		})
		setComments([...comments, actualComment]);
	}

	const handleLike = async () => {
			const book = await likesService.likeBook({
				title: bookDetails.title,
				bookID: bookID,
				authors: bookDetails.authors,
				pageCount: bookDetails.pageCount,
				bookLink: `/browse-books/details/${bookID}`
			});
			setLikes(book.likes);
			setLiked(true)
	}

	const handleDislike = async () => {
		const book = await likesService.dislikeBook({
			title: bookDetails.title,
			bookID: bookID,
			authors: bookDetails.authors,
			pageCount: bookDetails.pageCount,
			bookLink: `/browse-books/details/${bookID}`
		});
		setDislikes(book.dislikes);
		setDisliked(true);
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

	const handleDeleteComment = async(commentID) => {
		await booksService.deleteCommentById(commentID);
		checkIfModerator();
		fetchComments();
	}

	const handleSaveButton = async() => {
		const response = await saveService.userTogglesSave(profile._id, bookID)
		console.log(response)
	}

	useEffect(() => {
		checkIfModerator();
		fetchComments();
		fetchLikes();
		fetchDislikes();
		fetchBookById();
	},[]);

	return(
		<div className="d-flex flex-column">
			<div className="d-flex flex-row justify-content-between">
				<div>
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
					<SecureContent>
						<div>
							<button className="btn btn-outline-primary mb-3" onClick={handleSaveButton}>save</button>
							<span><button className={`btn ${liked ? `btn-outline-primary`: `btn-primary`}`} onClick={handleLike}><i className="fas fa-thumbs-up"></i></button>{likes} Likes</span>
							<span><button className={`btn  ${disliked ? `btn-outline-primary` : `btn-primary`}`} onClick={handleDislike}><i className="fas fa-thumbs-down"></i></button>{dislikes} Dislikes</span>
						</div>
					</SecureContent>
			</div>
			<SecureContent>
				<div className="mt-3">
					<h2>Leave a comment</h2>
					<textarea ref={commentRef} className="w-100"></textarea>
					<button className="btn btn-primary mt-2" onClick={handleComment}>Post</button>
				</div>

				<div className="mt-3">
					<h2>Comments</h2>
					<ul className="list-group">
						{
							comments.map(comment =>
								<li className="list-group-item d-flex justify-content-between">
									<div>
										<Link to={`/profile/${comment.commenter}`}>
											<b> {comment && comment.commenterEmail}</b> <br/>
										</Link>
										{comment && comment.comment}
									</div>
									{isModerator ? <div><button className="btn btn-danger" onClick={() => handleDeleteComment(comment._id)}>delete</button></div> : <div></div>}
								</li>)
						}
					</ul>
				</div>
			</SecureContent>

		</div>
	);
};
export default BookDetails;

/*
<button className={`btn ${saved ? `btn-primary` : `btn-outline-primary`}`} onClick={handleSave}>{saved ? "Save" : "Saved"}</button>
 */