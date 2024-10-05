import { Rating } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createReview } from '../../../State/Review/Action';

const ProductReviewForm = () => {
  const [rating, setRating] = useState(3);
  const [reviewText, setReviewText] = useState('');
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewReq = {
      rating : rating,
      comment : reviewText,
      productId : param.productId
    }
    dispatch(createReview(reviewReq));
    navigate(`/product/${param.productId}`)
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden my-4 p-4">
      <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <Rating className='simple-controlled' value={rating} onChange={(e,newValue)=>setRating(newValue)}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ProductReviewForm;
