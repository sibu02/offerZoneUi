import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSectionCard = ({ product }) => {
  // Calculate discount percentage if not already provided
  const navigate = useNavigate();

  return (
    <div  onClick={()=>navigate(`/product/${product.id}`)} className="my-2 w-[10.5rem] lg:w-[14rem] sm:w-[10.5rem] rounded-lg overflow-hidden shadow-lg flex flex-col items-center mx-2 cursor-pointer transform transition-transform duration-300 hover:scale-105 bg-white group">
      {/* Image */}
      <div className="w-full">
      <div className="absolute top-1 right-1 bg-indigo-500 rounded-full px-1 py-1 text-[0.6rem] font-semibold text-white shadow-lg">
          {product.discountPercent}% Off
        </div>
      <img className="h-[10rem] lg:h-[10rem] sm:h-[10rem] w-full object-cover object-top" src={product.imageUrl} alt={product.title} />
      </div>
      {/* Info */}
      <div className="px-3 py-2 w-full transition-transform duration-300 transform group-hover:-translate-y-2">
        <div className="font-bold text-md lg:text-md sm:text-sm xs:text-xs mb-1 truncate text-center ">{product.title}</div>

        {/* Description with sliding effect */}
        <p className="text-gray-600 text-xs sm:text-xs xs:text-[10px] text-center h-[3rem] sm:h-[3rem] xs:h-[2.5rem] overflow-hidden">
          {product.description.substring(0,50)}....
        </p>
      </div>

      {/* Price and Discount */}
      <div className="text-center py-2 transition-transform duration-300 transform group-hover:-translate-y-2 space-x-1">
        <span className="inline-block bg-indigo-100 rounded-full px-4 py-1 text-sm font-semibold text-indigo-700 lg:px-2 lg:py-1 sm:px-2 sm:py-1 sm:text-[10px] xs:px-1 xs:py-0.5 xs:text-[8px]">
          ₹{product.discountedPrice}
        </span>
        <span className="text-gray-500 line-through text-sm sm:text-[10px] xs:text-[8px] mt-1">
          ₹{product.price}
        </span>
        {/* <div className="text-green-500 text-xs sm:text-[10px] xs:text-[8px] font-semibold">
          {discountPercent}% off
        </div> */}
      </div>
    </div>
  );
};

export default HomeSectionCard;
