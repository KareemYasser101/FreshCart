import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Contexts/NumberOfCartItems';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import WishListProduct from '../WishListProduct/WishListProduct';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function WishList() {

  const [wishList, setWishList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {setNumberOfCartItems} = useContext(CartContext);

  useEffect(() => {
    getUserWishList();
  }, []);


  async function getUserWishList(){
    setIsLoading(true);
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
            token: localStorage.getItem("token")
        }
    })
    setWishList(data.data);
    console.log(data.data);
    setIsLoading(false);
  }

  if(isLoading){
    return <LoadingScreen />
  }
  return (
    wishList?.length != 0 ?
    <div className="h-fit pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Wishlist</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3 w-full">
              {
                  wishList?.map((product, index) => {
                      return <WishListProduct key={index} product={product} setWishList={setWishList} setNumberOfCartItems={setNumberOfCartItems}/>
                  })
              }
        </div>
      </div>
    </div>
    :
    <>
      <Helmet>
          <title>Wishlist</title>
      </Helmet>
      <div className="h-[500px] flex items-center">
          <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div className="max-w-md">
                  <div className="text-5xl font-dark font-bold mb-5">❤️</div>
                  <p className="text-2xl md:text-3xl font-light leading-normal">Wishlist is empty</p>
                  <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>
                  <Link to={"/"} className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">back to homepage</Link>
          </div>
          </div>
      </div>
    </>
  )
}
