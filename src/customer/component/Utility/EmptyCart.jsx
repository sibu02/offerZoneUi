import React from 'react';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png"
        alt="Empty Cart"
        className="w-64 h-64 mb-6"
      />
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Your Cart is Empty
      </h2>
      <p className="text-gray-600 mb-8 text-center px-4">
        Looks like you haven't added anything to your cart yet.
      </p>
      <button
        onClick={() => window.location.href = '/'}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
      >
        Start Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
