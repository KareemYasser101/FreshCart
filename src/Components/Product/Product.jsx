import React, { useContext, useEffect, useState } from "react";
import RatingStars from "../RatingStars/RatingStars";
import { Link } from "react-router-dom";
import axios from "axios";
import { addProductToCart } from "../../cartOperations";
import { CartContext } from "../../Contexts/NumberOfCartItems";
import { addProductToWishList, getUserWishList } from "../../wishListOperations";

export default function Product({ product }) {
  const { numberOfCartItems, setNumberOfCartItems } = useContext(CartContext);
  
  return (
    <>
      <div className="max-w-2xl w-full mx-auto col-span-1 border border-gray-300 rounded-lg shadow-sm transition-all hover:border-blue-700">
        <div className="w-full bg-white shadow-md rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <Link to={"/productDetails/" + product._id}>
            <img
              className="rounded-t-lg p-6" // Reduced padding for better spacing
              src={product.imageCover}
              alt="product image"
            />
          </Link>
          <div className="px-5 pb-5">
            <Link to={"/productDetails/" + product._id}>
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">
                {product.title}
              </h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-1">
              {product.description}...
            </p>
            <div className="flex items-center my-2">
              <RatingStars rating={product.ratingsAverage} />
              <span className="text-sm text-gray-500 ml-2">{product.numReviews}</span>
            </div>
            {/* Responsive Flexbox Layout */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 space-y-3 sm:space-y-0 sm:space-x-3">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => addProductToCart(product._id, setNumberOfCartItems)}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition w-full sm:w-auto"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => addProductToWishList(product._id)}
                  className="group focus:outline-none w-full sm:w-auto"
                >
                  <svg
                    className="cursor-pointer text-current group-focus:text-red-600 transition-colors duration-200 mx-auto sm:mx-0"
                    fill={"currentColor"}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="30px"
                    height="30px" // Slightly reduced size for balance
                  >
                    <path d="M36.5,43c-0.309,0-0.616-0.095-0.876-0.283L24,34.348l-11.624,8.369c-0.458,0.329-1.06,0.375-1.561,0.118	C10.315,42.579,10,42.063,10,41.5v-30C10,7.916,12.916,5,16.5,5h15c3.584,0,6.5,2.916,6.5,6.5v30c0,0.563-0.315,1.079-0.816,1.335	C36.968,42.945,36.734,43,36.5,43z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
