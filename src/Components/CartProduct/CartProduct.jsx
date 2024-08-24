import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { CartContext } from '../../Contexts/NumberOfCartItems';

export default function CartProduct({product, setCart, cart}) {

    const [isLoadingPlus, setIsLoadingPlus] = useState(false);
    const [isLoadingMinus, setIsLoadingMinus] = useState(false);
    const [productCount, setProductCount] = useState(product.count);
    const {setNumberOfCartItems} = useContext(CartContext);

    async function removeProductFromCart(productId){
        let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        console.log(data);
        setCart(data);
        toast.success('Product has been removed successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    async function updateProductCount(productId, count){
        if(count > product.count){
            setIsLoadingPlus(true);
        }
        else{
            setIsLoadingMinus(true);
        }
        let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
            count
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        setCart(data);
        setIsLoadingPlus(false);
        setIsLoadingMinus(false);
    }

    useEffect(() => {
        setProductCount(product.count);
        setNumberOfCartItems(cart?.numOfCartItems)
    }, [cart]);


  return (
    <div className="justify-between items-center mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img src={product.product.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">{product.product.title}</h2>
            <p className="mt-1 text-sm text-gray-700">${product.price}</p>
            </div>
            <div className="mt-4 flex sm:flex-row flex-col justify-between sm:mt-0 sm:block">
                <div className="flex items-center w-fit border-gray-100 mb-5">
                    <button disabled={product.count == 1 || isLoadingMinus} onClick={() => {updateProductCount(product.product._id, product.count - 1)}} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-black">{isLoadingMinus ? <i className='fas fa-spinner fa-spin'></i>: '-'}</button>
                    <input onBlur={() => product.count != productCount && updateProductCount(product.product._id, productCount)} onChange={(e) => setProductCount(e.target.value)} className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={productCount} min="1" />
                    <button disabled={product.count == product.product.quantity || isLoadingPlus} onClick={() => {setIsLoadingPlus(true); updateProductCount(product.product._id, product.count + 1);}} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-black">{isLoadingPlus ? <i className='fas fa-spinner fa-spin'></i>: '+'}</button>
                </div>
                <div className="flex justify-end items-center">
                    <p className="text-sm">{(product.price) * product.count} USD</p>
                    <svg onClick={() => removeProductFromCart(product.product._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
  )
}
