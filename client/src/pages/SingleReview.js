import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { QUERY_SINGLE_REVIEW } from "../utils/queries";

const SingleReview = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { reviewId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_REVIEW, {
    // pass URL parameter
    variables: { reviewId: reviewId },
  });

  const review = data?.review || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="text-align-center theMovieRundown singleRevContainer my-3">
      <h3 className="text-align-center card-header text-light p-2 m-0">
        {review.reviewAuthor} <br />
        <span style={{ fontSize: "1rem" }}>
          Review for {review.movieTitle} <br />
          posted on {review.createdAt}
        </span>
      </h3>
      <div>
        <img
          alt={review.movieTitle}
          className="img-fluid"
          src={review.movieImg}
          style={{ margin: "0 auto" }}
        />
        <div className="potato-rating">
              {[...Array(5)].map((potato, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={index <= (review.potatoRating) ? "on" : "off"}
                  >
                    <span className="potato">&#129364;</span>
                  </button>
                );
              })}
            </div>
      </div>
      <div className="w-50 text-align-center theMovieRundown m-auto bg-info py-4">
        <p
          className="p-4"
          style={{
            fontSize: "1.2rem",
            fontStyle: "italic",
            border: "2px solid #7f5539",
            borderRadius: "10px",
            lineHeight: "1.4"
          }}
        >
          "{review.reviewText}"
        </p>
      </div>

      <div className="my-5">
        <CommentList comments={review.comments} reviewId={review._id} />
      </div>
      <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        <CommentForm reviewId={review._id} />
      </div>
    </div>
  );
};

export default SingleReview;
