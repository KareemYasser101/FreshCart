import React, { useEffect, useState } from 'react'
import Product from '../Product/Product';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import NoProductsToShow from '../NoProductsToShow/NoProductsToShow';
import { useQuery } from '@tanstack/react-query';

export default function Products() {

  const [searchTerm, setSearchTerm] = useState('');

  function getProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading } = useQuery({
    queryKey:['products'],
    queryFn:getProducts
  })

  // Filter products based on search term
  const filteredProducts = data?.data.data.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    isLoading ? <LoadingScreen/>
      :
      <>
        <Helmet>
          <title>Products</title>
        </Helmet>


        {/* search input */}
        <form className="max-w-lg mx-auto mb-5 mt-2">
            <div className="w-full">
                <input 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="search" 
                  className="block p-2.5 w-full z-20 text-sm text-gray-600 bg-gray-50 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-600" 
                  placeholder="Search by title..." 
                />
            </div>
        </form>
      
        
        {
          filteredProducts.length > 0
          ?
          <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-5">
            {
              filteredProducts.map((product, index) => {
                if(product.category.name !== "Women's Fashion")
                    return <Product product={product} key={index} />
              })
            }
          </div>
          :
          <NoProductsToShow />
        }
    </>
  )
}