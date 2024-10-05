import React from 'react'
import { useNavigate } from 'react-router-dom'
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
     onClick={()=>navigate(`/product/${product.id}`)}
     key={product.id}
     className="my-2 w-[10.5rem] lg:w-[12rem] sm:w-[10.5rem] rounded-lg overflow-hidden  shadow-lg flex flex-col items-center mx-2 cursor-pointer transform transition-transform duration-300 hover:scale-105 bg-white group">
      {/* Image */}
      <div className="relative w-full">
        <img
          className="h-[10rem] w-full object-cover object-top"
          src={product.imageUrl}
          alt={product.title}
        />
        <div className="absolute top-1 right-1 bg-indigo-500 rounded-full px-1 py-1 text-[0.6rem] font-semibold text-white shadow-lg">
          {product.discountPercent}%
        </div>
      </div>
      {/* Info */}
      <div className="px-3 py-2 w-full transition-transform duration-300 transform group-hover:-translate-y-2">
        <div className="font-bold text-md lg:text-md sm:text-sm xs:text-xs mb-1 truncate text-center ">{product.title}</div>

        {/* Description with sliding effect */}
        <p className="text-gray-600 text-xs sm:text-xs xs:text-[10px] text-center overflow-hidden">
          {product.description.substring(0, 40)}....
        </p>
      </div>

      {/* Price and Discount */}
      <div className="flex space-x-2 text-center py-1 transition-transform duration-300 transform group-hover:-translate-y-2">
        <span className="inline-block bg-indigo-100 rounded-full px-2 py-1 text-xs font-semibold text-indigo-700 lg:px-4 lg:py-1 sm:px-1 sm:py-1 sm:text-[8px] xs:px-1 xs:py-0.5 xs:text-[5px] lg:text-[10px]">
          ₹{product.discountedPrice}
        </span>
        <div className="text-gray-500 line-through text-xs sm:text-[8px] xs:text-[5px] mt-1 lg:text-[10px]">
          ₹{product.price}
        </div>
        {/* <div className="text-green-500 text-xs sm:text-[8px] xs:text-[5px] font-semibold">
          {59}% off
        </div> */}
      </div>
    </div>

  )
}

export default ProductCard