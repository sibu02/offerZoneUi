/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
'use client'

import ProductCard from './ProductCard'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../../State/Product/Action'
import { Pagination, Button } from '@mui/material'
import PageLoader from '../Utility/PageLoader'

const sortOptions = [
  { name: 'Price: Low to High', value: 'price_low', href: '#', current: false },
  { name: 'Price: High to Low', value: 'price_high', href: '#', current: false },
]
const filters = [
  {
    id: 'price',
    name: 'Price Range',
    type: 'radio',
    options: [
      { value: '199-499', label: '₹199 - ₹499' },
      { value: '500-1000', label: '₹500 - ₹1,000' },
      { value: '1000-2000', label: '₹1,000 - ₹2,000' },
      { value: '2000+', label: '₹2,000+' },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    type: 'checkbox',
    options: [
      { value: 'S', label: 'Small' },
      { value: 'M', label: 'Medium' },
      { value: 'L', label: 'Large' },
    ],
  },
  {
    id: 'availability',
    name: 'Availability',
    type: 'checkbox',
    options: [
      { value: 'in_stock', label: 'In Stock' },
    ],
  },
  {
    id: 'discount',
    name: 'Discount',
    type: 'radio',
    options: [
      { value: '10', label: '10% or more' },
      { value: '20', label: '20% or more' },
      { value: '30', label: '30% or more' },
      { value: '50', label: '50% or more' },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {
  const [selectedFilter, setSelectedFilter] = useState({
    size: [],
    availability: [],
    price: '',
    discount: ''
  });
  const [currSort, setCurrSort] = useState("Sort");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const decodedQueryParams = decodeURIComponent(location.search);
  const searchParam = new URLSearchParams(decodedQueryParams);
  const productState = useSelector((state) => state.product);
  const size = searchParam.get('size');
  const stock = searchParam.get('availability');
  const price = searchParam.get('price');
  const discount = searchParam.get('discount');
  const page = searchParam.get('page') || 0;
  const pageNo = page === 0 ? 1 : page;
  const sort = searchParam.get('sort');
  const searchQuery = searchParam.get('query');
  useEffect(() => {
    const [minPrice, maxPrice] = price == null ? [0, 1000000] : price.split("-");
    const data = {
      categoryLevelThree: param.levelThree || '',
      categoryLevelTwo: param.levelTwo || '',
      categoryLevelOne: param.levelOne || '',
      sizes: size || [],
      minPrice: minPrice,
      maxPrice: maxPrice,
      minDiscount: discount || 0,
      sort: sort || "price_low",
      pageNo: page,
      pageSize: 10,
      stock: stock || '',
      searchQuery: searchQuery || ''
    }
    dispatch(findProducts(data))
    setIsLoading(productState.loading);
  }, [param.levelThree, param.levelTwo, param.levelOne,searchQuery])

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      const [minPrice, maxPrice] = price == null ? [0, 1000000] : price.split("-");
      const data = {
        categoryLevelThree: param.levelThree || '',
        categoryLevelTwo: param.levelTwo || '',
        categoryLevelOne: param.levelOne || '',
        sizes: size || [],
        minPrice: minPrice,
        maxPrice: maxPrice || 1000000,
        minDiscount: discount || 0,
        sort: sort || "price_low",
        pageNo: page,
        pageSize: 10,
        stock: stock || '',
        searchQuery: searchQuery || ''
      };
      dispatch(findProducts(data));
      setIsLoading(false);
    }, 300);
  
    return () => clearTimeout(debounceFetch);
  }, [size, stock, price, discount, page, sort])

  const clearAllFilter = () => {
    setSelectedFilter({
      size: [],
      availability: '',
      price: '',
      discount: ''
    })
    navigate({ search: '' });
    setMobileFiltersOpen(false);
  }

  const handleSort = (sortName, value) => {
    handleFilter("sort", value);
    setCurrSort(() => sortName);
  }

  const handleFilter = (sectionId, value) => {
    const searchParam = new URLSearchParams(location.search);
    if (sectionId === 'size') {
      let filterValue = searchParam.get('size') ? searchParam.get('size').split(",") : [];
      if (filterValue.includes(value)) {
        filterValue = filterValue.filter((val) => val !== value);
      } else {
        filterValue.push(value);
      }
      if (filterValue.length > 0) {
        searchParam.set('size', filterValue.join(','));
      } else {
        searchParam.delete('size');
      }

      setSelectedFilter((previous) => ({ ...previous, size: filterValue }))
    }
    else if (sectionId === 'availability') {
      let filterValue = searchParam.get(sectionId) ? searchParam.get(sectionId).split(",") : [];
      if (filterValue.includes(value)) {
        filterValue = [];
        searchParam.delete(sectionId);
      } else {
        filterValue.push(value);
        searchParam.set(sectionId, filterValue.join(","));
      }
      setSelectedFilter((previous) => ({ ...previous, availability: filterValue }))
    }
    else {
      searchParam.set(sectionId, value);
      setSelectedFilter((previous) => ({ ...previous, [sectionId]: value }))
    }
    navigate({ search: searchParam.toString() })
  }

  const handlePaginationChange = (event, value) => {
    const searchParam = new URLSearchParams(location.search);
    searchParam.set("page", value);
    navigate({ search: searchParam.toString() })
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return (
    <div className="bg-white">
      {isLoading ? (
        <PageLoader />
      ) : (
        <div>
          {/* Mobile filter dialog */}
          <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 z-40 flex">
              <DialogPanel
                transition
                className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                            <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                onChange={() => handleFilter(section.id, option.value)}
                                checked={
                                  section.id === 'size' ?
                                    selectedFilter.size.includes(option.value) :
                                    section.id === 'availability' ?
                                      selectedFilter.availability.includes(option.value) :
                                      selectedFilter[section.id] === option.value
                                }
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type={section.type}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                  <div className='flex justify-center m-4'>
                    <Button variant='outlined' size='small' className='rounded-lg' onClick={clearAllFilter}>Clear Filter</Button>
                  </div>
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <main className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      {currSort}
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <a
                            onClick={() => handleSort(option.name, option.value)}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                            )}
                          >
                            {option.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>
              <h2 className='hidden lg:block text-lg opacity-50 font-bold'>Filters</h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                {/* Filters */}
                <form className="hidden lg:block">
                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                            <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                checked={
                                  section.id === 'size' ?
                                    selectedFilter.size.includes(option.value) :
                                    section.id === 'availability' ?
                                      selectedFilter.availability === option.value :
                                      selectedFilter[section.id] === option.value
                                }
                                onChange={() => handleFilter(section.id, option.value)}
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type={section.type}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>

                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                  <div className='mt-2'>
                    <Button variant='outlined' size='small' className='rounded-lg' onClick={clearAllFilter}>Clear Filter</Button>
                  </div>
                </form>

                {/* Product grid */}
                <div>
                  {productState.products?.content?.length > 0 ? (
                    <div className="lg:col-span-4">
                      <div className='flex flex-wrap justify-evenly'>
                        {productState.products.content && productState.products.content.map((item) => <div key={item.id}><ProductCard product={item} /></div>)}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center bg-gray-50">
                      {/* Icon */}
                      <ExclamationCircleIcon className="h-24 w-24 text-gray-400 mb-4" />

                      {/* Message */}
                      <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Products Found</h2>
                      <p className="text-lg text-gray-500">
                        Sorry, we couldn't find any products under the <span className="font-bold">{param.levelThree}</span> category.
                      </p>

                      {/* Suggestion for users */}
                      <p className="text-md text-gray-500 mt-2">
                        Try checking other categories or modifying your search.
                      </p>
                    </div>
                  )}

                </div>
              </div>
            </section>

            <section className='w-full px=[3.5rem]'>
              <div className='px-4 py-5 flex justify-center'>
                <Pagination count={productState.products?.totalPages - 1} color="primary" onChange={handlePaginationChange} />
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  )
}
