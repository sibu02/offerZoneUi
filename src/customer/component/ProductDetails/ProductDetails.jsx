import { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import { Radio, RadioGroup } from '@headlessui/react'
import ProductReviewCard from './ProductReviewCard';
import { Box, Button, Grid } from '@mui/material';
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductbyId } from '../../../State/Product/Action';
import { addItemToCart } from '../../../State/Cart/Action';
import PageLoader from '../Utility/PageLoader';
import { getReview } from '../../../State/Review/Action';

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  sizes: [
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: false },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
  const jwt = localStorage.getItem("jwt");
  const [selectedSize, setSelectedSize] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const productState = useSelector((state) => state.product);
  const reviewState = useSelector((state) => state.review);
  const productDetails = productState.product;
  useEffect(() => {
    dispatch(findProductbyId(param.productId));
    dispatch(getReview(param.productId))
    window.scroll({ top: 0 });
  }, [param.productId])

  const handleAddToCart = () => {
    const reqData = {
      productId: productDetails.id,
      size: selectedSize,
      quantity: 1
    }
    navigate('/Cart')
    dispatch(addItemToCart(reqData))
  }

  return (
    <div className="bg-white">
      {productDetails ? (
        <div className="pt-6">

          <section className='grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-5 px-4 pt-8'>
            {/* Image gallery */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                <img
                  alt={productDetails.brand}
                  src={productDetails.imageUrl}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:gap-x-3 lg:px-4 lg:pb-24 lg:pt-2">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{productDetails.title}</h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <div className='flex space-x-3 text-[1.2rem]'>
                  <p className="font-semibold">₹{productDetails.discountedPrice}.00</p>
                  <p className="opacity-50 line-through">₹{productDetails.price}.00</p>
                  <p className="text-green-600 font-semibold">{productDetails.discountPercent}% Off</p>
                </div>


                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">

                    <div className="flex items-center">
                      <Rating name="read-only" value={4} readOnly />
                    </div>
                    <a href='#' className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      {234} reviews
                    </a>
                  </div>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Size guide
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {productDetails.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size.name}
                          disabled={!(size.quantity > 0)}
                          className={classNames(
                            size.quantity > 0
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                          )}
                        >
                          <span>{size.name}</span>
                          {size.quantity > 0 ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              >
                                <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>


                <button
  onClick={handleAddToCart}
  className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
    ${!selectedSize || !jwt ? 'bg-indigo-300 text-white cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
  disabled={!selectedSize || !jwt}
>
  Add to Cart
</button>

              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">{productDetails.description}</p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                  <div className="mt-4">
                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                      {product.highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-400">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.details}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Rating and Reviews */}
          <h1 className='font-semibold text-lg pb-4 text-center'>Recent Reviews & Ratings</h1>
          {reviewState.reviews.length > 0 ? (
            <section className='flex justify-center'>
              <Grid container spacing={4} justifyContent="center">
                {reviewState.reviews.map((userReview) => (
                  <Grid item xs={12} md={6} lg={4} key={userReview.id}>
                    <ProductReviewCard data={userReview} />
                  </Grid>
                ))}
              </Grid>
            </section>
          ) : (
            <div className='text-center py-6'>
              <h2 className='text-xl text-gray-500'>No Reviews Yet</h2>
            </div>
          )}

        </div>
      ) : (
        <PageLoader />
      )}

    </div>
  )
}
