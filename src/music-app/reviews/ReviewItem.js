import React, { useEffect } from 'react';
import ReviewStats from './ReviewStats';
import {useDispatch} from "react-redux";
import {deleteReview} from "../services/reviews-thunks";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { findUserById } from '../services/users-service';
import { useState } from 'react';
import './review.css';
import { Link } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';
import { updateReviewThunk } from '../services/reviews-thunks';


const ReviewItem = ({ review }) => {

  const { liked, replies, likes, review: content } = review;
  const [updatedLikes, setUpdatedLikes] = useState(likes);
  const [author, setAuthor] = useState();

  useEffect(() => {
    const findAuthor = async() => {
      const author = await findUserById(review.author);
      setAuthor(author);
    }
    findAuthor();
  }, []);

  //console.log(content);
const dispatch = useDispatch();
const deleteReviewHandler = (id) => {
  dispatch(deleteReview(id));
}

const handleLike = async () => {

  await dispatch(updateReviewThunk({...review, liked: true, likes: updatedLikes + 1}));
  setUpdatedLikes(updatedLikes + 1);

};


const displayTime = () => {
  var currentTime = Date.now();
  var selectedTime = new Date(review.postTime).getTime();
  var timeDifference = currentTime - selectedTime;
  var mins = Math.floor(timeDifference / (1000 * 60));
  var hours = Math.floor(timeDifference / (1000 * 60 * 60));
  var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  if (days > 0) {
      return days + "d";
  } else if (hours > 0) {
      return hours + "h";
  } else if (mins > 0) {
      return mins + "m";
  } else {
      return "now";
  }
};


return (
  <li className="list-group-item mt-0 mb-0">
    <div className="row d-flex">
      <div className="col-xl-1 col-lg-2 col-md-3 d-none d-md-flex align-items-center justify-content-center">
        <Link to={`/profile/${author?._id}`}>
          <img className="rounded-circle" src={`../images/${author?.avatar}`} width={60} />
        </Link>
      </div>
      <div className="col-xl-11 col-lg-10 col-md-9 col-sm-12 col-12">
        <span className="fw-bolder me-1">
          <Link className="text-decoration-none text-dark" to={`/profile/${author?._id}`}>
            {author?.username}
          </Link>
        </span> · {displayTime()}
        <div>
          {/* <AiOutlineCloseCircle className="bi bi-x-lg float-end"
            onClick={() => deleteReviewHandler(review._id)}/> */}
          <div>{content}</div>
        </div>
        <div className="row-below">
        <div className="review-stats">
          <button onClick={handleLike}>
            <AiFillLike className='text-danger d-inline me-1'/> {updatedLikes}
          </button>
          
          {/* {isLiked ? (
            <BsHeartFill className="heart-icon liked mr-2" onClick={handleLike} />
          ) : (
            <BsHeart className="heart-icon mr-2" onClick={handleLike} />
          )}
          {review?.likes}
          {JSON.stringify(review?.likes)} */}
            </div>
          {/* <ReviewStats myReview={review}/> */}
        </div>
      </div>
    </div>
  </li>
);


};

export default ReviewItem;