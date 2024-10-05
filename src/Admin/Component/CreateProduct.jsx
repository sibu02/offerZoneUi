import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewProduct } from '../../State/Product/Action';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    originalPrice: '',
    discountedPrice: '',
    description: '',
    quantity: '',
    imageUrl: '',
    brand: '',
    sizes: [{ name: '', quantity: '' }],
    topLevelCategory: '',
    secondLevelCategory: '',
    thirdLevelCategory: ''
  });

  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const newSizes = formData.sizes.map((size, i) => (
      i === index ? { ...size, [name]: value } : size
    ));
    setFormData({ ...formData, sizes: newSizes });
  };

  const addSize = () => {
    setFormData({ ...formData, sizes: [...formData.sizes, { name: '', quantity: '' }] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewProduct(formData))
  };

  const clear = () =>{
    setFormData(
        {
            title: '',
            originalPrice: '',
            discountedPrice: '',
            description: '',
            quantity: '',
            imageUrl: '',
            brand: '',
            sizes: [{ name: '', quantity: '' }],
            topLevelCategory: '',
            secondLevelCategory: '',
            thirdLevelCategory: ''
          }
    )
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Original Price</label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Discounted Price</label>
          <input
            type="number"
            name="discountedPrice"
            value={formData.discountedPrice}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Top Level Category</label>
          <input
            type="text"
            name="topLevelCategory"
            value={formData.topLevelCategory}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Second Level Category</label>
          <input
            type="text"
            name="secondLevelCategory"
            value={formData.secondLevelCategory}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Third Level Category</label>
          <input
            type="text"
            name="thirdLevelCategory"
            value={formData.thirdLevelCategory}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Sizes</label>
          {formData.sizes.map((size, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                name="name"
                placeholder="Size Name"
                value={size.name}
                onChange={(e) => handleSizeChange(index, e)}
                className="w-[11rem] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={size.quantity}
                onChange={(e) => handleSizeChange(index, e)}
                className="w-[11rem] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addSize}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add Size
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Add Product
        </button>
      </form>
      <button
        onClick={clear}
          className="w-full mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
        >
          Clear
        </button>
    </div>
  );
};

export default CreateProduct;
