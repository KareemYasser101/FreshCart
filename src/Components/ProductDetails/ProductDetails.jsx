import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingStars from "../RatingStars/RatingStars";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { addProductToCart } from "../../cartOperations";
import { CartContext } from "../../Contexts/NumberOfCartItems";
import { addProductToWishList } from "../../wishListOperations";

export default function ProductDetails() {
  let { id } = useParams();

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const {setNumberOfCartItems} = useContext(CartContext);

  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productDetails]);

  async function getProductDetails() {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + id);
    setProductDetails(data.data);
    setisLoading(false);
    getRelatedProducts(data.data.category._id)
  }
  async function getRelatedProducts(categoryId){
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products", {
      params: {
        "category": categoryId
      }
    });
    setRelatedProducts(data.data)
  }

  function changeMainImage(src){
    let mainImage = document.getElementById("mainImage");
    mainImage.setAttribute('src', src)
  }
  
  return (
    <>
    {
      isLoading ? <LoadingScreen />
      :
      <div className="bg-gray-100">
        <div className="mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 lg:h-96 px-4 mb-32">
              <img
                src={productDetails?.imageCover}
                alt="Product"
                className="h-full object-contain rounded-lg shadow-md mb-4 mx-auto"
                id="mainImage"
              />
              <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                {productDetails?.images.map((image, index)=>{
                    return <img
                    src={image}
                    alt={"Thumbnail" + index}
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onMouseEnter={() => changeMainImage(image)}
                  />
                })}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">{productDetails?.title}</h2>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">${productDetails?.price}</span>
              </div>
              <div className="rating flex items-center w-fit">
                <RatingStars rating={productDetails?.ratingsAverage}/>
                {/* <span className="">({productDetails?.reviews.length}) reviews</span> */}
              </div>
              <p className="text-gray-700 mb-4">{productDetails?.description}</p>
              <hr />
              <div className="categ mt-3 mb-2">
                <span className="text-gray-700 text-sm">Category: </span>
                <h3>{productDetails?.category.name}</h3>
              </div>
              <div className="sub-categ mb-2">
                <span className="text-gray-700 text-sm">SubCategory: </span>
                <h3>{productDetails?.subcategory[0].name}</h3>
              </div>
              <div className="sub-categ mb-4">
                <span className="text-gray-700 text-sm">Brand: </span>
                <h3>{productDetails?.brand.name}</h3>
              </div>

              <div className="mb-3">Available: {productDetails?.quantity}</div>
              <div className="mb-6">
                <label
                  for="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  defaultValue="1"
                  min="1"
                  max={productDetails?.quantity}
                  className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6 gap-4">
                <button onClick={() => addProductToCart(productDetails._id, setNumberOfCartItems)} className="max-w-40 bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  <span>Add to cart</span>
                </button>
                <button
                        onClick={() => addProductToWishList(id)}
                        className="max-w-40 bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-red-500 focus:ring-offset-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        Wishlist
                </button>
              </div>
            </div>
          </div>
          <RelatedProducts products={relatedProducts}/>
        </div>
      </div>
    }
    </>
  );
}