import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import axios from 'axios';
import Brand from '../Brand/Brand';
import { useQuery } from '@tanstack/react-query';

export default function Brands() {

  function getBrands(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isLoading } = useQuery({
    queryKey:['brands'],
    queryFn:getBrands
  })
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);


  return (
    isLoading ? <LoadingScreen/>
    :
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
        {
          data?.data.data.map((brand, index) => {
            return <Brand key={index} brand={brand}/>
          })
        }
      </div>
    </>
  )
}
