import React from 'react'
import Product from '../../Product/Product'
import productsData from '../../Product/ProductData'

const ProductPage = () => {
  return (
    <div>
        <Product data={productsData}/>
    </div>
  )
}

export default ProductPage