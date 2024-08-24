import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CartProduct from '../CartProduct/CartProduct';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Contexts/NumberOfCartItems';


export default function Cart() {

  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {setNumberOfCartItems} = useContext(CartContext);

  useEffect(() => {
    getUserCart();
    window.scrollTo(0,0);
  }, []);

  useEffect(() => {
    if(cart?.numOfCartItems)
      setNumberOfCartItems(cart?.numOfCartItems)
    else
      setNumberOfCartItems(0)
  }, [cart]);

  async function getUserCart(){
    setIsLoading(true);
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token") 
        }
    }).finally(() => {
      setIsLoading(false);
    })
    console.log(data);
    setCart(data);
  }

  async function clearCart(){
    await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token") 
      }
    }).finally(() => {
      setCart(null);
    })
  }
  
  if(isLoading){
    return <LoadingScreen />
  }

  return (
      cart?
      <div className="pt-5">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items ({cart?.data.products.length})</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="h-fit rounded-lg md:w-2/3">
          {
            cart?.data.products.map((product, index) => {
                return  <CartProduct key={index} product={product} setCart={setCart} cart={cart}/>
            })
          }
            <div className="clear-btn w-full flex justify-end">
              <button onClick={() => clearCart()} className='text-red-500 border-2 border-red-500 rounded-md px-4 py-2 hover:text-white hover:bg-red-500 transition-all'>
                Clear Cart
                <i className="fa-regular fa-trash-can ms-2"></i>
              </button>
            </div>
          </div>
          
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 sticky top-28">
            <div className="mb-2 flex sm:flex-row flex-col justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${cart?.data.totalCartPrice}</p>
            </div>
            <div className="flex sm:flex-row flex-col justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$0</p>
            </div>
            <hr className="my-4" />
            <div className="flex md:flex-row flex-col md:justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">${cart?.data.totalCartPrice} USD</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <Link to={"/shippingAddress/" + cart?.data._id} className="mt-6 block text-center w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>
          </div>
        </div>
      </div> 
      :
      <>
        <Helmet>
          <title>Cart</title>
        </Helmet>
        <div className="h-[500px] flex items-center">
          <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
            <div className="max-w-md">
                  <div className="text-5xl font-dark font-bold mb-5">🛒</div>
                    <p className="text-2xl md:text-3xl font-light leading-normal">Cart is empty</p>
                    <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>
                  <Link to={"/"} className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">back to homepage</Link>
            </div>
          </div>
        </div>
      </>
  )
}
