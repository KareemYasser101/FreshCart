import React from 'react'
import { removeProductFromWishList } from '../../wishListOperations'
import { addProductToCart } from '../../cartOperations'

export default function WishListProduct({product, setWishList, setNumberOfCartItems}) {
  return (
    <div className="relative w-full justify-between mb-6 rounded-lg bg-white p-4 shadow-md sm:flex sm:justify-start">
        <img src={product.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-2 sm:mt-0">
                <h2 className="text-base font-bold text-gray-900">{product.title}</h2>
                <p className="mt-1 text-xs text-gray-700">${product.price}</p>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center space-x-4">
                    <svg onClick={() => removeProductFromWishList(product._id, setWishList)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </div>
        <button
            onClick={() => {
                addProductToCart(product._id, setNumberOfCartItems);
                removeProductFromWishList(product._id, setWishList);
                }
            }
            className="absolute bottom-2 right-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mt-4"
        >
            Add to cart
        </button>
    </div>
  )
}