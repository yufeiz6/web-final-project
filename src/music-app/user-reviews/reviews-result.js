import React, { useState } from "react";
import {createReview} from "../services/reviews-thunks";
import {useDispatch} from "react-redux";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReviewResult = () => {

  const {currentUser} = useSelector(state => state.users);
  const [reviewResult, setReviewResult] = useState("");
  const dispatch = useDispatch();
  const { id: albumId } = useParams();
  const navigate = useNavigate();

  const reviewClickHandler = async () => {
    if(currentUser === null) {
      alert("Please login to review");
      navigate("/login");
      // return;
    }
    const newReview = {
      review: reviewResult,
      albumId: albumId,
    }
    await dispatch(createReview(newReview));
    setReviewResult("");
  };

  return (
    <div className="row">
      <div className="col-10">
        <textarea
          value={reviewResult}
          placeholder="Write your review here..."
          className="form-control border-0 form-control"
          onChange={(event) => setReviewResult(event.target.value)}
        ></textarea>
        <div>
          <button
            className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
            onClick={reviewClickHandler}
          >
            Review
          </button>
        </div>
      </div>
      <div className="col-12">
        <hr />
      </div>
    </div>
  );
};

export default ReviewResult;