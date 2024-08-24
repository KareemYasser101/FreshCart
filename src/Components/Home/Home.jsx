import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Product from '../Product/Product';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Contexts/NumberOfCartItems';
import Slider from 'react-slick/lib/slider';
import Category from '../Category/Category';
import { WishListContext } from '../../Contexts/WishListContext';
import FilterProducts from '../FilterProducts/FilterProducts';
import NoProductsToShow from '../NoProductsToShow/NoProductsToShow';
import { useQuery } from '@tanstack/react-query';
import LeftArrow from '../../../public/prev-arrow.svg';
import RightArrow from '../../../public/next-arrow.svg';

export default function Home() {

  const [searchTerm, setSearchTerm] = useState('');
  const {setNumberOfCartItems} = useContext(CartContext);
  const {setNumOfWishList} = useContext(WishListContext);
  var carouselSettings = {
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 4,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <img src={LeftArrow} alt="Previous"/>,
    nextArrow: <img src={RightArrow} alt="Next"/>,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 590,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ],
  }

  useEffect(() => {
    getUserCart();
    window.scrollTo(0,0);
  }, []);

  let { data: categoriesData, isLoading: categoriesIsLoading } = useQuery({
    queryKey:['categories'],
    queryFn:getCategories,
  })

  let { data: productsData, isLoading: productsIsLoading } = useQuery({
    queryKey:['products'],
    queryFn:getProducts
  })

  function getCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  function getProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  // Filter products based on search term
  const filteredProducts = productsData?.data.data.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];


  async function getUserCart(){
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token") 
        }
    })
    setNumberOfCartItems(data.numOfCartItems);
  }


  return (
    categoriesIsLoading ? <LoadingScreen />
      :
      <>
        <Helmet>
          <title>FreshCart</title>
        </Helmet>
        <div className="home-div relative w-full">
            {/* categories slider */}
            <div className="categories-section mb-10">
                <Slider {...carouselSettings}>
                  {
                  categoriesData?.data.data.map((category, index) => {
                    if(category.name != "Women's Fashion" && category.name != "Music" && category.name != "Beauty & Health")
                      return <Category key={index} category={category} />
                  })
                  }
                </Slider>
            </div>
            
            {/* search field */}
            <form className="max-w-lg mx-auto my-5">
                <div className="w-full">
                    <input 
                      onChange={(e) => setSearchTerm(e.target.value)}
                      type="search" 
                      className="block p-2.5 w-full z-20 text-sm text-gray-600 bg-gray-50 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-600" 
                      placeholder="Search by title..." 
                    />
                </div>
            </form>


            {/* products */}
            {
              productsIsLoading ? <LoadingScreen />
              :
                filteredProducts.length > 0 
                ?
                <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                    {
                      filteredProducts?.map((product, index) => {
                        if(product.category.name != "Women's Fashion")
                            return <Product product={product} key={index} />
                      })
                    }
                </div>
                :
                searchTerm ? <NoProductsToShow /> : null // Show NoProductsToShow only if searchTerm is not empty
            }
        </div>
      </>
  );
}