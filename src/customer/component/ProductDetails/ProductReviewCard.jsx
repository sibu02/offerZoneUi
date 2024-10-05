import Rating from '@mui/material/Rating';
import React from 'react'

const ProductReviewCard = ({data}) => {
    return (
        <div className="max-w-[40rem] bg-white shadow-md rounded-lg overflow-hidden my-4 mx-2">
          <div className="flex items-center px-4 py-3 bg-gray-800">
            <img className="w-10 h-10 object-cover rounded-full" alt="User avatar" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkZTK04q5MAb3xxGj9xiBt-rOefqwu5X4jtg&s'/>
            <div className="ml-3">
              <h3 className="text-white text-lg font-medium">{data.user.firstName}</h3>
              <Rating name="read-only" value={data.rating} readOnly />
            </div>
          </div>
          <div className="px-4 py-2">
            <div className="flex items-center">
            <p className="text-gray-400 text-sm">{data.comment}</p>
            </div>
            <p className="mt-2 text-gray-600">
              {data.reviewText}
            </p>
          </div>
        </div>
      );
}

export default ProductReviewCard